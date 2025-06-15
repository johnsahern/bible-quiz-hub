
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { RoomStatus } from '@/types/multiplayer';

export const createRoom = async (user: any, theme: string, difficulty: string, questionCount: number = 10) => {
  if (!user) {
    console.log('❌ No user found');
    return null;
  }

  try {
    console.log('🚀 ROOM CREATION START');
    console.log('User:', user.id);
    
    // Generate room code
    const { data: codeData, error: codeError } = await supabase.rpc('generate_room_code');
    
    if (codeError) {
      console.error('❌ Code generation failed:', codeError);
      throw new Error(`Code generation failed: ${codeError.message}`);
    }
    
    console.log('✅ Room code:', codeData);

    // Create room
    const roomData = {
      room_code: codeData,
      host_id: user.id,
      theme,
      difficulty,
      question_count: questionCount,
      status: 'waiting' as const,
      max_players: 8
    };
    
    console.log('📝 Creating room with data:', roomData);
    
    const { data: createdRoom, error: roomError } = await supabase
      .from('quiz_rooms')
      .insert(roomData)
      .select()
      .single();

    if (roomError) {
      console.error('❌ Room creation failed:', roomError);
      throw new Error(`Room creation failed: ${roomError.message}`);
    }

    console.log('✅ Room created:', createdRoom.id);
    return {
      ...createdRoom,
      status: createdRoom.status as RoomStatus,
      questions: Array.isArray(createdRoom.questions) ? createdRoom.questions : []
    };

  } catch (err: any) {
    console.error('💥 CREATION ERROR:', err);
    
    toast({
      title: "Erreur de création",
      description: err.message || "Impossible de créer la salle",
      variant: "destructive",
    });
    return null;
  }
};
