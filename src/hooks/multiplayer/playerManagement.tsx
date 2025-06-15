
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const addPlayerToRoom = async (user: any, roomId: string, isHost: boolean = false) => {
  if (!user) {
    console.log('❌ No user for player addition');
    return false;
  }

  try {
    console.log('👤 Adding player to room:', roomId);

    // First check if player is already in room
    const { data: existingPlayer } = await supabase
      .from('quiz_room_players')
      .select('id')
      .eq('room_id', roomId)
      .eq('user_id', user.id)
      .single();

    if (existingPlayer) {
      console.log('ℹ️ Player already in room');
      return true; // Already in room is not an error
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    const username = profile?.username || `User-${user.id.slice(0, 6)}`;
    
    const playerData = {
      room_id: roomId,
      user_id: user.id,
      username: username,
      is_ready: isHost,
      score: 0,
      correct_answers: 0
    };

    console.log('👤 Player data:', playerData);

    const { error: joinError } = await supabase
      .from('quiz_room_players')
      .insert(playerData);

    if (joinError) {
      console.error('❌ Player addition failed:', joinError);
      if (joinError.code === '23505') {
        console.log('ℹ️ Player already in room');
        return true; // Already in room is not an error
      }
      throw joinError;
    }

    console.log('✅ Player added successfully');
    return true;

  } catch (err: any) {
    console.error('💥 Error adding player:', err);
    return false;
  }
};

export const joinRoom = async (user: any, roomCode: string) => {
  if (!user) {
    console.log('❌ No user for join operation');
    return false;
  }

  try {
    console.log('🚪 JOIN PROCESS START');
    console.log('Room code:', roomCode, 'User ID:', user.id);
    
    // Find room
    const { data: roomData, error: roomError } = await supabase
      .from('quiz_rooms')
      .select('*')
      .eq('room_code', roomCode.toUpperCase())
      .eq('status', 'waiting')
      .single();

    if (roomError || !roomData) {
      console.error('❌ Room not found:', roomError);
      toast({
        title: "Salle introuvable",
        description: "Code invalide ou salle déjà commencée",
        variant: "destructive",
      });
      return false;
    }

    console.log('✅ Room found:', roomData.id);

    // Check player count
    const { count } = await supabase
      .from('quiz_room_players')
      .select('*', { count: 'exact', head: true })
      .eq('room_id', roomData.id);

    if (count && count >= roomData.max_players) {
      toast({
        title: "Salle pleine",
        description: "Nombre maximum de joueurs atteint",
        variant: "destructive",
      });
      return false;
    }

    // Add player to room
    const success = await addPlayerToRoom(user, roomData.id, false);
    
    if (success) {
      toast({
        title: "Salle rejointe !",
        description: `Bienvenue dans la salle ${roomCode}`,
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de rejoindre la salle",
        variant: "destructive",
      });
    }

    return success;
  } catch (err: any) {
    console.error('💥 Error joining room:', err);
    toast({
      title: "Erreur de connexion",
      description: err.message || "Impossible de rejoindre la salle",
      variant: "destructive",
    });
    return false;
  }
};
