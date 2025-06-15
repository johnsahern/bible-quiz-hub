
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Star, ArrowLeft } from 'lucide-react';
import { TrueFalseQuestion } from '@/types/gameTypes';
import { useTrueFalseQuestions } from '@/hooks/useTrueFalseQuestions';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import TrueFalseGameSetup from './TrueFalseGameSetup';

interface TrueFalseGameProps {
  questions?: TrueFalseQuestion[];
  onGameComplete: (score: number, timeSpent: number) => void;
}

const TrueFalseGame = ({ onGameComplete }: TrueFalseGameProps) => {
  const { questions, isLoading, error, generateQuestions } = useTrueFalseQuestions();
  const { user } = useAuth();
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'completed'>('setup');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [gameSettings, setGameSettings] = useState<{
    theme: string;
    difficulty: string;
    questionCount: number;
  } | null>(null);

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
  }, [currentQuestion, gameState]);

  const handleStartGame = async (theme: string, difficulty: string, questionCount: number) => {
    await generateQuestions(theme, difficulty, questionCount);
    setGameSettings({ theme, difficulty, questionCount });
    setGameState('playing');
    setGameStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setTimeLeft(30);
  };

  const calculatePoints = (isCorrect: boolean, difficulty: string, responseTime: number): number => {
    if (!isCorrect) return 0;

    // Points de base selon la difficulté
    const basePoints = {
      'facile': 10,
      'moyen': 20,
      'difficile': 30
    }[difficulty] || 10;

    // Points bonus selon le temps de réaction (30 seconds max, 10-30 points bonus)
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
    
    // Sauvegarder l'historique du jeu
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

    setGameState('completed');
    onGameComplete(score, timeSpent);
  };

  const handleBackToSetup = () => {
    setGameState('setup');
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameSettings(null);
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
  const isCorrect = selectedAnswer === question.isTrue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header avec bouton retour */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToSetup}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Button>
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
                {showResult && selectedAnswer === question.isTrue && (
                  <div className="mt-2 p-2 bg-green-100 rounded border border-green-300">
                    <p className="text-sm text-green-700 font-medium">
                      +{calculatePoints(true, gameSettings?.difficulty || 'moyen', Math.round((Date.now() - questionStartTime) / 1000))} points !
                    </p>
                  </div>
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
