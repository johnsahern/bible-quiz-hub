// Mots-clés pour le thème "Vue d'ensemble de la Bible"
const overviewKeywords = [
  'bible', 'ancien testament', 'nouveau testament', 'écriture', 'verset', 'histoire biblique',
  'personnage biblique', 'événement biblique', 'enseignement biblique', 'doctrine', 'foi', 'chrétien',
  'église', 'jésus-christ', 'dieu', 'saint-esprit', 'trinité', 'salut', 'rédemption', 'grâce',
  'amour', 'prière', 'adoration', 'louange', 'prophétie', 'miracle', 'parabole', 'apôtre', 'disciple',
  'prophète', 'roi', 'prêtre', 'sacrifice', 'alliance', 'commandement', 'loi', 'péché', 'repentir',
  'pardon', 'jugement', 'ciel', 'enfer', 'résurrection', 'vie éternelle', 'royaume de dieu', 'paradis',
  'ange', 'démon', 'satan', 'diable', 'tentation', 'épreuve', 'souffrance', 'persévérance', 'victoire',
  'paix', 'joie', 'espérance', 'vérité', 'justice', 'sagesse', 'connaissance', 'compréhension',
  'sainteté', 'pureté', 'humilité', 'obéissance', 'fidélité', 'persévérance', 'amour fraternel',
  'compassion', 'miséricorde', 'bonté', 'douceur', 'maîtrise de soi', 'patience', 'longanimité',
  'bienveillance', 'charité', 'aumône', 'offrande', 'dîme', 'culte', 'sacrement', 'ordonnance',
  'évangile', 'bonne nouvelle', 'témoignage', 'mission', 'évangélisation', 'discipolat', 'croix',
  'sang de jésus', 'rédempteur', 'sauveur', 'libérateur', 'consolateur', 'avocat', 'médiateur',
  'berger', 'porte', 'chemin', 'lumière', 'sel', 'levain', 'semence', 'moisson', 'vigne', 'olivier',
  'arbre de vie', 'eau vive', 'pain de vie', 'rocher', 'forteresse', 'bouclier', 'épée', 'armure',
  'couronne', 'trône', 'sceptre', 'royaume', 'ville', 'temple', 'maison', 'famille', 'mariage',
  'enfant', 'parent', 'frère', 'sœur', 'ami', 'voisin', 'étranger', 'pauvre', 'riche', 'esclave',
  'libre', 'gouvernement', 'nation', 'peuple', 'langue', 'culture', 'art', 'musique', 'danse',
  'théâtre', 'littérature', 'poésie', 'prose', 'histoire', 'géographie', 'science', 'technologie',
  'médecine', 'éducation', 'travail', 'économie', 'politique', 'justice sociale', 'environnement',
  'paix mondiale', 'unité', 'diversité', 'tolérance', 'respect', 'dialogue', 'coopération',
  'développement', 'progrès', 'avenir', 'destinée', 'éternité', 'amour éternel', 'joie éternelle',
  'paix éternelle', 'vie éternelle', 'présence de dieu', 'gloire de dieu', 'puissance de dieu',
  'sagesse de dieu', 'connaissance de dieu', 'amour de dieu', 'grâce de dieu', 'miséricorde de dieu',
  'bonté de dieu', 'fidélité de dieu', 'justice de dieu', 'sainteté de dieu', 'vérité de dieu',
  'parole de dieu', 'esprit de dieu', 'royaume de dieu', 'volonté de dieu', 'plan de dieu',
  'promesse de dieu', 'appel de dieu', 'don de dieu', 'bénédiction de dieu', 'protection de dieu',
  'direction de dieu', 'consolation de dieu', 'guérison de dieu', 'miracle de dieu', 'intervention de dieu',
  'présence de dieu', 'gloire de dieu', 'puissance de dieu', 'sagesse de dieu', 'connaissance de dieu',
  'amour de dieu', 'grâce de dieu', 'miséricorde de dieu', 'bonté de dieu', 'fidélité de dieu',
  'justice de dieu', 'sainteté de dieu', 'vérité de dieu', 'parole de dieu', 'esprit de dieu',
  'royaume de dieu', 'volonté de dieu', 'plan de dieu', 'promesse de dieu', 'appel de dieu',
  'don de dieu', 'bénédiction de dieu', 'protection de dieu', 'direction de dieu', 'consolation de dieu',
  'guérison de dieu', 'miracle de dieu', 'intervention de dieu'
];

