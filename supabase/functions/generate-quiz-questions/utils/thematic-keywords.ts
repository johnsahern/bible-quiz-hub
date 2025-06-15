
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

// Mots-clés thématiques STRICTS pour TOUS les 146 thèmes disponibles
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
};
