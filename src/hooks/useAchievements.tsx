
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ACHIEVEMENT_DEFINITIONS } from '@/utils/achievementDefinitions';
import { AchievementCheckData } from '@/types/achievements';

export const useAchievements = () => {
  const { user, profile } = useAuth();
  const [isChecking, setIsChecking] = useState(false);

  const checkAndAwardAchievements = useCallback(async (data: Partial<AchievementCheckData>) => {
    if (!user || !profile || isChecking) return;

    setIsChecking(true);
    
    try {
      // Récupérer l'historique des quiz pour certains achievements
      const { data: quizHistory } = await supabase
        .from('quiz_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Récupérer les achievements déjà obtenus
      const { data: existingAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_type')
        .eq('user_id', user.id);

      const existingTypes = new Set(existingAchievements?.map(a => a.achievement_type) || []);

      const checkData: AchievementCheckData = {
        user,
        profile,
        quizHistory: quizHistory || [],
        ...data
      };

      const newAchievements = [];

      // Vérifier chaque achievement
      for (const achievementDef of ACHIEVEMENT_DEFINITIONS) {
        if (!existingTypes.has(achievementDef.type) && achievementDef.checkCondition(checkData)) {
          newAchievements.push({
            user_id: user.id,
            achievement_type: achievementDef.type,
            achievement_name: achievementDef.name,
            description: achievementDef.description
          });
        }
      }

      // Insérer les nouveaux achievements
      if (newAchievements.length > 0) {
        const { error } = await supabase
          .from('user_achievements')
          .insert(newAchievements);

        if (error) {
          console.error('Erreur lors de l\'insertion des achievements:', error);
        } else {
          // Afficher les notifications pour les nouveaux achievements
          newAchievements.forEach(achievement => {
            const definition = ACHIEVEMENT_DEFINITIONS.find(def => def.type === achievement.achievement_type);
            toast({
              title: `🎉 Nouvel Achievement !`,
              description: `${definition?.icon} ${achievement.achievement_name}: ${achievement.description}`,
              duration: 5000,
            });
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des achievements:', error);
    } finally {
      setIsChecking(false);
    }
  }, [user, profile, isChecking]);

  return {
    checkAndAwardAchievements,
    isChecking
  };
};
