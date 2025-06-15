
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useQuizOperations = (user: any, room: any, isHost: boolean) => {
  const userId = user?.id || null;
  const roomId = room?.id || null;

  const startQuiz = useCallback(async () => {
    if (!userId || !roomId || !isHost) return;

    try {
      // Générer les questions
      const response = await fetch(`https://evaftpnfakxwekkggipn.supabase.co/functions/v1/generate-quiz-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2YWZ0cG5mYWt4d2Vra2dnaXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTU2ODYsImV4cCI6MjA2NTQ5MTY4Nn0.P8U0fwNKpnXFH4_JaN0ep5eATj3RGzUEPGozPbxcS1M`,
        },
        body: JSON.stringify({
          theme: room.theme,
          difficulty: room.difficulty,
          questionCount: room.question_count
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la génération des questions');

      const questions = await response.json();

      // Mettre à jour la salle
      const { error } = await supabase
        .from('quiz_rooms')
        .update({
          status: 'playing',
          questions: questions,
          current_question: 0,
          started_at: new Date().toISOString()
        })
        .eq('id', roomId);

      if (error) throw error;

      toast({
        title: "Quiz démarré !",
        description: "Le quiz multijoueur a commencé",
      });
    } catch (err) {
      console.error('Erreur lors du démarrage du quiz:', err);
      toast({
        title: "Erreur",
        description: "Impossible de démarrer le quiz",
        variant: "destructive",
      });
    }
  }, [userId, roomId, isHost, user, room]);

  return { startQuiz };
};
