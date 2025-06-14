
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getBiblicalContext } from './biblical-contexts.ts';
import { getDifficultyInstruction } from './difficulty-instructions.ts';
import { validateQuestions, generateUniqueSeed, cleanJsonResponse } from './validation-utils.ts';
import { buildRigorousPrompt } from './prompt-builder.ts';

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
    console.log('🚀 Starting BIBLICAL QUIZ generation with Gemini 1.5 Flash...');
    
    if (!geminiApiKey) {
      console.error('❌ Gemini API key not found');
      throw new Error('Clé API Gemini non configurée');
    }

    const { theme, difficulty, questionCount }: QuizRequest = await req.json();
    console.log('📝 Request params:', { theme, difficulty, questionCount });

    // Récupération du contexte et des instructions de difficulté
    const selectedContext = getBiblicalContext(theme);
    const selectedDifficulty = getDifficultyInstruction(difficulty);

    // Génération du seed unique
    const ultraUniqueSeed = generateUniqueSeed(theme, difficulty, questionCount);

    console.log('🎲 Ultra-unique seed generated:', ultraUniqueSeed);
    console.log('📖 Biblical theme:', selectedContext.title);
    console.log('🎯 Difficulty level:', selectedDifficulty.level);

    // Construction du prompt théologique
    const rigorousPrompt = buildRigorousPrompt(selectedContext, selectedDifficulty, questionCount, ultraUniqueSeed);

    console.log('📋 PROMPT THÉOLOGIQUE RIGOUREUX ENVOYÉ :');
    console.log('=' .repeat(80));
    console.log(rigorousPrompt);
    console.log('='.repeat(80));

    console.log('🤖 Appel à Gemini-1.5-Flash avec seed:', ultraUniqueSeed);

    // Appel à l'API Gemini 1.5 Flash (nom correct du modèle)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: rigorousPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 8000,
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
      console.error('❌ Erreur API Gemini 1.5:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Quota Gemini dépassé. Veuillez vérifier votre plan.');
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Clé API Gemini invalide ou non autorisée.');
      } else {
        throw new Error(`Erreur Gemini API (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('📡 RÉPONSE COMPLÈTE GEMINI 1.5:', JSON.stringify(data, null, 2));

    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      console.error('❌ Aucun contenu généré par Gemini 1.5');
      throw new Error('Gemini 1.5 n\'a généré aucun contenu valide');
    }

    console.log('📄 CONTENU BRUT GEMINI 1.5:', generatedContent);

    // Nettoyage et parsing du JSON
    const jsonContent = cleanJsonResponse(generatedContent);
    console.log('🧹 JSON EXTRAIT ET NETTOYÉ:', jsonContent);

    let questions;
    try {
      questions = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('❌ Échec du parsing JSON:', parseError);
      console.log('📄 Contenu défaillant:', jsonContent);
      throw new Error('Impossible de parser la réponse JSON de Gemini 1.5');
    }

    // Validation des questions
    const sanctifiedQuestions = validateQuestions(questions, questionCount);

    console.log(`✅ SUCCÈS TOTAL ! ${sanctifiedQuestions.length} QUESTIONS BIBLIQUES PARFAITES GÉNÉRÉES avec Gemini 1.5`);
    console.log('📖 APERÇU DES QUESTIONS CRÉÉES :');
    sanctifiedQuestions.forEach((q, i) => {
      console.log(`${i + 1}. ${q.question.substring(0, 100)}...`);
      console.log(`   Réponse: ${q.options[q.correctAnswer]} (${q.verse})`);
    });

    return new Response(JSON.stringify({ questions: sanctifiedQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ ERREUR FATALE dans generate-quiz-questions:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Échec de la génération du quiz biblique avec Gemini 1.5',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
