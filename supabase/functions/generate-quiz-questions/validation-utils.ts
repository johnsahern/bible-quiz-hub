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

    // Validation du verset (optionnel mais recommandé)
    if (q.verse && q.verse.length < 3) {
      console.warn('⚠️ Verset suspect pour la question:', q.question);
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
  const uniqueSeed = timestamp + themeHash * 1000 + difficultyHash * 100 + questionCount * 10;
  
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

// Fonction pour valider la pertinence thématique (validation supplémentaire)
export function validateThematicRelevance(questions: any[], selectedTheme: string): any[] {
  console.log(`🎯 Validation de la pertinence thématique pour le thème: ${selectedTheme}`);
  
  // Mots-clés thématiques pour une validation basique côté serveur
  const thematicKeywords: { [key: string]: string[] } = {
    'vie-jesus': ['Jésus', 'Christ', 'Seigneur', 'Nazareth', 'Bethléem', 'Galilée'],
    'miracles-jesus': ['miracle', 'guérison', 'multiplication', 'résurrection', 'aveugle', 'paralytique'],
    'david': ['David', 'roi', 'Goliath', 'Saül', 'Bethléem', 'berger'],
    'creation': ['création', 'Genèse', 'Adam', 'Ève', 'jardin', 'Eden'],
    'moise': ['Moïse', 'Égypte', 'Pharaon', 'Exode', 'Sinai', 'tables'],
    'paul-apotre': ['Paul', 'Saul', 'Damas', 'Tarse', 'épîtres', 'voyage'],
    // Ajouter d'autres thèmes selon les besoins...
  };
  
  const keywords = thematicKeywords[selectedTheme] || [];
  
  if (keywords.length === 0) {
    console.log('ℹ️ Pas de mots-clés spécifiques définis pour ce thème, validation générale uniquement');
    return questions;
  }
  
  const relevantQuestions = questions.filter(q => {
    const questionText = (q.question + ' ' + q.options.join(' ')).toLowerCase();
    const hasRelevantKeyword = keywords.some(keyword => 
      questionText.includes(keyword.toLowerCase())
    );
    
    if (!hasRelevantKeyword) {
      console.warn(`⚠️ Question potentiellement hors-sujet détectée: ${q.question.substring(0, 50)}...`);
    }
    
    return hasRelevantKeyword;
  });
  
  console.log(`✅ ${relevantQuestions.length}/${questions.length} questions considérées comme thématiquement pertinentes`);
  
  // Si trop de questions sont filtrées, on garde les originales avec un avertissement
  if (relevantQuestions.length < questions.length * 0.5) {
    console.warn('⚠️ Trop de questions filtrées, conservation des questions originales');
    return questions;
  }
  
  return relevantQuestions;
}
