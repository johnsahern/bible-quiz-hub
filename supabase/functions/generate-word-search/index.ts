
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

interface WordSearchRequest {
  theme: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
}

const difficultyConfig = {
  facile: { gridSize: 12, wordCount: 8, minWordLength: 4, maxWordLength: 7 },
  moyen: { gridSize: 15, wordCount: 12, minWordLength: 5, maxWordLength: 9 },
  difficile: { gridSize: 18, wordCount: 15, minWordLength: 6, maxWordLength: 12 }
};

const themeContexts = {
  'jesus-christ': 'Jésus-Christ, sa vie, ses enseignements, ses miracles, sa crucifixion, sa résurrection',
  'ancien-testament': 'Ancien Testament, patriarches, prophètes, rois d\'Israël, livres historiques',
  'nouveau-testament': 'Nouveau Testament, apôtres, épîtres, évangiles, église primitive',
  'prophetes': 'Prophètes bibliques, leurs messages, leurs époques, leurs livres',
  'miracles': 'Miracles bibliques, guérisons, prodiges, interventions divines',
  'paraboles': 'Paraboles de Jésus, leurs enseignements, leurs significations',
  'geographie': 'Géographie biblique, villes, pays, montagnes, rivières',
  'fetes-celebrations': 'Fêtes juives, célébrations bibliques, rituels, traditions'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { theme, difficulty }: WordSearchRequest = await req.json();
    
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const config = difficultyConfig[difficulty];
    const themeContext = themeContexts[theme as keyof typeof themeContexts] || 'Bible, personnages et événements bibliques';
    
    const prompt = `Génère une liste de mots bibliques pour un jeu de mots cachés.

Thème: ${themeContext}
Difficulté: ${difficulty}
Nombre de mots: ${config.wordCount}
Longueur des mots: entre ${config.minWordLength} et ${config.maxWordLength} lettres

CONTRAINTES STRICTES:
1. Tous les mots doivent être en français
2. Tous les mots doivent être en rapport avec le thème biblique "${theme}"
3. Longueur des mots: ${config.minWordLength}-${config.maxWordLength} lettres
4. Pas d'accents, pas d'espaces, pas de tirets
5. Uniquement des lettres majuscules
6. Pas de mots composés
7. Mots uniques et variés

FORMAT DE RÉPONSE OBLIGATOIRE - Réponds uniquement avec un objet JSON:
{
  "words": ["MOT1", "MOT2", "MOT3", ...],
  "theme": "${theme}",
  "difficulty": "${difficulty}"
}

Exemples de mots selon le thème:
- Si c'est "jesus-christ": JESUS, CHRIST, CROIX, AMOUR, PAIX, SALUT, GRACE, PARDON
- Si c'est "ancien-testament": MOISE, DAVID, ABRAHAM, ISAAC, JACOB, EGYPT, EXODE, ALLIANCE
- Si c'est "nouveau-testament": PAUL, PIERRE, JEAN, MATTHIEU, MARC, LUC, ACTES, EGLISE

Génère maintenant ${config.wordCount} mots uniques pour le thème "${theme}":`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Format de réponse Gemini invalide');
    }

    let responseText = data.candidates[0].content.parts[0].text.trim();
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      responseText = jsonMatch[0];
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (parseError) {
      // Fallback avec des mots prédéfinis
      const fallbackWords = {
        'jesus-christ': ['JESUS', 'CHRIST', 'CROIX', 'AMOUR', 'PAIX', 'SALUT', 'GRACE', 'PARDON'],
        'ancien-testament': ['MOISE', 'DAVID', 'ABRAHAM', 'ISAAC', 'JACOB', 'EGYPT', 'EXODE', 'ALLIANCE'],
        'nouveau-testament': ['PAUL', 'PIERRE', 'JEAN', 'MATTHIEU', 'MARC', 'LUC', 'ACTES', 'EGLISE']
      };
      
      const words = fallbackWords[theme as keyof typeof fallbackWords] || fallbackWords['jesus-christ'];
      parsedResponse = {
        words: words.slice(0, config.wordCount),
        theme,
        difficulty
      };
    }

    if (!parsedResponse.words || !Array.isArray(parsedResponse.words)) {
      throw new Error('Format de mots invalide');
    }

    // Créer la grille de mots cachés
    const grid = Array(config.gridSize).fill(null).map(() => Array(config.gridSize).fill(''));
    const placedWords: Array<{word: string, startRow: number, startCol: number, direction: string}> = [];

    // Placer les mots dans la grille
    parsedResponse.words.forEach((word: string) => {
      const cleanWord = word.toUpperCase().replace(/[^A-Z]/g, '');
      if (cleanWord.length >= config.minWordLength && cleanWord.length <= config.maxWordLength) {
        const placed = placeWordInGrid(grid, cleanWord, config.gridSize);
        if (placed) {
          placedWords.push(placed);
        }
      }
    });

    // Remplir les cases vides avec des lettres aléatoires
    for (let i = 0; i < config.gridSize; i++) {
      for (let j = 0; j < config.gridSize; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    const result = {
      id: crypto.randomUUID(),
      title: `Mots Cachés - ${theme}`,
      theme,
      words: placedWords.map(p => p.word),
      grid,
      difficulty,
      placedWords
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur génération mots cachés:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Erreur lors de la génération des mots cachés'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function placeWordInGrid(grid: string[][], word: string, gridSize: number) {
  const directions = [
    { dr: 0, dc: 1, name: 'horizontal' },
    { dr: 1, dc: 0, name: 'vertical' },
    { dr: 1, dc: 1, name: 'diagonal' },
    { dr: 1, dc: -1, name: 'diagonal-reverse' }
  ];

  for (let attempts = 0; attempts < 100; attempts++) {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const startRow = Math.floor(Math.random() * gridSize);
    const startCol = Math.floor(Math.random() * gridSize);

    if (canPlaceWord(grid, word, startRow, startCol, direction, gridSize)) {
      // Placer le mot
      for (let i = 0; i < word.length; i++) {
        const row = startRow + i * direction.dr;
        const col = startCol + i * direction.dc;
        grid[row][col] = word[i];
      }
      return {
        word,
        startRow,
        startCol,
        direction: direction.name
      };
    }
  }
  return null;
}

function canPlaceWord(grid: string[][], word: string, startRow: number, startCol: number, direction: any, gridSize: number): boolean {
  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * direction.dr;
    const col = startCol + i * direction.dc;
    
    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
      return false;
    }
    
    if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
      return false;
    }
  }
  return true;
}
