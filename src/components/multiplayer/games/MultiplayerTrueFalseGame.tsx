
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import { GameRoomExtended } from '@/types/multiplayerGameTypes';
import { RoomPlayer } from '@/types/multiplayer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface MultiplayerTrueFalseGameProps {
  room: GameRoomExtended;
  players: RoomPlayer[];
  onAnswer: (answer: boolean) => void;
}

const MultiplayerTrueFalseGame: React.FC<MultiplayerTrueFalseGameProps> = ({
  room,
  players,
  onAnswer
}) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(30);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const currentQuestion = room.game_state?.gameData?.questions?.[room.current_question || 0];
  const progress = room.game_state ? ((room.current_question || 0) / room.game_state.totalRounds) * 100 : 0;
  const questionNumber = (room.current_question || 0) + 1;

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, room.current_question]);

  useEffect(() => {
    // Reset pour nouvelle question
    setHasAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(30);
  }, [room.current_question]);

  const handleAnswer = async (answer: boolean) => {
    if (hasAnswered || !user) return;

    setHasAnswered(true);
    setSelectedAnswer(answer);
    
    // Calculer les points
    const isCorrect = answer === currentQuestion?.isTrue;
    const responseTime = 30 - timeLeft;
    const points = isCorrect ? (20 + Math.max(0, (30 - responseTime) * 2)) : 0;

    try {
      // Sauvegarder la réponse
      await supabase
        .from('quiz_room_answers')
        .insert({
          room_id: room.id,
          user_id: user.id,
          question_index: room.current_question || 0,
          answer_index: answer ? 1 : 0,
          response_time: responseTime * 1000,
          is_correct: isCorrect,
          points_earned: points
        });

      // Mettre à jour le score du joueur
      await supabase
        .from('quiz_room_players')
        .update({
          score: players.find(p => p.user_id === user.id)?.score || 0 + points,
          correct_answers: isCorrect ? 
            (players.find(p => p.user_id === user.id)?.correct_answers || 0) + 1 : 
            (players.find(p => p.user_id === user.id)?.correct_answers || 0)
        })
        .eq('room_id', room.id)
        .eq('user_id', user.id);

      onAnswer(answer);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (!currentQuestion) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <p className="text-white">Chargement de la question...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec progression */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5" />
              <span>Question {questionNumber} / {room.game_state?.totalRounds}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-4 h-4" />
              <span className={timeLeft <= 10 ? 'text-red-400' : ''}>{timeLeft}s</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question principale */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">
            {currentQuestion.statement}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => handleAnswer(true)}
              disabled={hasAnswered || timeLeft <= 0}
              size="lg"
              className={`h-16 text-lg ${
                selectedAnswer === true
                  ? selectedAnswer === currentQuestion.isTrue
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              VRAI
            </Button>
            
            <Button
              onClick={() => handleAnswer(false)}
              disabled={hasAnswered || timeLeft <= 0}
              size="lg"
              className={`h-16 text-lg ${
                selectedAnswer === false
                  ? selectedAnswer === currentQuestion.isTrue
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              <XCircle className="w-6 h-6 mr-2" />
              FAUX
            </Button>
          </div>

          {hasAnswered && currentQuestion.explanation && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <p className="text-white/90 text-sm">
                <strong>Explication :</strong> {currentQuestion.explanation}
              </p>
              {currentQuestion.verse && (
                <p className="text-white/70 text-xs mt-2">
                  Référence : {currentQuestion.verse}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statut des joueurs */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Statut des joueurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {players.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                <span className="text-white text-sm">{player.username}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs">{player.score} pts</span>
                  <Badge variant={player.user_id === user?.id && hasAnswered ? 'default' : 'secondary'}>
                    {player.user_id === user?.id && hasAnswered ? 'Répondu' : 'En attente'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiplayerTrueFalseGame;
