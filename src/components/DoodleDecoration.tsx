const DoodleDecorations = () => {
  return (
    <>
      <svg
        className="absolute left-8 top-16 h-16 w-16 animate-wiggle text-doodle-line opacity-60 md:left-16 md:h-24 md:w-24"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M50 5 L58 38 L95 38 L65 58 L75 95 L50 72 L25 95 L35 58 L5 38 L42 38 Z" />
      </svg>

      {/* Top right doodle - spiral */}
      <svg
        className="absolute right-8 top-20 h-14 w-14 animate-float text-doodle-line opacity-50 md:right-20 md:h-20 md:w-20"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M50 50 Q60 40 70 50 Q80 60 70 70 Q60 80 50 70 Q40 60 50 50 Q55 45 60 50 Q65 55 60 60 Q55 65 50 60 Q45 55 50 50" />
      </svg>

      {/* Bottom left doodle - cube blocks */}
      <svg
        className="absolute bottom-20 left-12 h-20 w-20 animate-bounce text-doodle-line opacity-40 md:left-24 md:h-28 md:w-28"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* First block */}
        <rect x="10" y="50" width="30" height="30" />
        <line x1="10" y1="50" x2="25" y2="35" />
        <line x1="40" y1="50" x2="55" y2="35" />
        <line x1="25" y1="35" x2="55" y2="35" />
        <line x1="55" y1="35" x2="55" y2="65" />
        
        {/* Second block stacked */}
        <rect x="45" y="40" width="25" height="25" />
        <line x1="45" y1="40" x2="57" y2="28" />
        <line x1="70" y1="40" x2="82" y2="28" />
        <line x1="57" y1="28" x2="82" y2="28" />
        <line x1="82" y1="28" x2="82" y2="53" />
      </svg>

      <svg
        className="absolute bottom-24 right-8 h-16 w-16 animate-wiggle text-doodle-line opacity-50 md:right-16 md:h-24 md:w-24"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animationDelay: "1s" }}
      >
        <circle cx="35" cy="35" r="20" />
        <circle cx="65" cy="35" r="20" />
        <circle cx="35" cy="65" r="20" />
        <circle cx="65" cy="65" r="20" />
        <path d="M35 55 L35 45 M45 35 L55 35 M65 45 L65 55 M55 65 L45 65" />
      </svg>

      {/* Floating dots */}
      <div className="absolute left-1/4 top-1/3 h-3 w-3 animate-float rounded-full bg-doodle-line opacity-30" style={{ animationDelay: "0.5s" }} />
      <div className="absolute right-1/3 top-1/4 h-2 w-2 animate-float rounded-full bg-doodle-line opacity-40" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 h-4 w-4 animate-bounce rounded-full bg-doodle-line opacity-20" style={{ animationDelay: "1.5s" }} />

      {/* Scribble lines */}
      <svg
        className="absolute left-1/2 top-8 h-8 w-32 -translate-x-1/2 text-doodle-line opacity-30"
        viewBox="0 0 150 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M0 15 Q20 5 40 15 T80 15 T120 15 T150 15" />
      </svg>
    </>
  );
};

export default DoodleDecorations;
