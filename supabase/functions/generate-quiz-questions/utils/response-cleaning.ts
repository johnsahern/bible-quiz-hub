
export function cleanJsonResponse(response: string): string {
  console.log('🧹 Nettoyage de la réponse JSON...');
  
  let cleaned = response.trim();
  
  // Supprimer les balises markdown si présentes
  cleaned = cleaned.replace(/```json\s*/g, '');
  cleaned = cleaned.replace(/```\s*/g, '');
  
  // Supprimer tout texte avant le premier [
  const firstBracket = cleaned.indexOf('[');
  if (firstBracket !== -1) {
    cleaned = cleaned.substring(firstBracket);
  }
  
  // Supprimer tout texte après le dernier ]
  const lastBracket = cleaned.lastIndexOf(']');
  if (lastBracket !== -1) {
    cleaned = cleaned.substring(0, lastBracket + 1);
  }
  
  // Nettoyer les caractères de contrôle et espaces superflus
  cleaned = cleaned.replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ');
  
  console.log('✅ JSON nettoyé avec succès');
  return cleaned;
}
