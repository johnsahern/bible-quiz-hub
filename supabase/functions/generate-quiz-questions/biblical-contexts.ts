

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
import { samuelContext } from './contexts/1-samuel.ts';
import { samuel2Context } from './contexts/2-samuel.ts';
import { rois1Context } from './contexts/1-rois.ts';
import { rois2Context } from './contexts/2-rois.ts';
import { chroniques1Context } from './contexts/1-chroniques.ts';
import { chroniques2Context } from './contexts/2-chroniques.ts';
import { esdrasContext } from './contexts/esdras.ts';
import { nehemieContext } from './contexts/nehemie.ts';
import { estherContext } from './contexts/esther.ts';

// CONTEXTES PENTATEUQUE
import { geneseContext } from './contexts/genese.ts';
import { exodeContext } from './contexts/exode.ts';
import { levitiqueContext } from './contexts/levitique.ts';
import { nombresContext } from './contexts/nombres.ts';
import { deuteronomeContext } from './contexts/deuteronome.ts';

// CONTEXTES HISTORIQUES
import { josueContext } from './contexts/josue.ts';
import { jugesContext } from './contexts/juges.ts';

// CONTEXTES VIE DE JÉSUS
import { vieJesusContext } from './contexts/vie-jesus.ts';
import { miraclesJesusContext } from './contexts/miracles-jesus.ts';
import { parabolesJesusContext } from './contexts/paraboles-jesus.ts';
import { passionChristContext } from './contexts/passion-christ.ts';
import { resurrectionContext } from './contexts/resurrection.ts';

// CONTEXTES ÉVÉNEMENTS DE JÉSUS
import { baptemeJesusContext } from './contexts/bapteme-jesus.ts';
import { transfigurationContext } from './contexts/transfiguration.ts';
import { ascensionContext } from './contexts/ascension.ts';
import { enfanceJesusContext } from './contexts/enfance-jesus.ts';

// CONTEXTES ÉVANGILES
import { matthieuContext } from './contexts/matthieu.ts';
import { marcContext } from './contexts/marc.ts';
import { lucContext } from './contexts/luc.ts';
import { jeanEvangelisteContext } from './contexts/jean-evangeliste.ts';
import { actesApotresContext } from './contexts/actes-apotres.ts';
import { jeanBaptisteContext } from './contexts/jean-baptiste.ts';

// CONTEXTES LIVRES POÉTIQUES
import { jobContext } from './contexts/job.ts';
import { psaumesContext } from './contexts/psaumes.ts';
import { proverbesContext } from './contexts/proverbes.ts';
import { ecclesiasteContext } from './contexts/ecclesiaste.ts';
import { cantiqueContext } from './contexts/cantique-cantiques.ts';

// NOUVEAUX CONTEXTES PROPHÈTES
import { esaieContext } from './contexts/esaie.ts';
import { jeremieContext } from './contexts/jeremie.ts';
import { ezechielContext } from './contexts/ezechiel.ts';
import { danielContext } from './contexts/daniel.ts';
import { oseeContext } from './contexts/osee.ts';
import { joelContext } from './contexts/joel.ts';
import { amosContext } from './contexts/amos.ts';
import { jonasContext } from './contexts/jonas.ts';
import { micheeContext } from './contexts/michee.ts';

// NOUVEAUX CONTEXTES ÉPÎTRES
import { romainsContext } from './contexts/romains.ts';
import { corinthiensContext } from './contexts/corinthiens.ts';
import { galatesContext } from './contexts/galates.ts';
import { ephesiensContext } from './contexts/ephesiens.ts';

// NOUVEAUX CONTEXTES PERSONNAGES
import { abrahamContext } from './contexts/abraham.ts';
import { davidContext } from './contexts/david.ts';
import { salomonContext } from './contexts/salomon.ts';
import { moiseContext } from './contexts/moise.ts';

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
  
  // Pentateuque complet
  pentateuchContext,
  geneseContext,
  exodeContext,
  levitiqueContext,
  nombresContext,
  deuteronomeContext,
  
  // Livres historiques complets
  historicalBooksContext,
  josueContext,
  jugesContext,
  ruthContext,
  samuelContext,
  samuel2Context,
  rois1Context,
  rois2Context,
  chroniques1Context,
  chroniques2Context,
  esdrasContext,
  nehemieContext,
  estherContext,
  
  // Livres poétiques complets
  poeticBooksContext,
  jobContext,
  psaumesContext,
  proverbesContext,
  ecclesiasteContext,
  cantiqueContext,
  
  // Prophètes complets
  prophetsContext,
  esaieContext,
  jeremieContext,
  ezechielContext,
  danielContext,
  oseeContext,
  joelContext,
  amosContext,
  jonasContext,
  micheeContext,
  
  // Nouveau Testament
  newTestamentContext,
  evangelilesContext,
  
  // Évangiles spécifiques
  matthieuContext,
  marcContext,
  lucContext,
  jeanEvangelisteContext,
  actesApotresContext,
  jeanBaptisteContext,
  
  // Épîtres
  romainsContext,
  corinthiensContext,
  galatesContext,
  ephesiensContext,
  
  // Vie de Jésus détaillée
  jesusChristContext,
  vieJesusContext,
  enfanceJesusContext,
  baptemeJesusContext,
  miraclesJesusContext,
  parabolesJesusContext,
  transfigurationContext,
  passionChristContext,
  resurrectionContext,
  ascensionContext,
  
  // Personnages bibliques
  abrahamContext,
  davidContext,
  salomonContext,
  moiseContext,
  
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
