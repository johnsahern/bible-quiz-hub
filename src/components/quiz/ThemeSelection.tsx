
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BookOpen, Search } from 'lucide-react';
import { QuizTheme } from '@/types/quiz';
import ThemeCategory from './ThemeCategory';
import { getThemes } from '../../../data/themes';

interface ThemeSelectionProps {
  selectedTheme: QuizTheme;
  onThemeChange: (theme: QuizTheme) => void;
}

const ThemeSelection = ({ selectedTheme, onThemeChange }: ThemeSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const themes = getThemes();

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

  return (
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
            <ThemeCategory
              key={category}
              category={category}
              themes={categoryThemes}
              selectedTheme={selectedTheme}
              onThemeChange={onThemeChange}
            />
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
  );
};

export default ThemeSelection;
