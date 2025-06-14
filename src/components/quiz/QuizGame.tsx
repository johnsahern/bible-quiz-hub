
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { QuizConfig, QuizQuestion, QuizResult } from '@/pages/SoloQuiz';

interface QuizGameProps {
  config: QuizConfig;
  onComplete: (result: QuizResult) => void;
}

// Questions d'exemple (en attendant l'intégration IA)
const sampleQuestions: Record<string, QuizQuestion[]> = {
  'vie-jesus': [
    {
      id: '1',
      question: 'Dans quelle ville Jésus est-il né ?',
      options: ['Nazareth', 'Bethléem', 'Jérusalem', 'Capharnaüm'],
      correctAnswer: 1,
      verse: 'Matthieu 2:1 - Jésus étant né à Bethléem en Judée...'
    },
    {
      id: '2',
      question: 'Combien de disciples Jésus a-t-il appelés ?',
      options: ['10', '11', '12', '13'],
      correctAnswer: 2,
      verse: 'Marc 3:14 - Il en établit douze pour les avoir avec lui...'
    },
    {
      id: '3',
      question: 'Quel miracle Jésus a-t-il accompli lors des noces de Cana ?',
      options: ['Guérison d\'un aveugle', 'Transformation de l\'eau en vin', 'Multiplication des pains', 'Résurrection d\'un mort'],
      correctAnswer: 1,
      verse: 'Jean 2:11 - Tel fut, à Cana en Galilée, le premier des miracles que fit Jésus.'
    }
  ]
};

const QuizGame = ({ config, onComplete }: QuizGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime] = useState(Date.now());
  const [questions] = useState(sampleQuestions['vie-jesus'] || []);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null && selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + (timeLeft > 0 ? timeLeft * 10 : 0));
    }

    setShowResult(true);

    setTimeout(() => {
      if (isLastQuestion) {
        // Quiz terminé
        const totalTime = Math.round((Date.now() - startTime) / 1000);
        const finalResult: QuizResult = {
          score,
          totalQuestions: questions.length,
          timeSpent: totalTime,
          correctAnswers,
          badge: getBadge(correctAnswers, questions.length)
        };
        onComplete(finalResult);
      } else {
        // Question suivante
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(45);
      }
    }, 2000);
  };

  const getBadge = (correct: number, total: number): string => {
    const percentage = (correct / total) * 100;
    if (percentage === 100) return 'Parfait Disciple';
    if (percentage >= 80) return 'Fidèle Serviteur';
    if (percentage >= 60) return 'Bon Étudiant';
    if (percentage >= 40) return 'Apprenti';
    return 'Débutant';
  };

  const getTimerColor = () => {
    if (timeLeft > 30) return 'text-green-600';
    if (timeLeft > 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!currentQuestion) {
    return <div>Chargement des questions...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          {/* Progress et Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} sur {questions.length}
              </span>
              <div className={`flex items-center space-x-1 font-mono text-lg font-bold ${getTimerColor()}`}>
                <Clock className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            </div>
            <Progress 
              value={(currentQuestionIndex / questions.length) * 100} 
              className="h-2"
            />
          </div>

          {/* Question */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 transition-all duration-200";
              
              if (showResult) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += " border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer) {
                  buttonClass += " border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += " border-gray-200 bg-gray-50 text-gray-500";
                }
              } else if (selectedAnswer === index) {
                buttonClass += " border-blue-500 bg-blue-50 text-blue-800";
              } else {
                buttonClass += " border-gray-200 hover:border-blue-300 hover:bg-blue-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Verset (affiché après réponse) */}
          {showResult && currentQuestion.verse && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-800 italic text-sm">{currentQuestion.verse}</p>
            </div>
          )}

          {/* Button de validation */}
          {!showResult && (
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full"
              size="lg"
            >
              {isLastQuestion ? 'Terminer le Quiz' : 'Question suivante'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Score actuel */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-4 bg-white rounded-lg px-4 py-2 shadow">
          <span className="text-sm text-gray-600">Score actuel:</span>
          <span className="font-bold text-blue-600">{score} points</span>
          <span className="text-sm text-gray-600">|</span>
          <span className="text-sm text-green-600">{correctAnswers} bonnes réponses</span>
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
