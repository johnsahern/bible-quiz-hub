
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import BibleBookSelector from '@/components/bible/BibleBookSelector';
import BibleVersionSelector from '@/components/bible/BibleVersionSelector';
import BibleReader from '@/components/bible/BibleReader';
import LocalBibleNotice from '@/components/bible/LocalBibleNotice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Database, Languages, Settings } from 'lucide-react';

const BibleReading = () => {
  const [language, setLanguage] = useState('fr');
  const [selectedVersion, setSelectedVersion] = useState('LSG');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [viewMode, setViewMode] = useState('reading'); // 'reading', 'info', 'combined'
  const [showVersionSelector, setShowVersionSelector] = useState(false);

  const translations = {
    fr: {
      title: "Lecture de la Bible",
      subtitle: "Explorez les Écritures avec notre base de données locale enrichie",
      reading: "Lecture",
      info: "Informations",
      combined: "Lecture + Info",
      versions: "Versions",
      selectBook: "Sélectionnez un livre pour commencer",
      selectVersion: "Choisir une version"
    },
    en: {
      title: "Bible Reading",
      subtitle: "Explore the Scriptures with our enriched local database",
      reading: "Reading",
      info: "Information", 
      combined: "Reading + Info",
      versions: "Versions",
      selectBook: "Select a book to get started",
      selectVersion: "Choose a version"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleChapterChange = (chapter: number) => {
    setSelectedChapter(chapter);
  };

  const handleVersionChange = (versionId: string) => {
    setSelectedVersion(versionId);
    setShowVersionSelector(false);
    // Réinitialiser la sélection si le livre n'est pas disponible dans la nouvelle version
    if (selectedBook) {
      // On garde la sélection pour l'instant, l'utilisateur verra si c'est disponible
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation language={language} setLanguage={setLanguage} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                {t.title}
              </h1>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-sm opacity-60 animate-pulse"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </header>

          {/* Control Panel */}
          <Card className="mb-6 p-4 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex flex-wrap justify-between items-center gap-3">
              {/* View Mode Selection */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'reading' ? 'default' : 'outline'}
                  onClick={() => setViewMode('reading')}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <BookOpen className="w-4 h-4" />
                  {t.reading}
                </Button>
                <Button
                  variant={viewMode === 'info' ? 'default' : 'outline'}
                  onClick={() => setViewMode('info')}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Database className="w-4 h-4" />
                  {t.info}
                </Button>
                <Button
                  variant={viewMode === 'combined' ? 'default' : 'outline'}
                  onClick={() => setViewMode('combined')}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Languages className="w-4 h-4" />
                  {t.combined}
                </Button>
              </div>

              {/* Version Selector Toggle */}
              <Button
                variant={showVersionSelector ? 'default' : 'outline'}
                onClick={() => setShowVersionSelector(!showVersionSelector)}
                className="flex items-center gap-2"
                size="sm"
              >
                <Settings className="w-4 h-4" />
                {t.versions}
              </Button>
            </div>
          </Card>

          {/* Version Selector */}
          {showVersionSelector && (
            <div className="mb-6">
              <BibleVersionSelector
                selectedVersion={selectedVersion}
                onVersionSelect={handleVersionChange}
                language={language}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Book Selector */}
            <div className="lg:col-span-1">
              <BibleBookSelector 
                language={language}
                selectedBook={selectedBook}
                selectedVersion={selectedVersion}
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
                    <p className="text-sm text-gray-500 mt-2">
                      Version actuelle: {selectedVersion}
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Info Notice */}
                  {(viewMode === 'info' || viewMode === 'combined') && (
                    <LocalBibleNotice
                      book={selectedBook}
                      chapter={selectedChapter}
                    />
                  )}

                  {/* Bible Reader */}
                  {(viewMode === 'reading' || viewMode === 'combined') && (
                    <BibleReader
                      book={selectedBook}
                      chapter={selectedChapter}
                      language={language}
                      selectedVersion={selectedVersion}
                      onChapterChange={handleChapterChange}
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
