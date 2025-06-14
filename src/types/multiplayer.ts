
export type RoomStatus = 'waiting' | 'playing' | 'finished';

export interface QuizRoom {
  id: string;
  room_code: string;
  host_id: string;
  theme: string;
  difficulty: string;
  question_count: number;
  status: RoomStatus;
  max_players: number;
  current_question: number;
  questions: any[];
  created_at: string;
  started_at?: string;
  finished_at?: string;
}

export interface RoomPlayer {
  id: string;
  room_id: string;
  user_id: string;
  username: string;
  score: number;
  correct_answers: number;
  current_answer?: number;
  answer_time?: string;
  is_ready: boolean;
  joined_at: string;
}

export interface RoomAnswer {
  id: string;
  room_id: string;
  user_id: string;
  question_index: number;
  answer_index: number;
  response_time: number;
  is_correct: boolean;
  points_earned: number;
  answered_at: string;
}