// Mots-clés pour le thème "Vie de Jésus"
const vieJesusKeywords = [
  'jésus', 'christ', 'vie de jésus', 'naissance', 'ministère', 'miracles', 'paraboles', 'enseignements',
  'passion', 'crucifixion', 'résurrection', 'ascension', 'rédempteur', 'sauveur', 'messie', 'fils de dieu',
  'fils de l\'homme', 'seigneur', 'roi', 'prêtre', 'prophète', 'disciple', 'apôtre', 'marie', 'joseph',
  'jean-baptiste', 'pierre', 'jacques', 'jean', 'judas', 'philippe', 'barthélemy', 'thomas', 'matthieu',
  'simon', 'thaddée', 'jacques le mineur', 'paul', 'étienne', 'pilate', 'hérode', 'caïphe', 'anne',
  'pharisiens', 'sadducéens', 'scribes', 'docteurs de la loi', 'peuple', 'foule', 'enfants', 'femmes',
  'pêcheurs', 'collecteurs d\'impôts', 'lépreux', 'aveugles', 'boiteux', 'sourds', 'muets', 'possédés',
  'malades', 'pauvres', 'riches', 'soldats', 'gouverneurs', 'rois', 'empereurs', 'césar', 'rome',
  'jérusalem', 'bethléem', 'nazareth', 'galilée', 'judée', 'samarie', 'jordanie', 'mer de galilée',
  'mont des oliviers', 'géthsémani', 'golgotha', 'tombeau', 'cène', 'eucharistie', 'pâque', 'fête',
  'sabbat', 'synagogue', 'temple', 'prière', 'jeûne', 'aumône', 'amour', 'foi', 'espérance', 'paix',
  'joie', 'vérité', 'justice', 'sagesse', 'connaissance', 'compréhension', 'sainteté', 'pureté',
  'humilité', 'obéissance', 'fidélité', 'persévérance', 'amour fraternel', 'compassion', 'miséricorde',
  'bonté', 'douceur', 'maîtrise de soi', 'patience', 'longanimité', 'bienveillance', 'charité',
  'aumône', 'offrande', 'dîme', 'culte', 'sacrement', 'ordonnance', 'évangile', 'bonne nouvelle',
  'témoignage', 'mission', 'évangélisation', 'discipolat', 'croix', 'sang de jésus', 'rédempteur',
  'sauveur', 'libérateur', 'consolateur', 'avocat', 'médiateur', 'berger', 'porte', 'chemin',
  'lumière', 'sel', 'levain', 'semence', 'moisson', 'vigne', 'olivier', 'arbre de vie', 'eau vive',
  'pain de vie', 'rocher', 'forteresse', 'bouclier', 'épée', 'armure', 'couronne', 'trône', 'sceptre',
  'royaume', 'ville', 'temple', 'maison', 'famille', 'mariage', 'enfant', 'parent', 'frère', 'sœur',
  'ami', 'voisin', 'étranger', 'pauvre', 'riche', 'esclave', 'libre', 'gouvernement', 'nation',
  'peuple', 'langue', 'culture', 'art', 'musique', 'danse', 'théâtre', 'littérature', 'poésie',
  'prose', 'histoire', 'géographie', 'science', 'technologie', 'médecine', 'éducation', 'travail',
  'économie', 'politique', 'justice sociale', 'environnement', 'paix mondiale', 'unité', 'diversité',
  'tolérance', 'respect', 'dialogue', 'coopération', 'développement', 'progrès', 'avenir', 'destinée',
  'éternité', 'amour éternel', 'joie éternelle', 'paix éternelle', 'vie éternelle', 'présence de dieu',
  'gloire de dieu', 'puissance de dieu', 'sagesse de dieu', 'connaissance de dieu', 'amour de dieu',
  'grâce de dieu', 'miséricorde de dieu', 'bonté de dieu', 'fidélité de dieu', 'justice de dieu',
  'sainteté de dieu', 'vérité de dieu', 'parole de dieu', 'esprit de dieu', 'royaume de dieu',
  'volonté de dieu', 'plan de dieu', 'promesse de dieu', 'appel de dieu', 'don de dieu',
  'bénédiction de dieu', 'protection de dieu', 'direction de dieu', 'consolation de dieu',
  'guérison de dieu', 'miracle de dieu', 'intervention de dieu'
];

