
// Fichier principal qui combine tous les mots-clés thématiques
import { jesusChristKeywords } from './keywords/jesus-christ-keywords.ts';
import { oldTestamentKeywords } from './keywords/old-testament-keywords.ts';
import { newTestamentKeywords } from './keywords/new-testament-keywords.ts';
import { prophetsKeywords } from './keywords/prophets-keywords.ts';
import { historicalKeywords } from './keywords/historical-keywords.ts';
import { womenKeywords } from './keywords/women-keywords.ts';
import { geographicalKeywords } from './keywords/geographical-keywords.ts';
import { theologicalKeywords } from './keywords/theological-keywords.ts';
import { culturalKeywords } from './keywords/cultural-keywords.ts';

// Mots-clés thématiques STRICTS pour TOUS les thèmes disponibles
export const strictThematicKeywords: { [key: string]: string[] } = {
  ...jesusChristKeywords,
  ...oldTestamentKeywords,
  ...newTestamentKeywords,
  ...prophetsKeywords,
  ...historicalKeywords,
  ...womenKeywords,
  ...geographicalKeywords,
  ...theologicalKeywords,
  ...culturalKeywords,
  
  // === NOUVEAUX CONTEXTES PRODUCTION - VIE DE JÉSUS ===
  'vie-jesus': [
    'Jésus', 'Christ', 'Messie', 'Fils', 'Dieu', 'Emmanuel', 'Sauveur',
    'naissance', 'Bethléem', 'crèche', 'Marie', 'Joseph', 'bergers', 'mages',
    'enfance', 'Nazareth', 'temple', 'docteurs', 'sagesse', 'croissance',
    'baptême', 'Jean-Baptiste', 'Jourdain', 'Esprit', 'colombe',
    'ministère', 'Galilée', 'prédication', 'royaume', 'disciples',
    'passion', 'croix', 'résurrection', 'ascension'
  ],

  'miracles-jesus': [
    'miracles', 'signes', 'prodiges', 'puissance', 'autorité', 'foi',
    'guérisons', 'aveugles', 'paralytiques', 'lépreux', 'sourds', 'muets',
    'multiplication', 'pains', 'poissons', 'cinq mille', 'quatre mille',
    'tempête', 'mer', 'marche', 'eau', 'Pierre', 'barque',
    'résurrections', 'Lazare', 'Jaïrus', 'fille', 'veuve', 'Naïn',
    'démons', 'esprits', 'impurs', 'Gérasénien', 'légion',
    'noces', 'Cana', 'eau', 'vin', 'premier', 'signe'
  ],

  'paraboles-jesus': [
    'paraboles', 'royaume', 'cieux', 'Dieu', 'enseignement', 'comparaison',
    'semeur', 'semence', 'terrain', 'épines', 'oiseaux', 'chemin',
    'bon berger', 'brebis', 'bergerie', 'porte', 'voleur', 'loup',
    'fils prodigue', 'père', 'miséricorde', 'repentance', 'fête',
    'bon Samaritain', 'prochain', 'prêtre', 'lévite', 'compassion',
    'talents', 'serviteur', 'fidèle', 'paresseux', 'enfouir',
    'vierges', 'sages', 'folles', 'huile', 'lampes', 'époux'
  ],

  'passion-christ': [
    'passion', 'souffrance', 'crucifixion', 'croix', 'mort', 'sacrifice',
    'Gethsémané', 'jardin', 'prière', 'agonie', 'sueur', 'sang',
    'arrestation', 'Judas', 'baiser', 'trahison', 'trente', 'deniers',
    'procès', 'Pilate', 'Hérode', 'Caïphe', 'sanhédrin', 'blasphème',
    'Barabbas', 'foule', 'crucifie', 'flagellation', 'couronne', 'épines',
    'Golgotha', 'Calvaire', 'INRI', 'larrons', 'sept', 'paroles'
  ],

  'resurrection': [
    'résurrection', 'tombeau', 'vide', 'pierre', 'roulée', 'anges',
    'Marie-Madeleine', 'femmes', 'aromates', 'matin', 'premier', 'jour',
    'linges', 'suaire', 'Jean', 'Pierre', 'apparitions', 'disciples',
    'Emmaüs', 'pain', 'Thomas', 'incrédule', 'doigts', 'plaies',
    'cénacle', 'portes', 'fermées', 'paix', 'pêche', 'Tibériade',
    'victoire', 'mort', 'corps', 'glorieux', 'spirituel'
  ],

  // === NOUVEAUX CONTEXTES ÉVÉNEMENTS JÉSUS ===
  'bapteme-jesus': [
    'baptême', 'Jean-Baptiste', 'Jésus', 'Jourdain', 'eau', 'immersion',
    'Esprit-Saint', 'colombe', 'descendre', 'cieux', 'ouverts',
    'voix', 'Père', 'Fils', 'bien-aimé', 'complaisance', 'agréable',
    'début', 'ministère', 'manifestation', 'Trinité', 'théophanie'
  ],

  'transfiguration': [
    'transfiguration', 'montagne', 'haute', 'Pierre', 'Jacques', 'Jean',
    'visage', 'soleil', 'vêtements', 'blancs', 'lumière', 'éclatants',
    'Moïse', 'Élie', 'apparition', 'conversation', 'nuée', 'lumineuse',
    'voix', 'Père', 'Fils', 'bien-aimé', 'écoutez', 'tentes', 'trois'
  ],

  'ascension': [
    'ascension', 'montagne', 'oliviers', 'Béthanie', 'disciples', 'onze',
    'nuée', 'élevé', 'ciel', 'anges', 'hommes', 'vêtements', 'blancs',
    'regarder', 'reviendra', 'même', 'manière', 'promesse', 'Esprit-Saint',
    'Jérusalem', 'attendre', 'puissance', 'témoins', 'bout', 'terre'
  ],

  'enfance-jesus': [
    'enfance', 'Jésus', 'naissance', 'Bethléem', 'crèche', 'mangeoire',
    'bergers', 'champs', 'anges', 'gloire', 'paix', 'hommes',
    'mages', 'étoile', 'orient', 'or', 'encens', 'myrrhe', 'adoration',
    'Hérode', 'massacre', 'innocents', 'fuite', 'Égypte', 'Joseph',
    'Nazareth', 'croissance', 'grâce', 'sagesse', 'temple', 'douze'
  ],

  // === NOUVEAUX CONTEXTES ÉVANGILES ===
  'matthieu': [
    'Matthieu', 'évangile', 'généalogie', 'Abraham', 'David', 'quatorze',
    'Emmanuel', 'Dieu', 'nous', 'mages', 'étoile', 'or', 'encens', 'myrrhe',
    'sermon', 'montagne', 'béatitudes', 'heureux', 'pauvres', 'esprit',
    'Notre', 'Père', 'cieux', 'prière', 'pardon', 'paraboles', 'royaume'
  ],

  'marc': [
    'Marc', 'évangile', 'commencement', 'bonne', 'nouvelle', 'Fils', 'Dieu',
    'Jean-Baptiste', 'précurseur', 'voix', 'désert', 'préparez', 'chemin',
    'aussitôt', 'immédiatement', 'action', 'mouvement', 'dynamisme',
    'autorité', 'enseignement', 'démons', 'esprits', 'impurs', 'secret'
  ],

  'luc': [
    'Luc', 'évangile', 'Théophile', 'recherche', 'exacte', 'ordre',
    'Zacharie', 'Élisabeth', 'Jean-Baptiste', 'annonciation', 'Marie',
    'Magnificat', 'exalte', 'humble', 'miséricorde', 'compassion',
    'pauvres', 'opprimés', 'bon', 'Samaritain', 'fils', 'prodigue'
  ],

  'jean-evangeliste': [
    'Jean', 'évangile', 'Verbe', 'Logos', 'commencement', 'Dieu', 'chair',
    'lumière', 'ténèbres', 'monde', 'signes', 'sept', 'miracles',
    'Je suis', 'pain', 'vie', 'berger', 'résurrection', 'chemin',
    'vérité', 'cep', 'sarments', 'amour', 'bien-aimé', 'disciple'
  ],

  'actes-apotres': [
    'Actes', 'apôtres', 'Luc', 'Théophile', 'Esprit-Saint', 'promesse',
    'Pentecôte', 'langues', 'feu', 'vent', 'Pierre', 'prédication',
    'trois mille', 'conversion', 'Étienne', 'martyr', 'Saul', 'Paul',
    'Damas', 'conversion', 'voyages', 'missionnaire', 'païens'
  ],

  'jean-baptiste': [
    'Jean-Baptiste', 'précurseur', 'Zacharie', 'Élisabeth', 'Gabriel',
    'désert', 'Judée', 'prédication', 'repentance', 'baptême', 'Jourdain',
    'voix', 'crie', 'préparez', 'chemin', 'Élie', 'Agneau', 'Dieu',
    'Hérode', 'Hérodias', 'prison', 'décapitation', 'Salomé'
  ],

  // === GÉNÉALOGIE ET CONTEXTES SPÉCIAUX ===
  'genealogie-jesus': [
    'Abraham', 'Isaac', 'Jacob', 'Juda', 'David', 'Salomon', 'Joseph', 'Marie',
    'Booz', 'Ruth', 'Jesse', 'Obed', 'Rahab', 'Tamar', 'Bethsabée',
    'généalogie', 'lignée', 'descendance', 'fils de', 'engendra',
    'générations', 'quatorze', 'ascendance', 'ancêtres',
    'Matthieu', 'Luc', 'évangile', 'naissance', 'Bethléem',
    'Messie', 'Christ', 'roi', 'tribu', 'maison de David'
  ],

  // === ÉVANGILES SPÉCIFIQUES ===
  'evangeliles': [
    'évangile', 'Matthieu', 'Marc', 'Luc', 'Jean', 'Jésus', 'Christ',
    'témoignage', 'récit', 'bonne', 'nouvelle', 'message', 'salut',
    'naissance', 'Bethléem', 'Marie', 'Joseph', 'bergers', 'mages',
    'baptême', 'Jean-Baptiste', 'Jourdain', 'Esprit', 'colombe',
    'disciples', 'apôtres', 'Pierre', 'Jacques', 'André', 'Philippe',
    'miracles', 'guérisons', 'multiplication', 'pains', 'tempête',
    'paraboles', 'royaume', 'transfiguration', 'passion', 'résurrection'
  ],

  // === TOUS LES AUTRES THÈMES PRODUCTION ===
  'ancien-testament': ['Ancien', 'Testament', 'Loi', 'Prophètes', 'Écrits', 'alliance', 'promesses', 'Messie'],
  'nouveau-testament': ['Nouveau', 'Testament', 'évangiles', 'Actes', 'épîtres', 'Apocalypse', 'Jésus', 'Christ'],
  
  // Ajout de tous les autres contextes avec leurs mots-clés spécifiques
  'vue-densemble': ['Bible', 'Écriture', 'Ancien', 'Nouveau', 'Testament', 'livres', 'alliance', 'salut'],
  'pentateuque': ['Genèse', 'Exode', 'Lévitique', 'Nombres', 'Deutéronome', 'Moïse', 'Torah', 'création'],
  'livres-historiques': ['Josué', 'Juges', 'Samuel', 'Rois', 'Chroniques', 'Esdras', 'Néhémie', 'conquête'],
  'livres-poetiques': ['Job', 'Psaumes', 'Proverbes', 'Ecclésiaste', 'Cantique', 'sagesse', 'louange'],
  'prophetes': ['Ésaïe', 'Jérémie', 'Ézéchiel', 'Daniel', 'prophétie', 'oracle', 'Messie', 'jugement'],
  'jesus-christ': ['Jésus', 'Christ', 'Messie', 'Fils', 'Dieu', 'Sauveur', 'incarnation', 'rédemption'],
  'paul': ['Paul', 'Saul', 'Tarse', 'conversion', 'Damas', 'voyages', 'épîtres', 'justification'],
  'pierre': ['Pierre', 'Simon', 'Céphas', 'pêcheur', 'clés', 'royaume', 'reniement', 'restauration'],
  'patriarches': ['Abraham', 'Isaac', 'Jacob', 'Joseph', 'promesses', 'alliance', 'foi', 'obéissance'],
  'rois': ['Saül', 'David', 'Salomon', 'royaume', 'temple', 'onction', 'fidélité', 'idolâtrie'],
  'femmes': ['Marie', 'Esther', 'Ruth', 'Déborah', 'Anne', 'Sara', 'Rebecca', 'foi', 'courage']
};
