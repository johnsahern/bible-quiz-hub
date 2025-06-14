
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';
import { QuizQuestion } from '@/types/quiz';
import { useRoomOperations } from './multiplayer/useRoomOperations';
import { usePlayerActions } from './multiplayer/usePlayerActions';
import { useQuizOperations } from './multiplayer/useQuizOperations';
import { useRealtimeSubscription } from './multiplayer/useRealtimeSubscription';
import { useRoomData } from './multiplayer/useRoomData';
import { UseMultiplayerRoomReturn } from './multiplayer/types';

export const useMultiplayerRoom = (roomId?: string): UseMultiplayerRoomReturn => {
  const { user } = useAuth();
  const [room, setRoom] = useState<QuizRoom | null>(null);
  const [players, setPlayers] = useState<RoomPlayer[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the smaller hooks
  const { createRoom: createRoomOperation, joinRoom: joinRoomOperation } = useRoomOperations(user);
  const { setPlayerReady, leaveRoom: leaveRoomOperation } = usePlayerActions(user, room);
  const { startQuiz } = useQuizOperations(user, room, isHost);

  // Load room data on mount
  useRoomData({
    roomId,
    user,
    setRoom,
    setIsHost,
    setCurrentQuestion,
    setPlayers,
    setError
  });

  // Set up realtime subscriptions
  useRealtimeSubscription({
    roomId,
    setRoom,
    setPlayers,
    setCurrentQuestion
  });

  // Wrapper functions to handle loading state
  const createRoom = async (theme: string, difficulty: string, questionCount: number = 10) => {
    setLoading(true);
    try {
      const result = await createRoomOperation(theme, difficulty, questionCount);
      if (result) {
        setRoom(result);
        setIsHost(true);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async (roomCode: string) => {
    setLoading(true);
    try {
      const success = await joinRoomOperation(roomCode);
      return success;
    } finally {
      setLoading(false);
    }
  };

  const leaveRoom = async () => {
    await leaveRoomOperation();
    setRoom(null);
    setPlayers([]);
    setIsHost(false);
    setCurrentQuestion(null);
  };

  return {
    room,
    players,
    isHost,
    currentQuestion,
    loading,
    error,
    createRoom,
    joinRoom,
    setPlayerReady,
    startQuiz,
    leaveRoom
  };
};
