
import { useCallback } from 'react';
import { updatePlayerReadyStatus } from './playerStatus';
import { exitRoom } from './roomExit';

export const usePlayerActions = (user: any, room: any) => {
  const userId = user?.id || null;
  const roomId = room?.id || null;

  const setPlayerReady = useCallback(async (ready: boolean = true) => {
    if (!userId) {
      console.log('❌ No user available for player ready status');
      return;
    }
    await updatePlayerReadyStatus(user, room, ready);
  }, [userId, roomId, user, room]);

  const leaveRoom = useCallback(async () => {
    if (!userId) {
      console.log('❌ No user available for leaving room');
      return;
    }
    await exitRoom(user, room);
  }, [userId, roomId, user, room]);

  return { setPlayerReady, leaveRoom };
};
