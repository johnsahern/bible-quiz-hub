
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getDifficultyLabel, getDifficultyColor } from '@/utils/quizUtils';
import { DifficultyLevel } from '@/types/quiz';
import { Trophy, Target, Award } from 'lucide-react';

interface QuizStatsProps {
  score: number;
  correctAnswers: number;
  difficulty: DifficultyLevel;
}

const QuizStats = ({ score, correctAnswers, difficulty }: QuizStatsProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border-0">
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Score */}
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Score</p>
              <p className="text-xl font-bold text-blue-600">{score}</p>
            </div>
          </div>

          {/* Bonnes réponses */}
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bonnes réponses</p>
              <p className="text-xl font-bold text-green-600">{correctAnswers}</p>
            </div>
          </div>

          {/* Difficulté */}
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Niveau</p>
              <Badge 
                className={`${getDifficultyColor(difficulty)} text-xs font-semibold px-3 py-1 rounded-full`}
              >
                {getDifficultyLabel(difficulty)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizStats;
