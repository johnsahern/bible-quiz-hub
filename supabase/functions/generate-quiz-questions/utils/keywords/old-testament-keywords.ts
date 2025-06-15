
// Mots-clés thématiques pour l'Ancien Testament
export const oldTestamentKeywords: { [key: string]: string[] } = {
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
  'melchisedek': ['Melchisédek', 'roi', 'Salem', 'prêtre', 'Dieu', 'Très-Haut', 'Abraham', 'pain', 'vin', 'dîme', 'bénédiction'],
  'lot': ['Lot', 'Abraham', 'neveu', 'Sodome', 'Gomorrhe', 'destruction', 'fuite', 'femme', 'statue', 'sel', 'filles', 'caverne'],
  'rebecca': ['Rebecca', 'Isaac', 'épouse', 'puits', 'serviteur', 'Abraham', 'bracelets', 'anneaux', 'Ésaü', 'Jacob', 'préférence'],
  'lea-rachel': ['Léa', 'Rachel', 'Jacob', 'épouses', 'Laban', 'sept', 'années', 'service', 'amour', 'enfants', 'rivalité'],
  'aaron': ['Aaron', 'Moïse', 'frère', 'porte-parole', 'grand-prêtre', 'Israël', 'veau', 'or', 'bâton', 'fleuri', 'amandier'],
  'miriam': ['Miriam', 'Moïse', 'Aaron', 'sœur', 'prophétesse', 'cantique', 'tambourin', 'lèpre', 'critique', 'guérison'],

  // Rois
  'david': ['David', 'roi', 'Israël', 'berger', 'Goliath', 'Saül', 'Jonathan', 'Bethléem', 'psaume', 'harpe', 'Jérusalem', 'Absalom', 'Salomon', 'arche', 'alliance', 'coeur', 'Dieu'],
  'salomon': ['Salomon', 'roi', 'David', 'sagesse', 'temple', 'Jérusalem', 'jugement', 'reine', 'Saba', 'proverbes', 'ecclésiaste', 'cantique', 'richesse', 'gloire'],
  'samuel': ['Samuel', 'juge', 'prophète', 'Anne', 'Elkana', 'Éli', 'temple', 'Silo', 'appel', 'Dieu', 'Saül', 'David', 'onction', 'roi'],
  'samson': ['Samson', 'juge', 'Nazaréen', 'force', 'cheveux', 'Dalila', 'Philistins', 'Gaza', 'colonnes', 'temple', 'Dagon', 'mort'],
  'saul-roi': ['Saül', 'premier', 'roi', 'Israël', 'onction', 'Samuel', 'désobéissance', 'rejet', 'David', 'jalousie', 'Endor'],
  'roboam': ['Roboam', 'Salomon', 'fils', 'royaume', 'divisé', 'dix', 'tribus', 'Jéroboam', 'conseil', 'anciens', 'jeunes'],
  'jeroboam': ['Jéroboam', 'roi', 'Israël', 'dix', 'tribus', 'veaux', 'or', 'Dan', 'Béthel', 'péché', 'royaume'],
  'achab': ['Achab', 'roi', 'Israël', 'Jézabel', 'Baal', 'Élie', 'sécheresse', 'Carmel', 'Naboth', 'vigne'],
  'ezechias': ['Ézéchias', 'roi', 'Juda', 'réforme', 'religieuse', 'Sanchérib', 'Assyrie', 'ange', 'délivrance', 'cadran', 'soleil'],
  'josias': ['Josias', 'roi', 'Juda', 'réforme', 'temple', 'livre', 'loi', 'Pâque', 'idoles', 'destruction', 'Méguiddo'],
  'nebucadnetsar': ['Nebucadnetsar', 'roi', 'Babylone', 'Jérusalem', 'destruction', 'temple', 'captivité', 'Daniel', 'statue', 'songe'],
  'cyrus': ['Cyrus', 'roi', 'Perse', 'édit', 'retour',  'exil', 'temple', 'reconstruction', 'oint', 'Éternel', 'berger'],

  // Livres poétiques
  'job': ['Job', 'souffrance', 'juste', 'Satan', 'épreuves', 'amis', 'Élifaz', 'Bildad', 'Tsophar', 'Élihu', 'Éternel', 'tempête', 'restauration'],
  'psalmes': ['psaumes', 'David', 'cantiques', 'louange', 'prière', 'berger', 'vallée', 'ombre', 'mort', 'ennemi', 'coupe', 'déborde'],
  'proverbes': ['proverbes', 'Salomon', 'sagesse', 'crainte', 'Éternel', 'commencement', 'instruction', 'discipline', 'femme', 'vertueuse'],
  'cantique-cantiques': ['Cantique', 'cantiques', 'Salomon', 'amour', 'époux', 'épouse', 'bien-aimé', 'bien-aimée', 'jardin'],
  'ecclesiaste': ['Ecclésiaste', 'prédicateur', 'vanité', 'vanités', 'temps', 'toute', 'chose', 'soleil', 'sagesse', 'crainte', 'Dieu'],
  'lamentations': ['Lamentations', 'Jérémie', 'Jérusalem', 'destruction', 'deuil', 'pleurs', 'miséricorde', 'chaque', 'matin'],

  // Thèmes spéciaux
  'ancien-testament': ['Ancien', 'Testament', 'alliance', 'loi', 'prophètes', 'promesse', 'messie', 'temple', 'sacrifice', 'peuple', 'Israël'],
};
