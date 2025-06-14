
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
    <>
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-4">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium";
          
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
            buttonClass += " border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md";
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={buttonClass}
              disabled={showResult}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Verset (affiché après réponse) */}
      {showResult && question.verse && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-800 mb-1">Référence biblique</h4>
              <p className="text-blue-700 text-sm italic leading-relaxed">{question.verse}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionDisplay;
