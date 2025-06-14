
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

    // Descriptions détaillées pour TOUS les thèmes (50+ thèmes)
    const themeDescriptions: Record<string, { title: string; context: string }> = {
      // Nouveau Testament
      'vie-jesus': {
        title: 'la vie de Jésus',
        context: 'naissance à Bethléem, annonciation à Marie, fuite en Égypte, enfance, baptême par Jean-Baptiste, tentation au désert, ministère public en Galilée, choix des douze apôtres, sermon sur la montagne, miracles (guérison des aveugles, paralytiques, lépreux, multiplication des pains, marche sur l\'eau, résurrection de Lazare), enseignements (paraboles du royaume, du bon samaritain, du fils prodigue), transfiguration, entrée triomphale à Jérusalem, Passion (dernière cène, Gethsémané, arrestation, procès devant Pilate, crucifixion), résurrection et ascension'
      },
      'miracles-jesus': {
        title: 'les miracles de Jésus',
        context: 'guérisons miraculeuses (aveugles-nés, paralytiques, lépreux, possédés, femme hémorroïsse, serviteur du centurion), résurrections (fille de Jaïrus, fils de la veuve de Naïn, Lazare), miracles sur la nature (multiplication des pains et poissons, marche sur l\'eau, tempête apaisée, pêche miraculeuse, eau changée en vin à Cana), guérisons le jour du sabbat, foi des bénéficiaires'
      },
      'paraboles-jesus': {
        title: 'les paraboles de Jésus',
        context: 'paraboles du royaume (semeur, ivraie, grain de moutarde, levain, trésor caché, perle de grand prix, filet), paraboles de miséricorde (bon samaritain, fils prodigue, brebis perdue, drachme perdue), paraboles d\'enseignement moral (bon et mauvais serviteur, talents, ouvriers de la vigne, pharisien et publicain, riche insensé, intendant infidèle)'
      },
      'passion-christ': {
        title: 'la Passion du Christ',
        context: 'dernière semaine à Jérusalem, entrée triomphale, purification du temple, dernière cène (institution de l\'eucharistie, lavement des pieds, annonce de la trahison), Gethsémané (agonie, sueur de sang), arrestation, reniement de Pierre, procès devant le sanhédrin et Pilate, flagellation, couronne d\'épines, chemin de croix, crucifixion entre deux larrons, sept paroles sur la croix, mort et mise au tombeau'
      },
      'resurrection': {
        title: 'la résurrection du Christ',
        context: 'découverte du tombeau vide par les femmes, course de Pierre et Jean, apparitions (à Marie-Madeleine, aux disciples d\'Emmaüs, aux onze apôtres, à Thomas, au bord du lac de Tibériade, à plus de 500 frères), preuves de la résurrection, mission donnée aux apôtres, promesse de l\'Esprit Saint, ascension au mont des Oliviers'
      },
      'evangeliles': {
        title: 'les quatre Évangiles',
        context: 'Évangile selon Matthieu (généalogie, sermon sur la montagne, paraboles du royaume), Marc (évangile de l\'action, miracles), Luc (évangile de la miséricorde, nativité, paraboles de compassion), Jean (évangile spirituel, "Je suis", discours d\'adieu), spécificités de chaque évangéliste, complémentarité des récits'
      },
      'actes-apotres': {
        title: 'les Actes des Apôtres',
        context: 'Pentecôte et descente de l\'Esprit Saint, première prédication de Pierre, vie communautaire des premiers chrétiens, martyre d\'Étienne, conversion de Paul sur le chemin de Damas, vision de Pierre et Corneille, premier voyage missionnaire de Paul et Barnabas, concile de Jérusalem, expansion du christianisme'
      },
      'epitres-paul': {
        title: 'les épîtres de Paul',
        context: 'épître aux Romains (justification par la foi), Corinthiens (problèmes communautaires, résurrection), Galates (liberté chrétienne), Éphésiens (mystère du Christ), Philippiens (joie chrétienne), Colossiens (primauté du Christ), Thessaloniciens (retour du Christ), épîtres pastorales (Timothée, Tite), Philémon'
      },
      'pierre-jean': {
        title: 'les épîtres de Pierre et Jean',
        context: 'première épître de Pierre (espérance chrétienne, souffrances), deuxième épître de Pierre (faux docteurs), première épître de Jean (Dieu est amour, lumière), deuxième et troisième épîtres de Jean, épître de Jacques (foi et œuvres), épître de Jude'
      },
      'apocalypse': {
        title: 'l\'Apocalypse de Jean',
        context: 'vision de Patmos, lettres aux sept Églises (Éphèse, Smyrne, Pergame, Thyatire, Sardes, Philadelphie, Laodicée), vision du trône céleste, agneau et sept sceaux, sept trompettes, la femme et le dragon, les deux bêtes, bataille d\'Harmaguédon, jugement final, nouvelle Jérusalem, nouveau ciel et nouvelle terre'
      },
      'pentecote': {
        title: 'la Pentecôte',
        context: 'promesse de Jésus de l\'Esprit consolateur, attente des disciples au cénacle, vent violent et langues de feu, don des langues, prédication de Pierre, conversion des trois mille, manifestations de l\'Esprit dans l\'Église primitive'
      },
      'eglise-primitive': {
        title: 'l\'Église primitive',
        context: 'communauté de Jérusalem, mise en commun des biens, fraction du pain, enseignement des apôtres, guérisons miraculeuses, persécution et dispersion, diacres (Étienne, Philippe), expansion vers la Samarie et les nations païennes'
      },
      'voyages-paul': {
        title: 'les voyages missionnaires de Paul',
        context: 'premier voyage (Chypre, Antioche de Pisidie, Iconium, Lystre), deuxième voyage (Philippes, Thessalonique, Bérée, Athènes, Corinthe), troisième voyage (Éphèse, retour à Jérusalem), voyage vers Rome (naufrage à Malte, arrivée à Rome), fondation d\'Églises'
      },

      // Pentateuque
      'creation': {
        title: 'la création du monde',
        context: 'les sept jours de la création selon la Genèse, séparation lumière/ténèbres, firmament, terre et mer, végétation, astres, animaux marins et oiseaux, animaux terrestres et homme, repos du septième jour, jardin d\'Éden, Adam et Ève, arbre de la connaissance du bien et du mal, chute originelle, Caïn et Abel, descendance de Seth, Noé et le déluge, alliance avec Noé, tour de Babel'
      },
      'genese': {
        title: 'le livre de la Genèse',
        context: 'création du monde, Adam et Ève, Caïn et Abel, descendance de Seth et Caïn, Noé et le déluge, Sem, Cham et Japhet, tour de Babel, généalogies, Abraham et l\'alliance, Isaac et Rébecca, Jacob et Ésaü, les douze patriarches, Joseph en Égypte, installation des Hébreux en Égypte'
      },
      'exode': {
        title: 'l\'Exode',
        context: 'esclavage en Égypte, naissance et jeunesse de Moïse, buisson ardent, mission de Moïse, dix plaies d\'Égypte, Pâque et agneau pascal, sortie d\'Égypte, passage de la mer Rouge, marche dans le désert, manne et cailles, eau du rocher, bataille contre Amaleq, don de la Loi au Sinaï, dix commandements, veau d\'or, construction du tabernacle'
      },
      'nombres': {
        title: 'le livre des Nombres',
        context: 'dénombrement des tribus, organisation du camp, fonctions des lévites, offrandes des princes, bénédiction d\'Aaron, départ du Sinaï, révoltes dans le désert, explorateurs en Terre Promise, révolte de Coré, serpent d\'airain, Balaam et son ânesse, nouvelles générations, partage de la Terre Promise'
      },
      'deuteronome': {
        title: 'le Deutéronome',
        context: 'discours de Moïse dans les plaines de Moab, rappel de l\'histoire d\'Israël, répétition de la Loi, Shema Israël, bénédictions et malédictions, alliance renouvelée, cantique de Moïse, bénédiction des tribus, mort de Moïse sur le mont Nébo, Josué successeur de Moïse'
      },
      'commandements': {
        title: 'les dix commandements',
        context: 'don de la Loi au mont Sinaï, tables de pierre écrites du doigt de Dieu, un seul Dieu, interdiction des idoles, respect du nom de Dieu, sanctification du sabbat, honorer père et mère, ne pas tuer, ne pas commettre d\'adultère, ne pas voler, ne pas porter de faux témoignage, ne pas convoiter, enseignements moraux de Jésus, grand commandement de l\'amour'
      },

      // Livres historiques
      'josue': {
        title: 'Josué et la conquête',
        context: 'succession de Moïse, passage du Jourdain, chute de Jéricho, victoire d\'Aï, ruse des Gabaonites, conquête du sud et du nord, partage de la terre entre les tribus, villes de refuge, assemblée de Sichem, mort de Josué'
      },
      'juges-israel': {
        title: 'l\'époque des Juges',
        context: 'cycle d\'apostasie et délivrance, Othniel, Ehud, Déborah et Barak, Gédéon et sa toison, Jephté et son vœu, Samson et Dalila, guerre civile contre Benjamin, Samuel dernier juge'
      },
      'ruth': {
        title: 'l\'histoire de Ruth',
        context: 'famine en Israël, Noémi et ses belles-filles, fidélité de Ruth, retour à Bethléem, Ruth glane chez Boaz, droit de rachat, mariage de Ruth et Boaz, naissance d\'Obed, généalogie de David'
      },
      'samuel': {
        title: 'Samuel et les débuts de la royauté',
        context: 'naissance de Samuel, appel du jeune Samuel, arche capturée et rendue, Samuel juge, demande d\'un roi, onction de Saül, victoire contre les Ammonites, rejet de Saül, onction de David, David et Goliath, amitié Jonathan-David, persécution par Saül, mort de Saül, David roi'
      },
      'rois-israel': {
        title: 'les rois d\'Israël et de Juda',
        context: 'règne de David (unification, conquêtes, Jérusalem capitale, faute avec Bath-Schéba), Salomon (sagesse, temple, gloire et décadence), division du royaume, rois d\'Israël (Jéroboam, Achab, Jéhu), rois de Juda (Roboam, Asa, Josaphat, Ézéchias, Josias), chute de Samarie, chute de Jérusalem, exil à Babylone'
      },
      'chroniques': {
        title: 'les livres des Chroniques',
        context: 'généalogies depuis Adam, règne de David, préparatifs pour le temple, règne de Salomon, construction du temple, histoire des rois de Juda, réformes religieuses, retour d\'exil sous Cyrus'
      },
      'esdras': {
        title: 'Esdras et le retour d\'exil',
        context: 'édit de Cyrus, premier retour sous Zorobabel, reconstruction du temple, opposition des adversaires, mission d\'Esdras, lecture de la Loi, réforme des mariages mixtes'
      },
      'nehemie': {
        title: 'Néhémie et la reconstruction',
        context: 'nouvelles de Jérusalem, mission de Néhémie, reconstruction des murailles, opposition de Sanballat, organisation sociale, lecture de la Loi par Esdras, fête des tabernacles, alliance renouvelée'
      },
      'esther': {
        title: 'Esther et la délivrance',
        context: 'règne d\'Assuérus, répudiation de Vasthi, élection d\'Esther, complot d\'Haman contre les Juifs, intercession d\'Esther, délivrance du peuple, institution de la fête de Pourim'
      },

      // Livres poétiques
      'job': {
        title: 'Job et ses épreuves',
        context: 'piété de Job, épreuves permises par Dieu, perte des biens et des enfants, maladie, fidélité de Job, venue des amis (Éliphaz, Bildad, Tsophar), dialogues et discours, intervention d\'Élihu, réponse de Dieu dans la tempête, restauration de Job'
      },
      'psalmes': {
        title: 'les Psaumes',
        context: 'psaumes de David, cantiques des montées, psaumes royaux messianiques, psaumes de louange et d\'adoration, psaumes de supplication, psaumes de confession, psaumes historiques, psaumes de sagesse, psautier comme livre de prière d\'Israël'
      },
      'proverbes': {
        title: 'les Proverbes',
        context: 'sagesse de Salomon, crainte de l\'Éternel commencement de la sagesse, proverbes sur la vie pratique, famille, travail, parole, amitié, richesse et pauvreté, justice, enseignement moral, femme vertueuse'
      },
      'ecclesiaste': {
        title: 'l\'Ecclésiaste',
        context: 'vanité des vanités, recherche du sens de la vie, expériences de l\'Ecclésiaste, temps pour toute chose, injustices de la vie, conseil de jouir modérément, crainte de Dieu, jugement final'
      },
      'cantiques': {
        title: 'le Cantique des Cantiques',
        context: 'chant d\'amour entre l\'époux et l\'épouse, beauté de l\'amour humain, allégorie de l\'amour entre Dieu et son peuple, poésie amoureuse, métaphores florales et pastorales'
      },

      // Prophètes majeurs
      'esaie': {
        title: 'le prophète Ésaïe',
        context: 'prophéties messianiques (Emmanuel, serviteur souffrant, prince de paix), jugement et salut, vision du temple et vocation d\'Ésaïe, prophéties contre les nations, petit apocalypse, livre de la consolation, retour d\'exil, nouvelle création'
      },
      'jeremie': {
        title: 'le prophète Jérémie',
        context: 'vocation de Jérémie, annonce du jugement sur Juda, nouvelle alliance, chute de Jérusalem, exil à Babylone, espoir de restauration, livre de la consolation, souffrances du prophète'
      },
      'lamentations': {
        title: 'les Lamentations',
        context: 'plaintes sur la destruction de Jérusalem, désolation de Sion, souffrances du peuple, espoir en la miséricorde de Dieu, appel à la repentance'
      },
      'ezechiel': {
        title: 'le prophète Ézéchiel',
        context: 'visions du char de Dieu, mission prophétique, jugement sur Jérusalem, responsabilité individuelle, prophéties contre les nations, vision de la vallée d\'ossements desséchés, nouveau temple, nouvelle alliance'
      },
      'daniel': {
        title: 'Daniel et ses visions',
        context: 'déportation à Babylone, fidélité de Daniel et ses amis, songe de Nabucadnetsar, fournaise ardente, folie de Nabucadnetsar, festin de Belschatsar, fosse aux lions, visions apocalyptiques (quatre bêtes, soixante-dix semaines)'
      },

      // Prophètes mineurs
      'osee': {
        title: 'Osée et l\'amour fidèle',
        context: 'mariage symbolique avec Gomer, infidélité et pardon, amour indéfectible de Dieu pour Israël, appel à la repentance, promesse de restauration'
      },
      'amos': {
        title: 'Amos et la justice',
        context: 'berger de Tekoa, prophéties contre les nations, dénonciation des injustices sociales, jour de l\'Éternel, visions symboliques, promesse de restauration'
      },
      'jonas': {
        title: 'Jonas et Ninive',
        context: 'mission à Ninive, fuite vers Tarsis, tempête et grand poisson, prédication à Ninive, repentance des Ninivites, colère et leçon de Jonas, miséricorde universelle de Dieu'
      },
      'michee': {
        title: 'Michée et ses prophéties',
        context: 'jugement sur Samarie et Jérusalem, prophétie messianique (Bethléem), dénonciation des injustices, espoir de restauration, ce que l\'Éternel demande'
      },
      'habacuc': {
        title: 'Habacuc et ses questions',
        context: 'plainte du prophète sur la violence, réponse divine (Chaldéens instrument de jugement), nouvelles questions, le juste vivra par sa foi, cantique de confiance'
      },
      'sophonie': {
        title: 'Sophonie et le jour de l\'Éternel',
        context: 'jugement universel, jour de colère, appel à la repentance, jugement des nations, promesse de restauration, résidu fidèle'
      },
      'zacharie': {
        title: 'Zacharie et ses visions',
        context: 'huit visions nocturnes, reconstruction du temple, grand-prêtre Josué, gouverneur Zorobabel, prophéties messianiques, roi humble sur un ânon, berger frappé, jour de l\'Éternel'
      },
      'malachie': {
        title: 'Malachie, dernier prophète',
        context: 'amour de Dieu pour Israël, reproches aux prêtres, mariages mixtes et divorces, dîmes et offrandes, jour du jugement, Élie précurseur du Messie'
      },

      // Personnages
      'patriarches': {
        title: 'les patriarches',
        context: 'appel d\'Abraham, promesses de descendance et de terre, sacrifice d\'Isaac, mariage d\'Isaac et Rébecca, Jacob et Ésaü, échelle de Jacob, lutte avec l\'ange, réconciliation des frères, les douze fils de Jacob'
      },
      'moise': {
        title: 'Moïse libérateur',
        context: 'naissance et sauvetage, éducation en Égypte, fuite au pays de Madian, buisson ardent, mission de libération, dix plaies, sortie d\'Égypte, don de la Loi, intercession pour le peuple, mort sur le mont Nébo'
      },
      'david': {
        title: 'David roi et psalmiste',
        context: 'onction par Samuel, victoire contre Goliath, musicien de Saül, amitié avec Jonathan, persécution, cavernes, magnanimité envers Saül, roi de Juda puis d\'Israël, conquêtes, Jérusalem capitale, faute et repentance, Psaumes'
      },
      'salomon': {
        title: 'Salomon roi sage',
        context: 'succession de David, demande de sagesse, jugement des deux mères, construction du temple, dédicace, gloire et richesse, reine de Saba, décadence et idolâtrie, division annoncée du royaume'
      },
      'elie-elisee': {
        title: 'Élie et Élisée',
        context: 'Élie face à Achab et Jézabel, sécheresse et miracle de Sarepta, défi du mont Carmel, fuite au désert, voix douce au mont Horeb, vigne de Naboth, enlèvement d\'Élie, double portion pour Élisée, miracles d\'Élisée'
      },
      'femmes-bible': {
        title: 'les femmes de la Bible',
        context: 'Ève mère des vivants, Sara et l\'enfant de la promesse, Rébecca, Rachel et Léa, Miriam sœur de Moïse, Rahab, Déborah juge, Ruth, Anne mère de Samuel, Bath-Schéba, reine de Saba, Marie mère de Jésus, Marie-Madeleine, Marthe et Marie'
      },

      // Thématiques générales
      'prophetes': {
        title: 'les prophètes de l\'Ancien Testament',
        context: 'Moïse, Samuel, Nathan, Gad, Élie, Élisée, Ésaïe, Jérémie, Ézéchiel, Daniel, les douze petits prophètes, leurs messages de repentance et d\'espoir, leurs prophéties messianiques, leur rôle dans l\'histoire d\'Israël'
      },
      'nouveau-testament': {
        title: 'le Nouveau Testament',
        context: 'les quatre Évangiles, les Actes des Apôtres, la vie de l\'Église primitive, les épîtres de Paul, Pierre, Jean, Jacques, l\'Apocalypse, la diffusion du christianisme dans l\'Empire romain'
      },
      'ancien-testament': {
        title: 'l\'Ancien Testament',
        context: 'Pentateuque (Loi), livres historiques, livres poétiques et sapientiaux, prophètes majeurs et mineurs, histoire du peuple d\'Israël, alliance avec Dieu, promesses messianiques, préparation de la venue du Christ'
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

    if (!selectedTheme) {
      throw new Error(`Thème non supporté: ${theme}`);
    }

    // Générer un seed unique et vraiment aléatoire basé sur plusieurs facteurs
    const timestamp = Date.now();
    const randomValue = Math.random() * 1000000;
    const themeHash = theme.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const difficultyHash = difficulty.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const uniqueSeed = Math.floor(timestamp + randomValue + themeHash + difficultyHash + questionCount);

    console.log('🎲 Generated ultra-unique seed:', uniqueSeed);
    console.log('🎯 Theme selected:', selectedTheme.title);
    console.log('📊 Difficulty:', selectedDifficulty.level);

    // PROMPT COMPLET ET DÉTAILLÉ - Voici le prompt que j'envoie à Gemini
    const prompt = `Tu es un expert biblique reconnu qui crée des quiz éducatifs de haute qualité. Tu maîtrises parfaitement les Écritures et tu es capable de poser des questions pertinentes et précises.

CONTEXTE THÉMATIQUE DÉTAILLÉ : ${selectedTheme.context}

NIVEAU DE DIFFICULTÉ : ${selectedDifficulty.instructions}

SEED D'UNICITÉ ABSOLUE : ${uniqueSeed} (utilise ce nombre pour créer des questions COMPLÈTEMENT NOUVELLES et JAMAIS POSÉES)

MISSION CRITIQUE : Crée exactement ${questionCount} questions de quiz TOTALEMENT INÉDITES ET ORIGINALES sur "${selectedTheme.title}" au niveau ${selectedDifficulty.level}.

RÈGLES ABSOLUES ET NON-NÉGOCIABLES :
1. Réponds UNIQUEMENT avec un tableau JSON valide
2. AUCUN texte avant ou après le JSON
3. AUCUN formatage markdown (pas de \`\`\`json)
4. Exactement ${questionCount} questions uniques
5. Chaque question doit être totalement différente et inédite
6. Utilise le seed ${uniqueSeed} pour garantir des questions jamais vues
7. INTERDICTION ABSOLUE de répéter des questions déjà posées
8. Questions créatives, engageantes et bibliquement exactes
9. Références bibliques précises et authentiques

FORMAT JSON REQUIS (tableau uniquement) :
[
  {
    "id": "q1",
    "question": "Question précise et originale en français",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "verse": "Référence biblique précise avec citation courte"
  }
]

EXIGENCES CRITIQUES POUR L'ORIGINALITÉ :
- ${questionCount} questions exactement, ni plus ni moins
- Chaque question TOTALEMENT unique et jamais formulée (utilise le seed ${uniqueSeed})
- correctAnswer : index 0, 1, 2 ou 3 SEULEMENT (pas d'autres valeurs)
- 4 options plausibles par question, une seule correcte
- Références bibliques précises, vraies et vérifiables
- Adaptation parfaite au niveau ${difficulty}
- ZÉRO répétition ou similarité avec d'autres questions existantes
- Questions stimulantes qui testent vraiment la connaissance

CRÉATIVITÉ MAXIMALE REQUISE :
- Formule les questions de manière unique et originale
- Varie les types de questions (qui, quoi, où, quand, pourquoi, comment)
- Explore différents aspects du thème
- Utilise des angles d'approche variés
- Évite les formulations banales ou répétitives

GÉNÈRE MAINTENANT ${questionCount} QUESTIONS BIBLIQUES TOTALEMENT INÉDITES SUR "${selectedTheme.title}" (SEED: ${uniqueSeed}) :`;

    console.log('📋 PROMPT ENVOYÉ À GEMINI :');
    console.log('=====================================');
    console.log(prompt);
    console.log('=====================================');

    console.log('🤖 Calling Gemini API with ultra-unique seed:', uniqueSeed);

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
          temperature: 0.95, // Plus de créativité
          topK: 60,          // Plus de variété
          topP: 0.98,        // Maximum de diversité
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
    console.log('📡 RÉPONSE COMPLÈTE DE GEMINI:', JSON.stringify(data, null, 2));

    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      console.error('❌ No content generated by Gemini');
      throw new Error('Gemini n\'a généré aucun contenu');
    }

    console.log('📄 CONTENU BRUT GÉNÉRÉ PAR GEMINI:', generatedContent);

    // Nettoyage et extraction du JSON
    let cleanedContent = generatedContent.trim();
    
    // Supprimer les balises markdown si présentes
    cleanedContent = cleanedContent.replace(/```json\s*/gi, '');
    cleanedContent = cleanedContent.replace(/\s*```/g, '');
    
    // Trouver le tableau JSON
    const jsonStart = cleanedContent.indexOf('[');
    const jsonEnd = cleanedContent.lastIndexOf(']') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      console.error('❌ No JSON array found in Gemini response');
      console.log('📄 Content received:', cleanedContent);
      throw new Error('Format de réponse Gemini invalide - pas de tableau JSON trouvé');
    }
    
    const jsonContent = cleanedContent.substring(jsonStart, jsonEnd);
    console.log('🧹 JSON EXTRAIT:', jsonContent);

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
      console.error('❌ Response is not an array:', typeof questions);
      throw new Error('La réponse Gemini n\'est pas un tableau de questions');
    }

    if (questions.length === 0) {
      console.error('❌ Empty questions array');
      throw new Error('Gemini n\'a généré aucune question');
    }

    console.log(`📊 NOMBRE DE QUESTIONS GÉNÉRÉES: ${questions.length}`);

    // Validation et nettoyage de chaque question
    const validatedQuestions = questions.slice(0, questionCount).map((q, index) => {
      console.log(`🔍 Validation question ${index + 1}:`, q);
      
      if (!q || typeof q !== 'object') {
        throw new Error(`Question ${index + 1} invalide - pas un objet`);
      }

      const questionId = q.id || `q${index + 1}`;
      const question = q.question || `Question ${index + 1} non définie`;
      
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        console.error(`❌ Question ${index + 1} options invalides:`, q.options);
        throw new Error(`Question ${index + 1}: 4 options requises, reçu ${q.options?.length || 0}`);
      }
      
      const correctAnswer = typeof q.correctAnswer === 'number' && 
        q.correctAnswer >= 0 && q.correctAnswer <= 3 
        ? q.correctAnswer 
        : 0;
      
      if (correctAnswer !== q.correctAnswer) {
        console.warn(`⚠️ Question ${index + 1}: correctAnswer corrigé de ${q.correctAnswer} vers ${correctAnswer}`);
      }
      
      const verse = q.verse || 'Référence biblique non spécifiée';

      return {
        id: questionId,
        question: question.trim(),
        options: q.options.map(opt => opt.toString().trim()),
        correctAnswer,
        verse: verse.trim()
      };
    });

    console.log(`✅ SUCCÈS ! ${validatedQuestions.length} QUESTIONS UNIQUES GÉNÉRÉES AVEC GEMINI (seed: ${uniqueSeed})`);
    console.log('📋 APERÇU DES QUESTIONS GÉNÉRÉES:');
    validatedQuestions.forEach((q, i) => {
      console.log(`${i + 1}. ${q.question.substring(0, 80)}... (Réponse: ${q.options[q.correctAnswer]})`);
    });

    return new Response(JSON.stringify({ questions: validatedQuestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ ERREUR DANS generate-quiz-questions:', error);
    
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
