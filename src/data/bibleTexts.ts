
// Données bibliques locales - Louis Segond 1910
export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

export const localBibleTexts: Record<string, Record<number, BibleChapter>> = {
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
        { number: 10, text: "Dieu appela le sec terre, et il appela l'amas des eaux mers. Dieu vit que cela était bon." }
      ]
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
        { number: 4, text: "Aram engendra Aminadab; Aminadab engendra Naasson; Naasson engendra Salmon;" },
        { number: 5, text: "Salmon engendra Boaz de Rahab; Boaz engendra Obed de Ruth;" },
        { number: 18, text: "Voici de quelle manière arriva la naissance de Jésus Christ. Marie, sa mère, ayant été fiancée à Joseph, se trouva enceinte, par la vertu du Saint Esprit, avant qu'ils eussent habité ensemble." },
        { number: 19, text: "Joseph, son époux, qui était un homme de bien et qui ne voulait pas la diffamer, se proposa de rompre secrètement avec elle." },
        { number: 20, text: "Comme il y pensait, voici, un ange du Seigneur lui apparut en songe, et dit: Joseph, fils de David, ne crains pas de prendre avec toi Marie, ta femme, car l'enfant qu'elle a conçu vient du Saint Esprit;" },
        { number: 21, text: "elle enfantera un fils, et tu lui donneras le nom de Jésus; c'est lui qui sauvera son peuple de ses péchés." }
      ]
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
      ]
    }
  },
  'JHN': {
    3: {
      book: 'JHN',
      chapter: 3,
      verses: [
        { number: 1, text: "Mais il y eut un homme d'entre les pharisiens, nommé Nicodème, un chef des Juifs," },
        { number: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
        { number: 17, text: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui." }
      ]
    }
  }
};

// Fonction pour obtenir un chapitre
export const getBibleChapter = (bookKey: string, chapter: number): BibleChapter | null => {
  const book = localBibleTexts[bookKey];
  if (!book) return null;
  
  const chapterData = book[chapter];
  if (!chapterData) return null;
  
  return chapterData;
};

// Fonction pour vérifier si un chapitre existe
export const chapterExists = (bookKey: string, chapter: number): boolean => {
  return getBibleChapter(bookKey, chapter) !== null;
};

// Informations sur la Bible locale
export const localBibleInfo = {
  id: 'LSG',
  name: 'Louis Segond 1910 (Local)',
  language: 'fr'
};
