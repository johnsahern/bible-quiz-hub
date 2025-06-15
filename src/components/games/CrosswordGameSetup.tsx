
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Grid3x3 } from 'lucide-react';
import { useCrosswords } from '@/hooks/useCrosswords';

interface CrosswordGameSetupProps {
  onGameStart: (theme: string, difficulty: string, gridSize: number) => void;
}

const CrosswordGameSetup = ({ onGameStart }: CrosswordGameSetupProps) => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedGridSize, setSelectedGridSize] = useState(10);
  const { generateCrossword, isLoading, error } = useCrosswords();

  const themes = [
    { id: 'jesus-christ', name: 'Jésus-Christ', description: 'La vie et les enseignements de Jésus' },
    { id: 'ancien-testament', name: 'Ancien Testament', description: 'Patriarches, prophètes et rois' },
    { id: 'nouveau-testament', name: 'Nouveau Testament', description: 'Apôtres, épîtres et évangiles' },
    { id: 'prophetes', name: 'Prophètes', description: 'Les messagers de Dieu' },
    { id: 'miracles', name: 'Miracles', description: 'Les prodiges bibliques' },
    { id: 'paraboles', name: 'Paraboles', description: 'Les enseignements de Jésus' },
    { id: 'geographie', name: 'Géographie', description: 'Lieux et régions bibliques' },
    { id: 'fetes-celebrations', name: 'Fêtes', description: 'Célébrations bibliques' }
  ];

  const difficulties = [
    { id: 'facile', name: 'Facile', description: '8 mots, 4-7 lettres' },
    { id: 'moyen', name: 'Moyen', description: '12 mots, 5-9 lettres' },
    { id: 'difficile', name: 'Difficile', description: '15 mots, 6-12 lettres' }
  ];

  const gridSizes = [
    { size: 8, name: '8x8', description: 'Compact' },
    { size: 10, name: '10x10', description: 'Standard' },
    { size: 12, name: '12x12', description: 'Large' }
  ];

  const handleStartGame = async () => {
    if (!selectedTheme || !selectedDifficulty) return;

    try {
      await generateCrossword(selectedTheme, selectedDifficulty, selectedGridSize);
      onGameStart(selectedTheme, selectedDifficulty, selectedGridSize);
    } catch (err) {
      console.error('Erreur lors du démarrage:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
              <Grid3x3 className="w-8 h-8 text-blue-600" />
              Mots Croisés Bibliques
            </CardTitle>
            <p className="text-center text-gray-600">
              Résolvez des mots croisés sur les thèmes bibliques
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Sélection du thème */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Choisissez un thème</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <Card 
                    key={theme.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTheme === theme.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-blue-900">{theme.name}</h3>
                      <p className="text-sm text-gray-600">{theme.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sélection de la difficulté */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Niveau de difficulté</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {difficulties.map((diff) => (
                  <Card 
                    key={diff.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedDifficulty === diff.id 
                        ? 'ring-2 ring-green-500 bg-green-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDifficulty(diff.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-green-900">{diff.name}</h3>
                      <p className="text-sm text-gray-600">{diff.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Taille de la grille */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Taille de la grille</Label>
              <Select value={selectedGridSize.toString()} onValueChange={(value) => setSelectedGridSize(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez la taille" />
                </SelectTrigger>
                <SelectContent>
                  {gridSizes.map((grid) => (
                    <SelectItem key={grid.size} value={grid.size.toString()}>
                      {grid.name} - {grid.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bouton de démarrage */}
            <Button 
              onClick={handleStartGame}
              disabled={!selectedTheme || !selectedDifficulty || isLoading}
              className="w-full h-12 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                'Commencer la partie'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrosswordGameSetup;
