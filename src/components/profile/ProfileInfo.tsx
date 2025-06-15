
import { User } from 'lucide-react';

interface Profile {
  full_name: string | null;
  username: string | null;
  created_at: string;
}

interface ProfileInfoProps {
  profile: Profile;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <div className="flex items-center space-x-4 flex-1">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
        <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl sm:text-2xl text-blue-900 truncate font-semibold leading-none tracking-tight">
          {profile.full_name || profile.username || 'Utilisateur'}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">@{profile.username || 'user'}</p>
        <p className="text-xs text-gray-500 mt-1">
          Membre depuis {new Date(profile.created_at).toLocaleDateString('fr-FR')}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
