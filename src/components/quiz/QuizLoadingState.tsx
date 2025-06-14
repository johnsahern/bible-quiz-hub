
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { QuizConfig } from '@/types/quiz';

interface QuizLoadingStateProps {
  config: QuizConfig;
}

const QuizLoadingState = ({ config }: QuizLoadingStateProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">✨ Génération du Quiz</h2>
          <p className="text-gray-600 mb-2">
            Préparation de {config.questionCount} questions uniques sur <strong>{config.theme}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Niveau: <span className="font-medium">{config.difficulty}</span>
          </p>
          <div className="mt-4 text-sm text-gray-500">
            ⏳ Création de questions originales avec l'IA avancée...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizLoadingState;
