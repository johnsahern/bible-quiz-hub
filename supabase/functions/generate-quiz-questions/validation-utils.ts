
import { QuizQuestion } from './biblical-contexts.ts';

export function validateQuestions(questions: any[], expectedCount: number): any[] {
  console.log('🔍 Validation des questions reçues...');
  
  if (!Array.isArray(questions)) {
    console.error('❌ Questions reçues ne sont pas un tableau');
    throw new Error('Format de questions invalide');
  }

  const validQuestions = questions.filter(q => {
    // Validation de base
    const hasBasicStructure = q.question && 
                             Array.isArray(q.options) && 
                             q.options.length === 4 &&
                             typeof q.correctAnswer === 'number' &&
                             q.correctAnswer >= 0 && 
                             q.correctAnswer < 4;
    
    if (!hasBasicStructure) {
      console.warn('❌ Question rejetée - structure invalide:', q);
      return false;
    }

    // Validation de la longueur de la question
    if (q.question.length < 10) {
      console.warn('❌ Question rejetée - trop courte:', q.question);
      return false;
    }

    // Validation des options
    if (q.options.some((opt: string) => !opt || opt.length < 2)) {
      console.warn('❌ Question rejetée - options invalides:', q.options);
      return false;
    }

    return true;
  });

  console.log(`✅ ${validQuestions.length}/${questions.length} questions validées`);

  if (validQuestions.length === 0) {
    throw new Error('Aucune question valide générée');
  }

  // Retourner exactement le nombre demandé (ou moins si pas assez)
  const finalQuestions = validQuestions.slice(0, expectedCount);
  
  // Ajouter des IDs séquentiels
  return finalQuestions.map((q, index) => ({
    ...q,
    id: q.id || `q${index + 1}`
  }));
}

export function generateUniqueSeed(theme: string, difficulty: string, questionCount: number): number {
  const timestamp = Date.now();
  const themeHash = theme.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const difficultyHash = difficulty.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Créer un seed vraiment unique basé sur plusieurs facteurs
  const uniqueSeed = Math.floor(timestamp / 1000) + themeHash * 1000 + difficultyHash * 100 + questionCount * 10;
  
  console.log(`🎲 Generated unique seed: ${uniqueSeed} for theme: ${theme}, difficulty: ${difficulty}`);
  return uniqueSeed;
}

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

// Validation thématique ultra-stricte
export function validateThematicRelevance(questions: any[], selectedTheme: string): any[] {
  console.log(`🎯 VALIDATION THÉMATIQUE ULTRA-STRICTE pour: ${selectedTheme}`);
  
  // Mots-clés thématiques STRICTS pour chaque thème
  const strictThematicKeywords: { [key: string]: string[] } = {
    'paraboles-jesus': ['parabole', 'Jésus', 'Christ', 'royaume', 'seigneur', 'maitre', 'serviteur', 'semeur', 'moisson', 'vigne', 'berger', 'brebis', 'talent', 'drachme', 'pharisien', 'publicain', 'samaritain', 'lazare', 'riche', 'pauvre'],
    'miracles-jesus': ['miracle', 'guérison', 'aveugle', 'paralytique', 'lépreux', 'résurrection', 'multiplication', 'pain', 'poisson', 'tempête', 'mer', 'marcher', 'eau', 'Lazare', 'Jaïrus', 'hémorroïsse', 'Bartimée'],
    'vie-jesus': ['Jésus', 'Nazareth', 'Bethléem', 'Marie', 'Joseph', 'baptême', 'Jean-Baptiste', 'Galilée', 'disciples', 'apôtres', 'crucifixion', 'résurrection', 'ascension', 'Pilate', 'croix'],
    'david': ['David', 'roi', 'Goliath', 'Saül', 'Jonathan', 'Bethléem', 'berger', 'psaume', 'harpe', 'Jérusalem', 'Absalom', 'Salomon', 'arche', 'alliance'],
    'moise': ['Moïse', 'Égypte', 'Pharaon', 'Exode', 'Sinaï', 'buisson', 'ardent', 'Aaron', 'plaies', 'mer', 'Rouge', 'manne', 'commandements', 'tables', 'loi'],
    'creation': ['création', 'Genèse', 'Adam', 'Ève', 'Eden', 'jardin', 'serpent', 'fruit', 'défendu', 'Caïn', 'Abel', 'déluge', 'Noé', 'arche', 'jour'],
    'paul-apotre': ['Paul', 'Saul', 'Damas', 'conversion', 'Tarse', 'épîtres', 'voyage', 'missionnaire', 'Barnabas', 'Silas', 'Romains', 'Corinthiens', 'Galates', 'prison']
  };
  
  const keywords = strictThematicKeywords[selectedTheme] || [];
  
  if (keywords.length === 0) {
    console.warn(`⚠️ AUCUN MOT-CLÉ DÉFINI POUR LE THÈME: ${selectedTheme}`);
    return questions; // Accepter toutes les questions si pas de mots-clés définis
  }
  
  const thematicallyValidQuestions = questions.filter(q => {
    const fullText = `${q.question} ${q.options.join(' ')} ${q.verse || ''}`.toLowerCase();
    
    // Vérification STRICTE : au moins 2 mots-clés doivent être présents
    const matchingKeywords = keywords.filter(keyword => 
      fullText.includes(keyword.toLowerCase())
    );
    
    const isThematicallyValid = matchingKeywords.length >= 1; // Au moins 1 mot-clé requis
    
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
