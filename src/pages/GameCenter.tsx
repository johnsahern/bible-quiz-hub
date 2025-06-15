import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameModeSelector from '@/components/games/GameModeSelector';
import TrueFalseGame from '@/components/games/TrueFalseGame';
import VersePuzzleGame from '@/components/games/VersePuzzleGame';
import DailyChallengeCard from '@/components/games/DailyChallengeCard';
import { GameMode, TrueFalseQuestion, VersePuzzle, DailyChallenge } from '@/types/gameTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
type GameState = 'selection' | 'playing' | 'results';
const GameCenter = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('selection');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [gameResult, setGameResult] = useState<{
    score: number;
    timeSpent: number;
  } | null>(null);

  // Données de test - à remplacer par des appels API
  const mockTrueFalseQuestions: TrueFalseQuestion[] = [{
    id: '1',
    statement: 'Jésus est né à Bethléem',
    isTrue: true,
    explanation: 'Jésus est effectivement né à Bethléem selon les évangiles de Matthieu et Luc.',
    verse: 'Matthieu 2:1',
    difficulty: 'facile',
    theme: 'vie-jesus'
  }, {
    id: '2',
    statement: 'Moïse a vécu 150 ans',
    isTrue: false,
    explanation: 'Moïse a vécu 120 ans selon Deutéronome 34:7.',
    verse: 'Deutéronome 34:7',
    difficulty: 'moyen',
    theme: 'moise'
  }];
  const mockVersePuzzles: VersePuzzle[] = [{
    id: '1',
    verse: 'Car Dieu a tant aimé le monde',
    reference: 'Jean 3:16',
    scrambledWords: ['monde', 'le', 'tant', 'a', 'Car', 'aimé', 'Dieu'],
    correctOrder: [4, 6, 5, 2, 1, 3, 0],
    difficulty: 'facile',
    theme: 'amour-dieu'
  }];
  const mockDailyChallenge: DailyChallenge = {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    question: mockTrueFalseQuestions[0],
    isCompleted: false,
    streakCount: 5
  };
  const handleModeSelect = (mode: GameMode) => {
    if (mode === 'quiz') {
      navigate('/quiz-solo');
      return;
    }
    setSelectedMode(mode);
    if (mode === 'daily-challenge') {
      // Afficher le défi du jour sans changer d'état
      return;
    }
    setGameState('playing');
  };
  const handleGameComplete = (score: number, timeSpent: number) => {
    setGameResult({
      score,
      timeSpent
    });
    setGameState('results');
  };
  const handleDailyChallengeComplete = (correct: boolean) => {
    console.log('Daily challenge completed:', correct);
    // Ici vous pourriez sauvegarder le résultat et mettre à jour la série
  };
  const handlePlayAgain = () => {
    setGameState('selection');
    setSelectedMode(null);
    setGameResult(null);
  };
  const handleBackToHome = () => {
    navigate('/');
  };
  const renderGameContent = () => {
    if (gameState === 'selection') {
      return <div className="space-y-8">
          <GameModeSelector onModeSelect={handleModeSelect} />
        </div>;
    }
    if (gameState === 'playing') {
      switch (selectedMode) {
        case 'true-false':
          return <TrueFalseGame onGameComplete={handleGameComplete} />;
        case 'verse-puzzle':
          return <VersePuzzleGame puzzles={mockVersePuzzles} onGameComplete={handleGameComplete} />;
        default:
          return <div>Mode de jeu en cours de développement</div>;
      }
    }
    if (gameState === 'results' && gameResult) {
      return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  🎉 Félicitations !
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-bold text-blue-600">
                  {gameResult.score} points
                </div>
                <p className="text-gray-600">
                  Temps total : {Math.floor(gameResult.timeSpent / 60)}m {gameResult.timeSpent % 60}s
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={handlePlayAgain}>
                    Rejouer
                  </Button>
                  <Button variant="outline" onClick={handleBackToHome}>
                    Accueil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>;
    }
    return null;
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {renderGameContent()}
    </div>;
};
export default GameCenter;
