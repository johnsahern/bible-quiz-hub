
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
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion + 1} sur {totalQuestions}
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
  );
};

export default QuizHeader;
