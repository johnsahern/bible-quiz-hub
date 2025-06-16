
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, ArrowLeft } from 'lucide-react';
import { useMultiplayerRoom } from '@/hooks/useMultiplayerRoom';
import { useAuth } from '@/contexts/AuthContext';
import MultiplayerLobby from '@/components/multiplayer/MultiplayerLobby';
import MultiplayerGameRenderer from '@/components/multiplayer/MultiplayerGameRenderer';
import MultiplayerResults from '@/components/multiplayer/MultiplayerResults';
import { GameRoomExtended } from '@/types/multiplayerGameTypes';

const MultiplayerQuiz: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const multiplayerRoom = useMultiplayerRoom(roomId);
  const { room, players, isHost, currentQuestion, loading, error, leaveRoom } = multiplayerRoom;

  const handleLeaveRoom = async () => {
    await leaveRoom();
    navigate('/');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Chargement de la salle...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">⚠️</div>
            <h3 className="text-lg font-semibold mb-2">Salle introuvable</h3>
            <p className="text-muted-foreground mb-4">
              {error || "Cette salle n'existe pas ou n'est plus disponible."}
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getGameTypeLabel = (gameType: string) => {
    const labels = {
      'quiz': 'Quiz',
      'true-false': 'Vrai/Faux',
      'verse-puzzle': 'Puzzle Versets',
      'crossword': 'Mots Croisés',
      'word-search': 'Mots Cachés'
    };
    return labels[gameType as keyof typeof labels] || gameType;
  };

  const renderRoomHeader = () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Salle {room.room_code}</h1>
            <p className="text-white/70">
              {getGameTypeLabel(room.game_type || 'quiz')} • {room.theme.replace('-', ' ').toUpperCase()} • {room.difficulty.toUpperCase()}
            </p>
          </div>
          <Badge variant={room.status === 'waiting' ? 'secondary' : room.status === 'playing' ? 'default' : 'outline'}>
            {room.status === 'waiting' ? 'En attente' : room.status === 'playing' ? 'En cours' : 'Terminé'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center text-white/70">
            <Users className="w-4 h-4 mr-1" />
            {players.length}/{room.max_players}
          </div>
          <div className="flex items-center text-white/70">
            <Clock className="w-4 h-4 mr-1" />
            {room.question_count} questions
          </div>
          <Button onClick={handleLeaveRoom} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quitter
          </Button>
        </div>
      </div>
    </div>
  );

  // Convertir room en GameRoomExtended pour les jeux
  const gameRoom: GameRoomExtended = {
    ...room,
    game_type: (room as any).game_type || 'quiz',
    game_data: (room as any).game_data,
    game_state: (room as any).game_state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {renderRoomHeader()}
        
        {room.status === 'waiting' && (
          <MultiplayerLobby room={room} players={players} isHost={isHost} />
        )}
        
        {room.status === 'playing' && (
          <MultiplayerGameRenderer 
            room={gameRoom}
            players={players}
            isHost={isHost}
          />
        )}
        
        {room.status === 'finished' && (
          <MultiplayerResults room={room} players={players} />
        )}
      </div>
    </div>
  );
};

export default MultiplayerQuiz;
