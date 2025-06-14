
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
  History,
  LogOut,
  Settings
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
  }

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
        <Card className="mb-6 sm:mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl sm:text-2xl text-blue-900 truncate">
                    {profile.full_name || profile.username || 'Utilisateur'}
                  </CardTitle>
                  <p className="text-gray-600 text-sm sm:text-base">@{profile.username || 'user'}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Membre depuis {new Date(profile.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={loading}
                  className="flex-1 sm:flex-initial text-blue-600 border-blue-200 hover:bg-blue-50"
                  size="sm"
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Sauvegarder' : 'Modifier'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={shareProfile}
                  className="flex-1 sm:flex-initial text-green-600 border-green-200 hover:bg-green-50"
                  size="sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Partager</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="flex-1 sm:flex-initial text-red-600 border-red-200 hover:bg-red-50"
                  size="sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">Nom d'utilisateur</Label>
                    <Input
                      id="username"
                      value={editData.username}
                      onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fullname" className="text-sm font-medium text-gray-700">Nom complet</Label>
                    <Input
                      id="fullname"
                      value={editData.full_name}
                      onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} disabled={loading} className="w-full sm:w-auto">
                  {loading ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="w-5 h-5 text-yellow-600 mr-1" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-yellow-600">{profile.total_points}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Points</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-green-600 mr-1" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-green-600">{profile.best_score}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Meilleur Score</div>
                </div>
                
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-1" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">{profile.games_played}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Quiz Joués</div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-purple-600 mr-1" />
                  </div>
                  <div className="text-sm sm:text-lg font-bold text-purple-600">
                    {achievements.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Achievements</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="history" className="text-sm sm:text-base">Historique</TabsTrigger>
            <TabsTrigger value="achievements" className="text-sm sm:text-base">Achievements</TabsTrigger>
          </TabsList>

          {/* Historique des quiz */}
          <TabsContent value="history">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <History className="w-5 h-5 mr-2" />
                  Historique des Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                {quizHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun quiz joué pour le moment</p>
                    <Button 
                      onClick={() => navigate('/quiz-solo')} 
                      className="mt-4"
                      variant="outline"
                    >
                      Commencer un quiz
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quizHistory.map((quiz) => (
                      <div key={quiz.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1 mb-3 sm:mb-0">
                          <div className="font-medium text-gray-900">{quiz.theme}</div>
                          <div className="text-sm text-gray-600">
                            {quiz.correct_answers}/{quiz.total_questions} bonnes réponses
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(quiz.created_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end sm:text-right gap-4">
                          <Badge variant="outline" className="text-xs">
                            {quiz.difficulty}
                          </Badge>
                          <div>
                            <div className="text-lg font-bold text-blue-600">{quiz.score} pts</div>
                            {quiz.badge && (
                              <div className="text-xs text-amber-600">{quiz.badge}</div>
                            )}
                          </div>
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
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Trophy className="w-5 h-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {achievements.length === 0 ? (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun achievement débloqué</p>
                    <p className="text-sm text-gray-400 mt-2">Jouez des quiz pour débloquer des achievements !</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-amber-800 truncate">{achievement.achievement_name}</div>
                            <div className="text-sm text-amber-700 mt-1">{achievement.description}</div>
                            <div className="text-xs text-amber-600 mt-2">
                              {new Date(achievement.earned_at).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
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
