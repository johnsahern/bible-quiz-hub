
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { RoomStatus } from '@/types/multiplayer';

export const useRoomOperations = (user: any) => {
  const createRoom = useCallback(async (theme: string, difficulty: string, questionCount: number = 10) => {
    if (!user) {
      console.log('❌ No user found');
      return null;
    }

    try {
      console.log('🚀 SIMPLE ROOM CREATION START');
      console.log('User:', user.id);
      
      // Générer le code de salle directement
      const { data: codeData, error: codeError } = await supabase.rpc('generate_room_code');
      
      if (codeError) {
        console.error('❌ Code generation failed:', codeError);
        throw new Error(`Code generation failed: ${codeError.message}`);
      }
      
      console.log('✅ Room code:', codeData);

      // Créer la salle directement
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

      // Ajouter l'hôte comme joueur avec une approche très simple
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      const username = profile?.username || `User-${user.id.slice(0, 6)}`;
      
      const playerData = {
        room_id: createdRoom.id,
        user_id: user.id,
        username: username,
        is_ready: true,
        score: 0,
        correct_answers: 0
      };

      console.log('👤 Adding host as player:', playerData);

      const { error: joinError } = await supabase
        .from('quiz_room_players')
        .insert(playerData);

      if (joinError) {
        console.error('❌ Host join failed:', joinError);
        // Ne pas faire échouer - la salle existe
        toast({
          title: "Salle créée",
          description: `Code: ${codeData} (rejoignez manuellement si besoin)`,
        });
      } else {
        console.log('✅ Host joined successfully');
        toast({
          title: "Salle créée !",
          description: `Code de la salle: ${codeData}`,
        });
      }

      console.log('🎉 ROOM CREATION COMPLETED');
      
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
  }, [user]);

  const joinRoom = useCallback(async (roomCode: string) => {
    if (!user) {
      console.log('❌ No user for join operation');
      return false;
    }

    try {
      console.log('🚪 SIMPLE JOIN PROCESS START');
      console.log('Room code:', roomCode, 'User ID:', user.id);
      
      // Chercher la salle
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

      // Vérifier le nombre de joueurs
      const { count } = await supabase
        .from('quiz_room_players')
        .select('*', { count: 'exact' })
        .eq('room_id', roomData.id);

      if (count && count >= roomData.max_players) {
        toast({
          title: "Salle pleine",
          description: "Nombre maximum de joueurs atteint",
          variant: "destructive",
        });
        return false;
      }

      // Récupérer le profil
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      const username = profile?.username || `Player-${user.id.slice(0, 6)}`;

      // Rejoindre la salle
      const { error: joinError } = await supabase
        .from('quiz_room_players')
        .insert({
          room_id: roomData.id,
          user_id: user.id,
          username: username,
          is_ready: false
        });

      if (joinError) {
        console.error('❌ Join failed:', joinError);
        if (joinError.code === '23505') {
          toast({
            title: "Déjà dans la salle",
            description: "Vous êtes déjà connecté à cette salle",
            variant: "destructive",
          });
        } else {
          throw joinError;
        }
        return false;
      }

      console.log('✅ Successfully joined room');
      toast({
        title: "Salle rejointe !",
        description: `Bienvenue dans la salle ${roomCode}`,
      });

      return true;
    } catch (err: any) {
      console.error('💥 Error joining room:', err);
      toast({
        title: "Erreur de connexion",
        description: err.message || "Impossible de rejoindre la salle",
        variant: "destructive",
      });
      return false;
    }
  }, [user]);

  return { createRoom, joinRoom };
};
