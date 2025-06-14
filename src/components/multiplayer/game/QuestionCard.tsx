
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types/quiz';
import GameHeader from './GameHeader';
import { QuizRoom, RoomPlayer } from '@/types/multiplayer';

interface QuestionCardProps {
  room: QuizRoom;
  players: RoomPlayer[];
  currentQuestion: QuizQuestion;
  timeLeft: number;
  selectedAnswer: number | null;
  hasAnswered: boolean;
  onAnswerClick: (answerIndex: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  room,
  players,
  currentQuestion,
  timeLeft,
  selectedAnswer,
  hasAnswered,
  onAnswerClick
}) => {
  const progress = ((room.current_question || 0) + 1) / room.question_count * 100;

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <GameHeader room={room} players={players} timeLeft={timeLeft} />
        
        <div className="mb-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
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
                onClick={() => onAnswerClick(index)}
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
  );
};

export default QuestionCard;
