import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle, Loader2, AlertCircle, CreditCard } from 'lucide-react';
import { QuizConfig, QuizQuestion, QuizResult } from '@/types/quiz';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
interface QuizGameProps {
  config: QuizConfig;
  onComplete: (result: QuizResult) => void;
}
const QuizGame = ({
  config,
  onComplete
}: QuizGameProps) => {
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
  const {
    toast
  } = useToast();
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
      const {
        data,
        error
      } = await supabase.functions.invoke('generate-quiz-questions', {
        body: {
          theme: config.theme,
          difficulty: config.difficulty,
          questionCount: config.questionCount
        }
      });
      console.log('📡 Supabase response:', {
        data,
        error
      });
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
    const percentage = correct / total * 100;
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
  if (loading) {
    return <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">✨ Génération du Quiz</h2>
            <p className="text-gray-600 mb-2">
              Préparation de {config.questionCount} questions uniques sur <strong>{config.theme}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Niveau: <span className="font-medium">{config.difficulty}</span>
            </p>
            <div className="mt-4 text-sm text-gray-500">
              ⏳ Création de questions originales avec l'IA avancée...
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  if (error) {
    const isQuotaError = error.includes('Quota') || error.includes('quota') || error.includes('429');
    return <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            {isQuotaError ? <CreditCard className="w-12 h-12 mx-auto mb-4 text-orange-500" /> : <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />}
            
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {isQuotaError ? 'Quota Gemini 1.5 dépassé' : 'Erreur de génération'}
            </h2>
            
            <p className="text-red-600 mb-4">{error}</p>
            
            {isQuotaError && <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-orange-800">
                  <strong>Solution :</strong> Vérifiez votre plan de facturation Gemini 1.5 ou attendez la réinitialisation de votre quota.
                </p>
              </div>}
            
            <div className="space-y-2">
              <Button onClick={generateQuestions} className="w-full" variant={isQuotaError ? "outline" : "default"}>
                <Loader2 className="w-4 h-4 mr-2" />
                Réessayer
              </Button>
              <p className="text-xs text-gray-500">
                {isQuotaError ? "Peut nécessiter d'attendre quelques minutes" : "Vérifiez votre connexion internet"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  if (!currentQuestion) {
    return <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-4 text-amber-500" />
            <p className="text-amber-600 mb-4">Aucune question disponible.</p>
            <Button onClick={generateQuestions} className="mt-4">
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="max-w-2xl mx-auto">
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
            <Progress value={currentQuestionIndex / questions.length * 100} className="h-2" />
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
            return <button key={index} onClick={() => handleAnswerSelect(index)} className={buttonClass} disabled={showResult}>
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>;
          })}
          </div>

          {/* Verset (affiché après réponse) */}
          {showResult && currentQuestion.verse && <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-800 italic text-sm">{currentQuestion.verse}</p>
            </div>}

          {/* Button de validation */}
          {!showResult && <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="w-full" size="lg">
              {isLastQuestion ? 'Terminer le Quiz' : 'Question suivante'}
            </Button>}
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
    </div>;
};
export default QuizGame;