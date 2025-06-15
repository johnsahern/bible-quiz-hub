
import { useState, useCallback, useMemo } from 'react';
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

  console.log('useMultiplayerRoom hook called:', { roomId, userId: user?.id, hookCallCount: Date.now() });

  // Memoize the operations to prevent recreating functions
  const { createRoom: createRoomOperation, joinRoom: joinRoomOperation } = useMemo(
    () => useRoomOperations(user),
    [user?.id]
  );
  
  const { setPlayerReady, leaveRoom: leaveRoomOperation } = useMemo(
    () => usePlayerActions(user, room),
    [user?.id, room?.id]
  );
  
  const { startQuiz } = useMemo(
    () => useQuizOperations(user, room, isHost),
    [user?.id, room?.id, isHost]
  );

  // Load room data on mount - only once per roomId/user combination
  useRoomData({
    roomId,
    user,
    setRoom,
    setIsHost,
    setCurrentQuestion,
    setPlayers,
    setError
  });

  // Set up realtime subscriptions - memoized callbacks
  const memoizedSetRoom = useCallback(setRoom, []);
  const memoizedSetPlayers = useCallback(setPlayers, []);
  const memoizedSetCurrentQuestion = useCallback(setCurrentQuestion, []);

  useRealtimeSubscription({
    roomId,
    setRoom: memoizedSetRoom,
    setPlayers: memoizedSetPlayers,
    setCurrentQuestion: memoizedSetCurrentQuestion
  });

  // Wrapper functions with useCallback to prevent recreating
  const createRoom = useCallback(async (theme: string, difficulty: string, questionCount: number = 10) => {
    console.log('Creating room with params:', { theme, difficulty, questionCount });
    setLoading(true);
    setError(null);
    
    try {
      const result = await createRoomOperation(theme, difficulty, questionCount);
      console.log('Room creation result:', result);
      
      if (result) {
        setRoom(result);
        setIsHost(true);
        console.log('Room set successfully, isHost=true');
      }
      return result;
    } catch (err) {
      console.error('Error in createRoom wrapper:', err);
      setError('Erreur lors de la création de la salle');
      return null;
    } finally {
      setLoading(false);
    }
  }, [createRoomOperation]);

  const joinRoom = useCallback(async (roomCode: string) => {
    console.log('Joining room with code:', roomCode);
    setLoading(true);
    setError(null);
    
    try {
      const success = await joinRoomOperation(roomCode);
      console.log('Join room result:', success);
      return success;
    } catch (err) {
      console.error('Error in joinRoom wrapper:', err);
      setError('Erreur lors de la connexion à la salle');
      return false;
    } finally {
      setLoading(false);
    }
  }, [joinRoomOperation]);

  const leaveRoom = useCallback(async () => {
    console.log('Leaving room');
    try {
      await leaveRoomOperation();
      setRoom(null);
      setPlayers([]);
      setIsHost(false);
      setCurrentQuestion(null);
      setError(null);
      console.log('Room left successfully');
    } catch (err) {
      console.error('Error leaving room:', err);
    }
  }, [leaveRoomOperation]);

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
