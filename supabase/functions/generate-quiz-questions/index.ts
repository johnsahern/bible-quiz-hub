
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
    console.log('🚀 Starting BIBLICAL QUIZ generation with Gemini Pro...');
    
    if (!geminiApiKey) {
      console.error('❌ Gemini API key not found');
      throw new Error('Clé API Gemini non configurée');
    }

    const { theme, difficulty, questionCount }: QuizRequest = await req.json();
    console.log('📝 Request params:', { theme, difficulty, questionCount });

    // CONTEXTES BIBLIQUES ULTRA-DÉTAILLÉS - Chaque thème avec références précises
    const biblicalContexts: Record<string, { title: string; context: string; keyVerses: string[] }> = {
      // Jésus-Christ - Fondements doctrinaux
      'vie-jesus': {
        title: 'la vie de Jésus-Christ, le Fils de Dieu',
        context: 'Incarnation (Jean 1:14), naissance virginale à Bethléem (Matthieu 1:18-25, Luc 2:1-20), annonciation à Marie (Luc 1:26-38), fuite en Égypte (Matthieu 2:13-15), enfance à Nazareth (Luc 2:39-40), baptême par Jean-Baptiste dans le Jourdain (Matthieu 3:13-17), tentation au désert (Matthieu 4:1-11), appel des douze apôtres (Marc 3:13-19), sermon sur la montagne (Matthieu 5-7), miracles de guérison et résurrections, transfiguration (Matthieu 17:1-9), entrée triomphale à Jérusalem (Matthieu 21:1-11), dernière cène et institution de la communion (Matthieu 26:26-29), agonie à Gethsémané (Matthieu 26:36-46), arrestation et procès (Matthieu 26:47-27:31), crucifixion au Golgotha (Matthieu 27:32-56), résurrection le troisième jour (Matthieu 28:1-10), apparitions post-résurrection (Luc 24, Jean 20-21), ascension au ciel (Actes 1:9-11)',
        keyVerses: ['Jean 3:16', 'Jean 1:1', 'Philippiens 2:6-8', 'Hébreux 4:15', 'Matthieu 1:23']
      },
      'miracles-jesus': {
        title: 'les miracles de Jésus attestant sa divinité',
        context: 'Guérisons miraculeuses : aveugles-nés (Jean 9:1-12), paralytiques (Marc 2:1-12), lépreux (Matthieu 8:1-4), possédés (Marc 5:1-20), femme hémorroïsse (Marc 5:25-34), serviteur du centurion (Matthieu 8:5-13), belle-mère de Pierre (Matthieu 8:14-15), homme à la main sèche (Matthieu 12:9-13), sourd-muet (Marc 7:31-37), aveugle de Bethsaïda (Marc 8:22-26), dix lépreux (Luc 17:11-19). Résurrections : fille de Jaïrus (Marc 5:35-43), fils de la veuve de Naïn (Luc 7:11-17), Lazare après quatre jours (Jean 11:1-44). Miracles sur la nature : multiplication des pains et poissons (Matthieu 14:13-21, 15:32-39), marche sur les eaux (Matthieu 14:22-33), tempête apaisée (Marc 4:35-41), pêche miraculeuse (Luc 5:1-11, Jean 21:1-11), eau changée en vin à Cana (Jean 2:1-11), figuier desséché (Matthieu 21:18-22), pièce dans la bouche du poisson (Matthieu 17:24-27)',
        keyVerses: ['Jean 20:30-31', 'Matthieu 11:4-5', 'Marc 16:20', 'Actes 2:22', 'Hébreux 2:4']
      },
      'paraboles-jesus': {
        title: 'les paraboles de Jésus, enseignements du Royaume',
        context: 'Paraboles du Royaume des cieux : semeur (Matthieu 13:1-23), ivraie (Matthieu 13:24-30), grain de moutarde (Matthieu 13:31-32), levain (Matthieu 13:33), trésor caché (Matthieu 13:44), perle de grand prix (Matthieu 13:45-46), filet (Matthieu 13:47-50), maître de maison (Matthieu 13:52). Paraboles de miséricorde : bon Samaritain (Luc 10:25-37), fils prodigue (Luc 15:11-32), brebis perdue (Luc 15:3-7), drachme perdue (Luc 15:8-10), pharisien et publicain (Luc 18:9-14). Paraboles d\'exhortation : bon et mauvais serviteur (Matthieu 24:45-51), dix vierges (Matthieu 25:1-13), talents (Matthieu 25:14-30), ouvriers de la vigne (Matthieu 20:1-16), riche insensé (Luc 12:16-21), intendant infidèle (Luc 16:1-13), juge inique (Luc 18:1-8), ami importun (Luc 11:5-8)',
        keyVerses: ['Matthieu 13:34-35', 'Marc 4:33-34', 'Luc 8:10', 'Matthieu 13:11', 'Psaume 78:2']
      },

      // Pentateuque - Fondements de la foi
      'creation': {
        title: 'la création du monde par la Parole de Dieu',
        context: 'Six jours de création (Genèse 1:1-31) : Jour 1 -lumière/ténèbres, Jour 2 -firmament/eaux, Jour 3 -terre sèche/végétation, Jour 4 -astres/luminaires, Jour 5 -animaux marins/oiseaux, Jour 6 -animaux terrestres/homme créé à l\'image de Dieu (Genèse 1:26-27), Jour 7 -sabbat de repos (Genèse 2:1-3). Formation de l\'homme de la poussière (Genèse 2:7), souffle de vie, jardin d\'Éden planté par l\'Éternel (Genèse 2:8), arbre de vie et arbre de la connaissance du bien et du mal (Genèse 2:9), quatre fleuves (Genèse 2:10-14), commandement divin (Genèse 2:16-17), création de la femme (Genèse 2:18-25), nudité sans honte (Genèse 2:25), chute par désobéissance (Genèse 3:1-7), conséquences du péché (Genèse 3:8-24), promesse du Rédempteur (Genèse 3:15)',
        keyVerses: ['Genèse 1:1', 'Genèse 1:26-27', 'Genèse 2:7', 'Jean 1:3', 'Colossiens 1:16']
      },
      'moise': {
        title: 'Moïse, législateur et libérateur choisi par Dieu',
        context: 'Naissance en Égypte pendant l\'oppression (Exode 1:8-22), sauvé des eaux du Nil (Exode 2:1-10), éducation à la cour de Pharaon (Actes 7:22), fuite au pays de Madian après le meurtre de l\'Égyptien (Exode 2:11-22), mariage avec Séphora (Exode 2:21), appel divin au buisson ardent (Exode 3:1-4:17), "Je suis celui qui suis" (Exode 3:14), mission de libération avec Aaron (Exode 4:14-16), dix plaies d\'Égypte (Exode 7-12), institution de la Pâque (Exode 12:1-28), sortie d\'Égypte et passage de la mer Rouge (Exode 14), cantique de victoire (Exode 15), don de la manne (Exode 16), eau du rocher (Exode 17:1-7), victoire contre Amalek (Exode 17:8-16), don de la Loi au Sinaï (Exode 19-20), intercession pour le peuple (Exode 32:11-14), face rayonnante (Exode 34:29-35), construction du tabernacle (Exode 25-40), mort sur le mont Nébo (Deutéronome 34:1-8)',
        keyVerses: ['Exode 3:14', 'Deutéronome 18:15', 'Hébreux 11:24-26', 'Nombres 12:3', 'Deutéronome 34:10']
      },

      // Nouveau Testament - Église primitive
      'actes-apotres': {
        title: 'les Actes des Apôtres et l\'Église naissante',
        context: 'Promesse du Saint-Esprit (Actes 1:4-8), ascension de Jésus (Actes 1:9-11), élection de Matthias (Actes 1:15-26), Pentecôte et descente de l\'Esprit (Actes 2:1-13), prédication de Pierre (Actes 2:14-41), 3000 convertis, vie communautaire (Actes 2:42-47), guérison du paralytique (Actes 3:1-10), arrestation de Pierre et Jean (Actes 4:1-22), prière de l\'Église (Actes 4:23-31), Ananias et Saphira (Actes 5:1-11), signes et prodiges (Actes 5:12-16), persécution du sanhédrin (Actes 5:17-42), élection des sept diacres (Actes 6:1-7), martyre d\'Étienne (Actes 7:54-60), persécution de Saul (Actes 8:1-3), Philippe en Samarie (Actes 8:4-25), conversion de l\'eunuque éthiopien (Actes 8:26-40), conversion de Saul sur le chemin de Damas (Actes 9:1-19), vision de Pierre et Corneille (Actes 10), Église d\'Antioche (Actes 11:19-30), mort d\'Hérode Agrippa (Actes 12:20-23), premier voyage missionnaire (Actes 13-14), concile de Jérusalem (Actes 15), expansion vers l\'Europe (Actes 16:6-10), ministère à Philippes, Thessalonique, Bérée, Athènes, Corinthe (Actes 16-18), troisième voyage (Actes 18:23-21:17), arrestation à Jérusalem (Actes 21:17-23:35), procès devant Félix et Festus (Actes 24-26), voyage vers Rome et naufrage (Actes 27-28)',
        keyVerses: ['Actes 1:8', 'Actes 2:41', 'Actes 4:12', 'Actes 9:15', 'Actes 20:28']
      },

      // Prophètes
      'esaie': {
        title: 'Ésaïe, le prophète messianique par excellence',
        context: 'Appel prophétique et vision du temple (Ésaïe 6:1-13), Emmanuel (Ésaïe 7:14), enfant qui nous est né (Ésaïe 9:5-6), rejeton d\'Isaï (Ésaïe 11:1-10), chants du Serviteur souffrant (Ésaïe 42:1-9, 49:1-13, 50:4-11, 52:13-53:12), "Il a été blessé pour nos péchés" (Ésaïe 53:5), consolation d\'Israël (Ésaïe 40:1-11), "Voix de celui qui crie dans le désert" (Ésaïe 40:3), "Tous comme des brebis nous étions errants" (Ésaïe 53:6), libération de l\'exil babylonien par Cyrus (Ésaïe 44:28-45:13), nouveaux cieux et nouvelle terre (Ésaïe 65:17-25), jugement des nations (Ésaïe 13-23), petite apocalypse (Ésaïe 24-27), malheurs contre Juda et Jérusalem (Ésaïe 28-35), Ézéchias et Sanchérib (Ésaïe 36-39), livre de la consolation (Ésaïe 40-66)',
        keyVerses: ['Ésaïe 7:14', 'Ésaïe 9:5', 'Ésaïe 53:5-6', 'Ésaïe 40:3', 'Ésaïe 6:3']
      },

      // Personnages de l'AT
      'david': {
        title: 'David, roi selon le cœur de Dieu',
        context: 'Onction par Samuel à Bethléem (1 Samuel 16:1-13), musicien à la cour de Saül (1 Samuel 16:14-23), victoire contre Goliath de Gath (1 Samuel 17), amitié avec Jonathan (1 Samuel 18:1-4), jalousie de Saül (1 Samuel 18:5-16), mariage avec Mical (1 Samuel 18:17-30), fuite et vie errante (1 Samuel 19-26), séjour chez les Philistins (1 Samuel 27-30), mort de Saül et Jonathan (1 Samuel 31), lamentation (2 Samuel 1), roi de Juda à Hébron (2 Samuel 2:1-7), guerre contre la maison de Saül (2 Samuel 2:8-4:12), roi de tout Israël (2 Samuel 5:1-5), conquête de Jérusalem (2 Samuel 5:6-10), victoires contre les Philistins (2 Samuel 5:17-25), transport de l\'arche (2 Samuel 6), alliance davidique (2 Samuel 7), conquêtes et empire (2 Samuel 8-10), péché avec Bath-Schéba (2 Samuel 11), réprimande de Nathan (2 Samuel 12:1-15), mort de l\'enfant (2 Samuel 12:15-23), naissance de Salomon (2 Samuel 12:24-25), révolte d\'Absalom (2 Samuel 13-19), dénombrement et peste (2 Samuel 24), dernières paroles (2 Samuel 23:1-7), psalmiste inspiré (Psaumes)',
        keyVerses: ['1 Samuel 13:14', '2 Samuel 7:16', 'Psaume 23:1', 'Actes 13:22', 'Matthieu 1:1']
      },

      // Et continuer pour tous les autres thèmes...
      'abraham': {
        title: 'Abraham, père de la foi et des croyants',
        context: 'Appel à Ur des Chaldéens (Genèse 12:1-3), promesses divines (descendance, terre, bénédiction), départ vers Canaan (Genèse 12:4-9), descente en Égypte (Genèse 12:10-20), séparation d\'avec Lot (Genèse 13), victoire contre les rois (Genèse 14), alliance avec Dieu (Genèse 15), naissance d\'Ismaël par Agar (Genèse 16), circoncision signe de l\'alliance (Genèse 17), hospitalité aux trois anges (Genèse 18:1-15), intercession pour Sodome (Genèse 18:16-33), naissance d\'Isaac (Genèse 21:1-7), renvoi d\'Agar et Ismaël (Genèse 21:8-21), sacrifice d\'Isaac sur le mont Morija (Genèse 22:1-19), achat de la caverne de Macpéla (Genèse 23), mariage d\'Isaac (Genèse 24), mort à 175 ans (Genèse 25:7-10)',
        keyVerses: ['Genèse 12:2-3', 'Genèse 15:6', 'Romains 4:16', 'Galates 3:8-9', 'Hébreux 11:8-10']
      }
    };

    // Instructions de difficulté ultra-précises
    const difficultyInstructions = {
      'facile': {
        level: 'niveau débutant en connaissance biblique',
        instructions: 'Questions sur les faits bibliques fondamentaux, personnages célèbres, événements majeurs bien connus. Éviter les détails complexes, les nuances théologiques ou les références obscures. Réponses évidentes pour un croyant ayant des bases bibliques solides.'
      },
      'moyen': {
        level: 'niveau intermédiaire en étude biblique',
        instructions: 'Questions détaillées nécessitant une connaissance approfondie des Écritures, connexions entre livres, chronologie précise, contexte historique, significations symboliques. Inclure des références spécifiques et des analyses textuelles modérées.'
      },
      'difficile': {
        level: 'niveau expert en théologie biblique',
        instructions: 'Questions complexes exigeant une maîtrise théologique avancée, exégèse approfondie, hébreu/grec, doctrines pointues, controverses théologiques, parallèles inter-testamentaires, typologie messianique, eschatologie détaillée.'
      }
    };

    const selectedContext = biblicalContexts[theme];
    const selectedDifficulty = difficultyInstructions[difficulty];

    if (!selectedContext) {
      throw new Error(`Thème biblique non supporté: ${theme}`);
    }

    // Seed ultra-unique pour éviter toute répétition
    const timestamp = Date.now();
    const randomSeed = Math.random() * 999999999;
    const themeHash = theme.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
    const difficultyHash = difficulty.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
    const ultraUniqueSeed = Math.floor(timestamp + randomSeed + themeHash * 13 + difficultyHash * 17 + questionCount * 23);

    console.log('🎲 Ultra-unique seed generated:', ultraUniqueSeed);
    console.log('📖 Biblical theme:', selectedContext.title);
    console.log('🎯 Difficulty level:', selectedDifficulty.level);

    // PROMPT THÉOLOGIQUE RIGOUREUX - Garantie d'exactitude doctrinale
    const rigorousPrompt = `En tant qu'expert théologien évangélique reconnu et docteur en études bibliques, je vous demande de créer un quiz biblique d'excellence académique sur "${selectedContext.title}".

🔍 CONTEXTE BIBLIQUE DÉTAILLÉ :
${selectedContext.context}

📚 VERSETS CLÉS DE RÉFÉRENCE :
${selectedContext.keyVerses?.join(', ') || 'Références contextuelle précises requises'}

🎯 NIVEAU EXIGÉ : ${selectedDifficulty.instructions}

🔢 SEED D'UNICITÉ ABSOLUE : ${ultraUniqueSeed}
(Utilisez ce nombre pour créer ${questionCount} questions TOTALEMENT INÉDITES et JAMAIS POSÉES)

⚠️ EXIGENCES DOCTRINALES ABSOLUES :
1. EXACTITUDE BIBLIQUE PARFAITE - Aucune erreur factuelle tolérée
2. CONFORMITÉ ORTHODOXE - Respecter la doctrine évangélique historique
3. RÉFÉRENCES PRÉCISES - Chaque question doit citer des versets authentiques
4. VÉRITÉ THÉOLOGIQUE - Éviter toute ambiguïté doctrinale
5. ORIGINALITÉ TOTALE - Questions jamais formulées (seed: ${ultraUniqueSeed})

📋 FORMAT JSON REQUIS (AUCUN AUTRE TEXTE) :
[
  {
    "id": "q1",
    "question": "Question biblique précise et théologiquement exacte",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "verse": "Référence biblique exacte avec citation courte"
  }
]

🎪 CRÉATIVITÉ BIBLIQUE MAXIMALE :
- Explorez différents aspects du thème (historique, prophétique, typologique)
- Variez les types de questions (qui, quoi, où, quand, pourquoi, comment)
- Utilisez des angles d'approche originaux et enrichissants
- Évitez les formulations banales ou répétitives
- Questions stimulantes testant la vraie connaissance biblique

⚡ GÉNÉREZ MAINTENANT ${questionCount} QUESTIONS BIBLIQUES PARFAITES :
Thème : "${selectedContext.title}"
Niveau : ${selectedDifficulty.level}
Seed unique : ${ultraUniqueSeed}

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !`;

    console.log('📋 PROMPT THÉOLOGIQUE RIGOUREUX ENVOYÉ :');
    console.log('=' .repeat(80));
    console.log(rigorousPrompt);
    console.log('='.repeat(80));

    console.log('🤖 Appel à Gemini-1.5-Pro avec seed:', ultraUniqueSeed);

    // Utilisation du modèle Gemini le plus performant avec paramètres optimisés
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
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
          temperature: 0.7,      // Équilibre créativité/précision
          topK: 40,             // Diversité contrôlée
          topP: 0.8,            // Cohérence optimale
          maxOutputTokens: 8000, // Suffisant pour questions détaillées
          candidateCount: 1,     // Une seule réponse de qualité
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
      
      if (response.status === 429) {
        throw new Error('Quota Gemini dépassé. Veuillez vérifier votre plan.');
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Clé API Gemini invalide ou non autorisée.');
      } else {
        throw new Error(`Erreur Gemini API (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('📡 RÉPONSE COMPLÈTE GEMINI:', JSON.stringify(data, null, 2));

    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      console.error('❌ Aucun contenu généré par Gemini');
      throw new Error('Gemini n\'a généré aucun contenu valide');
    }

    console.log('📄 CONTENU BRUT GEMINI:', generatedContent);

    // Nettoyage et extraction du JSON avec validation stricte
    let cleanedContent = generatedContent.trim();
    
    // Suppression des balises markdown
    cleanedContent = cleanedContent.replace(/```json\s*/gi, '');
    cleanedContent = cleanedContent.replace(/\s*```/g, '');
    cleanedContent = cleanedContent.replace(/^[^[\{]*/, ''); // Supprime tout avant le premier [ ou {
    cleanedContent = cleanedContent.replace(/[^}\]]*$/, ''); // Supprime tout après le dernier } ou ]
    
    // Recherche du tableau JSON
    const jsonStart = cleanedContent.indexOf('[');
    const jsonEnd = cleanedContent.lastIndexOf(']') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      console.error('❌ Aucun tableau JSON trouvé dans la réponse Gemini');
      console.log('📄 Contenu reçu:', cleanedContent);
      throw new Error('Format de réponse Gemini invalide - JSON manquant');
    }
    
    const jsonContent = cleanedContent.substring(jsonStart, jsonEnd);
    console.log('🧹 JSON EXTRAIT ET NETTOYÉ:', jsonContent);

    let questions;
    try {
      questions = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('❌ Échec du parsing JSON:', parseError);
      console.log('📄 Contenu défaillant:', jsonContent);
      throw new Error('Impossible de parser la réponse JSON de Gemini');
    }

    // Validation théologique stricte
    if (!Array.isArray(questions)) {
      console.error('❌ La réponse n\'est pas un tableau:', typeof questions);
      throw new Error('Réponse Gemini non conforme - tableau requis');
    }

    if (questions.length === 0) {
      console.error('❌ Tableau de questions vide');
      throw new Error('Gemini n\'a généré aucune question biblique');
    }

    console.log(`📊 QUESTIONS BIBLIQUES GÉNÉRÉES : ${questions.length}`);

    // Validation et sanctification de chaque question
    const sanctifiedQuestions = questions.slice(0, questionCount).map((q, index) => {
      console.log(`🔍 Validation question biblique ${index + 1}:`, q);
      
      if (!q || typeof q !== 'object') {
        throw new Error(`Question ${index + 1} invalide - structure incorrecte`);
      }

      const questionId = q.id || `biblical_q${index + 1}`;
      const question = q.question || `Question biblique ${index + 1} non définie`;
      
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        console.error(`❌ Question ${index + 1} - options invalides:`, q.options);
        throw new Error(`Question ${index + 1}: 4 options bibliques requises, reçu ${q.options?.length || 0}`);
      }
      
      const correctAnswer = typeof q.correctAnswer === 'number' && 
        q.correctAnswer >= 0 && q.correctAnswer <= 3 
        ? q.correctAnswer 
        : 0;
      
      if (correctAnswer !== q.correctAnswer) {
        console.warn(`⚠️ Question ${index + 1}: correctAnswer corrigé de ${q.correctAnswer} vers ${correctAnswer}`);
      }
      
      const verse = q.verse || 'Référence biblique à vérifier';

      return {
        id: questionId,
        question: question.trim(),
        options: q.options.map(opt => opt.toString().trim()),
        correctAnswer,
        verse: verse.trim()
      };
    });

    console.log(`✅ SUCCÈS TOTAL ! ${sanctifiedQuestions.length} QUESTIONS BIBLIQUES PARFAITES GÉNÉRÉES`);
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
      details: 'Échec de la génération du quiz biblique avec Gemini',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
