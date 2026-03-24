import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { propertyInfo } from '../data/propertyData';

function AbivyaIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8"  width="16" height="44" fill="#1E3A5F" rx="1" />
      <rect x="4" y="12" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="9" y="12" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="4" y="20" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="9" y="20" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="4" y="28" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="9" y="28" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="20" y="0" width="20" height="52" fill="#1A4F8A" rx="1" />
      <rect x="23" y="4"  width="4" height="5"  fill="#7EC8E3" />
      <rect x="31" y="4"  width="4" height="5"  fill="#7EC8E3" />
      <rect x="23" y="14" width="4" height="5"  fill="#7EC8E3" />
      <rect x="31" y="14" width="4" height="5"  fill="#7EC8E3" />
      <rect x="23" y="24" width="4" height="5"  fill="#7EC8E3" />
      <rect x="31" y="24" width="4" height="5"  fill="#7EC8E3" />
      <rect x="23" y="34" width="4" height="5"  fill="#7EC8E3" />
      <rect x="31" y="34" width="4" height="5"  fill="#7EC8E3" />
      <rect x="42" y="14" width="16" height="38" fill="#1E3A5F" rx="1" />
      <rect x="44" y="18" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="50" y="18" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="44" y="26" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="50" y="26" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="44" y="34" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="50" y="34" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
    </svg>
  );
}

function NcIcon({ size = 26 }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="25,1 6,14 44,14" fill="#00B4C8" />
      <rect x="4"  y="16" width="5" height="22" fill="#F47920" rx="0.5" />
      <polygon points="4,16 9,16 20,32 20,38 15,38 4,22" fill="#F47920" />
      <rect x="15" y="16" width="5" height="22" fill="#F47920" rx="0.5" />
      <path d="M41,19 C33,16 26,20 26,28 C26,36 33,40 41,37"
        stroke="#1A2B6B" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const NAV_LINKS = [
  { to: '/',            label: 'Home' },
  { to: '/projects',  label: 'Project' },
  { to: '/layout-plan', label: 'Layout Plan' },
  { to: '/gallery',     label: 'Gallery' },
  { to: '/location',    label: 'Location' },
  { to: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const { clientUser, clientLogout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => { clientLogout(); navigate('/'); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d1a]/97 backdrop-blur-md border-b border-white/10">

      {/* ── Announcement strip ── */}
      <div className="bg-orange-500 text-center text-xs font-semibold text-white tracking-wide">
        {/* Mobile: two rows */}
        <div className="sm:hidden px-4 py-1.5 flex flex-col items-center gap-0.5">
          <span>✅ Spot Registration Available &nbsp;·&nbsp; 🏦 Bank Loan Available</span>
          <a
            href={propertyInfo.rera.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-black underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            🏛️ RERA Regd. No: {propertyInfo.rera.registrationNo}
          </a>
        </div>
        {/* Desktop: single row */}
        <div className="hidden sm:flex items-center justify-center gap-3 py-2">
          <span>✅ Spot Registration Available</span>
          <span className="opacity-50">|</span>
          <span>🏦 Bank Loan Available</span>
          <span className="opacity-50">|</span>
          <a
            href={propertyInfo.rera.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-black underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            🏛️ RERA Regd. No: {propertyInfo.rera.registrationNo}
          </a>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 h-[68px] flex items-center justify-between gap-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 min-w-0">
          <AbivyaIcon size={32} />
          <div className="leading-[1.15]">
            <p className="text-white font-black text-[14px] tracking-[3px]">ABIVYA</p>
            <p className="text-orange-400 font-bold text-[10px] tracking-[5px]">GROUP</p>
          </div>
          <div className="w-px h-8 bg-white/15 mx-2 hidden sm:block" />
          <NcIcon size={28} className="hidden sm:block" />
          <div className="leading-[1.15] hidden sm:block">
            <p className="text-white font-black text-[14px] tracking-wide">
              NIMZ <span className="text-orange-400">CITY</span>
            </p>
            <p className="text-gray-500 text-[9px] tracking-widest">KOHIR, SANGAREDDY</p>
          </div>
        </Link>

        {/* Desktop nav — visible from xl (1280px) */}
        <div className="hidden xl:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link text-[13.5px] font-medium tracking-wide transition-all duration-200 whitespace-nowrap py-1
                ${isActive(link.to)
                  ? 'text-orange-400 active'
                  : 'text-gray-300 hover:text-orange-400'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden xl:flex items-center gap-4 flex-shrink-0">
          {clientUser ? (
            <>
              <Link to="/my-inquiries"
                className="text-[13px] text-gray-300 hover:text-orange-400 transition-colors">
                Hi, {clientUser.name.split(' ')[0]}
              </Link>
              <button onClick={handleLogout}
                className="text-[11px] text-gray-500 hover:text-red-400 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link to="/client-login"
              className="text-[13px] text-gray-400 hover:text-orange-400 transition-colors font-medium">
              My Inquiries
            </Link>
          )}
          <Link to="/contact"
            className="btn-gold px-5 py-2 text-[11px] rounded-lg font-bold tracking-widest uppercase whitespace-nowrap">
            Book Site Visit
          </Link>
        </div>

        {/* Tablet nav — lg to xl */}
        <div className="hidden lg:flex xl:hidden items-center gap-5 flex-1 justify-center">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link text-[13px] font-medium tracking-wide transition-all duration-200 whitespace-nowrap py-1
                ${isActive(link.to)
                  ? 'text-orange-400 active'
                  : 'text-gray-300 hover:text-orange-400'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link to="/contact"
          className="hidden lg:flex xl:hidden btn-gold px-5 py-2.5 text-[12px] rounded-lg font-bold tracking-widest uppercase whitespace-nowrap flex-shrink-0">
          Book Visit
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-gray-300 hover:text-white transition-colors p-1 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0d0d1a] border-t border-white/10">
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`py-3 px-4 rounded-xl text-sm font-medium border-b border-white/5 last:border-0 transition-colors
                  ${isActive(link.to) ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'}`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 flex flex-col gap-2">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-gold text-center py-3 rounded-xl text-xs font-bold tracking-widest uppercase"
              >
                Book a Free Site Visit
              </Link>
              {clientUser ? (
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-sm text-red-400 text-left py-2 px-4"
                >
                  Logout ({clientUser.name})
                </button>
              ) : (
                <Link
                  to="/client-login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-400 hover:text-orange-400 py-2 px-4 transition-colors"
                >
                  My Inquiries →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
