
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Flame, CheckCircle, XCircle, Star } from 'lucide-react';
import { DailyChallenge } from '@/types/gameTypes';

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
  onComplete: (correct: boolean) => void;
}

const DailyChallengeCard = ({ challenge, onComplete }: DailyChallengeCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelect = (answer: boolean) => {
    if (selectedAnswer !== null || challenge.isCompleted) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === challenge.question.isTrue;
    onComplete(isCorrect);
  };

  if (challenge.isCompleted) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Défi du Jour</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-bold">{challenge.streakCount} jours</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Défi terminé !</h3>
          <p className="text-gray-600 mb-4">Revenez demain pour un nouveau défi</p>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm text-gray-500">Prochain défi dans</p>
            <p className="text-lg font-bold text-blue-600">{timeLeft}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isCorrect = selectedAnswer === challenge.question.isTrue;

  return (
    <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-yellow-600" />
            <span>Défi du Jour</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-bold">{challenge.streakCount} jours</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-center">
            {challenge.question.statement}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button
            size="lg"
            onClick={() => handleAnswerSelect(true)}
            disabled={selectedAnswer !== null}
            className={`h-14 text-lg font-semibold ${
              showResult
                ? selectedAnswer === true
                  ? isCorrect
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-red-500 hover:bg-red-500'
                  : challenge.question.isTrue
                    ? 'bg-green-200 border-2 border-green-500'
                    : 'bg-gray-100'
                : 'bg-green-100 hover:bg-green-200 text-green-700'
            }`}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            VRAI
          </Button>
          
          <Button
            size="lg"
            onClick={() => handleAnswerSelect(false)}
            disabled={selectedAnswer !== null}
            className={`h-14 text-lg font-semibold ${
              showResult
                ? selectedAnswer === false
                  ? isCorrect
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-red-500 hover:bg-red-500'
                  : !challenge.question.isTrue
                    ? 'bg-green-200 border-2 border-green-500'
                    : 'bg-gray-100'
                : 'bg-red-100 hover:bg-red-200 text-red-700'
            }`}
          >
            <XCircle className="w-5 h-5 mr-2" />
            FAUX
          </Button>
        </div>

        {showResult && challenge.question.explanation && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Explication :</strong> {challenge.question.explanation}
            </p>
            {challenge.question.verse && (
              <p className="text-xs text-blue-600 mt-2 font-medium">
                {challenge.question.verse}
              </p>
            )}
          </div>
        )}

        {showResult && (
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semib_OLD">+{isCorrect ? 50 : 10} points bonus</span>
            </div>
            <p className="text-sm text-gray-600">
              {isCorrect ? '🎉 Série maintenue !' : '💪 Continuez demain !'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyChallengeCard;
