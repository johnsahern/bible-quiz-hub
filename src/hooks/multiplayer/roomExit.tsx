
import { supabase } from '@/integrations/supabase/client';

export const exitRoom = async (user: any, room: any) => {
  if (!user || !room) return;

  try {
    await supabase
      .from('quiz_room_players')
      .delete()
      .eq('room_id', room.id)
      .eq('user_id', user.id);
  } catch (err) {
    console.error('Erreur lors de la sortie de la salle:', err);
  }
};
