
import { useState } from 'react';
import { TrueFalseQuestion } from '@/types/gameTypes';
import { supabase } from '@/integrations/supabase/client';

interface UseTrueFalseQuestionsReturn {
  questions: TrueFalseQuestion[];
  isLoading: boolean;
  error: string | null;
  generateQuestions: (theme: string, difficulty: string, count: number) => Promise<void>;
}

export const useTrueFalseQuestions = (): UseTrueFalseQuestionsReturn => {
  const [questions, setQuestions] = useState<TrueFalseQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async (theme: string, difficulty: string, count: number) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 Génération de questions Vrai/Faux uniques...', { theme, difficulty, count });

      // Utiliser supabase.functions.invoke pour appeler Gemini
      const { data, error: functionError } = await supabase.functions.invoke('generate-true-false-questions', {
        body: {
          theme,
          difficulty,
          questionCount: count
        }
      });

      if (functionError) {
        console.error('❌ Erreur fonction Supabase:', functionError);
        throw new Error(functionError.message);
      }

      if (data.error) {
        console.error('❌ Erreur dans la réponse:', data.error);
        throw new Error(data.error);
      }

      if (!data.questions || !Array.isArray(data.questions)) {
        console.error('❌ Format de réponse invalide:', data);
        throw new Error('Format de réponse invalide de Gemini');
      }

      console.log('✅ Questions Vrai/Faux uniques générées:', data.questions.length);
      console.log('🎲 IDs des questions:', data.questions.map((q: any) => q.id));
      
      setQuestions(data.questions);

    } catch (err) {
      console.error('❌ Erreur génération questions Vrai/Faux:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue lors de la génération';
      setError(errorMessage);
      
      // Fallback avec questions par défaut uniquement si l'erreur n'est pas liée à Gemini
      if (!errorMessage.includes('Gemini') && !errorMessage.includes('API')) {
        const fallbackQuestions: TrueFalseQuestion[] = [
          {
            id: `fallback_${Date.now()}_1`,
            statement: 'Jésus est né à Bethléem selon les évangiles',
            isTrue: true,
            explanation: 'Jésus est effectivement né à Bethléem selon les évangiles de Matthieu et Luc.',
            verse: 'Matthieu 2:1',
            difficulty: difficulty as 'facile' | 'moyen' | 'difficile',
            theme
          },
          {
            id: `fallback_${Date.now()}_2`,
            statement: 'Moïse a guidé le peuple d\'Israël pendant 40 ans dans le désert',
            isTrue: true,
            explanation: 'Le peuple d\'Israël a erré 40 ans dans le désert sous la conduite de Moïse.',
            verse: 'Deutéronome 8:2',
            difficulty: difficulty as 'facile' | 'moyen' | 'difficile',
            theme
          }
        ];
        setQuestions(fallbackQuestions.slice(0, count));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    questions,
    isLoading,
    error,
    generateQuestions
  };
};
