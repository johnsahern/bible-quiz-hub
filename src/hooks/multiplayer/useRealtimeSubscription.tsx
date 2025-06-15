
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
  const subscribedRoomIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Don't setup subscription if no roomId or if already subscribed to this room
    if (!roomId || subscribedRoomIdRef.current === roomId) {
      return;
    }

    // Clean up existing channel first
    if (channelRef.current) {
      console.log('Cleaning up existing realtime subscription');
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
      subscribedRoomIdRef.current = null;
    }

    console.log('Setting up realtime subscription for room:', roomId);

    // Create unique channel name to avoid conflicts
    const channelName = `room-${roomId}-${Date.now()}`;
    
    const roomChannel = supabase
      .channel(channelName)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'quiz_rooms', filter: `id=eq.${roomId}` },
        (payload) => {
          console.log('Room update received:', payload);
          if (payload.eventType === 'UPDATE') {
            const newRoom = payload.new as any;
            setRoom({
              ...newRoom,
              status: newRoom.status as RoomStatus,
              questions: Array.isArray(newRoom.questions) ? newRoom.questions : []
            });
            
            // Update current question
            if (newRoom.status === 'playing' && newRoom.questions && newRoom.current_question !== null) {
              const questions = Array.isArray(newRoom.questions) ? newRoom.questions : [];
              if (questions.length > newRoom.current_question) {
                console.log('Setting current question from realtime:', newRoom.current_question);
                setCurrentQuestion(questions[newRoom.current_question] as unknown as QuizQuestion);
              }
            }
          }
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'quiz_room_players', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('Players update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setPlayers(prev => {
              const exists = prev.find(p => p.id === payload.new.id);
              if (exists) return prev;
              return [...prev, payload.new as RoomPlayer];
            });
          } else if (payload.eventType === 'UPDATE') {
            setPlayers(prev => prev.map(p => 
              p.id === payload.new.id ? { ...p, ...payload.new } as RoomPlayer : p
            ));
          } else if (payload.eventType === 'DELETE') {
            setPlayers(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      );

    // Subscribe with proper error handling
    roomChannel.subscribe((status) => {
      console.log('Subscription status:', status);
      if (status === 'SUBSCRIBED') {
        subscribedRoomIdRef.current = roomId;
        channelRef.current = roomChannel;
      } else if (status === 'CHANNEL_ERROR') {
        console.error('Channel subscription error');
        subscribedRoomIdRef.current = null;
        channelRef.current = null;
      }
    });

    return () => {
      console.log('Cleaning up realtime subscription');
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        subscribedRoomIdRef.current = null;
      }
    };
  }, [roomId]); // Only depend on roomId
};
