
import { BiblicalContext } from './biblical-contexts.ts';
import { DifficultyInstruction } from './difficulty-instructions.ts';

export function buildRigorousPrompt(
  selectedContext: BiblicalContext,
  selectedDifficulty: DifficultyInstruction,
  questionCount: number,
  ultraUniqueSeed: number
): string {
  // Ajouter des instructions spécifiques pour forcer la variabilité
  const uniquenessInstructions = `
🎲 IMPÉRATIF D'UNICITÉ ABSOLUE (SEED: ${ultraUniqueSeed}):
- Utilisez ce seed ${ultraUniqueSeed} comme base pour créer des questions TOTALEMENT DIFFÉRENTES
- INTERDICTION de répéter des questions déjà posées sur ce thème
- Explorez des angles INÉDITS et des versets DIFFÉRENTS à chaque génération
- Variez les types de questions : factuelle, géographique, chronologique, théologique
- Changez les personnages, événements et références bibliques abordés
- CRÉATIVITÉ MAXIMALE requise - pensez à des aspects peu explorés du thème
- Si c'est la même thématique, abordez des sous-aspects COMPLÈTEMENT DIFFÉRENTS
`;

  return `En tant qu'expert théologien évangélique reconnu et docteur en études bibliques, je vous demande de créer un quiz biblique d'excellence académique sur "${selectedContext.title}".

🔍 CONTEXTE BIBLIQUE DÉTAILLÉ :
${selectedContext.context}

📚 VERSETS CLÉS DE RÉFÉRENCE :
${selectedContext.keyVerses?.join(', ') || 'Références contextuelle précises requises'}

🎯 NIVEAU EXIGÉ : ${selectedDifficulty.instructions}

${uniquenessInstructions}

⚠️ EXIGENCES DOCTRINALES ABSOLUES :
1. EXACTITUDE BIBLIQUE PARFAITE - Aucune erreur factuelle tolérée
2. CONFORMITÉ ORTHODOXE - Respecter la doctrine évangélique historique
3. RÉFÉRENCES PRÉCISES - Chaque question doit citer des versets authentiques
4. VÉRITÉ THÉOLOGIQUE - Éviter toute ambiguïté doctrinale
5. ORIGINALITÉ TOTALE - Questions jamais formulées (seed: ${ultraUniqueSeed})

📋 FORMAT JSON REQUIS (AUCUN AUTRE TEXTE) :
[
  {
    "id": "q1",
    "question": "Question biblique précise et théologiquement exacte",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "verse": "Référence biblique exacte avec citation courte"
  }
]

🎪 CRÉATIVITÉ BIBLIQUE MAXIMALE AVEC SEED ${ultraUniqueSeed} :
- Explorez différents aspects du thème (historique, prophétique, typologique, symbolique)
- Variez les types de questions (qui, quoi, où, quand, pourquoi, comment)
- Utilisez des angles d'approche originaux et enrichissants
- Évitez les formulations banales ou répétitives
- Questions stimulantes testant la vraie connaissance biblique
- Puisez dans TOUTE la richesse du thème "${selectedContext.title}"
- Abordez des détails moins connus mais bibliquement solides
- Variez les livres bibliques référencés dans le contexte du thème

⚡ GÉNÉREZ MAINTENANT ${questionCount} QUESTIONS BIBLIQUES PARFAITES ET UNIQUES :
Thème : "${selectedContext.title}"
Niveau : ${selectedDifficulty.level}
Seed d'unicité : ${ultraUniqueSeed}
IMPÉRATIF : Questions DIFFÉRENTES à chaque génération même pour le même thème !

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !`;
}
