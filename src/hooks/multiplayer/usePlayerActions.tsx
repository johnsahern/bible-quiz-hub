
import { useCallback } from 'react';
import { updatePlayerReadyStatus } from './playerStatus';
import { exitRoom } from './roomExit';
import { useAuth } from '@/contexts/AuthContext';

export const usePlayerActions = (userId?: string, roomId?: string) => {
  const { user } = useAuth();

  const setPlayerReady = useCallback(async (ready: boolean = true) => {
    if (!userId || !user || !roomId) {
      console.log('❌ No user or room available for player ready status');
      return;
    }
    await updatePlayerReadyStatus(user, { id: roomId }, ready);
  }, [userId, user, roomId]);

  const leaveRoom = useCallback(async () => {
    if (!userId || !user || !roomId) {
      console.log('❌ No user or room available for leaving room');
      return;
    }
    await exitRoom(user, { id: roomId });
  }, [userId, user, roomId]);

  return { setPlayerReady, leaveRoom };
};
