
import { QuizTheme } from '@/types/quiz';

interface Theme {
  id: QuizTheme;
  name: string;
  description: string;
  icon: string;
  category: string;
}

interface ThemeCategoryProps {
  category: string;
  themes: Theme[];
  selectedTheme: QuizTheme;
  onThemeChange: (theme: QuizTheme) => void;
}

const ThemeCategory = ({ category, themes, selectedTheme, onThemeChange }: ThemeCategoryProps) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-3 text-gray-800 border-b pb-1">
        {category}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              selectedTheme === theme.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => onThemeChange(theme.id)}
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
  );
};

export default ThemeCategory;
