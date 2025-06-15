
export type GameMode = 'quiz' | 'true-false' | 'verse-puzzle' | 'crossword' | 'word-search' | 'biblical-race' | 'daily-challenge';

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation?: string;
  verse?: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  theme: string;
}

export interface VersePuzzle {
  id: string;
  verse: string;
  reference: string;
  scrambledWords: string[];
  correctOrder: number[];
  difficulty: 'facile' | 'moyen' | 'difficile';
  theme: string;
}

export interface CrosswordClue {
  id: string;
  clue: string;
  answer: string;
  direction: 'horizontal' | 'vertical';
  startRow: number;
  startCol: number;
}

export interface CrosswordGame {
  id: string;
  title: string;
  theme: string;
  clues: CrosswordClue[];
  grid: (string | null)[][];
  difficulty: 'facile' | 'moyen' | 'difficile';
}

export interface WordSearchGame {
  id: string;
  title: string;
  theme: string;
  words: string[];
  grid: string[][];
  difficulty: 'facile' | 'moyen' | 'difficile';
}

export interface RaceStage {
  id: string;
  title: string;
  description: string;
  gameMode: GameMode;
  requiredScore: number;
  reward: {
    points: number;
    badge?: string;
    unlocks?: string[];
  };
}

export interface BiblicalRace {
  id: string;
  title: string;
  description: string;
  stages: RaceStage[];
  currentStage: number;
  isCompleted: boolean;
}

export interface DailyChallenge {
  id: string;
  date: string;
  question: TrueFalseQuestion;
  isCompleted: boolean;
  streakCount: number;
}

export interface GameResult {
  gameMode: GameMode;
  score: number;
  timeSpent: number;
  difficulty: string;
  theme: string;
  completedAt: Date;
}
