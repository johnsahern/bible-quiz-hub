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

// Nouveaux mots-clés pour les livres historiques
const samuel1Keywords = [
  '1Samuel', 'Samuel', 'Anne', 'prière', 'Éli', 'Silo', 'vocation', 'enfant',
  'Saül', 'roi', 'onction', 'David', 'berger', 'Goliath', 'géant', 'fronde'
];

const samuel2Keywords = [
  '2Samuel', 'David', 'roi', 'Jérusalem', 'arche', 'Nathan', 'Bath-Schéba',
  'Absalom', 'rébellion', 'alliance', 'trône', 'éternel'
];

const rois1Keywords = [
  '1Rois', 'Salomon', 'sagesse', 'temple', 'construction', 'reine', 'Saba',
  'division', 'royaume', 'Jéroboam', 'Élie', 'Carmel', 'Baal'
];

const rois2Keywords = [
  '2Rois', 'Élisée', 'Élie', 'enlèvement', 'miracles', 'Naaman', 'lèpre',
  'Josias', 'réforme', 'captivité', 'Babylone'
];

const chroniques1Keywords = [
  '1Chroniques', 'généalogies', 'David', 'Lévites', 'temple', 'organisation',
  'culte', 'musiciens', 'préparatifs'
];

const chroniques2Keywords = [
  '2Chroniques', 'Salomon', 'temple', 'dédicace', 'Juda', 'rois', 'réformes',
  'Ézéchias', 'Josias', 'Babylone', 'Cyrus'
];

const esdrasKeywords = [
  'Esdras', 'retour', 'exil', 'Cyrus', 'temple', 'reconstruction', 'Loi',
  'mariages', 'mixtes', 'réforme'
];

const nehemieKeywords = [
  'Néhémie', 'murailles', 'Jérusalem', 'reconstruction', 'opposition',
  'cinquante-deux', 'jours', 'réformes'
];

const estherKeywords = [
  'Esther', 'reine', 'Assuérus', 'Mardochée', 'Haman', 'Pourim',
  'délivrance', 'providence'
];

// Mots-clés pour les livres poétiques
const jobKeywords = [
  'Job', 'souffrance', 'épreuves', 'Satan', 'amis', 'Élihu', 'Éternel',
  'tempête', 'restauration', 'patience'
];

const psaumesKeywords = [
  'Psaumes', 'David', 'louange', 'prière', 'berger', 'Sion', 'méditation',
  'Asaph', 'Koré', 'montées'
];

const proverbesKeywords = [
  'Proverbes', 'Salomon', 'sagesse', 'crainte', 'Éternel', 'fils', 'instruction',
  'femme', 'vertueuse', 'folie'
];

const ecclesiasteKeywords = [
  'Ecclésiaste', 'vanité', 'temps', 'saisons', 'sous', 'soleil', 'crains', 'Dieu'
];

const cantiqueKeywords = [
  'Cantique', 'bien-aimé', 'bien-aimée', 'amour', 'époux', 'épouse',
  'jardin', 'source', 'lis', 'rose'
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
  '1-samuel': samuel1Keywords,
  '2-samuel': samuel2Keywords,
  '1-rois': rois1Keywords,
  '2-rois': rois2Keywords,
  '1-chroniques': chroniques1Keywords,
  '2-chroniques': chroniques2Keywords,
  'esdras': esdrasKeywords,
  'nehemie': nehemieKeywords,
  'esther': estherKeywords,
  'job': jobKeywords,
  'psaumes': psaumesKeywords,
  'proverbes': proverbesKeywords,
  'ecclesiaste': ecclesiasteKeywords,
  'cantique-cantiques': cantiqueKeywords,
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
  'livres-historiques': [...josueKeywords, ...jugesKeywords, ...ruthKeywords, ...samuel1Keywords, ...samuel2Keywords],
  'livres-poetiques': [...jobKeywords, ...psaumesKeywords, ...proverbesKeywords, ...ecclesiasteKeywords, ...cantiqueKeywords],
  'evangeliles': [...matthieuKeywords, ...marcKeywords, ...lucKeywords, ...jeanEvangelisteKeywords],
  'nouveau-testament': [...matthieuKeywords, ...marcKeywords, ...lucKeywords, ...jeanEvangelisteKeywords, ...actesApotresKeywords]
};
