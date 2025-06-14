
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { QuizRoom, RoomPlayer, RoomStatus } from '@/types/multiplayer';
import { QuizQuestion } from '@/types/quiz';
import { toast } from '@/hooks/use-toast';

export const useMultiplayerRoom = (roomId?: string) => {
  const { user } = useAuth();
  const [room, setRoom] = useState<QuizRoom | null>(null);
  const [players, setPlayers] = useState<RoomPlayer[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Créer une nouvelle salle
  const createRoom = useCallback(async (theme: string, difficulty: string, questionCount: number = 10) => {
    if (!user) return null;

    setLoading(true);
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

      setRoom({
        ...roomData,
        status: roomData.status as RoomStatus
      });
      setIsHost(true);
      
      toast({
        title: "Salle créée !",
        description: `Code de la salle: ${roomCode}`,
      });

      return {
        ...roomData,
        status: roomData.status as RoomStatus
      };
    } catch (err) {
      console.error('Erreur lors de la création de la salle:', err);
      setError('Impossible de créer la salle');
      toast({
        title: "Erreur",
        description: "Impossible de créer la salle",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Rejoindre une salle par code
  const joinRoom = useCallback(async (roomCode: string) => {
    if (!user) return false;

    setLoading(true);
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
        if (joinError.code === '23505') { // Duplicate key error
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

      setRoom({
        ...roomData,
        status: roomData.status as RoomStatus
      });
      setIsHost(roomData.host_id === user.id);

      toast({
        title: "Salle rejointe !",
        description: `Bienvenue dans la salle ${roomCode}`,
      });

      return true;
    } catch (err) {
      console.error('Erreur lors de la connexion à la salle:', err);
      setError('Impossible de rejoindre la salle');
      toast({
        title: "Erreur",
        description: "Impossible de rejoindre la salle",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Marquer le joueur comme prêt
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

  // Démarrer le quiz (hôte seulement)
  const startQuiz = useCallback(async () => {
    if (!user || !room || !isHost) return;

    try {
      // Générer les questions
      const response = await fetch(`https://evaftpnfakxwekkggipn.supabase.co/functions/v1/generate-quiz-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2YWZ0cG5mYWt4d2Vra2dnaXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTU2ODYsImV4cCI6MjA2NTQ5MTY4Nn0.P8U0fwNKpnXFH4_JaN0ep5eATj3RGzUEPGozPbxcS1M`,
        },
        body: JSON.stringify({
          theme: room.theme,
          difficulty: room.difficulty,
          questionCount: room.question_count
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la génération des questions');

      const questions = await response.json();

      // Mettre à jour la salle
      const { error } = await supabase
        .from('quiz_rooms')
        .update({
          status: 'playing',
          questions: questions,
          current_question: 0,
          started_at: new Date().toISOString()
        })
        .eq('id', room.id);

      if (error) throw error;

      toast({
        title: "Quiz démarré !",
        description: "Le quiz multijoueur a commencé",
      });
    } catch (err) {
      console.error('Erreur lors du démarrage du quiz:', err);
      toast({
        title: "Erreur",
        description: "Impossible de démarrer le quiz",
        variant: "destructive",
      });
    }
  }, [user, room, isHost]);

  // Quitter la salle
  const leaveRoom = useCallback(async () => {
    if (!user || !room) return;

    try {
      await supabase
        .from('quiz_room_players')
        .delete()
        .eq('room_id', room.id)
        .eq('user_id', user.id);

      setRoom(null);
      setPlayers([]);
      setIsHost(false);
      setCurrentQuestion(null);
    } catch (err) {
      console.error('Erreur lors de la sortie de la salle:', err);
    }
  }, [user, room]);

  // Charger les données de la salle
  useEffect(() => {
    if (!roomId || !user) return;

    const loadRoomData = async () => {
      try {
        // Charger la salle
        const { data: roomData, error: roomError } = await supabase
          .from('quiz_rooms')
          .select('*')
          .eq('id', roomId)
          .single();

        if (roomError) throw roomError;

        setRoom({
          ...roomData,
          status: roomData.status as RoomStatus
        });
        setIsHost(roomData.host_id === user.id);

        // Charger la question actuelle si le quiz est en cours
        if (roomData.status === 'playing' && roomData.questions && roomData.current_question !== null) {
          setCurrentQuestion(roomData.questions[roomData.current_question]);
        }

        // Charger les joueurs
        const { data: playersData, error: playersError } = await supabase
          .from('quiz_room_players')
          .select('*')
          .eq('room_id', roomId)
          .order('joined_at');

        if (playersError) throw playersError;

        setPlayers(playersData || []);
      } catch (err) {
        console.error('Erreur lors du chargement de la salle:', err);
        setError('Impossible de charger la salle');
      }
    };

    loadRoomData();
  }, [roomId, user]);

  // Écouter les mises à jour en temps réel
  useEffect(() => {
    if (!roomId) return;

    const roomChannel = supabase
      .channel(`room-${roomId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'quiz_rooms', filter: `id=eq.${roomId}` },
        (payload) => {
          console.log('Room update:', payload);
          if (payload.eventType === 'UPDATE') {
            const newRoom = payload.new as any;
            setRoom({
              ...newRoom,
              status: newRoom.status as RoomStatus
            });
            
            // Mettre à jour la question actuelle
            if (newRoom.status === 'playing' && newRoom.questions && newRoom.current_question !== null) {
              setCurrentQuestion(newRoom.questions[newRoom.current_question]);
            }
          }
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'quiz_room_players', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('Players update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setPlayers(prev => [...prev, payload.new as RoomPlayer]);
          } else if (payload.eventType === 'UPDATE') {
            setPlayers(prev => prev.map(p => 
              p.id === payload.new.id ? payload.new as RoomPlayer : p
            ));
          } else if (payload.eventType === 'DELETE') {
            setPlayers(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomChannel);
    };
  }, [roomId]);

  return {
    room,
    players,
    isHost,
    currentQuestion,
    loading,
    error,
    createRoom,
    joinRoom,
    setPlayerReady,
    startQuiz,
    leaveRoom
  };
};
