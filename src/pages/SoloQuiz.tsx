
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
    console.log('Starting quiz with config:', config);
    setQuizConfig(config);
    setQuizState('playing');
  };

  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed with result:', result);
    setQuizState('results');
    setQuizResult(result);
  };

  const handlePlayAgain = () => {
    setQuizState('setup');
    setQuizConfig(null);
    setQuizResult(null);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {quizState === 'setup' && <QuizSetup onStartQuiz={handleStartQuiz} />}
        {quizState === 'playing' && quizConfig && (
          <QuizGame config={quizConfig} onComplete={handleQuizComplete} />
        )}
        {quizState === 'results' && quizResult && (
          <QuizResults 
            result={quizResult} 
            onPlayAgain={handlePlayAgain} 
            onBackToHome={handleBackToHome} 
          />
        )}
      </div>
    </div>
  );
};

export default SoloQuiz;
