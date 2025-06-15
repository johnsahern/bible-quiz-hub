
// Système de gestion des chapitres bibliques
// Ce fichier contiendra les chapitres complets téléchargés

import { BibleChapter } from './bibleStructure';

// Structure pour organiser les chapitres par version et livre
export interface BibleData {
  [versionId: string]: {
    [bookKey: string]: {
      [chapterNumber: number]: BibleChapter;
    };
  };
}

// Données bibliques locales - Version initiale avec quelques exemples
export const localBibleData: BibleData = {
  'LSG': {
    'GEN': {
      1: {
        book: 'GEN',
        chapter: 1,
        verses: [
          { number: 1, text: "Au commencement, Dieu créa les cieux et la terre." },
          { number: 2, text: "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux." },
          { number: 3, text: "Dieu dit: Que la lumière soit! Et la lumière fut." },
          { number: 4, text: "Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres." },
          { number: 5, text: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour." },
          { number: 6, text: "Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux." },
          { number: 7, text: "Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut ainsi." },
          { number: 8, text: "Dieu appela l'étendue ciel. Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour." },
          { number: 9, text: "Dieu dit: Que les eaux qui sont au-dessous du ciel se rassemblent en un seul lieu, et que le sec paraisse. Et cela fut ainsi." },
          { number: 10, text: "Dieu appela le sec terre, et il appela l'amas des eaux mers. Dieu vit que cela était bon." },
          { number: 11, text: "Puis Dieu dit: Que la terre produise de la verdure, de l'herbe portant de la semence, des arbres fruitiers donnant du fruit selon leur espèce et ayant en eux leur semence sur la terre. Et cela fut ainsi." },
          { number: 12, text: "La terre produisit de la verdure, de l'herbe portant de la semence selon son espèce, et des arbres donnant du fruit et ayant en eux leur semence selon leur espèce. Dieu vit que cela était bon." },
          { number: 13, text: "Ainsi, il y eut un soir, et il y eut un matin: ce fut le troisième jour." },
          { number: 14, text: "Dieu dit: Qu'il y ait des luminaires dans l'étendue du ciel, pour séparer le jour d'avec la nuit; que ce soient des signes pour marquer les époques, les jours et les années;" },
          { number: 15, text: "et qu'ils servent de luminaires dans l'étendue du ciel, pour éclairer la terre. Et cela fut ainsi." },
          { number: 16, text: "Dieu fit les deux grands luminaires, le plus grand luminaire pour présider au jour, et le plus petit luminaire pour présider à la nuit; il fit aussi les étoiles." },
          { number: 17, text: "Dieu les plaça dans l'étendue du ciel, pour éclairer la terre," },
          { number: 18, text: "pour présider au jour et à la nuit, et pour séparer la lumière d'avec les ténèbres. Dieu vit que cela était bon." },
          { number: 19, text: "Ainsi, il y eut un soir, et il y eut un matin: ce fut le quatrième jour." },
          { number: 20, text: "Dieu dit: Que les eaux produisent en abondance des animaux vivants, et que des oiseaux volent sur la terre vers l'étendue du ciel." },
          { number: 21, text: "Dieu créa les grands poissons et tous les animaux vivants qui se meuvent, et que les eaux produisirent en abondance selon leur espèce; il créa aussi tout oiseau ailé selon son espèce. Dieu vit que cela était bon." },
          { number: 22, text: "Dieu les bénit, en disant: Soyez féconds, multipliez, et remplissez les eaux des mers; et que les oiseaux multiplient sur la terre." },
          { number: 23, text: "Ainsi, il y eut un soir, et il y eut un matin: ce fut le cinquième jour." },
          { number: 24, text: "Dieu dit: Que la terre produise des animaux vivants selon leur espèce, du bétail, des reptiles et des animaux terrestres, selon leur espèce. Et cela fut ainsi." },
          { number: 25, text: "Dieu fit les animaux de la terre selon leur espèce, le bétail selon son espèce, et tous les reptiles de la terre selon leur espèce. Dieu vit que cela était bon." },
          { number: 26, text: "Puis Dieu dit: Faisons l'homme à notre image, selon notre ressemblance, et qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre, et sur tous les reptiles qui rampent sur la terre." },
          { number: 27, text: "Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme." },
          { number: 28, text: "Dieu les bénit, et Dieu leur dit: Soyez féconds, multipliez, remplissez la terre, et l'assujettissez; et dominez sur les poissons de la mer, sur les oiseaux du ciel, et sur tout animal qui se meut sur la terre." },
          { number: 29, text: "Et Dieu dit: Voici, je vous donne toute herbe portant de la semence et qui est à la surface de toute la terre, et tout arbre ayant en lui du fruit d'arbre et portant de la semence: ce sera votre nourriture." },
          { number: 30, text: "Et à tout animal de la terre, à tout oiseau du ciel, et à tout ce qui se meut sur la terre, ayant en soi un souffle de vie, je donne toute herbe verte pour nourriture. Et cela fut ainsi." },
          { number: 31, text: "Dieu vit tout ce qu'il avait fait et voici, cela était très bon. Ainsi, il y eut un soir, et il y eut un matin: ce fut le sixième jour." }
        ],
        metadata: {
          theme: "La Création",
          summary: "Récit de la création du monde en six jours"
        }
      }
    },
    'PSA': {
      23: {
        book: 'PSA',
        chapter: 23,
        verses: [
          { number: 1, text: "L'Éternel est mon berger: je ne manquerai de rien." },
          { number: 2, text: "Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles." },
          { number: 3, text: "Il restaure mon âme, Il me conduit dans les sentiers de la justice, À cause de son nom." },
          { number: 4, text: "Quand je marche dans la vallée de l'ombre de la mort, Je ne crains aucun mal, car tu es avec moi: Ta houlette et ton bâton me rassurent." },
          { number: 5, text: "Tu dresses devant moi une table, En face de mes adversaires; Tu oins d'huile ma tête, Et ma coupe déborde." },
          { number: 6, text: "Oui, le bonheur et la grâce m'accompagneront Tous les jours de ma vie, Et j'habiterai dans la maison de l'Éternel Jusqu'à la fin de mes jours." }
        ],
        metadata: {
          theme: "Confiance en Dieu",
          summary: "Psaume de David exprimant sa confiance en Dieu comme berger"
        }
      }
    },
    'MAT': {
      1: {
        book: 'MAT',
        chapter: 1,
        verses: [
          { number: 1, text: "Généalogie de Jésus Christ, fils de David, fils d'Abraham." },
          { number: 2, text: "Abraham engendra Isaac; Isaac engendra Jacob; Jacob engendra Juda et ses frères;" },
          { number: 3, text: "Juda engendra de Thamar Pharès et Zara; Pharès engendra Esrom; Esrom engendra Aram;" },
          { number: 16, text: "Jacob engendra Joseph, l'époux de Marie, de laquelle est né Jésus, qui est appelé Christ." },
          { number: 17, text: "Il y a donc en tout quatorze générations depuis Abraham jusqu'à David, quatorze générations depuis David jusqu'à la déportation à Babylone, et quatorze générations depuis la déportation à Babylone jusqu'au Christ." },
          { number: 18, text: "Voici de quelle manière arriva la naissance de Jésus Christ. Marie, sa mère, ayant été fiancée à Joseph, se trouva enceinte, par la vertu du Saint Esprit, avant qu'ils eussent habité ensemble." },
          { number: 19, text: "Joseph, son époux, qui était un homme de bien et qui ne voulait pas la diffamer, se proposa de rompre secrètement avec elle." },
          { number: 20, text: "Comme il y pensait, voici, un ange du Seigneur lui apparut en songe, et dit: Joseph, fils de David, ne crains pas de prendre avec toi Marie, ta femme, car l'enfant qu'elle a conçu vient du Saint Esprit;" },
          { number: 21, text: "elle enfantera un fils, et tu lui donneras le nom de Jésus; c'est lui qui sauvera son peuple de ses péchés." },
          { number: 25, text: "Mais il ne la connut point jusqu'à ce qu'elle eût enfanté un fils, auquel il donna le nom de Jésus." }
        ],
        metadata: {
          theme: "Généalogie et naissance de Jésus",
          summary: "Généalogie de Jésus et récit de sa naissance"
        }
      }
    },
    'JHN': {
      3: {
        book: 'JHN',
        chapter: 3,
        verses: [
          { number: 1, text: "Mais il y eut un homme d'entre les pharisiens, nommé Nicodème, un chef des Juifs," },
          { number: 2, text: "qui vint de nuit vers Jésus, et lui dit: Rabbi, nous savons que tu es un docteur venu de Dieu; car personne ne peut faire ces miracles que tu fais, si Dieu n'est avec lui." },
          { number: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
          { number: 17, text: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui." },
          { number: 36, text: "Celui qui croit au Fils a la vie éternelle; celui qui ne croit pas au Fils ne verra point la vie, mais la colère de Dieu demeure sur lui." }
        ],
        metadata: {
          theme: "Nouvelle naissance et amour de Dieu",
          summary: "Dialogue avec Nicodème et le célèbre verset Jean 3:16"
        }
      }
    }
  }
};

// Fonctions utilitaires pour accéder aux données
export const getBibleChapter = (
  versionId: string,
  bookKey: string,
  chapter: number
): BibleChapter | null => {
  const version = localBibleData[versionId];
  if (!version) return null;
  
  const book = version[bookKey];
  if (!book) return null;
  
  const chapterData = book[chapter];
  if (!chapterData) return null;
  
  return chapterData;
};

export const chapterExists = (
  versionId: string,
  bookKey: string,
  chapter: number
): boolean => {
  return getBibleChapter(versionId, bookKey, chapter) !== null;
};

export const getAvailableChapters = (
  versionId: string,
  bookKey: string
): number[] => {
  const version = localBibleData[versionId];
  if (!version) return [];
  
  const book = version[bookKey];
  if (!book) return [];
  
  return Object.keys(book).map(Number).sort((a, b) => a - b);
};

export const getAvailableBooks = (versionId: string): string[] => {
  const version = localBibleData[versionId];
  if (!version) return [];
  
  return Object.keys(version);
};

// Fonction pour ajouter de nouveaux chapitres (utile pour l'import de données)
export const addBibleChapter = (
  versionId: string,
  chapter: BibleChapter
): void => {
  if (!localBibleData[versionId]) {
    localBibleData[versionId] = {};
  }
  
  if (!localBibleData[versionId][chapter.book]) {
    localBibleData[versionId][chapter.book] = {};
  }
  
  localBibleData[versionId][chapter.book][chapter.chapter] = chapter;
};
