
import { AchievementDefinition } from '@/types/achievements';

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    type: 'first_quiz',
    name: 'Premier Quiz',
    description: 'Terminer votre premier quiz',
    icon: '🎯',
    checkCondition: (data) => {
      return data.profile?.games_played === 1;
    }
  },
  {
    type: 'perfect_score',
    name: 'Score Parfait',
    description: 'Répondre correctement à toutes les questions d\'un quiz',
    icon: '💯',
    checkCondition: (data) => {
      return data.quizResult && data.quizResult.correctAnswers === data.quizResult.totalQuestions;
    }
  },
  {
    type: 'speed_demon',
    name: 'Démon de la Vitesse',
    description: 'Répondre à une question en moins de 5 secondes',
    icon: '⚡',
    checkCondition: (data) => {
      return data.responseTime && data.responseTime < 5000;
    }
  },
  {
    type: 'scholar',
    name: 'Érudit',
    description: 'Obtenir 80% ou plus dans un quiz difficile',
    icon: '🎓',
    checkCondition: (data) => {
      return data.quizResult && 
             data.quizResult.difficulty === 'difficile' && 
             (data.quizResult.correctAnswers / data.quizResult.totalQuestions) >= 0.8;
    }
  },
  {
    type: 'high_score',
    name: 'Centurion',
    description: 'Obtenir 100 points ou plus dans un quiz',
    icon: '🏆',
    checkCondition: (data) => {
      return data.quizResult && data.quizResult.score >= 100;
    }
  },
  {
    type: 'multiplayer_winner',
    name: 'Champion Multijoueur',
    description: 'Gagner votre première partie multijoueur',
    icon: '👑',
    checkCondition: (data) => {
      return data.multiplayerResult && data.multiplayerResult.isWinner;
    }
  },
  {
    type: 'dedication',
    name: 'Dévouement',
    description: 'Jouer 10 quiz au total',
    icon: '💪',
    checkCondition: (data) => {
      return data.profile?.games_played >= 10;
    }
  },
  {
    type: 'perfectionist',
    name: 'Perfectionniste',
    description: 'Obtenir 3 scores parfaits',
    icon: '✨',
    checkCondition: (data) => {
      if (!data.quizHistory) return false;
      const perfectScores = data.quizHistory.filter(quiz => 
        quiz.correct_answers === quiz.total_questions
      ).length;
      return perfectScores >= 3;
    }
  },
  {
    type: 'theme_master',
    name: 'Maître du Thème',
    description: 'Obtenir un score parfait dans 3 thèmes différents',
    icon: '🌟',
    checkCondition: (data) => {
      if (!data.quizHistory) return false;
      const perfectThemes = new Set();
      data.quizHistory.forEach(quiz => {
        if (quiz.correct_answers === quiz.total_questions) {
          perfectThemes.add(quiz.theme);
        }
      });
      return perfectThemes.size >= 3;
    }
  },
  {
    type: 'quick_learner',
    name: 'Apprentissage Rapide',
    description: 'Améliorer votre score de 50% entre deux quiz',
    icon: '📚',
    checkCondition: (data) => {
      if (!data.quizHistory || data.quizHistory.length < 2) return false;
      const sorted = [...data.quizHistory].sort((a, b) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      for (let i = 1; i < sorted.length; i++) {
        const previous = sorted[i - 1];
        const current = sorted[i];
        if (current.score >= previous.score * 1.5) {
          return true;
        }
      }
      return false;
    }
  }
];
