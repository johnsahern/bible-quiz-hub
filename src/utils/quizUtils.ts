
export const getBadge = (correct: number, total: number): string => {
  const percentage = correct / total * 100;
  if (percentage === 100) return 'Parfait Disciple';
  if (percentage >= 80) return 'Fidèle Serviteur';
  if (percentage >= 60) return 'Bon Étudiant';
  if (percentage >= 40) return 'Apprenti';
  return 'Débutant';
};
