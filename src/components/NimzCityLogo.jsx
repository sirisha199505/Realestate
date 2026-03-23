// NIMZ CITY Logo — matches the PDF flyer logo exactly
export default function NimzCityLogo({ size = 100, showTagline = true, className = '' }) {
  const scale = size / 100;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* NC Icon — house roof + letters */}
      <div className="relative" style={{ width: size * 0.9 + 'px', height: size * 0.75 + 'px' }}>
        <svg
          viewBox="0 0 90 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width={size * 0.9}
          height={size * 0.75}
        >
          {/* Roof / House shape (teal/cyan) */}
          <polygon
            points="45,2 12,26 78,26"
            fill="#00B4C8"
            opacity="0.95"
          />
          {/* Small windows on roof */}
          <rect x="38" y="10" width="5" height="4" fill="white" opacity="0.6" rx="0.5" />
          <rect x="48" y="10" width="5" height="4" fill="white" opacity="0.6" rx="0.5" />

          {/* N letter — Orange */}
          <g>
            {/* N left vertical */}
            <rect x="10" y="28" width="9" height="38" fill="#F47920" rx="1" />
            {/* N diagonal */}
            <polygon points="10,28 19,28 41,58 41,66 32,66 10,36" fill="#F47920" />
            {/* N right vertical */}
            <rect x="32" y="28" width="9" height="38" fill="#F47920" rx="1" />
          </g>

          {/* C letter — Dark Blue */}
          <g>
            {/* C outer arc */}
            <path
              d="M75,32 C62,28 50,33 50,46 C50,59 62,64 75,60"
              stroke="#1A2B6B"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            {/* C cutout right */}
            <rect x="65" y="30" width="14" height="10" fill="#0d0d1a" />
            <rect x="65" y="52" width="14" height="10" fill="#0d0d1a" />
          </g>
        </svg>
      </div>

      {/* NIMZ CITY text */}
      <div className="text-center leading-none" style={{ marginTop: scale * 4 + 'px' }}>
        <p
          className="font-black text-white leading-none"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: size * 0.32 + 'px',
            letterSpacing: size * 0.025 + 'px',
            color: '#1A2B6B',
            WebkitTextStroke: size > 60 ? '0.5px #1A2B6B' : '0',
          }}
        >
          <span style={{ color: '#1A2B6B' }}>NIMZ </span>
          <span style={{ color: '#1A2B6B' }}>CITY</span>
        </p>
        {showTagline && (
          <div className="flex items-center justify-end gap-1 mt-1">
            <div style={{ width: size * 0.3 + 'px', height: '1.5px', background: '#1A2B6B', opacity: 0.5 }} />
            <p
              className="font-bold"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: size * 0.1 + 'px',
                color: '#1A2B6B',
                letterSpacing: '1px',
              }}
            >
              KOHIR, SANGAREDDY.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
