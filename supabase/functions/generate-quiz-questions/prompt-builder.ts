
import { BiblicalContext } from './biblical-contexts.ts';
import { DifficultyInstruction } from './difficulty-instructions.ts';

export function buildRigorousPrompt(
  selectedContext: BiblicalContext,
  selectedDifficulty: DifficultyInstruction,
  questionCount: number,
  ultraUniqueSeed: number
): string {
  // Instructions d'unicité avec seed valide
  const uniquenessInstructions = `
🎲 IMPÉRATIF D'UNICITÉ ABSOLUE (SEED: ${ultraUniqueSeed}):
- Utilisez ce seed ${ultraUniqueSeed} pour créer des questions TOTALEMENT DIFFÉRENTES
- INTERDICTION FORMELLE de répéter des questions déjà posées
- Explorez des angles INÉDITS du thème "${selectedContext.title}"
- Variez les types de questions : personnages, événements, détails, enseignements
- CRÉATIVITÉ MAXIMALE requise dans le respect STRICT du thème
- Chaque génération avec ce seed doit produire des questions DIFFÉRENTES
`;

  // Instructions ULTRA-RENFORCÉES pour la précision thématique
  const thematicPrecisionInstructions = `
🎯 PRÉCISION THÉMATIQUE ABSOLUE - ZÉRO TOLÉRANCE :
- THÈME EXCLUSIF : "${selectedContext.title}"
- CHAQUE QUESTION DOIT CONCERNER UNIQUEMENT "${selectedContext.title}"
- INTERDICTION TOTALE de questions sur d'autres sujets bibliques
- AUCUNE question générale sur la Bible n'est acceptée
- TOUS les personnages, événements, références DOIVENT être liés à "${selectedContext.title}"
- Vérifiez TROIS FOIS que chaque question traite EXCLUSIVEMENT de "${selectedContext.title}"
- Utilisez les mots-clés spécifiques au thème "${selectedContext.title}"
- REJETEZ immédiatement toute question qui s'écarte du thème
`;

  // Instructions de validation thématique
  const thematicValidationInstructions = `
✅ CONTRÔLE QUALITÉ THÉMATIQUE OBLIGATOIRE :
Avant d'inclure chaque question, vérifiez :
1. Cette question traite-t-elle EXCLUSIVEMENT de "${selectedContext.title}" ?
2. La réponse correcte concerne-t-elle DIRECTEMENT "${selectedContext.title}" ?
3. Les options de réponse sont-elles liées au thème "${selectedContext.title}" ?

Si UNE SEULE réponse est NON, ÉLIMINEZ la question.

EXEMPLES SELON LE THÈME :
- Thème "Paraboles de Jésus" → UNIQUEMENT des questions sur les paraboles racontées par Jésus
- Thème "Miracles de Jésus" → UNIQUEMENT des questions sur les miracles accomplis par Jésus  
- Thème "Vie de Jésus" → UNIQUEMENT des questions sur la vie, naissance, ministère, mort, résurrection de Jésus
- Thème "David" → UNIQUEMENT des questions sur le roi David, sa vie, ses actions, ses psaumes

AUCUNE EXCEPTION N'EST TOLÉRÉE.
`;

  return `Vous êtes un expert théologien évangélique spécialisé en "${selectedContext.title}". Créez un quiz biblique d'excellence sur ce thème EXCLUSIVEMENT.

🔍 CONTEXTE BIBLIQUE SPÉCIALISÉ :
${selectedContext.context}

📚 VERSETS DE RÉFÉRENCE OBLIGATOIRES :
${selectedContext.keyVerses?.join(', ') || 'Références spécifiques au thème requis'}

🎯 NIVEAU DE DIFFICULTÉ : ${selectedDifficulty.instructions}

${uniquenessInstructions}

${thematicPrecisionInstructions}

${thematicValidationInstructions}

⚠️ EXIGENCES DOCTRINALES CRITIQUES :
1. EXACTITUDE BIBLIQUE TOTALE - Zéro erreur factuelle
2. CONFORMITÉ THÉMATIQUE STRICTE - 100% "${selectedContext.title}"
3. RÉFÉRENCES PRÉCISES - Versets authentiques liés au thème
4. ORIGINALITÉ AVEC SEED ${ultraUniqueSeed}
5. EXCLUSIVITÉ THÉMATIQUE - Rien d'autre que "${selectedContext.title}"

🚨 RÈGLE ABSOLUE INVIOLABLE :
Toute question qui ne concerne pas DIRECTEMENT "${selectedContext.title}" sera AUTOMATIQUEMENT REJETÉE.

📋 FORMAT JSON STRICT (AUCUN AUTRE TEXTE) :
[
  {
    "id": "q1",
    "question": "Question 100% sur ${selectedContext.title}",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "verse": "Référence biblique précise liée à ${selectedContext.title}"
  }
]

🎪 CRÉATIVITÉ THÉMATIQUE EXCLUSIVE (SEED ${ultraUniqueSeed}) :
- Explorez TOUS les aspects de "${selectedContext.title}" uniquement
- Personnages EXCLUSIFS au thème "${selectedContext.title}"
- Événements SPÉCIFIQUES à "${selectedContext.title}" 
- Détails UNIQUES de "${selectedContext.title}"
- Enseignements PROPRES à "${selectedContext.title}"
- Versets RELATIFS à "${selectedContext.title}" seulement

⚡ GÉNÉREZ ${questionCount} QUESTIONS PARFAITES :
- Thème EXCLUSIF : "${selectedContext.title}"
- Difficulté : ${selectedDifficulty.level}
- Seed : ${ultraUniqueSeed}
- IMPÉRATIF : 100% des questions sur "${selectedContext.title}"

🔴 VÉRIFICATION FINALE OBLIGATOIRE :
Relisez chaque question et demandez-vous :
"Cette question concerne-t-elle à 100% le thème '${selectedContext.title}' ?"
Si NON → SUPPRIMEZ-LA IMMÉDIATEMENT.

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !

THÈME ABSOLU : "${selectedContext.title}"
TOUT ÉCART EST INACCEPTABLE !`;
}
