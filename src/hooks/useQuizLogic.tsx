
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getBadge } from '@/utils/quizUtils';
import { QuizConfig, QuizResult, QuizQuestion } from '@/types/quiz';
import { useQuizAchievements } from '@/components/quiz/QuizAchievements';
import { useQuizScoring } from '@/components/quiz/QuizScoring';
import { useAuth } from '@/contexts/AuthContext';

export const useQuizLogic = (config: QuizConfig, onComplete: (result: QuizResult) => void) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [timeUp, setTimeUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { checkAndAwardAchievements } = useQuizAchievements({ user });
  const { calculateScore } = useQuizScoring({ difficulty: config.difficulty });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Generating quiz questions with config:', config);

        const { data, error } = await supabase.functions.invoke('generate-quiz-questions', {
          body: {
            theme: config.theme,
            difficulty: config.difficulty,
            questionCount: config.questionCount
          }
        });

        if (error) {
          console.error('Error calling edge function:', error);
          throw new Error(error.message || 'Failed to generate quiz questions');
        }

        if (!data || !Array.isArray(data.questions)) {
          console.error('Invalid response format:', data);
          throw new Error('Invalid response format from quiz generator');
        }

        console.log('Questions generated successfully:', data.questions);
        setQuestions(data.questions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        setError(error instanceof Error ? error.message : 'Failed to load quiz questions');
        setIsLoading(false);
        
        setTimeout(() => {
          navigate('/quiz-solo');
        }, 3000);
      }
    };

    fetchQuestions();
  }, [config, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeUp(true);
      handleAnswerSelect(-1);
      return;
    }

    if (questions.length === 0 || isLoading) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, currentQuestion, questions.length, isLoading]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || timeUp) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      const questionScore = calculateScore(timeLeft);
      setScore(prev => prev + questionScore);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(45);
        setTimeUp(false);
      } else {
        finishQuiz();
      }
    }, 3000);
  };

  const finishQuiz = async () => {
    const finalScore = score;
    const badge = getBadge(correctAnswers, questions.length);
    const timeSpent = questions.length * 45 - timeLeft;

    const result: QuizResult = {
      score: finalScore,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent,
      badge: badge || '',
      difficulty: config.difficulty,
      theme: config.theme
    };

    if (user) {
      try {
        const { error } = await supabase
          .from('quiz_history')
          .insert({
            user_id: user.id,
            theme: config.theme,
            difficulty: config.difficulty,
            score: finalScore,
            correct_answers: correctAnswers,
            total_questions: questions.length,
            time_spent: timeSpent,
            badge: badge
          });

        if (error) {
          console.error('Error saving quiz result:', error);
        }

        await checkAndAwardAchievements(result);
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }

    onComplete(result);
  };

  return {
    questions,
    currentQuestion,
    selectedAnswer,
    correctAnswers,
    score,
    timeLeft,
    timeUp,
    isLoading,
    error,
    showResult,
    handleAnswerSelect
  };
};
