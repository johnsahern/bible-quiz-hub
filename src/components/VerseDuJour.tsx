
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Play } from 'lucide-react';

interface VerseDuJourProps {
  language: string;
}

const VerseDuJour = ({ language }: VerseDuJourProps) => {
  const [verse, setVerse] = useState({
    text: "",
    reference: "",
    isLoading: true
  });
  const [isFavorite, setIsFavorite] = useState(false);

  // Versets prédéfinis pour la démo (en attendant l'API Bible.is)
  const dailyVerses = {
    fr: [
      {
        text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
        reference: "Jean 3:16"
      },
      {
        text: "Je puis tout par celui qui me fortifie.",
        reference: "Philippiens 4:13"
      },
      {
        text: "L'Éternel est mon berger: je ne manquerai de rien.",
        reference: "Psaume 23:1"
      }
    ],
    en: [
      {
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        reference: "John 3:16"
      },
      {
        text: "I can do all this through him who gives me strength.",
        reference: "Philippians 4:13"
      },
      {
        text: "The Lord is my shepherd, I lack nothing.",
        reference: "Psalm 23:1"
      }
    ]
  };

  useEffect(() => {
    // Simulation d'un délai de chargement
    setTimeout(() => {
      const verses = dailyVerses[language as keyof typeof dailyVerses];
      const randomVerse = verses[Math.floor(Math.random() * verses.length)];
      setVerse({
        text: randomVerse.text,
        reference: randomVerse.reference,
        isLoading: false
      });
    }, 1000);
  }, [language]);

  const handlePlayAudio = () => {
    // TODO: Intégrer avec Bible.is API pour l'audio
    console.log("Playing audio for:", verse.reference);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const translations = {
    fr: {
      title: "Verset du Jour",
      loading: "Chargement du verset du jour..."
    },
    en: {
      title: "Daily Verse",
      loading: "Loading daily verse..."
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          {t.title}
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayAudio}
              className="text-white hover:bg-white/20 p-2"
              disabled={verse.isLoading}
            >
              <Play className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              className={`text-white hover:bg-white/20 p-2 ${
                isFavorite ? 'bg-white/20' : ''
              }`}
              disabled={verse.isLoading}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {verse.isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-white/20 rounded w-1/3"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed font-light italic">
              "{verse.text}"
            </p>
            <p className="text-right text-blue-100 font-medium">
              — {verse.reference}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerseDuJour;
