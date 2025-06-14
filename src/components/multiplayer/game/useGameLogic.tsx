
import { useState, useEffect, useCallback } from 'react';
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
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Timer for the question
  useEffect(() => {
    setStartTime(Date.now());
    setTimeLeft(30);
    setSelectedAnswer(null);
    setHasAnswered(false);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasAnswered) {
            // Auto-submit without answer
            submitAnswer(-1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion.id]);

  const submitAnswer = useCallback(async (answerIndex: number) => {
    if (!user || hasAnswered) return;

    const responseTime = Date.now() - startTime;
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    let points = 0;
    if (isCorrect) {
      // Points based on speed (max 1000 points)
      points = Math.max(100, Math.floor(1000 - (responseTime / 30000) * 900));
    }

    try {
      // Save the answer
      await supabase
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

      // Update player score
      await supabase
        .from('quiz_room_players')
        .update({
          score: players.find(p => p.user_id === user.id)?.score + points || points,
          correct_answers: isCorrect 
            ? (players.find(p => p.user_id === user.id)?.correct_answers || 0) + 1
            : (players.find(p => p.user_id === user.id)?.correct_answers || 0),
          current_answer: answerIndex,
          answer_time: new Date().toISOString()
        })
        .eq('room_id', room.id)
        .eq('user_id', user.id);

      setHasAnswered(true);

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
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre réponse",
        variant: "destructive",
      });
    }
  }, [user, hasAnswered, startTime, currentQuestion, room.id, questionIndex, players]);

  const handleAnswerClick = (answerIndex: number) => {
    if (hasAnswered || timeLeft === 0) return;
    setSelectedAnswer(answerIndex);
    submitAnswer(answerIndex);
  };

  return {
    selectedAnswer,
    hasAnswered,
    timeLeft,
    handleAnswerClick
  };
};
