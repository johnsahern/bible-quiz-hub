import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import ProfileHeader from '@/components/profile/ProfileHeader';
import QuizHistoryTab from '@/components/profile/QuizHistoryTab';
import AchievementsTab from '@/components/profile/AchievementsTab';

interface QuizHistory {
  id: string;
  theme: string;
  difficulty: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  time_spent: number;
  badge: string | null;
  created_at: string;
}

interface Achievement {
  id: string;
  achievement_type: string;
  achievement_name: string;
  description: string | null;
  earned_at: string;
}

// Interface mise à jour pour inclure true_false_points
interface ExtendedProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  total_points: number;
  games_played: number;
  best_score: number;
  favorite_theme: string | null;
  multiplayer_points: number;
  true_false_points: number;
  verse_puzzle_points: number;
  crossword_points: number;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile, signOut } = useAuth();
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchQuizHistory();
    fetchAchievements();
  }, [user, navigate]);

  const fetchQuizHistory = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('quiz_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching quiz history:', error);
    } else {
      setQuizHistory(data || []);
    }
  };

  const fetchAchievements = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });

    if (error) {
      console.error('Error fetching achievements:', error);
    } else {
      setAchievements(data || []);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="w-6 h-6 text-white" />
          </div>
          <p className="text-blue-700">Chargement...</p>
        </div>
      </div>
    );
  };

  // Créer un profil étendu avec tous les types de points
  const extendedProfile: ExtendedProfile = {
    ...profile,
    total_points: profile.total_points || 0,
    games_played: profile.games_played || 0,
    best_score: profile.best_score || 0,
    multiplayer_points: profile.multiplayer_points || 0,
    true_false_points: profile.true_false_points || 0,
    verse_puzzle_points: profile.verse_puzzle_points || 0,
    crossword_points: profile.crossword_points || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-blue-600 hover:bg-blue-100 self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>

        {/* Profile Header Card */}
        <ProfileHeader 
          profile={extendedProfile}
          achievementsCount={achievements.length}
          onUpdateProfile={updateProfile}
          onSignOut={handleSignOut}
        />

        {/* Tabs */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="history" className="text-sm sm:text-base">Historique</TabsTrigger>
            <TabsTrigger value="achievements" className="text-sm sm:text-base">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <QuizHistoryTab quizHistory={quizHistory} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsTab achievements={achievements} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
