
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { ACHIEVEMENT_DEFINITIONS } from '@/utils/achievementDefinitions';

interface Achievement {
  id: string;
  achievement_type: string;
  achievement_name: string;
  description: string | null;
  earned_at: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const definition = ACHIEVEMENT_DEFINITIONS.find(def => def.type === achievement.achievement_type);
  const icon = definition?.icon || '🏆';

  return (
    <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg">{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-amber-800 truncate">{achievement.achievement_name}</div>
            <div className="text-sm text-amber-700 mt-1">{achievement.description}</div>
            <div className="text-xs text-amber-600 mt-2">
              {new Date(achievement.earned_at).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
