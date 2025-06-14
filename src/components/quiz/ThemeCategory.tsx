
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <h3 className="font-semibold text-lg text-gray-800">
          {category} ({themes.length})
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-3">
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
      )}
    </div>
  );
};

export default ThemeCategory;
