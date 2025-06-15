
import { useState, useEffect } from 'react';

const API_KEY = '5fc64b36cbabb14bb2a73f6945ea3a0d';
const BASE_URL = 'https://api.scripture.api.bible/v1';

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
        
        const response = await fetch(`${BASE_URL}/bibles`, {
          headers: {
            'api-key': API_KEY,
            'accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        console.log('Available Bibles:', data);
        
        setBibles(data.data || []);
      } catch (err) {
        console.error('Bible list fetch error:', err);
        setError('Erreur lors du chargement des Bibles disponibles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBibles();
  }, []);

  const getBibleByLanguage = (languageCode: string) => {
    const languageBibles = bibles.filter(bible => 
      bible.language.id.toLowerCase().includes(languageCode.toLowerCase()) ||
      bible.countries.some(country => country.id.toLowerCase().includes(languageCode.toLowerCase()))
    );
    
    // Préférer certaines versions
    if (languageCode === 'fr') {
      return languageBibles.find(bible => 
        bible.name.toLowerCase().includes('segond') ||
        bible.name.toLowerCase().includes('français')
      ) || languageBibles[0];
    }
    
    if (languageCode === 'en') {
      return languageBibles.find(bible => 
        bible.id === 'KJV' || bible.name.toLowerCase().includes('king james')
      ) || languageBibles[0];
    }
    
    return languageBibles[0];
  };

  return { bibles, isLoading, error, getBibleByLanguage };
};
