
import { Progress } from '@/components/ui/progress';
import QuizTimer from './QuizTimer';

interface QuizProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
}

const QuizProgress = ({ currentQuestionIndex, totalQuestions, timeLeft }: QuizProgressProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} sur {totalQuestions}
        </span>
        <QuizTimer timeLeft={timeLeft} />
      </div>
      <Progress value={currentQuestionIndex / totalQuestions * 100} className="h-2" />
    </div>
  );
};

export default QuizProgress;
