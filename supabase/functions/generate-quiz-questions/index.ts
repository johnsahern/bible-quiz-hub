
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getBiblicalContext } from './biblical-contexts.ts';
import { getDifficultyInstruction } from './difficulty-instructions.ts';
import { validateQuestions, generateUniqueSeed, cleanJsonResponse, validateThematicRelevance } from './validation-utils.ts';
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
    console.log('🚀 GÉNÉRATION QUIZ BIBLIQUE THÉMATIQUE STRICTE avec Gemini 1.5 Flash...');
    
    if (!geminiApiKey) {
      console.error('❌ Gemini API key not found');
      throw new Error('Clé API Gemini non configurée');
    }

    const { theme, difficulty, questionCount }: QuizRequest = await req.json();
    console.log('📝 PARAMÈTRES REÇUS:', { theme, difficulty, questionCount });

    // Validation des paramètres d'entrée
    if (!theme || !difficulty || !questionCount) {
      throw new Error('Paramètres manquants : theme, difficulty, questionCount requis');
    }

    // Récupération du contexte et des instructions de difficulté
    const selectedContext = getBiblicalContext(theme);
    const selectedDifficulty = getDifficultyInstruction(difficulty);

    console.log('📖 THÈME SÉLECTIONNÉ:', selectedContext.title);
    console.log('🎯 DIFFICULTÉ:', selectedDifficulty.level);

    // Génération du seed unique VALIDE (pas NaN)
    const ultraUniqueSeed = generateUniqueSeed(theme, difficulty, questionCount);
    console.log('🎲 SEED UNIQUE GÉNÉRÉ:', ultraUniqueSeed);

    // Construction du prompt théologique ULTRA-STRICT
    const rigorousPrompt = buildRigorousPrompt(selectedContext, selectedDifficulty, questionCount, ultraUniqueSeed);

    console.log('📋 PROMPT THÉMATIQUE ULTRA-STRICT CONSTRUIT');
    console.log('🤖 APPEL GEMINI avec validation thématique renforcée...');

    // Appel à l'API Gemini 1.5 Flash avec configuration optimisée
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
          temperature: 0.7, // Légèrement plus haut pour plus de créativité
          topK: 40,
          topP: 0.9,
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
        throw new Error('Quota Gemini dépassé. Veuillez réessayer plus tard.');
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Clé API Gemini invalide ou non autorisée.');
      } else {
        throw new Error(`Erreur Gemini API (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('📡 RÉPONSE GEMINI REÇUE avec succès');

    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      console.error('❌ Aucun contenu généré par Gemini 1.5');
      throw new Error('Gemini 1.5 n\'a généré aucun contenu valide');
    }

    console.log('📄 Contenu généré extrait avec succès');

    // Nettoyage et parsing du JSON
    const jsonContent = cleanJsonResponse(generatedContent);
    console.log('🧹 JSON extrait et nettoyé');

    let questions;
    try {
      questions = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('❌ Échec du parsing JSON:', parseError);
      throw new Error('Impossible de parser la réponse JSON de Gemini 1.5');
    }

    console.log(`📊 ${questions.length} questions brutes reçues`);

    // Validation structurelle des questions
    const structurallyValidQuestions = validateQuestions(questions, questionCount);
    console.log(`✅ ${structurallyValidQuestions.length} questions structurellement valides`);
    
    // Validation thématique STRICTE
    const thematicallyValidQuestions = validateThematicRelevance(structurallyValidQuestions, theme);
    console.log(`🎯 ${thematicallyValidQuestions.length} questions thématiquement conformes`);

    if (thematicallyValidQuestions.length === 0) {
      throw new Error(`Aucune question valide générée pour le thème "${selectedContext.title}". Veuillez réessayer.`);
    }

    console.log(`✅ SUCCÈS TOTAL ! ${thematicallyValidQuestions.length} QUESTIONS PARFAITES GÉNÉRÉES`);
    console.log('📖 QUESTIONS CRÉÉES POUR LE THÈME:', selectedContext.title);

    thematicallyValidQuestions.forEach((q, i) => {
      console.log(`${i + 1}. ${q.question.substring(0, 80)}...`);
    });

    return new Response(JSON.stringify({ questions: thematicallyValidQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ ERREUR FATALE dans la génération du quiz:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Échec de la génération du quiz avec validation thématique stricte',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
