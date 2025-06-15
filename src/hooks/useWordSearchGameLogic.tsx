
import { useState, useCallback } from 'react';
import { WordSearchGame } from '@/types/gameTypes';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface FoundWord {
  word: string;
  positions: Array<{ row: number; col: number }>;
}

interface WordPosition {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  word: string;
}

export const useWordSearchGameLogic = (game: WordSearchGame | null) => {
  const { user } = useAuth();
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [selectedCells, setSelectedCells] = useState<Array<{ row: number; col: number }>>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startTime] = useState(Date.now());
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Points par difficulté
  const getPointsForWord = useCallback((wordLength: number, difficulty: string) => {
    const basePoints = {
      facile: 10,
      moyen: 15,
      difficile: 20
    }[difficulty] || 10;
    
    return basePoints + (wordLength * 2);
  }, []);

  const findWordAtPositions = useCallback((positions: Array<{ row: number; col: number }>): string | null => {
    if (!game || positions.length === 0) return null;
    
    // Construire le mot à partir des positions
    const word = positions.map(pos => game.grid[pos.row][pos.col]).join('');
    const reverseWord = word.split('').reverse().join('');
    
    // Vérifier si c'est un mot valide (dans les deux sens)
    return game.words.includes(word) ? word : 
           game.words.includes(reverseWord) ? reverseWord : null;
  }, [game]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameCompleted || !game) return;

    if (!isSelecting) {
      // Commencer une nouvelle sélection
      setSelectedCells([{ row, col }]);
      setIsSelecting(true);
    } else {
      // Continuer ou terminer la sélection
      const newSelection = [...selectedCells, { row, col }];
      setSelectedCells(newSelection);
      
      // Vérifier si on a trouvé un mot
      const foundWord = findWordAtPositions(newSelection);
      if (foundWord) {
        // Vérifier si le mot n'a pas déjà été trouvé
        const alreadyFound = foundWords.some(fw => fw.word === foundWord);
        if (!alreadyFound) {
          const newFoundWord: FoundWord = {
            word: foundWord,
            positions: [...newSelection]
          };
          
          const newFoundWords = [...foundWords, newFoundWord];
          setFoundWords(newFoundWords);
          
          // Calculer les points
          const points = getPointsForWord(foundWord.length, game.difficulty);
          setScore(prev => prev + points);
          
          // Vérifier si le jeu est terminé
          if (newFoundWords.length === game.words.length) {
            setGameCompleted(true);
            handleGameComplete(newFoundWords.length, score + points);
          }
        }
        
        // Réinitialiser la sélection
        setSelectedCells([]);
        setIsSelecting(false);
      }
    }
  }, [isSelecting, selectedCells, foundWords, game, gameCompleted, getPointsForWord, score]);

  const handleGameComplete = useCallback(async (wordsFound: number, finalScore: number) => {
    if (!user || !game) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      // Sauvegarder l'historique
      const { error } = await supabase
        .from('word_search_history')
        .insert({
          user_id: user.id,
          theme: game.theme,
          difficulty: game.difficulty,
          total_words: game.words.length,
          found_words: wordsFound,
          total_points: finalScore,
          time_spent: timeSpent
        });

      if (error) {
        console.error('Error saving word search history:', error);
      }
    } catch (error) {
      console.error('Error in handleGameComplete:', error);
    }
  }, [user, game, startTime]);

  const resetSelection = useCallback(() => {
    setSelectedCells([]);
    setIsSelecting(false);
  }, []);

  const isCellSelected = useCallback((row: number, col: number) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  }, [selectedCells]);

  const isCellFound = useCallback((row: number, col: number) => {
    return foundWords.some(foundWord => 
      foundWord.positions.some(pos => pos.row === row && pos.col === col)
    );
  }, [foundWords]);

  const getRemainingWords = useCallback(() => {
    if (!game) return [];
    return game.words.filter(word => !foundWords.some(fw => fw.word === word));
  }, [game, foundWords]);

  return {
    foundWords,
    selectedCells,
    isSelecting,
    gameCompleted,
    score,
    handleCellClick,
    resetSelection,
    isCellSelected,
    isCellFound,
    getRemainingWords,
    progress: game ? Math.round((foundWords.length / game.words.length) * 100) : 0,
    timeElapsed: Math.floor((Date.now() - startTime) / 1000)
  };
};
