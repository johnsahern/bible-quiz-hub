
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
      throw new Error('Gemini API key not configured');
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

    // Générer un seed unique basé sur la date et l'heure pour éviter les répétitions
    const timestamp = new Date().getTime();
    const seed = Math.floor(timestamp / 10000); // Change toutes les 10 secondes

    const prompt = `Tu es un expert biblique reconnu qui crée des quiz éducatifs de haute qualité. Tu maîtrises parfaitement les Écritures et tu es capable de poser des questions pertinentes et précises.

CONTEXTE THÉMATIQUE : ${selectedTheme.context}

NIVEAU DE DIFFICULTÉ : ${selectedDifficulty.instructions}

SEED DE VARIATION : ${seed} (utilise ce nombre pour créer des questions uniques)

TÂCHE : Crée exactement ${questionCount} questions de quiz sur "${selectedTheme.title}" au niveau ${selectedDifficulty.level}.

RÈGLES ABSOLUES :
1. Réponds UNIQUEMENT avec un tableau JSON valide
2. AUCUN texte avant ou après le JSON
3. AUCUN formatage markdown
4. Exactement ${questionCount} questions uniques
5. Chaque question doit être différente et originale
6. Utilise le seed ${seed} pour générer des questions variées

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

EXIGENCES :
- ${questionCount} questions exactement
- Chaque question unique et originale
- correctAnswer : index 0, 1, 2 ou 3
- Options plausibles mais une seule correcte
- Références bibliques précises
- Adaptation parfaite au niveau ${difficulty}
- Aucune répétition de questions similaires`;

    console.log('🤖 Calling Gemini API...');

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
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4000,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Quota Gemini dépassé. Vérifiez votre plan de facturation Gemini.');
      } else if (response.status === 401) {
        throw new Error('Clé API Gemini invalide. Vérifiez votre configuration.');
      } else {
        throw new Error(`Erreur Gemini (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      console.error('❌ No content generated by Gemini');
      throw new Error('Aucun contenu généré par Gemini');
    }

    console.log('📄 Raw Gemini response length:', generatedContent.length);

    // Nettoyage et parsing améliorés
    let questions;
    try {
      let cleanedContent = generatedContent
        .replace(/```json\s*/g, '')
        .replace(/\s*```/g, '')
        .replace(/^[^[\{]*/, '')
        .replace(/[^\]\}]*$/, '')
        .trim();

      // Nettoyer les caractères problématiques
      cleanedContent = cleanedContent
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
        .replace(/\n\s*/g, ' ')
        .replace(/\s+/g, ' ');

      console.log('🧹 Cleaned content preview:', cleanedContent.substring(0, 200) + '...');
      questions = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('❌ JSON parsing error:', parseError);
      console.log('📄 Content to parse:', generatedContent?.substring(0, 500));
      
      // Tentative de récupération avec regex
      const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          questions = JSON.parse(jsonMatch[0]);
          console.log('✅ Recovered with regex extraction');
        } catch {
          throw new Error('Impossible de parser la réponse Gemini. Contenu JSON invalide.');
        }
      } else {
        throw new Error('Aucun JSON valide trouvé dans la réponse Gemini.');
      }
    }

    // Validation stricte
    if (!Array.isArray(questions)) {
      throw new Error('La réponse Gemini n\'est pas un tableau.');
    }

    if (questions.length === 0) {
      throw new Error('Aucune question générée par Gemini.');
    }

    // Validation et correction de chaque question
    const validatedQuestions = questions.slice(0, questionCount).map((q, index) => {
      const questionId = q.id || `q${index + 1}`;
      const question = q.question || `Question ${index + 1}`;
      const options = Array.isArray(q.options) && q.options.length === 4 
        ? q.options 
        : [`Option A`, `Option B`, `Option C`, `Option D`];
      const correctAnswer = typeof q.correctAnswer === 'number' && 
        q.correctAnswer >= 0 && q.correctAnswer <= 3 
        ? q.correctAnswer 
        : 0;
      const verse = q.verse || 'Référence biblique';

      return {
        id: questionId,
        question,
        options,
        correctAnswer,
        verse
      };
    });

    console.log(`✅ Successfully generated ${validatedQuestions.length} unique questions with Gemini`);

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
