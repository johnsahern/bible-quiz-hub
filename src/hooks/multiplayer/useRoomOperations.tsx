
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
      console.log('🔥 STARTING ROOM CREATION PROCESS');
      console.log('User ID:', user.id);
      console.log('Theme:', theme, 'Difficulty:', difficulty, 'Questions:', questionCount);
      
      // Étape 1: Test de connexion simple
      console.log('📡 Testing basic connection...');
      const { data: testData, error: testError } = await supabase
        .from('quiz_rooms')
        .select('count(*)')
        .limit(1);
      
      if (testError) {
        console.error('❌ Basic connection test failed:', testError);
        throw new Error(`Connection test failed: ${testError.message}`);
      }
      console.log('✅ Basic connection works:', testData);

      // Étape 2: Générer le code de salle
      console.log('🎲 Generating room code...');
      const { data: codeData, error: codeError } = await supabase.rpc('generate_room_code');
      
      if (codeError) {
        console.error('❌ Room code generation failed:', codeError);
        throw new Error(`Code generation failed: ${codeError.message}`);
      }
      
      const roomCode = codeData;
      console.log('✅ Room code generated:', roomCode);

      // Étape 3: Créer la salle SANS l'hôte d'abord
      console.log('🏠 Creating room...');
      const roomData = {
        room_code: roomCode,
        host_id: user.id,
        theme,
        difficulty,
        question_count: questionCount,
        status: 'waiting' as const,
        max_players: 8
      };
      
      console.log('📝 Room data to insert:', roomData);
      
      const { data: createdRoom, error: roomError } = await supabase
        .from('quiz_rooms')
        .insert(roomData)
        .select()
        .single();

      if (roomError) {
        console.error('❌ Room creation failed:', roomError);
        throw new Error(`Room creation failed: ${roomError.message}`);
      }

      console.log('✅ Room created successfully:', createdRoom);

      // Étape 4: Récupérer le profil utilisateur
      console.log('👤 Fetching user profile...');
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.warn('⚠️ Profile fetch error (continuing with default):', profileError);
      }

      const username = profile?.username || `User-${user.id.slice(0, 6)}`;
      console.log('✅ Username resolved:', username);

      // Étape 5: Ajouter l'hôte comme joueur SÉPARÉMENT
      console.log('🎮 Adding host as player...');
      const playerData = {
        room_id: createdRoom.id,
        user_id: user.id,
        username: username,
        is_ready: true,
        score: 0,
        correct_answers: 0
      };

      console.log('📝 Player data to insert:', playerData);

      // Test d'insertion avec gestion d'erreur détaillée
      const { data: playerResult, error: joinError } = await supabase
        .from('quiz_room_players')
        .insert(playerData)
        .select()
        .single();

      if (joinError) {
        console.error('❌ CRITICAL: Host join failed:', {
          error: joinError,
          code: joinError.code,
          message: joinError.message,
          details: joinError.details,
          hint: joinError.hint
        });
        
        // Ne pas faire échouer complètement - la salle existe déjà
        console.warn('⚠️ Room created but host could not join automatically');
        toast({
          title: "Salle créée avec avertissement",
          description: `Salle ${roomCode} créée mais problème de connexion automatique`,
          variant: "destructive"
        });
      } else {
        console.log('✅ Host joined successfully:', playerResult);
        toast({
          title: "Salle créée !",
          description: `Code de la salle: ${roomCode}`,
        });
      }

      console.log('🎉 ROOM CREATION PROCESS COMPLETED');
      
      return {
        ...createdRoom,
        status: createdRoom.status as RoomStatus,
        questions: Array.isArray(createdRoom.questions) ? createdRoom.questions : []
      };

    } catch (err: any) {
      console.error('💥 FATAL ERROR in room creation:', {
        error: err,
        message: err.message,
        stack: err.stack
      });
      
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
      console.log('🚪 STARTING JOIN ROOM PROCESS');
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

      console.log('✅ Room found:', roomData);

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
        .maybeSingle();

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
