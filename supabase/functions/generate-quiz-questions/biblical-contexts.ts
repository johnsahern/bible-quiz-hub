
// Import all context categories
import { jesusChristContexts } from './contexts/jesus-christ.ts';
import { newTestamentContexts } from './contexts/new-testament.ts';
import { apostlesContexts } from './contexts/apostles.ts';
import { pentateuque } from './contexts/pentateuch.ts';
import { patriarchsContexts } from './contexts/patriarchs.ts';
import { kingsContexts } from './contexts/kings.ts';
import { poeticBooksContexts } from './contexts/poetic-books.ts';
import { prophetsContexts } from './contexts/prophets.ts';
import { womenContexts } from './contexts/women.ts';
import { historicalBooksContexts } from './contexts/historical-books.ts';
import { overviewContexts } from './contexts/overview.ts';

export interface BiblicalContext {
  id: string;
  title: string;
  context: string;
  keyVerses?: string[];
}

// Combine all contexts into a single array
export const biblicalContexts: BiblicalContext[] = [
  ...jesusChristContexts,
  ...newTestamentContexts,
  ...apostlesContexts,
  ...pentateuque,
  ...patriarchsContexts,
  ...kingsContexts,
  ...poeticBooksContexts,
  ...prophetsContexts,
  ...womenContexts,
  ...historicalBooksContexts,
  ...overviewContexts
];

export function getBiblicalContext(themeId: string): BiblicalContext {
  const context = biblicalContexts.find(c => c.id === themeId);
  if (!context) {
    console.warn(`⚠️ Thème biblique non trouvé: ${themeId}, utilisation du contexte par défaut`);
    return {
      id: 'default',
      title: 'Connaissance Biblique Générale',
      context: 'Un sujet biblique fondamental qui mérite une étude approfondie des Écritures saintes. Les questions porteront sur les enseignements, personnages, événements et vérités doctrinales liés à ce thème, en s\'appuyant sur l\'ensemble de la révélation biblique.',
      keyVerses: ['2 Timothée 3:16', 'Psaume 119:105', '1 Pierre 1:25']
    };
  }
  return context;
}
