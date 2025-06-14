
import { calculateQuestionPoints, calculateTimeBonus } from '@/utils/quizUtils';
import { DifficultyLevel } from '@/types/quiz';

interface QuizScoringProps {
  difficulty: DifficultyLevel;
}

export const useQuizScoring = ({ difficulty }: QuizScoringProps) => {
  const calculateScore = (timeLeft: number) => {
    const basePoints = calculateQuestionPoints(difficulty);
    const bonus = calculateTimeBonus(timeLeft, basePoints);
    return basePoints + bonus;
  };

  return { calculateScore };
};
