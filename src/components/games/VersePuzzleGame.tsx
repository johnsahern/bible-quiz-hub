
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Puzzle, Clock, Star, RotateCcw, CheckCircle } from 'lucide-react';
import { VersePuzzle } from '@/types/gameTypes';

interface VersePuzzleGameProps {
  puzzles: VersePuzzle[];
  onGameComplete: (score: number, timeSpent: number) => void;
}

const VersePuzzleGame = ({ puzzles, onGameComplete }: VersePuzzleGameProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStartTime] = useState(Date.now());

  useEffect(() => {
    resetPuzzle();
  }, [currentPuzzle]);

  useEffect(() => {
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
  }, [currentPuzzle]);

  const resetPuzzle = () => {
    const puzzle = puzzles[currentPuzzle];
    setAvailableWords([...puzzle.scrambledWords]);
    setSelectedWords([]);
    setIsCompleted(false);
    setTimeLeft(60);
  };

  const handleTimeUp = () => {
    if (!isCompleted) {
      nextPuzzle();
    }
  };

  const handleWordSelect = (wordIndex: number) => {
    const word = availableWords[wordIndex];
    if (!word) return;

    setSelectedWords(prev => [...prev, wordIndex]);
    setAvailableWords(prev => prev.map((w, i) => i === wordIndex ? '' : w));

    // Vérifier si le puzzle est terminé
    const newSelectedWords = [...selectedWords, wordIndex];
    if (newSelectedWords.length === puzzles[currentPuzzle].correctOrder.length) {
      checkSolution(newSelectedWords);
    }
  };

  const handleWordRemove = (selectedIndex: number) => {
    const wordIndex = selectedWords[selectedIndex];
    const word = puzzles[currentPuzzle].scrambledWords[wordIndex];

    setSelectedWords(prev => prev.filter((_, i) => i !== selectedIndex));
    setAvailableWords(prev => prev.map((w, i) => i === wordIndex ? word : w));
  };

  const checkSolution = (wordsOrder: number[]) => {
    const puzzle = puzzles[currentPuzzle];
    const isCorrect = JSON.stringify(wordsOrder) === JSON.stringify(puzzle.correctOrder);
    
    if (isCorrect) {
      setIsCompleted(true);
      const bonus = timeLeft > 30 ? 200 : timeLeft > 10 ? 150 : 100;
      setScore(prev => prev + bonus);
      
      setTimeout(() => {
        nextPuzzle();
      }, 3000);
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
    } else {
      const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
      onGameComplete(score, timeSpent);
    }
  };

  const puzzle = puzzles[currentPuzzle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
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
                <p className="text-sm text-gray-500 italic">"{puzzle.verse}"</p>
                <p className="text-xs text-gray-400 mt-2">{puzzle.reference}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersePuzzleGame;
