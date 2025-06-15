
// Ce hook est maintenant obsolète, remplacé par useBibleData
// Gardé pour compatibilité temporaire

import { useState, useEffect } from 'react';
import { getBibleChapter } from '@/data/bibleChapters';
import { availableBibleVersions } from '@/data/bibleStructure';

export const useLocalBibleText = (bookKey: string, chapter: number, versionId: string = 'LSG') => {
  const [text, setText] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookKey || !chapter) return;

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const chapterData = getBibleChapter(versionId, bookKey, chapter);
      
      if (!chapterData) {
        setError(`Ce chapitre n'est pas encore disponible dans la base de données locale pour la version ${versionId}.`);
        setText(null);
      } else {
        const bibleInfo = availableBibleVersions.find(v => v.id === versionId) || {
          id: versionId,
          name: 'Version locale',
          language: 'fr'
        };

        const result = {
          book: bookKey,
          chapter,
          verses: chapterData.verses,
          bibleInfo
        };
        setText(result);
        setError(null);
      }
      
      setIsLoading(false);
    }, 300);
  }, [bookKey, chapter, versionId]);

  return { text, isLoading, error };
};
