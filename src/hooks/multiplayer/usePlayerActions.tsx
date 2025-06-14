
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const usePlayerActions = (user: any, room: any) => {
  const setPlayerReady = useCallback(async (ready: boolean = true) => {
    if (!user || !room) return;

    try {
      const { error } = await supabase
        .from('quiz_room_players')
        .update({ is_ready: ready })
        .eq('room_id', room.id)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre statut",
        variant: "destructive",
      });
    }
  }, [user, room]);

  const leaveRoom = useCallback(async () => {
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
  }, [user, room]);

  return { setPlayerReady, leaveRoom };
};
