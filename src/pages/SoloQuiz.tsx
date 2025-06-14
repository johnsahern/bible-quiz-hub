
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizSetup from '@/components/quiz/QuizSetup';
import QuizGame from '@/components/quiz/QuizGame';
import QuizResults from '@/components/quiz/QuizResults';
import { QuizConfig, QuizResult } from '@/types/quiz';

type QuizState = 'setup' | 'playing' | 'results';

const SoloQuiz = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setQuizState('playing');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizState('results');
    setQuizResult(result);
  };

  const handlePlayAgain = () => {
    setQuizState('setup');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div>
      {quizState === 'setup' && <QuizSetup onStartQuiz={handleStartQuiz} />}
      {quizState === 'playing' && quizConfig && <QuizGame config={quizConfig} onComplete={handleQuizComplete} />}
      {quizState === 'results' && <QuizResults result={quizResult} onPlayAgain={handlePlayAgain} onBackToHome={handleBackToHome} />}
    </div>
  );
};

export default SoloQuiz;
