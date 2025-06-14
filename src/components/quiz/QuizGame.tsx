import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getBadge, calculateQuestionPoints, calculateTimeBonus } from '@/utils/quizUtils';
import { DifficultyLevel } from '@/types/quiz';
import QuizStats from '@/components/quiz/QuizStats';
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
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch the questions from your API or data source based on the config
        const response = await fetch(`/api/quiz?theme=${config.theme}&difficulty=${config.difficulty}&questionCount=${config.questionCount}`);
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.error('Invalid quiz data format:', data);
          // Handle the error appropriately, maybe navigate back or show a message
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        // Handle the error appropriately
        navigate('/');
      }
    };

    fetchQuestions();
  }, [config, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeUp(true);
      handleAnswerSelect(-1); // Auto-submit as incorrect
      return;
    }

    if (questions.length === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, currentQuestion, questions.length]);

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
      // Calculate points with time bonus
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

    // Save to database if user is authenticated
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

        // Check for achievements
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

  if (questions.length === 0) {
    return <div>Chargement des questions...</div>;
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
