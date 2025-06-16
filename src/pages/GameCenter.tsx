
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameModeSelector from '@/components/games/GameModeSelector';
import TrueFalseGame from '@/components/games/TrueFalseGame';
import VersePuzzleGame from '@/components/games/VersePuzzleGame';
import CrosswordGame from '@/components/games/CrosswordGame';
import DailyChallengeCard from '@/components/games/DailyChallengeCard';
import WordSearchGame from '@/components/games/WordSearchGame';
import { GameMode, TrueFalseQuestion, VersePuzzle, DailyChallenge } from '@/types/gameTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight, ArrowLeft } from 'lucide-react';

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

  const handleBackToSelection = () => {
    setGameState('selection');
    setSelectedMode(null);
  };

  const renderGameContent = () => {
    if (gameState === 'selection') {
      return (
        <div className="space-y-8">
          {/* Header avec navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button onClick={handleBackToHome} variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
            <h1 className="text-3xl font-bold text-center">Centre de Jeux</h1>
            <div></div>
          </div>

          {/* Bouton Multijoueur en haut */}
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Multijoueur</h3>
                    <p className="text-white/80">Jouez avec vos amis en temps réel !</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/quiz-multijoueur-setup')}
                  className="bg-white text-purple-600 hover:bg-white/90"
                >
                  Rejoindre
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <GameModeSelector onModeSelect={handleModeSelect} />
        </div>
      );
    }

    if (gameState === 'playing') {
      return (
        <div>
          <div className="mb-6">
            <Button onClick={handleBackToSelection} variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la sélection
            </Button>
          </div>
          
          {(() => {
            switch (selectedMode) {
              case 'true-false':
                return <TrueFalseGame onGameComplete={handleGameComplete} />;
              case 'verse-puzzle':
                return <VersePuzzleGame onGameComplete={handleGameComplete} />;
              case 'crossword':
                return <CrosswordGame onGameComplete={handleGameComplete} />;
              case 'word-search':
                return <WordSearchGame onGameComplete={handleGameComplete} />;
              default:
                return <div>Mode de jeu en cours de développement</div>;
            }
          })()}
        </div>
      );
    }

    if (gameState === 'results' && gameResult) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
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
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {renderGameContent()}
      </div>
    </div>
  );
};

export default GameCenter;
