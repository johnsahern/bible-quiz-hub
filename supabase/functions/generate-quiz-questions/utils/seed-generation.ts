
export function generateUniqueSeed(theme: string, difficulty: string, questionCount: number): number {
  const timestamp = Date.now();
  const microseconds = performance.now() * 1000; // Ajouter les microsecondes
  const themeHash = theme.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const difficultyHash = difficulty.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomComponent = Math.floor(Math.random() * 1000000); // Composant aléatoire
  
  // Créer un seed ULTRA-unique basé sur plusieurs facteurs temporels et aléatoires
  const ultraUniqueSeed = Math.floor(
    (timestamp + microseconds) * 1000 + 
    themeHash * 10000 + 
    difficultyHash * 1000 + 
    questionCount * 100 + 
    randomComponent
  );
  
  console.log(`🎲 Generated ULTRA-UNIQUE seed: ${ultraUniqueSeed} for theme: ${theme}, difficulty: ${difficulty}, timestamp: ${timestamp}, microseconds: ${microseconds}`);
  return ultraUniqueSeed;
}
