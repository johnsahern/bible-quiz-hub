
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap, Award } from 'lucide-react';

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
      completed: "complété",
      nextLevel: "Prochain niveau",
      pointsToGo: "points restants"
    },
    en: {
      title: "My Progress",
      level: "Level",
      points: "Points", 
      badges: "Badges",
      weeklyGoal: "Weekly Goal",
      completed: "completed",
      nextLevel: "Next level",
      pointsToGo: "points to go"
    }
  };

  const t = translations[language as keyof typeof translations];

  const userStats = {
    level: 3,
    points: 2450,
    weeklyProgress: 65,
    pointsToNextLevel: 550,
    badges: [
      { name: "Débutant Fidèle", color: "bg-blue-100 text-blue-800", icon: Target },
      { name: "Lecteur Assidu", color: "bg-green-100 text-green-800", icon: Zap },
      { name: "Quiz Master", color: "bg-purple-100 text-purple-800", icon: Award }
    ]
  };

  return (
    <div className="mb-8">
      <Card className="bg-white shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="text-2xl font-bold text-blue-900 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span>{t.title}</span>
            </div>
            <Badge variant="secondary" className="bg-blue-600 text-white px-4 py-2 text-sm">
              {t.level} {userStats.level}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Points Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-bold text-amber-700">
                    {userStats.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-amber-600">{t.points}</div>
                </div>
              </div>
            </div>

            {/* Next Level Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-bold text-blue-700">
                    {userStats.pointsToNextLevel}
                  </div>
                  <div className="text-sm text-blue-600">{t.pointsToGo}</div>
                </div>
              </div>
            </div>

            {/* Weekly Progress Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-bold text-green-700">
                    {userStats.weeklyProgress}%
                  </div>
                  <div className="text-sm text-green-600">{t.completed}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Goal Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-700">{t.weeklyGoal}</h4>
              <span className="text-sm font-medium text-gray-500">
                {userStats.weeklyProgress}% {t.completed}
              </span>
            </div>
            <Progress 
              value={userStats.weeklyProgress} 
              className="h-4 bg-gray-100" 
            />
          </div>

          {/* Badges Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              {t.badges}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userStats.badges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <Badge className={`${badge.color} px-3 py-1 text-sm font-medium`}>
                        {badge.name}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressSection;
