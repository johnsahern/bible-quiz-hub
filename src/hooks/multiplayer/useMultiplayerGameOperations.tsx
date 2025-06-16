
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { GameType, MultiplayerGameConfig } from '@/types/multiplayerGameTypes';

export const useMultiplayerGameOperations = (userId?: string, roomId?: string, isHost: boolean = false) => {
  const generateGameContent = useCallback(async (config: MultiplayerGameConfig) => {
    try {
      let gameData;
      
      switch (config.gameType) {
        case 'true-false':
          const { data: tfData } = await supabase.functions.invoke('generate-true-false-questions', {
            body: { 
              theme: config.theme, 
              difficulty: config.difficulty, 
              questionCount: config.questionCount || 10 
            }
          });
          gameData = tfData;
          break;
          
        case 'verse-puzzle':
          const { data: vpData } = await supabase.functions.invoke('generate-verse-puzzles', {
            body: { 
              theme: config.theme, 
              difficulty: config.difficulty, 
              puzzleCount: config.puzzleCount || 5 
            }
          });
          gameData = vpData;
          break;
          
        case 'crossword':
          const { data: cwData } = await supabase.functions.invoke('generate-crossword', {
            body: { 
              theme: config.theme, 
              difficulty: config.difficulty, 
              gridSize: config.gridSize || 10 
            }
          });
          gameData = cwData;
          break;
          
        case 'word-search':
          const { data: wsData } = await supabase.functions.invoke('generate-word-search', {
            body: { 
              theme: config.theme, 
              difficulty: config.difficulty 
            }
          });
          gameData = wsData;
          break;
          
        default:
          // Quiz par défaut
          const { data: quizData } = await supabase.functions.invoke('generate-quiz-questions', {
            body: { 
              theme: config.theme, 
              difficulty: config.difficulty, 
              questionCount: config.questionCount || 10 
            }
          });
          gameData = quizData;
      }
      
      return gameData;
    } catch (error) {
      console.error('Error generating game content:', error);
      throw error;
    }
  }, []);

  const startMultiplayerGame = useCallback(async (config: MultiplayerGameConfig) => {
    if (!userId || !roomId || !isHost) {
      console.log('❌ Cannot start game: missing requirements');
      return false;
    }

    try {
      console.log('🎮 Starting multiplayer game:', config.gameType);

      const gameData = await generateGameContent(config);
      
      if (!gameData) {
        throw new Error('Failed to generate game content');
      }

      const gameState = {
        currentRound: 0,
        totalRounds: config.questionCount || config.puzzleCount || 10,
        gameData,
        playerAnswers: {},
        roundStartTime: Date.now(),
        roundTimeLimit: config.gameType === 'crossword' ? 300000 : 45000 // 5min pour mots croisés, 45s pour autres
      };

      const { error } = await supabase
        .from('quiz_rooms')
        .update({
          game_type: config.gameType,
          game_data: gameData,
          game_state: gameState,
          status: 'playing',
          started_at: new Date().toISOString(),
          current_question: 0
        })
        .eq('id', roomId);

      if (error) {
        console.error('❌ Room update failed:', error);
        throw error;
      }

      console.log('✅ Multiplayer game started successfully');
      toast({
        title: "Partie lancée !",
        description: `Le jeu ${config.gameType} commence maintenant.`,
      });

      return true;
    } catch (err: any) {
      console.error('💥 Error starting multiplayer game:', err);
      toast({
        title: "Erreur",
        description: err.message || "Impossible de démarrer le jeu",
        variant: "destructive",
      });
      return false;
    }
  }, [userId, roomId, isHost, generateGameContent]);

  return { startMultiplayerGame, generateGameContent };
};
