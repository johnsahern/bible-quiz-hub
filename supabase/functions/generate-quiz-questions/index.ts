
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuizRequest {
  theme: string;
  difficulty: string;
  questionCount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting quiz generation with Gemini...');
    
    if (!geminiApiKey) {
      console.error('❌ Gemini API key not found');
      throw new Error('Clé API Gemini non configurée');
    }

    const { theme, difficulty, questionCount }: QuizRequest = await req.json();
    console.log('📝 Request params:', { theme, difficulty, questionCount });

    // Descriptions détaillées pour chaque thème
    const themeDescriptions = {
      'vie-jesus': {
        title: 'la vie de Jésus',
        context: 'naissance à Bethléem, baptême par Jean-Baptiste, ministère public, miracles (guérison des aveugles, multiplication des pains, résurrection de Lazare), enseignements (paraboles, Sermon sur la montagne), Passion (arrestation, crucifixion), résurrection et ascension'
      },
      'commandements': {
        title: 'les dix commandements',
        context: 'les dix commandements donnés à Moïse sur le mont Sinaï, les enseignements moraux de Jésus, les béatitudes, l\'amour de Dieu et du prochain, les vertus chrétiennes'
      },
      'creation': {
        title: 'la création du monde',
        context: 'les sept jours de la création selon la Genèse, Adam et Ève au jardin d\'Éden, la chute, Caïn et Abel, Noé et le déluge, la tour de Babel'
      },
      'prophetes': {
        title: 'les prophètes de l\'Ancien Testament',
        context: 'Moïse, Élie, Élisée, Ésaïe, Jérémie, Ézéchiel, Daniel, les douze petits prophètes, leurs messages de repentance et d\'espoir, leurs prophéties messianiques'
      },
      'nouveau-testament': {
        title: 'le Nouveau Testament',
        context: 'les Actes des Apôtres, la vie de l\'Église primitive, les épîtres de Paul, Pierre, Jean, Jacques, l\'Apocalypse, la diffusion du christianisme'
      }
    };

    // Instructions spécifiques pour chaque niveau de difficulté
    const difficultyInstructions = {
      'facile': {
        level: 'débutant',
        instructions: 'Pose des questions générales et bien connues. Utilise des noms, lieux et événements célèbres. Évite les détails complexes. Les réponses doivent être évidentes pour quelqu\'un qui connaît les bases de la Bible.'
      },
      'moyen': {
        level: 'intermédiaire',
        instructions: 'Pose des questions sur des détails spécifiques et des connexions entre les événements. Inclus des références précises aux versets. Demande des connaissances plus approfondies sans être trop technique.'
      },
      'difficile': {
        level: 'expert',
        instructions: 'Pose des questions théologiques complexes, des analyses textuelles approfondies, des connexions entre différents livres bibliques. Inclus des nuances doctrinales et des interprétations avancées.'
      }
    };

    const selectedTheme = themeDescriptions[theme];
    const selectedDifficulty = difficultyInstructions[difficulty];

    // Générer un seed unique et vraiment aléatoire
    const timestamp = Date.now();
    const randomValue = Math.random() * 10000;
    const uniqueSeed = Math.floor(timestamp + randomValue);

    console.log('🎲 Generated unique seed:', uniqueSeed);

    const prompt = `Tu es un expert biblique reconnu qui crée des quiz éducatifs de haute qualité. Tu maîtrises parfaitement les Écritures et tu es capable de poser des questions pertinentes et précises.

CONTEXTE THÉMATIQUE : ${selectedTheme.context}

NIVEAU DE DIFFICULTÉ : ${selectedDifficulty.instructions}

SEED DE VARIATION : ${uniqueSeed} (utilise ce nombre pour créer des questions complètement uniques et originales)

TÂCHE : Crée exactement ${questionCount} questions de quiz COMPLÈTEMENT NOUVELLES ET ORIGINALES sur "${selectedTheme.title}" au niveau ${selectedDifficulty.level}.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec un tableau JSON valide
2. AUCUN texte avant ou après le JSON
3. AUCUN formatage markdown (pas de \`\`\`json)
4. Exactement ${questionCount} questions uniques
5. Chaque question doit être totalement différente et inédite
6. Utilise le seed ${uniqueSeed} pour garantir des questions jamais vues
7. INTERDICTION ABSOLUE de répéter des questions déjà posées

FORMAT REQUIS (tableau JSON uniquement) :
[
  {
    "id": "q1",
    "question": "Question précise en français",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "verse": "Référence biblique précise avec citation courte"
  }
]

EXIGENCES CRITIQUES :
- ${questionCount} questions exactement
- Chaque question TOTALEMENT unique et originale (jamais posée avant)
- correctAnswer : index 0, 1, 2 ou 3 SEULEMENT
- Options plausibles mais une seule correcte
- Références bibliques précises et vraies
- Adaptation parfaite au niveau ${difficulty}
- ZERO répétition ou similarité avec d'autres questions
- Questions créatives et engageantes

GÉNÈRE MAINTENANT ${questionCount} QUESTIONS BIBLIQUES UNIQUES :`;

    console.log('🤖 Calling Gemini API with unique seed:', uniqueSeed);

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
          temperature: 0.9,
          topK: 50,
          topP: 0.95,
          maxOutputTokens: 8000,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Quota Gemini dépassé. Veuillez vérifier votre plan de facturation.');
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Clé API Gemini invalide ou non autorisée.');
      } else {
        throw new Error(`Erreur Gemini API (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('📡 Full Gemini response:', JSON.stringify(data, null, 2));

    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      console.error('❌ No content generated by Gemini');
      throw new Error('Gemini n\'a généré aucun contenu');
    }

    console.log('📄 Raw Gemini content:', generatedContent);

    // Nettoyage du contenu Gemini
    let cleanedContent = generatedContent.trim();
    
    // Supprimer les balises markdown si présentes
    cleanedContent = cleanedContent.replace(/```json\s*/gi, '');
    cleanedContent = cleanedContent.replace(/\s*```/g, '');
    
    // Trouver le tableau JSON
    const jsonStart = cleanedContent.indexOf('[');
    const jsonEnd = cleanedContent.lastIndexOf(']') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      console.error('❌ No JSON array found in Gemini response');
      throw new Error('Format de réponse Gemini invalide - pas de tableau JSON trouvé');
    }
    
    const jsonContent = cleanedContent.substring(jsonStart, jsonEnd);
    console.log('🧹 Extracted JSON:', jsonContent);

    let questions;
    try {
      questions = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError);
      console.log('📄 Failed content:', jsonContent);
      throw new Error('Impossible de parser la réponse JSON de Gemini');
    }

    // Validation stricte
    if (!Array.isArray(questions)) {
      throw new Error('La réponse Gemini n\'est pas un tableau de questions');
    }

    if (questions.length === 0) {
      throw new Error('Gemini n\'a généré aucune question');
    }

    // Validation et nettoyage de chaque question
    const validatedQuestions = questions.slice(0, questionCount).map((q, index) => {
      if (!q || typeof q !== 'object') {
        throw new Error(`Question ${index + 1} invalide`);
      }

      const questionId = q.id || `q${index + 1}`;
      const question = q.question || `Question ${index + 1} non définie`;
      
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Question ${index + 1}: 4 options requises`);
      }
      
      const correctAnswer = typeof q.correctAnswer === 'number' && 
        q.correctAnswer >= 0 && q.correctAnswer <= 3 
        ? q.correctAnswer 
        : 0;
      
      const verse = q.verse || 'Référence biblique non spécifiée';

      return {
        id: questionId,
        question: question.trim(),
        options: q.options.map(opt => opt.toString().trim()),
        correctAnswer,
        verse: verse.trim()
      };
    });

    console.log(`✅ Successfully generated ${validatedQuestions.length} UNIQUE questions with Gemini (seed: ${uniqueSeed})`);
    console.log('📋 Generated questions preview:', validatedQuestions.map(q => q.question.substring(0, 50) + '...'));

    return new Response(JSON.stringify({ questions: validatedQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in generate-quiz-questions function:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Échec de la génération du quiz avec Gemini',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
