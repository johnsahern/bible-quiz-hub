
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { theme, difficulty, gridSize = 10 } = await req.json()
    
    console.log(`🎯 Génération de mots croisés - Thème: ${theme}, Difficulté: ${difficulty}, Grille: ${gridSize}x${gridSize}`)

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    // Définir les paramètres selon la difficulté
    const difficultyParams = {
      'facile': { wordCount: 8, minWordLength: 4, maxWordLength: 7 },
      'moyen': { wordCount: 12, minWordLength: 5, maxWordLength: 9 },
      'difficile': { wordCount: 15, minWordLength: 6, maxWordLength: 12 }
    }
    
    const params = difficultyParams[difficulty] || difficultyParams['moyen']
    
    // Contextes thématiques pour les mots croisés
    const themeContexts = {
      'jesus-christ': 'Jésus-Christ, sa vie, ses enseignements, ses miracles, sa crucifixion, sa résurrection',
      'ancien-testament': 'Ancien Testament, patriarches, prophètes, rois d\'Israël, livres historiques',
      'nouveau-testament': 'Nouveau Testament, apôtres, épîtres, évangiles, église primitive',
      'prophetes': 'Prophètes bibliques, leurs messages, leurs époques, leurs livres',
      'miracles': 'Miracles bibliques, guérisons, prodiges, interventions divines',
      'paraboles': 'Paraboles de Jésus, leurs enseignements, leurs significations',
      'genealogies': 'Généalogies bibliques, lignées, descendants, ascendances',
      'geographie': 'Géographie biblique, villes, pays, montagnes, rivières',
      'fetes-celebrations': 'Fêtes juives, célébrations bibliques, rituels, traditions'
    }

    const themeContext = themeContexts[theme] || 'Bible, personnages et événements bibliques'

    const prompt = `Tu es un expert en création de mots croisés bibliques. Crée un mots croisés de ${gridSize}x${gridSize} cases sur le thème "${themeContext}" avec ${params.wordCount} mots.

CONTRAINTES STRICTES :
- Difficulté : ${difficulty}
- Longueur des mots : entre ${params.minWordLength} et ${params.maxWordLength} lettres
- Tous les mots doivent s'entrecroire dans une grille de ${gridSize}x${gridSize}
- Chaque mot doit avoir un indice clair et précis
- Les mots doivent être en français et liés au thème biblique
- Évite les mots trop obscurs ou techniques

FORMAT DE RÉPONSE OBLIGATOIRE (JSON) :
{
  "crossword": {
    "theme": "${theme}",
    "difficulty": "${difficulty}",
    "gridSize": ${gridSize},
    "words": [
      {
        "word": "MOT_MAJUSCULES",
        "clue": "Indice clair et précis",
        "startRow": 0,
        "startCol": 0,
        "direction": "horizontal",
        "length": 3
      }
    ],
    "grid": [
      ["M", "O", "T", null, null, ...],
      [null, null, null, null, null, ...],
      ...
    ]
  }
}

IMPORTANT :
- Les mots doivent s'entrecroire correctement
- Utilise "horizontal" ou "vertical" pour direction
- Les coordonnées startRow/startCol doivent être valides
- Remplis la grille avec les lettres ou null pour les cases vides
- Assure-toi que la grille est exactement ${gridSize}x${gridSize}`

    console.log('📤 Envoi de la requête à Gemini API...')
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
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
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur Gemini API:', errorText)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('📥 Réponse reçue de Gemini API')

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Format de réponse Gemini invalide')
    }

    let responseText = data.candidates[0].content.parts[0].text.trim()
    
    // Nettoyer la réponse
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    console.log('🧹 Nettoyage de la réponse:', responseText.substring(0, 200) + '...')

    let parsedResponse
    try {
      parsedResponse = JSON.parse(responseText)
    } catch (parseError) {
      console.error('❌ Erreur parsing JSON:', parseError)
      throw new Error('Impossible de parser la réponse de l\'IA')
    }

    const crossword = parsedResponse.crossword
    if (!crossword || !crossword.words || !Array.isArray(crossword.words) || !crossword.grid) {
      console.error('❌ Structure de mots croisés invalide:', parsedResponse)
      throw new Error('Structure de mots croisés invalide')
    }

    // Validation des mots
    const validWords = crossword.words.filter(word => 
      word.word && 
      word.clue && 
      typeof word.startRow === 'number' && 
      typeof word.startCol === 'number' && 
      (word.direction === 'horizontal' || word.direction === 'vertical') &&
      word.word.length >= params.minWordLength &&
      word.word.length <= params.maxWordLength
    )

    if (validWords.length === 0) {
      throw new Error('Aucun mot valide généré')
    }

    // Assurer que la grille est de la bonne taille
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null))
    
    // Placer les mots dans la grille
    validWords.forEach(word => {
      const { word: wordText, startRow, startCol, direction } = word
      for (let i = 0; i < wordText.length; i++) {
        if (direction === 'horizontal' && startCol + i < gridSize) {
          grid[startRow][startCol + i] = wordText[i]
        } else if (direction === 'vertical' && startRow + i < gridSize) {
          grid[startRow + i][startCol] = wordText[i]
        }
      }
    })

    const result = {
      crossword: {
        id: crypto.randomUUID(),
        theme,
        difficulty,
        gridSize,
        words: validWords,
        grid
      }
    }

    console.log(`✅ Mots croisés généré avec succès - ${validWords.length} mots`)
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('❌ Erreur génération mots croisés:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Erreur lors de la génération des mots croisés'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
