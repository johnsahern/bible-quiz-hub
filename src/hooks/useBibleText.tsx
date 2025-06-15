
import { useState, useEffect } from 'react';

export const useBibleText = (bookKey: string, chapter: number, language: string) => {
  const [text, setText] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBibleText = async () => {
      if (!bookKey || !chapter) return;

      setIsLoading(true);
      setError(null);

      try {
        // Pour la démo, on utilise des données simulées
        // En production, on intégrerait l'API Bible.is
        const mockVerses = Array.from({ length: 20 }, (_, i) => ({
          number: i + 1,
          text: language === 'fr' 
            ? `Ceci est le verset ${i + 1} du chapitre ${chapter} de ${bookKey} en français. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
            : `This is verse ${i + 1} of chapter ${chapter} of ${bookKey} in English. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
        }));

        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));

        setText({
          book: bookKey,
          chapter,
          verses: mockVerses
        });
      } catch (err) {
        setError('Erreur lors du chargement du texte');
        console.error('Bible text fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBibleText();
  }, [bookKey, chapter, language]);

  return { text, isLoading, error };
};
