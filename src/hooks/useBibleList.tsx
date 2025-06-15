
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
    console.log(`Looking for Bible in language: ${languageCode}`);
    console.log('Available bibles:', bibles.map(b => ({ id: b.id, name: b.name, lang: b.language.id })));
    
    if (languageCode === 'fr') {
      // Recherche prioritaire: Louis Segond français
      const louisSegondFr = bibles.find(bible => 
        (bible.name.toLowerCase().includes('louis segond') || 
         bible.name.toLowerCase().includes('segond') ||
         bible.id.toLowerCase().includes('lsg')) &&
        (bible.language.id.toLowerCase().includes('fr') ||
         bible.language.id.toLowerCase().includes('french'))
      );
      
      if (louisSegondFr) {
        console.log('Found Louis Segond French:', louisSegondFr);
        return louisSegondFr;
      }
      
      // Fallback: n'importe quelle Bible française
      const frenchBible = bibles.find(bible => 
        bible.language.id.toLowerCase().includes('fr') ||
        bible.language.id.toLowerCase().includes('french')
      );
      
      console.log('Using French fallback:', frenchBible);
      return frenchBible;
    }
    
    if (languageCode === 'en') {
      // Recherche prioritaire: Louis Segond anglais ou KJV
      const louisSegondEn = bibles.find(bible => 
        (bible.name.toLowerCase().includes('louis segond') || 
         bible.name.toLowerCase().includes('segond') ||
         bible.id.toLowerCase().includes('lsg')) &&
        (bible.language.id.toLowerCase().includes('en') ||
         bible.language.id.toLowerCase().includes('english'))
      );
      
      if (louisSegondEn) {
        console.log('Found Louis Segond English:', louisSegondEn);
        return louisSegondEn;
      }
      
      // Fallback: KJV ou autre Bible anglaise
      const kjv = bibles.find(bible => 
        bible.id === 'KJV' || 
        bible.name.toLowerCase().includes('king james')
      );
      
      if (kjv) {
        console.log('Using KJV:', kjv);
        return kjv;
      }
      
      const englishBible = bibles.find(bible => 
        bible.language.id.toLowerCase().includes('en') ||
        bible.language.id.toLowerCase().includes('english')
      );
      
      console.log('Using English fallback:', englishBible);
      return englishBible;
    }
    
    return bibles[0];
  };

  return { bibles, isLoading, error, getBibleByLanguage };
};
