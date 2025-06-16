
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  CheckCircle, 
  Puzzle, 
  Grid3X3, 
  Search, 
  Users, 
  Trophy,
  Calendar
} from 'lucide-react';
import { GameMode } from '@/types/gameTypes';

interface GameModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onModeSelect }) => {
  const gameModes = [
    {
      id: 'quiz' as const,
      name: 'Quiz',
      description: 'Questions à choix multiples sur des thèmes bibliques',
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      color: 'from-blue-500 to-purple-500',
      multiplayer: true
    },
    {
      id: 'true-false' as const,
      name: 'Vrai ou Faux',
      description: 'Testez vos connaissances avec des affirmations bibliques',
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      color: 'from-green-500 to-teal-500',
      multiplayer: true
    },
    {
      id: 'verse-puzzle' as const,
      name: 'Puzzle de Versets',
      description: 'Reconstituez des versets bibliques en remettant les mots dans l\'ordre',
      icon: <Puzzle className="w-8 h-8 text-orange-500" />,
      color: 'from-orange-500 to-red-500',
      multiplayer: true
    },
    {
      id: 'crossword' as const,
      name: 'Mots Croisés',
      description: 'Résolvez des grilles de mots croisés bibliques',
      icon: <Grid3X3 className="w-8 h-8 text-purple-500" />,
      color: 'from-purple-500 to-pink-500',
      multiplayer: true
    },
    {
      id: 'word-search' as const,
      name: 'Mots Cachés',
      description: 'Trouvez les mots cachés dans la grille',
      icon: <Search className="w-8 h-8 text-indigo-500" />,
      color: 'from-indigo-500 to-blue-500',
      multiplayer: true
    },
    {
      id: 'daily-challenge' as const,
      name: 'Défi Quotidien',
      description: 'Une question spéciale chaque jour pour maintenir votre série',
      icon: <Calendar className="w-8 h-8 text-yellow-500" />,
      color: 'from-yellow-500 to-orange-500',
      multiplayer: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gameModes.map((mode) => (
        <Card key={mode.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group" onClick={() => onModeSelect(mode.id)}>
          <CardHeader className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${mode.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {mode.icon}
            </div>
            <CardTitle className="text-white text-xl">{mode.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-white/70 text-sm leading-relaxed">
              {mode.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-white/60">
              {mode.multiplayer && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>Multijoueur</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>Points</span>
              </div>
            </div>
            <Button 
              className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90 text-white border-0`}
            >
              Jouer
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameModeSelector;
