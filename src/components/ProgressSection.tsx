
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap, Award, Star, TrendingUp, Calendar, Gift } from 'lucide-react';

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
      pointsToGo: "points restants",
      achievements: "Accomplissements",
      streak: "Série actuelle",
      days: "jours"
    },
    en: {
      title: "My Progress",
      level: "Level",
      points: "Points",
      badges: "Badges",
      weeklyGoal: "Weekly Goal",
      completed: "completed",
      nextLevel: "Next level",
      pointsToGo: "points to go",
      achievements: "Achievements",
      streak: "Current streak",
      days: "days"
    }
  };

  const t = translations[language as keyof typeof translations];

  const userStats = {
    level: 3,
    points: 2450,
    weeklyProgress: 65,
    pointsToNextLevel: 550,
    currentStreak: 7,
    badges: [
      {
        name: "Débutant Fidèle",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Target
      },
      {
        name: "Lecteur Assidu",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        icon: Zap
      },
      {
        name: "Quiz Master",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: Award
      }
    ]
  };

  return (
    <div className="mb-12">
      <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden relative">
        {/* Gradient décoratif en arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50"></div>
        
        <CardHeader className="relative z-10 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
              <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
              {t.title}
            </CardTitle>
            <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200">
              <Gift className="w-5 h-5 text-orange-600" />
              <span className="text-orange-800 font-semibold">{t.streak}: {userStats.currentStreak} {t.days}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-8">
          {/* Stats principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-700 mb-1">{userStats.level}</div>
              <div className="text-sm text-gray-600 font-medium">{t.level}</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-1">{userStats.points.toLocaleString()}</div>
              <div className="text-sm text-gray-600 font-medium">{t.points}</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-emerald-700 mb-1">{userStats.badges.length}</div>
              <div className="text-sm text-gray-600 font-medium">{t.badges}</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-700 mb-1">{userStats.weeklyProgress}%</div>
              <div className="text-sm text-gray-600 font-medium">Hebdomadaire</div>
            </div>
          </div>

          {/* Progression hebdomadaire */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Calendar className="w-6 h-6 text-blue-600 mr-2" />
                {t.weeklyGoal}
              </h3>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {userStats.weeklyProgress}% {t.completed}
              </span>
            </div>
            <Progress 
              value={userStats.weeklyProgress} 
              className="h-3 bg-white/70 shadow-inner"
            />
            <p className="text-sm text-gray-600 mt-3 text-center">
              {t.nextLevel}: {userStats.pointsToNextLevel} {t.pointsToGo}
            </p>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="w-6 h-6 text-purple-600 mr-2" />
              {t.achievements}
            </h3>
            <div className="flex flex-wrap gap-3">
              {userStats.badges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <Badge 
                    key={index} 
                    className={`${badge.color} px-4 py-2 text-sm font-medium border shadow-sm hover:shadow-md transition-shadow duration-200`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {badge.name}
                  </Badge>
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
