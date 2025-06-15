
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Settings, Zap, Star } from 'lucide-react';

interface TrueFalseGameSetupProps {
  onStartGame: (theme: string, difficulty: string, questionCount: number) => void;
  isLoading: boolean;
}

const TrueFalseGameSetup = ({ onStartGame, isLoading }: TrueFalseGameSetupProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('vie-jesus');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('facile');
  const [questionCount, setQuestionCount] = useState<number>(5);

  const themes = [
    { id: 'vie-jesus', name: 'Vie de Jésus', description: 'Naissance, ministère, miracles, passion' },
    { id: 'ancien-testament', name: 'Ancien Testament', description: 'Patriarches, Exode, rois, prophètes' },
    { id: 'nouveau-testament', name: 'Nouveau Testament', description: 'Évangiles, Actes, épîtres' },
    { id: 'personnages-bibliques', name: 'Personnages Bibliques', description: 'Héros et figures de la Bible' },
    { id: 'miracles', name: 'Miracles', description: 'Prodiges et guérisons' },
    { id: 'paraboles', name: 'Paraboles', description: 'Enseignements de Jésus' }
  ];

  const difficulties = [
    { id: 'facile', name: 'Facile', description: 'Questions simples', color: 'bg-green-500' },
    { id: 'moyen', name: 'Moyen', description: 'Questions modérées', color: 'bg-yellow-500' },
    { id: 'difficile', name: 'Difficile', description: 'Questions complexes', color: 'bg-red-500' }
  ];

  const handleStartGame = () => {
    onStartGame(selectedTheme, selectedDifficulty, questionCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <CardTitle className="text-2xl font-bold text-gray-800">
                Configuration Vrai ou Faux
              </CardTitle>
            </div>
            <p className="text-gray-600">
              Personnalisez votre expérience de jeu biblique
            </p>
          </CardHeader>
        </Card>

        {/* Sélection du thème */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>Choisir un thème</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTheme === theme.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{theme.name}</h3>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </div>
                  {selectedTheme === theme.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sélection de la difficulté */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span>Niveau de difficulté</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {difficulties.map((diff) => (
              <div
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedDifficulty === diff.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${diff.color}`} />
                    <div>
                      <h3 className="font-medium text-gray-800">{diff.name}</h3>
                      <p className="text-sm text-gray-600">{diff.description}</p>
                    </div>
                  </div>
                  {selectedDifficulty === diff.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nombre de questions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span>Nombre de questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(parseInt(value))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 questions (Rapide)</SelectItem>
                <SelectItem value="10">10 questions (Standard)</SelectItem>
                <SelectItem value="15">15 questions (Approfondi)</SelectItem>
                <SelectItem value="20">20 questions (Marathon)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Résumé et bouton de démarrage */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Prêt à jouer ?</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-white/20">
                  {themes.find(t => t.id === selectedTheme)?.name}
                </Badge>
                <Badge variant="secondary" className="bg-white/20">
                  {difficulties.find(d => d.id === selectedDifficulty)?.name}
                </Badge>
                <Badge variant="secondary" className="bg-white/20">
                  {questionCount} questions
                </Badge>
              </div>
              <Button
                onClick={handleStartGame}
                disabled={isLoading}
                size="lg"
                className="w-full bg-white text-blue-600 hover:bg-gray-50 font-semibold"
              >
                {isLoading ? 'Génération en cours...' : 'Commencer le jeu !'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrueFalseGameSetup;
