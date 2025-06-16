
import React from 'react';
import { GameRoomExtended } from '@/types/multiplayerGameTypes';
import { RoomPlayer } from '@/types/multiplayer';
import MultiplayerGame from './MultiplayerGame';
import MultiplayerTrueFalseGame from './games/MultiplayerTrueFalseGame';
import MultiplayerVersePuzzleGame from './games/MultiplayerVersePuzzleGame';

interface MultiplayerGameRendererProps {
  room: GameRoomExtended;
  players: RoomPlayer[];
  isHost: boolean;
}

const MultiplayerGameRenderer: React.FC<MultiplayerGameRendererProps> = ({
  room,
  players,
  isHost
}) => {
  const handleAnswer = (answer: any) => {
    console.log('Answer submitted:', answer);
  };

  const handleComplete = (result: any) => {
    console.log('Game completed:', result);
  };

  // Render différent selon le type de jeu
  switch (room.game_type) {
    case 'true-false':
      return (
        <MultiplayerTrueFalseGame
          room={room}
          players={players}
          onAnswer={handleAnswer}
        />
      );
      
    case 'verse-puzzle':
      return (
        <MultiplayerVersePuzzleGame
          room={room}
          players={players}
          onComplete={handleComplete}
        />
      );
      
    case 'crossword':
      // TODO: Implémenter MultiplayerCrosswordGame
      return (
        <div className="text-white text-center p-8">
          <h3>Mots Croisés Multijoueur</h3>
          <p>En cours de développement...</p>
        </div>
      );
      
    case 'word-search':
      // TODO: Implémenter MultiplayerWordSearchGame
      return (
        <div className="text-white text-center p-8">
          <h3>Mots Cachés Multijoueur</h3>
          <p>En cours de développement...</p>
        </div>
      );
      
    default:
      // Quiz par défaut
      const currentQuestion = room.game_state?.gameData?.questions?.[room.current_question || 0];
      if (!currentQuestion) return null;
      
      return (
        <MultiplayerGame
          room={room as any}
          players={players}
          currentQuestion={currentQuestion}
          questionIndex={room.current_question || 0}
          isHost={isHost}
        />
      );
  }
};

export default MultiplayerGameRenderer;
