
// Configuration centralisée pour l'API Bible
export const BIBLE_API_CONFIG = {
  // Clé API temporaire - L'utilisateur doit obtenir une clé valide sur https://scripture.api.bible
  API_KEY: 'YOUR_API_KEY_HERE', // Remplacer par une clé API valide
  BASE_URL: 'https://api.scripture.api.bible/v1',
  
  // IDs spécifiques pour Louis Segond et autres versions françaises
  PREFERRED_BIBLES: {
    fr: [
      'LSG', // Louis Segond
      'BDS', // Bible du Semeur
      'S21', // Segond 21
      'FRC97' // Français courant
    ],
    en: [
      'LSG', // Louis Segond (si disponible en anglais)
      'KJV', // King James Version
      'ESV', // English Standard Version
      'NIV' // New International Version
    ]
  }
};

// Headers standard pour les requêtes avec gestion d'erreur
export const getApiHeaders = () => {
  if (BIBLE_API_CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('⚠️ CONFIGURATION REQUISE: Veuillez configurer une clé API valide dans src/config/bibleApi.ts');
    console.log('🔗 Obtenez votre clé API gratuite sur: https://scripture.api.bible');
  }
  
  return {
    'api-key': BIBLE_API_CONFIG.API_KEY,
    'accept': 'application/json'
  };
};

// Fonction pour vérifier si l'API est configurée
export const isApiConfigured = () => {
  return BIBLE_API_CONFIG.API_KEY !== 'YOUR_API_KEY_HERE' && BIBLE_API_CONFIG.API_KEY.length > 0;
};
