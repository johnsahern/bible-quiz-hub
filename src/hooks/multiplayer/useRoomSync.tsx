
import { useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';
import { QuizQuestion } from '@/types/quiz';

interface UseRoomSyncProps {
  roomId?: string;
  setRoom: (room: any) => void;
  setPlayers: React.Dispatch<React.SetStateAction<RoomPlayer[]>>;
  setCurrentQuestion: (question: QuizQuestion | null) => void;
}

export const useRoomSync = ({
  roomId,
  setRoom,
  setPlayers,
  setCurrentQuestion
}: UseRoomSyncProps) => {
  const syncingRef = useRef<boolean>(false);

  const forceResync = useCallback(async () => {
    if (!roomId || syncingRef.current) return;
    
    syncingRef.current = true;
    console.log('🔄 Force resyncing room data...');

    try {
      // Re-charger les données de la salle
      const { data: roomData, error: roomError } = await supabase
        .from('quiz_rooms')
        .select('*')
        .eq('id', roomId)
        .single();

      if (roomError) throw roomError;

      if (roomData) {
        console.log('🔄 Room data resynced:', roomData);
        setRoom({
          ...roomData,
          status: roomData.status,
          questions: Array.isArray(roomData.questions) ? roomData.questions : []
        });

        // Mettre à jour la question actuelle
        if (roomData.status === 'playing' && roomData.questions && roomData.current_question !== null) {
          const questions = Array.isArray(roomData.questions) ? roomData.questions : [];
          if (questions.length > roomData.current_question) {
            setCurrentQuestion(questions[roomData.current_question] as unknown as QuizQuestion);
          }
        }
      }

      // Re-charger les joueurs
      const { data: playersData, error: playersError } = await supabase
        .from('quiz_room_players')
        .select('*')
        .eq('room_id', roomId)
        .order('joined_at');

      if (playersError) throw playersError;

      if (playersData) {
        console.log('🔄 Players data resynced:', playersData);
        setPlayers(playersData);
      }

    } catch (error) {
      console.error('❌ Resync failed:', error);
    } finally {
      syncingRef.current = false;
    }
  }, [roomId, setRoom, setPlayers, setCurrentQuestion]);

  return { forceResync };
};
