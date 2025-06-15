
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Globe } from 'lucide-react';

interface BibleInfoProps {
  bibleInfo?: {
    id: string;
    name: string;
  };
  language: string;
}

const BibleInfo = ({ bibleInfo, language }: BibleInfoProps) => {
  if (!bibleInfo) return null;

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-sm">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {bibleInfo.name}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            <Globe className="w-3 h-3 mr-1" />
            {language.toUpperCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default BibleInfo;
