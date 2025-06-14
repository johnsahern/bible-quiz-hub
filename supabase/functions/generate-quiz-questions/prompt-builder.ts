
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

  // Instructions ULTRA-RENFORCÉES pour la précision thématique
  const thematicPrecisionInstructions = `
🎯 PRÉCISION THÉMATIQUE ABSOLUE - AUCUNE EXCEPTION TOLÉRÉE :
- CHAQUE QUESTION DOIT ÊTRE 100% LIÉE AU THÈME "${selectedContext.title}"
- ZÉRO TOLÉRANCE pour les questions générales sur d'autres sujets bibliques
- INTERDICTION FORMELLE de poser des questions sur des thèmes différents
- Si le thème est "La Vie de Jésus", TOUTES les questions concernent SA VIE uniquement
- Si le thème est "Les Miracles de Jésus", TOUTES les questions concernent SES MIRACLES uniquement
- Si le thème est "David", TOUTES les questions concernent LE ROI DAVID uniquement
- Si le thème est "La Création", TOUTES les questions concernent LE RÉCIT DE CRÉATION uniquement
- CHAQUE personnage, événement, verset mentionné DOIT être pertinent au thème "${selectedContext.title}"
- Vérifiez TROIS FOIS que chaque question est directement liée au thème avant de l'inclure
- En cas de doute sur la pertinence d'une question, NE PAS L'INCLURE
- Privilégiez la QUALITÉ THÉMATIQUE sur la quantité
`;

  // Instructions de validation thématique
  const thematicValidationInstructions = `
✅ PROCESSUS DE VALIDATION THÉMATIQUE OBLIGATOIRE :
Avant d'inclure chaque question, posez-vous ces 3 questions :
1. Cette question parle-t-elle DIRECTEMENT du thème "${selectedContext.title}" ?
2. La réponse correcte concerne-t-elle SPÉCIFIQUEMENT ce thème ?
3. Un expert du thème "${selectedContext.title}" considérerait-il cette question comme pertinente ?

Si une seule réponse est NON, ÉLIMINEZ la question immédiatement.

EXEMPLES DE QUESTIONS À ÉVITER :
- Si thème = "Miracles de Jésus" → NE PAS poser de questions sur les paraboles
- Si thème = "David" → NE PAS poser de questions sur Moïse ou Abraham  
- Si thème = "Création" → NE PAS poser de questions sur l'Exode
- Si thème = "Apôtre Paul" → NE PAS poser de questions sur Pierre ou Jean

SEULES LES QUESTIONS 100% ALIGNÉES AVEC LE THÈME SONT ACCEPTÉES.
`;

  return `En tant qu'expert théologien évangélique reconnu et docteur en études bibliques, je vous demande de créer un quiz biblique d'excellence académique sur "${selectedContext.title}".

🔍 CONTEXTE BIBLIQUE DÉTAILLÉ :
${selectedContext.context}

📚 VERSETS CLÉS DE RÉFÉRENCE :
${selectedContext.keyVerses?.join(', ') || 'Références contextuelles précises requises'}

🎯 NIVEAU EXIGÉ : ${selectedDifficulty.instructions}

${uniquenessInstructions}

${thematicPrecisionInstructions}

${thematicValidationInstructions}

⚠️ EXIGENCES DOCTRINALES ABSOLUES :
1. EXACTITUDE BIBLIQUE PARFAITE - Aucune erreur factuelle tolérée
2. CONFORMITÉ ORTHODOXE - Respecter la doctrine évangélique historique
3. RÉFÉRENCES PRÉCISES - Chaque question doit citer des versets authentiques
4. VÉRITÉ THÉOLOGIQUE - Éviter toute ambiguïté doctrinale
5. ORIGINALITÉ TOTALE - Questions jamais formulées (seed: ${ultraUniqueSeed})
6. PERTINENCE THÉMATIQUE ABSOLUE - 100% des questions sur "${selectedContext.title}" UNIQUEMENT

🚨 RÈGLE D'OR INVIOLABLE :
Si une question ne concerne pas DIRECTEMENT et SPÉCIFIQUEMENT le thème "${selectedContext.title}", 
elle est AUTOMATIQUEMENT REJETÉE. Aucune exception. Aucun compromis.

📋 FORMAT JSON REQUIS (AUCUN AUTRE TEXTE) :
[
  {
    "id": "q1",
    "question": "Question 100% spécifique au thème ${selectedContext.title}",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "verse": "Référence biblique exacte liée au thème ${selectedContext.title}"
  }
]

🎪 CRÉATIVITÉ THÉMATIQUE CIBLÉE AVEC SEED ${ultraUniqueSeed} :
- Explorez TOUS les aspects du thème "${selectedContext.title}" (historique, prophétique, typologique)
- Variez les approches : qui, quoi, où, quand, pourquoi, comment - TOUJOURS sur "${selectedContext.title}"
- Angles originaux MAIS EXCLUSIVEMENT sur le thème "${selectedContext.title}"
- Questions stimulantes testant la connaissance SPÉCIFIQUE de "${selectedContext.title}"
- Détails moins connus MAIS PERTINENTS au thème "${selectedContext.title}"
- Versets variés MAIS TOUS en rapport avec "${selectedContext.title}"

⚡ GÉNÉREZ MAINTENANT ${questionCount} QUESTIONS PARFAITES :
Thème EXCLUSIF et OBLIGATOIRE : "${selectedContext.title}"
Niveau : ${selectedDifficulty.level}
Seed d'unicité : ${ultraUniqueSeed}
IMPÉRATIF ABSOLU : Chaque question DOIT être sur "${selectedContext.title}" - AUCUNE EXCEPTION !

🔴 CONTRÔLE FINAL OBLIGATOIRE :
Avant de répondre, relisez chaque question et demandez-vous :
"Cette question concerne-t-elle à 100% le thème '${selectedContext.title}' ?"
Si la réponse est non, supprimez la question immédiatement.

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !

THÈME ABSOLU ET INCONTOURNABLE : "${selectedContext.title}"
TOUT ÉCART THÉMATIQUE EST INACCEPTABLE !`;
}
