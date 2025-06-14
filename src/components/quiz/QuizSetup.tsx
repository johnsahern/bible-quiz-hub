
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { QuizConfig, DifficultyLevel, QuizTheme } from '@/types/quiz';
import DifficultySelection from './DifficultySelection';
import ThemeSelection from './ThemeSelection';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const QuizSetup = ({ onStartQuiz }: QuizSetupProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('facile');
  const [selectedTheme, setSelectedTheme] = useState<QuizTheme>('vie-jesus');

  const difficulties = [
    { id: 'facile' as DifficultyLevel, questions: 10 },
    { id: 'moyen' as DifficultyLevel, questions: 15 },
    { id: 'difficile' as DifficultyLevel, questions: 20 }
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
    <div className="max-w-6xl mx-auto space-y-8">
      <DifficultySelection
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
      />

      <ThemeSelection
        selectedTheme={selectedTheme}
        onThemeChange={setSelectedTheme}
      />

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
