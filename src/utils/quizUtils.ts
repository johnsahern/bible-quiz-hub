
import { DifficultyLevel } from '@/types/quiz';

export const getBadge = (correct: number, total: number): string => {
  const percentage = correct / total * 100;
  
  if (percentage === 100) return 'Maître Parfait';
  if (percentage >= 98) return 'Quasi Parfait';
  if (percentage >= 95) return 'Excellent Disciple';
  if (percentage >= 92) return 'Très Fidèle Serviteur';
  if (percentage >= 90) return 'Fidèle Serviteur';
  if (percentage >= 87) return 'Serviteur Dévoué';
  if (percentage >= 85) return 'Bon Serviteur';
  if (percentage >= 82) return 'Étudiant Avancé';
  if (percentage >= 80) return 'Bon Étudiant';
  if (percentage >= 77) return 'Étudiant Assidu';
  if (percentage >= 75) return 'Étudiant Régulier';
  if (percentage >= 72) return 'Étudiant Motivé';
  if (percentage >= 70) return 'Étudiant Sérieux';
  if (percentage >= 67) return 'Bon Apprenti';
  if (percentage >= 65) return 'Apprenti Avancé';
  if (percentage >= 62) return 'Apprenti Régulier';
  if (percentage >= 60) return 'Apprenti';
  if (percentage >= 57) return 'Apprenti Débutant';
  if (percentage >= 55) return 'Chercheur Persévérant';
  if (percentage >= 52) return 'Chercheur Motivé';
  if (percentage >= 50) return 'Chercheur';
  if (percentage >= 47) return 'Explorateur Biblique';
  if (percentage >= 45) return 'Explorateur';
  if (percentage >= 42) return 'Découvreur Actif';
  if (percentage >= 40) return 'Découvreur';
  if (percentage >= 37) return 'Novice Persévérant';
  if (percentage >= 35) return 'Novice Motivé';
  if (percentage >= 32) return 'Novice Actif';
  if (percentage >= 30) return 'Novice';
  if (percentage >= 25) return 'Débutant Courageux';
  if (percentage >= 20) return 'Débutant Persévérant';
  if (percentage >= 15) return 'Débutant Motivé';
  if (percentage >= 10) return 'Débutant';
  if (percentage >= 5) return 'Premier Pas';
  return 'Nouveau Venu';
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
