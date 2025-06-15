
export function generateUniqueSeed(theme: string, difficulty: string, questionCount: number): number {
  const timestamp = Date.now();
  const microseconds = Math.floor(performance.now() * 1000000); // Plus de précision
  const themeHash = theme.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const difficultyHash = difficulty.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomComponent = Math.floor(Math.random() * 10000000); // Composant aléatoire plus grand
  
  // Créer un seed ULTRA-unique basé sur plusieurs facteurs temporels et aléatoires
  const ultraUniqueSeed = Math.abs(Math.floor(
    (timestamp * 1000000 + microseconds) * 13 + 
    themeHash * 17000 + 
    difficultyHash * 11000 + 
    questionCount * 7000 + 
    randomComponent * 3
  ));
  
  console.log(`🎲 Generated ULTRA-UNIQUE seed: ${ultraUniqueSeed} for theme: ${theme}, difficulty: ${difficulty}, timestamp: ${timestamp}, microseconds: ${microseconds}`);
  return ultraUniqueSeed;
}
