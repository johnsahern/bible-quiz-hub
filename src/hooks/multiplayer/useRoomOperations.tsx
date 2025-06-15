
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { RoomStatus } from '@/types/multiplayer';

export const useRoomOperations = (user: any) => {
  const createRoom = useCallback(async (theme: string, difficulty: string, questionCount: number = 10) => {
    if (!user) return null;

    try {
      console.log('Creating room for user:', user.id);
      
      // Générer un code de salle
      const { data: codeData, error: codeError } = await supabase.rpc('generate_room_code');
      if (codeError) {
        console.error('Error generating room code:', codeError);
        throw codeError;
      }

      const roomCode = codeData;
      console.log('Generated room code:', roomCode);

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

      if (roomError) {
        console.error('Error creating room:', roomError);
        throw roomError;
      }

      console.log('Room created successfully:', roomData);

      // Récupérer le profil utilisateur AVANT de rejoindre
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        // Continuer avec un nom par défaut si le profil n'existe pas
      }

      console.log('User profile:', profile);

      // Rejoindre automatiquement en tant qu'hôte avec plus de logs
      const playerData = {
        room_id: roomData.id,
        user_id: user.id,
        username: profile?.username || 'Hôte',
        is_ready: true
      };

      console.log('Inserting player data:', playerData);

      const { error: joinError } = await supabase
        .from('quiz_room_players')
        .insert(playerData);

      if (joinError) {
        console.error('Error joining room as host:', joinError);
        // Ne pas faire échouer complètement si c'est juste le join qui pose problème
        console.warn('Room created but host could not join automatically');
      } else {
        console.log('Host joined room successfully');
      }

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
      console.log('Joining room with code:', roomCode, 'for user:', user.id);
      
      // Chercher la salle par code
      const { data: roomData, error: roomError } = await supabase
        .from('quiz_rooms')
        .select('*')
        .eq('room_code', roomCode.toUpperCase())
        .eq('status', 'waiting')
        .single();

      if (roomError || !roomData) {
        console.error('Room not found:', roomError);
        toast({
          title: "Salle introuvable",
          description: "Code de salle invalide ou salle déjà commencée",
          variant: "destructive",
        });
        return false;
      }

      console.log('Found room:', roomData);

      // Vérifier si la salle n'est pas pleine
      const { count } = await supabase
        .from('quiz_room_players')
        .select('*', { count: 'exact' })
        .eq('room_id', roomData.id);

      console.log('Current players count:', count);

      if (count && count >= roomData.max_players) {
        toast({
          title: "Salle pleine",
          description: "Cette salle a atteint le nombre maximum de joueurs",
          variant: "destructive",
        });
        return false;
      }

      // Récupérer le profil utilisateur
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile for join:', profileError);
      }

      console.log('User profile for join:', profile);

      // Rejoindre la salle
      const joinData = {
        room_id: roomData.id,
        user_id: user.id,
        username: profile?.username || 'Joueur'
      };

      console.log('Joining with data:', joinData);

      const { error: joinError } = await supabase
        .from('quiz_room_players')
        .insert(joinData);

      if (joinError) {
        console.error('Join error:', joinError);
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

      console.log('Successfully joined room');

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
