
import { useState, useEffect } from 'react';
import { getBibleChapter, localBibleInfo, BibleChapter } from '@/data/bibleTexts';

export const useLocalBibleText = (bookKey: string, chapter: number) => {
  const [text, setText] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookKey || !chapter) return;

    setIsLoading(true);
    setError(null);

    // Simulation d'un petit délai pour l'UX
    setTimeout(() => {
      const chapterData = getBibleChapter(bookKey, chapter);
      
      if (!chapterData) {
        setError('Ce chapitre n\'est pas encore disponible dans la base de données locale.');
        setText(null);
      } else {
        const result = {
          book: bookKey,
          chapter,
          verses: chapterData.verses,
          bibleInfo: localBibleInfo
        };
        setText(result);
        setError(null);
      }
      
      setIsLoading(false);
    }, 300);
  }, [bookKey, chapter]);

  return { text, isLoading, error };
};
