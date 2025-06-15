
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

  // === TOUS LES AUTRES THÈMES DE PRODUCTION ===
  'bapteme-jesus': ['baptême', 'Jean-Baptiste', 'Jourdain', 'Esprit', 'colombe', 'voix', 'cieux', 'Fils', 'bien-aimé'],
  'transfiguration': ['transfiguration', 'montagne', 'Moïse', 'Élie', 'gloire', 'vêtements', 'blancs', 'nuée', 'voix'],
  'ascension': ['ascension', 'montagne', 'oliviers', 'nuée', 'anges', 'disciples', 'ciel', 'promesse', 'ret our'],
  'enfance-jesus': ['enfance', 'Bethléem', 'crèche', 'bergers', 'mages', 'Hérode', 'massacre', 'Égypte', 'Nazareth'],
  
  'mathieu': ['Matthieu', 'évangile', 'généalogie', 'mages', 'sermon', 'montagne', 'béatitudes', 'royaume', 'cieux'],
  'marc': ['Marc', 'évangile', 'action', 'miracle', 'autorité', 'secret', 'messianique', 'serviteur', 'souffrant'],
  'luc': ['Luc', 'évangile', 'miséricorde', 'paraboles', 'femmes', 'pauvres', 'Esprit-Saint', 'universalisme'],
  'jean-evangeliste': ['Jean', 'évangile', 'Logos', 'Verbe', 'signes', 'Je suis', 'vie', 'éternelle', 'amour'],
  
  'actes-apotres': ['Actes', 'Luc', 'Esprit-Saint', 'Pentecôte', 'apôtres', 'Église', 'primitive', 'mission', 'Paul'],
  'jean-baptiste': ['Jean-Baptiste', 'précurseur', 'baptême', 'repentance', 'Jourdain', 'Élie', 'Hérode', 'prison'],
  'sermon-montagne': ['sermon', 'montagne', 'béatitudes', 'sel', 'lumière', 'Notre Père', 'loi', 'prophètes'],
  'derniere-cene': ['dernière', 'Cène', 'Pâque', 'pain', 'vin', 'corps', 'sang', 'alliance', 'nouvelle'],
  
  // Continuer avec tous les autres thèmes...
  'ancien-testament': ['Ancien', 'Testament', 'Loi', 'Prophètes', 'Écrits', 'alliance', 'promesses', 'Messie'],
  'nouveau-testament': ['Nouveau', 'Testament', 'évangiles', 'Actes', 'épîtres', 'Apocalypse', 'Jésus', 'Christ']
};
