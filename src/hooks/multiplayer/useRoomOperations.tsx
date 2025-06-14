
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { RoomStatus } from '@/types/multiplayer';

export const useRoomOperations = (user: any) => {
  const createRoom = useCallback(async (theme: string, difficulty: string, questionCount: number = 10) => {
    if (!user) return null;

    try {
      // Générer un code de salle
      const { data: codeData, error: codeError } = await supabase.rpc('generate_room_code');
      if (codeError) throw codeError;

      const roomCode = codeData;

      // Créer la salle
      const { data: roomData, error: roomError } = await supabase
        .from('quiz_rooms')
        .insert({
          room_code: roomCode,
          host_id: user.id,
          theme,
          difficulty,
          question_count: questionCount,
          status: 'waiting'
        })
        .select()
        .single();

      if (roomError) throw roomError;

      // Rejoindre automatiquement en tant qu'hôte
      const profile = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      await supabase
        .from('quiz_room_players')
        .insert({
          room_id: roomData.id,
          user_id: user.id,
          username: profile.data?.username || 'Hôte',
          is_ready: true
        });

      toast({
        title: "Salle créée !",
        description: `Code de la salle: ${roomCode}`,
      });

      return {
        ...roomData,
        status: roomData.status as RoomStatus,
        questions: Array.isArray(roomData.questions) ? roomData.questions : []
      };
    } catch (err) {
      console.error('Erreur lors de la création de la salle:', err);
      toast({
        title: "Erreur",
        description: "Impossible de créer la salle",
        variant: "destructive",
      });
      return null;
    }
  }, [user]);

  const joinRoom = useCallback(async (roomCode: string) => {
    if (!user) return false;

    try {
      // Chercher la salle par code
      const { data: roomData, error: roomError } = await supabase
        .from('quiz_rooms')
        .select('*')
        .eq('room_code', roomCode.toUpperCase())
        .eq('status', 'waiting')
        .single();

      if (roomError || !roomData) {
        toast({
          title: "Salle introuvable",
          description: "Code de salle invalide ou salle déjà commencée",
          variant: "destructive",
        });
        return false;
      }

      // Vérifier si la salle n'est pas pleine
      const { count } = await supabase
        .from('quiz_room_players')
        .select('*', { count: 'exact' })
        .eq('room_id', roomData.id);

      if (count && count >= roomData.max_players) {
        toast({
          title: "Salle pleine",
          description: "Cette salle a atteint le nombre maximum de joueurs",
          variant: "destructive",
        });
        return false;
      }

      // Récupérer le profil utilisateur
      const profile = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      // Rejoindre la salle
      const { error: joinError } = await supabase
        .from('quiz_room_players')
        .insert({
          room_id: roomData.id,
          user_id: user.id,
          username: profile.data?.username || 'Joueur'
        });

      if (joinError) {
        if (joinError.code === '23505') {
          toast({
            title: "Déjà dans la salle",
            description: "Vous êtes déjà dans cette salle",
            variant: "destructive",
          });
        } else {
          throw joinError;
        }
        return false;
      }

      toast({
        title: "Salle rejointe !",
        description: `Bienvenue dans la salle ${roomCode}`,
      });

      return true;
    } catch (err) {
      console.error('Erreur lors de la connexion à la salle:', err);
      toast({
        title: "Erreur",
        description: "Impossible de rejoindre la salle",
        variant: "destructive",
      });
      return false;
    }
  }, [user]);

  return { createRoom, joinRoom };
};
