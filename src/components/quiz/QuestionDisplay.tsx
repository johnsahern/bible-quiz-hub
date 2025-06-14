
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';
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
    <div className="space-y-4 sm:space-y-6">
      
      {/* Question - Mobile optimized typography */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options - Mobile first design */}
      <div className="space-y-3 sm:space-y-4">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium text-sm sm:text-base";
          
          if (showResult) {
            if (index === question.correctAnswer) {
              buttonClass += " border-green-500 bg-green-50 text-green-800 shadow-md";
            } else if (index === selectedAnswer) {
              buttonClass += " border-red-500 bg-red-50 text-red-800 shadow-md";
            } else {
              buttonClass += " border-gray-200 bg-gray-50 text-gray-500";
            }
          } else if (selectedAnswer === index) {
            buttonClass += " border-blue-500 bg-blue-50 text-blue-800 shadow-md";
          } else {
            buttonClass += " border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md active:scale-[0.98]";
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={buttonClass}
              disabled={showResult}
            >
              <div className="flex items-center justify-between">
                <span className="leading-relaxed pr-2">{option}</span>
                <div className="flex-shrink-0">
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Verset - Mobile optimized */}
      {showResult && question.verse && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-r-xl p-4 sm:p-5 mt-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Référence biblique</h4>
              <p className="text-blue-700 text-sm sm:text-base italic leading-relaxed break-words">
                {question.verse}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
