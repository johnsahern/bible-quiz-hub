
import { BiblicalContext } from './biblical-contexts.ts';
import { DifficultyInstruction } from './difficulty-instructions.ts';

export function buildRigorousPrompt(
  selectedContext: BiblicalContext,
  selectedDifficulty: DifficultyInstruction,
  questionCount: number,
  ultraUniqueSeed: number
): string {
  return `En tant qu'expert théologien évangélique reconnu et docteur en études bibliques, je vous demande de créer un quiz biblique d'excellence académique sur "${selectedContext.title}".

🔍 CONTEXTE BIBLIQUE DÉTAILLÉ :
${selectedContext.context}

📚 VERSETS CLÉS DE RÉFÉRENCE :
${selectedContext.keyVerses?.join(', ') || 'Références contextuelle précises requises'}

🎯 NIVEAU EXIGÉ : ${selectedDifficulty.instructions}

🔢 SEED D'UNICITÉ ABSOLUE : ${ultraUniqueSeed}
(Utilisez ce nombre pour créer ${questionCount} questions TOTALEMENT INÉDITES et JAMAIS POSÉES)

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

🎪 CRÉATIVITÉ BIBLIQUE MAXIMALE :
- Explorez différents aspects du thème (historique, prophétique, typologique)
- Variez les types de questions (qui, quoi, où, quand, pourquoi, comment)
- Utilisez des angles d'approche originaux et enrichissants
- Évitez les formulations banales ou répétitives
- Questions stimulantes testant la vraie connaissance biblique

⚡ GÉNÉREZ MAINTENANT ${questionCount} QUESTIONS BIBLIQUES PARFAITES :
Thème : "${selectedContext.title}"
Niveau : ${selectedDifficulty.level}
Seed unique : ${ultraUniqueSeed}

RÉPONDEZ UNIQUEMENT AVEC LE TABLEAU JSON - RIEN D'AUTRE !`;
}
