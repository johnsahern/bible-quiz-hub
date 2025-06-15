
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Book, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { completeBibleBooks, getBibleBook, getBooksByTestament } from '@/data/bibleStructure';
import { useBibleData } from '@/hooks/useBibleData';

interface BibleBookSelectorProps {
  language: string;
  selectedBook: any;
  selectedVersion: string;
  onBookSelect: (book: any) => void;
  onChapterSelect: (chapter: number) => void;
}

const BibleBookSelector = ({ 
  language, 
  selectedBook, 
  selectedVersion,
  onBookSelect, 
  onChapterSelect 
}: BibleBookSelectorProps) => {
  const [selectedTestament, setSelectedTestament] = useState<'old' | 'new'>('old');
  const [searchTerm, setSearchTerm] = useState('');
  const { availableBooks } = useBibleData(selectedVersion, '', 1);

  const translations = {
    fr: {
      oldTestament: "Ancien Testament",
      newTestament: "Nouveau Testament",
      chapters: "chapitres",
      search: "Rechercher un livre...",
      available: "Disponible",
      unavailable: "Non disponible"
    },
    en: {
      oldTestament: "Old Testament",
      newTestament: "New Testament", 
      chapters: "chapters",
      search: "Search for a book...",
      available: "Available",
      unavailable: "Unavailable"
    }
  };

  const t = translations[language as keyof typeof translations];

  const testamentBooks = getBooksByTestament(selectedTestament).filter(book => {
    const bookName = (language === 'fr' ? book.name.fr : book.name.en).toLowerCase();
    return bookName.includes(searchTerm.toLowerCase());
  });

  const isBookAvailable = (bookKey: string): boolean => {
    return availableBooks.includes(bookKey);
  };

  return (
    <div className="space-y-4">
      {/* Testament Selector */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex gap-2 mb-3">
            <Button
              variant={selectedTestament === 'old' ? 'default' : 'outline'}
              onClick={() => setSelectedTestament('old')}
              className="flex-1 text-xs"
            >
              {t.oldTestament}
            </Button>
            <Button
              variant={selectedTestament === 'new' ? 'default' : 'outline'}
              onClick={() => setSelectedTestament('new')}
              className="flex-1 text-xs"
            >
              {t.newTestament}
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Books List */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Book className="w-5 h-5" />
            {selectedTestament === 'old' ? t.oldTestament : t.newTestament}
            <Badge variant="outline" className="ml-2">
              {testamentBooks.length} livres
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="p-4 space-y-2">
              {testamentBooks.map((book) => {
                const available = isBookAvailable(book.key);
                
                return (
                  <div key={book.key} className="space-y-2">
                    <Button
                      variant={selectedBook?.key === book.key ? 'default' : 'ghost'}
                      onClick={() => {
                        if (available) {
                          onBookSelect(book);
                          onChapterSelect(1);
                        }
                      }}
                      disabled={!available}
                      className="w-full justify-start p-3 h-auto"
                      style={{
                        background: selectedBook?.key === book.key 
                          ? `linear-gradient(135deg, ${book.colors.primary}, ${book.colors.secondary})`
                          : 'transparent',
                        color: selectedBook?.key === book.key ? 'white' : 'inherit',
                        opacity: available ? 1 : 0.5
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${book.colors.primary}, ${book.colors.secondary})`
                            }}
                          />
                          <div className="text-left">
                            <span className="font-medium block">
                              {language === 'fr' ? book.name.fr : book.name.en}
                            </span>
                            {book.description?.[language as 'fr' | 'en'] && (
                              <span className="text-xs opacity-75 block">
                                {book.description[language as 'fr' | 'en']}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={available ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {available ? t.available : t.unavailable}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {book.chapters} {t.chapters}
                          </Badge>
                          {available && <ChevronRight className="w-4 h-4" />}
                        </div>
                      </div>
                    </Button>

                    {/* Chapter Selection */}
                    {selectedBook?.key === book.key && available && (
                      <div className="ml-6 p-3 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-6 gap-1">
                          {Array.from({ length: Math.min(book.chapters, 30) }, (_, i) => i + 1).map((chapter) => (
                            <Button
                              key={chapter}
                              variant="ghost"
                              size="sm"
                              onClick={() => onChapterSelect(chapter)}
                              className="h-8 w-8 text-xs"
                              style={{
                                background: `linear-gradient(135deg, ${book.colors.primary}20, ${book.colors.secondary}20)`
                              }}
                            >
                              {chapter}
                            </Button>
                          ))}
                          {book.chapters > 30 && (
                            <div className="col-span-6 text-center text-xs text-gray-500 mt-2">
                              ... et {book.chapters - 30} autres chapitres
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default BibleBookSelector;
