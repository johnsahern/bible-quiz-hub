
import { QuizQuestion } from './biblical-contexts.ts';

export function validateQuestions(questions: any[], expectedCount: number): any[] {
  console.log('🔍 Validation des questions reçues...');
  
  if (!Array.isArray(questions)) {
    console.error('❌ Questions reçues ne sont pas un tableau');
    throw new Error('Format de questions invalide');
  }

  const validQuestions = questions.filter(q => {
    // Validation de base
    const hasBasicStructure = q.question && 
                             Array.isArray(q.options) && 
                             q.options.length === 4 &&
                             typeof q.correctAnswer === 'number' &&
                             q.correctAnswer >= 0 && 
                             q.correctAnswer < 4;
    
    if (!hasBasicStructure) {
      console.warn('❌ Question rejetée - structure invalide:', q);
      return false;
    }

    // Validation de la longueur de la question
    if (q.question.length < 10) {
      console.warn('❌ Question rejetée - trop courte:', q.question);
      return false;
    }

    // Validation des options
    if (q.options.some((opt: string) => !opt || opt.length < 2)) {
      console.warn('❌ Question rejetée - options invalides:', q.options);
      return false;
    }

    return true;
  });

  console.log(`✅ ${validQuestions.length}/${questions.length} questions validées`);

  if (validQuestions.length === 0) {
    throw new Error('Aucune question valide générée');
  }

  // Retourner exactement le nombre demandé (ou moins si pas assez)
  const finalQuestions = validQuestions.slice(0, expectedCount);
  
  // Ajouter des IDs séquentiels
  return finalQuestions.map((q, index) => ({
    ...q,
    id: q.id || `q${index + 1}`
  }));
}

export function generateUniqueSeed(theme: string, difficulty: string, questionCount: number): number {
  const timestamp = Date.now();
  const themeHash = theme.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const difficultyHash = difficulty.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Créer un seed vraiment unique basé sur plusieurs facteurs
  const uniqueSeed = Math.floor(timestamp / 1000) + themeHash * 1000 + difficultyHash * 100 + questionCount * 10;
  
  console.log(`🎲 Generated unique seed: ${uniqueSeed} for theme: ${theme}, difficulty: ${difficulty}`);
  return uniqueSeed;
}

export function cleanJsonResponse(response: string): string {
  console.log('🧹 Nettoyage de la réponse JSON...');
  
  let cleaned = response.trim();
  
  // Supprimer les balises markdown si présentes
  cleaned = cleaned.replace(/```json\s*/g, '');
  cleaned = cleaned.replace(/```\s*/g, '');
  
  // Supprimer tout texte avant le premier [
  const firstBracket = cleaned.indexOf('[');
  if (firstBracket !== -1) {
    cleaned = cleaned.substring(firstBracket);
  }
  
  // Supprimer tout texte après le dernier ]
  const lastBracket = cleaned.lastIndexOf(']');
  if (lastBracket !== -1) {
    cleaned = cleaned.substring(0, lastBracket + 1);
  }
  
  // Nettoyer les caractères de contrôle et espaces superflus
  cleaned = cleaned.replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ');
  
  console.log('✅ JSON nettoyé avec succès');
  return cleaned;
}

