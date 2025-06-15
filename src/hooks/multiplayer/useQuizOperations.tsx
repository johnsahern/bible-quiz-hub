
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useQuizOperations = (userId?: string, roomId?: string, isHost: boolean = false) => {
  const { user } = useAuth();

  const startQuiz = useCallback(async () => {
    if (!userId || !user || !roomId || !isHost) {
      console.log('❌ Cannot start quiz: missing requirements');
      return false;
    }

    try {
      console.log('🎮 Starting quiz for room:', roomId);

      // Generate questions via edge function
      const { data: questionsData, error: questionsError } = await supabase.functions.invoke(
        'generate-quiz-questions',
        {
          body: { 
            theme: 'general', // You might want to pass the actual theme
            difficulty: 'facile', // You might want to pass the actual difficulty
            count: 10
          }
        }
      );

      if (questionsError) {
        console.error('❌ Questions generation failed:', questionsError);
        throw questionsError;
      }

      // Update room with questions and start quiz
      const { error: updateError } = await supabase
        .from('quiz_rooms')
        .update({
          questions: questionsData.questions,
          status: 'playing',
          started_at: new Date().toISOString(),
          current_question: 0
        })
        .eq('id', roomId);

      if (updateError) {
        console.error('❌ Room update failed:', updateError);
        throw updateError;
      }

      console.log('✅ Quiz started successfully');
      toast({
        title: "Quiz démarré !",
        description: "La partie commence maintenant.",
      });

      return true;
    } catch (err: any) {
      console.error('💥 Error starting quiz:', err);
      toast({
        title: "Erreur",
        description: "Impossible de démarrer le quiz",
        variant: "destructive",
      });
      return false;
    }
  }, [userId, user, roomId, isHost]);

  return { startQuiz };
};
