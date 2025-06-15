
import { useEffect } from 'react';
import { useAchievements } from '@/hooks/useAchievements';

interface MultiplayerAchievementsProps {
  user: any;
  gameResult?: {
    isWinner: boolean;
    score: number;
    position: number;
  };
}

const MultiplayerAchievements = ({ user, gameResult }: MultiplayerAchievementsProps) => {
  const { checkAndAwardAchievements } = useAchievements();

  useEffect(() => {
    if (user && gameResult) {
      checkAndAwardAchievements({
        multiplayerResult: gameResult
      });
    }
  }, [user, gameResult, checkAndAwardAchievements]);

  return null;
};

export default MultiplayerAchievements;