// Mots-clés pour Ruth
const ruthKeywords = [
  'Ruth', 'Moabite', 'Naomi', 'belle-fille', 'fidélité', 'Boaz', 'glanage', 
  'rédemption', 'David', 'lignée', 'Orpa', 'Élimélec', 'Machlon', 'Kiljon',
  'Bethléhem', 'Moab', 'veuve', 'épis', 'rédempteur', 'rachat', 'Obed',
  'hessed', 'loyauté', 'providence', 'aire', 'battage', 'pieds', 'couverture',
  'parent', 'généalogie', 'ancêtre', 'Isaï', 'messianique'
];

// Mots-clés pour la Genèse
const geneseKeywords = [
  'Genèse', 'création', 'commencement', 'Dieu', 'cieux', 'terre', 'lumière', 'ténèbres',
  'Adam', 'Ève', 'Éden', 'serpent', 'chute', 'péché', 'Caïn', 'Abel', 'Noé', 'déluge',
  'arche', 'alliance', 'arc-en-ciel', 'Babel', 'tour', 'Abraham', 'Isaac', 'Jacob'
];

// Mots-clés pour l'Exode
const exodeKeywords = [
  'Exode', 'Moïse', 'Égypte', 'pharaon', 'esclavage', 'plaies', 'Pâque', 'mer Rouge',
  'Sinaï', 'Décalogue', 'commandements', 'veau d\'or', 'tabernacle', 'Aaron'
];

// Mots-clés pour le Lévitique
const levitiqueKeywords = [
  'Lévitique', 'sacrifices', 'holocauste', 'prêtres', 'Aaron', 'pureté', 'sainteté',
  'Yom Kippour', 'bouc émissaire', 'fêtes', 'jubilé', 'sabbat'
];

// Mots-clés pour les Nombres
const nombresKeywords = [
  'Nombres', 'recensement', 'désert', 'espions', 'Caleb', 'Josué', 'rébellion',
  'Coré', 'verge Aaron', 'serpent airain', 'Balaam', 'quarante ans'
];

// Mots-clés pour le Deutéronome
const deuteronomeKeywords = [
  'Deutéronome', 'Shema', 'Écoute Israël', 'aimer Dieu', 'bénédictions', 'malédictions',
  'alliance', 'Moïse', 'mort', 'Nébo', 'Josué', 'terre promise'
];

// Mots-clés pour Josué
const josueKeywords = [
  'Josué', 'conquête', 'Canaan', 'Jéricho', 'Rahab', 'Jourdain', 'miracle',
  'Acan', 'Aï', 'Gabaonites', 'soleil arrêté', 'partage terre'
];

// Mots-clés pour les Juges
const jugesKeywords = [
  'Juges', 'cycle', 'Déborah', 'Gédéon', 'Samson', 'Jephthé', 'delivreurs',
  'Philistins', 'Dalila', 'force', 'cheveux', 'Barak', 'Sisera'
];

export const strictThematicKeywords: Record<string, string[]> = {
  'overview': overviewKeywords,
  'vie-jesus': vieJesusKeywords,
  'ruth': ruthKeywords,
  'genese': geneseKeywords,
  'exode': exodeKeywords,
  'levitique': levitiqueKeywords,
  'nombres': nombresKeywords,
  'deuteronome': deuteronomeKeywords,
  'josue': josueKeywords,
  'juges': jugesKeywords,
  // Les autres thèmes utilisent les mots-clés génériques pour l'instant
  'pentateuque': [...geneseKeywords, ...exodeKeywords, ...levitiqueKeywords, ...nombresKeywords, ...deuteronomeKeywords],
  'livres-historiques': [...josueKeywords, ...jugesKeywords, ...ruthKeywords],
  'matthieu': ['Matthieu', 'évangile', 'généalogie', 'mages', 'sermon montagne', 'béatitudes', 'royaume cieux'],
  'marc': ['Marc', 'évangile', 'serviteur', 'aussitôt', 'miracles', 'secret messianique'],
  'luc': ['Luc', 'évangile', 'miséricorde', 'paraboles', 'bon Samaritain', 'fils prodigue'],
  'jean-evangeliste': ['Jean', 'évangile', 'Verbe', 'signes', 'Je suis', 'amour', 'vie éternelle']
};
