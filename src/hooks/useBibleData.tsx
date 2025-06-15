
import { useState, useEffect } from 'react';
import { BibleChapter, availableBibleVersions } from '@/data/bibleStructure';
import { getBibleChapter, getAvailableChapters, getAvailableBooks } from '@/data/bibleChapters';

export interface UseBibleDataReturn {
  chapter: BibleChapter | null;
  isLoading: boolean;
  error: string | null;
  availableVersions: typeof availableBibleVersions;
  availableChapters: number[];
  availableBooks: string[];
}

export const useBibleData = (
  versionId: string = 'LSG',
  bookKey: string,
  chapterNumber: number
): UseBibleDataReturn => {
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableChapters, setAvailableChapters] = useState<number[]>([]);
  const [availableBooks, setAvailableBooks] = useState<string[]>([]);

  useEffect(() => {
    if (!bookKey || !chapterNumber || !versionId) return;

    setIsLoading(true);
    setError(null);

    // Simulation d'un petit délai pour l'UX (optionnel)
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const chapterData = getBibleChapter(versionId, bookKey, chapterNumber);
        
        if (!chapterData) {
          setError(`Le chapitre ${chapterNumber} du livre ${bookKey} n'est pas disponible dans la version ${versionId}.`);
          setChapter(null);
        } else {
          setChapter(chapterData);
          setError(null);
        }
        
        // Charger les chapitres disponibles pour ce livre
        const chapters = getAvailableChapters(versionId, bookKey);
        setAvailableChapters(chapters);
        
      } catch (err) {
        setError('Erreur lors du chargement du chapitre.');
        setChapter(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [versionId, bookKey, chapterNumber]);

  useEffect(() => {
    // Charger les livres disponibles pour cette version
    const books = getAvailableBooks(versionId);
    setAvailableBooks(books);
  }, [versionId]);

  return {
    chapter,
    isLoading,
    error,
    availableVersions: availableBibleVersions,
    availableChapters,
    availableBooks
  };
};
