
import { BiblicalContext } from './biblical-contexts.ts';
import { DifficultyInstruction } from './difficulty-instructions.ts';

export function buildRigorousPrompt(
  selectedContext: BiblicalContext,
  selectedDifficulty: DifficultyInstruction,
  questionCount: number,
  ultraUniqueSeed: number
): string {
  // Instructions d'unicité avec seed ultra-renforcé
  const uniquenessInstructions = `
🎲 IMPÉRATIF D'UNICITÉ ABSOLUE (SEED ULTRA-UNIQUE: ${ultraUniqueSeed}):
- Ce seed ${ultraUniqueSeed} doit générer des questions TOTALEMENT DIFFÉRENTES à chaque fois
- INTERDICTION FORMELLE de répéter des questions déjà posées dans d'autres parties
- Explorez des angles INÉDITS et VARIÉS du thème "${selectedContext.title}"
- Variez OBLIGATOIREMENT les types : personnages, événements, détails, enseignements, chronologie
- CRÉATIVITÉ MAXIMALE requise dans le respect STRICT du thème
- Chaque question doit être UNIQUE et ORIGINALE pour ce seed ${ultraUniqueSeed}
- DIVERSIFIEZ les formulations et angles d'approche
`;

  // Instructions ULTRA-RENFORCÉES pour la précision thématique
  const thematicPrecisionInstructions = `
🎯 PRÉCISION THÉMATIQUE ABSOLUE - ZÉRO TOLÉRANCE - PRODUCTION :
- THÈME EXCLUSIF ET UNIQUE : "${selectedContext.title}"
- CHAQUE QUESTION DOIT CONCERNER UNIQUEMENT "${selectedContext.title}"
- INTERDICTION TOTALE de questions sur d'autres sujets bibliques
- AUCUNE question générale sur la Bible n'est acceptée
- TOUS les personnages, événements, références DOIVENT être liés à "${selectedContext.title}"
- Vérifiez TROIS FOIS que chaque question traite EXCLUSIVEMENT de "${selectedContext.title}"
- Utilisez UNIQUEMENT les mots-clés spécifiques au thème "${selectedContext.title}"
- REJETEZ immédiatement toute question qui s'écarte du thème
- VERSION PRODUCTION : Qualité maximale exigée
`;

  // Instructions de validation thématique ultra-stricte
  const thematicValidationInstructions = `
✅ CONTRÔLE QUALITÉ THÉMATIQUE ULTRA-STRICT - PRODUCTION :
Avant d'inclure chaque question, vérifiez RIGOUREUSEMENT :
1. Cette question traite-t-elle EXCLUSIVEMENT de "${selectedContext.title}" ?
2. La réponse correcte concerne-t-elle DIRECTEMENT "${selectedContext.title}" ?
3. Les options de réponse sont-elles TOUTES liées au thème "${selectedContext.title}" ?
4. Cette question est-elle UNIQUE avec le seed ${ultraUniqueSeed} ?

Si UNE SEULE réponse est NON, ÉLIMINEZ IMMÉDIATEMENT la question.

EXEMPLES ULTRA-STRICTS SELON LE THÈME :
- Thème "Généalogie de Jésus" → UNIQUEMENT des questions sur les généalogies de Matthieu et Luc
- Thème "Paraboles de Jésus" → UNIQUEMENT des questions sur les paraboles racontées par Jésus
- Thème "Miracles de Jésus" → UNIQUEMENT des questions sur les miracles accomplis par Jésus  
- Thème "Vie de Jésus" → UNIQUEMENT des questions sur la vie, naissance, ministère, mort, résurrection de Jésus

AUCUNE EXCEPTION N'EST TOLÉRÉE EN PRODUCTION.
`;

  return `Vous êtes un expert théologien évangélique spécialisé en "${selectedContext.title}". Créez un quiz biblique d'excellence PRODUCTION sur ce thème EXCLUSIVEMENT.

🔍 CONTEXTE BIBLIQUE SPÉCIALISÉ :
${selectedContext.context}

📚 DOMAINES DE FOCUS OBLIGATOIRES :
${selectedContext.focus_areas?.join(', ') || 'Aspects spécifiques au thème requis'}

🎯 NIVEAU DE DIFFICULTÉ : ${selectedDifficulty.instructions}

${uniquenessInstructions}

${thematicPrecisionInstructions}

${thematicValidationInstructions}

⚠️ EXIGENCES PRODUCTION CRITIQUES :
1. EXACTITUDE BIBLIQUE TOTALE - Zéro erreur factuelle
2. CONFORMITÉ THÉMATIQUE STRICTE - 100% "${selectedContext.title}"
3. RÉFÉRENCES PRÉCISES - Versets authentiques liés au thème
4. ORIGINALITÉ ABSOLUE avec seed ${ultraUniqueSeed}
5. EXCLUSIVITÉ THÉMATIQUE - Rien d'autre que "${selectedContext.title}"
6. QUALITÉ PRODUCTION - Excellence maximale

🚨 RÈGLE ABSOLUE INVIOLABLE PRODUCTION :
Toute question qui ne concerne pas DIRECTEMENT "${selectedContext.title}" sera AUTOMATIQUEMENT REJETÉE.

📋 FORMAT JSON STRICT PRODUCTION (AUCUN AUTRE TEXTE) :
[
  {
    "id": "q1",
    "question": "Question 100% sur ${selectedContext.title} (seed ${ultraUniqueSeed})",
    "options": ["Option A sur le thème", "Option B sur le thème", "Option C sur le thème", "Option D sur le thème"],
    "correctAnswer": 0,
    "verse": "Référence biblique précise liée UNIQUEMENT à ${selectedContext.title}"
  }
]

🎪 CRÉATIVITÉ THÉMATIQUE EXCLUSIVE PRODUCTION (SEED ${ultraUniqueSeed}) :
- Explorez TOUS les aspects de "${selectedContext.title}" uniquement
- Personnages EXCLUSIFS au thème "${selectedContext.title}"
- Événements SPÉCIFIQUES à "${selectedContext.title}" 
- Détails UNIQUES de "${selectedContext.title}"
- Enseignements PROPRES à "${selectedContext.title}"
- Versets RELATIFS à "${selectedContext.title}" seulement
- UNICITÉ TOTALE avec ce seed ${ultraUniqueSeed}

⚡ GÉNÉREZ ${questionCount} QUESTIONS PARFAITES PRODUCTION :
- Thème EXCLUSIF : "${selectedContext.title}"
- Difficulté : ${selectedDifficulty.level}
- Seed unique : ${ultraUniqueSeed}
- IMPÉRATIF : 100% des questions sur "${selectedContext.title}"
- QUALITÉ : Excellence production

🔴 VÉRIFICATION FINALE OBLIGATOIRE PRODUCTION :
Relisez chaque question et demandez-vous :
"Cette question concerne-t-elle à 100% le thème '${selectedContext.title}' ET est-elle unique avec le seed ${ultraUniqueSeed} ?"
Si NON → SUPPRIMEZ-LA IMMÉDIATEMENT.

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !

THÈME ABSOLU PRODUCTION : "${selectedContext.title}"
TOUT ÉCART EST INACCEPTABLE EN PRODUCTION !
UNICITÉ ABSOLUE AVEC SEED ${ultraUniqueSeed} !`;
}
