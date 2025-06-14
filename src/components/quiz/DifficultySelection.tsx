
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Clock } from 'lucide-react';
import { DifficultyLevel } from '@/types/quiz';

interface DifficultySelectionProps {
  selectedDifficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
}

const DifficultySelection = ({ selectedDifficulty, onDifficultyChange }: DifficultySelectionProps) => {
  const difficulties = [
    {
      id: 'facile' as DifficultyLevel,
      name: 'Facile',
      description: 'Questions générales sur la Bible',
      color: 'bg-green-100 text-green-800',
      questions: 10,
      time: 45
    },
    {
      id: 'moyen' as DifficultyLevel,
      name: 'Moyen',
      description: 'Questions sur les détails bibliques',
      color: 'bg-yellow-100 text-yellow-800',
      questions: 15,
      time: 35
    },
    {
      id: 'difficile' as DifficultyLevel,
      name: 'Difficile',
      description: 'Questions théologiques approfondies',
      color: 'bg-red-100 text-red-800',
      questions: 20,
      time: 30
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-600" />
          <span>Choisissez votre niveau</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedDifficulty === difficulty.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => onDifficultyChange(difficulty.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{difficulty.name}</h3>
                <Badge className={difficulty.color}>
                  {difficulty.questions} Q
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-3">{difficulty.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{difficulty.time}s/question</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DifficultySelection;
