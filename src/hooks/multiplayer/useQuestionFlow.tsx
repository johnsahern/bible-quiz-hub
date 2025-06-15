
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuizRoom } from '@/types/multiplayer';

interface UseQuestionFlowProps {
  room: QuizRoom;
  isHost: boolean;
}

export const useQuestionFlow = ({ room, isHost }: UseQuestionFlowProps) => {
  
  useEffect(() => {
    if (!isHost || room.status !== 'playing') return;

    // Vérifier si tous les joueurs ont répondu ou si le temps est écoulé
    const checkQuestionProgress = async () => {
      try {
        // Compter les joueurs qui ont répondu à la question actuelle
        const { count: answeredCount } = await supabase
          .from('quiz_room_players')
          .select('*', { count: 'exact', head: true })
          .eq('room_id', room.id)
          .not('answer_time', 'is', null);

        const { count: totalPlayers } = await supabase
          .from('quiz_room_players')
          .select('*', { count: 'exact', head: true })
          .eq('room_id', room.id);

        console.log('Question progress:', { answeredCount, totalPlayers });

        // Si tous ont répondu, passer à la question suivante après 3 secondes
        if (answeredCount === totalPlayers) {
          setTimeout(async () => {
            await moveToNextQuestion();
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking question progress:', error);
      }
    };

    const moveToNextQuestion = async () => {
      if (!room.questions || room.current_question === null) return;

      const nextQuestionIndex = room.current_question + 1;
      
      if (nextQuestionIndex >= room.questions.length) {
        // Quiz terminé
        console.log('Quiz finished, updating status');
        await supabase
          .from('quiz_rooms')
          .update({
            status: 'finished',
            finished_at: new Date().toISOString()
          })
          .eq('id', room.id);
      } else {
        // Question suivante
        console.log('Moving to next question:', nextQuestionIndex);
        await supabase
          .from('quiz_rooms')
          .update({
            current_question: nextQuestionIndex
          })
          .eq('id', room.id);

        // Réinitialiser les réponses des joueurs pour la nouvelle question
        await supabase
          .from('quiz_room_players')
          .update({
            current_answer: null,
            answer_time: null
          })
          .eq('room_id', room.id);
      }
    };

    // Vérifier le progrès toutes les 2 secondes
    const interval = setInterval(checkQuestionProgress, 2000);

    // Timer de 35 secondes pour forcer le passage à la question suivante
    const forceTimeout = setTimeout(async () => {
      console.log('Force moving to next question - timeout');
      await moveToNextQuestion();
    }, 35000);

    return () => {
      clearInterval(interval);
      clearTimeout(forceTimeout);
    };
  }, [room.current_question, room.status, isHost]);
};
