
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

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
          Achievements
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
              <div key={achievement.id} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-amber-800 truncate">{achievement.achievement_name}</div>
                    <div className="text-sm text-amber-700 mt-1">{achievement.description}</div>
                    <div className="text-xs text-amber-600 mt-2">
                      {new Date(achievement.earned_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementsTab;
