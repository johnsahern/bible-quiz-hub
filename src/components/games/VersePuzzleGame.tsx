
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Puzzle, Clock, Star, RotateCcw, CheckCircle, ArrowLeft } from 'lucide-react';
import { useVersePuzzles } from '@/hooks/useVersePuzzles';
import { useVersePuzzleGameLogic } from '@/hooks/useVersePuzzleGameLogic';
import VersePuzzleGameSetup from './VersePuzzleGameSetup';

interface VersePuzzleGameProps {
  onGameComplete: (score: number, timeSpent: number) => void;
}

const VersePuzzleGame = ({ onGameComplete }: VersePuzzleGameProps) => {
  const { puzzles, isLoading, error, generatePuzzles } = useVersePuzzles();
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'completed'>('setup');
  
  const gameLogic = useVersePuzzleGameLogic(puzzles, onGameComplete);
  const {
    currentPuzzle,
    score,
    selectedWords,
    availableWords,
    isCompleted,
    timeLeft,
    gameSettings,
    setTimeLeft,
    handleWordSelect,
    handleWordRemove,
    handleTimeUp,
    resetPuzzle,
    startGame,
    resetGame,
    calculatePoints
  } = gameLogic;

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPuzzle, gameState, handleTimeUp, setTimeLeft]);

  const handleStartGame = async (theme: string, difficulty: string, puzzleCount: number) => {
    await generatePuzzles(theme, difficulty, puzzleCount);
    startGame(theme, difficulty, puzzleCount);
    setGameState('playing');
  };

  const handleBackToSetup = () => {
    setGameState('setup');
    resetGame();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold text-red-600 mb-4">Erreur</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={handleBackToSetup} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'setup') {
    return <VersePuzzleGameSetup onStartGame={handleStartGame} isLoading={isLoading} />;
  }

  if (puzzles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-4">Aucun puzzle disponible.</p>
              <Button onClick={handleBackToSetup}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const puzzle = puzzles[currentPuzzle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToSetup}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Puzzle className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-semibold">Puzzle de Versets</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{score}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="font-bold">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Puzzle {currentPuzzle + 1} sur {puzzles.length}</span>
            <span>{puzzle.reference}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPuzzle + 1) / puzzles.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Selected Words Area */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <span>Recomposez le verset</span>
              {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {selectedWords.map((wordIndex, selectedIndex) => (
                  <Button
                    key={selectedIndex}
                    variant="outline"
                    onClick={() => handleWordRemove(selectedIndex)}
                    className="bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200"
                    disabled={isCompleted}
                  >
                    {puzzle.scrambledWords[wordIndex]}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={resetPuzzle}
                disabled={isCompleted}
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recommencer</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Words */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Mots disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableWords.map((word, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleWordSelect(index)}
                  disabled={!word || isCompleted}
                  className={`h-12 ${word ? 'bg-white hover:bg-gray-50' : 'invisible'}`}
                >
                  {word}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {isCompleted && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Excellent !</h3>
                <p className="text-gray-600 mb-4">Vous avez recomposé le verset correctement</p>
                <p className="text-sm text-gray-500 italic mb-2">"{puzzle.verse}"</p>
                <p className="text-xs text-gray-400 mb-4">{puzzle.reference}</p>
                <div className="p-2 bg-green-100 rounded border border-green-300">
                  <p className="text-sm text-green-700 font-medium">
                    +{calculatePoints(puzzle.difficulty, timeLeft)} points !
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersePuzzleGame;
