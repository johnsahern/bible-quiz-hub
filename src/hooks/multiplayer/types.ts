
export interface UseMultiplayerRoomReturn {
  room: any | null;
  players: any[];
  isHost: boolean;
  currentQuestion: any | null;
  loading: boolean;
  error: string | null;
  createRoom: (theme: string, difficulty: string, questionCount?: number) => Promise<any>;
  joinRoom: (roomCode: string) => Promise<boolean>;
  setPlayerReady: (ready?: boolean) => Promise<void>;
  startQuiz: () => Promise<void>;
  leaveRoom: () => Promise<void>;
}
