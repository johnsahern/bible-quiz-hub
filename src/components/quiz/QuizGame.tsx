
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { QuizConfig, QuizQuestion, QuizResult } from '@/types/quiz';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getBadge, calculateQuestionPoints, calculateTimeBonus } from '@/utils/quizUtils';
import QuizLoadingState from './QuizLoadingState';
import QuizErrorState from './QuizErrorState';
import QuizProgress from './QuizProgress';
import QuestionDisplay from './QuestionDisplay';
import QuizStats from './QuizStats';

interface QuizGameProps {
  config: QuizConfig;
  onComplete: (result: QuizResult) => void;
}

const QuizGame = ({ config, onComplete }: QuizGameProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime] = useState(Date.now());
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Generate questions when component mounts
  useEffect(() => {
    generateQuestions();
  }, [config]);

  const generateQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🚀 Generating questions with Gemini 1.5 Flash, config:', config);

      const { data, error } = await supabase.functions.invoke('generate-quiz-questions', {
        body: {
          theme: config.theme,
          difficulty: config.difficulty,
          questionCount: config.questionCount
        }
      });

      console.log('📡 Supabase response:', { data, error });

      if (error) {
        console.error('❌ Supabase function error:', error);

        // Messages d'erreur plus explicites pour Gemini 1.5
        if (error.message?.includes('insufficient_quota') || error.message?.includes('429')) {
          throw new Error('Quota Gemini 1.5 dépassé. Veuillez vérifier votre plan de facturation Gemini et réessayer plus tard.');
        } else if (error.message?.includes('401')) {
          throw new Error('Clé API Gemini 1.5 invalide. Veuillez vérifier votre configuration.');
        } else {
          throw new Error(`Erreur API: ${error.message}`);
        }
      }

      if (!data?.questions || !Array.isArray(data.questions)) {
        console.error('❌ Invalid response format:', data);
        throw new Error('Format de réponse invalide de l\'API');
      }

      if (data.questions.length === 0) {
        throw new Error('Aucune question générée');
      }

      console.log('✅ Received questions from Gemini 1.5:', data.questions);
      setQuestions(data.questions);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error generating questions:', error);
      setError(error.message || 'Erreur inconnue');
      setLoading(false);
      toast({
        title: "Erreur de génération",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !loading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !loading) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, loading]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    let questionPoints = 0;
    
    if (selectedAnswer !== null && selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
      
      // Calcul des points basé sur la difficulté
      const basePoints = calculateQuestionPoints(config.difficulty);
      
      // Bonus de temps (jusqu'à 50% en plus selon le temps restant)
      const timeBonus = calculateTimeBonus(timeLeft, basePoints);
      
      questionPoints = basePoints + timeBonus;
      setScore(prev => prev + questionPoints);
      
      console.log(`✅ Question correcte! Points: ${basePoints} + bonus temps: ${timeBonus} = ${questionPoints} total`);
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

  if (loading) {
    return <QuizLoadingState config={config} />;
  }

  if (error) {
    return <QuizErrorState error={error} onRetry={generateQuestions} />;
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-4 text-amber-500" />
            <p className="text-amber-600 mb-4">Aucune question disponible.</p>
            <Button onClick={generateQuestions} className="mt-4">
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <QuizProgress
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            timeLeft={timeLeft}
          />

          <QuestionDisplay
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onAnswerSelect={handleAnswerSelect}
          />

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

      <QuizStats 
        score={score} 
        correctAnswers={correctAnswers} 
        difficulty={config.difficulty}
      />
    </div>
  );
};

export default QuizGame;
