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
  memorizeDuration: number;
  highScore: number;
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
    memorizeDuration: 3000,
    highScore: 0,
  });
  
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  // Initialize high score from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('memoblock_highscore');
      if (saved) {
        setGameState(prev => ({ ...prev, highScore: parseInt(saved, 10) }));
      }
    }
  }, []);

  // Update high score in local storage when it changes
  useEffect(() => {
    if (gameState.highScore > 0) {
      localStorage.setItem('memoblock_highscore', gameState.highScore.toString());
    }
  }, [gameState.highScore]);

  // Helper to determine grid size based on level
  // Level 1 -> 3x3, Level 2 -> 4x4, etc.
  const getGridSize = (level: number) => 3 + (level - 1);

  // Helper to determine memorization duration based on level
  // Level 1: 3s, Level 2: 4s, etc.
  const getMemorizeDuration = (level: number) => (3 + (level - 1)) * 1000;

  // Effect to handle the transition from memorize to guessing
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (gameState.status === 'memorize') {
      const duration = getMemorizeDuration(gameState.level);
      timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          status: 'guessing',
          message: 'Time is up! How many spots were there?',
        }));
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gameState.status, gameState.level]);

  const startRound = useCallback(async () => {
    if (gameState.status === 'loading') return;

    let currentLevel = gameState.level;
    let currentHealth = gameState.health;
    let currentScore = gameState.score;
    let currentHighScore = gameState.highScore;

    if (gameState.status === 'game_over') {
      currentLevel = 1;
      currentHealth = 3;
      currentScore = 0;
    } else if (gameState.status === 'won_round') {
      currentLevel += 1;
    }

    const size = getGridSize(currentLevel);
    const duration = getMemorizeDuration(currentLevel);

    setGameState(prev => ({ 
      ...prev, 
      status: 'loading', 
      message: 'Generating grid...',
      grid: null,
      level: currentLevel,
      health: currentHealth,
      score: currentScore,
      highScore: currentHighScore,
      gridSize: size,
      memorizeDuration: duration,
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
        memorizeDuration: duration,
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
        setGameState(prev => {
          const newScore = prev.score + (prev.level * 10);
          const newHighScore = newScore > prev.highScore ? newScore : prev.highScore;
          return {
            ...prev,
            status: 'won_round',
            message: 'Correct! Next level...',
            score: newScore,
            highScore: newHighScore,
          };
        });
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
      memorizeDuration: 3000,
      highScore: gameState.highScore,
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
