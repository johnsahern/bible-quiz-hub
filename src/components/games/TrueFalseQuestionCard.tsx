
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { TrueFalseQuestion } from '@/types/gameTypes';

interface TrueFalseQuestionCardProps {
  question: TrueFalseQuestion;
  selectedAnswer: boolean | null;
  showResult: boolean;
  onAnswerSelect: (answer: boolean) => void;
  questionStartTime: number;
  gameSettings: { difficulty: string } | null;
  calculatePoints: (isCorrect: boolean, difficulty: string, responseTime: number) => number;
}

const TrueFalseQuestionCard = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerSelect,
  questionStartTime,
  gameSettings,
  calculatePoints
}: TrueFalseQuestionCardProps) => {
  const isCorrect = selectedAnswer === question.isTrue;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          {question.statement}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button
            size="lg"
            onClick={() => onAnswerSelect(true)}
            disabled={selectedAnswer !== null}
            className={`h-16 text-lg font-semibold ${
              showResult
                ? selectedAnswer === true
                  ? isCorrect
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-red-500 hover:bg-red-500'
                  : question.isTrue
                    ? 'bg-green-200 border-2 border-green-500'
                    : 'bg-gray-100'
                : 'bg-green-100 hover:bg-green-200 text-green-700'
            }`}
          >
            <CheckCircle className="w-6 h-6 mr-2" />
            VRAI
          </Button>
          
          <Button
            size="lg"
            onClick={() => onAnswerSelect(false)}
            disabled={selectedAnswer !== null}
            className={`h-16 text-lg font-semibold ${
              showResult
                ? selectedAnswer === false
                  ? isCorrect
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-red-500 hover:bg-red-500'
                  : !question.isTrue
                    ? 'bg-green-200 border-2 border-green-500'
                    : 'bg-gray-100'
                : 'bg-red-100 hover:bg-red-200 text-red-700'
            }`}
          >
            <XCircle className="w-6 h-6 mr-2" />
            FAUX
          </Button>
        </div>

        {showResult && question.explanation && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Explication :</strong> {question.explanation}
            </p>
            {question.verse && (
              <p className="text-xs text-blue-600 mt-2 font-medium">
                {question.verse}
              </p>
            )}
            {showResult && selectedAnswer === question.isTrue && (
              <div className="mt-2 p-2 bg-green-100 rounded border border-green-300">
                <p className="text-sm text-green-700 font-medium">
                  +{calculatePoints(true, gameSettings?.difficulty || 'moyen', Math.round((Date.now() - questionStartTime) / 1000))} points !
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrueFalseQuestionCard;
