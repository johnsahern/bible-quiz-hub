
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
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl sm:rounded-2xl border-0">
      <CardContent className="p-3 sm:p-4 lg:p-6">
        
        {/* Mobile: Stack vertically, Desktop: Grid horizontal */}
        <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 lg:gap-6">
          
          {/* Score */}
          <div className="flex items-center justify-between sm:justify-center sm:flex-col sm:text-center space-x-3 sm:space-x-0 sm:space-y-2">
            <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:space-y-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="sm:text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Score</p>
              </div>
            </div>
            <p className="text-lg sm:text-xl font-bold text-blue-600">{score}</p>
          </div>

          {/* Bonnes réponses */}
          <div className="flex items-center justify-between sm:justify-center sm:flex-col sm:text-center space-x-3 sm:space-x-0 sm:space-y-2">
            <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:space-y-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="sm:text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bonnes réponses</p>
              </div>
            </div>
            <p className="text-lg sm:text-xl font-bold text-green-600">{correctAnswers}</p>
          </div>

          {/* Difficulté */}
          <div className="flex items-center justify-between sm:justify-center sm:flex-col sm:text-center space-x-3 sm:space-x-0 sm:space-y-2">
            <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:space-y-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="sm:text-center">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Niveau</p>
              </div>
            </div>
            <Badge 
              className={`${getDifficultyColor(difficulty)} text-xs font-semibold px-2 sm:px-3 py-1 rounded-full`}
            >
              {getDifficultyLabel(difficulty)}
            </Badge>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizStats;
