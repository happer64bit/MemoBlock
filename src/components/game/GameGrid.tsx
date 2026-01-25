import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface GameGridProps {
  rows?: number;
  cols?: number;
  highlightedCells?: boolean[][];
  grid?: boolean[][] | null;
  showSpots?: boolean;
}

const GameGrid = ({ 
  rows = 3, 
  cols = 3, 
  highlightedCells = undefined,
  grid = null,
  showSpots = false
}: GameGridProps) => {
  // Use grid dimensions if grid is provided, otherwise fallback to props
  const effectiveRows = grid ? grid.length : rows;
  const effectiveCols = grid && grid[0] ? grid[0].length : cols;

  // Calculate cell size class based on grid density to keep it responsive
  // For larger grids, we want smaller cells
  const cellSizeClass = useMemo(() => {
    const maxDim = Math.max(effectiveRows, effectiveCols);
    if (maxDim > 8) return "h-8 w-8 md:h-10 md:w-10";
    if (maxDim > 6) return "h-10 w-10 md:h-12 md:w-12";
    return "h-12 w-12 md:h-16 md:w-16";
  }, [effectiveRows, effectiveCols]);

  return (
    <div 
      className="relative mx-auto transition-all duration-500 ease-in-out"
      style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 40%",
      }}
    >
      {/* 3D Grid container */}
      <div
        className="grid gap-1 border-2 border-doodle-line bg-card p-1"
        style={{
          gridTemplateColumns: `repeat(${effectiveCols}, min-content)`,
          transform: "rotateX(10deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
          borderRadius: "8px",
          boxShadow: "0 10px 0 hsl(var(--doodle-line) / 0.2)",
        }}
      >
        {Array.from({ length: effectiveRows * effectiveCols }).map((_, index) => {
          const row = Math.floor(index / effectiveCols);
          const col = index % effectiveCols;
          
          // Check if this cell is highlighted using the matrix
          const isHighlighted = highlightedCells && highlightedCells[row] && highlightedCells[row][col];
          
          // Check if this cell has a spot (if grid is provided)
          const hasSpot = grid && grid[row] && grid[row][col];
          const shouldShowSpot = hasSpot && showSpots;

          return (
            <div
              key={index}
              className={cn(
                "relative flex items-center justify-center border-2 border-doodle-line/20 rounded-md bg-background",
                "transition-all duration-300",
                cellSizeClass,
                isHighlighted && "border-primary bg-primary",
                "hover:border-doodle-line/60"
              )}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {shouldShowSpot && (
                 <div className="absolute inset-2 rounded-full bg-primary animate-in zoom-in duration-300 shadow-sm" />
              )}
            </div>
          );
        })}
      </div>

      {/* 3D shadow effect base */}
      <div
        className="absolute inset-0 -z-10 bg-doodle-line/5 rounded-lg"
        style={{
          transform: "rotateX(10deg) translateZ(-10px) translateY(10px)",
        }}
      />
    </div>
  );
};

export default GameGrid;
