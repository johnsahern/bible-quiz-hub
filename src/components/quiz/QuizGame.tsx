
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DifficultyLevel, QuizConfig, QuizResult, QuizTheme } from '@/types/quiz';
import QuizStats from '@/components/quiz/QuizStats';
import QuizLoadingState from '@/components/quiz/QuizLoadingState';
import QuizHeader from '@/components/quiz/QuizHeader';
import QuestionDisplay from '@/components/quiz/QuestionDisplay';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { useNavigate } from 'react-router-dom';

interface QuizGameProps {
  config: QuizConfig;
  onComplete: (result: QuizResult) => void;
}

const QuizGame = ({ config, onComplete }: QuizGameProps) => {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestion,
    selectedAnswer,
    correctAnswers,
    score,
    timeLeft,
    isLoading,
    error,
    showResult,
    handleAnswerSelect
  } = useQuizLogic(config, onComplete);

  if (isLoading) {
    return <QuizLoadingState config={config} />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 mt-4 max-w-4xl">
        <Card className="bg-white shadow-lg rounded-xl border-0">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Erreur</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500 mb-4">Redirection vers la configuration...</p>
            <Button onClick={() => navigate('/quiz-solo')} variant="outline">
              Retour à la configuration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-4 max-w-4xl">
        <Card className="bg-white shadow-lg rounded-xl border-0">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">Aucune question disponible.</p>
            <Button onClick={() => navigate('/quiz-solo')} className="mt-4">
              Retour à la configuration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Stats responsive */}
        <div className="mb-6">
          <QuizStats score={score} correctAnswers={correctAnswers} difficulty={config.difficulty} />
        </div>

        {/* Question Card */}
        <Card className="bg-white shadow-xl rounded-2xl border-0 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            {/* Progress Header */}
            <QuizHeader 
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              timeLeft={timeLeft}
            />

            {/* Question Display */}
            <QuestionDisplay
              question={question}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswerSelect={handleAnswerSelect}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizGame;
