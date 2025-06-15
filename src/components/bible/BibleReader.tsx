
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, BookOpen, Loader2 } from 'lucide-react';
import { useBibleText } from '@/hooks/useBibleText';

interface BibleReaderProps {
  book: any;
  chapter: number;
  language: string;
}

const BibleReader = ({ book, chapter, language }: BibleReaderProps) => {
  const { text, isLoading, error } = useBibleText(book.key, chapter, language);
  const [fontSize, setFontSize] = useState('text-base');

  const fontSizes = [
    { label: 'Petit', value: 'text-sm' },
    { label: 'Normal', value: 'text-base' },
    { label: 'Grand', value: 'text-lg' },
    { label: 'Très grand', value: 'text-xl' }
  ];

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
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Chargement du chapitre...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="min-h-96 border-0 shadow-lg bg-red-50">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-4 text-red-400" />
            <p className="text-red-600">Erreur lors du chargement</p>
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
              <p className="text-sm opacity-90">Chapitre {chapter}</p>
            </div>
          </CardTitle>
          
          {/* Font Size Controls */}
          <div className="flex gap-2">
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
        <ScrollArea className="h-96 p-6">
          <div className={`space-y-4 ${fontSize} leading-relaxed`}>
            {text?.verses?.map((verse: any, index: number) => (
              <div key={index} className="flex gap-4">
                <Badge 
                  variant="outline" 
                  className="mt-1 text-xs min-w-8 justify-center"
                  style={{
                    borderColor: book.colors.primary,
                    color: book.colors.primary
                  }}
                >
                  {verse.number || index + 1}
                </Badge>
                <p className="flex-1 text-gray-800">
                  {verse.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={() => {/* Previous chapter logic */}}
            disabled={chapter <= 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Chapitre {chapter} sur {book.chapters}
            </span>
          </div>

          <Button
            variant="outline"
            onClick={() => {/* Next chapter logic */}}
            disabled={chapter >= book.chapters}
            className="flex items-center gap-2"
          >
            Suivant
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BibleReader;
