
// Mots-clés pour le thème "Vue d'ensemble de la Bible"
const overviewKeywords = [
  'bible', 'ancien testament', 'nouveau testament', 'écriture', 'verset', 'histoire biblique',
  'personnage biblique', 'événement biblique', 'enseignement biblique', 'doctrine', 'foi', 'chrétien',
  'église', 'jésus-christ', 'dieu', 'saint-esprit', 'trinité', 'salut', 'rédemption', 'grâce'
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

// Mots-clés pour Ruth
const ruthKeywords = [
  'Ruth', 'Moabite', 'Naomi', 'belle-fille', 'fidélité', 'Boaz', 'glanage', 
  'rédemption', 'David', 'lignée', 'Orpa', 'Élimélec', 'Machlon', 'Kiljon'
];

// Mots-clés pour Matthieu
const matthieuKeywords = [
  'Matthieu', 'évangile', 'généalogie', 'mages', 'sermon montagne', 'béatitudes', 
  'royaume cieux', 'paraboles', 'Emmanuel', 'accomplissement'
];

// Mots-clés pour Marc
const marcKeywords = [
  'Marc', 'évangile', 'serviteur', 'aussitôt', 'miracles', 'secret messianique',
  'action', 'dynamisme', 'autorité', 'passion'
];

// Mots-clés pour Luc
const lucKeywords = [
  'Luc', 'évangile', 'miséricorde', 'paraboles', 'bon Samaritain', 'fils prodigue',
  'universalisme', 'compassion', 'pauvres', 'Magnificat'
];

// Mots-clés pour Jean
const jeanEvangelisteKeywords = [
  'Jean', 'évangile', 'Verbe', 'signes', 'Je suis', 'amour', 'vie éternelle',
  'lumière', 'ténèbres', 'gloire', 'bien-aimé'
];

// Mots-clés pour l'Ascension
const ascensionKeywords = [
  'ascension', 'montagne', 'oliviers', 'disciples', 'nuée', 'ciel', 'anges',
  'promesse', 'Esprit-Saint', 'témoins', 'retour'
];

// Mots-clés pour les Actes
const actesApotresKeywords = [
  'Actes', 'apôtres', 'Pentecôte', 'Esprit-Saint', 'Pierre', 'Paul', 'Étienne',
  'conversion', 'mission', 'Église primitive'
];

// Mots-clés pour l'enfance de Jésus
const enfanceJesusKeywords = [
  'enfance', 'Jésus', 'naissance', 'Bethléem', 'bergers', 'mages', 'Hérode',
  'fuite', 'Égypte', 'Nazareth', 'temple', 'douze ans'
];

// Mots-clés pour le baptême de Jésus
const baptemeJesusKeywords = [
  'baptême', 'Jean-Baptiste', 'Jourdain', 'Esprit-Saint', 'colombe', 'voix',
  'Père', 'Fils bien-aimé', 'Trinité', 'ministère'
];

// Mots-clés pour Jean-Baptiste
const jeanBaptisteKeywords = [
  'Jean-Baptiste', 'précurseur', 'Zacharie', 'Élisabeth', 'désert', 'repentance',
  'Agneau de Dieu', 'Hérode', 'décapitation', 'diminuer', 'croître'
];

// Mots-clés pour la Transfiguration
const transfigurationKeywords = [
  'transfiguration', 'montagne', 'Pierre', 'Jacques', 'Jean', 'Moïse', 'Élie',
  'visage', 'lumière', 'nuée', 'voix', 'Père', 'éclatants'
];

export const strictThematicKeywords: Record<string, string[]> = {
  'vue-densemble': overviewKeywords,
  'genese': geneseKeywords,
  'exode': exodeKeywords,
  'levitique': levitiqueKeywords,
  'nombres': nombresKeywords,
  'deuteronome': deuteronomeKeywords,
  'josue': josueKeywords,
  'juges': jugesKeywords,
  'ruth': ruthKeywords,
  'matthieu': matthieuKeywords,
  'marc': marcKeywords,
  'luc': lucKeywords,
  'jean-evangeliste': jeanEvangelisteKeywords,
  'ascension': ascensionKeywords,
  'actes-apotres': actesApotresKeywords,
  'enfance-jesus': enfanceJesusKeywords,
  'bapteme-jesus': baptemeJesusKeywords,
  'jean-baptiste': jeanBaptisteKeywords,
  'transfiguration': transfigurationKeywords,
  
  // Thèmes combinés
  'pentateuque': [...geneseKeywords, ...exodeKeywords, ...levitiqueKeywords, ...nombresKeywords, ...deuteronomeKeywords],
  'livres-historiques': [...josueKeywords, ...jugesKeywords, ...ruthKeywords],
  'evangeliles': [...matthieuKeywords, ...marcKeywords, ...lucKeywords, ...jeanEvangelisteKeywords],
  'nouveau-testament': [...matthieuKeywords, ...marcKeywords, ...lucKeywords, ...jeanEvangelisteKeywords, ...actesApotresKeywords]
};
