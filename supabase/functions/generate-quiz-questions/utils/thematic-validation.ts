
import { strictThematicKeywords } from './thematic-keywords.ts';

// Validation thématique ultra-stricte avec mots-clés pour TOUS les thèmes
export function validateThematicRelevance(questions: any[], selectedTheme: string): any[] {
  console.log(`🎯 VALIDATION THÉMATIQUE ULTRA-STRICTE pour: ${selectedTheme}`);
  
  const keywords = strictThematicKeywords[selectedTheme] || [];
  
  if (keywords.length === 0) {
    console.warn(`⚠️ AUCUN MOT-CLÉ DÉFINI POUR LE THÈME: ${selectedTheme}`);
    return questions; // Accepter toutes les questions si pas de mots-clés définis
  }
  
  const thematicallyValidQuestions = questions.filter(q => {
    const fullText = `${q.question} ${q.options.join(' ')} ${q.verse || ''}`.toLowerCase();
    
    // Vérification STRICTE : au moins 1 mot-clé doit être présent
    const matchingKeywords = keywords.filter(keyword => 
      fullText.includes(keyword.toLowerCase())
    );
    
    const isThematicallyValid = matchingKeywords.length >= 1;
    
    if (!isThematicallyValid) {
      console.warn(`❌ QUESTION HORS-THÈME REJETÉE: "${q.question.substring(0, 60)}..."`);
      console.warn(`   Mots-clés trouvés: ${matchingKeywords.join(', ') || 'AUCUN'}`);
      console.warn(`   Mots-clés requis: ${keywords.join(', ')}`);
    } else {
      console.log(`✅ Question thématiquement valide: "${q.question.substring(0, 60)}..." (mots-clés: ${matchingKeywords.join(', ')})`);
    }
    
    return isThematicallyValid;
  });
  
  console.log(`🎯 RÉSULTAT: ${thematicallyValidQuestions.length}/${questions.length} questions respectent le thème "${selectedTheme}"`);
  
  // Si moins de 50% des questions sont valides, on retourne une erreur
  if (thematicallyValidQuestions.length < Math.ceil(questions.length * 0.5)) {
    console.error(`❌ ÉCHEC VALIDATION THÉMATIQUE: Seulement ${thematicallyValidQuestions.length}/${questions.length} questions valides pour "${selectedTheme}"`);
    throw new Error(`Questions générées ne respectent pas le thème "${selectedTheme}". Relancez la génération.`);
  }
  
  return thematicallyValidQuestions;
}
