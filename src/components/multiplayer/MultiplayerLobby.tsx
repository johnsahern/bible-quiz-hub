
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Crown, Check, Clock, Play } from 'lucide-react';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';
import { useMultiplayerRoom } from '@/hooks/useMultiplayerRoom';

interface MultiplayerLobbyProps {
  room: QuizRoom;
  players: RoomPlayer[];
  isHost: boolean;
}

const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({ room, players, isHost }) => {
  const { setPlayerReady, startQuiz } = useMultiplayerRoom(room.id);

  const readyPlayers = players.filter(p => p.is_ready);
  const canStart = players.length >= 2 && readyPlayers.length === players.length;

  const handleReadyToggle = () => {
    const currentPlayer = players.find(p => p.user_id === room.host_id);
    setPlayerReady(!currentPlayer?.is_ready);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Liste des joueurs */}
      <div className="lg:col-span-2">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Joueurs ({players.length}/{room.max_players})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {player.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{player.username}</span>
                        {player.user_id === room.host_id && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <div className="text-white/60 text-sm">
                        Rejoint {new Date(player.joined_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {player.is_ready ? (
                      <Badge className="bg-green-500 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        Prêt
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-orange-500 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        En attente
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Slots vides */}
              {Array.from({ length: room.max_players - players.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-dashed border-white/20"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white/40" />
                  </div>
                  <span className="text-white/40">En attente d'un joueur...</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panneau de contrôle */}
      <div>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-white/70">
                <span>Thème:</span>
                <span className="font-medium text-white">
                  {room.theme.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Difficulté:</span>
                <span className="font-medium text-white">
                  {room.difficulty.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Questions:</span>
                <span className="font-medium text-white">{room.question_count}</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4">
              <div className="text-center mb-4">
                <div className="text-white/70 text-sm mb-1">Joueurs prêts</div>
                <div className="text-2xl font-bold text-white">
                  {readyPlayers.length}/{players.length}
                </div>
              </div>

              {!isHost ? (
                <Button
                  onClick={handleReadyToggle}
                  className="w-full"
                  variant={players.find(p => p.user_id === room.host_id)?.is_ready ? "secondary" : "default"}
                >
                  {players.find(p => p.user_id === room.host_id)?.is_ready ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Prêt !
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                      Je suis prêt
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={startQuiz}
                    disabled={!canStart}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Démarrer le quiz
                  </Button>
                  {!canStart && (
                    <p className="text-white/60 text-xs text-center">
                      {players.length < 2 
                        ? "Au moins 2 joueurs requis"
                        : "Tous les joueurs doivent être prêts"
                      }
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Code de la salle */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-4">
          <CardContent className="p-4 text-center">
            <div className="text-white/70 text-sm mb-1">Code de la salle</div>
            <div className="text-3xl font-bold text-white font-mono tracking-wider">
              {room.room_code}
            </div>
            <div className="text-white/60 text-xs mt-1">
              Partagez ce code avec vos amis
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiplayerLobby;
