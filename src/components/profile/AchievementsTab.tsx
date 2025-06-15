
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import AchievementCard from '@/components/achievements/AchievementCard';

interface Achievement {
  id: string;
  achievement_type: string;
  achievement_name: string;
  description: string | null;
  earned_at: string;
}

interface AchievementsTabProps {
  achievements: Achievement[];
}

const AchievementsTab = ({ achievements }: AchievementsTabProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Trophy className="w-5 h-5 mr-2" />
          Achievements ({achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun achievement débloqué</p>
            <p className="text-sm text-gray-400 mt-2">Jouez des quiz pour débloquer des achievements !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementsTab;
