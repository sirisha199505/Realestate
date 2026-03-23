// ABIVYA GROUP Logo — matches the PDF logo style
export default function AbivyaLogo({ size = 48, className = '' }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Building SVG Icon — matches PDF */}
      <svg width={size} height={size * 0.85} viewBox="0 0 60 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left tall building */}
        <rect x="2" y="8" width="16" height="44" fill="#1E3A5F" rx="1" />
        <rect x="4" y="12" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="9" y="12" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="4" y="20" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="9" y="20" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="4" y="28" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="9" y="28" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="4" y="36" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="9" y="36" width="3" height="4" fill="#5B9BD5" opacity="0.8" />

        {/* Middle building (tallest) */}
        <rect x="20" y="0" width="20" height="52" fill="#1A4F8A" rx="1" />
        <rect x="23" y="4" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="31" y="4" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="23" y="14" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="31" y="14" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="23" y="24" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="31" y="24" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="23" y="34" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="31" y="34" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="23" y="44" width="4" height="5" fill="#7EC8E3" opacity="0.9" />
        <rect x="31" y="44" width="4" height="5" fill="#7EC8E3" opacity="0.9" />

        {/* Right building */}
        <rect x="42" y="14" width="16" height="38" fill="#1E3A5F" rx="1" />
        <rect x="44" y="18" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="50" y="18" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="44" y="26" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="50" y="26" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="44" y="34" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="50" y="34" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="44" y="42" width="3" height="4" fill="#5B9BD5" opacity="0.8" />
        <rect x="50" y="42" width="3" height="4" fill="#5B9BD5" opacity="0.8" />

        {/* Ground line */}
        <rect x="0" y="50" width="60" height="2" fill="#0F2D52" />
      </svg>

      {/* Text */}
      <div className="text-center leading-none mt-1">
        <p
          className="font-black tracking-[3px] text-white leading-none"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: size * 0.26 + 'px',
            letterSpacing: '3px',
          }}
        >
          ABIVYA
        </p>
        <p
          className="font-bold tracking-[3px] text-orange-400"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: size * 0.18 + 'px',
            letterSpacing: '4px',
          }}
        >
          GROUP
        </p>
      </div>
    </div>
  );
}
