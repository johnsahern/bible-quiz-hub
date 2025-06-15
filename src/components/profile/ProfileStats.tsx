
import { 
  BookOpen, 
  Target, 
  Clock, 
  Users,
  CheckCircle,
  Puzzle,
  Grid3x3
} from 'lucide-react';

interface Profile {
  total_points: number;
  multiplayer_points: number;
  true_false_points: number;
  verse_puzzle_points: number;
  crossword_points: number;
  best_score: number;
}

interface ProfileStatsProps {
  profile: Profile;
  achievementsCount: number;
}

const ProfileStats = ({ profile, achievementsCount }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-7 gap-4">
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

      <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
        <div className="flex items-center justify-center mb-2">
          <Puzzle className="w-5 h-5 text-indigo-600 mr-1" />
        </div>
        <div className="text-lg sm:text-2xl font-bold text-indigo-600">{profile.verse_puzzle_points || 0}</div>
        <div className="text-xs sm:text-sm text-gray-600">Puzzles</div>
      </div>

      <div className="text-center p-3 bg-rose-50 rounded-lg border border-rose-200">
        <div className="flex items-center justify-center mb-2">
          <Grid3x3 className="w-5 h-5 text-rose-600 mr-1" />
        </div>
        <div className="text-lg sm:text-2xl font-bold text-rose-600">{profile.crossword_points || 0}</div>
        <div className="text-xs sm:text-sm text-gray-600">Mots Croisés</div>
      </div>
      
      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-center mb-2">
          <Target className="w-5 h-5 text-green-600 mr-1" />
        </div>
        <div className="text-lg sm:text-2xl font-bold text-green-600">{profile.best_score || 0}</div>
        <div className="text-xs sm:text-sm text-gray-600">Meilleur Score</div>
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
  );
};

export default ProfileStats;
