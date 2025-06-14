
export interface BiblicalContext {
  id: string;
  title: string;
  context: string;
  keyVerses?: string[];
}

export const biblicalContexts: BiblicalContext[] = [
  {
    id: 'vie-jesus',
    title: 'La Vie de Jésus-Christ',
    context: 'L\'étude complète de la vie terrestre de Jésus-Christ, depuis sa naissance miraculeuse à Bethléem jusqu\'à son ascension glorieuse. Cette thématique couvre les événements majeurs : l\'Incarnation, les miracles, les paraboles, la passion, la crucifixion, la résurrection et l\'ascension. Les questions exploreront les enseignements du Seigneur, ses interactions avec les disciples et les foules, ainsi que l\'accomplissement des prophéties messianiques.',
    keyVerses: ['Jean 1:1-14', 'Matthieu 1:23', 'Luc 2:7', 'Jean 3:16', 'Matthieu 28:18-20', 'Actes 1:9-11']
  },
  {
    id: 'ancien-testament',
    title: 'L\'Ancien Testament',
    context: 'L\'étude approfondie des 39 livres de l\'Ancien Testament, depuis la Genèse jusqu\'à Malachie. Cette thématique englobe la création, les patriarches, l\'histoire d\'Israël, les rois, les prophètes et la sagesse biblique. Les questions couvriront les personnages clés, les événements historiques, les lois mosaïques, les prophéties messianiques et les enseignements spirituels fondamentaux.',
    keyVerses: ['Genèse 1:1', 'Exode 20:1-17', 'Deutéronome 6:4-5', 'Psaume 23', 'Ésaïe 53:5', 'Malachie 3:10']
  },
  {
    id: 'nouveau-testament',
    title: 'Le Nouveau Testament',
    context: 'L\'étude complète des 27 livres du Nouveau Testament, depuis Matthieu jusqu\'à l\'Apocalypse. Cette thématique couvre la vie du Christ, l\'établissement de l\'Église primitive, les épîtres apostoliques et les prophéties eschatologiques. Les questions exploreront les enseignements christologiques, l\'œuvre de l\'Esprit-Saint, la sotériologie et l\'espérance chrétienne.',
    keyVerses: ['Matthieu 28:19', 'Jean 14:6', 'Actes 2:38', 'Romains 3:23', '1 Corinthiens 15:3-4', 'Apocalypse 21:4']
  },
  {
    id: 'jean-baptiste',
    title: 'Jean-Baptiste, le Précurseur du Messie',
    context: 'L\'étude détaillée de la vie et du ministère de Jean-Baptiste, le dernier et le plus grand des prophètes de l\'Ancien Testament. Fils de Zacharie et Élisabeth, Jean fut appelé dès le ventre de sa mère à préparer le chemin du Seigneur. Son ministère de baptême dans le Jourdain, sa prédication de la repentance, son témoignage sur Jésus comme l\'Agneau de Dieu, et son martyre sous Hérode Antipas constituent les éléments centraux de cette thématique.',
    keyVerses: ['Luc 1:13-17', 'Matthieu 3:1-3', 'Jean 1:29', 'Matthieu 11:11', 'Marc 6:14-29', 'Luc 3:16']
  },
  {
    id: 'apotre-paul',
    title: 'L\'Apôtre Paul',
    context: 'L\'étude approfondie de la vie et du ministère de l\'apôtre Paul, depuis sa conversion sur le chemin de Damas jusqu\'à son martyre à Rome. Cette thématique couvre ses voyages missionnaires, ses épîtres doctrinales, sa théologie de la grâce et son impact sur l\'expansion du christianisme primitif.',
    keyVerses: ['Actes 9:1-19', 'Galates 2:20', 'Philippiens 3:7-8', 'Romains 1:16', '2 Timothée 4:7-8', 'Actes 28:30-31']
  },
  {
    id: 'propheties-messianiques',
    title: 'Les Prophéties Messianiques',
    context: 'L\'étude des prophéties de l\'Ancien Testament concernant la venue du Messie et leur accomplissement parfait en Jésus-Christ. Cette thématique explore les promesses divines, les types et les figures christologiques, ainsi que l\'harmonie prophétique entre les deux Testaments.',
    keyVerses: ['Genèse 3:15', 'Ésaïe 7:14', 'Michée 5:2', 'Ésaïe 53:1-12', 'Daniel 9:24-27', 'Zacharie 9:9']
  }
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
