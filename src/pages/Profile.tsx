
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Trophy, 
  Target, 
  Clock, 
  BookOpen, 
  ArrowLeft, 
  Edit, 
  Save,
  Share2,
  History
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: '',
    full_name: ''
  });
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (profile) {
      setEditData({
        username: profile.username || '',
        full_name: profile.full_name || ''
      });
    }

    fetchQuizHistory();
    fetchAchievements();
  }, [user, profile, navigate]);

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

  const handleSaveProfile = async () => {
    setLoading(true);
    
    const { error } = await updateProfile({
      username: editData.username,
      full_name: editData.full_name
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées",
      });
      setIsEditing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const shareProfile = async () => {
    const shareText = `Découvrez mon profil BibleQuiz+ ! ${profile?.total_points} points, ${profile?.games_played} quiz joués 🏆`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon profil BibleQuiz+',
          text: shareText,
          url: window.location.origin
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copié !",
        description: "Profil copié dans le presse-papier"
      });
    }
  };

  if (!user || !profile) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-blue-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={shareProfile}
              className="text-blue-600"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="text-red-600"
            >
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {profile.full_name || profile.username || 'Utilisateur'}
                  </CardTitle>
                  <p className="text-gray-600">@{profile.username || 'user'}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                disabled={loading}
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="fullname">Nom complet</Label>
                  <Input
                    id="fullname"
                    value={editData.full_name}
                    onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                  />
                </div>
                <Button onClick={handleSaveProfile} disabled={loading}>
                  Sauvegarder
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="w-5 h-5 text-yellow-600 mr-1" />
                    <span className="text-sm text-gray-600">Points</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">{profile.total_points}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-green-600 mr-1" />
                    <span className="text-sm text-gray-600">Meilleur Score</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{profile.best_score}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="text-sm text-gray-600">Quiz Joués</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{profile.games_played}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-purple-600 mr-1" />
                    <span className="text-sm text-gray-600">Membre depuis</span>
                  </div>
                  <div className="text-sm font-medium text-purple-600">
                    {new Date(profile.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Historique des quiz */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Historique des Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                {quizHistory.length === 0 ? (
                  <p className="text-center text-gray-500">Aucun quiz joué pour le moment</p>
                ) : (
                  <div className="space-y-3">
                    {quizHistory.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{quiz.theme}</div>
                          <div className="text-sm text-gray-600">
                            {quiz.correct_answers}/{quiz.total_questions} bonnes réponses
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(quiz.created_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-1">{quiz.difficulty}</Badge>
                          <div className="text-lg font-bold text-blue-600">{quiz.score} pts</div>
                          {quiz.badge && (
                            <div className="text-xs text-amber-600">{quiz.badge}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {achievements.length === 0 ? (
                  <p className="text-center text-gray-500">Aucun achievement débloqué</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="font-medium text-amber-800">{achievement.achievement_name}</div>
                        <div className="text-sm text-amber-700">{achievement.description}</div>
                        <div className="text-xs text-amber-600 mt-2">
                          {new Date(achievement.earned_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
