
export function generateUniqueSeed(theme: string, difficulty: string, questionCount: number): number {
  const timestamp = Date.now();
  const themeHash = theme.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const difficultyHash = difficulty.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Créer un seed vraiment unique basé sur plusieurs facteurs
  const uniqueSeed = Math.floor(timestamp / 1000) + themeHash * 1000 + difficultyHash * 100 + questionCount * 10;
  
  console.log(`🎲 Generated unique seed: ${uniqueSeed} for theme: ${theme}, difficulty: ${difficulty}`);
  return uniqueSeed;
}
