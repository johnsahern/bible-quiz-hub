
import { BiblicalContext } from '../biblical-contexts.ts';

export const overviewContexts: BiblicalContext[] = [
  {
    id: 'ancien-testament',
    title: 'L\'Ancien Testament',
    context: 'L\'étude d\'ensemble des 39 livres de l\'Ancien Testament, depuis la Genèse jusqu\'à Malachie. Cette thématique englobe la création, les patriarches, l\'histoire d\'Israël, les rois, les prophètes et la sagesse biblique, préparant la venue du Messie.',
    keyVerses: ['Genèse 1:1', 'Exode 20:1-17', 'Deutéronome 6:4-5', 'Psaume 23', 'Ésaïe 53:5', 'Malachie 3:10']
  },
  {
    id: 'nouveau-testament',
    title: 'Le Nouveau Testament',
    context: 'L\'étude complète des 27 livres du Nouveau Testament, depuis Matthieu jusqu\'à l\'Apocalypse. Cette thématique couvre la vie du Christ, l\'établissement de l\'Église primitive, les épîtres apostoliques et les prophéties eschatologiques.',
    keyVerses: ['Matthieu 28:19', 'Jean 14:6', 'Actes 2:38', 'Romains 3:23', '1 Corinthiens 15:3-4', 'Apocalypse 21:4']
  },
  {
    id: 'apocalypse',
    title: 'L\'Apocalypse',
    context: 'L\'étude de la révélation donnée à Jean sur l\'île de Patmos, concernant les derniers temps, le retour du Christ et l\'établissement de son royaume éternel. Ce livre révèle la victoire finale de Dieu.',
    keyVerses: ['Apocalypse 1:3', 'Apocalypse 19:11-16', 'Apocalypse 21:1-4']
  }
];
