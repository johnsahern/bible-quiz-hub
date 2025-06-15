
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTrueFalseQuestions } from '@/hooks/useTrueFalseQuestions';
import { useTrueFalseGameLogic } from '@/hooks/useTrueFalseGameLogic';
import TrueFalseGameSetup from './TrueFalseGameSetup';
import TrueFalseGameHeader from './TrueFalseGameHeader';
import TrueFalseQuestionCard from './TrueFalseQuestionCard';

interface TrueFalseGameProps {
  onGameComplete: (score: number, timeSpent: number) => void;
}

const TrueFalseGame = ({ onGameComplete }: TrueFalseGameProps) => {
  const { questions, isLoading, error, generateQuestions } = useTrueFalseQuestions();
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'completed'>('setup');
  
  const gameLogic = useTrueFalseGameLogic(questions, onGameComplete);
  const {
    currentQuestion,
    score,
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
  } = gameLogic;

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, gameState, handleTimeUp, setTimeLeft]);

  const handleStartGame = async (theme: string, difficulty: string, questionCount: number) => {
    await generateQuestions(theme, difficulty, questionCount);
    startGame(theme, difficulty, questionCount);
    setGameState('playing');
  };

  const handleBackToSetup = () => {
    setGameState('setup');
    resetGame();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold text-red-600 mb-4">Erreur</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={handleBackToSetup} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'setup') {
    return <TrueFalseGameSetup onStartGame={handleStartGame} isLoading={isLoading} />;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-4">Aucune question disponible.</p>
              <Button onClick={handleBackToSetup}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <TrueFalseGameHeader
          score={score}
          timeLeft={timeLeft}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          onBackClick={handleBackToSetup}
        />

        <TrueFalseQuestionCard
          question={question}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswerSelect={handleAnswerSelect}
          questionStartTime={questionStartTime}
          gameSettings={gameSettings}
          calculatePoints={calculatePoints}
        />
      </div>
    </div>
  );
};

export default TrueFalseGame;
