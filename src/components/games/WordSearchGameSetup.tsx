
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search } from 'lucide-react';
import { useWordSearch } from '@/hooks/useWordSearch';
import { WordSearchGame } from '@/types/gameTypes';

interface WordSearchGameSetupProps {
  onGameStart: (game: WordSearchGame) => void;
}

const themes = [
  { id: 'jesus-christ', name: 'Jésus Christ', description: 'La vie et l\'enseignement de Jésus' },
  { id: 'ancien-testament', name: 'Ancien Testament', description: 'Personnages et événements de l\'AT' },
  { id: 'nouveau-testament', name: 'Nouveau Testament', description: 'Apôtres et premiers chrétiens' },
  { id: 'prophetes', name: 'Prophètes', description: 'Les messagers de Dieu' },
  { id: 'moise', name: 'Moïse', description: 'L\'exode et la loi' },
  { id: 'david', name: 'David', description: 'Le roi berger' },
  { id: 'abraham', name: 'Abraham', description: 'Le père de la foi' },
  { id: 'miracles', name: 'Miracles', description: 'Les œuvres extraordinaires' }
];

const difficulties = [
  { id: 'facile', name: 'Facile', description: 'Grille 12x12, 8 mots', color: 'text-green-600' },
  { id: 'moyen', name: 'Moyen', description: 'Grille 15x15, 12 mots', color: 'text-yellow-600' },
  { id: 'difficile', name: 'Difficile', description: 'Grille 18x18, 15 mots', color: 'text-red-600' }
];

const WordSearchGameSetup = ({ onGameStart }: WordSearchGameSetupProps) => {
  const [selectedTheme, setSelectedTheme] = useState('jesus-christ');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'facile' | 'moyen' | 'difficile'>('facile');
  const { generateWordSearch, loading, error } = useWordSearch();

  const handleStartGame = async () => {
    const theme = themes.find(t => t.id === selectedTheme)?.name || selectedTheme;
    
    const game = await generateWordSearch({
      theme,
      difficulty: selectedDifficulty
    });

    if (game) {
      onGameStart(game);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl text-purple-900 mb-2">
              Mots Cachés Bibliques
            </CardTitle>
            <p className="text-gray-600">
              Trouvez tous les mots cachés dans la grille !
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Sélection du thème */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-700">Choisissez un thème</Label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      <div>
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-sm text-gray-500">{theme.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sélection de la difficulté */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-700">Niveau de difficulté</Label>
              <RadioGroup 
                value={selectedDifficulty} 
                onValueChange={(value: 'facile' | 'moyen' | 'difficile') => setSelectedDifficulty(value)}
                className="grid grid-cols-1 gap-4"
              >
                {difficulties.map((difficulty) => (
                  <div key={difficulty.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={difficulty.id} id={difficulty.id} />
                    <div className="flex-1">
                      <Label htmlFor={difficulty.id} className={`font-medium ${difficulty.color} cursor-pointer`}>
                        {difficulty.name}
                      </Label>
                      <p className="text-sm text-gray-500">{difficulty.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button 
              onClick={handleStartGame}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
            >
              {loading ? (
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

export default WordSearchGameSetup;
