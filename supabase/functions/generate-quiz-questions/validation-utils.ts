
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  verse: string;
}

export function validateQuestions(questions: any[], questionCount: number): QuizQuestion[] {
  if (!Array.isArray(questions)) {
    console.error('❌ La réponse n\'est pas un tableau:', typeof questions);
    throw new Error('Réponse Gemini non conforme - tableau requis');
  }

  if (questions.length === 0) {
    console.error('❌ Tableau de questions vide');
    throw new Error('Gemini n\'a généré aucune question biblique');
  }

  console.log(`📊 QUESTIONS BIBLIQUES GÉNÉRÉES : ${questions.length}`);

  return questions.slice(0, questionCount).map((q, index) => {
    console.log(`🔍 Validation question biblique ${index + 1}:`, q);
    
    if (!q || typeof q !== 'object') {
      throw new Error(`Question ${index + 1} invalide - structure incorrecte`);
    }

    const questionId = q.id || `biblical_q${index + 1}`;
    const question = q.question || `Question biblique ${index + 1} non définie`;
    
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`❌ Question ${index + 1} - options invalides:`, q.options);
      throw new Error(`Question ${index + 1}: 4 options bibliques requises, reçu ${q.options?.length || 0}`);
    }
    
    const correctAnswer = typeof q.correctAnswer === 'number' && 
      q.correctAnswer >= 0 && q.correctAnswer <= 3 
      ? q.correctAnswer 
      : 0;
    
    if (correctAnswer !== q.correctAnswer) {
      console.warn(`⚠️ Question ${index + 1}: correctAnswer corrigé de ${q.correctAnswer} vers ${correctAnswer}`);
    }
    
    const verse = q.verse || 'Référence biblique à vérifier';

    return {
      id: questionId,
      question: question.trim(),
      options: q.options.map((opt: any) => opt.toString().trim()),
      correctAnswer,
      verse: verse.trim()
    };
  });
}

export function generateUniqueSeed(theme: string, difficulty: string, questionCount: number): number {
  // Utiliser plusieurs sources d'entropie pour garantir l'unicité
  const timestamp = Date.now();
  const microseconds = performance.now() * 1000; // Précision en microsecondes
  const randomComponent = Math.random() * 999999999; // Grand nombre aléatoire
  const sessionRandom = Math.random() * 888888888; // Second nombre aléatoire
  
  // Hachage des paramètres d'entrée avec plus de variabilité
  const themeHash = theme.split('').reduce((acc, char, i) => {
    return acc + char.charCodeAt(0) * (i + 1) * 17; // Multiplier par 17 pour plus de dispersion
  }, 0);
  
  const difficultyHash = difficulty.split('').reduce((acc, char, i) => {
    return acc + char.charCodeAt(0) * (i + 1) * 23; // Multiplier par 23 pour plus de dispersion
  }, 0);
  
  // Ajouter un compteur basé sur l'heure précise pour éviter les collisions
  const hourMinuteSecond = new Date().getHours() * 10000 + new Date().getMinutes() * 100 + new Date().getSeconds();
  const millisecondComponent = new Date().getMilliseconds() * 1000;
  
  // Combiner toutes les sources d'entropie
  const combinedSeed = Math.floor(
    timestamp + 
    microseconds + 
    randomComponent + 
    sessionRandom +
    themeHash * 31 + 
    difficultyHash * 37 + 
    questionCount * 41 +
    hourMinuteSecond * 43 +
    millisecondComponent * 47
  );
  
  // S'assurer que le seed est toujours positif et dans une plage raisonnable
  return Math.abs(combinedSeed) % 999999999999 + 100000000000;
}

export function cleanJsonResponse(content: string): string {
  let cleanedContent = content.trim();
  
  // Suppression des balises markdown
  cleanedContent = cleanedContent.replace(/```json\s*/gi, '');
  cleanedContent = cleanedContent.replace(/\s*```/g, '');
  cleanedContent = cleanedContent.replace(/^[^[\{]*/, ''); // Supprime tout avant le premier [ ou {
  cleanedContent = cleanedContent.replace(/[^}\]]*$/, ''); // Supprime tout après le dernier } ou ]
  
  // Recherche du tableau JSON
  const jsonStart = cleanedContent.indexOf('[');
  const jsonEnd = cleanedContent.lastIndexOf(']') + 1;
  
  if (jsonStart === -1 || jsonEnd === 0) {
    console.error('❌ Aucun tableau JSON trouvé dans la réponse Gemini');
    console.log('📄 Contenu reçu:', cleanedContent);
    throw new Error('Format de réponse Gemini invalide - JSON manquant');
  }
  
  return cleanedContent.substring(jsonStart, jsonEnd);
}
