
import { DifficultyLevel } from '@/types/quiz';

export const getBadge = (correct: number, total: number): string => {
  const percentage = correct / total * 100;
  if (percentage === 100) return 'Parfait Disciple';
  if (percentage >= 80) return 'Fidèle Serviteur';
  if (percentage >= 60) return 'Bon Étudiant';
  if (percentage >= 40) return 'Apprenti';
  return 'Débutant';
};

export const calculateQuestionPoints = (difficulty: DifficultyLevel): number => {
  switch (difficulty) {
    case 'facile':
      return 10;
    case 'moyen':
      return 20;
    case 'difficile':
      return 30;
    default:
      return 10;
  }
};

export const calculateTimeBonus = (timeLeft: number, basePoints: number): number => {
  // Bonus maximum de 50% des points de base
  // Plus de temps restant = plus de bonus
  const maxTimeSeconds = 45;
  const bonusPercentage = (timeLeft / maxTimeSeconds) * 0.5; // 0 à 50%
  return Math.round(basePoints * bonusPercentage);
};

export const calculateFinalScore = (
  correctAnswers: number,
  totalQuestions: number,
  difficulty: DifficultyLevel,
  totalTimeSpent: number
): number => {
  const basePoints = calculateQuestionPoints(difficulty);
  const maxPossibleScore = totalQuestions * basePoints * 1.5; // Avec bonus max
  
  // Calculer un score basé sur la performance
  const accuracy = correctAnswers / totalQuestions;
  const timeEfficiency = Math.max(0, 1 - (totalTimeSpent / (totalQuestions * 45 * 1.2))); // Efficacité temporelle
  
  // Score combiné basé sur la précision et l'efficacité
  const performanceScore = (accuracy * 0.8 + timeEfficiency * 0.2) * maxPossibleScore;
  
  return Math.round(performanceScore);
};

export const getDifficultyLabel = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'facile':
      return 'Facile';
    case 'moyen':
      return 'Moyen';
    case 'difficile':
      return 'Difficile';
    default:
      return 'Facile';
  }
};

export const getDifficultyColor = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'facile':
      return 'text-green-600 bg-green-100';
    case 'moyen':
      return 'text-orange-600 bg-orange-100';
    case 'difficile':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-green-600 bg-green-100';
  }
};
