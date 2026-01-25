interface GameGridProps {
  rows?: number;
  cols?: number;
  highlightedCell?: { row: number; col: number } | null;
}

const GameGrid = ({ rows = 6, cols = 6, highlightedCell = null }: GameGridProps) => {
  return (
    <div 
      className="relative mx-auto"
      style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 40%",
      }}
    >
      {/* 3D Grid container */}
      <div
        className="grid gap-0 border-2 border-doodle-line bg-card"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          transform: "rotateX(15deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
          borderRadius: "4px 8px 6px 10px",
          boxShadow: "8px 12px 0 hsl(var(--doodle-line) / 0.3)",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const isHighlighted = highlightedCell?.row === row && highlightedCell?.col === col;

          return (
            <div
              key={index}
              className={`
                flex h-12 w-12 items-center justify-center border border-doodle-line/40
                transition-all duration-300 md:h-14 md:w-14 lg:h-16 lg:w-16
                ${isHighlighted ? "bg-primary" : "bg-card hover:bg-secondary/50"}
              `}
              style={{
                transformStyle: "preserve-3d",
              }}
            />
          );
        })}
      </div>

      {/* 3D shadow effect */}
      <div
        className="absolute inset-0 -z-10 bg-doodle-line/10"
        style={{
          transform: "rotateX(15deg) translateZ(-10px) translateY(10px)",
          borderRadius: "4px 8px 6px 10px",
        }}
      />
    </div>
  );
};

export default GameGrid;
