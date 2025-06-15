
import { overviewContext } from './contexts/overview.ts';
import { pentateuchContext } from './contexts/pentateuch.ts';
import { historicalBooksContext } from './contexts/historical-books.ts';
import { poeticBooksContext } from './contexts/poetic-books.ts';
import { prophetsContext } from './contexts/prophets.ts';
import { newTestamentContext } from './contexts/new-testament.ts';
import { jesusChristContext } from './contexts/jesus-christ.ts';
import { apostlesContexts } from './contexts/apostles.ts';
import { patriarchsContext } from './contexts/patriarchs.ts';
import { kingsContext } from './contexts/kings.ts';
import { womenContext } from './contexts/women.ts';
import { genealogyJesusContext } from './contexts/genealogy-jesus.ts';

export interface BiblicalContext {
  key: string;
  title: string;
  description: string;
  keywords: string[];
  context: string;
  focus_areas: string[];
}

export const BIBLICAL_CONTEXTS: BiblicalContext[] = [
  overviewContext,
  pentateuchContext,
  historicalBooksContext,
  poeticBooksContext,
  prophetsContext,
  newTestamentContext,
  jesusChristContext,
  ...apostlesContexts,
  patriarchsContext,
  kingsContext,
  womenContext,
  genealogyJesusContext
];

export const getBiblicalContext = (theme: string): BiblicalContext => {
  console.log(`🔍 Recherche du contexte pour le thème: ${theme}`);
  
  const context = BIBLICAL_CONTEXTS.find(ctx => ctx.key === theme);
  
  if (context) {
    console.log(`✅ Contexte trouvé: ${context.title}`);
    return context;
  }
  
  console.error(`⚠️ Thème biblique non trouvé: ${theme}, utilisation du contexte par défaut`);
  return overviewContext; // Contexte par défaut
};
