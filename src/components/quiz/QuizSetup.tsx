
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Target, BookOpen, Search } from 'lucide-react';
import { QuizConfig, DifficultyLevel, QuizTheme } from '@/types/quiz';
import { Input } from '@/components/ui/input';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const QuizSetup = ({ onStartQuiz }: QuizSetupProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('facile');
  const [selectedTheme, setSelectedTheme] = useState<QuizTheme>('vie-jesus');
  const [searchTerm, setSearchTerm] = useState('');

  const difficulties = [
    {
      id: 'facile' as DifficultyLevel,
      name: 'Facile',
      description: 'Questions générales sur la Bible',
      color: 'bg-green-100 text-green-800',
      questions: 10,
      time: 45
    },
    {
      id: 'moyen' as DifficultyLevel,
      name: 'Moyen',
      description: 'Questions sur les détails bibliques',
      color: 'bg-yellow-100 text-yellow-800',
      questions: 15,
      time: 35
    },
    {
      id: 'difficile' as DifficultyLevel,
      name: 'Difficile',
      description: 'Questions théologiques approfondies',
      color: 'bg-red-100 text-red-800',
      questions: 20,
      time: 30
    }
  ];

  const themes = [
    // Nouveau Testament
    { id: 'vie-jesus' as QuizTheme, name: 'Vie de Jésus', description: 'Naissance, ministère, crucifixion et résurrection', icon: '✟', category: 'Nouveau Testament' },
    { id: 'miracles-jesus' as QuizTheme, name: 'Miracles de Jésus', description: 'Guérisons, multiplications, résurrections', icon: '✨', category: 'Nouveau Testament' },
    { id: 'paraboles-jesus' as QuizTheme, name: 'Paraboles de Jésus', description: 'Enseignements par paraboles', icon: '📚', category: 'Nouveau Testament' },
    { id: 'passion-christ' as QuizTheme, name: 'Passion du Christ', description: 'Dernière semaine, crucifixion, mort', icon: '⚜️', category: 'Nouveau Testament' },
    { id: 'resurrection' as QuizTheme, name: 'Résurrection', description: 'Résurrection et apparitions', icon: '🌅', category: 'Nouveau Testament' },
    { id: 'evangeliles' as QuizTheme, name: 'Les Évangiles', description: 'Matthieu, Marc, Luc, Jean', icon: '📖', category: 'Nouveau Testament' },
    { id: 'actes-apotres' as QuizTheme, name: 'Actes des Apôtres', description: 'Débuts de l\'Église primitive', icon: '🔥', category: 'Nouveau Testament' },
    { id: 'epitres-paul' as QuizTheme, name: 'Épîtres de Paul', description: 'Lettres de l\'apôtre Paul', icon: '✉️', category: 'Nouveau Testament' },
    { id: 'pierre-jean' as QuizTheme, name: 'Pierre et Jean', description: 'Épîtres de Pierre et Jean', icon: '🗝️', category: 'Nouveau Testament' },
    { id: 'apocalypse' as QuizTheme, name: 'Apocalypse', description: 'Révélations de Jean', icon: '🌟', category: 'Nouveau Testament' },
    { id: 'pentecote' as QuizTheme, name: 'Pentecôte', description: 'Descente du Saint-Esprit', icon: '🕊️', category: 'Nouveau Testament' },
    { id: 'eglise-primitive' as QuizTheme, name: 'Église Primitive', description: 'Premières communautés chrétiennes', icon: '⛪', category: 'Nouveau Testament' },
    { id: 'voyages-paul' as QuizTheme, name: 'Voyages de Paul', description: 'Missions apostoliques de Paul', icon: '🗺️', category: 'Nouveau Testament' },

    // Ancien Testament - Pentateuque
    { id: 'creation' as QuizTheme, name: 'La Création', description: 'Genèse et les origines du monde', icon: '🌍', category: 'Pentateuque' },
    { id: 'genese' as QuizTheme, name: 'Genèse', description: 'Premier livre de la Bible', icon: '🌱', category: 'Pentateuque' },
    { id: 'exode' as QuizTheme, name: 'Exode', description: 'Sortie d\'Égypte et Mont Sinaï', icon: '🏔️', category: 'Pentateuque' },
    { id: 'nombres' as QuizTheme, name: 'Nombres', description: 'Quarante ans dans le désert', icon: '🏜️', category: 'Pentateuque' },
    { id: 'deuteronome' as QuizTheme, name: 'Deutéronome', description: 'Répétition de la Loi', icon: '📜', category: 'Pentateuque' },
    { id: 'commandements' as QuizTheme, name: 'Les Commandements', description: 'Les 10 commandements et enseignements moraux', icon: '📋', category: 'Pentateuque' },

    // Livres historiques
    { id: 'josue' as QuizTheme, name: 'Josué', description: 'Conquête de la Terre Promise', icon: '⚔️', category: 'Livres Historiques' },
    { id: 'juges-israel' as QuizTheme, name: 'Juges d\'Israël', description: 'Époque des Juges', icon: '⚖️', category: 'Livres Historiques' },
    { id: 'ruth' as QuizTheme, name: 'Ruth', description: 'Histoire de Ruth et Naomi', icon: '💐', category: 'Livres Historiques' },
    { id: 'samuel' as QuizTheme, name: 'Samuel', description: 'Le prophète Samuel', icon: '👨‍🦳', category: 'Livres Historiques' },
    { id: 'rois-israel' as QuizTheme, name: 'Rois d\'Israël', description: 'Royaume unifié et divisé', icon: '👑', category: 'Livres Historiques' },
    { id: 'chroniques' as QuizTheme, name: 'Chroniques', description: 'Histoire des rois de Juda', icon: '📊', category: 'Livres Historiques' },
    { id: 'esdras' as QuizTheme, name: 'Esdras', description: 'Retour d\'exil et reconstruction', icon: '🏗️', category: 'Livres Historiques' },
    { id: 'nehemie' as QuizTheme, name: 'Néhémie', description: 'Reconstruction des murailles', icon: '🧱', category: 'Livres Historiques' },
    { id: 'esther' as QuizTheme, name: 'Esther', description: 'Reine qui sauva son peuple', icon: '👸', category: 'Livres Historiques' },

    // Livres poétiques
    { id: 'job' as QuizTheme, name: 'Job', description: 'Épreuves et fidélité de Job', icon: '💼', category: 'Livres Poétiques' },
    { id: 'psalmes' as QuizTheme, name: 'Psaumes', description: 'Cantiques et prières de David', icon: '🎵', category: 'Livres Poétiques' },
    { id: 'proverbes' as QuizTheme, name: 'Proverbes', description: 'Sagesse de Salomon', icon: '💡', category: 'Livres Poétiques' },
    { id: 'ecclesiaste' as QuizTheme, name: 'Ecclésiaste', description: 'Réflexions sur la vie', icon: '🤔', category: 'Livres Poétiques' },
    { id: 'cantiques' as QuizTheme, name: 'Cantique des Cantiques', description: 'Chant d\'amour poétique', icon: '🌹', category: 'Livres Poétiques' },

    // Prophètes majeurs
    { id: 'esaie' as QuizTheme, name: 'Ésaïe', description: 'Grand prophète messianique', icon: '🕊️', category: 'Prophètes Majeurs' },
    { id: 'jeremie' as QuizTheme, name: 'Jérémie', description: 'Prophète de l\'exil', icon: '😢', category: 'Prophètes Majeurs' },
    { id: 'lamentations' as QuizTheme, name: 'Lamentations', description: 'Plaintes sur Jérusalem', icon: '💔', category: 'Prophètes Majeurs' },
    { id: 'ezechiel' as QuizTheme, name: 'Ézéchiel', description: 'Visions prophétiques', icon: '👁️', category: 'Prophètes Majeurs' },
    { id: 'daniel' as QuizTheme, name: 'Daniel', description: 'Daniel dans la fosse aux lions', icon: '🦁', category: 'Prophètes Majeurs' },

    // Prophètes mineurs
    { id: 'osee' as QuizTheme, name: 'Osée', description: 'Amour fidèle de Dieu', icon: '💕', category: 'Prophètes Mineurs' },
    { id: 'amos' as QuizTheme, name: 'Amos', description: 'Justice sociale', icon: '⚖️', category: 'Prophètes Mineurs' },
    { id: 'jonas' as QuizTheme, name: 'Jonas', description: 'Jonas et la baleine', icon: '🐋', category: 'Prophètes Mineurs' },
    { id: 'michee' as QuizTheme, name: 'Michée', description: 'Prophéties messianiques', icon: '🎯', category: 'Prophètes Mineurs' },
    { id: 'habacuc' as QuizTheme, name: 'Habacuc', description: 'Questions à Dieu', icon: '❓', category: 'Prophètes Mineurs' },
    { id: 'sophonie' as QuizTheme, name: 'Sophonie', description: 'Jour du Seigneur', icon: '☀️', category: 'Prophètes Mineurs' },
    { id: 'zacharie' as QuizTheme, name: 'Zacharie', description: 'Visions de restauration', icon: '🔮', category: 'Prophètes Mineurs' },
    { id: 'malachie' as QuizTheme, name: 'Malachie', description: 'Dernier prophète', icon: '🔚', category: 'Prophètes Mineurs' },

    // Personnages bibliques
    { id: 'patriarches' as QuizTheme, name: 'Les Patriarches', description: 'Abraham, Isaac, Jacob', icon: '👴', category: 'Personnages' },
    { id: 'moise' as QuizTheme, name: 'Moïse', description: 'Libérateur d\'Israël', icon: '🏺', category: 'Personnages' },
    { id: 'david' as QuizTheme, name: 'David', description: 'Roi berger et psalmiste', icon: '🎭', category: 'Personnages' },
    { id: 'salomon' as QuizTheme, name: 'Salomon', description: 'Roi sage et bâtisseur', icon: '🏛️', category: 'Personnages' },
    { id: 'elie-elisee' as QuizTheme, name: 'Élie et Élisée', description: 'Prophètes thaumaturges', icon: '⚡', category: 'Personnages' },
    { id: 'femmes-bible' as QuizTheme, name: 'Femmes de la Bible', description: 'Marie, Esther, Ruth, Déborah...', icon: '👩', category: 'Personnages' },

    // Thématiques générales
    { id: 'prophetes' as QuizTheme, name: 'Les Prophètes', description: 'Messages et prophéties de l\'Ancien Testament', icon: '📢', category: 'Thématiques' },
    { id: 'nouveau-testament' as QuizTheme, name: 'Nouveau Testament', description: 'Épîtres et Actes des Apôtres', icon: '📘', category: 'Thématiques' },
    { id: 'ancien-testament' as QuizTheme, name: 'Ancien Testament', description: 'Vue d\'ensemble de l\'AT', icon: '📙', category: 'Thématiques' }
  ];

  const filteredThemes = themes.filter(theme => 
    theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedThemes = filteredThemes.reduce((acc, theme) => {
    if (!acc[theme.category]) {
      acc[theme.category] = [];
    }
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, typeof themes>);

  const selectedDifficultyData = difficulties.find(d => d.id === selectedDifficulty);

  const handleStartQuiz = () => {
    const config: QuizConfig = {
      difficulty: selectedDifficulty,
      theme: selectedTheme,
      questionCount: selectedDifficultyData?.questions || 10
    };
    onStartQuiz(config);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Difficulty Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Choisissez votre niveau</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {difficulties.map((difficulty) => (
              <div
                key={difficulty.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedDifficulty === difficulty.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedDifficulty(difficulty.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{difficulty.name}</h3>
                  <Badge className={difficulty.color}>
                    {difficulty.questions} Q
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{difficulty.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{difficulty.time}s/question</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>Choisissez votre thématique ({themes.length} thèmes disponibles)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher une thématique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Themes by Category */}
          <div className="space-y-6">
            {Object.entries(groupedThemes).map(([category, categoryThemes]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-1">
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {categoryThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedTheme === theme.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className="text-center">
                        <div className="text-xl mb-1">{theme.icon}</div>
                        <h4 className="font-medium text-sm mb-1">{theme.name}</h4>
                        <p className="text-gray-600 text-xs">{theme.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredThemes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune thématique trouvée pour "{searchTerm}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <Button
          onClick={handleStartQuiz}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
        >
          <Play className="w-5 h-5 mr-2" />
          Commencer le Quiz
          <span className="ml-2 text-sm opacity-90">
            ({selectedDifficultyData?.questions} questions)
          </span>
        </Button>
      </div>
    </div>
  );
};

export default QuizSetup;
