
import { CheckCircle, XCircle } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';

interface QuestionDisplayProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

const QuestionDisplay = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerSelect
}: QuestionDisplayProps) => {
  return (
    <>
      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left border-2 transition-all duration-200";
          
          if (showResult) {
            if (index === question.correctAnswer) {
              buttonClass += " border-green-500 bg-green-50 text-green-800";
            } else if (index === selectedAnswer) {
              buttonClass += " border-red-500 bg-red-50 text-red-800";
            } else {
              buttonClass += " border-gray-200 bg-gray-50 text-gray-500";
            }
          } else if (selectedAnswer === index) {
            buttonClass += " border-blue-500 bg-blue-50 text-blue-800";
          } else {
            buttonClass += " border-gray-200 hover:border-blue-300 hover:bg-blue-50";
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={buttonClass}
              disabled={showResult}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === question.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Verset (affiché après réponse) */}
      {showResult && question.verse && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-blue-800 italic text-sm">{question.verse}</p>
        </div>
      )}
    </>
  );
};

export default QuestionDisplay;
