
import { useState, useEffect } from 'react';

const API_KEY = '5fc64b36cbabb14bb2a73f6945ea3a0d';
const BASE_URL = 'https://api.scripture.api.bible/v1';

// Bible IDs pour l'audio (certaines Bibles ont l'audio, d'autres non)
const AUDIO_BIBLE_IDS = {
  fr: 'BDS', // Bible du Semeur
  en: 'KJV'  // King James Version
};

export const useBibleAudio = (bookKey: string, chapter: number, language: string) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBibleAudio = async () => {
      if (!bookKey || !chapter) return;

      setIsLoading(true);
      setError(null);

      try {
        const bibleId = AUDIO_BIBLE_IDS[language as keyof typeof AUDIO_BIBLE_IDS] || AUDIO_BIBLE_IDS.en;
        const chapterId = `${bookKey}.${chapter}`;
        
        console.log(`Fetching audio for chapter: ${chapterId} from Bible: ${bibleId}`);
        
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
        
        // Fallback vers une URL audio de démonstration si l'API n'a pas d'audio
        if (err instanceof Error && err.message.includes('404')) {
          setAudioUrl('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBibleAudio();
  }, [bookKey, chapter, language]);

  return { audioUrl, isLoading, error };
};
