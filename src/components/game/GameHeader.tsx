import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

interface GameHeaderProps {
  phase: "remember" | "guess";
  currentNumber?: number;
}

const GameHeader = ({ phase, currentNumber }: GameHeaderProps) => {
  return (
    <div className="relative flex w-full items-center justify-center py-4">
      {/* Close button */}
      <Link
        href="/"
        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-doodle-line bg-card transition-all hover:bg-secondary active:translate-y-0.5"
        style={{ borderRadius: "8px 4px 10px 6px" }}
      >
        <X className="h-5 w-5" />
      </Link>

      {/* Phase title */}
      <div className="text-center">
        <h1 className="font-display text-3xl tracking-wide text-foreground md:text-4xl">
          {phase === "remember" ? "Please Remember" : "Your Turn!"}
        </h1>
        {currentNumber !== undefined && (
          <p className="mt-2 font-display text-5xl text-foreground md:text-6xl">
            {currentNumber}
          </p>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
