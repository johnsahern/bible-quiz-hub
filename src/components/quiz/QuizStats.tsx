
import { Badge } from '@/components/ui/badge';
import { DifficultyLevel } from '@/types/quiz';
import { getDifficultyLabel, getDifficultyColor, calculateQuestionPoints } from '@/utils/quizUtils';

interface QuizStatsProps {
  score: number;
  correctAnswers: number;
  difficulty: DifficultyLevel;
}

const QuizStats = ({ score, correctAnswers, difficulty }: QuizStatsProps) => {
  const basePoints = calculateQuestionPoints(difficulty);
  const difficultyLabel = getDifficultyLabel(difficulty);
  const difficultyColorClass = getDifficultyColor(difficulty);

  return (
    <div className="mt-4 text-center">
      <div className="inline-flex items-center space-x-4 bg-white rounded-lg px-6 py-3 shadow-sm border">
        <Badge className={`${difficultyColorClass} font-medium`}>
          {difficultyLabel} ({basePoints} pts/question)
        </Badge>
        <span className="text-sm text-gray-600">Score actuel:</span>
        <span className="font-bold text-blue-600 text-lg">{score} points</span>
        <span className="text-sm text-gray-600">|</span>
        <span className="text-sm text-green-600 font-medium">{correctAnswers} bonnes réponses</span>
      </div>
    </div>
  );
};

export default QuizStats;
