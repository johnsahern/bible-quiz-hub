
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseHeartbeatProps {
  roomId?: string;
  userId?: string;
  onResync: () => void;
}

export const useHeartbeat = ({ roomId, userId, onResync }: UseHeartbeatProps) => {
  const heartbeatRef = useRef<NodeJS.Timeout>();
  const lastSyncRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!roomId || !userId) return;

    // Heartbeat toutes les 5 secondes pour maintenir la connexion
    heartbeatRef.current = setInterval(async () => {
      try {
        // Ping pour maintenir la connexion active
        const { error } = await supabase
          .from('quiz_room_players')
          .select('id')
          .eq('room_id', roomId)
          .eq('user_id', userId)
          .limit(1);

        if (error) {
          console.error('Heartbeat error:', error);
          return;
        }

        // Vérifier si on doit re-synchroniser (plus de 10 secondes sans sync)
        const now = Date.now();
        if (now - lastSyncRef.current > 10000) {
          console.log('🔄 Triggering resync due to timeout');
          onResync();
          lastSyncRef.current = now;
        }
      } catch (err) {
        console.error('Heartbeat failed:', err);
      }
    }, 5000);

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
    };
  }, [roomId, userId, onResync]);

  // Marquer la dernière synchronisation
  const markSync = () => {
    lastSyncRef.current = Date.now();
  };

  return { markSync };
};
