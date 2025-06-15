
import { QuizQuestion } from '../biblical-contexts.ts';

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
