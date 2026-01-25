
export interface GameGridData {
  grid: boolean[][];
  totalSpots: number;
}

export const gameApi = {
  /**
   * Generates a random n x n grid with spots.
   * @param n Size of the grid (n x n)
   * @param density Probability of a spot appearing in a cell (0-1)
   */
  generateGrid: async (n: number, density: number = 0.3): Promise<GameGridData> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const grid: boolean[][] = [];
    let totalSpots = 0;

    for (let i = 0; i < n; i++) {
      const row: boolean[] = [];
      for (let j = 0; j < n; j++) {
        const hasSpot = Math.random() < density;
        if (hasSpot) totalSpots++;
        row.push(hasSpot);
      }
      grid.push(row);
    }

    return { grid, totalSpots };
  },

  /**
   * Verifies the user's guess.
   * @param actual The actual number of spots
   * @param guess The user's guessed number
   */
  checkGuess: async (actual: number, guess: number): Promise<boolean> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return actual === guess;
  }
};
