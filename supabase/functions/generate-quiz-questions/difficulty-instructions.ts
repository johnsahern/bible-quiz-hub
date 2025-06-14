
export interface DifficultyInstruction {
  level: string;
  instructions: string;
}

export const difficultyInstructions: Record<string, DifficultyInstruction> = {
  'facile': {
    level: 'niveau débutant en connaissance biblique',
    instructions: 'Questions sur les faits bibliques fondamentaux, personnages célèbres, événements majeurs bien connus. Éviter les détails complexes, les nuances théologiques ou les références obscures. Réponses évidentes pour un croyant ayant des bases bibliques solides.'
  },
  'moyen': {
    level: 'niveau intermédiaire en étude biblique',
    instructions: 'Questions détaillées nécessitant une connaissance approfondie des Écritures, connexions entre livres, chronologie précise, contexte historique, significations symboliques. Inclure des références spécifiques et des analyses textuelles modérées.'
  },
  'difficile': {
    level: 'niveau expert en théologie biblique',
    instructions: 'Questions complexes exigeant une maîtrise théologique avancée, exégèse approfondie, hébreu/grec, doctrines pointues, controverses théologiques, parallèles inter-testamentaires, typologie messianique, eschatologie détaillée.'
  }
};

export function getDifficultyInstruction(difficulty: string): DifficultyInstruction {
  const instruction = difficultyInstructions[difficulty];
  if (!instruction) {
    throw new Error(`Niveau de difficulté non supporté: ${difficulty}`);
  }
  return instruction;
}
