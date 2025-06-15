
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

// Nouveau système de calcul des points
const calculatePoints = (difficulty: string, isCorrect: boolean, responseTime: number): number => {
  if (!isCorrect) return 0;

  // Points de base selon la difficulté
  let basePoints = 0;
  switch (difficulty.toLowerCase()) {
    case 'facile':
      basePoints = 20;
      break;
    case 'moyen':
      basePoints = 40;
      break;
    case 'difficile':
      basePoints = 60;
      break;
    default:
      basePoints = 20;
  }

  // Bonus de rapidité (20 à 50 points selon le temps de réponse)
  const maxResponseTime = 30000; // 30 secondes max
  const speedRatio = Math.max(0, (maxResponseTime - responseTime) / maxResponseTime);
  const speedBonus = Math.floor(20 + (speedRatio * 30)); // 20 à 50 points

  return basePoints + speedBonus;
};

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

    // Timer optimisé avec moins d'appels
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
    
    // Nouveau calcul des points avec le barème demandé
    const points = calculatePoints(room.difficulty, isCorrect, responseTime);

    console.log('Submitting answer:', { 
      answerIndex, 
      isCorrect, 
      points, 
      responseTime,
      difficulty: room.difficulty 
    });

    try {
      // Optimisation: utiliser une transaction pour les deux opérations
      const { error } = await supabase.rpc('submit_multiplayer_answer', {
        p_room_id: room.id,
        p_user_id: user.id,
        p_question_index: questionIndex,
        p_answer_index: answerIndex,
        p_response_time: responseTime,
        p_is_correct: isCorrect,
        p_points_earned: points
      });

      if (error) {
        console.error('Error submitting answer:', error);
        // Fallback vers l'ancienne méthode si la fonction RPC n'existe pas
        await submitAnswerFallback(answerIndex, responseTime, isCorrect, points);
      }

      setHasAnswered(true);
      setSelectedAnswer(answerIndex);

      if (isCorrect) {
        toast({
          title: "Bonne réponse ! 🎉",
          description: `+${points} points (${calculatePoints(room.difficulty, true, 0)} base + ${points - calculatePoints(room.difficulty, true, responseTime)} rapidité)`,
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
      hasSubmittedAnswer.current = false;
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre réponse",
        variant: "destructive",
      });
    }
  }, [user, currentQuestion, room.id, room.difficulty, questionIndex, players]);

  // Fallback vers l'ancienne méthode si la fonction RPC n'existe pas
  const submitAnswerFallback = async (answerIndex: number, responseTime: number, isCorrect: boolean, points: number) => {
    // Sauvegarder la réponse
    const { error: answerError } = await supabase
      .from('quiz_room_answers')
      .insert({
        room_id: room.id,
        user_id: user!.id,
        question_index: questionIndex,
        answer_index: answerIndex,
        response_time: responseTime,
        is_correct: isCorrect,
        points_earned: points
      });

    if (answerError) throw answerError;

    // Mettre à jour le score du joueur
    const currentPlayer = players.find(p => p.user_id === user!.id);
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
      .eq('user_id', user!.id);

    if (updateError) throw updateError;
  };

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
