
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { RoomPlayer } from '@/types/multiplayer';

interface LeaderboardProps {
  players: RoomPlayer[];
  currentUserId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players, currentUserId }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Classement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <div
                key={player.id}
                className={`p-3 rounded-lg border ${
                  player.user_id === currentUserId 
                    ? 'bg-blue-500/20 border-blue-400/50' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-amber-600 text-white' :
                    'bg-white/20 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">
                        {player.username}
                      </span>
                      {player.answer_time && (
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-white/60 text-xs">
                      {player.score} pts • {player.correct_answers} bonnes
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
