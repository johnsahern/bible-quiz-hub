
export type DifficultyLevel = 'facile' | 'moyen' | 'difficile';
export type QuizTheme = 
  | 'vie-jesus' | 'commandements' | 'creation' | 'prophetes' | 'nouveau-testament'
  | 'ancien-testament' | 'genese' | 'exode' | 'psalmes' | 'proverbes'
  | 'evangeliles' | 'actes-apotres' | 'epitres-paul' | 'apocalypse' | 'rois-israel'
  | 'juges-israel' | 'patriarches' | 'moise' | 'david' | 'salomon'
  | 'elie-elisee' | 'daniel' | 'ezechiel' | 'esaie' | 'jeremie'
  | 'samuel' | 'ruth' | 'esther' | 'job' | 'jonas'
  | 'osee' | 'amos' | 'michee' | 'habacuc' | 'sophonie'
  | 'zacharie' | 'malachie' | 'cantiques' | 'ecclesiaste' | 'lamentations'
  | 'nombres' | 'deuteronome' | 'josue' | 'chroniques' | 'esdras'
  | 'nehemie' | 'miracles-jesus' | 'paraboles-jesus' | 'passion-christ' | 'resurrection'
  | 'pentecote' | 'eglise-primitive' | 'voyages-paul' | 'pierre-jean' | 'femmes-bible';

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
