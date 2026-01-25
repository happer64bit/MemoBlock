interface PlayerBlock {
  value: number;
  isActive?: boolean;
}

interface PlayerPanelProps {
  username: string;
  blocks: PlayerBlock[];
  upcomingScore: number;
  totalScore: number;
  isLeft?: boolean;
  isCurrentPlayer?: boolean;
}

const PlayerPanel = ({
  username,
  blocks,
  upcomingScore,
  totalScore,
  isLeft = true,
  isCurrentPlayer = false,
}: PlayerPanelProps) => {
  return (
    <div
      className={`flex items-center gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Player blocks */}
      <div className="flex gap-2">
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`
              flex h-16 w-14 items-center justify-center 
              border-2 border-doodle-line bg-secondary font-display text-2xl
              transition-all duration-200 md:h-20 md:w-16 md:text-3xl
              ${block.isActive ? "scale-105 shadow-lg" : ""}
            `}
            style={{
              borderRadius: "6px 4px 8px 5px",
              boxShadow: "3px 3px 0 hsl(var(--doodle-line) / 0.4)",
            }}
          >
            {block.value}
          </div>
        ))}
      </div>

      {/* Score info */}
      <div className={`flex flex-col ${isLeft ? "items-start" : "items-end"}`}>
        <div className="flex items-center gap-1 font-body text-sm text-muted-foreground">
          <span>Upcoming</span>
          <span className="font-display text-base text-foreground">+{upcomingScore}</span>
        </div>
        <div className="flex items-center gap-1 font-body text-sm text-muted-foreground">
          <span>Score:</span>
        </div>
        <div className="font-body text-sm text-muted-foreground">
          Total Score: <span className="font-display text-lg text-foreground">{totalScore}</span>
        </div>
        <div
          className={`mt-1 font-body text-sm ${isCurrentPlayer ? "text-foreground" : "text-muted-foreground"}`}
        >
          @{username}
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
