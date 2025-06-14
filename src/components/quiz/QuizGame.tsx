import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getBadge, calculateQuestionPoints, calculateTimeBonus } from '@/utils/quizUtils';
import { DifficultyLevel } from '@/types/quiz';
import QuizStats from '@/components/quiz/QuizStats';
import QuizLoadingState from '@/components/quiz/QuizLoadingState';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface QuizConfig {
  theme: string;
  difficulty: DifficultyLevel;
  questionCount: number;
}

interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  badge: string | null;
  difficulty: DifficultyLevel;
  theme: string;
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
        setTimeLeft(45);
        setTimeUp(false);
      } else {
        finishQuiz();
      }
    }, 2000);
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
      badge,
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
      <div className="container mx-auto mt-8 max-w-2xl">
        <Card className="bg-white shadow-md rounded-lg">
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
      <div className="container mx-auto mt-8 max-w-2xl">
        <Card className="bg-white shadow-md rounded-lg">
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
    <div className="container mx-auto mt-8 max-w-2xl">
      <QuizStats score={score} correctAnswers={correctAnswers} difficulty={config.difficulty} />

      <Card className="mb-4 bg-white shadow-md rounded-lg">
        <CardContent className="p-6">
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              Question {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="h-2 rounded-full accent-blue-500" />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">{question.question}</h2>
            <p className="text-gray-500 text-sm">
              Temps restant: {formatTime(timeLeft)}
            </p>
          </div>

          <div className="grid gap-4">
            {question.answers.map((answer, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-lg ${selectedAnswer === index
                  ? index === question.correctAnswer
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null || timeUp}
              >
                {answer}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGame;
