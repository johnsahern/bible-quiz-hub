
import { useState, useEffect, useCallback } from 'react';
import { useBibleList } from './useBibleList';
import { BIBLE_API_CONFIG, getApiHeaders, isApiConfigured } from '@/config/bibleApi';

export const useBibleAudio = (bookKey: string, chapter: number, language: string) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getBibleByLanguage, isLoading: bibleListLoading } = useBibleList();

  const fetchBibleAudio = useCallback(async () => {
    if (!bookKey || !chapter || bibleListLoading) return;

    // Vérifier la configuration
    if (!isApiConfigured()) {
      setError('Configuration requise: Ajoutez votre clé API dans src/config/bibleApi.ts');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const selectedBible = getBibleByLanguage(language);
      
      if (!selectedBible) {
        throw new Error('Aucune Bible disponible pour cette langue. Vérifiez votre clé API.');
      }

      const bibleId = selectedBible.id;
      const chapterId = `${bookKey}.${chapter}`;
      
      console.log(`Fetching audio for chapter: ${chapterId} from Bible: ${bibleId} (${selectedBible.name})`);
      
      const response = await fetch(
        `${BIBLE_API_CONFIG.BASE_URL}/bibles/${bibleId}/chapters/${chapterId}/audio`,
        {
          headers: getApiHeaders()
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Clé API invalide. Mettez à jour votre clé dans src/config/bibleApi.ts');
        }
        if (response.status === 404) {
          setError('Audio non disponible pour ce chapitre dans cette version de la Bible');
          setAudioUrl(null);
          return;
        }
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log('Audio API Response received successfully');

      const url = data.data?.url || null;
      setAudioUrl(url);

      if (!url) {
        setError('URL audio non trouvée dans la réponse');
      }

    } catch (err) {
      console.error('Bible audio fetch error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'audio');
      setAudioUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, [bookKey, chapter, language, bibleListLoading, getBibleByLanguage]);

  useEffect(() => {
    fetchBibleAudio();
  }, [fetchBibleAudio]);

  return { audioUrl, isLoading, error };
};
