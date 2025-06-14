
import { BiblicalContext } from './biblical-contexts.ts';
import { DifficultyInstruction } from './difficulty-instructions.ts';

export function buildRigorousPrompt(
  selectedContext: BiblicalContext,
  selectedDifficulty: DifficultyInstruction,
  questionCount: number,
  ultraUniqueSeed: number
): string {
  // Ajouter des instructions spécifiques pour forcer la variabilité ET la précision thématique
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

  // Instructions renforcées pour la précision thématique
  const thematicPrecisionInstructions = `
🎯 PRÉCISION THÉMATIQUE ABSOLUE REQUISE :
- TOUTES les questions DOIVENT être directement liées au thème "${selectedContext.title}"
- INTERDICTION de poser des questions générales sur d'autres sujets bibliques
- Chaque question doit explorer un aspect SPÉCIFIQUE du thème choisi
- Les personnages, événements et références mentionnés doivent être PERTINENTS au thème
- Évitez les questions trop générales qui pourraient s'appliquer à d'autres thèmes
- Concentrez-vous sur les détails, enseignements et aspects uniques du thème "${selectedContext.title}"
- Si le thème concerne un personnage : questions sur sa vie, ses actions, ses paroles, son contexte
- Si le thème concerne un livre biblique : questions sur son contenu, ses personnages, ses enseignements
- Si le thème concerne un concept : questions sur ses applications, ses exemples bibliques, ses implications
`;

  return `En tant qu'expert théologien évangélique reconnu et docteur en études bibliques, je vous demande de créer un quiz biblique d'excellence académique sur "${selectedContext.title}".

🔍 CONTEXTE BIBLIQUE DÉTAILLÉ :
${selectedContext.context}

📚 VERSETS CLÉS DE RÉFÉRENCE :
${selectedContext.keyVerses?.join(', ') || 'Références contextuelles précises requises'}

🎯 NIVEAU EXIGÉ : ${selectedDifficulty.instructions}

${uniquenessInstructions}

${thematicPrecisionInstructions}

⚠️ EXIGENCES DOCTRINALES ABSOLUES :
1. EXACTITUDE BIBLIQUE PARFAITE - Aucune erreur factuelle tolérée
2. CONFORMITÉ ORTHODOXE - Respecter la doctrine évangélique historique
3. RÉFÉRENCES PRÉCISES - Chaque question doit citer des versets authentiques
4. VÉRITÉ THÉOLOGIQUE - Éviter toute ambiguïté doctrinale
5. ORIGINALITÉ TOTALE - Questions jamais formulées (seed: ${ultraUniqueSeed})
6. PERTINENCE THÉMATIQUE - Toutes les questions doivent être directement liées au thème "${selectedContext.title}"

📋 FORMAT JSON REQUIS (AUCUN AUTRE TEXTE) :
[
  {
    "id": "q1",
    "question": "Question biblique précise et théologiquement exacte sur ${selectedContext.title}",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "verse": "Référence biblique exacte avec citation courte"
  }
]

🎪 CRÉATIVITÉ BIBLIQUE MAXIMALE AVEC SEED ${ultraUniqueSeed} :
- Explorez différents aspects du thème "${selectedContext.title}" (historique, prophétique, typologique, symbolique)
- Variez les types de questions (qui, quoi, où, quand, pourquoi, comment) TOUJOURS en lien avec le thème
- Utilisez des angles d'approche originaux et enrichissants SPÉCIFIQUES au thème
- Évitez les formulations banales ou répétitives
- Questions stimulantes testant la vraie connaissance du thème "${selectedContext.title}"
- Puisez dans TOUTE la richesse SPÉCIFIQUE du thème "${selectedContext.title}"
- Abordez des détails moins connus mais bibliquement solides RELATIFS au thème
- Variez les livres bibliques référencés MAIS TOUJOURS en rapport avec le thème "${selectedContext.title}"

⚡ GÉNÉREZ MAINTENANT ${questionCount} QUESTIONS BIBLIQUES PARFAITES ET UNIQUES :
Thème EXCLUSIF : "${selectedContext.title}"
Niveau : ${selectedDifficulty.level}
Seed d'unicité : ${ultraUniqueSeed}
IMPÉRATIF : Questions DIFFÉRENTES à chaque génération ET TOUJOURS sur le thème "${selectedContext.title}" !

⚠️ RAPPEL CRITIQUE : Chaque question doit être directement et spécifiquement liée au thème "${selectedContext.title}". Aucune question générale sur d'autres sujets bibliques n'est acceptée !

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !`;
}
