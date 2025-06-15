
import { useCallback } from 'react';
import { updatePlayerReadyStatus } from './playerStatus';
import { exitRoom } from './roomExit';

export const usePlayerActions = (user: any, room: any) => {
  const setPlayerReady = useCallback(async (ready: boolean = true) => {
    await updatePlayerReadyStatus(user, room, ready);
  }, [user, room]);

  const leaveRoom = useCallback(async () => {
    await exitRoom(user, room);
  }, [user, room]);

  return { setPlayerReady, leaveRoom };
};
