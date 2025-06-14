
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, History } from 'lucide-react';

interface QuizHistory {
  id: string;
  theme: string;
  difficulty: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  time_spent: number;
  badge: string | null;
  created_at: string;
}

interface QuizHistoryTabProps {
  quizHistory: QuizHistory[];
}

const QuizHistoryTab = ({ quizHistory }: QuizHistoryTabProps) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <History className="w-5 h-5 mr-2" />
          Historique des Quiz
        </CardTitle>
      </CardHeader>
      <CardContent>
        {quizHistory.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun quiz joué pour le moment</p>
            <Button 
              onClick={() => navigate('/quiz-solo')} 
              className="mt-4"
              variant="outline"
            >
              Commencer un quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {quizHistory.map((quiz) => (
              <div key={quiz.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1 mb-3 sm:mb-0">
                  <div className="font-medium text-gray-900">{quiz.theme}</div>
                  <div className="text-sm text-gray-600">
                    {quiz.correct_answers}/{quiz.total_questions} bonnes réponses
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(quiz.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end sm:text-right gap-4">
                  <Badge variant="outline" className="text-xs">
                    {quiz.difficulty}
                  </Badge>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{quiz.score} pts</div>
                    {quiz.badge && (
                      <div className="text-xs text-amber-600">{quiz.badge}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizHistoryTab;
