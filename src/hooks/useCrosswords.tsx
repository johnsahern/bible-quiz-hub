
import { useState } from 'react';
import { CrosswordGame } from '@/types/gameTypes';

export const useCrosswords = () => {
  const [crossword, setCrossword] = useState<CrosswordGame | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCrossword = async (theme: string, difficulty: string, gridSize: number = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`🎯 Génération de mots croisés pour ${theme} (${difficulty})`);
      
      const response = await fetch(
        'https://evaftpnfakxwekkggipn.supabase.co/functions/v1/generate-crossword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2YWZ0cG5mYWt4d2Vra2dnaXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTU2ODYsImV4cCI6MjA2NTQ5MTY4Nn0.P8U0fwNKpnXFH4_JaN0ep5eATj3RGzUEPGozPbxcS1M`
          },
          body: JSON.stringify({
            theme,
            difficulty,
            gridSize
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur de communication' }));
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.crossword) {
        throw new Error('Format de réponse invalide');
      }

      console.log(`✅ Mots croisés générés avec succès - ${data.crossword.words.length} mots`);
      setCrossword(data.crossword);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Erreur génération mots croisés:', errorMessage);
      setError(errorMessage);
      setCrossword(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    crossword,
    isLoading,
    error,
    generateCrossword
  };
};
