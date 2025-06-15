
import { useState, useEffect } from 'react';
import { CrosswordGame } from '@/types/gameTypes';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface GameSettings {
  theme: string;
  difficulty: string;
  gridSize: number;
}

export const useCrosswordGameLogic = (
  crossword: CrosswordGame | null,
  onGameComplete: (score: number, timeSpent: number) => void
) => {
  const { user } = useAuth();
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [completedClues, setCompletedClues] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);

  const calculatePoints = (difficulty: string, wordLength: number): number => {
    const basePoints = {
      'facile': 10,
      'moyen': 15,
      'difficile': 20
    }[difficulty] || 10;

    return basePoints * wordLength;
  };

  const checkAnswer = (wordIndex: number, answer: string): boolean => {
    if (!crossword || !crossword.words[wordIndex]) return false;
    
    const correctWord = crossword.words[wordIndex].word.toUpperCase();
    const userAnswer = answer.toUpperCase().trim();
    
    return correctWord === userAnswer;
  };

  const handleAnswerSubmit = (wordIndex: number, answer: string) => {
    if (!crossword) return;

    const wordKey = `word-${wordIndex}`;
    const isCorrect = checkAnswer(wordIndex, answer);
    
    if (isCorrect && !userAnswers[wordKey]) {
      // Nouvelle réponse correcte
      const word = crossword.words[wordIndex];
      const points = calculatePoints(crossword.difficulty, word.word.length);
      
      setUserAnswers(prev => ({ ...prev, [wordKey]: answer.toUpperCase() }));
      setCompletedClues(prev => prev + 1);
      setScore(prev => prev + points);
      
      console.log(`✅ Mot "${word.word}" trouvé ! +${points} points`);
    } else if (!isCorrect) {
      console.log(`❌ Réponse incorrecte pour le mot ${wordIndex + 1}`);
    }
  };

  const getGridDisplayValue = (row: number, col: number): string | null => {
    if (!crossword) return null;
    
    // Vérifier si une case fait partie d'un mot résolu
    for (let wordIndex = 0; wordIndex < crossword.words.length; wordIndex++) {
      const word = crossword.words[wordIndex];
      const wordKey = `word-${wordIndex}`;
      
      if (userAnswers[wordKey]) {
        const { startRow, startCol, direction, word: wordText } = word;
        
        for (let i = 0; i < wordText.length; i++) {
          const letterRow = direction === 'vertical' ? startRow + i : startRow;
          const letterCol = direction === 'horizontal' ? startCol + i : startCol;
          
          if (letterRow === row && letterCol === col) {
            return wordText[i];
          }
        }
      }
    }
    
    return crossword.grid[row][col];
  };

  const completeGame = async () => {
    const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
    
    if (user && gameSettings && crossword) {
      try {
        const { error } = await supabase
          .from('crossword_history')
          .insert({
            user_id: user.id,
            theme: gameSettings.theme,
            difficulty: gameSettings.difficulty,
            total_clues: crossword.words.length,
            completed_clues: completedClues,
            total_points: score,
            time_spent: timeSpent
          });

        if (error) {
          console.error('Erreur sauvegarde historique mots croisés:', error);
        } else {
          console.log('✅ Historique mots croisés sauvegardé avec succès');
        }
      } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
      }
    }

    onGameComplete(score, timeSpent);
  };

  const startGame = (theme: string, difficulty: string, gridSize: number) => {
    setGameSettings({ theme, difficulty, gridSize });
    setGameStartTime(Date.now());
    setUserAnswers({});
    setCompletedClues(0);
    setScore(0);
  };

  const resetGame = () => {
    setUserAnswers({});
    setCompletedClues(0);
    setScore(0);
    setGameSettings(null);
  };

  // Vérifier si le jeu est terminé
  useEffect(() => {
    if (crossword && completedClues === crossword.words.length && completedClues > 0) {
      setTimeout(() => {
        completeGame();
      }, 2000);
    }
  }, [completedClues, crossword]);

  return {
    userAnswers,
    completedClues,
    score,
    gameSettings,
    handleAnswerSubmit,
    checkAnswer,
    getGridDisplayValue,
    startGame,
    resetGame,
    calculatePoints
  };
};
