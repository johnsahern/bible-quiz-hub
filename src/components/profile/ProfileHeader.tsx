
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ProfileInfo from './ProfileInfo';
import ProfileActions from './ProfileActions';
import ProfileEditForm from './ProfileEditForm';
import ProfileStats from './ProfileStats';

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
  verse_puzzle_points: number;
  crossword_points: number;
  word_search_points: number;
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

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card className="mb-6 sm:mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <ProfileInfo profile={profile} />
          <ProfileActions
            isEditing={isEditing}
            loading={loading}
            onToggleEdit={toggleEdit}
            onSave={handleSaveProfile}
            onShare={shareProfile}
            onSignOut={onSignOut}
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isEditing ? (
          <ProfileEditForm
            editData={editData}
            onDataChange={setEditData}
            onSave={handleSaveProfile}
            loading={loading}
          />
        ) : (
          <ProfileStats profile={profile} achievementsCount={achievementsCount} />
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
