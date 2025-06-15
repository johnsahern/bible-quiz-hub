
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
import { evangelilesContext } from './contexts/evangeliles.ts';
import { ruthContext } from './contexts/ruth.ts';

// NOUVEAUX CONTEXTES VIE DE JÉSUS
import { vieJesusContext } from './contexts/vie-jesus.ts';
import { miraclesJesusContext } from './contexts/miracles-jesus.ts';
import { parabolesJesusContext } from './contexts/paraboles-jesus.ts';
import { passionChristContext } from './contexts/passion-christ.ts';
import { resurrectionContext } from './contexts/resurrection.ts';

// NOUVEAUX CONTEXTES ÉVÉNEMENTS DE JÉSUS
import { baptemeJesusContext } from './contexts/bapteme-jesus.ts';
import { transfigurationContext } from './contexts/transfiguration.ts';
import { ascensionContext } from './contexts/ascension.ts';
import { enfanceJesusContext } from './contexts/enfance-jesus.ts';

// NOUVEAUX CONTEXTES ÉVANGILES
import { matthieuContext } from './contexts/matthieu.ts';
import { marcContext } from './contexts/marc.ts';
import { lucContext } from './contexts/luc.ts';
import { jeanEvangelisteContext } from './contexts/jean-evangeliste.ts';
import { actesApotresContext } from './contexts/actes-apotres.ts';
import { jeanBaptisteContext } from './contexts/jean-baptiste.ts';

export interface BiblicalContext {
  key: string;
  title: string;
  description: string;
  keywords: string[];
  context: string;
  focus_areas: string[];
}

export const BIBLICAL_CONTEXTS: BiblicalContext[] = [
  // Contextes de base
  overviewContext,
  pentateuchContext,
  historicalBooksContext,
  poeticBooksContext,
  prophetsContext,
  newTestamentContext,
  jesusChristContext,
  evangelilesContext,
  
  // Contextes étendus Jésus
  vieJesusContext,
  miraclesJesusContext,
  parabolesJesusContext,
  passionChristContext,
  resurrectionContext,
  
  // Contextes événements de Jésus
  baptemeJesusContext,
  transfigurationContext,
  ascensionContext,
  enfanceJesusContext,
  
  // Contextes Évangiles et NT
  matthieuContext,
  marcContext,
  lucContext,
  jeanEvangelisteContext,
  actesApotresContext,
  jeanBaptisteContext,
  
  // Contextes spécifiques
  ruthContext,
  
  // Autres contextes
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
