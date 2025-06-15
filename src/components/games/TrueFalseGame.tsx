
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Star } from 'lucide-react';
import { TrueFalseQuestion } from '@/types/gameTypes';

interface TrueFalseGameProps {
  questions: TrueFalseQuestion[];
  onGameComplete: (score: number, timeSpent: number) => void;
}

const TrueFalseGame = ({ questions, onGameComplete }: TrueFalseGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStartTime] = useState(Date.now());

  useEffect(() => {
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
  }, [currentQuestion]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setShowResult(true);
      setTimeout(nextQuestion, 2000);
    }
  };

  const handleAnswerSelect = (answer: boolean) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentQuestion].isTrue;
    if (isCorrect) {
      setScore(prev => prev + (timeLeft > 15 ? 100 : timeLeft > 5 ? 75 : 50));
    }
    
    setTimeout(nextQuestion, 3000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
      onGameComplete(score, timeSpent);
    }
  };

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.isTrue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-lg font-semibold">Vrai ou Faux</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{score}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="font-bold">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} sur {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              {question.statement}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                size="lg"
                onClick={() => handleAnswerSelect(true)}
                disabled={selectedAnswer !== null}
                className={`h-16 text-lg font-semibold ${
                  showResult
                    ? selectedAnswer === true
                      ? isCorrect
                        ? 'bg-green-500 hover:bg-green-500'
                        : 'bg-red-500 hover:bg-red-500'
                      : question.isTrue
                        ? 'bg-green-200 border-2 border-green-500'
                        : 'bg-gray-100'
                    : 'bg-green-100 hover:bg-green-200 text-green-700'
                }`}
              >
                <CheckCircle className="w-6 h-6 mr-2" />
                VRAI
              </Button>
              
              <Button
                size="lg"
                onClick={() => handleAnswerSelect(false)}
                disabled={selectedAnswer !== null}
                className={`h-16 text-lg font-semibold ${
                  showResult
                    ? selectedAnswer === false
                      ? isCorrect
                        ? 'bg-green-500 hover:bg-green-500'
                        : 'bg-red-500 hover:bg-red-500'
                      : !question.isTrue
                        ? 'bg-green-200 border-2 border-green-500'
                        : 'bg-gray-100'
                    : 'bg-red-100 hover:bg-red-200 text-red-700'
                }`}
              >
                <XCircle className="w-6 h-6 mr-2" />
                FAUX
              </Button>
            </div>

            {showResult && question.explanation && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Explication :</strong> {question.explanation}
                </p>
                {question.verse && (
                  <p className="text-xs text-blue-600 mt-2 font-medium">
                    {question.verse}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrueFalseGame;
