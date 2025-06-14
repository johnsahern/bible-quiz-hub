
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuizConfig, QuizResult } from '@/types/quiz';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardContent className="p-4 sm:p-6 text-center">
              <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-3 sm:mb-4">Erreur</h2>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Redirection vers la configuration...</p>
              <Button 
                onClick={() => navigate('/quiz-solo')} 
                variant="outline"
                className="w-full sm:w-auto"
              >
                Retour à la configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardContent className="p-4 sm:p-6 text-center">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">Aucune question disponible.</p>
              <Button 
                onClick={() => navigate('/quiz-solo')} 
                className="w-full sm:w-auto"
              >
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Container avec padding mobile optimisé */}
      <div className="px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        <div className="container mx-auto max-w-4xl space-y-4 sm:space-y-6">
          
          {/* Stats - Mobile optimized */}
          <QuizStats 
            score={score} 
            correctAnswers={correctAnswers} 
            difficulty={config.difficulty} 
          />

          {/* Question Card - Mobile first design */}
          <Card className="bg-white shadow-xl rounded-2xl sm:rounded-3xl border-0 overflow-hidden">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              
              {/* Header avec progress */}
              <QuizHeader 
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                timeLeft={timeLeft}
              />

              {/* Question et réponses */}
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
    </div>
  );
};

export default QuizGame;
