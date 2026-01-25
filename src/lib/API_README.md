# Game Architecture & Implementation Guide

This document outlines the architecture of the MemoBlock game, specifically focusing on the **API Layer** and the **Game Logic/Context Layer** (State Management).

## 1. API Layer (`src/lib/game-api.ts`)

The API layer mimics a backend service. It is responsible for pure data generation and verification, completely decoupled from the UI state.

### Core Methods

*   **`generateGrid(n, density)`**:
    *   Creates a 2D boolean matrix (`boolean[][]`) representing the grid.
    *   `n` determines the dimensions (rows and columns).
    *   Returns `{ grid, totalSpots }`.
*   **`checkGuess(actual, guess)`**:
    *   Verifies if the user's input matches the hidden spot count.
    *   Returns `boolean`.

---

## 2. Game Context & State Management (`src/hooks/use-game.tsx`)

The application state is managed by the `useGame` hook. This hook acts as the **Controller** or **ViewModel**, encapsulating the game's business logic, state transitions, and lifecycle.

Although implemented as a custom hook, it serves as the **Game Context**, providing data and actions to the View layer (`GameView.tsx`).

### Game State Structure

The `GameState` interface defines the "Source of Truth" for the UI:

```typescript
interface GameState {
  grid: boolean[][] | null; // The current board
  status: GameStatus;       // Current phase of the game
  message: string;          // Feedback text for the user
  gridSize: number;         // Current grid dimensions (e.g., 3 for 3x3)
  health: number;           // Remaining lives (Starts at 3)
  level: number;            // Current level (determines difficulty)
  score: number;            // Player score
}
```

### State Machine (Game Lifecycle)

The game flows through specific states defined in `status`.

1.  **`idle`**: Initial state. Waiting for user to start.
2.  **`loading`**: Fetching new grid from API.
3.  **`memorize`**: Grid is visible. **Lasts 3 seconds** (managed by `useEffect`).
4.  **`guessing`**: Grid is hidden. User input is enabled.
5.  **`won_round`**: User guessed correctly. Ready to proceed to next level.
6.  **`lost_round`**: User guessed wrong. Health decreases. Retry same level.
7.  **`game_over`**: Health reached 0. Game ends.

### Key Logic & Transitions

*   **Progressive Difficulty**:
    *   Grid size is calculated dynamically: `Size = 3 + (Level - 1)`.
    *   Level 1 = 3x3, Level 2 = 4x4, etc.
*   **Memorization Timer**:
    *   When status enters `memorize`, a 3-second timer starts.
    *   On timeout, status automatically transitions to `guessing`.
*   **Health System**:
    *   Starts at 3.
    *   Wrong guess = -1 Health.
    *   0 Health = `game_over`.

### Usage in Components

The View layer (`GameView.tsx`) consumes this context to render the UI.

```tsx
// 1. Initialize the Game Context/Hook
const { gameState, startRound, submitGuess } = useGame();

// 2. React to State
// e.g., Show grid spots only during 'memorize' phase or end game
const showSpots = gameState.status === 'memorize' || gameState.status === 'game_over';

// 3. Trigger Actions
<button onClick={startRound}>Start Game</button>
<DoodleInput onSubmit={submitGuess} />
```

## 3. Data Flow Summary

1.  **User Action** (Click Start) -> `startRound()`
2.  **Hook**: Sets `loading` -> Calls `API.generateGrid()`
3.  **API**: Returns 2D Grid Data.
4.  **Hook**: Updates State -> `memorize` (Grid Visible).
5.  **Hook (Effect)**: Waits 3s -> Updates State -> `guessing` (Grid Hidden).
6.  **User Action** (Input Guess) -> `submitGuess()`
7.  **Hook**: Calls `API.checkGuess()` -> Updates State (`won`/`lost`/`game_over`).
8.  **View**: Re-renders to show feedback.
