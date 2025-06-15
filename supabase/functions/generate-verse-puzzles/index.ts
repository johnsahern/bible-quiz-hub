
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VersePuzzleRequest {
  theme: string;
  difficulty: string;
  puzzleCount: number;
}

interface VersePuzzle {
  id: string;
  verse: string;
  reference: string;
  scrambledWords: string[];
  correctOrder: number[];
  difficulty: string;
  theme: string;
}

function buildVersePuzzlePrompt(theme: string, difficulty: string, puzzleCount: number): string {
  const difficultyInstructions = {
    'facile': 'Versets courts (5-8 mots), vocabulaire simple, références connues',
    'moyen': 'Versets moyens (8-12 mots), vocabulaire modéré, références variées',
    'difficile': 'Versets longs (12-20 mots), vocabulaire complexe, références moins connues'
  };

  const themeContexts = {
    'vie-jesus': 'Événements de la vie de Jésus-Christ : naissance, ministère, miracles, enseignements, passion, résurrection',
    'amour-dieu': 'Versets sur l\'amour de Dieu, sa grâce, sa miséricorde et son salut',
    'sagesse': 'Proverbes et versets de sagesse biblique, conseils pour la vie',
    'foi': 'Versets sur la foi, la confiance en Dieu, l\'espérance',
    'priere': 'Enseignements sur la prière, exemples de prières bibliques',
    'famille': 'Instructions bibliques sur la famille, le mariage, l\'éducation des enfants',
    'creation': 'Récits de la création, merveilles de la nature',
    'prophetes': 'Messages et prophéties des prophètes de l\'Ancien Testament',
    'psaumes': 'Psaumes de David et autres psalmistes',
    'paraboles': 'Paraboles de Jésus et leurs enseignements',
    'miracles': 'Récits de miracles dans la Bible',
    'resurrection': 'Récits de la résurrection de Jésus et ses implications',
    'esperance': 'Promesses bibliques d\'espérance et de consolation',
    'justice': 'Enseignements sur la justice divine et humaine',
    'pardon': 'Versets sur le pardon, la réconciliation, la grâce'
  };

  return `Tu es un expert en Bible et en jeux éducatifs. Génère ${puzzleCount} puzzles de versets bibliques uniques selon ces critères :

THÈME : ${theme}
Contexte thématique : ${themeContexts[theme as keyof typeof themeContexts] || 'Thème biblique général'}

DIFFICULTÉ : ${difficulty}
Critères : ${difficultyInstructions[difficulty as keyof typeof difficultyInstructions]}

INSTRUCTIONS :
1. Chaque puzzle doit contenir un verset biblique complet et correct
2. Fournis la référence exacte (livre chapitre:verset)
3. Mélange les mots du verset de manière aléatoire
4. Indique l'ordre correct avec des indices numériques (0-indexé)
5. Assure-toi que chaque puzzle est UNIQUE et différent des autres
6. Les versets doivent être en français (version Louis Segond de préférence)
7. Respecte la ponctuation et la casse originales

IMPORTANT :
- Varie les livres bibliques pour plus de diversité
- Assure-toi que les versets correspondent vraiment au thème choisi
- Les puzzles doivent être solvables et éducatifs
- N'utilise JAMAIS deux fois le même verset

Format de réponse JSON strict :
{
  "puzzles": [
    {
      "id": "unique_id",
      "verse": "texte exact du verset",
      "reference": "Livre chapitre:verset",
      "scrambledWords": ["mot1", "mot2", "mot3", ...],
      "correctOrder": [2, 0, 1, 3, ...],
      "difficulty": "${difficulty}",
      "theme": "${theme}"
    }
  ]
}

EXEMPLE pour référence :
Si le verset est "Car Dieu a tant aimé le monde" (Jean 3:16)
- scrambledWords: ["monde", "le", "tant", "a", "Car", "aimé", "Dieu"]
- correctOrder: [4, 6, 5, 2, 1, 3, 0]
(Car=4, Dieu=6, a=5, tant=2, aimé=1, le=3, monde=0)

Génère maintenant ${puzzleCount} puzzles uniques pour le thème "${theme}" en difficulté "${difficulty}".`;
}

function validateVersePuzzleResponse(data: any): VersePuzzle[] {
  if (!data.puzzles || !Array.isArray(data.puzzles)) {
    throw new Error('Format de réponse invalide : puzzles manquants');
  }

  return data.puzzles.map((puzzle: any, index: number) => {
    if (!puzzle.verse || typeof puzzle.verse !== 'string') {
      throw new Error(`Puzzle ${index + 1} : verset manquant ou invalide`);
    }
    
    if (!puzzle.reference || typeof puzzle.reference !== 'string') {
      throw new Error(`Puzzle ${index + 1} : référence manquante ou invalide`);
    }
    
    if (!Array.isArray(puzzle.scrambledWords) || puzzle.scrambledWords.length === 0) {
      throw new Error(`Puzzle ${index + 1} : mots mélangés manquants ou invalides`);
    }
    
    if (!Array.isArray(puzzle.correctOrder) || puzzle.correctOrder.length !== puzzle.scrambledWords.length) {
      throw new Error(`Puzzle ${index + 1} : ordre correct invalide`);
    }

    // Vérifier que l'ordre correct est valide
    const expectedIndices = Array.from({ length: puzzle.scrambledWords.length }, (_, i) => i);
    const sortedOrder = [...puzzle.correctOrder].sort((a, b) => a - b);
    if (JSON.stringify(sortedOrder) !== JSON.stringify(expectedIndices)) {
      throw new Error(`Puzzle ${index + 1} : indices d'ordre incorrect`);
    }

    return {
      id: puzzle.id || `puzzle_${Date.now()}_${index}`,
      verse: puzzle.verse.trim(),
      reference: puzzle.reference.trim(),
      scrambledWords: puzzle.scrambledWords,
      correctOrder: puzzle.correctOrder,
      difficulty: puzzle.difficulty || 'moyen',
      theme: puzzle.theme || 'general'
    };
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { theme, difficulty, puzzleCount }: VersePuzzleRequest = await req.json();

    if (!theme || !difficulty || !puzzleCount) {
      throw new Error('Paramètres manquants : theme, difficulty, puzzleCount requis');
    }

    if (puzzleCount < 1 || puzzleCount > 20) {
      throw new Error('Le nombre de puzzles doit être entre 1 et 20');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Clé API Gemini non configurée');
    }

    const prompt = buildVersePuzzlePrompt(theme, difficulty, puzzleCount);
    
    console.log(`🧩 Génération de ${puzzleCount} puzzles pour ${theme} (${difficulty})`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur API Gemini:', errorText);
      throw new Error(`Erreur API Gemini: ${response.status}`);
    }

    const aiResponse = await response.json();
    
    if (!aiResponse.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Réponse IA invalide');
    }

    let responseText = aiResponse.candidates[0].content.parts[0].text.trim();
    
    // Nettoyer la réponse
    responseText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    let puzzleData;
    try {
      puzzleData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Erreur parsing JSON:', parseError);
      console.error('Réponse brute:', responseText);
      throw new Error('Format JSON invalide dans la réponse IA');
    }

    const puzzles = validateVersePuzzleResponse(puzzleData);
    
    console.log(`✅ ${puzzles.length} puzzles générés avec succès`);

    return new Response(
      JSON.stringify({ puzzles }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Erreur génération puzzles:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Erreur lors de la génération des puzzles de versets'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
