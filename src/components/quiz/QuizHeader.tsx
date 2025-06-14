
import { Progress } from '@/components/ui/progress';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

const QuizHeader = ({ currentQuestion, totalQuestions, timeLeft }: QuizHeaderProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6 sm:mb-8">
      {/* Header info - Mobile optimized */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            Question <span className="font-bold text-blue-600">{currentQuestion + 1}</span>
          </span>
          <span className="text-xs sm:text-sm text-gray-400">/</span>
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            {totalQuestions}
          </span>
        </div>
        
        {/* Timer avec design mobile */}
        <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${
          timeLeft <= 10 
            ? 'bg-red-100 text-red-700 animate-pulse' 
            : timeLeft <= 20 
            ? 'bg-yellow-100 text-yellow-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {formatTime(timeLeft)}
        </div>
      </div>
      
      {/* Progress bar avec hauteur mobile */}
      <Progress 
        value={progress} 
        className="h-2 sm:h-3 rounded-full bg-gray-100"
      />
      
      {/* Progress percentage - Mobile friendly */}
      <div className="mt-2 text-center">
        <span className="text-xs text-gray-500">
          {Math.round(progress)}% complété
        </span>
      </div>
    </div>
  );
};

export default QuizHeader;
