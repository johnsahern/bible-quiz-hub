
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Puzzle, Clock, Users, RotateCcw } from 'lucide-react';
import { GameRoomExtended } from '@/types/multiplayerGameTypes';
import { RoomPlayer } from '@/types/multiplayer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface MultiplayerVersePuzzleGameProps {
  room: GameRoomExtended;
  players: RoomPlayer[];
  onComplete: (solution: number[]) => void;
}

const MultiplayerVersePuzzleGame: React.FC<MultiplayerVersePuzzleGameProps> = ({
  room,
  players,
  onComplete
}) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);

  const currentPuzzle = room.game_state?.gameData?.puzzles?.[room.current_question || 0];
  const progress = room.game_state ? ((room.current_question || 0) / room.game_state.totalRounds) * 100 : 0;
  const puzzleNumber = (room.current_question || 0) + 1;

  useEffect(() => {
    if (currentPuzzle) {
      setAvailableWords([...currentPuzzle.scrambledWords]);
      setSelectedWords([]);
      setHasCompleted(false);
      setTimeLeft(60);
    }
  }, [currentPuzzle, room.current_question]);

  useEffect(() => {
    if (timeLeft <= 0 || hasCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, hasCompleted]);

  const handleWordSelect = (wordIndex: number) => {
    if (hasCompleted || !availableWords[wordIndex]) return;

    const newSelected = [...selectedWords, wordIndex];
    setSelectedWords(newSelected);
    setAvailableWords(prev => prev.map((word, i) => i === wordIndex ? '' : word));

    // Vérifier si le puzzle est complet
    if (newSelected.length === currentPuzzle?.correctOrder.length) {
      checkSolution(newSelected);
    }
  };

  const handleWordRemove = (selectedIndex: number) => {
    if (hasCompleted) return;

    const wordIndex = selectedWords[selectedIndex];
    const originalWord = currentPuzzle?.scrambledWords[wordIndex];

    setSelectedWords(prev => prev.filter((_, i) => i !== selectedIndex));
    setAvailableWords(prev => prev.map((word, i) => i === wordIndex ? originalWord : word));
  };

  const checkSolution = async (solution: number[]) => {
    if (!user || !currentPuzzle) return;

    const isCorrect = JSON.stringify(solution) === JSON.stringify(currentPuzzle.correctOrder);
    const responseTime = 60 - timeLeft;
    const points = isCorrect ? (50 + Math.max(0, (60 - responseTime) * 2)) : 0;

    setHasCompleted(true);

    try {
      // Sauvegarder la réponse
      await supabase
        .from('quiz_room_answers')
        .insert({
          room_id: room.id,
          user_id: user.id,
          question_index: room.current_question || 0,
          answer_index: isCorrect ? 1 : 0,
          response_time: responseTime * 1000,
          is_correct: isCorrect,
          points_earned: points
        });

      // Mettre à jour le score du joueur
      const currentPlayer = players.find(p => p.user_id === user.id);
      await supabase
        .from('quiz_room_players')
        .update({
          score: (currentPlayer?.score || 0) + points,
          correct_answers: isCorrect ? 
            (currentPlayer?.correct_answers || 0) + 1 : 
            (currentPlayer?.correct_answers || 0)
        })
        .eq('room_id', room.id)
        .eq('user_id', user.id);

      onComplete(solution);
    } catch (error) {
      console.error('Error submitting solution:', error);
    }
  };

  const resetPuzzle = () => {
    if (currentPuzzle) {
      setAvailableWords([...currentPuzzle.scrambledWords]);
      setSelectedWords([]);
    }
  };

  if (!currentPuzzle) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <p className="text-white">Chargement du puzzle...</p>
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
              <Puzzle className="w-5 h-5" />
              <span>Puzzle {puzzleNumber} / {room.game_state?.totalRounds}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-4 h-4" />
              <span className={timeLeft <= 10 ? 'text-red-400' : ''}>{timeLeft}s</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Puzzle principal */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Reconstituer le verset</CardTitle>
            <Button
              onClick={resetPuzzle}
              disabled={hasCompleted}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
          <p className="text-white/70 text-sm">{currentPuzzle.reference}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Zone de construction */}
          <div className="p-4 bg-white/5 rounded-lg border-2 border-dashed border-white/20 min-h-[80px]">
            <div className="flex flex-wrap gap-2">
              {selectedWords.map((wordIndex, i) => (
                <Button
                  key={i}
                  onClick={() => handleWordRemove(i)}
                  disabled={hasCompleted}
                  variant="secondary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentPuzzle.scrambledWords[wordIndex]}
                </Button>
              ))}
              {selectedWords.length === 0 && (
                <p className="text-white/60 text-sm">Cliquez sur les mots pour reconstituer le verset</p>
              )}
            </div>
          </div>

          {/* Mots disponibles */}
          <div className="space-y-2">
            <h4 className="text-white font-medium">Mots disponibles :</h4>
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, i) => (
                word ? (
                  <Button
                    key={i}
                    onClick={() => handleWordSelect(i)}
                    disabled={hasCompleted}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {word}
                  </Button>
                ) : null
              ))}
            </div>
          </div>

          {hasCompleted && (
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-white font-medium">
                {JSON.stringify(selectedWords) === JSON.stringify(currentPuzzle.correctOrder) 
                  ? '✅ Correct !' 
                  : '❌ Incorrect'
                }
              </p>
              <p className="text-white/70 text-sm mt-1">
                Verset correct : {currentPuzzle.verse}
              </p>
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
                  <Badge variant={player.user_id === user?.id && hasCompleted ? 'default' : 'secondary'}>
                    {player.user_id === user?.id && hasCompleted ? 'Terminé' : 'En cours'}
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

export default MultiplayerVersePuzzleGame;
