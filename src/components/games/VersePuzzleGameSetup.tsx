
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Puzzle, Loader2 } from 'lucide-react';

interface VersePuzzleGameSetupProps {
  onStartGame: (theme: string, difficulty: string, puzzleCount: number) => void;
  isLoading: boolean;
}

const VersePuzzleGameSetup = ({ onStartGame, isLoading }: VersePuzzleGameSetupProps) => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCount, setSelectedCount] = useState('');

  const themes = [
    { value: 'vie-jesus', label: '✝️ Vie de Jésus', description: 'Naissance, ministère, miracles, passion' },
    { value: 'amour-dieu', label: '❤️ Amour de Dieu', description: 'Grâce, miséricorde, salut' },
    { value: 'sagesse', label: '💎 Sagesse', description: 'Proverbes et conseils bibliques' },
    { value: 'foi', label: '🙏 Foi', description: 'Confiance en Dieu, espérance' },
    { value: 'priere', label: '🤲 Prière', description: 'Enseignements sur la prière' },
    { value: 'famille', label: '👨‍👩‍👧‍👦 Famille', description: 'Mariage, enfants, relations' },
    { value: 'creation', label: '🌍 Création', description: 'Récits de la création divine' },
    { value: 'prophetes', label: '📢 Prophètes', description: 'Messages prophétiques' },
    { value: 'psaumes', label: '🎵 Psaumes', description: 'Louanges et prières de David' },
    { value: 'paraboles', label: '📚 Paraboles', description: 'Enseignements de Jésus' },
    { value: 'miracles', label: '✨ Miracles', description: 'Prodiges et guérisons' },
    { value: 'resurrection', label: '🌅 Résurrection', description: 'Victoire sur la mort' },
    { value: 'esperance', label: '🌟 Espérance', description: 'Promesses de consolation' },
    { value: 'justice', label: '⚖️ Justice', description: 'Justice divine et humaine' },
    { value: 'pardon', label: '🕊️ Pardon', description: 'Réconciliation et grâce' }
  ];

  const difficulties = [
    { value: 'facile', label: '🟢 Facile', description: 'Versets courts (5-8 mots)' },
    { value: 'moyen', label: '🟡 Moyen', description: 'Versets moyens (8-12 mots)' },
    { value: 'difficile', label: '🔴 Difficile', description: 'Versets longs (12+ mots)' }
  ];

  const puzzleCounts = [
    { value: '3', label: '3 puzzles', description: 'Partie rapide (~5 min)' },
    { value: '5', label: '5 puzzles', description: 'Partie normale (~8 min)' },
    { value: '8', label: '8 puzzles', description: 'Partie longue (~12 min)' },
    { value: '10', label: '10 puzzles', description: 'Défi complet (~15 min)' }
  ];

  const handleStartGame = () => {
    if (selectedTheme && selectedDifficulty && selectedCount) {
      onStartGame(selectedTheme, selectedDifficulty, parseInt(selectedCount));
    }
  };

  const canStart = selectedTheme && selectedDifficulty && selectedCount && !isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Puzzle className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-purple-800">Puzzle de Versets</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recomposez les versets bibliques en remettant les mots dans le bon ordre. 
            Chaque puzzle est généré par l'IA pour une expérience unique !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sélection du thème */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📖 Thème</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un thème..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {themes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      <div>
                        <div className="font-medium">{theme.label}</div>
                        <div className="text-xs text-gray-500">{theme.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Sélection de la difficulté */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⚡ Difficulté</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la difficulté..." />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      <div>
                        <div className="font-medium">{difficulty.label}</div>
                        <div className="text-xs text-gray-500">{difficulty.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Sélection du nombre de puzzles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Nombre</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedCount} onValueChange={setSelectedCount}>
                <SelectTrigger>
                  <SelectValue placeholder="Nombre de puzzles..." />
                </SelectTrigger>
                <SelectContent>
                  {puzzleCounts.map((count) => (
                    <SelectItem key={count.value} value={count.value}>
                      <div>
                        <div className="font-medium">{count.label}</div>
                        <div className="text-xs text-gray-500">{count.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Système de points */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">🏆 Système de points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">50 + bonus</div>
                <div className="text-sm text-green-700">Facile</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">75 + bonus</div>
                <div className="text-sm text-yellow-700">Moyen</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">100 + bonus</div>
                <div className="text-sm text-red-700">Difficile</div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              + 2 points par seconde restante
            </p>
          </CardContent>
        </Card>

        {/* Bouton de démarrage */}
        <div className="text-center">
          <Button
            onClick={handleStartGame}
            disabled={!canStart}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Génération des puzzles...
              </>
            ) : (
              <>
                <Puzzle className="w-5 h-5 mr-2" />
                Commencer la partie
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VersePuzzleGameSetup;
