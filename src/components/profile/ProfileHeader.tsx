import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Trophy, 
  Target, 
  Clock, 
  BookOpen, 
  Edit, 
  Save,
  Share2,
  LogOut,
  Users,
  CheckCircle,
  Puzzle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
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
  created_at: string;
  updated_at: string;
}

interface ProfileHeaderProps {
  profile: Profile;
  achievementsCount: number;
  onUpdateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  onSignOut: () => Promise<void>;
}

const ProfileHeader = ({ profile, achievementsCount, onUpdateProfile, onSignOut }: ProfileHeaderProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    username: profile.username || '',
    full_name: profile.full_name || ''
  });

  const handleSaveProfile = async () => {
    setLoading(true);
    
    const { error } = await onUpdateProfile({
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

  const shareProfile = async () => {
    const shareText = `Découvrez mon profil BibleQuiz+ ! ${profile.total_points} points solo, ${profile.multiplayer_points || 0} points multijoueur, ${profile.true_false_points || 0} points Vrai/Faux 🏆`;
    
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

  return (
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
              onClick={onSignOut}
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
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-yellow-600 mr-1" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-yellow-600">{profile.total_points || 0}</div>
              <div className="text-xs sm:text-sm text-gray-600">Points Solo</div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-purple-600 mr-1" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{profile.multiplayer_points || 0}</div>
              <div className="text-xs sm:text-sm text-gray-600">Points Multi</div>
            </div>

            <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-1" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-emerald-600">{profile.true_false_points || 0}</div>
              <div className="text-xs sm:text-sm text-gray-600">Vrai/Faux</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-green-600 mr-1" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-green-600">{profile.best_score || 0}</div>
              <div className="text-xs sm:text-sm text-gray-600">Meilleur Score</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-5 h-5 text-blue-600 mr-1" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{profile.games_played || 0}</div>
              <div className="text-xs sm:text-sm text-gray-600">Quiz Joués</div>
            </div>
            
            <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-amber-600 mr-1" />
              </div>
              <div className="text-sm sm:text-lg font-bold text-amber-600">
                {achievementsCount}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Achievements</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
