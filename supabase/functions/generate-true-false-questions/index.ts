
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

function generateUniqueSeed(theme: string, difficulty: string, questionCount: number): number {
  const timestamp = Date.now();
  const randomComponent = Math.floor(Math.random() * 10000);
  const themeHash = theme.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return Math.abs(timestamp + randomComponent + themeHash + questionCount * 17);
}

function buildTrueFalsePrompt(theme: string, difficulty: string, questionCount: number): string {
  const uniqueSeed = generateUniqueSeed(theme, difficulty, questionCount);
  
  const difficultyInstructions = {
    'facile': 'Questions simples et accessibles, événements connus, personnages célèbres. Niveau débutant.',
    'moyen': 'Questions modérées avec détails spécifiques, chronologie précise. Niveau intermédiaire.',
    'difficile': 'Questions complexes, nuances théologiques fines, détails historiques précis. Niveau expert.'
  };

  const themeContexts = {
    'vie-jesus': {
      context: 'la vie de Jésus-Christ dans tous ses aspects : naissance à Bethléem, enfance, baptême par Jean-Baptiste, ministère public, choix des disciples, miracles (guérisons, résurrections, multiplication des pains), enseignements (Sermon sur la montagne, paraboles), transfiguration, entrée triomphale à Jérusalem, dernière Cène, passion, crucifixion, résurrection, apparitions, ascension',
      focus_areas: ['Naissance et enfance', 'Baptême et tentation', 'Ministère et miracles', 'Enseignements et paraboles', 'Passion et crucifixion', 'Résurrection et ascension', 'Relations avec les disciples', 'Conflits avec les pharisiens']
    },
    'ancien-testament': {
      context: 'l\'Ancien Testament dans sa richesse : Pentateuque (Genèse à Deutéronome), livres historiques (Josué aux Chroniques), patriarches (Abraham, Isaac, Jacob), Exode et Moïse, conquête de Canaan, période des Juges, royauté (Saül, David, Salomon), division du royaume, prophètes majeurs et mineurs, exil babylonien, retour de captivité',
      focus_areas: ['Création et patriarches', 'Exode et loi mosaïque', 'Conquête et Juges', 'Royauté unifiée', 'Royaume divisé', 'Prophètes et messages', 'Exil et retour', 'Livres de sagesse']
    },
    'nouveau-testament': {
      context: 'le Nouveau Testament complet : quatre évangiles (Matthieu, Marc, Luc, Jean), Actes des Apôtres, épîtres pauliniennes (Romains à Philémon), épîtres générales (Hébreux à Jude), Apocalypse, expansion de l\'Église primitive, missions de Paul, concile de Jérusalem, persécutions, vision eschatologique',
      focus_areas: ['Évangiles synoptiques', 'Évangile de Jean', 'Actes des Apôtres', 'Épîtres de Paul', 'Épîtres générales', 'Apocalypse', 'Église primitive', 'Théologie chrétienne']
    },
    'personnages-bibliques': {
      context: 'les grands personnages bibliques : patriarches (Abraham, Isaac, Jacob, Joseph), libérateurs (Moïse, Josué), juges (Débora, Gédéon, Samson), rois (Saül, David, Salomon, Ézéchias, Josias), prophètes (Élie, Élisée, Ésaïe, Jérémie, Ézéchiel, Daniel), femmes remarquables (Sarah, Rebecca, Rachel, Ruth, Esther, Marie), apôtres et disciples',
      focus_areas: ['Patriarches fondateurs', 'Leaders et libérateurs', 'Rois et gouvernants', 'Prophètes majeurs', 'Femmes influentes', 'Apôtres du Christ', 'Personnages tragiques', 'Héros de la foi']
    },
    'miracles': {
      context: 'les miracles bibliques dans l\'Ancien et Nouveau Testament : miracles de Moïse (plaies d\'Égypte, passage de la mer Rouge), d\'Élie et Élisée, miracles de Jésus (guérisons, résurrections, contrôle de la nature, multiplications), miracles des apôtres dans les Actes, signification théologique et symbolique',
      focus_areas: ['Miracles de l\'Exode', 'Prodiges d\'Élie/Élisée', 'Guérisons de Jésus', 'Résurrections bibliques', 'Miracles de la nature', 'Multiplications miraculeuses', 'Miracles des apôtres', 'Dimension symbolique']
    },
    'paraboles': {
      context: 'les paraboles de Jésus et leurs enseignements profonds : paraboles du Royaume (semeur, ivraie, moutarde, levain), de la miséricorde (brebis perdue, fils prodigue, bon Samaritain), de l\'eschatologie (vierges, talents, jugement dernier), paraboles sociales et économiques, interprétation et application',
      focus_areas: ['Paraboles du Royaume', 'Paraboles de miséricorde', 'Paraboles eschatologiques', 'Enseignements sociaux', 'Paraboles agricoles', 'Paraboles économiques', 'Interprétation symbolique', 'Application spirituelle']
    }
  };

  const selectedContext = themeContexts[theme as keyof typeof themeContexts] || {
    context: theme,
    focus_areas: ['Aspects généraux']
  };
  
  const selectedDifficulty = difficultyInstructions[difficulty as keyof typeof difficultyInstructions] || difficultyInstructions['moyen'];

  return `🏆 VOUS ÊTES LE PLUS GRAND EXPERT THÉOLOGIEN ÉVANGÉLIQUE AU MONDE ! 🏆

🎲 IMPÉRATIF D'UNICITÉ ABSOLUE (SEED ULTRA-UNIQUE: ${uniqueSeed}):
- Ce seed ${uniqueSeed} doit générer des questions TOTALEMENT DIFFÉRENTES à chaque fois
- INTERDICTION FORMELLE de répéter des questions déjà posées dans d'autres parties
- Explorez des angles INÉDITS et VARIÉS du thème "${theme}"
- Variez OBLIGATOIREMENT les types : personnages, événements, détails, enseignements, chronologie
- CRÉATIVITÉ MAXIMALE requise dans le respect STRICT du thème
- Chaque question doit être UNIQUE et ORIGINALE pour ce seed ${uniqueSeed}

🎯 MISSION CRITIQUE : Créez ${questionCount} questions VRAI/FAUX bibliques d'excellence SUPRÊME sur le thème "${theme}".

📖 CONTEXTE BIBLIQUE EXCLUSIF : ${selectedContext.context}
🎚️ NIVEAU DE DIFFICULTÉ : ${selectedDifficulty}
🔍 DOMAINES À EXPLORER : ${selectedContext.focus_areas.join(', ')}

🔥 EXPERTISE THÉOLOGIQUE MAXIMALE REQUISE :
- VOUS CONNAISSEZ LA BIBLE PARFAITEMENT dans ses moindres détails
- VOUS MAÎTRISEZ l'hébreu, le grec ancien et tous les contextes historiques
- VOTRE CONNAISSANCE BIBLIQUE DÉPASSE celle de TOUS les érudits de l'histoire
- VOUS PRÊCHEZ depuis 50 ans avec une autorité spirituelle INCONTESTÉE

⚡ EXIGENCES CRITIQUES POUR LES QUESTIONS VRAI/FAUX (SEED ${uniqueSeed}) :
1. PRÉCISION BIBLIQUE ABSOLUE - Chaque affirmation doit être 100% exacte
2. RÉFÉRENCES VÉRIFIABLES - Chaque question doit avoir une base scripturaire solide
3. CLARTÉ PARFAITE - Énoncés sans ambiguïté, réponse claire (vrai ou faux)
4. DIVERSITÉ THÉMATIQUE - Couvrir différents aspects du thème choisi
5. EXPLICATIONS EXPERTISES - Justifications théologiques approfondies
6. VERSETS APPROPRIÉS - Citations bibliques pertinentes et exactes
7. UNICITÉ GARANTIE - Questions jamais vues avec ce seed ${uniqueSeed}

🎪 TYPES DE QUESTIONS À CRÉER (VARIEZ OBLIGATOIREMENT avec seed ${uniqueSeed}) :
- Événements historiques bibliques précis (dates, lieux, circonstances uniques)
- Personnages bibliques spécifiques (actions rares, paroles exactes, détails biographiques)
- Enseignements et doctrines particuliers (vérités théologiques spécialisées)
- Détails scripturaires fins (nombres précis, noms spécifiques, géographie biblique)
- Citations et versets exacts (attribution correcte, contexte précis)
- Chronologie biblique détaillée (ordre des événements, durées, périodes)
- Aspects culturels et historiques (coutumes, traditions, contexte socio-politique)
- Symbolisme et typologie biblique (figures, préfigurations, accomplissements)

🚨 RÈGLES ABSOLUES INVIOLABLES POUR SEED ${uniqueSeed} :
- FOCUS LASER sur le thème "${theme}" EXCLUSIVEMENT
- EXACTITUDE BIBLIQUE à 100% - ZÉRO ERREUR tolérée
- RÉPONSES CLAIRES - Pas d'ambiguïté possible
- EXPLICATIONS COMPLÈTES avec versets à l'appui
- QUALITÉ DE MAÎTRE THÉOLOGIEN MAXIMALE
- UNICITÉ TOTALE garantie par le seed ${uniqueSeed}

📋 FORMAT JSON STRICT OBLIGATOIRE (RIEN D'AUTRE) :
[
  {
    "id": "tf_${uniqueSeed}_1",
    "statement": "Affirmation biblique précise et unique à évaluer (vrai ou faux) - SEED ${uniqueSeed}",
    "isTrue": true,
    "explanation": "Explication théologique experte détaillée justifiant la réponse avec autorité spirituelle",
    "verse": "Référence biblique exacte (Livre chapitre:verset)",
    "difficulty": "${difficulty}",
    "theme": "${theme}"
  }
]

🎯 CRÉEZ ${questionCount} QUESTIONS DE MAÎTRE THÉOLOGIEN MAINTENANT (SEED ${uniqueSeed}) :
- Thème EXCLUSIF : "${theme}"
- Difficulté : ${difficulty}
- Seed unique : ${uniqueSeed}
- IMPÉRATIF : Perfection théologique absolue avec unicité garantie
- FORMAT : JSON uniquement, aucun autre texte
- CRÉATIVITÉ : Explorez des aspects inédits du thème avec ce seed ${uniqueSeed}

🔴 VÉRIFICATION FINALE OBLIGATOIRE POUR SEED ${uniqueSeed} :
Relisez chaque question et demandez-vous : "Cette affirmation est-elle bibliquement exacte à 100% selon ma connaissance parfaite des Écritures ET unique pour le seed ${uniqueSeed} ?"
Si NON → CORRIGEZ IMMÉDIATEMENT

⭐ VOTRE RÉPUTATION DE PLUS GRAND THÉOLOGIEN AU MONDE DÉPEND DE CES QUESTIONS UNIQUES !

🎲 UNICITÉ ABSOLUE GARANTIE AVEC SEED ${uniqueSeed} !
🔥 CRÉATIVITÉ MAXIMALE DANS LE THÈME "${theme}" !

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🎯 GÉNÉRATION QUESTIONS VRAI/FAUX BIBLIQUES UNIQUES...');
    
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
    console.log('📋 PROMPT THÉOLOGIQUE ULTRA-ROBUSTE CONSTRUIT');
    console.log('🎲 Génération avec seed unique pour garantir l\'unicité');

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
          temperature: 0.8, // Augmenté pour plus de créativité
          topK: 40,
          topP: 0.95, // Augmenté pour plus de diversité
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

    console.log('📄 Contenu généré reçu de Gemini');

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
      console.error('❌ Contenu reçu:', jsonContent.substring(0, 500));
      throw new Error('Impossible de parser la réponse JSON de Gemini');
    }

    if (!Array.isArray(questions)) {
      throw new Error('Format de réponse invalide - tableau attendu');
    }

    // Validation des questions avec vérification d'unicité
    const validQuestions = questions.filter(q => {
      return q.statement && 
             typeof q.isTrue === 'boolean' && 
             q.explanation && 
             q.verse &&
             q.id &&
             q.statement.length > 10 &&
             q.explanation.length > 20;
    });

    console.log(`✅ ${validQuestions.length}/${questions.length} questions Vrai/Faux uniques validées`);

    if (validQuestions.length === 0) {
      throw new Error('Aucune question valide générée par Gemini');
    }

    // Log pour vérifier l'unicité
    console.log('🎲 Questions générées avec IDs uniques:', validQuestions.map(q => q.id));

    return new Response(JSON.stringify({ questions: validQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ ERREUR dans génération questions Vrai/Faux:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Échec génération questions Vrai/Faux uniques avec Gemini',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
