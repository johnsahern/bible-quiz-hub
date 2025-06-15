import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap, Award } from 'lucide-react';
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
    badges: [{
      name: "Débutant Fidèle",
      color: "bg-blue-100 text-blue-800",
      icon: Target
    }, {
      name: "Lecteur Assidu",
      color: "bg-green-100 text-green-800",
      icon: Zap
    }, {
      name: "Quiz Master",
      color: "bg-purple-100 text-purple-800",
      icon: Award
    }]
  };
  return <div className="mb-8">
      <Card className="bg-white shadow-xl border-0 overflow-hidden">
        
        
        
      </Card>
    </div>;
};
export default ProgressSection;