
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { createRoom as createRoomUtil } from './roomCreation';
import { joinRoom as joinRoomUtil, addPlayerToRoom } from './playerManagement';

export const useRoomOperations = (user: any) => {
  const createRoom = useCallback(async (theme: string, difficulty: string, questionCount: number = 10) => {
    if (!user?.id) {
      console.log('❌ No user available for room creation');
      return null;
    }

    console.log('🎯 Creating room with theme:', theme, 'difficulty:', difficulty);
    
    // Create the room
    const createdRoom = await createRoomUtil(user, theme, difficulty, questionCount);
    
    if (!createdRoom) {
      console.log('❌ Room creation failed');
      return null;
    }

    // Add host as player
    const hostAdded = await addPlayerToRoom(user, createdRoom.id, true);
    
    if (hostAdded) {
      toast({
        title: "Salle créée !",
        description: `Code de la salle: ${createdRoom.room_code}`,
      });
    } else {
      toast({
        title: "Salle créée",
        description: `Code: ${createdRoom.room_code} (rejoignez manuellement si besoin)`,
      });
    }

    console.log('🎉 ROOM CREATION COMPLETED');
    return createdRoom;
  }, [user?.id]); // Use user?.id instead of user object

  const joinRoom = useCallback(async (roomCode: string) => {
    if (!user?.id) {
      console.log('❌ No user available for joining room');
      return false;
    }
    return await joinRoomUtil(user, roomCode);
  }, [user?.id]); // Use user?.id instead of user object

  return { createRoom, joinRoom };
};
