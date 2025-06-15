
import { useState } from 'react';
import { VersePuzzle } from '@/types/gameTypes';

export const useVersePuzzles = () => {
  const [puzzles, setPuzzles] = useState<VersePuzzle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePuzzles = async (theme: string, difficulty: string, puzzleCount: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`🧩 Génération de ${puzzleCount} puzzles pour ${theme} (${difficulty})`);
      
      const response = await fetch(
        'https://evaftpnfakxwekkggipn.supabase.co/functions/v1/generate-verse-puzzles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2YWZ0cG5mYWt4d2Vra2dnaXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTU2ODYsImV4cCI6MjA2NTQ5MTY4Nn0.P8U0fwNKpnXFH4_JaN0ep5eATj3RGzUEPGozPbxcS1M'}`
          },
          body: JSON.stringify({
            theme,
            difficulty,
            puzzleCount
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur de communication' }));
        throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.puzzles || !Array.isArray(data.puzzles)) {
        throw new Error('Format de réponse invalide');
      }

      console.log(`✅ ${data.puzzles.length} puzzles générés avec succès`);
      setPuzzles(data.puzzles);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Erreur génération puzzles:', errorMessage);
      setError(errorMessage);
      setPuzzles([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    puzzles,
    isLoading,
    error,
    generatePuzzles
  };
};
