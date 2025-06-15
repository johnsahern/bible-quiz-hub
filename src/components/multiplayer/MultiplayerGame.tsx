
import React from 'react';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';
import { QuizQuestion } from '@/types/quiz';
import { useAuth } from '@/contexts/AuthContext';
import QuestionCard from './game/QuestionCard';
import Leaderboard from './game/Leaderboard';
import { useGameLogic } from './game/useGameLogic';
import { useQuestionFlow } from '@/hooks/multiplayer/useQuestionFlow';

interface MultiplayerGameProps {
  room: QuizRoom;
  players: RoomPlayer[];
  currentQuestion: QuizQuestion;
  questionIndex: number;
  isHost: boolean;
}

const MultiplayerGame: React.FC<MultiplayerGameProps> = ({ 
  room, 
  players, 
  currentQuestion, 
  questionIndex,
  isHost
}) => {
  const { user } = useAuth();
  
  // Gérer le flux des questions (host seulement)
  useQuestionFlow({ room, isHost });
  
  const {
    selectedAnswer,
    hasAnswered,
    timeLeft,
    handleAnswerClick
  } = useGameLogic({ room, players, currentQuestion, questionIndex });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main question */}
      <div className="lg:col-span-3">
        <QuestionCard
          room={room}
          players={players}
          currentQuestion={currentQuestion}
          timeLeft={timeLeft}
          selectedAnswer={selectedAnswer}
          hasAnswered={hasAnswered}
          onAnswerClick={handleAnswerClick}
        />
      </div>

      {/* Real-time leaderboard */}
      <div>
        <Leaderboard players={players} currentUserId={user?.id} />
      </div>
    </div>
  );
};

export default MultiplayerGame;
