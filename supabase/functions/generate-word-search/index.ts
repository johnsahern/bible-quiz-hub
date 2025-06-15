
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
    
    const prompt = `Génère une liste de mots bibliques pour un jeu de mots cachés.

Thème: ${theme}
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
- Si c'est "Jesus Christ": JESUS, CHRIST, CROIX, AMOUR, PAIX, SALUT, GRACE, PARDON
- Si c'est "Ancien Testament": MOISE, DAVID, ABRAHAM, ISAAC, JACOB, EGYPT, EXODE, ALLIANCE
- Si c'est "Nouveau Testament": PAUL, PIERRE, JEAN, MATTHIEU, MARC, LUC, ACTES, EGLISE

Génère maintenant ${config.wordCount} mots uniques pour le thème "${theme}":`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No response from Gemini API');
    }

    // Nettoyer et parser la réponse
    const cleanedResponse = generatedText.replace(/```json\n?|\n?```/g, '').trim();
    let parsedResponse;
    
    try {
      parsedResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Parse error:', parseError, 'Response:', cleanedResponse);
      throw new Error('Invalid JSON response from AI');
    }

    // Valider et nettoyer les mots
    const words = parsedResponse.words || [];
    const validWords = words
      .filter((word: string) => 
        typeof word === 'string' && 
        word.length >= config.minWordLength && 
        word.length <= config.maxWordLength &&
        /^[A-Z]+$/.test(word)
      )
      .slice(0, config.wordCount);

    if (validWords.length < Math.floor(config.wordCount * 0.7)) {
      throw new Error(`Pas assez de mots valides générés: ${validWords.length}/${config.wordCount}`);
    }

    // Générer la grille
    const grid = generateWordSearchGrid(validWords, config.gridSize);

    const result = {
      id: crypto.randomUUID(),
      title: `Mots Cachés - ${theme}`,
      theme,
      words: validWords,
      grid,
      difficulty
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-word-search function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Erreur lors de la génération'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateWordSearchGrid(words: string[], gridSize: number): string[][] {
  // Créer une grille vide
  const grid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  
  // Directions possibles pour placer les mots
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal descendante
    [1, -1],  // diagonal montante
    [0, -1],  // horizontal inverse
    [-1, 0],  // vertical inverse
    [-1, -1], // diagonal descendante inverse
    [-1, 1]   // diagonal montante inverse
  ];

  // Placer chaque mot
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const [dx, dy] = direction;
      
      // Position de départ aléatoire
      const startRow = Math.floor(Math.random() * gridSize);
      const startCol = Math.floor(Math.random() * gridSize);
      
      // Vérifier si le mot peut être placé
      const canPlace = canPlaceWord(grid, word, startRow, startCol, dx, dy, gridSize);
      
      if (canPlace) {
        // Placer le mot
        for (let i = 0; i < word.length; i++) {
          const row = startRow + i * dx;
          const col = startCol + i * dy;
          grid[row][col] = word[i];
        }
        placed = true;
      }
      attempts++;
    }
  }

  // Remplir les cases vides avec des lettres aléatoires
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
}

function canPlaceWord(
  grid: string[][], 
  word: string, 
  startRow: number, 
  startCol: number, 
  dx: number, 
  dy: number, 
  gridSize: number
): boolean {
  // Vérifier si le mot sort de la grille
  const endRow = startRow + (word.length - 1) * dx;
  const endCol = startCol + (word.length - 1) * dy;
  
  if (endRow < 0 || endRow >= gridSize || endCol < 0 || endCol >= gridSize) {
    return false;
  }

  // Vérifier si les cases sont libres ou contiennent déjà la bonne lettre
  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * dx;
    const col = startCol + i * dy;
    
    if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
      return false;
    }
  }

  return true;
}
