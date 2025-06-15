
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Target, Trophy, RotateCcw } from 'lucide-react';
import { WordSearchGame as WordSearchGameType } from '@/types/gameTypes';
import { useWordSearchGameLogic } from '@/hooks/useWordSearchGameLogic';
import WordSearchGameSetup from './WordSearchGameSetup';

interface WordSearchGameProps {
  onGameComplete: (score: number, timeSpent: number) => void;
}

const WordSearchGame = ({ onGameComplete }: WordSearchGameProps) => {
  const [game, setGame] = useState<WordSearchGameType | null>(null);
  const {
    foundWords,
    selectedCells,
    isSelecting,
    gameCompleted,
    score,
    handleCellClick,
    resetSelection,
    isCellSelected,
    isCellFound,
    getRemainingWords,
    progress,
    timeElapsed
  } = useWordSearchGameLogic(game);

  const handleGameStart = (newGame: WordSearchGameType) => {
    setGame(newGame);
  };

  const handleGameRestart = () => {
    setGame(null);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!game) {
    return <WordSearchGameSetup onGameStart={handleGameStart} />;
  }

  if (gameCompleted) {
    const timeSpent = Math.floor(timeElapsed);
    onGameComplete(score, timeSpent);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header avec statistiques */}
        <Card className="mb-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-purple-900">{game.title}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center text-blue-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTime(timeElapsed)}
                </div>
                <div className="flex items-center text-green-600">
                  <Target className="w-4 h-4 mr-1" />
                  {foundWords.length}/{game.words.length}
                </div>
                <div className="flex items-center text-yellow-600">
                  <Trophy className="w-4 h-4 mr-1" />
                  {score} pts
                </div>
              </div>
            </div>
            
            <Progress value={progress} className="mt-4" />
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Grille de jeu */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div 
                    className="grid gap-1 p-4 bg-gray-50 rounded-lg"
                    style={{ 
                      gridTemplateColumns: `repeat(${game.grid.length}, minmax(0, 1fr))`,
                      maxWidth: '600px'
                    }}
                  >
                    {game.grid.map((row, rowIndex) =>
                      row.map((cell, colIndex) => (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          className={`
                            w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm font-mono font-bold
                            border border-gray-300 rounded transition-all duration-200
                            ${isCellFound(rowIndex, colIndex) 
                              ? 'bg-green-200 text-green-800 border-green-400' 
                              : isCellSelected(rowIndex, colIndex)
                              ? 'bg-blue-200 text-blue-800 border-blue-400'
                              : 'bg-white hover:bg-gray-100'
                            }
                          `}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {cell}
                        </button>
                      ))
                    )}
                  </div>
                </div>
                
                {isSelecting && (
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetSelection}
                      className="text-gray-600"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Annuler sélection
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Liste des mots */}
          <div className="space-y-4">
            {/* Mots trouvés */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-700">
                  Mots trouvés ({foundWords.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {foundWords.map((foundWord, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="font-medium text-green-800">{foundWord.word}</span>
                    <Badge variant="secondary" className="text-xs">
                      +{10 + (foundWord.word.length * 2)} pts
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mots restants */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-700">
                  À trouver ({getRemainingWords().length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {getRemainingWords().map((word, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded">
                    <span className="font-medium text-gray-600">{word}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bouton de retour */}
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={handleGameRestart}
            className="text-gray-600"
          >
            Nouvelle partie
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordSearchGame;
