
import { useEffect } from 'react';
import { QuizResult } from '@/types/quiz';
import { useAchievements } from '@/hooks/useAchievements';

interface QuizAchievementsProps {
  user: any;
  quizResult?: QuizResult;
  responseTime?: number;
}

export const QuizAchievements = ({ user, quizResult, responseTime }: QuizAchievementsProps) => {
  const { checkAndAwardAchievements } = useAchievements();

  useEffect(() => {
    if (user && quizResult) {
      checkAndAwardAchievements({
        quizResult,
        responseTime
      });
    }
  }, [user, quizResult, responseTime, checkAndAwardAchievements]);

  return null; // Ce composant ne rend rien, il ne fait que vérifier les achievements
};

export const useQuizAchievements = ({ user }: { user: any }) => {
  const { checkAndAwardAchievements } = useAchievements();

  const checkAndAwardAchievementsLegacy = async (result: QuizResult, responseTime?: number) => {
    if (!user) return;
    
    await checkAndAwardAchievements({
      quizResult: result,
      responseTime
    });
  };

  return { checkAndAwardAchievements: checkAndAwardAchievementsLegacy };
};
