
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Search } from 'lucide-react';

interface NavigationProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const Navigation = ({ language, setLanguage }: NavigationProps) => {
  const [notifications] = useState(3);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-blue-100 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B+</span>
            </div>
            <span className="font-bold text-blue-900 text-xl">BibleQuiz+</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex bg-blue-100 rounded-lg p-1">
              <Button
                variant={language === 'fr' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 text-xs ${
                  language === 'fr' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-blue-600 hover:bg-blue-200'
                }`}
              >
                FR
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs ${
                  language === 'en' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-blue-600 hover:bg-blue-200'
                }`}
              >
                EN
              </Button>
            </div>

            {/* Search */}
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100">
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100">
                <Bell className="w-4 h-4" />
              </Button>
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {notifications}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
