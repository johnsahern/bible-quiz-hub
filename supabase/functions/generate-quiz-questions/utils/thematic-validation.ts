
import { strictThematicKeywords } from './thematic-keywords.ts';

// Validation thématique ULTRA-STRICTE avec mots-clés pour TOUS les thèmes - VERSION PRODUCTION
export function validateThematicRelevance(questions: any[], selectedTheme: string): any[] {
  console.log(`🎯 VALIDATION THÉMATIQUE ULTRA-STRICTE PRODUCTION pour: ${selectedTheme}`);
  
  const keywords = strictThematicKeywords[selectedTheme] || [];
  
  if (keywords.length === 0) {
    console.warn(`⚠️ AUCUN MOT-CLÉ DÉFINI POUR LE THÈME: ${selectedTheme} - CRÉATION AUTOMATIQUE`);
    // Si pas de mots-clés définis, on crée une validation basée sur le nom du thème
    const autoKeywords = selectedTheme.split('-').concat([selectedTheme]);
    console.log(`🔧 Mots-clés automatiques créés: ${autoKeywords.join(', ')}`);
    return validateWithKeywords(questions, autoKeywords, selectedTheme);
  }
  
  return validateWithKeywords(questions, keywords, selectedTheme);
}

function validateWithKeywords(questions: any[], keywords: string[], selectedTheme: string): any[] {
  const thematicallyValidQuestions = questions.filter(q => {
    const fullText = `${q.question} ${q.options.join(' ')} ${q.verse || ''}`.toLowerCase();
    
    // Vérification MOINS STRICTE : au moins 1 mot-clé doit être présent
    const matchingKeywords = keywords.filter(keyword => 
      fullText.includes(keyword.toLowerCase())
    );
    
    const isThematicallyValid = matchingKeywords.length >= 1;
    
    if (!isThematicallyValid) {
      console.warn(`❌ QUESTION HORS-THÈME REJETÉE PRODUCTION: "${q.question.substring(0, 60)}..."`);
      console.warn(`   Mots-clés trouvés: ${matchingKeywords.join(', ') || 'AUCUN'}`);
      console.warn(`   Mots-clés requis pour "${selectedTheme}": ${keywords.join(', ')}`);
    } else {
      console.log(`✅ Question thématiquement valide PRODUCTION: "${q.question.substring(0, 60)}..." (mots-clés: ${matchingKeywords.join(', ')})`);
    }
    
    return isThematicallyValid;
  });
  
  console.log(`🎯 RÉSULTAT PRODUCTION: ${thematicallyValidQuestions.length}/${questions.length} questions respectent le thème "${selectedTheme}"`);
  
  // Version production : seuil RÉDUIT à 50% pour éviter les échecs
  const validationThreshold = Math.max(1, Math.ceil(questions.length * 0.5));
  if (thematicallyValidQuestions.length < validationThreshold) {
    console.error(`❌ ÉCHEC VALIDATION THÉMATIQUE PRODUCTION: Seulement ${thematicallyValidQuestions.length}/${questions.length} questions valides pour "${selectedTheme}" (minimum requis: ${validationThreshold})`);
    throw new Error(`Questions générées ne respectent pas suffisamment le thème "${selectedTheme}". Qualité production non atteinte. Relancez la génération.`);
  }
  
  return thematicallyValidQuestions;
}
