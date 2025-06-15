
import { useState, useEffect } from 'react';
import { useBibleList } from './useBibleList';

const API_KEY = '5fc64b36cbabb14bb2a73f6945ea3a0d';
const BASE_URL = 'https://api.scripture.api.bible/v1';

export const useBibleText = (bookKey: string, chapter: number, language: string) => {
  const [text, setText] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getBibleByLanguage, isLoading: bibleListLoading } = useBibleList();

  useEffect(() => {
    const fetchBibleText = async () => {
      if (!bookKey || !chapter || bibleListLoading) return;

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
          `${BASE_URL}/bibles/${bibleId}/chapters/${chapterId}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`,
          {
            headers: {
              'api-key': API_KEY,
              'accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Chapitre non trouvé');
          }
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

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

        setText({
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
        });

      } catch (err) {
        console.error('Bible text fetch error:', err);
        setError('Erreur lors du chargement du texte biblique');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBibleText();
  }, [bookKey, chapter, language, bibleListLoading, getBibleByLanguage]);

  return { text, isLoading, error };
};
