
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import BibleBookSelector from '@/components/bible/BibleBookSelector';
import BibleReader from '@/components/bible/BibleReader';
import BibleAudioPlayer from '@/components/bible/BibleAudioPlayer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Headphones, Languages } from 'lucide-react';

const BibleReading = () => {
  const [language, setLanguage] = useState('fr');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [viewMode, setViewMode] = useState('reading'); // 'reading', 'audio', 'combined'

  const translations = {
    fr: {
      title: "Lecture de la Bible et Audio",
      subtitle: "Explorez les Écritures par la lecture et l'écoute",
      reading: "Lecture",
      audio: "Audio",
      combined: "Lecture + Audio",
      selectBook: "Sélectionnez un livre"
    },
    en: {
      title: "Bible Reading and Audio",
      subtitle: "Explore the Scriptures through reading and listening",
      reading: "Reading",
      audio: "Audio", 
      combined: "Reading + Audio",
      selectBook: "Select a book"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation language={language} setLanguage={setLanguage} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                {t.title}
              </h1>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-sm opacity-60 animate-pulse"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </header>

          {/* Mode Selection */}
          <Card className="mb-8 p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant={viewMode === 'reading' ? 'default' : 'outline'}
                onClick={() => setViewMode('reading')}
                className="flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                {t.reading}
              </Button>
              <Button
                variant={viewMode === 'audio' ? 'default' : 'outline'}
                onClick={() => setViewMode('audio')}
                className="flex items-center gap-2"
              >
                <Headphones className="w-4 h-4" />
                {t.audio}
              </Button>
              <Button
                variant={viewMode === 'combined' ? 'default' : 'outline'}
                onClick={() => setViewMode('combined')}
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                {t.combined}
              </Button>
            </div>
          </Card>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Book Selector */}
            <div className="lg:col-span-1">
              <BibleBookSelector 
                language={language}
                selectedBook={selectedBook}
                onBookSelect={setSelectedBook}
                onChapterSelect={setSelectedChapter}
              />
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {!selectedBook ? (
                <Card className="h-96 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 border-0 shadow-lg">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                    <p className="text-xl text-gray-600">{t.selectBook}</p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Audio Player */}
                  {(viewMode === 'audio' || viewMode === 'combined') && (
                    <BibleAudioPlayer
                      book={selectedBook}
                      chapter={selectedChapter}
                      language={language}
                    />
                  )}

                  {/* Bible Reader */}
                  {(viewMode === 'reading' || viewMode === 'combined') && (
                    <BibleReader
                      book={selectedBook}
                      chapter={selectedChapter}
                      language={language}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleReading;
