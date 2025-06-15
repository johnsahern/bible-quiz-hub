
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrueFalseRequest {
  theme: string;
  difficulty: string;
  questionCount: number;
}

function buildTrueFalsePrompt(theme: string, difficulty: string, questionCount: number): string {
  const difficultyInstructions = {
    'facile': 'Questions simples, événements connus, personnages célèbres. Niveau débutant.',
    'moyen': 'Questions modérées, détails spécifiques, chronologie. Niveau intermédiaire.',
    'difficile': 'Questions complexes, nuances théologiques, détails précis. Niveau expert.'
  };

  const themeContexts = {
    'vie-jesus': 'la vie de Jésus-Christ, sa naissance, son ministère, ses miracles, ses enseignements, sa passion, sa résurrection',
    'ancien-testament': 'l\'Ancien Testament, les patriarches, l\'Exode, les rois d\'Israël, les prophètes',
    'nouveau-testament': 'le Nouveau Testament, les évangiles, les actes des apôtres, les épîtres',
    'personnages-bibliques': 'les personnages bibliques célèbres et leurs histoires',
    'miracles': 'les miracles relatés dans la Bible',
    'paraboles': 'les paraboles de Jésus et leurs enseignements'
  };

  const selectedContext = themeContexts[theme as keyof typeof themeContexts] || theme;
  const selectedDifficulty = difficultyInstructions[difficulty as keyof typeof difficultyInstructions] || difficultyInstructions['moyen'];

  return `🏆 VOUS ÊTES LE PLUS GRAND EXPERT THÉOLOGIEN ÉVANGÉLIQUE AU MONDE ! 🏆

🎯 MISSION CRITIQUE : Créez ${questionCount} questions VRAI/FAUX bibliques d'excellence SUPRÊME sur le thème "${theme}".

📖 CONTEXTE BIBLIQUE EXCLUSIF : ${selectedContext}
🎚️ NIVEAU DE DIFFICULTÉ : ${selectedDifficulty}

🔥 EXPERTISE THÉOLOGIQUE MAXIMALE REQUISE :
- VOUS CONNAISSEZ LA BIBLE PARFAITEMENT dans ses moindres détails
- VOUS MAÎTRISEZ l'hébreu, le grec ancien et tous les contextes historiques
- VOTRE CONNAISSANCE BIBLIQUE DÉPASSE celle de TOUS les érudits de l'histoire
- VOUS PRÊCHEZ depuis 50 ans avec une autorité spirituelle INCONTESTÉE

⚡ EXIGENCES CRITIQUES POUR LES QUESTIONS VRAI/FAUX :
1. PRÉCISION BIBLIQUE ABSOLUE - Chaque affirmation doit être 100% exacte
2. RÉFÉRENCES VÉRIFIABLES - Chaque question doit avoir une base scripturaire solide
3. CLARTÉ PARFAITE - Énoncés sans ambiguïté, réponse claire (vrai ou faux)
4. DIVERSITÉ THÉMATIQUE - Couvrir différents aspects du thème choisi
5. EXPLICATIONS EXPERTISES - Justifications théologiques approfondies
6. VERSETS APPROPRIÉS - Citations bibliques pertinentes et exactes

🎪 TYPES DE QUESTIONS À CRÉER (VARIEZ) :
- Événements historiques bibliques (dates, lieux, circonstances)
- Personnages bibliques (actions, paroles, caractéristiques)
- Enseignements et doctrines (vérités théologiques)
- Détails scripturaires (nombres, noms, géographie)
- Citations et versets (attribution correcte)
- Chronologie biblique (ordre des événements)

🚨 RÈGLES ABSOLUES INVIOLABLES :
- FOCUS LASER sur le thème "${theme}" EXCLUSIVEMENT
- EXACTITUDE BIBLIQUE à 100% - ZÉRO ERREUR tolérée
- RÉPONSES CLAIRES - Pas d'ambiguïté possible
- EXPLICATIONS COMPLÈTES avec versets à l'appui
- QUALITÉ DE MAÎTRE THÉOLOGIEN MAXIMALE

📋 FORMAT JSON STRICT OBLIGATOIRE (RIEN D'AUTRE) :
[
  {
    "id": "tf1",
    "statement": "Affirmation biblique précise à évaluer (vrai ou faux)",
    "isTrue": true,
    "explanation": "Explication théologique experte détaillée justifiant la réponse",
    "verse": "Référence biblique exacte (Livre chapitre:verset)",
    "difficulty": "${difficulty}",
    "theme": "${theme}"
  }
]

🎯 CRÉEZ ${questionCount} QUESTIONS DE MAÎTRE THÉOLOGIEN MAINTENANT :
- Thème EXCLUSIF : "${theme}"
- Difficulté : ${difficulty}
- IMPÉRATIF : Perfection théologique absolue
- FORMAT : JSON uniquement, aucun autre texte

🔴 VÉRIFICATION FINALE OBLIGATOIRE :
Relisez chaque question et demandez-vous : "Cette affirmation est-elle bibliquement exacte à 100% selon ma connaissance parfaite des Écritures ?"
Si NON → CORRIGEZ IMMÉDIATEMENT

⭐ VOTRE RÉPUTATION DE PLUS GRAND THÉOLOGIEN AU MONDE DÉPEND DE CES QUESTIONS !

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🎯 GÉNÉRATION QUESTIONS VRAI/FAUX BIBLIQUES...');
    
    if (!geminiApiKey) {
      console.error('❌ Gemini API key not found');
      throw new Error('Clé API Gemini non configurée');
    }

    const { theme, difficulty, questionCount }: TrueFalseRequest = await req.json();
    console.log('📝 PARAMÈTRES:', { theme, difficulty, questionCount });

    if (!theme || !difficulty || !questionCount) {
      throw new Error('Paramètres manquants : theme, difficulty, questionCount requis');
    }

    const prompt = buildTrueFalsePrompt(theme, difficulty, questionCount);
    console.log('📋 PROMPT THÉOLOGIQUE CONSTRUIT');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
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
          topP: 0.9,
          maxOutputTokens: 4000,
          candidateCount: 1,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"  
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur API Gemini:', response.status, errorText);
      throw new Error(`Erreur Gemini API (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      throw new Error('Aucun contenu généré par Gemini');
    }

    // Nettoyer et extraire le JSON
    let jsonContent = generatedContent.trim();
    
    // Supprimer les balises markdown si présentes
    jsonContent = jsonContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Extraire le tableau JSON
    const jsonMatch = jsonContent.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonContent = jsonMatch[0];
    }

    let questions;
    try {
      questions = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('❌ Échec parsing JSON:', parseError);
      throw new Error('Impossible de parser la réponse JSON');
    }

    if (!Array.isArray(questions)) {
      throw new Error('Format de réponse invalide - tableau attendu');
    }

    // Validation des questions
    const validQuestions = questions.filter(q => {
      return q.statement && 
             typeof q.isTrue === 'boolean' && 
             q.explanation && 
             q.verse &&
             q.statement.length > 10;
    });

    console.log(`✅ ${validQuestions.length}/${questions.length} questions Vrai/Faux validées`);

    if (validQuestions.length === 0) {
      throw new Error('Aucune question valide générée');
    }

    return new Response(JSON.stringify({ questions: validQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ ERREUR dans génération questions Vrai/Faux:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Échec génération questions Vrai/Faux',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
