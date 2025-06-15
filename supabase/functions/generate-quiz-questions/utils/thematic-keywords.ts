
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
  
  // Mots-clés spécifiques pour les Évangiles
  'evangeliles': [
    'évangile', 'Matthieu', 'Marc', 'Luc', 'Jean', 'Jésus', 'Christ',
    'témoignage', 'récit', 'bonne', 'nouvelle', 'message', 'salut',
    'naissance', 'Bethléem', 'Marie', 'Joseph', 'bergers', 'mages',
    'baptême', 'Jean-Baptiste', 'Jourdain', 'Esprit', 'colombe',
    'disciples', 'apôtres', 'Pierre', 'Jacques', 'André', 'Philippe',
    'miracles', 'guérisons', 'aveugles', 'paralytiques', 'lépreux',
    'multiplication', 'pains', 'poissons', 'tempête', 'mer',
    'paraboles', 'royaume', 'cieux', 'semeur', 'berger', 'fils prodigue',
    'transfiguration', 'Moïse', 'Élie', 'montagne', 'gloire',
    'Jérusalem', 'rameaux', 'temple', 'pharisiens', 'scribes',
    'passion', 'croix', 'crucifixion', 'résurrection', 'tombeau',
    'apparitions', 'Emmaüs', 'Thomas', 'ascension'
  ],
  
  // Mots-clés spécifiques pour la généalogie de Jésus
  'genealogie-jesus': [
    'Abraham', 'Isaac', 'Jacob', 'Juda', 'David', 'Salomon', 'Joseph', 'Marie',
    'Booz', 'Ruth', 'Jesse', 'Obed', 'Rahab', 'Tamar', 'Bethsabée',
    'généalogie', 'lignée', 'descendance', 'fils de', 'engendra',
    'générations', 'quatorze', 'ascendance', 'ancêtres',
    'Matthieu', 'Luc', 'évangile', 'naissance', 'Bethléem',
    'Messie', 'Christ', 'roi', 'tribu', 'maison de David'
  ]
};
