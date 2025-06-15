
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';
import { QuizQuestion } from '@/types/quiz';

export interface UseMultiplayerRoomReturn {
  room: QuizRoom | null;
  players: RoomPlayer[];
  isHost: boolean;
  currentQuestion: QuizQuestion | null;
  loading: boolean;
  error: string | null;
  createRoom: (theme: string, difficulty: string, questionCount?: number) => Promise<QuizRoom | null>;
  joinRoom: (roomCode: string) => Promise<boolean>;
  setPlayerReady: (ready?: boolean) => Promise<void>;
  startQuiz: () => Promise<boolean>;
  leaveRoom: () => Promise<void>;
  forceResync?: () => Promise<void>;
}
