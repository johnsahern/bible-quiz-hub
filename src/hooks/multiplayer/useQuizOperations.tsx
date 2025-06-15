
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

      // First, get the room data to use the correct theme, difficulty and question count
      const { data: roomData, error: roomError } = await supabase
        .from('quiz_rooms')
        .select('theme, difficulty, question_count')
        .eq('id', roomId)
        .single();

      if (roomError || !roomData) {
        console.error('❌ Failed to get room data:', roomError);
        throw new Error('Impossible de récupérer les données de la salle');
      }

      console.log('📋 Room data for quiz generation:', roomData);

      // Generate questions via edge function with proper parameters
      const { data: questionsData, error: questionsError } = await supabase.functions.invoke(
        'generate-quiz-questions',
        {
          body: { 
            theme: roomData.theme,
            difficulty: roomData.difficulty,
            questionCount: roomData.question_count
          }
        }
      );

      if (questionsError) {
        console.error('❌ Questions generation failed:', questionsError);
        throw questionsError;
      }

      if (!questionsData?.questions || questionsData.questions.length === 0) {
        console.error('❌ No questions generated');
        throw new Error('Aucune question générée');
      }

      console.log('✅ Questions generated:', questionsData.questions.length);

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
        description: err.message || "Impossible de démarrer le quiz",
        variant: "destructive",
      });
      return false;
    }
  }, [userId, user, roomId, isHost]);

  return { startQuiz };
};
