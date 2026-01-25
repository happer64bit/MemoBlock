import { useState, useCallback, useEffect } from 'react';
import { gameApi } from '@/lib/game-api';

export interface GameState {
  grid: boolean[][] | null;
  status: 'idle' | 'loading' | 'memorize' | 'guessing' | 'won_round' | 'lost_round' | 'game_over';
  message: string;
  gridSize: number;
  health: number;
  level: number;
  score: number;
}

interface UseGameReturn {
  gameState: GameState;
  startRound: () => Promise<void>;
  submitGuess: (guess: number) => Promise<void>;
  resetGame: () => void;
}

export const useGame = (): UseGameReturn => {
  const [gameState, setGameState] = useState<GameState>({
    grid: null,
    status: 'idle',
    message: 'Press start to play',
    gridSize: 0,
    health: 3,
    level: 1,
    score: 0,
  });
  
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  // Helper to determine grid size based on level
  // Level 1 -> 3x3, Level 2 -> 4x4, etc.
  const getGridSize = (level: number) => 3 + (level - 1);

  // Effect to handle the transition from memorize to guessing
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (gameState.status === 'memorize') {
      timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          status: 'guessing',
          message: 'Time is up! How many spots were there?',
        }));
      }, 3000); // 3 seconds to memorize
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gameState.status]);

  const startRound = useCallback(async () => {
    let currentLevel = gameState.level;
    let currentHealth = gameState.health;
    let currentScore = gameState.score;

    if (gameState.status === 'game_over') {
      currentLevel = 1;
      currentHealth = 3;
      currentScore = 0;
    } else if (gameState.status === 'won_round') {
        currentLevel += 1;
    }

    const size = getGridSize(currentLevel);

    setGameState(prev => ({ 
      ...prev, 
      status: 'loading', 
      message: 'Generating grid...',
      grid: null,
      level: currentLevel,
      health: currentHealth,
      score: currentScore,
      gridSize: size,
    }));
    
    try {
      const data = await gameApi.generateGrid(size, 0.3);
      setCorrectAnswer(data.totalSpots);
      setGameState(prev => ({
        ...prev,
        grid: data.grid,
        status: 'memorize', // Start with memorize phase
        message: 'Memorize the spots!',
        gridSize: size,
      }));
    } catch (error) {
      console.error("Failed to start game:", error);
      setGameState(prev => ({ 
        ...prev, 
        status: 'idle', 
        message: 'Error starting game. Please try again.' 
      }));
    }
  }, [gameState.level, gameState.health, gameState.score, gameState.status]);

  const submitGuess = useCallback(async (guess: number) => {
    // Only allow guessing in the guessing phase
    if (gameState.status !== 'guessing' || correctAnswer === null) return;
    
    try {
      const isCorrect = await gameApi.checkGuess(correctAnswer, guess);
      
      if (isCorrect) {
        setGameState(prev => ({
          ...prev,
          status: 'won_round',
          message: 'Correct! Next level...',
          score: prev.score + (prev.level * 10),
        }));
      } else {
        const newHealth = gameState.health - 1;
        const isGameOver = newHealth <= 0;
        
        setGameState(prev => ({
          ...prev,
          status: isGameOver ? 'game_over' : 'lost_round',
          health: newHealth,
          message: isGameOver 
            ? `Game Over! The answer was ${correctAnswer}.` 
            : `Wrong! The answer was ${correctAnswer}. Try again.`,
        }));
      }
    } catch (error) {
      console.error("Failed to check guess:", error);
    }
  }, [gameState.status, gameState.health, correctAnswer]);

  const resetGame = useCallback(() => {
    setGameState({
      grid: null,
      status: 'idle',
      message: 'Press start to play',
      gridSize: 0,
      health: 3,
      level: 1,
      score: 0,
    });
    setCorrectAnswer(null);
  }, []);

  return {
    gameState,
    startRound,
    submitGuess,
    resetGame,
  };
};
