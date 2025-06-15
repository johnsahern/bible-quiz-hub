
import { useState, useCallback, useRef } from 'react';
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
  
  // Use ref to track if operations have been created to prevent recreating
  const operationsRef = useRef<any>(null);

  // Create operations only once
  if (!operationsRef.current && user) {
    operationsRef.current = {
      roomOperations: useRoomOperations(user),
      playerActions: usePlayerActions(user, room),
      quizOperations: useQuizOperations(user, room, isHost)
    };
  }

  console.log('useMultiplayerRoom hook called:', { roomId, userId: user?.id, hookCallCount: Date.now() });

  // Load room data on mount - seulement si roomId est fourni
  useRoomData({
    roomId,
    user,
    setRoom,
    setIsHost,
    setCurrentQuestion,
    setPlayers,
    setError
  });

  // Set up realtime subscriptions - seulement si roomId est fourni  
  useRealtimeSubscription({
    roomId,
    setRoom,
    setPlayers,
    setCurrentQuestion
  });

  // Wrapper functions with useCallback to prevent recreating
  const createRoom = useCallback(async (theme: string, difficulty: string, questionCount: number = 10) => {
    console.log('Creating room with params:', { theme, difficulty, questionCount });
    setLoading(true);
    setError(null);
    
    try {
      const result = await operationsRef.current?.roomOperations?.createRoom(theme, difficulty, questionCount);
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
  }, []);

  const joinRoom = useCallback(async (roomCode: string) => {
    console.log('Joining room with code:', roomCode);
    setLoading(true);
    setError(null);
    
    try {
      const success = await operationsRef.current?.roomOperations?.joinRoom(roomCode);
      console.log('Join room result:', success);
      return success;
    } catch (err) {
      console.error('Error in joinRoom wrapper:', err);
      setError('Erreur lors de la connexion à la salle');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const leaveRoom = useCallback(async () => {
    console.log('Leaving room');
    try {
      await operationsRef.current?.playerActions?.leaveRoom();
      setRoom(null);
      setPlayers([]);
      setIsHost(false);
      setCurrentQuestion(null);
      setError(null);
      console.log('Room left successfully');
    } catch (err) {
      console.error('Error leaving room:', err);
    }
  }, []);

  const setPlayerReady = useCallback(async (ready: boolean = true) => {
    await operationsRef.current?.playerActions?.setPlayerReady(ready);
  }, []);

  const startQuiz = useCallback(async () => {
    await operationsRef.current?.quizOperations?.startQuiz();
  }, []);

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
