import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoodleButton from "@/components/DoodleButton";
import DoodleInput from "@/components/DoodleInput";
// import DoodleDecorations from "@/components/DoodleDecorations";
import BlockLogo from "@/components/BlockLogo";
import DoodleDecorations from "@/components/DoodleDecoration";

const Index = () => {
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();

  const handleCreateGame = () => {
    navigate("/game");
  };

  const handleJoinGame = () => {
    if (gameCode.trim()) {
      navigate("/game");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background paper-bg">
      <DoodleDecorations />
      
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo and Title */}
        <div className="mb-12 flex flex-col items-center animate-float" style={{ animationDuration: "6s" }}>
          <BlockLogo />
          <h1 className="mt-4 font-display text-5xl tracking-wide text-foreground md:text-7xl sketch-underline">
            MemoBlock
          </h1>
          <p className="mt-6 font-body text-xl text-muted-foreground md:text-2xl">
            Test your memory. Challenge your friends!
          </p>
        </div>

        {/* Game Actions Card */}
        <div className="w-full max-w-md space-y-8">
          {/* Create Game Section */}
          <div className="flex flex-col items-center">
            <DoodleButton
              variant="primary"
              size="lg"
              onClick={handleCreateGame}
              className="w-full max-w-xs"
            >
              ✏️ Create Game
            </DoodleButton>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-0.5 flex-1 bg-doodle-line opacity-30" 
                 style={{ 
                   background: "repeating-linear-gradient(90deg, hsl(var(--doodle-line)) 0, hsl(var(--doodle-line)) 8px, transparent 8px, transparent 12px)" 
                 }} 
            />
            <span className="font-display text-lg text-muted-foreground">or</span>
            <div className="h-0.5 flex-1 bg-doodle-line opacity-30"
                 style={{ 
                   background: "repeating-linear-gradient(90deg, hsl(var(--doodle-line)) 0, hsl(var(--doodle-line)) 8px, transparent 8px, transparent 12px)" 
                 }} 
            />
          </div>

          {/* Join Game Section */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="font-display text-xl text-foreground">Join a Game</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <DoodleInput
                type="text"
                placeholder="Enter game code..."
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="flex-1 text-center uppercase tracking-widest"
              />
              <DoodleButton
                variant="secondary"
                onClick={handleJoinGame}
                disabled={!gameCode.trim()}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join →
              </DoodleButton>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <p className="mt-16 font-body text-sm text-muted-foreground opacity-60">
          🎮 Match blocks. Beat the clock. Have fun!
        </p>
      </main>
    </div>
  );
};

export default Index;
