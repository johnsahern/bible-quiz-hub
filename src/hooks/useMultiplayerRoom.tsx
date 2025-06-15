
import { useState, useCallback, useRef, useEffect } from 'react';
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Track if we're currently processing to prevent duplicate operations
  const processingRef = useRef(false);
  const lastRoomIdRef = useRef<string | null>(null);
  const lastUserIdRef = useRef<string | null>(null);

  // Only initialize when we have both roomId and user, and haven't initialized yet
  const shouldInitialize = Boolean(
    roomId && 
    user?.id && 
    !isInitialized && 
    !processingRef.current &&
    (lastRoomIdRef.current !== roomId || lastUserIdRef.current !== user.id)
  );

  // Update refs when values change
  useEffect(() => {
    if (roomId) lastRoomIdRef.current = roomId;
    if (user?.id) lastUserIdRef.current = user.id;
  }, [roomId, user?.id]);

  // Create operations with stable values
  const roomOperations = useRoomOperations(user?.id);
  const playerActions = usePlayerActions(user?.id, roomId);
  const quizOperations = useQuizOperations(user?.id, roomId, isHost);

  // Load room data only once when conditions are met
  useRoomData({
    roomId: shouldInitialize ? roomId : undefined,
    userId: shouldInitialize ? user?.id : undefined,
    setRoom,
    setIsHost,
    setCurrentQuestion,
    setPlayers,
    setError,
    onInitialized: () => {
      setIsInitialized(true);
      processingRef.current = false;
    }
  });

  // Set up realtime subscriptions only after initialization
  useRealtimeSubscription({
    roomId: isInitialized ? roomId : undefined,
    setRoom,
    setPlayers,
    setCurrentQuestion
  });

  const createRoom = useCallback(async (theme: string, difficulty: string, questionCount: number = 10) => {
    if (processingRef.current) return null;
    
    console.log('Creating room with params:', { theme, difficulty, questionCount });
    setLoading(true);
    setError(null);
    processingRef.current = true;
    
    try {
      const result = await roomOperations.createRoom(theme, difficulty, questionCount);
      console.log('Room creation result:', result);
      
      if (result) {
        setRoom(result);
        setIsHost(true);
        setIsInitialized(true);
        console.log('Room set successfully, isHost=true');
      }
      return result;
    } catch (err) {
      console.error('Error in createRoom wrapper:', err);
      setError('Erreur lors de la création de la salle');
      return null;
    } finally {
      setLoading(false);
      processingRef.current = false;
    }
  }, [roomOperations]);

  const joinRoom = useCallback(async (roomCode: string) => {
    if (processingRef.current) return false;
    
    console.log('Joining room with code:', roomCode);
    setLoading(true);
    setError(null);
    processingRef.current = true;
    
    try {
      const success = await roomOperations.joinRoom(roomCode);
      console.log('Join room result:', success);
      return success;
    } catch (err) {
      console.error('Error in joinRoom wrapper:', err);
      setError('Erreur lors de la connexion à la salle');
      return false;
    } finally {
      setLoading(false);
      processingRef.current = false;
    }
  }, [roomOperations]);

  const leaveRoom = useCallback(async () => {
    console.log('Leaving room');
    try {
      await playerActions.leaveRoom();
      setRoom(null);
      setPlayers([]);
      setIsHost(false);
      setCurrentQuestion(null);
      setError(null);
      setIsInitialized(false);
      processingRef.current = false;
      lastRoomIdRef.current = null;
      lastUserIdRef.current = null;
      console.log('Room left successfully');
    } catch (err) {
      console.error('Error leaving room:', err);
    }
  }, [playerActions]);

  const setPlayerReady = useCallback(async (ready: boolean = true) => {
    await playerActions.setPlayerReady(ready);
  }, [playerActions]);

  const startQuiz = useCallback(async () => {
    await quizOperations.startQuiz();
  }, [quizOperations]);

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
