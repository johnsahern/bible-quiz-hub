
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
      return (
        <div className="text-white text-center p-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">🧩 Mots Croisés Multijoueur</h3>
            <p className="text-white/80 mb-4">
              Le mode multijoueur pour les mots croisés arrive bientôt !
            </p>
            <div className="text-sm text-white/60">
              En attendant, vous pouvez profiter des mots croisés en mode solo dans le Centre de Jeux.
            </div>
          </div>
        </div>
      );
      
    case 'word-search':
      return (
        <div className="text-white text-center p-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">🔍 Mots Cachés Multijoueur</h3>
            <p className="text-white/80 mb-4">
              Le mode multijoueur pour les mots cachés arrive bientôt !
            </p>
            <div className="text-sm text-white/60">
              En attendant, vous pouvez profiter des mots cachés en mode solo dans le Centre de Jeux.
            </div>
          </div>
        </div>
      );
      
    default:
      // Quiz par défaut
      const currentQuestion = room.game_state?.gameData?.questions?.[room.current_question || 0];
      if (!currentQuestion) {
        return (
          <div className="text-white text-center p-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Chargement du jeu...</h3>
              <p className="text-white/70">Préparation des questions en cours</p>
            </div>
          </div>
        );
      }
      
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
