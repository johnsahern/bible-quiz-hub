
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Users, Target, Clock, Home } from 'lucide-react';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';
import { useNavigate } from 'react-router-dom';

interface MultiplayerResultsProps {
  room: QuizRoom;
  players: RoomPlayer[];
}

const MultiplayerResults: React.FC<MultiplayerResultsProps> = ({ room, players }) => {
  const navigate = useNavigate();
  
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const totalQuestions = room.question_count;
  
  const getPodiumIcon = (position: number) => {
    switch (position) {
      case 0: return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 1: return <Medal className="w-8 h-8 text-gray-400" />;
      case 2: return <Award className="w-8 h-8 text-amber-600" />;
      default: return <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">{position + 1}</div>;
    }
  };

  const getPodiumClass = (position: number) => {
    switch (position) {
      case 0: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50';
      case 1: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 2: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50';
      default: return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Annonce du gagnant */}
      <Card className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            🎉 Félicitations {winner.username} ! 🎉
          </h1>
          <p className="text-white/80 text-lg">
            Vous avez remporté cette partie avec {winner.score} points !
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-white/70">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {winner.correct_answers}/{totalQuestions} bonnes réponses
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {Math.round((winner.correct_answers / totalQuestions) * 100)}% de réussite
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedPlayers.slice(0, 3).map((player, index) => (
          <Card key={player.id} className={getPodiumClass(index)}>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                {getPodiumIcon(index)}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{player.username}</h3>
              <div className="text-2xl font-bold text-white mb-2">{player.score} pts</div>
              <div className="text-white/70 text-sm">
                {player.correct_answers}/{totalQuestions} bonnes réponses
              </div>
              <div className="text-white/60 text-xs mt-1">
                {Math.round((player.correct_answers / totalQuestions) * 100)}% de réussite
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Classement complet */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Classement final
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`p-4 rounded-lg border flex items-center justify-between ${
                  index < 3 ? getPodiumClass(index) : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {index < 3 ? (
                      getPodiumIcon(index)
                    ) : (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white">{player.username}</div>
                      <div className="text-white/60 text-sm">
                        Rejoint le {new Date(player.joined_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-white">{player.score}</div>
                  <div className="text-white/70 text-sm">
                    {player.correct_answers}/{totalQuestions} bonnes
                  </div>
                  <div className="text-white/60 text-xs">
                    {Math.round((player.correct_answers / totalQuestions) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistiques de la partie */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Statistiques de la partie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{players.length}</div>
              <div className="text-white/70 text-sm">Joueurs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalQuestions}</div>
              <div className="text-white/70 text-sm">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(sortedPlayers.reduce((acc, p) => acc + (p.correct_answers / totalQuestions), 0) / players.length * 100)}%
              </div>
              <div className="text-white/70 text-sm">Réussite moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {room.theme.replace('-', ' ').toUpperCase()}
              </div>
              <div className="text-white/70 text-sm">Thème</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
          <Home className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default MultiplayerResults;
