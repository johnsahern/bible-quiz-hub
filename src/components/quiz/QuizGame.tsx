import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getBadge, calculateQuestionPoints, calculateTimeBonus } from '@/utils/quizUtils';
import { DifficultyLevel, QuizConfig, QuizResult, QuizTheme } from '@/types/quiz';
import QuizStats from '@/components/quiz/QuizStats';
import QuizLoadingState from '@/components/quiz/QuizLoadingState';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string;
}

interface QuizGameProps {
  config: QuizConfig;
  onComplete: (result: QuizResult) => void;
}

const QuizGame = ({ config, onComplete }: QuizGameProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
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
        
        // Navigate back to setup after a delay
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || timeUp) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      const basePoints = calculateQuestionPoints(config.difficulty);
      const bonus = calculateTimeBonus(timeLeft, basePoints);
      const questionScore = basePoints + bonus;
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

  const checkAndAwardAchievements = async (result: QuizResult) => {
    if (!user) return;

    const achievements = [];

    // Perfect score achievement
    if (result.correctAnswers === result.totalQuestions) {
      achievements.push({
        user_id: user.id,
        achievement_type: 'perfect_score',
        achievement_name: 'Score Parfait',
        description: 'Répondre correctement à toutes les questions d\'un quiz'
      });
    }

    // High score achievements
    if (result.score >= 100) {
      achievements.push({
        user_id: user.id,
        achievement_type: 'high_score',
        achievement_name: 'Centurion',
        description: 'Obtenir 100 points ou plus dans un quiz'
      });
    }

    // Difficulty-based achievements
    if (result.difficulty === 'difficile' && result.correctAnswers >= result.totalQuestions * 0.8) {
      achievements.push({
        user_id: user.id,
        achievement_type: 'difficulty_master',
        achievement_name: 'Maître de la Difficulté',
        description: 'Réussir 80% ou plus d\'un quiz difficile'
      });
    }

    // Save achievements
    for (const achievement of achievements) {
      try {
        await supabase
          .from('user_achievements')
          .insert(achievement);
      } catch (error) {
        // Achievement might already exist, ignore duplicate errors
        console.log('Achievement already exists or error:', error);
      }
    }
  };

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
  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestion + 1} sur {questions.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Progress 
                value={progress} 
                className="h-3 rounded-full bg-gray-100"
              />
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-4">
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium";
                
                if (showResult) {
                  if (index === question.correctAnswer) {
                    buttonClass += " border-green-500 bg-green-50 text-green-800 shadow-md";
                  } else if (index === selectedAnswer) {
                    buttonClass += " border-red-500 bg-red-50 text-red-800 shadow-md";
                  } else {
                    buttonClass += " border-gray-200 bg-gray-50 text-gray-500";
                  }
                } else if (selectedAnswer === index) {
                  buttonClass += " border-blue-500 bg-blue-50 text-blue-800 shadow-md";
                } else {
                  buttonClass += " border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showResult || timeUp}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm md:text-base">{option}</span>
                      {showResult && index === question.correctAnswer && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Verset (affiché après la réponse) */}
            {showResult && question.verse && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.5 3A1.5 1.5 0 001 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0015 5.293V4.5A1.5 1.5 0 0013.5 3h-11z" />
                      <path fillRule="evenodd" d="M15 6.954L8.978 9.86a2.25 2.25 0 01-1.956 0L1 6.954V11.5A1.5 1.5 0 002.5 13h11a1.5 1.5 0 001.5-1.5V6.954z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">Référence biblique</h4>
                    <p className="text-blue-700 text-sm italic leading-relaxed">{question.verse}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizGame;
