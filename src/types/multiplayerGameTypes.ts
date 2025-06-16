
export type GameType = 'quiz' | 'true-false' | 'verse-puzzle' | 'crossword' | 'word-search';

export interface MultiplayerGameConfig {
  gameType: GameType;
  theme: string;
  difficulty: string;
  questionCount?: number;
  gridSize?: number;
  puzzleCount?: number;
}

export interface MultiplayerGameState {
  currentRound: number;
  totalRounds: number;
  gameData: any; // Données spécifiques au jeu (questions, puzzles, etc.)
  playerAnswers: { [playerId: string]: any };
  roundStartTime: number;
  roundTimeLimit: number;
}

export interface GameRoomExtended extends Omit<import('./multiplayer').QuizRoom, 'questions'> {
  game_type: GameType;
  game_data: any;
  game_state: MultiplayerGameState;
}