// Validation thématique ultra-stricte avec mots-clés pour TOUS les thèmes
export function validateThematicRelevance(questions: any[], selectedTheme: string): any[] {
  console.log(`🎯 VALIDATION THÉMATIQUE ULTRA-STRICTE pour: ${selectedTheme}`);
  
  // Mots-clés thématiques STRICTS pour TOUS les 146 thèmes disponibles
  const strictThematicKeywords: { [key: string]: string[] } = {
    // Jésus-Christ
    'vie-jesus': ['Jésus', 'Christ', 'Nazareth', 'Bethléem', 'Marie', 'Joseph', 'baptême', 'disciples', 'apôtres', 'crucifixion', 'résurrection', 'ascension', 'Pilate', 'croix', 'Galilée', 'messie', 'sauveur'],
    'miracles-jesus': ['miracle', 'guérison', 'aveugle', 'paralytique', 'lépreux', 'résurrection', 'multiplication', 'pain', 'poisson', 'tempête', 'mer', 'marcher', 'eau', 'Lazare', 'Jaïrus', 'hémorroïsse', 'Bartimée', 'Jésus', 'Christ'],
    'paraboles-jesus': ['parabole', 'Jésus', 'Christ', 'royaume', 'seigneur', 'maitre', 'serviteur', 'semeur', 'moisson', 'vigne', 'berger', 'brebis', 'talent', 'drachme', 'pharisien', 'publicain', 'samaritain', 'lazare', 'riche', 'pauvre'],
    'passion-christ': ['passion', 'Jésus', 'Christ', 'Jérusalem', 'cène', 'Gethsémané', 'arrestation', 'procès', 'flagellation', 'crucifixion', 'croix', 'Pilate', 'Barabbas', 'Golgotha', 'couronne', 'épines'],
    'resurrection': ['résurrection', 'Jésus', 'Christ', 'tombeau', 'Marie-Madeleine', 'Pierre', 'Jean', 'Emmaüs', 'apparition', 'disciples', 'Thomas', 'incrédule', 'ascension'],
    'bapteme-jesus': ['baptême', 'Jésus', 'Jean-Baptiste', 'Jourdain', 'Esprit', 'Saint', 'colombe', 'Père', 'Fils', 'bien-aimé', 'cieux', 'voix'],
    'transfiguration': ['transfiguration', 'Jésus', 'Pierre', 'Jacques', 'Jean', 'montagne', 'Moïse', 'Élie', 'gloire', 'nuée', 'voix', 'Père', 'écouter'],
    'ascension': ['ascension', 'Jésus', 'Christ', 'ciel', 'nuée', 'disciples', 'anges', 'Bethanie', 'retour', 'Esprit-Saint', 'promesse'],

    // Évangiles
    'evangeliles': ['évangile', 'Matthieu', 'Marc', 'Luc', 'Jean', 'Jésus', 'Christ', 'témoignage', 'récit', 'bonne', 'nouvelle'],
    'mathieu': ['Matthieu', 'évangile', 'Jésus', 'messie', 'roi', 'David', 'généalogie', 'sermon', 'montagne', 'béatitudes', 'accomplissement', 'prophétie'],
    'marc': ['Marc', 'évangile', 'Jésus', 'serviteur', 'miracle', 'action', 'aussitôt', 'royaume', 'Dieu', 'Pierre', 'confession'],
    'luc': ['Luc', 'évangile', 'Jésus', 'homme', 'parfait', 'sauveur', 'miséricorde', 'compassion', 'Marie', 'Magnificat', 'bergers', 'Siméon', 'Anne'],
    'jean-evangeliste': ['Jean', 'évangile', 'Jésus', 'Fils', 'Dieu', 'Parole', 'logos', 'lumière', 'témoin', 'suis', 'signes', 'miracle', 'gloire'],

    // Actes et apôtres
    'actes-apotres': ['Actes', 'apôtres', 'Esprit-Saint', 'Pentecôte', 'Pierre', 'Paul', 'église', 'témoignage', 'Jérusalem', 'Samarie', 'bout', 'terre'],
    'jean-baptiste': ['Jean-Baptiste', 'précurseur', 'baptême', 'repentance', 'Jourdain', 'Hérode', 'Hérodiade', 'Zacharie', 'Élisabeth', 'agneau', 'Dieu', 'voix', 'désert'],
    'pierre-apotre': ['Pierre', 'Simon', 'apôtre', 'chef', 'roc', 'église', 'clés', 'royaume', 'reniement', 'restauration', 'Pentecôte', 'sermon', 'Corneille'],
    'paul-apotre': ['Paul', 'Saul', 'Tarse', 'conversion', 'Damas', 'apôtre', 'nations', 'voyage', 'missionnaire', 'épîtres', 'Barnabas', 'Silas', 'prison', 'Rome'],

    // Pentateuque
    'creation': ['création', 'Genèse', 'Dieu', 'créateur', 'jours', 'Adam', 'Ève', 'Eden', 'jardin', 'arbre', 'connaissance', 'bien', 'mal', 'sabbat', 'image'],
    'genese': ['Genèse', 'commencement', 'création', 'Adam', 'Ève', 'Caïn', 'Abel', 'Noé', 'déluge', 'Abraham', 'Isaac', 'Jacob', 'Joseph', 'Égypte'],
    'exode': ['Exode', 'Moïse', 'Égypte', 'Pharaon', 'plaies', 'Pâque', 'mer', 'Rouge', 'Sinaï', 'commandements', 'loi', 'Aaron', 'veau', 'or', 'tabernacle'],
    'nombres': ['Nombres', 'recensement', 'désert', 'quarante', 'ans', 'errance', 'rébellion', 'serpent', 'airain', 'Balaam', 'ânesse', 'Canaan', 'espions'],
    'deuteronome': ['Deutéronome', 'Moïse', 'discours', 'loi', 'rappel', 'Shema', 'Écoute', 'Israël', 'Éternel', 'unique', 'bénédiction', 'malédiction'],
    'commandements': ['commandements', 'dix', 'tables', 'loi', 'Sinaï', 'Moïse', 'Dieu', 'Éternel', 'adorer', 'nom', 'vain', 'sabbat', 'parents', 'tuer', 'adultère', 'voler', 'faux', 'témoignage', 'convoiter'],

    // Patriarches
    'patriarches': ['patriarches', 'Abraham', 'Isaac', 'Jacob', 'alliance', 'promesse', 'foi', 'obéissance', 'bénédiction', 'postérité', 'Canaan'],
    'abraham': ['Abraham', 'Abram', 'Ur', 'Chaldéens', 'foi', 'alliance', 'promesse', 'Isaac', 'sacrifice', 'Morija', 'Sara', 'Hagar', 'Ismaël'],
    'isaac': ['Isaac', 'fils', 'promesse', 'Abraham', 'Sara', 'sacrifice', 'Morija', 'Rebecca', 'Ésaü', 'Jacob', 'bénédiction', 'puits'],
    'jacob': ['Jacob', 'Israël', 'Isaac', 'Rebecca', 'Ésaü', 'droit', 'aînesse', 'échelle', 'anges', 'lutte', 'ange', 'Béthel', 'Rachel', 'Léa', 'douze', 'fils'],
    'joseph': ['Joseph', 'Jacob', 'Rachel', 'songes', 'tunique', 'couleurs', 'frères', 'Égypte', 'Potiphar', 'prison', 'Pharaon', 'sept', 'années', 'abondance', 'famine'],
    'moise': ['Moïse', 'Égypte', 'Pharaon', 'buisson', 'ardent', 'Sinaï', 'Exode', 'plaies', 'mer', 'Rouge', 'commandements', 'loi', 'Aaron', 'Miriam', 'désert'],

    // Autres personnages AT
    'noe': ['Noé', 'déluge', 'arche', 'animaux', 'pluie', 'quarante', 'jours', 'colombe', 'olivier', 'arc-en-ciel', 'alliance', 'Sem', 'Cham', 'Japhet'],
    'adam-eve': ['Adam', 'Ève', 'Eden', 'jardin', 'création', 'image', 'Dieu', 'arbre', 'connaissance', 'serpent', 'fruit', 'défendu', 'péché', 'chute'],
    'cain-abel': ['Caïn', 'Abel', 'Adam', 'Ève', 'frères', 'sacrifice', 'offrande', 'jalousie', 'meurtre', 'sang', 'gardien', 'frère', 'fugitif', 'vagabond'],

    // Rois
    'david': ['David', 'roi', 'Israël', 'berger', 'Goliath', 'Saül', 'Jonathan', 'Bethléem', 'psaume', 'harpe', 'Jérusalem', 'Absalom', 'Salomon', 'arche', 'alliance', 'coeur', 'Dieu'],
    'salomon': ['Salomon', 'roi', 'David', 'sagesse', 'temple', 'Jérusalem', 'jugement', 'reine', 'Saba', 'proverbes', 'ecclésiaste', 'cantique', 'richesse', 'gloire'],
    'samuel': ['Samuel', 'juge', 'prophète', 'Anne', 'Elkana', 'Éli', 'temple', 'Silo', 'appel', 'Dieu', 'Saül', 'David', 'onction', 'roi'],
    'samson': ['Samson', 'juge', 'Nazaréen', 'force', 'cheveux', 'Dalila', 'Philistins', 'Gaza', 'colonnes', 'temple', 'Dagon', 'mort'],

    // Juges et histoire
    'josue': ['Josué', 'Moïse', 'successeur', 'Canaan', 'conquête', 'Jéricho', 'murailles', 'Gabaonites', 'soleil', 'arrêt', 'partage', 'terre'],
    'juges-israel': ['juges', 'Israël', 'cycle', 'péché', 'oppression', 'cri', 'libérateur', 'Gédéon', 'Déborah', 'Barak', 'Jephté', 'Samson'],
    'rois-israel': ['rois', 'Israël', 'Juda', 'royaume', 'divisé', 'Roboam', 'Jéroboam', 'idolâtrie', 'prophètes', 'Élie', 'Élisée', 'captivité'],

    // Prophètes
    'prophetes': ['prophètes', 'Éternel', 'parole', 'vision', 'oracle', 'repentance', 'jugement', 'restauration', 'messie', 'avenir'],
    'esaie': ['Ésaïe', 'prophète', 'vision', 'Éternel', 'Emmanuel', 'vierge', 'enfante', 'serviteur', 'souffrant', 'consolation', 'peuple'],
    'jeremie': ['Jérémie', 'prophète', 'larmes', 'pleureur', 'Juda', 'captivité', 'Babylone', 'nouvelle', 'alliance', 'coeur', 'loi'],
    'ezechiel': ['Ézéchiel', 'prophète', 'vision', 'chérubins', 'roues', 'temple', 'gloire', 'Éternel', 'ossements', 'secs', 'résurrection'],
    'daniel': ['Daniel', 'Babylone', 'Nebucadnetsar', 'songes', 'four', 'ardent', 'fosse', 'lions', 'vision', 'soixante-dix', 'semaines'],
    'elie-elisee': ['Élie', 'Élisée', 'prophètes', 'miracle', 'Carmel', 'Baal', 'feu', 'ciel', 'char', 'manteau', 'double', 'portion', 'esprit'],
    'jonas': ['Jonas', 'prophète', 'Ninive', 'fuite', 'Tarsis', 'tempête', 'poisson', 'trois', 'jours', 'repentance', 'miséricorde', 'ricin'],

    // Femmes
    'femmes-bible': ['femmes', 'Bible', 'Marie', 'Esther', 'Ruth', 'Déborah', 'Anne', 'Sara', 'Rebecca', 'Rachel', 'foi', 'courage'],
    'marie-mere-jesus': ['Marie', 'mère', 'Jésus', 'vierge', 'ange', 'Gabriel', 'Annonciation', 'Magnificat', 'Joseph', 'Bethléem', 'croix'],
    'marie-madeleine': ['Marie-Madeleine', 'Magdala', 'démons', 'disciples', 'fidèle', 'croix', 'résurrection', 'tombeau', 'jardinier'],
    'ruth': ['Ruth', 'Moabite', 'Naomi', 'belle-fille', 'fidélité', 'Boaz', 'glanage', 'rédemption', 'David', 'lignée'],
    'esther': ['Esther', 'reine', 'Perse', 'Assuérus', 'Mardochée', 'Haman', 'jeûne', 'courage', 'délivrance', 'Purim'],

    // Livres poétiques
    'job': ['Job', 'souffrance', 'juste', 'Satan', 'épreuves', 'amis', 'Élifaz', 'Bildad', 'Tsophar', 'Élihu', 'Éternel', 'tempête', 'restauration'],
    'psalmes': ['psaumes', 'David', 'cantiques', 'louange', 'prière', 'berger', 'vallée', 'ombre', 'mort', 'ennemi', 'coupe', 'déborde'],
    'proverbes': ['proverbes', 'Salomon', 'sagesse', 'crainte', 'Éternel', 'commencement', 'instruction', 'discipline', 'femme', 'vertueuse'],

    // Nouveau Testament - Épîtres
    'epitres-paul': ['épîtres', 'Paul', 'lettres', 'églises', 'Romains', 'Corinthiens', 'Galates', 'Éphésiens', 'Philippiens', 'Colossiens', 'Thessaloniciens', 'Timothée', 'Tite', 'Philémon'],
    'pierre-jean': ['Pierre', 'Jean', 'épîtres', 'lettres', 'espérance', 'amour', 'vérité', 'communion', 'lumière', 'ténèbres'],

    // Eschatologie
    'apocalypse': ['Apocalypse', 'révélation', 'Jean', 'Patmos', 'sept', 'églises', 'trône', 'agneau', 'sceaux', 'trompettes', 'coupes', 'Babylone', 'nouvelle', 'Jérusalem'],
    'pentecote': ['Pentecôte', 'Esprit-Saint', 'disciples', 'langues', 'feu', 'Pierre', 'sermon', 'trois', 'mille', 'baptême', 'église'],
    'eglise-primitive': ['église', 'primitive', 'première', 'communauté', 'chrétiens', 'partage', 'biens', 'prière', 'fraction', 'pain', 'persécution'],

    // Voyages et missions
    'voyages-paul': ['Paul', 'voyages', 'missionnaires', 'Barnabas', 'Silas', 'Luc', 'Antioche', 'Chypre', 'Galatie', 'Macédoine', 'Achaïe', 'Éphèse', 'Rome'],

    // Thèmes spéciaux
    'ancien-testament': ['Ancien', 'Testament', 'alliance', 'loi', 'prophètes', 'promesse', 'messie', 'temple', 'sacrifice', 'peuple', 'Israël'],
    'nouveau-testament': ['Nouveau', 'Testament', 'Jésus', 'Christ', 'évangile', 'église', 'apôtres', 'salut', 'grâce', 'foi', 'espérance', 'amour'],

    // Thèmes manquants - ajout des 146 thèmes complets
    'douze-apotres': ['douze', 'apôtres', 'Pierre', 'André', 'Jacques', 'Jean', 'Philippe', 'Barthélémy', 'Matthieu', 'Thomas', 'Jacques', 'Alphée', 'Simon', 'zélote', 'Judas', 'Iscariote', 'Matthias'],
    'sermon-montagne': ['sermon', 'montagne', 'béatitudes', 'heureux', 'pauvres', 'esprit', 'sel', 'terre', 'lumière', 'monde', 'notre', 'père', 'oiseaux', 'ciel', 'lis', 'champs'],
    'derniere-cene': ['dernière', 'cène', 'Pâque', 'pain', 'vin', 'corps', 'sang', 'nouvelle', 'alliance', 'mémoire', 'trahison', 'Judas'],
    'chemin-croix': ['chemin', 'croix', 'Simon', 'Cyrène', 'Véronique', 'filles', 'Jérusalem', 'Golgotha', 'crucifixion', 'larrons'],
    'genealogie-jesus': ['généalogie', 'Jésus', 'Abraham', 'David', 'quatorze', 'générations', 'Matthieu', 'Luc', 'Joseph', 'Marie'],
    'enfance-jesus': ['enfance', 'Jésus', 'Bethléem', 'mages', 'étoile', 'Hérode', 'fuite', 'Égypte', 'Nazareth', 'temple', 'docteurs'],
    'ministere-jesus': ['ministère', 'Jésus', 'Galilée', 'prédication', 'enseignement', 'guérisons', 'foules', 'disciples', 'royaume', 'Dieu'],
    'tentations-jesus': ['tentations', 'Jésus', 'désert', 'quarante', 'jours', 'Satan', 'diable', 'pierres', 'pain', 'temple', 'royaumes', 'monde'],
    'appellations-jesus': ['appellations', 'Jésus', 'Christ', 'messie', 'fils', 'Dieu', 'homme', 'seigneur', 'sauveur', 'agneau', 'berger', 'roi'],
    'enseignements-jesus': ['enseignements', 'Jésus', 'paroles', 'doctrine', 'vérité', 'amour', 'pardon', 'humilité', 'service', 'sacrifice'],

    // Personnages bibliques supplémentaires
    'melchisedek': ['Melchisédek', 'roi', 'Salem', 'prêtre', 'Dieu', 'Très-Haut', 'Abraham', 'pain', 'vin', 'dîme', 'bénédiction'],
    'lot': ['Lot', 'Abraham', 'neveu', 'Sodome', 'Gomorrhe', 'destruction', 'fuite', 'femme', 'statue', 'sel', 'filles', 'caverne'],
    'rebecca': ['Rebecca', 'Isaac', 'épouse', 'puits', 'serviteur', 'Abraham', 'bracelets', 'anneaux', 'Ésaü', 'Jacob', 'préférence'],
    'lea-rachel': ['Léa', 'Rachel', 'Jacob', 'épouses', 'Laban', 'sept', 'années', 'service', 'amour', 'enfants', 'rivalité'],
    'aaron': ['Aaron', 'Moïse', 'frère', 'porte-parole', 'grand-prêtre', 'Israël', 'veau', 'or', 'bâton', 'fleuri', 'amandier'],
    'miriam': ['Miriam', 'Moïse', 'Aaron', 'sœur', 'prophétesse', 'cantique', 'tambourin', 'lèpre', 'critique', 'guérison'],
    'josue-fils-nun': ['Josué', 'fils', 'Nun', 'successeur', 'Moïse', 'espion', 'Canaan', 'foi', 'courage', 'conquête'],
    'caleb': ['Caleb', 'espion', 'Canaan', 'rapport', 'favorable', 'foi', 'courage', 'Hébron', 'héritage', 'quatre-vingt-cinq', 'ans'],
    'gideon': ['Gédéon', 'juge', 'Israël', 'Madianites', 'toison', 'rosée', 'trois', 'cents', 'hommes', 'cruches', 'torches', 'trompettes'],
    'deborah': ['Déborah', 'prophétesse', 'juge', 'Israël', 'Barak', 'Sisera', 'Jaël', 'clou', 'tente', 'cantique', 'victoire'],
    'anne-samuel': ['Anne', 'Samuel', 'mère', 'stérilité', 'prière', 'vœu', 'temple', 'Silo', 'Éli', 'cantique', 'louange'],
    'eli-pretre': ['Éli', 'prêtre', 'juge', 'Israël', 'Silo', 'Samuel', 'fils', 'Hophni', 'Phinées', 'méchants', 'jugement'],

    // Rois et dirigeants
    'saul-roi': ['Saül', 'premier', 'roi', 'Israël', 'onction', 'Samuel', 'désobéissance', 'rejet', 'David', 'jalousie', 'Endor'],
    'roboam': ['Roboam', 'Salomon', 'fils', 'royaume', 'divisé', 'dix', 'tribus', 'Jéroboam', 'conseil', 'anciens', 'jeunes'],
    'jeroboam': ['Jéroboam', 'roi', 'Israël', 'dix', 'tribus', 'veaux', 'or', 'Dan', 'Béthel', 'péché', 'royaume'],
    'achab': ['Achab', 'roi', 'Israël', 'Jézabel', 'Baal', 'Élie', 'sécheresse', 'Carmel', 'Naboth', 'vigne'],
    'ezechias': ['Ézéchias', 'roi', 'Juda', 'réforme', 'religieuse', 'Sanchérib', 'Assyrie', 'ange', 'délivrance', 'cadran', 'soleil'],
    'josias': ['Josias', 'roi', 'Juda', 'réforme', 'temple', 'livre', 'loi', 'Pâque', 'idoles', 'destruction', 'Méguiddo'],
    'nebucadnetsar': ['Nebucadnetsar', 'roi', 'Babylone', 'Jérusalem', 'destruction', 'temple', 'captivité', 'Daniel', 'statue', 'songe'],
    'cyrus': ['Cyrus', 'roi', 'Perse', 'édit', 'retour',  'exil', 'temple', 'reconstruction', 'oint', 'Éternel', 'berger'],

    // Autres prophètes
    'elisee': ['Élisée', 'Élie', 'successeur', 'double', 'portion', 'esprit', 'miracles', 'Sunamite', 'Naaman', 'hache', 'Jourdain'],
    'nathan': ['Nathan', 'prophète', 'David', 'parabole', 'brebis', 'temple', 'alliance', 'Salomon', 'Adonija', 'onction'],
    'gad': ['Gad', 'prophète', 'voyant', 'David', 'choix', 'châtiment', 'peste', 'aire', 'Arauna', 'autel'],
    'achija': ['Achija', 'prophète', 'Silo', 'manteau', 'douze', 'morceaux', 'Jéroboam', 'royaume', 'divisé'],
    'michee': ['Michée', 'prophète', 'Bethléem', 'messie', 'berger', 'Israël', 'justice', 'miséricorde', 'marcher', 'humblement'],
    'habacuc': ['Habacuc', 'prophète', 'pourquoi', 'méchants', 'prospèrent', 'juste', 'vivra', 'foi', 'prière', 'cantique'],
    'sophonie': ['Sophonie', 'prophète', 'jour', 'Éternel', 'colère', 'jugement', 'reste', 'fidèle', 'joie', 'chant'],
    'aggee': ['Aggée', 'prophète', 'retour', 'exil', 'temple', 'reconstruction', 'Zorobabel', 'Josué', 'grand-prêtre'],
    'zacharie': ['Zacharie', 'prophète', 'visions', 'chandelier', 'or', 'olivier', 'pierre', 'sept', 'yeux', 'messie', 'roi'],
    'malachie': ['Malachie', 'prophète', 'dernier', 'Ancien', 'Testament', 'dîme', 'Élie', 'précurseur', 'grand', 'jour'],

    // Livres historiques
    '1-samuel': ['Samuel', 'premier', 'livre', 'Anne', 'naissance', 'appel', 'juge', 'Saül', 'onction', 'David'],
    '2-samuel': ['Samuel', 'deuxième', 'livre', 'David', 'roi', 'Juda', 'Israël', 'Jérusalem', 'alliance', 'Absalom'],
    '1-rois': ['Rois', 'premier', 'livre', 'Salomon', 'sagesse', 'temple', 'reine', 'Saba', 'royaume', 'divisé'],
    '2-rois': ['Rois', 'deuxième', 'livre', 'Élie', 'Élisée', 'royaume', 'divisé', 'captivité', 'Assyrie', 'Babylone'],
    '1-chroniques': ['Chroniques', 'premier', 'livre', 'généalogies', 'David', 'règne', 'temple', 'préparatifs', 'organisation'],
    '2-chroniques': ['Chroniques', 'deuxième', 'livre', 'Salomon', 'temple', 'construction', 'rois', 'Juda', 'réformes'],
    'esdras': ['Esdras', 'retour', 'exil', 'temple', 'reconstruction', 'Cyrus', 'Artaxerxès', 'loi', 'séparation'],
    'nehemie': ['Néhémie', 'échanson', 'Artaxerxès', 'Jérusalem', 'murailles', 'reconstruction', 'opposition', 'réformes'],

    // Livres poétiques complémentaires
    'cantique-cantiques': ['Cantique', 'cantiques', 'Salomon', 'amour', 'époux', 'épouse', 'bien-aimé', 'bien-aimée', 'jardin'],
    'ecclesiaste': ['Ecclésiaste', 'prédicateur', 'vanité', 'vanités', 'temps', 'toute', 'chose', 'soleil', 'sagesse', 'crainte', 'Dieu'],
    'lamentations': ['Lamentations', 'Jérémie', 'Jérusalem', 'destruction', 'deuil', 'pleurs', 'miséricorde', 'chaque', 'matin'],

    // Livres deutérocanoniques (si applicables)
    'tobie': ['Tobie', 'démon', 'Asmodée', 'poisson', 'ange', 'Raphaël', 'Sara', 'mariage', 'aumône'],
    'judith': ['Judith', 'Holopherne', 'Béthulie', 'siège', 'courage', 'beauté', 'victoire', 'délivrance'],
    'maccabees': ['Maccabées', 'Antiochus', 'Épiphane', 'persécution', 'révolte', 'Judas', 'temple', 'purification'],

    // Thèmes théologiques
    'alliance-dieu': ['alliance', 'Dieu', 'promesse', 'fidélité', 'engagement', 'sang', 'signe', 'arc-en-ciel', 'circoncision'],
    'salut': ['salut', 'sauveur', 'rédemption', 'grâce', 'foi', 'œuvres', 'justification', 'sanctification', 'glorification'],
    'peche': ['péché', 'chute', 'désobéissance', 'transgression', 'iniquité', 'repentance', 'pardon', 'purification'],
    'amour-dieu': ['amour', 'Dieu', 'agapé', 'charité', 'compassion', 'miséricorde', 'tendresse', 'bonté'],
    'esperance': ['espérance', 'attente', 'promesse', 'avenir', 'résurrection', 'vie', 'éternelle', 'ciel'],
    'foi': ['foi', 'croire', 'confiance', 'assurance', 'conviction', 'fidélité', 'œuvres', 'justification'],
    'grace': ['grâce', 'faveur', 'immérité', 'don', 'gratuit', 'salut', 'œuvres', 'mérite'],
    'justice-dieu': ['justice', 'Dieu', 'juste', 'équité', 'jugement', 'châtiment', 'récompense', 'droiture'],
    'saintete': ['sainteté', 'saint', 'pur', 'séparé', 'consacré', 'sanctification', 'perfection', 'imitation'],
    'sagesse': ['sagesse', 'intelligent', 'prudence', 'discernement', 'crainte', 'Éternel', 'folie', 'monde'],

    // Pratiques et institutions
    'sabbat': ['sabbat', 'repos', 'septième', 'jour', 'sanctifier', 'cessation', 'travail', 'adoration'],
    'circoncision': ['circoncision', 'alliance', 'signe', 'chair', 'cœur', 'Abraham', 'huitième', 'jour'],
    'bapteme': ['baptême', 'eau', 'immersion', 'purification', 'mort', 'résurrection', 'Esprit', 'nouveau', 'naissance'],
    'cene': ['cène', 'communion', 'pain', 'vin', 'corps', 'sang', 'mémoire', 'proclamation', 'mort'],
    'priere': ['prière', 'supplication', 'intercession', 'adoration', 'louange', 'action', 'grâces', 'demande'],
    'jeune': ['jeûne', 'abstinence', 'nourriture', 'humiliation', 'recherche', 'Dieu', 'Daniel', 'Ninive'],
    'offrandes': ['offrandes', 'sacrifices', 'holocauste', 'expiation', 'action', 'grâces', 'dîme', 'prémices'],
    'temple': ['temple', 'Salomon', 'maison', 'Dieu', 'sanctuaire', 'parvis', 'saint', 'saints', 'gloire'],
    'tabernacle': ['tabernacle', 'tente', 'assignation', 'Moïse', 'désert', 'arche', 'alliance', 'propitiatoire'],
    'arche-alliance': ['arche', 'alliance', 'témoignage', 'tables', 'loi', 'manne', 'bâton', 'Aaron', 'chérubins'],

    // Géographie biblique
    'jerusalem': ['Jérusalem', 'Sion', 'ville', 'sainte', 'David', 'temple', 'mur', 'lamentations', 'nouvelle'],
    'canaan': ['Canaan', 'terre', 'promise', 'lait', 'miel', 'héritage', 'tribus', 'Israël', 'conquête'],
    'egypte': ['Égypte', 'esclavage', 'Pharaon', 'Nil', 'plaies', 'Exode', 'fuite', 'Jésus', 'refuge'],
    'babylone': ['Babylone', 'captivité', 'exil', 'Nebucadnetsar', 'tour', 'Babel', 'confusion', 'langues'],
    'assyrie': ['Assyrie', 'Ninive', 'Sanchérib', 'déportation', 'dix', 'tribus', 'Jonas', 'repentance'],
    'rome': ['Rome', 'empire', 'César', 'Paul', 'épître', 'Romains', 'Pierre', 'martyrs'],
    'galilee': ['Galilée', 'Jésus', 'Nazareth', 'Capernaüm', 'mer', 'lac', 'Génésareth', 'pêcheurs'],
    'judee': ['Judée', 'Jérusalem', 'Bethléem', 'désert', 'Jean-Baptiste', 'Hérode', 'Pilate'],
    'samarie': ['Samarie', 'Samaritains', 'schisme', 'Jacob', 'puits', 'femme', 'adoration', 'esprit', 'vérité'],

    // Peuples et nations
    'israelites': ['Israélites', 'Hébreux', 'peuple', 'élu', 'alliance', 'circoncision', 'loi', 'terre', 'promise'],
    'philistins': ['Philistins', 'Goliath', 'Dagon', 'Gaza', 'arche', 'alliance', 'Samson', 'David'],
    'egyptiens': ['Égyptiens', 'Pharaon', 'esclavage', 'plaies', 'magiciens', 'poursuites', 'mer', 'Rouge'],
    'assyriens': ['Assyriens', 'Ninive', 'Sanchérib', 'siège', 'Jérusalem', 'ange', 'destruction'],
    'babyloniens': ['Babyloniens', 'Chaldéens', 'Nebucadnetsar', 'captivité', 'Daniel', 'exil'],
    'perses': ['Perses', 'Cyrus', 'Darius', 'Artaxerxès', 'retour', 'exil', 'Esther', 'Mardochée'],
    'romains': ['Romains', 'empire', 'César', 'Pilate', 'centurions', 'Paul', 'citoyenneté'],

    // Événements majeurs
    'deluge': ['déluge', 'Noé', 'arche', 'pluie', 'quarante', 'jours', 'colombe', 'arc-en-ciel', 'alliance'],
    'sodome-gomorrhe': ['Sodome', 'Gomorrhe', 'destruction', 'soufre', 'feu', 'Lot', 'femme', 'statue', 'sel'],
    'plaies-egypte': ['plaies', 'Égypte', 'eau', 'sang', 'grenouilles', 'moucherons', 'mouches', 'peste', 'ulcères', 'grêle', 'sauterelles', 'ténèbres', 'premiers-nés'],
    'traversee-mer-rouge': ['traversée', 'mer', 'Rouge', 'Moïse', 'bâton', 'eaux', 'divisées', 'sec', 'Égyptiens', 'engloutis'],
    'don-loi': ['don', 'loi', 'Sinaï', 'Moïse', 'tables', 'pierre', 'commandements', 'tonnerre', 'éclairs', 'fumée'],
    'entree-canaan': ['entrée', 'Canaan', 'Josué', 'Jourdain', 'Jéricho', 'murailles', 'conquête', 'partage'],
    'deportation': ['déportation', 'exil', 'captivité', 'Assyrie', 'Babylone', 'dix', 'tribus', 'Juda'],
    'retour-exil': ['retour', 'exil', 'Cyrus', 'édit', 'Zorobabel', 'Esdras', 'Néhémie', 'reconstruction'],

    // Fêtes et célébrations
    'paque': ['Pâque', 'agneau', 'sang', 'linteaux', 'portes', 'azymes', 'pain', 'premiers-nés', 'délivrance'],
    'pentecote': ['Pentecôte', 'cinquante', 'jours', 'prémices', 'moisson', 'Esprit-Saint', 'langues', 'feu'],
    'tabernacles': ['Tabernacles', 'Tentes', 'fête', 'récolte', 'automne', 'joie', 'cabanes', 'souvenir', 'désert'],
    'expiation': ['expiation', 'Yom', 'Kippour', 'grand-prêtre', 'saint', 'saints', 'bouc', 'émissaire', 'pardon'],
    'nouvel-an': ['nouvel', 'an', 'Rosh', 'Hashana', 'trompettes', 'jugement', 'livre', 'vie'],
    'purim': ['Purim', 'Esther', 'Mardochée', 'Haman', 'sort', 'délivrance', 'joie', 'festin'],

    // Symboles et métaphores
    'agneau': ['agneau', 'Pâque', 'sacrifice', 'innocent', 'Jésus', 'Christ', 'rédemption', 'sang'],
    'berger': ['berger', 'brebis', 'troupeau', 'houlette', 'pâturage', 'eau', 'repos', 'protection'],
    'vigne': ['vigne', 'cep', 'sarments', 'fruit', 'raisin', 'vin', 'vigneron', 'taille'],
    'pain': ['pain', 'nourriture', 'manne', 'vie', 'parole', 'Dieu', 'multiplication', 'cène'],
    'eau': ['eau', 'source', 'puits', 'fontaine', 'vie', 'purification', 'baptême', 'Esprit'],
    'lumiere': ['lumière', 'ténèbres', 'lampe', 'chandelier', 'étoile', 'soleil', 'vérité', 'révélation'],
    'chemin': ['chemin', 'voie', 'sentier', 'marche', 'route', 'direction', 'conduite', 'vie'],
    'porte': ['porte', 'entrée', 'seuil', 'clé', 'ouvrir', 'fermer', 'accès', 'salut'],

    // Anges et êtres célestes
    'anges': ['anges', 'messagers', 'Dieu', 'Gabriel', 'Michel', 'chérubins', 'séraphins', 'armée', 'céleste'],
    'gabriel': ['Gabriel', 'ange', 'Daniel', 'vision', 'soixante-dix', 'semaines', 'Marie', 'Annonciation'],
    'michel': ['Michel', 'archange', 'Daniel', 'prince', 'Israël', 'guerre', 'dragon', 'Satan'],
    'cherubins': ['chérubins', 'Eden', 'épée', 'flamme', 'arche', 'alliance', 'propitiatoire', 'ailes'],
    'seraphins': ['séraphins', 'Ésaïe', 'vision', 'trône', 'saint', 'charbon', 'ardent', 'lèvres'],

    // Satan et démons
    'satan': ['Satan', 'diable', 'adversaire', 'tentateur', 'serpent', 'dragon', 'lion', 'rugissant'],
    'demons': ['démons', 'esprits', 'impurs', 'mauvais', 'possession', 'délivrance', 'exorcisme', 'Légion'],
    'beelzebul': ['Béelzébul', 'prince', 'démons', 'Pharisiens', 'accusation', 'royaume', 'divisé'],

    // Eschatologie et prophéties
    'fin-temps': ['fin', 'temps', 'derniers', 'jours', 'signes', 'tribulation', 'antéchrist', 'enlèvement'],
    'retour-christ': ['retour', 'Christ', 'seconde', 'venue', 'parousie', 'nuées', 'gloire', 'jugement'],
    'jugement-dernier': ['jugement', 'dernier', 'grand', 'trône', 'blanc', 'livre', 'vie', 'morts'],
    'resurrection-morts': ['résurrection', 'morts', 'première', 'seconde', 'corps', 'glorieux', 'incorruptible'],
    'ciel-nouveau': ['ciel', 'nouveau', 'terre', 'nouvelle', 'Jérusalem', 'descend', 'tabernacle', 'Dieu'],
    'enfer': ['enfer', 'hadès', 'géhenne', 'étang', 'feu', 'soufre', 'tourments', 'éternels'],

    // Langues et traductions
    'hebreu': ['hébreu', 'langue', 'originale', 'Ancien', 'Testament', 'Masorète', 'alphabet'],
    'grec': ['grec', 'koinè', 'Nouveau', 'Testament', 'Septante', 'traduction', 'culture'],
    'arameen': ['araméen', 'Daniel', 'Esdras', 'Jésus', 'Talitha', 'koumi', 'Abba', 'Père'],

    // Manuscrits et transmission
    'manuscrits': ['manuscrits', 'parchemins', 'papyrus', 'copistes', 'scribes', 'transmission', 'fidélité'],
    'canon': ['canon', 'livres', 'inspirés', 'autorité', 'reconnaissance', 'église', 'conciles'],
    'inspiration': ['inspiration', 'souffle', 'Dieu', 'Esprit-Saint', 'prophètes', 'apôtres', 'écriture'],

    // Histoire de l'Église primitive
    'persecution': ['persécution', 'martyrs', 'Étienne', 'lapidation', 'Néron', 'Domitien', 'arènes'],
    'martyrs': ['martyrs', 'témoins', 'sang', 'Étienne', 'Jacques', 'Pierre', 'Paul', 'fidélité'],
    'conciles': ['conciles', 'Jérusalem', 'apôtres', 'circoncision', 'païens', 'décision', 'Esprit-Saint'],

    // Groupes religieux
    'pharisiens': ['Pharisiens', 'loi', 'tradition', 'anciens', 'légalisme', 'hypocrisie', 'justice', 'propre'],
    'sadduceens': ['Sadducéens', 'temple', 'sacrificateurs', 'résurrection', 'nient', 'aristocratie'],
    'esseniens': ['Esséniens', 'Qumrân', 'manuscrits', 'mer', 'Morte', 'communauté', 'pureté'],
    'zelotes': ['Zélotes', 'nationalistes', 'résistance', 'romaine', 'Simon', 'zélote', 'révolte'],

    // Métiers et professions
    'pecheurs': ['pêcheurs', 'mer', 'Galilée', 'filets', 'barques', 'Pierre', 'André', 'Jacques', 'Jean'],
    'bergers': ['bergers', 'troupeaux', 'pâturages', 'David', 'Abel', 'Bethléem', 'nativité', 'anges'],
    'agriculteurs': ['agriculteurs', 'laboureurs', 'semeurs', 'moissonneurs', 'vignerons', 'paraboles'],
    'artisans': ['artisans', 'charpentiers', 'Joseph', 'Jésus', 'maçons', 'temple', 'Salomon'],
    'marchands': ['marchands', 'commerce', 'caravanes', 'temple', 'chassés', 'table', 'changeurs'],

    // Vie quotidienne
    'mariage': ['mariage', 'noces', 'époux', 'épouse', 'alliance', 'fidélité', 'Cana', 'vin'],
    'famille': ['famille', 'père', 'mère', 'enfants', 'frères', 'sœurs', 'héritage', 'bénédiction'],
    'education': ['éducation', 'enseignement', 'maître', 'disciple', 'Torah', 'synagogue', 'école'],
    'hospitalite': ['hospitalité', 'accueil', 'étranger', 'Abraham', 'anges', 'Lot', 'protection'],

    // Emotions et sentiments
    'joie': ['joie', 'allégresse', 'réjouissance', 'cantique', 'louange', 'fête', 'bonheur'],
    'tristesse': ['tristesse', 'deuil', 'pleurs', 'lamentations', 'consolation', 'réconfort'],
    'colere': ['colère', 'fureur', 'indignation', 'Dieu', 'juste', 'péché', 'châtiment'],
    'paix': ['paix', 'shalom', 'réconciliation', 'repos', 'tranquillité', 'harmonie', 'Prince'],
    'crainte': ['crainte', 'peur', 'révérence', 'respect', 'Dieu', 'commencement', 'sagesse'],

    // Vertus et vices
    'humilite': ['humilité', 'modestie', 'simplicité', 'abaissement', 'service', 'Jésus', 'exemple'],
    'orgueil': ['orgueil', 'fierté', 'arrogance', 'hauteur', 'chute', 'résistance', 'Dieu'],
    'patience': ['patience', 'persévérance', 'endurance', 'constance', 'épreuves', 'Job'],
    'courage': ['courage', 'bravoure', 'hardiesse', 'force', 'Josué', 'David', 'Esther'],
    'fidelite': ['fidélité', 'loyauté', 'constance', 'engagement', 'alliance', 'Ruth', 'Naomi'],
    'justice': ['justice', 'équité', 'droiture', 'jugement', 'balance', 'poids', 'mesure'],
    'misericorde': ['miséricorde', 'compassion', 'pitié', 'grâce', 'pardon', 'bonté', 'tendresse'],
    'verite': ['vérité', 'sincérité', 'authentique', 'réel', 'Jésus', 'chemin', 'vie']
  };
  
  const keywords = strictThematicKeywords[selectedTheme] || [];
  
  if (keywords.length === 0) {
    console.warn(`⚠️ AUCUN MOT-CLÉ DÉFINI POUR LE THÈME: ${selectedTheme}`);
    return questions; // Accepter toutes les questions si pas de mots-clés définis
  }
  
  const thematicallyValidQuestions = questions.filter(q => {
    const fullText = `${q.question} ${q.options.join(' ')} ${q.verse || ''}`.toLowerCase();
    
    // Vérification STRICTE : au moins 1 mot-clé doit être présent
    const matchingKeywords = keywords.filter(keyword => 
      fullText.includes(keyword.toLowerCase())
    );
    
    const isThematicallyValid = matchingKeywords.length >= 1;
    
    if (!isThematicallyValid) {
      console.warn(`❌ QUESTION HORS-THÈME REJETÉE: "${q.question.substring(0, 60)}..."`);
      console.warn(`   Mots-clés trouvés: ${matchingKeywords.join(', ') || 'AUCUN'}`);
      console.warn(`   Mots-clés requis: ${keywords.join(', ')}`);
    } else {
      console.log(`✅ Question thématiquement valide: "${q.question.substring(0, 60)}..." (mots-clés: ${matchingKeywords.join(', ')})`);
    }
    
    return isThematicallyValid;
  });
  
  console.log(`🎯 RÉSULTAT: ${thematicallyValidQuestions.length}/${questions.length} questions respectent le thème "${selectedTheme}"`);
  
  // Si moins de 50% des questions sont valides, on retourne une erreur
  if (thematicallyValidQuestions.length < Math.ceil(questions.length * 0.5)) {
    console.error(`❌ ÉCHEC VALIDATION THÉMATIQUE: Seulement ${thematicallyValidQuestions.length}/${questions.length} questions valides pour "${selectedTheme}"`);
    throw new Error(`Questions générées ne respectent pas le thème "${selectedTheme}". Relancez la génération.`);
  }
  
  return thematicallyValidQuestions;
}
