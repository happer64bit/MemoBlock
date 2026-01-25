import GameHeader from "@/components/game/GameHeader";
import GameGrid from "@/components/game/GameGrid";
import PlayerPanel from "@/components/game/PlayerPanel";

const GameView = () => {
  // Mock game state
  const mockState = {
    phase: "remember" as const,
    currentNumber: 1,
    highlightedCell: { row: 2, col: 3 },
    players: [
      {
        username: "user1",
        blocks: [{ value: 1, isActive: false }, { value: 1, isActive: false }],
        upcomingScore: 2,
        totalScore: 24,
        isCurrentPlayer: true,
      },
      {
        username: "user2",
        blocks: [{ value: 1, isActive: false }, { value: 1, isActive: false }],
        upcomingScore: 2,
        totalScore: 24,
        isCurrentPlayer: false,
      },
    ],
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background paper-bg">
      {/* Header with close button and phase info */}
      <GameHeader phase={mockState.phase} currentNumber={mockState.currentNumber} />

      {/* Main game area */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <GameGrid 
          rows={6} 
          cols={6} 
          highlightedCell={mockState.highlightedCell}
        />
      </div>

      {/* Bottom player panels */}
      <div className="flex items-end justify-between px-4 pb-8 md:px-8 lg:px-16">
        {/* Left player */}
        <PlayerPanel
          username={mockState.players[0].username}
          blocks={mockState.players[0].blocks}
          upcomingScore={mockState.players[0].upcomingScore}
          totalScore={mockState.players[0].totalScore}
          isLeft={true}
          isCurrentPlayer={mockState.players[0].isCurrentPlayer}
        />

        {/* Right player */}
        <PlayerPanel
          username={mockState.players[1].username}
          blocks={mockState.players[1].blocks}
          upcomingScore={mockState.players[1].upcomingScore}
          totalScore={mockState.players[1].totalScore}
          isLeft={false}
          isCurrentPlayer={mockState.players[1].isCurrentPlayer}
        />
      </div>
    </div>
  );
};

export default GameView;
