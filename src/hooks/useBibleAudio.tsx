
import { useState, useEffect, useCallback } from 'react';
import { useBibleList } from './useBibleList';
import { BIBLE_API_CONFIG, getApiHeaders } from '@/config/bibleApi';

export const useBibleAudio = (bookKey: string, chapter: number, language: string) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getBibleByLanguage, isLoading: bibleListLoading } = useBibleList();

  // Cache pour éviter les appels répétés
  const [audioCache, setAudioCache] = useState<Map<string, string | null>>(new Map());

  const fetchBibleAudio = useCallback(async () => {
    if (!bookKey || !chapter || bibleListLoading) return;

    const cacheKey = `${bookKey}-${chapter}-${language}`;
    
    // Vérifier le cache d'abord
    if (audioCache.has(cacheKey)) {
      console.log('Using cached audio for:', cacheKey);
      setAudioUrl(audioCache.get(cacheKey));
      return;
    }

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
        `${BIBLE_API_CONFIG.BASE_URL}/bibles/${bibleId}/chapters/${chapterId}/audio`,
        {
          headers: getApiHeaders()
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Clé API invalide. Veuillez vérifier votre configuration.');
        }
        if (response.status === 404) {
          throw new Error('Audio non disponible pour ce chapitre');
        }
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log('Audio API Response received successfully');

      const url = data.data?.url || null;
      
      // Mettre en cache le résultat
      setAudioCache(prev => new Map(prev).set(cacheKey, url));
      setAudioUrl(url);

      if (!url) {
        throw new Error('URL audio non trouvée dans la réponse');
      }

    } catch (err) {
      console.error('Bible audio fetch error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'audio');
      setAudioUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, [bookKey, chapter, language, bibleListLoading, getBibleByLanguage, audioCache]);

  useEffect(() => {
    fetchBibleAudio();
  }, [fetchBibleAudio]);

  return { audioUrl, isLoading, error };
};
