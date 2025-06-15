
import { useState, useEffect } from 'react';
import { useBibleList } from './useBibleList';

const API_KEY = '5fc64b36cbabb14bb2a73f6945ea3a0d';
const BASE_URL = 'https://api.scripture.api.bible/v1';

export const useBibleAudio = (bookKey: string, chapter: number, language: string) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getBibleByLanguage, isLoading: bibleListLoading } = useBibleList();

  useEffect(() => {
    const fetchBibleAudio = async () => {
      if (!bookKey || !chapter || bibleListLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const selectedBible = getBibleByLanguage(language);
        
        if (!selectedBible) {
          throw new Error('Aucune Bible disponible pour cette langue');
        }

        const bibleId = selectedBible.id;
        const chapterId = `${bookKey}.${chapter}`;
        
        console.log(`Fetching audio for chapter: ${chapterId} from Bible: ${bibleId} (${selectedBible.name})`);
        
        const response = await fetch(
          `${BASE_URL}/bibles/${bibleId}/chapters/${chapterId}/audio`,
          {
            headers: {
              'api-key': API_KEY,
              'accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Audio non disponible pour ce chapitre');
          }
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        console.log('Audio API Response:', data);

        if (data.data && data.data.url) {
          setAudioUrl(data.data.url);
        } else {
          throw new Error('URL audio non trouvée dans la réponse');
        }

      } catch (err) {
        console.error('Bible audio fetch error:', err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'audio');
        setAudioUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBibleAudio();
  }, [bookKey, chapter, language, bibleListLoading, getBibleByLanguage]);

  return { audioUrl, isLoading, error };
};
