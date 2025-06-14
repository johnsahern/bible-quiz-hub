
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, Play, Users, Bell, User, LogIn, Trophy } from 'lucide-react';
import VerseDuJour from '@/components/VerseDuJour';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/QuizCard';
import ProgressSection from '@/components/ProgressSection';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [language, setLanguage] = useState('fr');
  const { user, profile, loading } = useAuth();

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
      points: "Points",
      login: "Se connecter",
      profile: "Mon Profil",
      welcome: "Bienvenue"
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
      points: "Points",
      login: "Login",
      profile: "My Profile",
      welcome: "Welcome"
    }
  };

  const t = translations[language as keyof typeof translations];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Book className="w-6 h-6 text-white" />
          </div>
          <p className="text-blue-700">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation language={language} setLanguage={setLanguage} />
      
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Auth Section */}
        <div className="flex justify-end mb-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {profile && (
                <div className="text-right">
                  <p className="text-sm text-blue-700">
                    {t.welcome}, {profile.full_name || profile.username}!
                  </p>
                  <div className="flex items-center justify-end space-x-2 text-xs text-blue-600">
                    <Trophy className="w-3 h-3" />
                    <span>{profile.total_points} pts</span>
                  </div>
                </div>
              )}
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {t.profile}
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                {t.login}
              </Button>
            </Link>
          )}
        </div>

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
        {user && <ProgressSection language={language} />}

        {/* Call to Action for Non-Authenticated Users */}
        {!user && (
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Rejoignez BibleQuiz+ dès maintenant !</h3>
              <p className="mb-6 text-blue-100">
                Créez votre compte pour sauvegarder vos scores, débloquer des achievements et défier vos amis.
              </p>
              <Link to="/auth">
                <Button variant="secondary" size="lg">
                  <User className="w-4 h-4 mr-2" />
                  Créer un compte gratuit
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
