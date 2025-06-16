
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Grid3x3, Trophy, Clock, Target, ArrowLeft } from 'lucide-react';
import { useCrosswords } from '@/hooks/useCrosswords';
import { useCrosswordGameLogic } from '@/hooks/useCrosswordGameLogic';
import CrosswordGameSetup from './CrosswordGameSetup';

interface CrosswordGameProps {
  onGameComplete: (score: number, timeSpent: number) => void;
}

const CrosswordGame = ({ onGameComplete }: CrosswordGameProps) => {
  const { crossword, isLoading, error } = useCrosswords();
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentInputs, setCurrentInputs] = useState<{[key: string]: string}>({});

  const {
    userAnswers,
    completedClues,
    score,
    gameSettings,
    handleAnswerSubmit,
    checkAnswer,
    getGridDisplayValue,
    startGame,
    resetGame
  } = useCrosswordGameLogic(crossword, onGameComplete);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const handleGameStart = (theme: string, difficulty: string, gridSize: number) => {
    if (crossword) {
      startGame(theme, difficulty, gridSize);
      setGameState('playing');
      setTimeElapsed(0);
    }
  };

  const handleInputChange = (wordIndex: number, value: string) => {
    const inputKey = `input-${wordIndex}`;
    setCurrentInputs(prev => ({ ...prev, [inputKey]: value }));
  };

  const handleInputSubmit = (wordIndex: number) => {
    const inputKey = `input-${wordIndex}`;
    const answer = currentInputs[inputKey] || '';
    
    if (answer.trim()) {
      handleAnswerSubmit(wordIndex, answer);
      
      // Vider l'input si la réponse est correcte
      if (checkAnswer(wordIndex, answer)) {
        setCurrentInputs(prev => ({ ...prev, [inputKey]: '' }));
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBackToSetup = () => {
    setGameState('setup');
    resetGame();
    setCurrentInputs({});
    setTimeElapsed(0);
  };

  if (gameState === 'setup') {
    return <CrosswordGameSetup onGameStart={handleGameStart} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <Grid3x3 className="w-12 h-12 mx-auto mb-4 animate-pulse text-blue-600" />
            <p className="text-lg">Génération des mots croisés...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !crossword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-red-600 mb-4">{error || 'Erreur de chargement'}</p>
            <Button onClick={handleBackToSetup}>Retour à la configuration</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleBackToSetup}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <CardTitle className="flex items-center gap-2">
                <Grid3x3 className="w-6 h-6 text-blue-600" />
                Mots Croisés - {gameSettings?.theme?.replace('-', ' ')}
              </CardTitle>
              <Badge variant="outline">{gameSettings?.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold">{score} points</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>{completedClues}/{crossword.words.length} mots</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grille */}
          <Card>
            <CardHeader>
              <CardTitle>Grille {crossword.gridSize}x{crossword.gridSize}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="grid gap-1 mx-auto"
                style={{ 
                  gridTemplateColumns: `repeat(${crossword.gridSize}, 1fr)`,
                  maxWidth: '400px'
                }}
              >
                {Array.from({ length: crossword.gridSize * crossword.gridSize }).map((_, index) => {
                  const row = Math.floor(index / crossword.gridSize);
                  const col = index % crossword.gridSize;
                  const cellValue = getGridDisplayValue(row, col);
                  const isEmpty = cellValue === null;
                  
                  return (
                    <div
                      key={index}
                      className={`aspect-square border flex items-center justify-center text-xs font-mono font-bold ${
                        isEmpty 
                          ? 'bg-gray-800 border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {!isEmpty && cellValue}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Indices et réponses */}
          <Card>
            <CardHeader>
              <CardTitle>Indices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {crossword.words.map((word, index) => {
                  const wordKey = `word-${index}`;
                  const inputKey = `input-${index}`;
                  const isCompleted = !!userAnswers[wordKey];
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Badge variant={isCompleted ? "default" : "outline"} className="mt-1">
                          {index + 1}
                        </Badge>
                        <div className="flex-1">
                          <p className={`text-sm ${isCompleted ? 'text-green-700 line-through' : ''}`}>
                            <strong>{word.direction === 'horizontal' ? 'H' : 'V'}</strong> - {word.clue}
                          </p>
                          <p className="text-xs text-gray-500">
                            {word.length} lettres
                          </p>
                        </div>
                      </div>
                      
                      {!isCompleted && (
                        <div className="flex gap-2">
                          <Input
                            value={currentInputs[inputKey] || ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleInputSubmit(index);
                              }
                            }}
                            placeholder={`${word.length} lettres`}
                            maxLength={word.length}
                            className="text-sm"
                          />
                          <Button 
                            size="sm" 
                            onClick={() => handleInputSubmit(index)}
                            disabled={!currentInputs[inputKey]?.trim()}
                          >
                            OK
                          </Button>
                        </div>
                      )}
                      
                      {isCompleted && (
                        <div className="bg-green-50 p-2 rounded border border-green-200">
                          <p className="text-green-800 font-semibold text-sm">
                            ✅ {userAnswers[wordKey]}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrosswordGame;
