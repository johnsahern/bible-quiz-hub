
// Mise à jour des clés pour correspondre à l'API scripture.api.bible
export const bibleBooks = [
  // Ancien Testament
  {
    key: 'GEN',
    name: { fr: 'Genèse', en: 'Genesis' },
    testament: 'old',
    chapters: 50,
    colors: { primary: '#8B5CF6', secondary: '#A78BFA' },
    category: 'pentateuch'
  },
  {
    key: 'EXO',
    name: { fr: 'Exode', en: 'Exodus' },
    testament: 'old',
    chapters: 40,
    colors: { primary: '#EF4444', secondary: '#F87171' },
    category: 'pentateuch'
  },
  {
    key: 'LEV',
    name: { fr: 'Lévitique', en: 'Leviticus' },
    testament: 'old',
    chapters: 27,
    colors: { primary: '#F59E0B', secondary: '#FBBF24' },
    category: 'pentateuch'
  },
  {
    key: 'NUM',
    name: { fr: 'Nombres', en: 'Numbers' },
    testament: 'old',
    chapters: 36,
    colors: { primary: '#10B981', secondary: '#34D399' },
    category: 'pentateuch'
  },
  {
    key: 'DEU',
    name: { fr: 'Deutéronome', en: 'Deuteronomy' },
    testament: 'old',
    chapters: 34,
    colors: { primary: '#3B82F6', secondary: '#60A5FA' },
    category: 'pentateuch'
  },
  {
    key: 'JOS',
    name: { fr: 'Josué', en: 'Joshua' },
    testament: 'old',
    chapters: 24,
    colors: { primary: '#DC2626', secondary: '#EF4444' },
    category: 'historical'
  },
  {
    key: 'JDG',
    name: { fr: 'Juges', en: 'Judges' },
    testament: 'old',
    chapters: 21,
    colors: { primary: '#92400E', secondary: '#B45309' },
    category: 'historical'
  },
  {
    key: 'RUT',
    name: { fr: 'Ruth', en: 'Ruth' },
    testament: 'old',
    chapters: 4,
    colors: { primary: '#EC4899', secondary: '#F472B6' },
    category: 'historical'
  },
  {
    key: '1SA',
    name: { fr: '1 Samuel', en: '1 Samuel' },
    testament: 'old',
    chapters: 31,
    colors: { primary: '#7C3AED', secondary: '#8B5CF6' },
    category: 'historical'
  },
  {
    key: '2SA',
    name: { fr: '2 Samuel', en: '2 Samuel' },
    testament: 'old',
    chapters: 24,
    colors: { primary: '#6366F1', secondary: '#818CF8' },
    category: 'historical'
  },
  {
    key: '1KI',
    name: { fr: '1 Rois', en: '1 Kings' },
    testament: 'old',
    chapters: 22,
    colors: { primary: '#F59E0B', secondary: '#FBBF24' },
    category: 'historical'
  },
  {
    key: '2KI',
    name: { fr: '2 Rois', en: '2 Kings' },
    testament: 'old',
    chapters: 25,
    colors: { primary: '#B91C1C', secondary: '#DC2626' },
    category: 'historical'
  },
  {
    key: 'PSA',
    name: { fr: 'Psaumes', en: 'Psalms' },
    testament: 'old',
    chapters: 150,
    colors: { primary: '#06B6D4', secondary: '#22D3EE' },
    category: 'poetic'
  },
  {
    key: 'PRO',
    name: { fr: 'Proverbes', en: 'Proverbs' },
    testament: 'old',
    chapters: 31,
    colors: { primary: '#059669', secondary: '#10B981' },
    category: 'poetic'
  },
  {
    key: 'ECC',
    name: { fr: 'Ecclésiaste', en: 'Ecclesiastes' },
    testament: 'old',
    chapters: 12,
    colors: { primary: '#6B7280', secondary: '#9CA3AF' },
    category: 'poetic'
  },
  {
    key: 'ISA',
    name: { fr: 'Ésaïe', en: 'Isaiah' },
    testament: 'old',
    chapters: 66,
    colors: { primary: '#C026D3', secondary: '#D946EF' },
    category: 'prophetic'
  },
  {
    key: 'JER',
    name: { fr: 'Jérémie', en: 'Jeremiah' },
    testament: 'old',
    chapters: 52,
    colors: { primary: '#991B1B', secondary: '#B91C1C' },
    category: 'prophetic'
  },
  {
    key: 'DAN',
    name: { fr: 'Daniel', en: 'Daniel' },
    testament: 'old',
    chapters: 12,
    colors: { primary: '#7C2D12', secondary: '#92400E' },
    category: 'prophetic'
  },

  // Nouveau Testament
  {
    key: 'MAT',
    name: { fr: 'Matthieu', en: 'Matthew' },
    testament: 'new',
    chapters: 28,
    colors: { primary: '#DC2626', secondary: '#EF4444' },
    category: 'gospel'
  },
  {
    key: 'MRK',
    name: { fr: 'Marc', en: 'Mark' },
    testament: 'new',
    chapters: 16,
    colors: { primary: '#EA580C', secondary: '#F97316' },
    category: 'gospel'
  },
  {
    key: 'LUK',
    name: { fr: 'Luc', en: 'Luke' },
    testament: 'new',
    chapters: 24,
    colors: { primary: '#0891B2', secondary: '#06B6D4' },
    category: 'gospel'
  },
  {
    key: 'JHN',
    name: { fr: 'Jean', en: 'John' },
    testament: 'new',
    chapters: 21,
    colors: { primary: '#7C3AED', secondary: '#8B5CF6' },
    category: 'gospel'
  },
  {
    key: 'ACT',
    name: { fr: 'Actes', en: 'Acts' },
    testament: 'new',
    chapters: 28,
    colors: { primary: '#DC2626', secondary: '#F87171' },
    category: 'historical'
  },
  {
    key: 'ROM',
    name: { fr: 'Romains', en: 'Romans' },
    testament: 'new',
    chapters: 16,
    colors: { primary: '#1F2937', secondary: '#374151' },
    category: 'epistle'
  },
  {
    key: '1CO',
    name: { fr: '1 Corinthiens', en: '1 Corinthians' },
    testament: 'new',
    chapters: 16,
    colors: { primary: '#059669', secondary: '#10B981' },
    category: 'epistle'
  },
  {
    key: '2CO',
    name: { fr: '2 Corinthiens', en: '2 Corinthians' },
    testament: 'new',
    chapters: 13,
    colors: { primary: '#0D9488', secondary: '#14B8A6' },
    category: 'epistle'
  },
  {
    key: 'GAL',
    name: { fr: 'Galates', en: 'Galatians' },
    testament: 'new',
    chapters: 6,
    colors: { primary: '#B91C1C', secondary: '#DC2626' },
    category: 'epistle'
  },
  {
    key: 'EPH',
    name: { fr: 'Éphésiens', en: 'Ephesians' },
    testament: 'new',
    chapters: 6,
    colors: { primary: '#3B82F6', secondary: '#60A5FA' },
    category: 'epistle'
  },
  {
    key: 'REV',
    name: { fr: 'Apocalypse', en: 'Revelation' },
    testament: 'new',
    chapters: 22,
    colors: { primary: '#F59E0B', secondary: '#FBBF24' },
    category: 'prophetic'
  }
];
