
import { Clock } from 'lucide-react';

interface QuizTimerProps {
  timeLeft: number;
}

const QuizTimer = ({ timeLeft }: QuizTimerProps) => {
  const getTimerColor = () => {
    if (timeLeft > 30) return 'text-green-600';
    if (timeLeft > 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`flex items-center space-x-1 font-mono text-lg font-bold ${getTimerColor()}`}>
      <Clock className="w-4 h-4" />
      <span>{timeLeft}s</span>
    </div>
  );
};

export default QuizTimer;
