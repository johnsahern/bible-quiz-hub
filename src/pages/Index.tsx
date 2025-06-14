
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Book, Play, Users, Bell, User, LogIn, Trophy, Target, Clock, Star, ChevronRight } from 'lucide-react';
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
      welcome: "Bienvenue",
      viewProfile: "Voir le profil",
      gamesPlayed: "Quiz joués",
      bestScore: "Meilleur score",
      joinNow: "Rejoignez BibleQuiz+ dès maintenant !",
      createAccount: "Créer un compte gratuit",
      accountDescription: "Créez votre compte pour sauvegarder vos scores, débloquer des achievements et défier vos amis."
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
      welcome: "Welcome",
      viewProfile: "View profile",
      gamesPlayed: "Games played",
      bestScore: "Best score",
      joinNow: "Join BibleQuiz+ now!",
      createAccount: "Create free account",
      accountDescription: "Create your account to save scores, unlock achievements and challenge your friends."
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
      
      {/* Compact Header Section */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Compact Profile Header */}
        {user ? (
          <div className="flex items-center justify-between mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 md:w-14 md:h-14 ring-2 ring-blue-200 shadow-md">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                  {profile?.full_name?.[0] || profile?.username?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  {t.welcome}, {profile?.full_name || profile?.username}!
                </h2>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Trophy className="w-4 h-4" />
                    <span className="font-semibold">{profile?.total_points || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-purple-600">
                    <Star className="w-4 h-4" />
                    <span>Niv. {Math.floor((profile?.total_points || 0) / 100) + 1}</span>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/profile">
              <Button variant="outline" size="sm" className="shadow-md hover:shadow-lg transition-all group">
                <User className="w-4 h-4 mr-2" />
                {t.profile}
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-end mb-6">
            <Link to="/auth">
              <Button variant="outline" size="sm" className="shadow-md hover:shadow-lg transition-all duration-200">
                <LogIn className="w-4 h-4 mr-2" />
                {t.login}
              </Button>
            </Link>
          </div>
        )}

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4 animate-fade-in">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto animate-fade-in">
            {t.subtitle}
          </p>
        </div>

        {/* Daily Verse Section */}
        <div className="mb-8 animate-scale-in">
          <VerseDuJour language={language} />
        </div>

        {/* Main Action Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

        {/* Progress Section - Only show if user is logged in */}
        {user && <ProgressSection language={language} />}

        {/* Call to Action for Non-Authenticated Users */}
        {!user && (
          <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardContent className="relative p-8 md:p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {t.joinNow}
                </h3>
                <p className="mb-8 text-blue-100 text-base md:text-lg leading-relaxed">
                  {t.accountDescription}
                </p>
                <Link to="/auth">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 px-8 py-3"
                  >
                    <User className="w-5 h-5 mr-3" />
                    {t.createAccount}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
