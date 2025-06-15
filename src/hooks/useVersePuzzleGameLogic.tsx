
import { useState, useEffect } from 'react';
import { VersePuzzle } from '@/types/gameTypes';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface GameSettings {
  theme: string;
  difficulty: string;
  puzzleCount: number;
}

export const useVersePuzzleGameLogic = (
  puzzles: VersePuzzle[],
  onGameComplete: (score: number, timeSpent: number) => void
) => {
  const { user } = useAuth();
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState(0);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [puzzleStartTime, setPuzzleStartTime] = useState<number>(0);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);

  const calculatePoints = (difficulty: string, timeLeft: number): number => {
    const basePoints = {
      'facile': 50,
      'moyen': 75,
      'difficile': 100
    }[difficulty] || 50;

    const timeBonus = Math.round(timeLeft * 2); // 2 points par seconde restante
    return basePoints + timeBonus;
  };

  const resetPuzzle = () => {
    if (puzzles.length === 0 || currentPuzzle >= puzzles.length) return;
    
    const puzzle = puzzles[currentPuzzle];
    setAvailableWords([...puzzle.scrambledWords]);
    setSelectedWords([]);
    setIsCompleted(false);
    setTimeLeft(60);
    setPuzzleStartTime(Date.now());
  };

  useEffect(() => {
    resetPuzzle();
  }, [currentPuzzle, puzzles]);

  const handleTimeUp = () => {
    if (!isCompleted) {
      nextPuzzle();
    }
  };

  const handleWordSelect = (wordIndex: number) => {
    const word = availableWords[wordIndex];
    if (!word || isCompleted) return;

    const newSelectedWords = [...selectedWords, wordIndex];
    setSelectedWords(newSelectedWords);
    setAvailableWords(prev => prev.map((w, i) => i === wordIndex ? '' : w));

    // Vérifier si le puzzle est terminé
    if (newSelectedWords.length === puzzles[currentPuzzle].correctOrder.length) {
      checkSolution(newSelectedWords);
    }
  };

  const handleWordRemove = (selectedIndex: number) => {
    if (isCompleted) return;
    
    const wordIndex = selectedWords[selectedIndex];
    const word = puzzles[currentPuzzle].scrambledWords[wordIndex];

    setSelectedWords(prev => prev.filter((_, i) => i !== selectedIndex));
    setAvailableWords(prev => prev.map((w, i) => i === wordIndex ? word : w));
  };

  const checkSolution = (wordsOrder: number[]) => {
    const puzzle = puzzles[currentPuzzle];
    const isCorrect = JSON.stringify(wordsOrder) === JSON.stringify(puzzle.correctOrder);
    
    if (isCorrect) {
      setIsCompleted(true);
      setCompletedPuzzles(prev => prev + 1);
      
      const points = calculatePoints(puzzle.difficulty, timeLeft);
      setScore(prev => prev + points);
      
      setTimeout(() => {
        nextPuzzle();
      }, 3000);
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
    } else {
      completeGame();
    }
  };

  const completeGame = async () => {
    const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
    
    if (user && gameSettings) {
      try {
        const { error } = await supabase
          .from('verse_puzzle_history')
          .insert({
            user_id: user.id,
            theme: gameSettings.theme,
            difficulty: gameSettings.difficulty,
            total_puzzles: puzzles.length,
            completed_puzzles: completedPuzzles,
            total_points: score,
            time_spent: timeSpent
          });

        if (error) {
          console.error('Erreur sauvegarde historique Puzzle de Versets:', error);
        } else {
          console.log('✅ Historique Puzzle de Versets sauvegardé avec succès');
        }
      } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
      }
    }

    onGameComplete(score, timeSpent);
  };

  const startGame = (theme: string, difficulty: string, puzzleCount: number) => {
    setGameSettings({ theme, difficulty, puzzleCount });
    setGameStartTime(Date.now());
    setPuzzleStartTime(Date.now());
    setCurrentPuzzle(0);
    setScore(0);
    setCompletedPuzzles(0);
    setTimeLeft(60);
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setScore(0);
    setCompletedPuzzles(0);
    setSelectedWords([]);
    setAvailableWords([]);
    setIsCompleted(false);
    setGameSettings(null);
  };

  return {
    currentPuzzle,
    score,
    completedPuzzles,
    selectedWords,
    availableWords,
    isCompleted,
    timeLeft,
    gameSettings,
    setTimeLeft,
    handleWordSelect,
    handleWordRemove,
    handleTimeUp,
    resetPuzzle,
    startGame,
    resetGame,
    calculatePoints
  };
};
