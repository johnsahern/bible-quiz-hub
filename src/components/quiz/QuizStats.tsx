
interface QuizStatsProps {
  score: number;
  correctAnswers: number;
}

const QuizStats = ({ score, correctAnswers }: QuizStatsProps) => {
  return (
    <div className="mt-4 text-center">
      <div className="inline-flex items-center space-x-4 bg-white rounded-lg px-4 py-2 shadow">
        <span className="text-sm text-gray-600">Score actuel:</span>
        <span className="font-bold text-blue-600">{score} points</span>
        <span className="text-sm text-gray-600">|</span>
        <span className="text-sm text-green-600">{correctAnswers} bonnes réponses</span>
      </div>
    </div>
  );
};

export default QuizStats;
