
import { useState, useEffect } from 'react';
import { TrueFalseQuestion } from '@/types/gameTypes';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface GameSettings {
  theme: string;
  difficulty: string;
  questionCount: number;
}

export const useTrueFalseGameLogic = (
  questions: TrueFalseQuestion[],
  onGameComplete: (score: number, timeSpent: number) => void
) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);

  const calculatePoints = (isCorrect: boolean, difficulty: string, responseTime: number): number => {
    if (!isCorrect) return 0;

    const basePoints = {
      'facile': 10,
      'moyen': 20,
      'difficile': 30
    }[difficulty] || 10;

    const maxTime = 30;
    const timeBonus = Math.round(10 + ((maxTime - responseTime) / maxTime) * 20);
    const clampedTimeBonus = Math.max(10, Math.min(30, timeBonus));

    return basePoints + clampedTimeBonus;
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setShowResult(true);
      setTimeout(nextQuestion, 2000);
    }
  };

  const handleAnswerSelect = (answer: boolean) => {
    if (selectedAnswer !== null) return;
    
    const responseTime = Math.round((Date.now() - questionStartTime) / 1000);
    const isCorrect = answer === questions[currentQuestion].isTrue;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      const points = calculatePoints(isCorrect, gameSettings?.difficulty || 'moyen', responseTime);
      setScore(prev => prev + points);
    }
    
    setTimeout(nextQuestion, 3000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setQuestionStartTime(Date.now());
    } else {
      completeGame();
    }
  };

  const completeGame = async () => {
    const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
    
    if (user && gameSettings) {
      try {
        const { error } = await supabase
          .from('true_false_history')
          .insert({
            user_id: user.id,
            theme: gameSettings.theme,
            difficulty: gameSettings.difficulty,
            total_questions: questions.length,
            correct_answers: correctAnswers,
            total_points: score,
            time_spent: timeSpent
          });

        if (error) {
          console.error('Erreur sauvegarde historique Vrai/Faux:', error);
        } else {
          console.log('✅ Historique Vrai/Faux sauvegardé avec succès');
        }
      } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
      }
    }

    onGameComplete(score, timeSpent);
  };

  const startGame = (theme: string, difficulty: string, questionCount: number) => {
    setGameSettings({ theme, difficulty, questionCount });
    setGameStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setTimeLeft(30);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameSettings(null);
  };

  return {
    currentQuestion,
    score,
    correctAnswers,
    selectedAnswer,
    showResult,
    timeLeft,
    questionStartTime,
    gameSettings,
    setTimeLeft,
    handleAnswerSelect,
    handleTimeUp,
    startGame,
    resetGame,
    calculatePoints
  };
};
