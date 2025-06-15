
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Globe, Calendar, Book } from 'lucide-react';
import { availableBibleVersions, BibleVersion } from '@/data/bibleStructure';

interface BibleVersionSelectorProps {
  selectedVersion: string;
  onVersionSelect: (versionId: string) => void;
  language: string;
}

const BibleVersionSelector = ({ 
  selectedVersion, 
  onVersionSelect, 
  language 
}: BibleVersionSelectorProps) => {
  const translations = {
    fr: {
      title: "Versions Bibliques",
      available: "Disponible",
      year: "Année"
    },
    en: {
      title: "Bible Versions",
      available: "Available",
      year: "Year"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Book className="w-5 h-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-64">
          <div className="p-4 space-y-3">
            {availableBibleVersions.map((version) => (
              <Button
                key={version.id}
                variant={selectedVersion === version.id ? 'default' : 'ghost'}
                onClick={() => onVersionSelect(version.id)}
                className="w-full justify-start p-4 h-auto"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{version.name}</span>
                      <Badge variant="outline" className="text-xs">
                        <Globe className="w-3 h-3 mr-1" />
                        {version.language.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      {version.description}
                    </p>
                    {version.year && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {t.year}: {version.year}
                      </div>
                    )}
                  </div>
                  <Badge 
                    variant={selectedVersion === version.id ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {t.available}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BibleVersionSelector;
