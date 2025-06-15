
// Configuration centralisée pour l'API Bible
export const BIBLE_API_CONFIG = {
  API_KEY: '5fc64b36cbabb14bb2a73f6945ea3a0d', // Remplacez par votre vraie clé API
  BASE_URL: 'https://api.scripture.api.bible/v1',
  
  // IDs spécifiques pour Louis Segond
  PREFERRED_BIBLES: {
    fr: 'LSG', // Louis Segond en français
    en: 'KJV'  // King James Version en anglais (ou LSG si disponible en anglais)
  }
};

// Headers standard pour les requêtes
export const getApiHeaders = () => ({
  'api-key': BIBLE_API_CONFIG.API_KEY,
  'accept': 'application/json'
});
