
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
    console.log('🚀 Starting quiz generation...');
    
    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    const { theme, difficulty, questionCount }: QuizRequest = await req.json();
    console.log('📝 Request params:', { theme, difficulty, questionCount });

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

    const prompt = `Tu es un expert biblique qui crée des quiz éducatifs. Génère exactement ${questionCount} questions de quiz sur "${themeDescriptions[theme]}" avec un ${difficultyDescriptions[difficulty]}.

IMPORTANT: Réponds UNIQUEMENT avec un tableau JSON valide, sans aucun texte avant ou après, sans formatage markdown.

Format requis pour chaque question :
{
  "id": "1",
  "question": "La question en français",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "verse": "Référence biblique avec citation courte"
}

Règles :
- Exactement ${questionCount} questions
- 4 options par question
- correctAnswer doit être 0, 1, 2 ou 3
- Questions précises basées sur les Écritures
- Niveau ${difficulty}`;

    console.log('🤖 Calling OpenAI...');

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
            content: 'Tu es un expert biblique. Réponds uniquement avec du JSON valide, sans formatage markdown.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('📄 Raw OpenAI response:', generatedContent);

    // Clean and parse the JSON response
    let questions;
    try {
      // Remove markdown formatting and extra whitespace
      let cleanedContent = generatedContent
        .replace(/```json\n?/g, '')
        .replace(/\n?```/g, '')
        .replace(/^[^[{]*/g, '')
        .replace(/[^}\]]*$/g, '')
        .trim();

      console.log('🧹 Cleaned content:', cleanedContent);
      questions = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('❌ JSON parsing error:', parseError);
      console.error('📄 Content to parse:', generatedContent);
      
      // Fallback: try to extract JSON from the response
      const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          questions = JSON.parse(jsonMatch[0]);
          console.log('✅ Recovered with regex extraction');
        } catch {
          throw new Error('Failed to parse OpenAI response as JSON');
        }
      } else {
        throw new Error('No valid JSON found in OpenAI response');
      }
    }

    // Validate the response
    if (!Array.isArray(questions)) {
      console.error('❌ Response is not an array:', questions);
      throw new Error('OpenAI response is not an array');
    }

    if (questions.length === 0) {
      throw new Error('No questions generated');
    }

    // Validate and fix each question
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

    console.log(`✅ Successfully generated and validated ${validatedQuestions.length} questions`);

    return new Response(JSON.stringify({ questions: validatedQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in generate-quiz-questions function:', error);
    
    // Return a more detailed error response
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to generate quiz questions',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
