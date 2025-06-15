
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Database } from 'lucide-react';

interface LocalBibleNoticeProps {
  book: any;
  chapter: number;
}

const LocalBibleNotice = ({ book, chapter }: LocalBibleNoticeProps) => {
  return (
    <Card 
      className="border-0 shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${book.colors.primary}10, ${book.colors.secondary}10)`
      }}
    >
      <CardHeader 
        className="pb-4"
        style={{
          background: `linear-gradient(135deg, ${book.colors.primary}, ${book.colors.secondary})`
        }}
      >
        <CardTitle className="flex items-center gap-3 text-white">
          <Database className="w-6 h-6" />
          <div>
            <h3 className="text-xl font-bold">Bible Locale</h3>
            <p className="text-sm opacity-90">Louis Segond 1910</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Version hors ligne disponible
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cette version utilise une base de données locale avec une sélection de chapitres 
              de la Bible Louis Segond 1910. Aucune connexion internet n'est requise.
            </p>
            <p className="text-gray-500 text-xs mt-3">
              Chapitres disponibles : Genèse 1, Matthieu 1, Psaume 23, Jean 3
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalBibleNotice;
