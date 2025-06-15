
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WordSearchGame } from '@/types/gameTypes';

interface UseWordSearchOptions {
  theme: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
}

export const useWordSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateWordSearch = async ({ theme, difficulty }: UseWordSearchOptions): Promise<WordSearchGame | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('generate-word-search', {
        body: { theme, difficulty }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Erreur lors de la génération');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return data as WordSearchGame;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('Error generating word search:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateWordSearch,
    loading,
    error
  };
};
