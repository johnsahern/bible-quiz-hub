import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Target, BookOpen } from 'lucide-react';
import { QuizConfig, DifficultyLevel, QuizTheme } from '@/types/quiz';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const QuizSetup = ({ onStartQuiz }: QuizSetupProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('facile');
  const [selectedTheme, setSelectedTheme] = useState<QuizTheme>('vie-jesus');

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

  const themes = [
    {
      id: 'vie-jesus' as QuizTheme,
      name: 'Vie de Jésus',
      description: 'Naissance, ministère, crucifixion et résurrection',
      icon: '✟'
    },
    {
      id: 'commandements' as QuizTheme,
      name: 'Les Commandements',
      description: 'Les 10 commandements et enseignements moraux',
      icon: '📜'
    },
    {
      id: 'creation' as QuizTheme,
      name: 'La Création',
      description: 'Genèse et les origines du monde',
      icon: '🌍'
    },
    {
      id: 'prophetes' as QuizTheme,
      name: 'Les Prophètes',
      description: 'Messages et prophéties de l\'Ancien Testament',
      icon: '👨‍🦳'
    },
    {
      id: 'nouveau-testament' as QuizTheme,
      name: 'Nouveau Testament',
      description: 'Épîtres et Actes des Apôtres',
      icon: '📖'
    }
  ];

  const selectedDifficultyData = difficulties.find(d => d.id === selectedDifficulty);

  const handleStartQuiz = () => {
    const config: QuizConfig = {
      difficulty: selectedDifficulty,
      theme: selectedTheme,
      questionCount: selectedDifficultyData?.questions || 10
    };
    onStartQuiz(config);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Difficulty Selection */}
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
                onClick={() => setSelectedDifficulty(difficulty.id)}
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

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>Choisissez votre thématique</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTheme === theme.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{theme.icon}</div>
                  <h3 className="font-semibold mb-1">{theme.name}</h3>
                  <p className="text-gray-600 text-sm">{theme.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <Button
          onClick={handleStartQuiz}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
        >
          <Play className="w-5 h-5 mr-2" />
          Commencer le Quiz
          <span className="ml-2 text-sm opacity-90">
            ({selectedDifficultyData?.questions} questions)
          </span>
        </Button>
      </div>
    </div>
  );
};

export default QuizSetup;
