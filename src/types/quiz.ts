
export type DifficultyLevel = 'facile' | 'moyen' | 'difficile';
export type QuizTheme = 'vie-jesus' | 'commandements' | 'creation' | 'prophetes' | 'nouveau-testament';

export interface QuizConfig {
  difficulty: DifficultyLevel;
  theme: QuizTheme;
  questionCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  verse?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  badge: string;
}
