import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { allPlots, STATUS } from '../data/layoutData';
import { X, Phone, Mail, User, Send, CheckCircle, MapPin, ArrowRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

// ── Persist plot statuses in localStorage ─────────────────────────────────
function usePlots() {
  const [plots, setPlots] = useState(() => {
    const saved = localStorage.getItem('abivya_plots');
    return saved ? JSON.parse(saved) : allPlots;
  });
  const updatePlot = (id, updates) => {
    setPlots(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      localStorage.setItem('abivya_plots', JSON.stringify(next));
      return next;
    });
  };
  return { plots, updatePlot };
}

// ── Plot Detail Modal ─────────────────────────────────────────────────────
function PlotModal({ plot, onClose, onUpdate, isAdmin }) {
  const { submitLead, clientUser } = useAuth();
  const st = STATUS[plot.status];
  const [form, setForm] = useState({
    name:     clientUser?.name  || '',
    phone:    clientUser?.phone || '',
    email:    clientUser?.email || '',
    message:  '',
  });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const sqYards = Math.round((plot.width * plot.depth) / 9);

  const handleEnquire = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      submitLead({
        ...form,
        plotSize: `${sqYards} Sq Yds`,
        plotId: plot.id,
        plotNo: `${plot.block}-${plot.plotNo}`,
        source: 'layout_plan',
        message: form.message || `Interested in Plot ${plot.block}${plot.plotNo} (${sqYards} Sq Yds, Block ${plot.block})`,
      });
      if (isAdmin) {
        onUpdate(plot.id, { status: 'booked', bookedBy: { ...form, enquiredAt: new Date().toISOString() } });
      }
      setSent(true);
      setLoading(false);
    }, 800);
  };

  const adminStatuses = ['available', 'booked', 'sold'];

  // Trap scroll on modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-[#0d0d1a] border border-orange-500/30 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0a0a14] border-b border-orange-500/20 px-6 py-5 flex items-center justify-between rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400 font-black text-lg">
                {plot.block}{plot.plotNo}
              </span>
            </div>
            <div>
              <p className="text-white font-black text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                Plot {plot.block}{plot.plotNo}
              </p>
              <p className="text-gray-400 text-xs">Block {plot.block} — {plot.facing} Facing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className={`${st.bg} ${st.text} font-black text-sm px-4 py-1.5 rounded-full border ${st.border}`}>
              ● {st.label}
            </span>
            {isAdmin && (
              <div className="flex gap-2">
                {adminStatuses.map(s => (
                  <button
                    key={s}
                    onClick={() => onUpdate(plot.id, { status: s })}
                    className={`text-xs px-3 py-1.5 rounded-full border font-bold transition-all ${
                      plot.status === s
                        ? `${STATUS[s].bg} ${STATUS[s].text} ${STATUS[s].border}`
                        : 'border-gray-700 text-gray-500 hover:border-gray-500'
                    }`}
                  >
                    {STATUS[s].label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plot specs grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Plot No.',    value: `${plot.block}${plot.plotNo}` },
              { label: 'Block',       value: `Block ${plot.block}` },
              { label: 'Dimensions',  value: `${plot.width}' × ${plot.depth}'` },
              { label: 'Area',        value: `≈ ${sqYards} Sq Yds` },
              { label: 'Facing',      value: `${plot.facing} Facing` },
              { label: 'Road Width',  value: "40' / 33' CC Road" },
              { label: 'Approval',    value: 'DTCP Approved' },
              { label: 'RERA No.',    value: 'P01100010688' },
              { label: 'LP No.',      value: '102/2025/H' },
            ].map(row => (
              <div key={row.label} className="bg-[#0a0a14] border border-orange-500/10 rounded-xl px-4 py-3">
                <p className="text-gray-500 text-xs mb-1">{row.label}</p>
                <p className="text-orange-400 font-bold text-sm">{row.value}</p>
              </div>
            ))}
          </div>

          {/* If sold, show sold message */}
          {plot.status === 'sold' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
              <p className="text-red-400 font-bold">This plot has been sold.</p>
              <p className="text-gray-400 text-xs mt-1">Please enquire about other available plots.</p>
            </div>
          )}

          {/* Booked info */}
          {plot.status === 'booked' && plot.bookedBy && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-400 font-bold text-sm mb-2">Booking Details</p>
              <p className="text-gray-300 text-sm">{plot.bookedBy.name}</p>
              <p className="text-gray-400 text-xs">{plot.bookedBy.phone}</p>
            </div>
          )}

          {/* Enquiry form — show if available or booked (waitlist) */}
          {(plot.status === 'available' || plot.status === 'booked') && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-orange-500/20" />
                <p className="text-orange-400 text-xs font-bold tracking-widest uppercase">
                  {plot.status === 'booked' ? 'Join Waitlist' : 'Book This Plot'}
                </p>
                <div className="h-px flex-1 bg-orange-500/20" />
              </div>

              {sent ? (
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
                  <p className="text-white font-bold mb-1">Enquiry Submitted!</p>
                  <p className="text-gray-400 text-sm">
                    Our team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquire} className="space-y-3">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={14} className="text-gray-500" />
                    </span>
                    <input
                      required
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full h-11 bg-[#0a0a14] border border-orange-500/20 rounded-xl pl-9 pr-4 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-500"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={14} className="text-gray-500" />
                    </span>
                    <input
                      required
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full h-11 bg-[#0a0a14] border border-orange-500/20 rounded-xl pl-9 pr-4 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-500"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={14} className="text-gray-500" />
                    </span>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full h-11 bg-[#0a0a14] border border-orange-500/20 rounded-xl pl-9 pr-4 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-500"
                    />
                  </div>
                  <textarea
                    placeholder="Message (optional)"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={2}
                    className="w-full bg-[#0a0a14] border border-orange-500/20 rounded-xl px-4 py-3 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-500 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full py-3 rounded-xl text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading
                      ? <span className="animate-spin text-lg">⟳</span>
                      : <><Send size={15} /> Submit Enquiry</>
                    }
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SVG Layout Map ────────────────────────────────────────────────────────
function LayoutSVG({ plots, onPlotClick }) {
  // Helper: color by status
  const fill  = p => STATUS[p.status].fill;
  const stroke= p => STATUS[p.status].stroke;

  // ── Build SVG plot rects ────────────────────────────────────────────────
  // Each block has anchor + size. Plots placed programmatically.

  const ROAD40  = '#c9a84c';   // gold for 40ft roads
  const ROAD33  = '#b8860b';   // dark gold for 33ft roads
  const HIGHWAY = '#444';
  const BG      = '#0d1a2a';

  // ── Block coordinates (x, y = top-left corner of each plot group)
  // Block A — left diagonal column (2 sub-columns, angled)
  const bA = [];
  // Left sub-column (7 plots top-to-bottom)
  for (let i = 0; i < 7; i++) {
    bA.push({
      plot: plots.find(p => p.id === `A-${i + 1}`),
      x: 20 + i * 12,
      y: 100 + i * 64,
      w: 64,
      h: 56,
    });
  }
  // Right sub-column (7 plots)
  for (let i = 0; i < 7; i++) {
    bA.push({
      plot: plots.find(p => p.id === `A-${i + 8}`),
      x: 102 + i * 10,
      y: 100 + i * 64,
      w: 70,
      h: 56,
    });
  }

  // Block B — top middle horizontal row (12 plots)
  const bB = [];
  for (let i = 0; i < 12; i++) {
    bB.push({
      plot: plots.find(p => p.id === `B-${i + 1}`),
      x: 300 + i * 75,
      y: 78,
      w: 68,
      h: 58,
    });
  }

  // Block C — central grid (10 east + 10 west plots in 2 facing rows)
  const bC = [];
  // East-facing (top row)
  for (let i = 0; i < 10; i++) {
    bC.push({
      plot: plots.find(p => p.id === `C-${i + 1}`),
      x: 300 + i * 80,
      y: 206,
      w: 72,
      h: 60,
    });
  }
  // West-facing (bottom row — face-to-face)
  for (let i = 0; i < 10; i++) {
    bC.push({
      plot: plots.find(p => p.id === `C-${i + 11}`),
      x: 300 + i * 80,
      y: 332,
      w: 72,
      h: 60,
    });
  }

  // Block D — large plots, left side lower section (8 plots vertical)
  const bD = [];
  for (let i = 0; i < 8; i++) {
    bD.push({
      plot: plots.find(p => p.id === `D-${i + 1}`),
      x: 58 + i * 14,
      y: 550 + i * 32,
      w: 110,
      h: 28,
    });
  }

  // Block E — lower right section (2 rows of 9)
  const bE = [];
  // Top row
  for (let i = 0; i < 9; i++) {
    bE.push({
      plot: plots.find(p => p.id === `E-${i + 1}`),
      x: 310 + i * 78,
      y: 500,
      w: 70,
      h: 58,
    });
  }
  // Bottom row
  for (let i = 0; i < 9; i++) {
    bE.push({
      plot: plots.find(p => p.id === `E-${i + 10}`),
      x: 310 + i * 78,
      y: 624,
      w: 70,
      h: 58,
    });
  }

  const allRects = [...bA, ...bB, ...bC, ...bD, ...bE].filter(r => r.plot);

  return (
    <svg
      viewBox="0 0 1210 730"
      className="w-full h-full"
      style={{ background: BG }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Background grid ── */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2a3a" strokeWidth="0.5" />
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="1210" height="730" fill="url(#grid)" />

      {/* ── MUMBAI HIGHWAY ── */}
      <rect x="280" y="0" width="930" height="38" fill={HIGHWAY} rx="2" />
      <text x="700" y="23" textAnchor="middle" fill="#facc15" fontSize="13" fontWeight="bold" letterSpacing="3">
        ← MUMBAI HIGHWAY  (NH 65) →
      </text>

      {/* ── 40ft Roads ── */}
      {/* Horizontal top road */}
      <rect x="0" y="38" width="1210" height="34" fill={ROAD40} opacity="0.85" />
      <text x="605" y="60" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">
        ←————————— Proposed 40 Feet Wide CC Road —————————→
      </text>

      {/* Horizontal middle road (between block B/C and block E) */}
      <rect x="280" y="462" width="930" height="32" fill={ROAD40} opacity="0.85" />
      <text x="745" y="482" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">
        ←————— Proposed 40 Feet Wide CC Road —————→
      </text>

      {/* Horizontal bottom road */}
      <rect x="280" y="688" width="930" height="32" fill={ROAD40} opacity="0.85" />
      <text x="745" y="708" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">
        ←————— Proposed 40 Feet Wide CC Road —————→
      </text>

      {/* Vertical right road */}
      <rect x="1170" y="38" width="32" height="692" fill={ROAD40} opacity="0.75" />
      <text x="1186" y="390" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold"
        transform="rotate(-90, 1186, 390)">
        Proposed 40 Feet Wide Road
      </text>

      {/* ── 33ft Roads ── */}
      {/* Left diagonal road */}
      <line x1="0" y1="38" x2="280" y2="730" stroke={ROAD33} strokeWidth="24" strokeLinecap="round" opacity="0.75" />
      <text x="95" y="400" fill="#000" fontSize="9" fontWeight="bold"
        transform="rotate(73, 95, 400)">
        Prop 33 Feet Road
      </text>

      {/* Between block B/C divider (33ft horizontal) */}
      <rect x="280" y="266" width="884" height="26" fill={ROAD33} opacity="0.7" />
      <text x="722" y="283" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
        ——— Proposed 33 Feet CC Road ———
      </text>

      {/* Between block E rows (33ft) */}
      <rect x="280" y="558" width="884" height="26" fill={ROAD33} opacity="0.7" />
      <text x="722" y="574" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
        ——— Proposed 33 Feet CC Road ———
      </text>

      {/* ── SITE RESERVE / PARK ── */}
      <rect x="185" y="74" width="108" height="90" fill="#1a4a1a" stroke="#22c55e" strokeWidth="1.5" rx="4" opacity="0.9" />
      <text x="239" y="112" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">SITE</text>
      <text x="239" y="124" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">RESERVE</text>
      <text x="239" y="136" textAnchor="middle" fill="#4ade80" fontSize="8">(PARK)</text>

      {/* ── NIMZ label ── */}
      <rect x="0" y="580" width="52" height="100" fill="#1a2060" stroke="#3b82f6" strokeWidth="1.5" rx="4" opacity="0.9" />
      <text x="26" y="625" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold"
        transform="rotate(-90, 26, 625)">
        NIMZ
      </text>

      {/* BUFFER label */}
      <rect x="1165" y="240" width="30" height="120" fill="#2a1a00" stroke={ROAD33} strokeWidth="1" rx="3" opacity="0.8" />
      <text x="1180" y="305" textAnchor="middle" fill="#c9a84c" fontSize="8" fontWeight="bold"
        transform="rotate(-90, 1180, 305)">
        BUFFER
      </text>

      {/* EXISTING ROAD label */}
      <rect x="1140" y="38" width="24" height="424" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="4,3" />
      <text x="1152" y="260" textAnchor="middle" fill="#aaa" fontSize="8"
        transform="rotate(-90, 1152, 260)">
        EXISTING ROAD
      </text>

      {/* ── PLOT RECTS ── */}
      {allRects.map(({ plot, x, y, w, h }) => {
        const f = fill(plot);
        const s = stroke(plot);
        const sqY = Math.round((plot.width * plot.depth) / 9);
        return (
          <g
            key={plot.id}
            onClick={() => onPlotClick(plot)}
            style={{ cursor: 'pointer' }}
            className="group"
          >
            {/* Shadow/glow on hover */}
            <rect
              x={x - 2} y={y - 2} width={w + 4} height={h + 4}
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              rx="3"
              opacity="0"
              className="transition-all"
              style={{ filter: 'url(#glow)' }}
            />
            {/* Main plot rectangle */}
            <rect
              x={x} y={y} width={w} height={h}
              fill={f}
              fillOpacity="0.7"
              stroke={s}
              strokeWidth="1.5"
              rx="2"
            />
            {/* Hover overlay */}
            <rect
              x={x} y={y} width={w} height={h}
              fill="white"
              fillOpacity="0"
              rx="2"
              className="hover-plot"
              onMouseEnter={e => e.currentTarget.setAttribute('fillOpacity', '0.15')}
              onMouseLeave={e => e.currentTarget.setAttribute('fillOpacity', '0')}
            />
            {/* Plot number */}
            <text
              x={x + w / 2}
              y={y + h / 2 - (h > 40 ? 6 : 1)}
              textAnchor="middle"
              fill="white"
              fontSize={h > 40 ? '11' : '9'}
              fontWeight="bold"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {plot.block}{plot.plotNo}
            </text>
            {/* Dimensions */}
            {h > 38 && (
              <text
                x={x + w / 2}
                y={y + h / 2 + 9}
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="8"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {plot.width}'×{plot.depth}'
              </text>
            )}
            {/* Sq Yards */}
            {h > 48 && (
              <text
                x={x + w / 2}
                y={y + h / 2 + 20}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="7.5"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {sqY} Sq.Yd
              </text>
            )}
          </g>
        );
      })}

      {/* ── North arrow ── */}
      <g transform="translate(1140, 670)">
        <circle cx="30" cy="30" r="26" fill="#0d1a2a" stroke={ROAD40} strokeWidth="1.5" />
        <polygon points="30,8 36,30 30,26 24,30" fill={ROAD40} />
        <polygon points="30,52 36,30 30,34 24,30" fill="#444" />
        <text x="30" y="18" textAnchor="middle" fill={ROAD40} fontSize="9" fontWeight="bold">N</text>
        <text x="30" y="48" textAnchor="middle" fill="#777" fontSize="8">S</text>
        <text x="12" y="34" textAnchor="middle" fill="#777" fontSize="8">W</text>
        <text x="48" y="34" textAnchor="middle" fill="#777" fontSize="8">E</text>
      </g>

      {/* ── LP No badge ── */}
      <rect x="5" y="5" width="165" height="28" fill="#0d1a2a" stroke={ROAD40} strokeWidth="1" rx="4" opacity="0.9" />
      <text x="12" y="23" fill={ROAD40} fontSize="10" fontWeight="bold">LP No. 102/2025/H</text>
    </svg>
  );
}

// ── Main LayoutPlan Page ──────────────────────────────────────────────────
export default function LayoutPlan() {
  const { adminUser } = useAuth();
  const { plots, updatePlot } = usePlots();
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);

  const counts = {
    total:     plots.length,
    available: plots.filter(p => p.status === 'available').length,
    booked:    plots.filter(p => p.status === 'booked').length,
    sold:      plots.filter(p => p.status === 'sold').length,
  };

  return (
    <div className="bg-[#0d0d1a] min-h-screen pb-24 w-full">

      {/* ── Page Header ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 bg-[#070710] text-center border-b border-orange-500/10">
        <p className="text-orange-400 text-xs tracking-[5px] uppercase font-bold mb-3">Interactive Map</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          Layout <span className="text-orange-400">Plan</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mb-1 font-medium">
          ABIVYA GROUP DTCP Approved Layout
        </p>
        <p className="text-green-400 text-xs font-semibold mb-2">
          RERA Regd. No. P01100010688
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">
          Plan in Sy.No. 65/P of Venkatapur Grampanchayat, Kohir Mandal, Sangareddy District
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          <span className="bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full">
            LP No. 102/2025/H
          </span>
          <span className="bg-teal-600/20 border border-teal-500/40 text-teal-300 text-xs font-bold px-4 py-1.5 rounded-full">
            Spot Registration Available
          </span>
          <span className="bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full">
            Bank Loan Facility
          </span>
        </div>
      </section>

      <div className="px-4 sm:px-8 lg:px-12 py-10">

        {/* ── Stats Strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Plots',   value: counts.total,     color: 'border-orange-500/30 text-orange-400' },
            { label: 'Available',     value: counts.available, color: 'border-green-500/30  text-green-400' },
            { label: 'Booked',        value: counts.booked,    color: 'border-yellow-500/30 text-yellow-400' },
            { label: 'Sold',          value: counts.sold,      color: 'border-red-500/30    text-red-400' },
          ].map(s => (
            <div key={s.label}
              className={`bg-[#0a0a14] border ${s.color} rounded-xl p-5 text-center`}>
              <p className={`text-3xl font-black ${s.color.split(' ')[1]}`}
                style={{ fontFamily: 'Playfair Display, serif' }}>{s.value}</p>
              <p className="text-gray-400 text-xs mt-1 font-semibold tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Legend + Controls ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5">
            {Object.entries(STATUS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
                className={`flex items-center gap-2 transition-all ${filterStatus === key ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                <div className="w-4 h-4 rounded" style={{ background: val.fill, border: `1.5px solid ${val.stroke}` }} />
                <span className="text-gray-300 text-sm font-semibold">{val.label}</span>
              </button>
            ))}
            {filterStatus !== 'all' && (
              <button onClick={() => setFilterStatus('all')} className="text-orange-400 text-xs underline">
                Clear filter
              </button>
            )}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">Zoom:</span>
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.15))}
              className="bg-[#0a0a14] border border-orange-500/20 text-orange-400 rounded-lg p-2 hover:border-orange-500/60 transition-all">
              <ZoomOut size={15} />
            </button>
            <span className="text-gray-300 text-xs w-10 text-center font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={() => setZoom(z => Math.min(2.5, z + 0.15))}
              className="bg-[#0a0a14] border border-orange-500/20 text-orange-400 rounded-lg p-2 hover:border-orange-500/60 transition-all">
              <ZoomIn size={15} />
            </button>
            <button onClick={() => setZoom(1)}
              className="bg-[#0a0a14] border border-orange-500/20 text-orange-400 rounded-lg p-2 hover:border-orange-500/60 transition-all">
              <Maximize2 size={15} />
            </button>
          </div>
        </div>

        {/* Hint */}
        <p className="text-gray-500 text-xs mb-4 flex items-center gap-2">
          <MapPin size={12} className="text-orange-400" />
          Click on any plot to view details and submit an enquiry.
          {filterStatus !== 'all' && (
            <span className="text-orange-400 font-semibold">
              Showing {STATUS[filterStatus].label} plots only.
            </span>
          )}
        </p>

        {/* ── SVG Map Container ── */}
        <div
          ref={containerRef}
          className="border border-orange-500/20 rounded-2xl overflow-auto shadow-2xl"
          style={{ maxHeight: '75vh', background: '#0d1a2a' }}
        >
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.2s ease' }}>
            <LayoutSVG
              plots={filterStatus === 'all' ? plots : plots.map(p =>
                p.status !== filterStatus ? { ...p, _dim: true } : p
              )}
              onPlotClick={plot => {
                // If filtering, only open matching status plots
                if (filterStatus !== 'all' && plot.status !== filterStatus) return;
                setSelected(plot);
              }}
            />
          </div>
        </div>

        {/* ── Plot Grid List ── */}
        <div className="mt-14">
          <h2 className="text-2xl font-black text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            All Plots — <span className="text-orange-400">Quick View</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {plots
              .filter(p => filterStatus === 'all' || p.status === filterStatus)
              .map(plot => {
                const st = STATUS[plot.status];
                const sqY = Math.round((plot.width * plot.depth) / 9);
                return (
                  <button
                    key={plot.id}
                    onClick={() => setSelected(plot)}
                    className={`rounded-xl p-3 border text-center transition-all hover:scale-105 ${st.border} bg-[#0a0a14] hover:shadow-lg group`}
                    style={{ borderColor: STATUS[plot.status].stroke + '55' }}
                  >
                    <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                      style={{ background: STATUS[plot.status].fill + '33', border: `1px solid ${STATUS[plot.status].stroke}` }}>
                      <span className="text-xs font-black" style={{ color: STATUS[plot.status].fill }}>
                        {plot.block}{plot.plotNo}
                      </span>
                    </div>
                    <p className="text-white text-xs font-bold">{sqY} Sq Yds</p>
                    <p className="text-gray-500 text-xs">{plot.width}'×{plot.depth}'</p>
                    <div className="mt-1.5 rounded-full py-0.5 text-xs font-bold"
                      style={{ background: STATUS[plot.status].fill + '25', color: STATUS[plot.status].fill }}>
                      {st.label}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#0a0a14] border border-orange-500/20 rounded-2xl p-10 text-center">
          <p className="text-orange-400 text-xs tracking-[5px] uppercase font-bold mb-3">Limited Plots</p>
          <h3 className="text-3xl font-black text-white mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            {counts.available} Plots Still Available
          </h3>
          <p className="text-gray-400 mb-6">Spot Registration & Bank Loan Available — Act Fast!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact"
              className="btn-gold px-8 py-3 rounded text-sm font-bold tracking-wider uppercase flex items-center gap-2">
              <Phone size={16} /> Contact Us
            </Link>
            <Link to="/gallery"
              className="btn-outline-gold px-8 py-3 rounded text-sm font-bold tracking-wider uppercase flex items-center gap-2">
              View Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {selected && (
        <PlotModal
          plot={plots.find(p => p.id === selected.id)}
          onClose={() => setSelected(null)}
          onUpdate={(id, updates) => { updatePlot(id, updates); setSelected(prev => ({ ...prev, ...updates })); }}
          isAdmin={!!adminUser}
        />
      )}
    </div>
  );
}
