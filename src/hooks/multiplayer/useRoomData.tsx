
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuizQuestion } from '@/types/quiz';
import { RoomStatus, RoomPlayer } from '@/types/multiplayer';

interface UseRoomDataProps {
  roomId?: string;
  userId?: string;
  setRoom: (room: any) => void;
  setIsHost: (isHost: boolean) => void;
  setCurrentQuestion: (question: QuizQuestion | null) => void;
  setPlayers: React.Dispatch<React.SetStateAction<RoomPlayer[]>>;
  setError: (error: string | null) => void;
  onInitialized?: () => void;
}

export const useRoomData = ({
  roomId,
  userId,
  setRoom,
  setIsHost,
  setCurrentQuestion,
  setPlayers,
  setError,
  onInitialized
}: UseRoomDataProps) => {
  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    // Early return if no roomId or userId, or already loaded
    if (!roomId || !userId || hasLoadedRef.current || isLoadingRef.current) {
      return;
    }

    const loadRoomData = async () => {
      isLoadingRef.current = true;
      hasLoadedRef.current = true;

      try {
        console.log('Loading room data for room:', roomId);
        
        // Load room data
        const { data: roomData, error: roomError } = await supabase
          .from('quiz_rooms')
          .select('*')
          .eq('id', roomId)
          .single();

        if (roomError) {
          console.error('Room loading error:', roomError);
          throw roomError;
        }

        if (!roomData) {
          setError('Salle introuvable');
          return;
        }

        console.log('Room data loaded:', roomData);

        setRoom({
          ...roomData,
          status: roomData.status as RoomStatus,
          questions: Array.isArray(roomData.questions) ? roomData.questions : []
        });
        setIsHost(roomData.host_id === userId);

        // Load current question if quiz is playing
        if (roomData.status === 'playing' && roomData.questions && roomData.current_question !== null) {
          const questions = Array.isArray(roomData.questions) ? roomData.questions : [];
          if (questions.length > roomData.current_question) {
            console.log('Setting current question:', roomData.current_question);
            setCurrentQuestion(questions[roomData.current_question] as unknown as QuizQuestion);
          }
        }

        // Load players
        console.log('Loading players for room:', roomId);
        const { data: playersData, error: playersError } = await supabase
          .from('quiz_room_players')
          .select('*')
          .eq('room_id', roomId)
          .order('joined_at');

        if (playersError) {
          console.error('Players loading error:', playersError);
          throw playersError;
        }

        console.log('Players data loaded:', playersData);
        setPlayers(playersData || []);
        
        // Clear any previous errors
        setError(null);
        
        // Notify initialization complete
        onInitialized?.();
        
      } catch (err) {
        console.error('Erreur lors du chargement de la salle:', err);
        setError('Impossible de charger la salle');
        hasLoadedRef.current = false; // Reset on error
      } finally {
        isLoadingRef.current = false;
      }
    };

    loadRoomData();

    // Cleanup function to reset state if roomId changes
    return () => {
      if (hasLoadedRef.current) {
        hasLoadedRef.current = false;
      }
    };
  }, [roomId, userId]); // Only depend on roomId and userId
};
