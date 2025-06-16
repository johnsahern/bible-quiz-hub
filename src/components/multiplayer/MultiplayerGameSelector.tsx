
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { GameType, MultiplayerGameConfig } from '@/types/multiplayerGameTypes';
import { getThemes } from '@/data/themes';
import { 
  Brain, 
  CheckCircle, 
  Puzzle, 
  Grid3X3, 
  Search,
  Users,
  Play
} from 'lucide-react';

interface MultiplayerGameSelectorProps {
  onGameStart: (config: MultiplayerGameConfig) => void;
  loading?: boolean;
}

const MultiplayerGameSelector: React.FC<MultiplayerGameSelectorProps> = ({ 
  onGameStart, 
  loading = false 
}) => {
  const [selectedGame, setSelectedGame] = useState<GameType>('quiz');
  const [theme, setTheme] = useState('');
  const [difficulty, setDifficulty] = useState('moyen');
  const [questionCount, setQuestionCount] = useState(10);

  const themes = getThemes();

  const gameTypes: Array<{ id: GameType; name: string; icon: React.ReactNode; description: string }> = [
    { 
      id: 'quiz', 
      name: 'Quiz', 
      icon: <Brain className="w-5 h-5" />, 
      description: 'Questions à choix multiples' 
    },
    { 
      id: 'true-false', 
      name: 'Vrai/Faux', 
      icon: <CheckCircle className="w-5 h-5" />, 
      description: 'Questions vrai ou faux' 
    },
    { 
      id: 'verse-puzzle', 
      name: 'Puzzle de Versets', 
      icon: <Puzzle className="w-5 h-5" />, 
      description: 'Reconstituer des versets' 
    },
    { 
      id: 'crossword', 
      name: 'Mots Croisés', 
      icon: <Grid3X3 className="w-5 h-5" />, 
      description: 'Grille de mots croisés' 
    },
    { 
      id: 'word-search', 
      name: 'Mots Cachés', 
      icon: <Search className="w-5 h-5" />, 
      description: 'Trouver des mots cachés' 
    }
  ];

  const handleStart = () => {
    if (!theme) return;

    const config: MultiplayerGameConfig = {
      gameType: selectedGame,
      theme,
      difficulty,
      questionCount: selectedGame === 'verse-puzzle' ? 5 : questionCount,
      gridSize: selectedGame === 'crossword' ? 10 : undefined,
      puzzleCount: selectedGame === 'verse-puzzle' ? 5 : undefined
    };

    onGameStart(config);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Configuration du Jeu Multijoueur
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection du type de jeu */}
        <div className="space-y-3">
          <Label className="text-white">Type de jeu</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gameTypes.map((gameType) => (
              <button
                key={gameType.id}
                onClick={() => setSelectedGame(gameType.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedGame === gameType.id
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2 text-white mb-1">
                  {gameType.icon}
                  <span className="font-medium">{gameType.name}</span>
                </div>
                <p className="text-white/70 text-xs">{gameType.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Configuration du jeu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Thème</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un thème" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Difficulté</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facile">Facile</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="difficile">Difficile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Paramètres spécifiques */}
        {(selectedGame === 'quiz' || selectedGame === 'true-false') && (
          <div className="space-y-2">
            <Label className="text-white">Nombre de questions</Label>
            <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 questions</SelectItem>
                <SelectItem value="10">10 questions</SelectItem>
                <SelectItem value="15">15 questions</SelectItem>
                <SelectItem value="20">20 questions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button 
          onClick={handleStart} 
          disabled={loading || !theme} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Play className="w-4 h-4 mr-2" />
          {loading ? 'Démarrage...' : 'Démarrer la partie'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MultiplayerGameSelector;
