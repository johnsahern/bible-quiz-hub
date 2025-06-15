
// Configuration centralisée pour l'API Bible
export const BIBLE_API_CONFIG = {
  API_KEY: '805e891ef27f88a403c1d61184828c7d', // Votre clé API valide
  BASE_URL: 'https://api.scripture.api.bible/v1',
  
  // IDs spécifiques pour Louis Segond
  PREFERRED_BIBLES: {
    fr: 'LSG', // Louis Segond en français
    en: 'LSG'  // Louis Segond en anglais aussi (si disponible)
  }
};

// Headers standard pour les requêtes
export const getApiHeaders = () => ({
  'api-key': BIBLE_API_CONFIG.API_KEY,
  'accept': 'application/json'
});
