
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Play, Users, User } from 'lucide-react';
import VerseDuJour from '@/components/VerseDuJour';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/QuizCard';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [language, setLanguage] = useState('fr');
  const { user, loading } = useAuth();

  const translations = {
    fr: {
      title: "BibleQuiz+",
      subtitle: "Apprendre et méditer la Bible de manière interactive",
      soloQuiz: "Quiz Personnel",
      multiQuiz: "Quiz Multijoueur",
      readBible: "Lecture Bible",
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
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 pb-8">
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
            route="/quiz-multijoueur"
          />
          
          <QuizCard
            icon={<Book className="w-8 h-8" />}
            title={t.readBible}
            description="Lecture et audio de la Bible"
            color="bg-gradient-to-br from-amber-500 to-amber-600"
            delay="0.3s"
          />
        </div>

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
