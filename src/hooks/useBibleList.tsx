
import { useState, useEffect } from 'react';
import { BIBLE_API_CONFIG, getApiHeaders } from '@/config/bibleApi';

interface Bible {
  id: string;
  name: string;
  language: {
    id: string;
    name: string;
  };
  countries: Array<{
    id: string;
    name: string;
  }>;
}

export const useBibleList = () => {
  const [bibles, setBibles] = useState<Bible[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBibles = async () => {
      try {
        console.log('Fetching available Bibles...');
        
        const response = await fetch(`${BIBLE_API_CONFIG.BASE_URL}/bibles`, {
          headers: getApiHeaders()
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Clé API invalide. Veuillez vérifier votre clé API sur scripture.api.bible');
          }
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        console.log('Available Bibles:', data);
        
        setBibles(data.data || []);
      } catch (err) {
        console.error('Bible list fetch error:', err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des Bibles disponibles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBibles();
  }, []);

  const getBibleByLanguage = (languageCode: string) => {
    // Priorité absolue pour Louis Segond
    const louisSegondBibles = bibles.filter(bible => 
      bible.name.toLowerCase().includes('louis segond') ||
      bible.name.toLowerCase().includes('segond') ||
      bible.id.includes('LSG')
    );
    
    if (languageCode === 'fr') {
      // Chercher Louis Segond français en priorité
      const frenchLouisSegond = louisSegondBibles.find(bible => 
        bible.language.id.toLowerCase().includes('fr') ||
        bible.countries.some(country => country.id.toLowerCase().includes('fr'))
      );
      
      if (frenchLouisSegond) return frenchLouisSegond;
      
      // Fallback vers autres Bibles françaises
      const frenchBibles = bibles.filter(bible => 
        bible.language.id.toLowerCase().includes('fr') ||
        bible.countries.some(country => country.id.toLowerCase().includes('fr'))
      );
      
      return frenchBibles[0];
    }
    
    if (languageCode === 'en') {
      // Chercher Louis Segond anglais si disponible, sinon KJV
      const englishLouisSegond = louisSegondBibles.find(bible => 
        bible.language.id.toLowerCase().includes('en') ||
        bible.countries.some(country => country.id.toLowerCase().includes('en') || country.id.toLowerCase().includes('us'))
      );
      
      if (englishLouisSegond) return englishLouisSegond;
      
      // Fallback vers KJV ou autres Bibles anglaises
      const englishBibles = bibles.filter(bible => 
        bible.language.id.toLowerCase().includes('en') ||
        bible.countries.some(country => country.id.toLowerCase().includes('en') || country.id.toLowerCase().includes('us'))
      );
      
      return englishBibles.find(bible => 
        bible.id === 'KJV' || bible.name.toLowerCase().includes('king james')
      ) || englishBibles[0];
    }
    
    return bibles[0];
  };

  return { bibles, isLoading, error, getBibleByLanguage };
};
