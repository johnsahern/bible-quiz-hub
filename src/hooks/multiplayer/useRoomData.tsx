
import { useEffect } from 'react';
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
  useEffect(() => {
    if (!roomId || !user) return;

    const loadRoomData = async () => {
      try {
        // Charger la salle
        const { data: roomData, error: roomError } = await supabase
          .from('quiz_rooms')
          .select('*')
          .eq('id', roomId)
          .single();

        if (roomError) throw roomError;

        setRoom({
          ...roomData,
          status: roomData.status as RoomStatus,
          questions: Array.isArray(roomData.questions) ? roomData.questions : []
        });
        setIsHost(roomData.host_id === user.id);

        // Charger la question actuelle si le quiz est en cours
        if (roomData.status === 'playing' && roomData.questions && roomData.current_question !== null) {
          const questions = Array.isArray(roomData.questions) ? roomData.questions : [];
          if (questions.length > roomData.current_question) {
            setCurrentQuestion(questions[roomData.current_question] as unknown as QuizQuestion);
          }
        }

        // Charger les joueurs
        const { data: playersData, error: playersError } = await supabase
          .from('quiz_room_players')
          .select('*')
          .eq('room_id', roomId)
          .order('joined_at');

        if (playersError) throw playersError;

        setPlayers(playersData || []);
      } catch (err) {
        console.error('Erreur lors du chargement de la salle:', err);
        setError('Impossible de charger la salle');
      }
    };

    loadRoomData();
  }, [roomId, user, setRoom, setIsHost, setCurrentQuestion, setPlayers, setError]);
};
