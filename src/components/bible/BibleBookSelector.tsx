
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Book } from 'lucide-react';
import { bibleBooks } from '@/data/bibleBooks';

interface BibleBookSelectorProps {
  language: string;
  selectedBook: any;
  onBookSelect: (book: any) => void;
  onChapterSelect: (chapter: number) => void;
}

const BibleBookSelector = ({ 
  language, 
  selectedBook, 
  onBookSelect, 
  onChapterSelect 
}: BibleBookSelectorProps) => {
  const [selectedTestament, setSelectedTestament] = useState<'old' | 'new'>('old');

  const translations = {
    fr: {
      oldTestament: "Ancien Testament",
      newTestament: "Nouveau Testament",
      chapters: "chapitres"
    },
    en: {
      oldTestament: "Old Testament",
      newTestament: "New Testament", 
      chapters: "chapters"
    }
  };

  const t = translations[language as keyof typeof translations];

  const testamentBooks = bibleBooks.filter(book => 
    selectedTestament === 'old' ? book.testament === 'old' : book.testament === 'new'
  );

  return (
    <div className="space-y-4">
      {/* Testament Selector */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex gap-2">
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
        </CardContent>
      </Card>

      {/* Books List */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Book className="w-5 h-5" />
            {selectedTestament === 'old' ? t.oldTestament : t.newTestament}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="p-4 space-y-2">
              {testamentBooks.map((book) => (
                <div key={book.key} className="space-y-2">
                  <Button
                    variant={selectedBook?.key === book.key ? 'default' : 'ghost'}
                    onClick={() => {
                      onBookSelect(book);
                      onChapterSelect(1);
                    }}
                    className="w-full justify-start p-3 h-auto"
                    style={{
                      background: selectedBook?.key === book.key 
                        ? `linear-gradient(135deg, ${book.colors.primary}, ${book.colors.secondary})`
                        : 'transparent',
                      color: selectedBook?.key === book.key ? 'white' : 'inherit'
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
                        <span className="font-medium">
                          {language === 'fr' ? book.name.fr : book.name.en}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {book.chapters} {t.chapters}
                        </Badge>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Button>

                  {/* Chapter Selection */}
                  {selectedBook?.key === book.key && (
                    <div className="ml-6 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-6 gap-1">
                        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => (
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
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default BibleBookSelector;
