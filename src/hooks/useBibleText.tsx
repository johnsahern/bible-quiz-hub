
import { useState, useEffect, useCallback } from 'react';
import { useBibleList } from './useBibleList';
import { BIBLE_API_CONFIG, getApiHeaders } from '@/config/bibleApi';

export const useBibleText = (bookKey: string, chapter: number, language: string) => {
  const [text, setText] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getBibleByLanguage, isLoading: bibleListLoading } = useBibleList();

  // Cache pour éviter les appels répétés
  const [cache, setCache] = useState<Map<string, any>>(new Map());

  const fetchBibleText = useCallback(async () => {
    if (!bookKey || !chapter || bibleListLoading) return;

    const cacheKey = `${bookKey}-${chapter}-${language}`;
    
    // Vérifier le cache d'abord
    if (cache.has(cacheKey)) {
      console.log('Using cached text for:', cacheKey);
      setText(cache.get(cacheKey));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const selectedBible = getBibleByLanguage(language);
      
      if (!selectedBible) {
        throw new Error('Aucune Bible disponible pour cette langue');
      }

      const bibleId = selectedBible.id;
      const chapterId = `${bookKey}.${chapter}`;
      
      console.log(`Fetching chapter: ${chapterId} from Bible: ${bibleId} (${selectedBible.name})`);
      
      const response = await fetch(
        `${BIBLE_API_CONFIG.BASE_URL}/bibles/${bibleId}/chapters/${chapterId}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`,
        {
          headers: getApiHeaders()
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Clé API invalide. Veuillez vérifier votre configuration.');
        }
        if (response.status === 404) {
          throw new Error('Chapitre non trouvé');
        }
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response received successfully');

      // Parser le contenu HTML pour extraire les versets
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.data.content, 'text/html');
      
      const verses: any[] = [];
      const verseElements = doc.querySelectorAll('.v');
      
      verseElements.forEach((element, index) => {
        const verseNumber = element.querySelector('.label')?.textContent || (index + 1).toString();
        const verseText = element.textContent?.replace(verseNumber, '').trim() || '';
        
        if (verseText) {
          verses.push({
            number: parseInt(verseNumber),
            text: verseText
          });
        }
      });

      // Si pas de versets trouvés avec la méthode ci-dessus, essayer une approche différente
      if (verses.length === 0) {
        const textContent = doc.body?.textContent || data.data.content;
        const lines = textContent.split('\n').filter(line => line.trim());
        
        lines.forEach((line, index) => {
          const match = line.match(/^(\d+)\s+(.+)$/);
          if (match) {
            verses.push({
              number: parseInt(match[1]),
              text: match[2].trim()
            });
          } else if (line.trim()) {
            verses.push({
              number: index + 1,
              text: line.trim()
            });
          }
        });
      }

      const result = {
        book: bookKey,
        chapter,
        verses: verses.length > 0 ? verses : [
          {
            number: 1,
            text: data.data.content.replace(/<[^>]*>/g, '').trim() || 'Contenu non disponible'
          }
        ],
        bibleInfo: {
          id: selectedBible.id,
          name: selectedBible.name
        }
      };

      // Mettre en cache le résultat
      setCache(prev => new Map(prev).set(cacheKey, result));
      setText(result);

    } catch (err) {
      console.error('Bible text fetch error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du texte biblique');
    } finally {
      setIsLoading(false);
    }
  }, [bookKey, chapter, language, bibleListLoading, getBibleByLanguage, cache]);

  useEffect(() => {
    fetchBibleText();
  }, [fetchBibleText]);

  return { text, isLoading, error };
};
