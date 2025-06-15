
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuizQuestion } from '@/types/quiz';
import { RoomStatus, RoomPlayer } from '@/types/multiplayer';

interface UseRealtimeSubscriptionProps {
  roomId?: string;
  setRoom: (room: any) => void;
  setPlayers: React.Dispatch<React.SetStateAction<RoomPlayer[]>>;
  setCurrentQuestion: (question: QuizQuestion | null) => void;
}

export const useRealtimeSubscription = ({
  roomId,
  setRoom,
  setPlayers,
  setCurrentQuestion
}: UseRealtimeSubscriptionProps) => {
  const channelRef = useRef<any>(null);
  const isSubscribedRef = useRef(false);
  const currentRoomIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!roomId) {
      // Clean up if no roomId
      if (channelRef.current) {
        console.log('Cleaning up subscription - no roomId');
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        isSubscribedRef.current = false;
        currentRoomIdRef.current = null;
      }
      return;
    }

    // Skip if already subscribed to the same room
    if (isSubscribedRef.current && currentRoomIdRef.current === roomId) {
      console.log('Already subscribed to room:', roomId);
      return;
    }

    // Clean up existing channel first
    if (channelRef.current) {
      console.log('Cleaning up existing channel');
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
      isSubscribedRef.current = false;
    }

    console.log('Setting up realtime subscription for room:', roomId);

    const roomChannel = supabase
      .channel(`room-${roomId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'quiz_rooms', filter: `id=eq.${roomId}` },
        (payload) => {
          console.log('Room update:', payload);
          if (payload.eventType === 'UPDATE') {
            const newRoom = payload.new as any;
            setRoom({
              ...newRoom,
              status: newRoom.status as RoomStatus,
              questions: Array.isArray(newRoom.questions) ? newRoom.questions : []
            });
            
            // Mettre à jour la question actuelle
            if (newRoom.status === 'playing' && newRoom.questions && newRoom.current_question !== null) {
              const questions = Array.isArray(newRoom.questions) ? newRoom.questions : [];
              if (questions.length > newRoom.current_question) {
                setCurrentQuestion(questions[newRoom.current_question] as unknown as QuizQuestion);
              }
            }
          }
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'quiz_room_players', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('Players update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setPlayers(prev => [...prev, payload.new as RoomPlayer]);
          } else if (payload.eventType === 'UPDATE') {
            setPlayers(prev => prev.map(p => 
              p.id === payload.new.id ? payload.new as RoomPlayer : p
            ));
          } else if (payload.eventType === 'DELETE') {
            setPlayers(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      );

    // Subscribe and store reference
    roomChannel.subscribe((status) => {
      console.log('Subscription status:', status);
      if (status === 'SUBSCRIBED') {
        isSubscribedRef.current = true;
        currentRoomIdRef.current = roomId;
      }
    });
    
    channelRef.current = roomChannel;

    return () => {
      console.log('Cleaning up subscription');
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        isSubscribedRef.current = false;
        currentRoomIdRef.current = null;
      }
    };
  }, [roomId]); // Only depend on roomId to avoid re-subscriptions
};
