
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Clock } from 'lucide-react';

interface TrueFalseGameHeaderProps {
  score: number;
  timeLeft: number;
  currentQuestion: number;
  totalQuestions: number;
  onBackClick: () => void;
}

const TrueFalseGameHeader = ({ 
  score, 
  timeLeft, 
  currentQuestion, 
  totalQuestions, 
  onBackClick 
}: TrueFalseGameHeaderProps) => {
  return (
    <>
      {/* Header avec bouton retour */}
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          onClick={onBackClick}
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
          <span>Question {currentQuestion + 1} sur {totalQuestions}</span>
          <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default TrueFalseGameHeader;
