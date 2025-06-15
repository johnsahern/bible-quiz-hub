
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
- ROTATION des sujets dans le thème pour éviter la répétition
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
- FOCUS LASER sur "${selectedContext.title}" - RIEN D'AUTRE
`;

  return `Vous êtes un expert théologien évangélique spécialisé EXCLUSIVEMENT en "${selectedContext.title}". Créez un quiz biblique d'excellence PRODUCTION sur ce thème UNIQUEMENT.

🔍 CONTEXTE BIBLIQUE SPÉCIALISÉ EXCLUSIF :
${selectedContext.context}

📚 DOMAINES DE FOCUS OBLIGATOIRES pour "${selectedContext.title}" :
${selectedContext.focus_areas?.join(', ') || 'Aspects spécifiques au thème requis'}

🎯 NIVEAU DE DIFFICULTÉ : ${selectedDifficulty.instructions}

${uniquenessInstructions}

${thematicPrecisionInstructions}

⚠️ EXIGENCES PRODUCTION CRITIQUES :
1. EXACTITUDE BIBLIQUE TOTALE - Zéro erreur factuelle
2. CONFORMITÉ THÉMATIQUE STRICTE - 100% "${selectedContext.title}" EXCLUSIVEMENT
3. RÉFÉRENCES PRÉCISES - Versets authentiques liés UNIQUEMENT au thème
4. ORIGINALITÉ ABSOLUE avec seed ${ultraUniqueSeed}
5. EXCLUSIVITÉ THÉMATIQUE - Rien d'autre que "${selectedContext.title}"
6. QUALITÉ PRODUCTION - Excellence maximale
7. UNICITÉ GARANTIE - Questions jamais vues avec ce seed

🚨 RÈGLE ABSOLUE INVIOLABLE PRODUCTION :
Toute question qui ne concerne pas DIRECTEMENT ET EXCLUSIVEMENT "${selectedContext.title}" sera AUTOMATIQUEMENT REJETÉE.

📋 FORMAT JSON STRICT PRODUCTION (AUCUN AUTRE TEXTE) :
[
  {
    "id": "q1_${ultraUniqueSeed}",
    "question": "Question 100% sur ${selectedContext.title} UNIQUEMENT (seed ${ultraUniqueSeed})",
    "options": ["Option A sur le thème EXCLUSIF", "Option B sur le thème EXCLUSIF", "Option C sur le thème EXCLUSIF", "Option D sur le thème EXCLUSIF"],
    "correctAnswer": 0,
    "verse": "Référence biblique précise liée UNIQUEMENT à ${selectedContext.title}"
  }
]

🎪 CRÉATIVITÉ THÉMATIQUE EXCLUSIVE PRODUCTION (SEED ${ultraUniqueSeed}) :
- Explorez TOUS les aspects de "${selectedContext.title}" EXCLUSIVEMENT
- Personnages EXCLUSIFS au thème "${selectedContext.title}"
- Événements SPÉCIFIQUES à "${selectedContext.title}" SEULEMENT
- Détails UNIQUES de "${selectedContext.title}" UNIQUEMENT
- Enseignements PROPRES à "${selectedContext.title}" EXCLUSIVEMENT
- Versets RELATIFS à "${selectedContext.title}" seulement
- UNICITÉ TOTALE avec ce seed ${ultraUniqueSeed}
- VARIATION MAXIMALE des angles dans le thème

⚡ GÉNÉREZ ${questionCount} QUESTIONS PARFAITES PRODUCTION :
- Thème ULTRA-EXCLUSIF : "${selectedContext.title}"
- Difficulté : ${selectedDifficulty.level}
- Seed unique : ${ultraUniqueSeed}
- IMPÉRATIF : 100% des questions sur "${selectedContext.title}" EXCLUSIVEMENT
- QUALITÉ : Excellence production MAXIMALE
- UNICITÉ : Garantie avec seed ${ultraUniqueSeed}

🔴 VÉRIFICATION FINALE OBLIGATOIRE PRODUCTION :
Relisez chaque question et demandez-vous :
"Cette question concerne-t-elle à 100% EXCLUSIVEMENT le thème '${selectedContext.title}' ET est-elle unique avec le seed ${ultraUniqueSeed} ?"
Si NON → SUPPRIMEZ-LA IMMÉDIATEMENT ET REMPLACEZ-LA.

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !

THÈME ABSOLU PRODUCTION : "${selectedContext.title}" - EXCLUSIVEMENT !
TOUT ÉCART EST INACCEPTABLE EN PRODUCTION !
UNICITÉ ABSOLUE AVEC SEED ${ultraUniqueSeed} !
FOCUS LASER EXCLUSIF SUR "${selectedContext.title}" !`;
}
