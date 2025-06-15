
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { QuizQuestion } from '@/types/quiz';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';

interface UseGameLogicProps {
  room: QuizRoom;
  players: RoomPlayer[];
  currentQuestion: QuizQuestion;
  questionIndex: number;
}

export const useGameLogic = ({ room, players, currentQuestion, questionIndex }: UseGameLogicProps) => {
  const { user } = useAuth();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const questionStartedAt = useRef<number>(Date.now());
  const hasSubmittedAnswer = useRef<boolean>(false);

  // Réinitialiser l'état pour chaque nouvelle question
  useEffect(() => {
    console.log('New question started:', currentQuestion.id);
    questionStartedAt.current = Date.now();
    setSelectedAnswer(null);
    setHasAnswered(false);
    hasSubmittedAnswer.current = false;
    setTimeLeft(30);

    // Timer global synchronisé
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          // Auto-submit si pas encore répondu
          if (!hasSubmittedAnswer.current) {
            console.log('Time up - auto submitting');
            submitAnswer(-1);
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion.id, questionIndex]);

  const submitAnswer = useCallback(async (answerIndex: number) => {
    if (!user || hasSubmittedAnswer.current) {
      console.log('Submit blocked:', { user: !!user, hasSubmitted: hasSubmittedAnswer.current });
      return;
    }

    hasSubmittedAnswer.current = true;
    const responseTime = Date.now() - questionStartedAt.current;
    const isCorrect = answerIndex >= 0 && answerIndex === currentQuestion.correctAnswer;
    
    let points = 0;
    if (isCorrect) {
      // Points basés sur la vitesse (max 1000 points)
      points = Math.max(100, Math.floor(1000 - (responseTime / 30000) * 900));
    }

    console.log('Submitting answer:', { answerIndex, isCorrect, points, responseTime });

    try {
      // Sauvegarder la réponse
      const { error: answerError } = await supabase
        .from('quiz_room_answers')
        .insert({
          room_id: room.id,
          user_id: user.id,
          question_index: questionIndex,
          answer_index: answerIndex,
          response_time: responseTime,
          is_correct: isCorrect,
          points_earned: points
        });

      if (answerError) {
        console.error('Error saving answer:', answerError);
        throw answerError;
      }

      // Mettre à jour le score du joueur - récupérer le score actuel d'abord
      const currentPlayer = players.find(p => p.user_id === user.id);
      const newScore = (currentPlayer?.score || 0) + points;
      const newCorrectAnswers = isCorrect 
        ? (currentPlayer?.correct_answers || 0) + 1
        : (currentPlayer?.correct_answers || 0);

      const { error: updateError } = await supabase
        .from('quiz_room_players')
        .update({
          score: newScore,
          correct_answers: newCorrectAnswers,
          current_answer: answerIndex,
          answer_time: new Date().toISOString()
        })
        .eq('room_id', room.id)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating player:', updateError);
        throw updateError;
      }

      setHasAnswered(true);
      setSelectedAnswer(answerIndex);

      if (isCorrect) {
        toast({
          title: "Bonne réponse ! 🎉",
          description: `+${points} points`,
        });
      } else {
        toast({
          title: "Mauvaise réponse 😔",
          description: "Meilleure chance la prochaine fois !",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Erreur lors de la soumission de la réponse:', error);
      hasSubmittedAnswer.current = false; // Permettre une nouvelle tentative
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre réponse",
        variant: "destructive",
      });
    }
  }, [user, currentQuestion, room.id, questionIndex, players]);

  const handleAnswerClick = (answerIndex: number) => {
    if (hasAnswered || timeLeft === 0 || hasSubmittedAnswer.current) return;
    console.log('Answer clicked:', answerIndex);
    submitAnswer(answerIndex);
  };

  return {
    selectedAnswer,
    hasAnswered,
    timeLeft,
    handleAnswerClick
  };
};
