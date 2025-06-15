
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Loader2, 
  Info, 
  Type, 
  Bookmark,
  Share2,
  Copy,
  Heart
} from 'lucide-react';
import { useBibleData } from '@/hooks/useBibleData';
import { getBibleBook } from '@/data/bibleStructure';
import { toast } from 'sonner';

interface BibleReaderProps {
  book: any;
  chapter: number;
  language: string;
  selectedVersion: string;
  onChapterChange: (chapter: number) => void;
}

const BibleReader = ({ 
  book, 
  chapter, 
  language, 
  selectedVersion,
  onChapterChange 
}: BibleReaderProps) => {
  const { chapter: chapterData, isLoading, error, availableChapters } = useBibleData(
    selectedVersion, 
    book.key, 
    chapter
  );
  const [fontSize, setFontSize] = useState('text-base');
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const fontSizes = [
    { label: 'Petit', value: 'text-sm' },
    { label: 'Normal', value: 'text-base' },
    { label: 'Grand', value: 'text-lg' },
    { label: 'Très grand', value: 'text-xl' }
  ];

  const translations = {
    fr: {
      chapter: "Chapitre",
      verse: "Verset",
      previous: "Précédent",
      next: "Suivant",
      loading: "Chargement du chapitre...",
      unavailable: "Chapitre non disponible",
      copy: "Copier le verset",
      share: "Partager",
      bookmark: "Marquer",
      favorite: "Favori",
      copied: "Verset copié !",
      theme: "Thème",
      summary: "Résumé"
    },
    en: {
      chapter: "Chapter",
      verse: "Verse",
      previous: "Previous",
      next: "Next",
      loading: "Loading chapter...",
      unavailable: "Chapter unavailable",
      copy: "Copy verse",
      share: "Share",
      bookmark: "Bookmark",
      favorite: "Favorite",
      copied: "Verse copied!",
      theme: "Theme",
      summary: "Summary"
    }
  };

  const t = translations[language as keyof typeof translations];

  const goToPreviousChapter = () => {
    const availableChaptersSorted = availableChapters.sort((a, b) => a - b);
    const currentIndex = availableChaptersSorted.indexOf(chapter);
    if (currentIndex > 0) {
      onChapterChange(availableChaptersSorted[currentIndex - 1]);
    }
  };

  const goToNextChapter = () => {
    const availableChaptersSorted = availableChapters.sort((a, b) => a - b);
    const currentIndex = availableChaptersSorted.indexOf(chapter);
    if (currentIndex < availableChaptersSorted.length - 1) {
      onChapterChange(availableChaptersSorted[currentIndex + 1]);
    }
  };

  const copyVerse = (verseNumber: number, text: string) => {
    const bookName = language === 'fr' ? book.name.fr : book.name.en;
    const reference = `${bookName} ${chapter}:${verseNumber}`;
    const fullText = `"${text}" - ${reference}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      toast.success(t.copied);
    });
  };

  const canGoPrevious = () => {
    const availableChaptersSorted = availableChapters.sort((a, b) => a - b);
    return availableChaptersSorted.indexOf(chapter) > 0;
  };

  const canGoNext = () => {
    const availableChaptersSorted = availableChapters.sort((a, b) => a - b);
    return availableChaptersSorted.indexOf(chapter) < availableChaptersSorted.length - 1;
  };

  if (isLoading) {
    return (
      <Card 
        className="min-h-96 border-0 shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${book.colors.primary}10, ${book.colors.secondary}10)`
        }}
      >
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">{t.loading}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !chapterData) {
    return (
      <Card className="min-h-96 border-0 shadow-lg bg-orange-50">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center max-w-md">
            <Info className="w-8 h-8 mx-auto mb-4 text-orange-500" />
            <p className="text-orange-600 font-medium">{t.unavailable}</p>
            <p className="text-orange-500 text-sm mt-2">{error}</p>
            <p className="text-xs text-gray-500 mt-4">
              Cette version utilise une base de données locale avec un nombre limité de chapitres.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="border-0 shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${book.colors.primary}05, ${book.colors.secondary}05)`
      }}
    >
      <CardHeader 
        className="pb-4"
        style={{
          background: `linear-gradient(135deg, ${book.colors.primary}, ${book.colors.secondary})`
        }}
      >
        <div className="flex items-center justify-between text-white">
          <CardTitle className="flex items-center gap-3">
            <BookOpen className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">
                {language === 'fr' ? book.name.fr : book.name.en}
              </h2>
              <p className="text-sm opacity-90">
                {t.chapter} {chapter}
                {chapterData.metadata?.theme && (
                  <span className="ml-2">• {chapterData.metadata.theme}</span>
                )}
              </p>
            </div>
          </CardTitle>
          
          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            {fontSizes.map((size) => (
              <Button
                key={size.value}
                variant={fontSize === size.value ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFontSize(size.value)}
                className="text-xs h-8"
              >
                {size.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Chapter Metadata */}
        {chapterData.metadata?.summary && (
          <div className="p-4 bg-blue-50 border-b">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">
                  {t.summary}
                </p>
                <p className="text-sm text-blue-700">
                  {chapterData.metadata.summary}
                </p>
              </div>
            </div>
          </div>
        )}

        <ScrollArea className="h-96" ref={scrollAreaRef}>
          <div className={`p-6 space-y-4 ${fontSize} leading-relaxed`}>
            {chapterData.verses.map((verse, index) => (
              <div 
                key={index} 
                className={`flex gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors ${
                  selectedVerse === verse.number ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setSelectedVerse(
                  selectedVerse === verse.number ? null : verse.number
                )}
              >
                <Badge 
                  variant="outline" 
                  className="mt-1 text-xs min-w-8 justify-center flex-shrink-0 cursor-pointer"
                  style={{
                    borderColor: book.colors.primary,
                    color: book.colors.primary
                  }}
                >
                  {verse.number}
                </Badge>
                <div className="flex-1">
                  <p className="text-gray-800 cursor-pointer">
                    {verse.text}
                  </p>
                  
                  {/* Verse Actions */}
                  {selectedVerse === verse.number && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyVerse(verse.number, verse.text);
                        }}
                        className="text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        {t.copy}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        <Bookmark className="w-3 h-3 mr-1" />
                        {t.bookmark}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        {t.favorite}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        {t.share}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator />

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 bg-gray-50">
          <Button
            variant="outline"
            onClick={goToPreviousChapter}
            disabled={!canGoPrevious()}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.previous}
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {t.chapter} {chapter}
            </span>
            <Badge variant="outline" className="text-xs">
              {availableChapters.length} chapitres disponibles
            </Badge>
          </div>

          <Button
            variant="outline"
            onClick={goToNextChapter}
            disabled={!canGoNext()}
            className="flex items-center gap-2"
          >
            {t.next}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BibleReader;
