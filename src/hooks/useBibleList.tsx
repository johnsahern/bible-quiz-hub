
import { useState, useEffect } from 'react';
import { BIBLE_API_CONFIG, getApiHeaders, isApiConfigured } from '@/config/bibleApi';

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
      // Vérifier la configuration de l'API
      if (!isApiConfigured()) {
        setError('Configuration requise: Veuillez ajouter votre clé API dans src/config/bibleApi.ts. Obtenez-la gratuitement sur https://scripture.api.bible');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching available Bibles...');
        
        const response = await fetch(`${BIBLE_API_CONFIG.BASE_URL}/bibles`, {
          headers: getApiHeaders()
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Clé API invalide. Vérifiez votre clé sur https://scripture.api.bible et mettez-la à jour dans src/config/bibleApi.ts');
          }
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        console.log('Available Bibles:', data.data?.length || 0, 'Bibles found');
        
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
    
    if (bibles.length === 0) {
      console.log('No bibles available');
      return null;
    }

    // Obtenir les IDs préférés pour la langue
    const preferredIds = BIBLE_API_CONFIG.PREFERRED_BIBLES[languageCode as keyof typeof BIBLE_API_CONFIG.PREFERRED_BIBLES] || [];
    
    // Chercher d'abord par ID préféré
    for (const preferredId of preferredIds) {
      const bible = bibles.find(b => b.id === preferredId);
      if (bible) {
        console.log(`Found preferred Bible: ${bible.name} (${bible.id})`);
        return bible;
      }
    }

    // Chercher par langue et nom contenant "Louis Segond" ou "Segond"
    if (languageCode === 'fr') {
      const segond = bibles.find(bible => 
        (bible.language.id.toLowerCase().includes('fr') || bible.language.name.toLowerCase().includes('french')) &&
        (bible.name.toLowerCase().includes('louis segond') || bible.name.toLowerCase().includes('segond'))
      );
      
      if (segond) {
        console.log('Found Louis Segond:', segond);
        return segond;
      }
    }
    
    // Fallback: première Bible de la langue demandée
    const languageBible = bibles.find(bible => 
      bible.language.id.toLowerCase().includes(languageCode.toLowerCase()) ||
      bible.language.name.toLowerCase().includes(languageCode === 'fr' ? 'french' : 'english')
    );
    
    if (languageBible) {
      console.log('Using language fallback:', languageBible);
      return languageBible;
    }

    // Dernier recours: première Bible disponible
    console.log('Using first available Bible:', bibles[0]);
    return bibles[0];
  };

  return { bibles, isLoading, error, getBibleByLanguage };
};
