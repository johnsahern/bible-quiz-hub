
// Fichier principal qui combine tous les mots-clés de l'Ancien Testament
import { pentateuchKeywords } from './old-testament/pentateuch-keywords.ts';
import { patriarchsKeywords } from './old-testament/patriarchs-keywords.ts';
import { kingsJudgesKeywords } from './old-testament/kings-judges-keywords.ts';
import { poeticBooksKeywords } from './old-testament/poetic-books-keywords.ts';
import { otGeneralKeywords } from './old-testament/ot-general-keywords.ts';

// Mots-clés thématiques pour l'Ancien Testament
export const oldTestamentKeywords: { [key: string]: string[] } = {
  ...pentateuchKeywords,
  ...patriarchsKeywords,
  ...kingsJudgesKeywords,
  ...poeticBooksKeywords,
  ...otGeneralKeywords,
};
