
import { useCallback } from 'react';
import { updatePlayerReadyStatus } from './playerStatus';
import { exitRoom } from './roomExit';

export const usePlayerActions = (user: any, room: any) => {
  const setPlayerReady = useCallback(async (ready: boolean = true) => {
    if (!user?.id) {
      console.log('❌ No user available for player ready status');
      return;
    }
    await updatePlayerReadyStatus(user, room, ready);
  }, [user?.id, room?.id]); // Use primitive values

  const leaveRoom = useCallback(async () => {
    if (!user?.id) {
      console.log('❌ No user available for leaving room');
      return;
    }
    await exitRoom(user, room);
  }, [user?.id, room?.id]); // Use primitive values

  return { setPlayerReady, leaveRoom };
};
