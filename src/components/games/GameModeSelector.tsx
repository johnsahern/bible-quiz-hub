
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  CheckCircle, 
  Puzzle, 
  Grid3x3, 
  Search,
  Trophy, 
  Calendar,
  Users
} from 'lucide-react';
import { GameMode } from '@/types/gameTypes';

interface GameModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

const GameModeSelector = ({ onModeSelect }: GameModeSelectorProps) => {
  const gameModes = [
    {
      id: 'quiz' as GameMode,
      title: 'Quiz Biblique',
      description: 'Questions à choix multiples sur la Bible',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'true-false' as GameMode,
      title: 'Vrai ou Faux',
      description: 'Affirmations bibliques à valider',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'verse-puzzle' as GameMode,
      title: 'Puzzle de Versets',
      description: 'Reconstituez les versets bibliques',
      icon: Puzzle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'crossword' as GameMode,
      title: 'Mots Croisés',
      description: 'Grilles de mots croisés bibliques',
      icon: Grid3x3,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    },
    {
      id: 'word-search' as GameMode,
      title: 'Mots Cachés',
      description: 'Trouvez les mots bibliques dans la grille',
      icon: Search,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Centre de Jeux Bibliques
        </h1>
        <p className="text-gray-600 text-lg">
          Choisissez votre mode de jeu préféré
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {gameModes.map((mode) => {
          const IconComponent = mode.icon;
          return (
            <Card 
              key={mode.id}
              className={`${mode.bgColor} ${mode.borderColor} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
              onClick={() => onModeSelect(mode.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800">
                  {mode.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  {mode.description}
                </p>
                <Button 
                  className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90 text-white`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onModeSelect(mode.id);
                  }}
                >
                  Jouer
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Section des défis spéciaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-lg text-yellow-800">Défi du Jour</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-yellow-700 mb-4 text-sm">
              Une question quotidienne pour maintenir votre série !
            </p>
            <Button 
              onClick={() => onModeSelect('daily-challenge')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-white"
            >
              Voir le défi
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-lg text-indigo-800">Course Biblique</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-indigo-700 mb-4 text-sm">
              Progression par étapes avec récompenses
            </p>
            <Button 
              onClick={() => onModeSelect('biblical-race')}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white"
              disabled
            >
              Bientôt disponible
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameModeSelector;
