import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap, Award, Star, TrendingUp, Calendar, Gift } from 'lucide-react';
interface ProgressSectionProps {
  language: string;
}
const ProgressSection = ({
  language
}: ProgressSectionProps) => {
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
    badges: [{
      name: "Débutant Fidèle",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Target
    }, {
      name: "Lecteur Assidu",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: Zap
    }, {
      name: "Quiz Master",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: Award
    }]
  };
  return <div className="mb-12">
      <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden relative">
        {/* Gradient décoratif en arrière-plan */}
        
        
        

        
      </Card>
    </div>;
};
export default ProgressSection;