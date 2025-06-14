
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';

interface GameHeaderProps {
  room: QuizRoom;
  players: RoomPlayer[];
  timeLeft: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ room, players, timeLeft }) => {
  const progress = ((room.current_question || 0) + 1) / room.question_count * 100;
  const playersWhoAnswered = players.filter(p => p.answer_time).length;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <Badge variant="secondary">
          Question {(room.current_question || 0) + 1}/{room.question_count}
        </Badge>
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-4 h-4" />
          <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : ''}`}>
            {timeLeft}s
          </span>
        </div>
      </div>
      
      <div className="flex items-center text-white/70">
        <Users className="w-4 h-4 mr-1" />
        {playersWhoAnswered}/{players.length} ont répondu
      </div>
    </div>
  );
};

export default GameHeader;
