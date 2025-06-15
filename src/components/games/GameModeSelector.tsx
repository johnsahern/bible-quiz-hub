
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Puzzle, 
  Grid3X3, 
  Search, 
  MapPin, 
  Calendar,
  Clock,
  Star,
  Users,
  Brain
} from 'lucide-react';
import { GameMode } from '@/types/gameTypes';

interface GameModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

const GameModeSelector = ({ onModeSelect }: GameModeSelectorProps) => {
  const gameModes = [
    {
      mode: 'quiz' as GameMode,
      title: 'Quiz Biblique',
      description: 'Questions à choix multiples classiques',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      difficulty: 'Tous niveaux'
    },
    {
      mode: 'true-false' as GameMode,
      title: 'Vrai ou Faux',
      description: 'Simple, rapide, addictif - Idéal pour les enfants',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      difficulty: 'Facile'
    },
    {
      mode: 'verse-puzzle' as GameMode,
      title: 'Puzzle de Versets',
      description: 'Recomposer un verset mélangé',
      icon: Puzzle,
      color: 'from-purple-500 to-purple-600',
      difficulty: 'Moyen'
    },
    {
      mode: 'crossword' as GameMode,
      title: 'Mots Croisés',
      description: 'Générés automatiquement par thème',
      icon: Grid3X3,
      color: 'from-orange-500 to-orange-600',
      difficulty: 'Difficile'
    },
    {
      mode: 'word-search' as GameMode,
      title: 'Mots Cachés',
      description: 'Trouvez les mots bibliques cachés',
      icon: Search,
      color: 'from-teal-500 to-teal-600',
      difficulty: 'Facile'
    },
    {
      mode: 'biblical-race' as GameMode,
      title: 'Course Biblique',
      description: 'Parcours à étapes avec défis et récompenses',
      icon: MapPin,
      color: 'from-red-500 to-red-600',
      difficulty: 'Progressive'
    },
    {
      mode: 'daily-challenge' as GameMode,
      title: 'Défi du Jour',
      description: '1 question par jour - Bonus de fidélité',
      icon: Calendar,
      color: 'from-yellow-500 to-yellow-600',
      difficulty: 'Variable'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Choisissez votre Mode de Jeu
        </h1>
        <p className="text-gray-600">
          Explorez la Bible à travers différents types de jeux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameModes.map((game) => {
          const IconComponent = game.icon;
          return (
            <Card 
              key={game.mode}
              className="group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-xl"
              onClick={() => onModeSelect(game.mode)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${game.color} p-6 text-white rounded-t-lg`}>
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{game.title}</h3>
                  <div className="flex items-center justify-center space-x-2 text-sm opacity-90">
                    <Star className="w-4 h-4" />
                    <span>{game.difficulty}</span>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-b-lg">
                  <p className="text-gray-600 text-center mb-4 min-h-[48px]">
                    {game.description}
                  </p>
                  <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                    Jouer
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GameModeSelector;
