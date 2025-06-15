
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuizQuestion } from '@/types/quiz';
import { RoomStatus, RoomPlayer } from '@/types/multiplayer';

interface UseRoomDataProps {
  roomId?: string;
  user: any;
  setRoom: (room: any) => void;
  setIsHost: (isHost: boolean) => void;
  setCurrentQuestion: (question: QuizQuestion | null) => void;
  setPlayers: React.Dispatch<React.SetStateAction<RoomPlayer[]>>;
  setError: (error: string | null) => void;
}

export const useRoomData = ({
  roomId,
  user,
  setRoom,
  setIsHost,
  setCurrentQuestion,
  setPlayers,
  setError
}: UseRoomDataProps) => {
  const isLoadingRef = useRef(false);
  const lastLoadedRoomId = useRef<string | null>(null);
  const userId = user?.id;

  useEffect(() => {
    // Early return if no roomId or user
    if (!roomId || !userId) {
      console.log('Missing roomId or user for useRoomData:', { roomId, userId });
      return;
    }

    // Skip if already loaded this room
    if (lastLoadedRoomId.current === roomId) {
      console.log('Skipping duplicate room data load for:', roomId);
      return;
    }

    // Skip if already loading
    if (isLoadingRef.current) {
      console.log('Already loading room data, skipping...');
      return;
    }

    const loadRoomData = async () => {
      isLoadingRef.current = true;
      lastLoadedRoomId.current = roomId;

      try {
        console.log('Loading room data for room:', roomId);
        
        // Charger la salle
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

        // Charger la question actuelle si le quiz est en cours
        if (roomData.status === 'playing' && roomData.questions && roomData.current_question !== null) {
          const questions = Array.isArray(roomData.questions) ? roomData.questions : [];
          if (questions.length > roomData.current_question) {
            setCurrentQuestion(questions[roomData.current_question] as unknown as QuizQuestion);
          }
        }

        // Charger les joueurs
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
        
      } catch (err) {
        console.error('Erreur lors du chargement de la salle:', err);
        setError('Impossible de charger la salle');
      } finally {
        isLoadingRef.current = false;
      }
    };

    loadRoomData();
  }, [roomId, userId]); // Only depend on primitive values
};
