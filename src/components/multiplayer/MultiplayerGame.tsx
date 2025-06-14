import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy } from 'lucide-react';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';
import { QuizQuestion } from '@/types/quiz';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface MultiplayerGameProps {
  room: QuizRoom;
  players: RoomPlayer[];
  currentQuestion: QuizQuestion;
  questionIndex: number;
}

const MultiplayerGame: React.FC<MultiplayerGameProps> = ({ 
  room, 
  players, 
  currentQuestion, 
  questionIndex 
}) => {
  const { user } = useAuth();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Timer pour la question
  useEffect(() => {
    setStartTime(Date.now());
    setTimeLeft(30);
    setSelectedAnswer(null);
    setHasAnswered(false);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!hasAnswered) {
            // Auto-submit sans réponse
            submitAnswer(-1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion.id]);

  const submitAnswer = useCallback(async (answerIndex: number) => {
    if (!user || hasAnswered) return;

    const responseTime = Date.now() - startTime;
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    let points = 0;
    if (isCorrect) {
      // Points basés sur la rapidité (max 1000 points)
      points = Math.max(100, Math.floor(1000 - (responseTime / 30000) * 900));
    }

    try {
      // Enregistrer la réponse
      await supabase
        .from('quiz_room_answers')
        .insert({
          room_id: room.id,
          user_id: user.id,
          question_index: questionIndex,
          answer_index: answerIndex,
          response_time: responseTime,
          is_correct: isCorrect,
          points_earned: points
        });

      // Mettre à jour le score du joueur
      await supabase
        .from('quiz_room_players')
        .update({
          score: players.find(p => p.user_id === user.id)?.score + points || points,
          correct_answers: isCorrect 
            ? (players.find(p => p.user_id === user.id)?.correct_answers || 0) + 1
            : (players.find(p => p.user_id === user.id)?.correct_answers || 0),
          current_answer: answerIndex,
          answer_time: new Date().toISOString()
        })
        .eq('room_id', room.id)
        .eq('user_id', user.id);

      setHasAnswered(true);

      if (isCorrect) {
        toast({
          title: "Bonne réponse ! 🎉",
          description: `+${points} points`,
        });
      } else {
        toast({
          title: "Mauvaise réponse 😔",
          description: "Meilleure chance la prochaine fois !",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Erreur lors de la soumission de la réponse:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre réponse",
        variant: "destructive",
      });
    }
  }, [user, hasAnswered, startTime, currentQuestion, room.id, questionIndex, players]);

  const handleAnswerClick = (answerIndex: number) => {
    if (hasAnswered || timeLeft === 0) return;
    setSelectedAnswer(answerIndex);
    submitAnswer(answerIndex);
  };

  const progress = ((room.current_question || 0) + 1) / room.question_count * 100;
  const playersWhoAnswered = players.filter(p => p.answer_time).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Question principale */}
      <div className="lg:col-span-3">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
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
            
            <Progress value={progress} className="mb-4" />
            
            <CardTitle className="text-xl text-white">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = hasAnswered || timeLeft === 0;
                
                let buttonClass = "p-4 text-left transition-all duration-200 ";
                
                if (showResult) {
                  if (isCorrect) {
                    buttonClass += "bg-green-500 text-white border-green-400 ";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "bg-red-500 text-white border-red-400 ";
                  } else {
                    buttonClass += "bg-white/5 text-white/70 border-white/20 ";
                  }
                } else if (isSelected) {
                  buttonClass += "bg-blue-500 text-white border-blue-400 ";
                } else {
                  buttonClass += "bg-white/10 text-white border-white/20 hover:bg-white/20 ";
                }

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={hasAnswered || timeLeft === 0}
                    className={buttonClass}
                    variant="outline"
                    size="lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>

            {currentQuestion.verse && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
                <p className="text-white/80 italic">"{currentQuestion.verse}"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Classement en temps réel */}
      <div>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Classement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {players
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
                  <div
                    key={player.id}
                    className={`p-3 rounded-lg border ${
                      player.user_id === user?.id 
                        ? 'bg-blue-500/20 border-blue-400/50' 
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-amber-600 text-white' :
                        'bg-white/20 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium text-sm">
                            {player.username}
                          </span>
                          {player.answer_time && (
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          )}
                        </div>
                        <div className="text-white/60 text-xs">
                          {player.score} pts • {player.correct_answers} bonnes
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiplayerGame;
