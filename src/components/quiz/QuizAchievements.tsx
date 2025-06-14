
import { QuizResult } from '@/types/quiz';
import { supabase } from '@/integrations/supabase/client';

interface QuizAchievementsProps {
  user: any;
}

export const useQuizAchievements = ({ user }: QuizAchievementsProps) => {
  const checkAndAwardAchievements = async (result: QuizResult) => {
    if (!user) return;

    const achievements = [];

    // Perfect score achievement
    if (result.correctAnswers === result.totalQuestions) {
      achievements.push({
        user_id: user.id,
        achievement_type: 'perfect_score',
        achievement_name: 'Score Parfait',
        description: 'Répondre correctement à toutes les questions d\'un quiz'
      });
    }

    // High score achievements
    if (result.score >= 100) {
      achievements.push({
        user_id: user.id,
        achievement_type: 'high_score',
        achievement_name: 'Centurion',
        description: 'Obtenir 100 points ou plus dans un quiz'
      });
    }

    // Difficulty-based achievements
    if (result.difficulty === 'difficile' && result.correctAnswers >= result.totalQuestions * 0.8) {
      achievements.push({
        user_id: user.id,
        achievement_type: 'difficulty_master',
        achievement_name: 'Maître de la Difficulté',
        description: 'Réussir 80% ou plus d\'un quiz difficile'
      });
    }

    // Save achievements
    for (const achievement of achievements) {
      try {
        await supabase
          .from('user_achievements')
          .insert(achievement);
      } catch (error) {
        // Achievement might already exist, ignore duplicate errors
        console.log('Achievement already exists or error:', error);
      }
    }
  };

  return { checkAndAwardAchievements };
};
