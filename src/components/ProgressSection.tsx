
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProgressSectionProps {
  language: string;
}

const ProgressSection = ({ language }: ProgressSectionProps) => {
  const translations = {
    fr: {
      title: "Ma Progression",
      level: "Niveau",
      points: "Points",
      badges: "Badges",
      weeklyGoal: "Objectif Hebdomadaire",
      completed: "complété"
    },
    en: {
      title: "My Progress",
      level: "Level",
      points: "Points", 
      badges: "Badges",
      weeklyGoal: "Weekly Goal",
      completed: "completed"
    }
  };

  const t = translations[language as keyof typeof translations];

  const userStats = {
    level: 3,
    points: 2450,
    weeklyProgress: 65,
    badges: [
      { name: "Débutant Fidèle", color: "bg-blue-100 text-blue-800" },
      { name: "Lecteur Assidu", color: "bg-green-100 text-green-800" },
      { name: "Quiz Master", color: "bg-purple-100 text-purple-800" }
    ]
  };

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center justify-between">
          {t.title}
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {t.level} {userStats.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Points */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">{t.points}</span>
          <span className="text-2xl font-bold text-amber-600">{userStats.points.toLocaleString()}</span>
        </div>

        {/* Weekly Goal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">{t.weeklyGoal}</span>
            <span className="text-sm text-gray-500">{userStats.weeklyProgress}% {t.completed}</span>
          </div>
          <Progress value={userStats.weeklyProgress} className="h-3" />
        </div>

        {/* Badges */}
        <div className="space-y-3">
          <span className="text-gray-600 font-medium">{t.badges}</span>
          <div className="flex flex-wrap gap-2">
            {userStats.badges.map((badge, index) => (
              <Badge key={index} className={`${badge.color} px-3 py-1`}>
                {badge.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
