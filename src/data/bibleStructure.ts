
// Structure complète de la Bible avec métadonnées
export interface BibleBook {
  key: string;
  name: {
    fr: string;
    en: string;
  };
  testament: 'old' | 'new';
  category: 'pentateuch' | 'historical' | 'poetic' | 'prophetic' | 'gospel' | 'epistles' | 'apocalyptic';
  chapters: number;
  colors: {
    primary: string;
    secondary: string;
  };
  description?: {
    fr: string;
    en: string;
  };
}

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
  metadata?: {
    theme?: string;
    summary?: string;
  };
}

export interface BibleVersion {
  id: string;
  name: string;
  language: string;
  description: string;
  year?: number;
}

// Versions disponibles
export const availableBibleVersions: BibleVersion[] = [
  {
    id: 'LSG',
    name: 'Louis Segond 1910',
    language: 'fr',
    description: 'Version française classique',
    year: 1910
  },
  {
    id: 'BDS',
    name: 'Bible du Semeur',
    language: 'fr',
    description: 'Version française contemporaine',
    year: 1992
  },
  {
    id: 'KJV',
    name: 'King James Version',
    language: 'en',
    description: 'Classic English translation',
    year: 1611
  }
];

// Structure complète des livres bibliques
export const completeBibleBooks: BibleBook[] = [
  // Ancien Testament - Pentateuque
  {
    key: 'GEN',
    name: { fr: 'Genèse', en: 'Genesis' },
    testament: 'old',
    category: 'pentateuch',
    chapters: 50,
    colors: { primary: '#8B5CF6', secondary: '#A78BFA' },
    description: { 
      fr: 'Le livre des commencements',
      en: 'The book of beginnings'
    }
  },
  {
    key: 'EXO',
    name: { fr: 'Exode', en: 'Exodus' },
    testament: 'old',
    category: 'pentateuch',
    chapters: 40,
    colors: { primary: '#F59E0B', secondary: '#FBBF24' }
  },
  {
    key: 'LEV',
    name: { fr: 'Lévitique', en: 'Leviticus' },
    testament: 'old',
    category: 'pentateuch',
    chapters: 27,
    colors: { primary: '#EF4444', secondary: '#F87171' }
  },
  {
    key: 'NUM',
    name: { fr: 'Nombres', en: 'Numbers' },
    testament: 'old',
    category: 'pentateuch',
    chapters: 36,
    colors: { primary: '#10B981', secondary: '#34D399' }
  },
  {
    key: 'DEU',
    name: { fr: 'Deutéronome', en: 'Deuteronomy' },
    testament: 'old',
    category: 'pentateuch',
    chapters: 34,
    colors: { primary: '#3B82F6', secondary: '#60A5FA' }
  },
  
  // Livres historiques (sélection)
  {
    key: 'JOS',
    name: { fr: 'Josué', en: 'Joshua' },
    testament: 'old',
    category: 'historical',
    chapters: 24,
    colors: { primary: '#8B5CF6', secondary: '#A78BFA' }
  },
  {
    key: '1SA',
    name: { fr: '1 Samuel', en: '1 Samuel' },
    testament: 'old',
    category: 'historical',
    chapters: 31,
    colors: { primary: '#F59E0B', secondary: '#FBBF24' }
  },
  {
    key: '2SA',
    name: { fr: '2 Samuel', en: '2 Samuel' },
    testament: 'old',
    category: 'historical',
    chapters: 24,
    colors: { primary: '#F59E0B', secondary: '#FBBF24' }
  },
  {
    key: '1KI',
    name: { fr: '1 Rois', en: '1 Kings' },
    testament: 'old',
    category: 'historical',
    chapters: 22,
    colors: { primary: '#EF4444', secondary: '#F87171' }
  },
  
  // Livres poétiques
  {
    key: 'PSA',
    name: { fr: 'Psaumes', en: 'Psalms' },
    testament: 'old',
    category: 'poetic',
    chapters: 150,
    colors: { primary: '#10B981', secondary: '#34D399' },
    description: {
      fr: 'Recueil de chants et prières',
      en: 'Collection of songs and prayers'
    }
  },
  {
    key: 'PRO',
    name: { fr: 'Proverbes', en: 'Proverbs' },
    testament: 'old',
    category: 'poetic',
    chapters: 31,
    colors: { primary: '#3B82F6', secondary: '#60A5FA' }
  },
  {
    key: 'ECC',
    name: { fr: 'Ecclésiaste', en: 'Ecclesiastes' },
    testament: 'old',
    category: 'poetic',
    chapters: 12,
    colors: { primary: '#8B5CF6', secondary: '#A78BFA' }
  },
  
  // Nouveau Testament - Évangiles
  {
    key: 'MAT',
    name: { fr: 'Matthieu', en: 'Matthew' },
    testament: 'new',
    category: 'gospel',
    chapters: 28,
    colors: { primary: '#F59E0B', secondary: '#FBBF24' },
    description: {
      fr: 'Évangile selon Matthieu',
      en: 'Gospel according to Matthew'
    }
  },
  {
    key: 'MAR',
    name: { fr: 'Marc', en: 'Mark' },
    testament: 'new',
    category: 'gospel',
    chapters: 16,
    colors: { primary: '#EF4444', secondary: '#F87171' }
  },
  {
    key: 'LUK',
    name: { fr: 'Luc', en: 'Luke' },
    testament: 'new',
    category: 'gospel',
    chapters: 24,
    colors: { primary: '#10B981', secondary: '#34D399' }
  },
  {
    key: 'JHN',
    name: { fr: 'Jean', en: 'John' },
    testament: 'new',
    category: 'gospel',
    chapters: 21,
    colors: { primary: '#3B82F6', secondary: '#60A5FA' },
    description: {
      fr: 'Évangile selon Jean',
      en: 'Gospel according to John'
    }
  },
  
  // Actes et Épîtres (sélection)
  {
    key: 'ACT',
    name: { fr: 'Actes', en: 'Acts' },
    testament: 'new',
    category: 'historical',
    chapters: 28,
    colors: { primary: '#8B5CF6', secondary: '#A78BFA' }
  },
  {
    key: 'ROM',
    name: { fr: 'Romains', en: 'Romans' },
    testament: 'new',
    category: 'epistles',
    chapters: 16,
    colors: { primary: '#F59E0B', secondary: '#FBBF24' }
  },
  {
    key: '1CO',
    name: { fr: '1 Corinthiens', en: '1 Corinthians' },
    testament: 'new',
    category: 'epistles',
    chapters: 16,
    colors: { primary: '#EF4444', secondary: '#F87171' }
  },
  {
    key: 'EPH',
    name: { fr: 'Éphésiens', en: 'Ephesians' },
    testament: 'new',
    category: 'epistles',
    chapters: 6,
    colors: { primary: '#10B981', secondary: '#34D399' }
  }
];

// Fonction pour obtenir un livre par clé
export const getBibleBook = (key: string): BibleBook | null => {
  return completeBibleBooks.find(book => book.key === key) || null;
};

// Fonction pour obtenir les livres par testament
export const getBooksByTestament = (testament: 'old' | 'new'): BibleBook[] => {
  return completeBibleBooks.filter(book => book.testament === testament);
};

// Fonction pour obtenir les livres par catégorie
export const getBooksByCategory = (category: string): BibleBook[] => {
  return completeBibleBooks.filter(book => book.category === category);
};
