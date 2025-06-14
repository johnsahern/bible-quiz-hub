
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { theme, difficulty, questionCount }: QuizRequest = await req.json();

    const themeDescriptions = {
      'vie-jesus': 'la vie de Jésus (naissance, ministère, miracles, crucifixion, résurrection)',
      'commandements': 'les dix commandements et les enseignements moraux bibliques',
      'creation': 'la création du monde selon la Genèse',
      'prophetes': 'les prophètes de l\'Ancien Testament et leurs messages',
      'nouveau-testament': 'le Nouveau Testament, les épîtres et les Actes des Apôtres'
    };

    const difficultyDescriptions = {
      'facile': 'niveau débutant avec des questions générales',
      'moyen': 'niveau intermédiaire avec des détails spécifiques',
      'difficile': 'niveau avancé avec des questions théologiques approfondies'
    };

    const prompt = `Génère exactement ${questionCount} questions de quiz biblique sur le thème "${themeDescriptions[theme]}" avec un ${difficultyDescriptions[difficulty]}.

Format requis pour chaque question :
{
  "id": "numéro_unique",
  "question": "La question en français",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": index_de_la_bonne_réponse (0,1,2,ou_3),
  "verse": "Référence biblique avec citation courte"
}

Règles importantes :
- Questions en français uniquement
- Exactement 4 options de réponse par question
- Une seule bonne réponse par question
- Inclure une référence biblique pertinente avec chaque question
- Les questions doivent être précises et basées sur les Écritures
- Adapter la complexité au niveau ${difficulty}

Réponds uniquement avec un tableau JSON valide de ${questionCount} questions, sans texte additionnel.`;

    console.log('Sending request to OpenAI for quiz generation...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'Tu es un expert biblique qui crée des quiz éducatifs. Réponds uniquement avec du JSON valide sans formatage markdown.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Raw OpenAI response:', generatedContent);

    // Parse the JSON response
    let questions;
    try {
      // Remove any markdown formatting if present
      const cleanedContent = generatedContent.replace(/```json\n?|\n?```/g, '').trim();
      questions = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Content to parse:', generatedContent);
      throw new Error('Failed to parse OpenAI response as JSON');
    }

    // Validate the response format
    if (!Array.isArray(questions) || questions.length !== questionCount) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.id || !q.question || !Array.isArray(q.options) || q.options.length !== 4 || 
          typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
        throw new Error(`Invalid question format at index ${i}`);
      }
    }

    console.log(`Successfully generated ${questions.length} questions`);

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-quiz-questions function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to generate quiz questions'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
