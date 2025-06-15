
import { useState, useEffect } from 'react';

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
        // Pour la démo, on utilise une URL audio simulée
        // En production, on intégrerait l'API Bible.is pour récupérer les vrais liens audio
        
        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1500));

        // URL audio de démonstration (vous devrez remplacer par l'API Bible.is)
        const mockAudioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
        
        setAudioUrl(mockAudioUrl);
      } catch (err) {
        setError('Erreur lors du chargement de l\'audio');
        console.error('Bible audio fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBibleAudio();
  }, [bookKey, chapter, language]);

  return { audioUrl, isLoading, error };
};
