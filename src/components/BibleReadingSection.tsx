
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Headphones, Play, Volume2, Clock, Star } from 'lucide-react';

interface BibleReadingSectionProps {
  language: string;
}

const BibleReadingSection = ({ language }: BibleReadingSectionProps) => {
  const translations = {
    fr: {
      title: "Lecture & Audio",
      subtitle: "Explorez les Écritures par la lecture et l'écoute",
      dailyReading: "Lecture du Jour",
      audioLibrary: "Bibliothèque Audio",
      currentBook: "Livre de Jean",
      chapter: "Chapitre 3",
      duration: "12 min",
      progress: "65% complété",
      playButton: "Écouter",
      readButton: "Lire",
      continueReading: "Continuer la lecture",
      exploreAudio: "Explorer l'audio"
    },
    en: {
      title: "Reading & Audio",
      subtitle: "Explore Scripture through reading and listening",
      dailyReading: "Daily Reading",
      audioLibrary: "Audio Library",
      currentBook: "Book of John",
      chapter: "Chapter 3",
      duration: "12 min",
      progress: "65% completed",
      playButton: "Listen",
      readButton: "Read",
      continueReading: "Continue reading",
      exploreAudio: "Explore audio"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          {t.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Lecture du Jour */}
        <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Particules décoratives */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-300/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-2 h-2 bg-teal-400/40 rounded-full animate-pulse delay-500"></div>
          
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-emerald-800">{t.dailyReading}</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-emerald-900">{t.currentBook}</h3>
                  <p className="text-emerald-700 text-sm">{t.chapter}</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  <Clock className="w-3 h-3 mr-1" />
                  {t.duration}
                </Badge>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-emerald-700 mb-2">
                  <span>{t.progress}</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                <BookOpen className="w-4 h-4 mr-2" />
                {t.continueReading}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bibliothèque Audio */}
        <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Particules décoratives */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-purple-300/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-2 h-2 bg-indigo-400/40 rounded-full animate-pulse delay-700"></div>
          
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-purple-800">{t.audioLibrary}</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Volume2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900">{t.currentBook}</h3>
                  <p className="text-purple-700 text-sm mb-2">{t.chapter}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-purple-100 rounded-full h-1">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-xs text-purple-600">5:20 / 12:00</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                  <Play className="w-4 h-4 mr-2" />
                  {t.playButton}
                </Button>
                <Button variant="outline" className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 transition-all duration-300">
                  {t.exploreAudio}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BibleReadingSection;
