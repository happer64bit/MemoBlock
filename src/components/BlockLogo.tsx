const BlockLogo = () => {
  return (
    <svg
      className="h-16 w-16 md:h-20 md:w-20"
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 3D Block stack */}
      {/* Bottom block */}
      <rect x="10" y="40" width="28" height="28" className="fill-secondary stroke-doodle-line" />
      <polygon points="10,40 22,28 50,28 38,40" className="fill-muted stroke-doodle-line" />
      <polygon points="38,40 50,28 50,56 38,68" className="fill-accent stroke-doodle-line" />
      
      {/* Top block */}
      <rect x="30" y="20" width="24" height="24" className="fill-primary stroke-primary-foreground" />
      <polygon points="30,20 40,10 64,10 54,20" className="fill-secondary stroke-doodle-line" />
      <polygon points="54,20 64,10 64,34 54,44" className="fill-muted stroke-doodle-line" />
      
      {/* Question mark on top block */}
      <text x="38" y="38" className="fill-primary-foreground text-sm font-bold" style={{ fontSize: '14px' }}>?</text>
    </svg>
  );
};

export default BlockLogo;
