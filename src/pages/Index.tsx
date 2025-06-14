
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, Play, Users, Bell } from 'lucide-react';
import VerseDuJour from '@/components/VerseDuJour';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/QuizCard';
import ProgressSection from '@/components/ProgressSection';

const Index = () => {
  const [language, setLanguage] = useState('fr');

  const translations = {
    fr: {
      title: "BibleQuiz+",
      subtitle: "Apprendre et méditer la Bible de manière interactive",
      soloQuiz: "Quiz Personnel",
      multiQuiz: "Quiz Multijoueur",
      readBible: "Lecture Bible",
      progress: "Ma Progression",
      dailyVerse: "Verset du Jour",
      notifications: "Notifications",
      level: "Niveau",
      badges: "Badges",
      points: "Points"
    },
    en: {
      title: "BibleQuiz+",
      subtitle: "Learn and meditate the Bible interactively",
      soloQuiz: "Solo Quiz",
      multiQuiz: "Multiplayer Quiz",
      readBible: "Bible Reading",
      progress: "My Progress",
      dailyVerse: "Daily Verse",
      notifications: "Notifications",
      level: "Level",
      badges: "Badges",
      points: "Points"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation language={language} setLanguage={setLanguage} />
      
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 animate-fade-in">
            {t.title}
          </h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto animate-fade-in">
            {t.subtitle}
          </p>
        </div>

        {/* Daily Verse Section */}
        <div className="mb-8 animate-scale-in">
          <VerseDuJour language={language} />
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <QuizCard
            icon={<Play className="w-8 h-8" />}
            title={t.soloQuiz}
            description="Quiz personnel avec différents niveaux"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            delay="0.1s"
            route="/quiz-solo"
          />
          
          <QuizCard
            icon={<Users className="w-8 h-8" />}
            title={t.multiQuiz}
            description="Défiez vos amis et votre famille"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            delay="0.2s"
          />
          
          <QuizCard
            icon={<Book className="w-8 h-8" />}
            title={t.readBible}
            description="Lecture et audio de la Bible"
            color="bg-gradient-to-br from-amber-500 to-amber-600"
            delay="0.3s"
          />
        </div>

        {/* Progress Section */}
        <ProgressSection language={language} />
      </div>
    </div>
  );
};

export default Index;
