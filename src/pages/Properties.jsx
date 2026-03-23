import { Link } from 'react-router-dom';
import { propertyInfo } from '../data/propertyData';
import { MapPin, ArrowRight, Shield, Download } from 'lucide-react';

export default function Properties() {
  const { approvalDetails, projectHighlights } = propertyInfo;

  const plotTypes = [
    { size: '100 Sq Yds', dim: '25×36 ft', type: 'Standard', highlight: false },
    { size: '150 Sq Yds', dim: '30×45 ft', type: 'Popular', highlight: true },
    { size: '200 Sq Yds', dim: '33×55 ft', type: 'Premium', highlight: false },
    { size: '250 Sq Yds', dim: '36×63 ft', type: 'Grand', highlight: false },
    { size: '300 Sq Yds', dim: '40×68 ft', type: 'Elite', highlight: false },
  ];

  return (
    <div className="bg-[#0d0d1a] min-h-screen pb-28">

      {/* ── Hero Header ── */}
      <section
        className="relative py-16 sm:py-20 px-4 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a]/95 via-[#0d0d1a]/85 to-[#0d0d1a]/92" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-4 py-1.5 rounded-full mb-5">
            <Shield size={10} className="text-orange-400" />
            <span className="text-orange-400 text-[10px] font-black tracking-[3px] uppercase">Our Offering</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            NIMZ <span className="text-orange-400">CITY</span>
          </h1>
          <p className="text-gray-300 text-lg mb-3">DTCP Approved Residential Villa Plots Beside NIMZ</p>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <MapPin size={14} className="text-orange-400" />
            <span>Kohir, Sangareddy District, Telangana</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </section>

      {/* ── Legal Info Strip ── */}
      <section className="bg-[#1a1a3e] py-4 px-4 border-b border-orange-500/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-orange-400" />
            <span className="text-gray-300"><span className="text-orange-400 font-bold">LP No.:</span> 102/2025/H</span>
          </div>
          <div className="text-gray-600 hidden sm:block">|</div>
          <span className="text-gray-300"><span className="text-orange-400 font-bold">Sy.No.:</span> {approvalDetails.syNo}</span>
          <div className="text-gray-600 hidden sm:block">|</div>
          <span className="text-gray-300"><span className="text-orange-400 font-bold">Village:</span> {approvalDetails.village}</span>
          <div className="text-gray-600 hidden sm:block">|</div>
          <span className="text-gray-300"><span className="text-orange-400 font-bold">Mandal:</span> {approvalDetails.mandal}</span>
        </div>
      </section>

      {/* ── Layout Plan Section ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-orange-400 text-xs tracking-[4px] uppercase font-bold mb-3">Master Plan</p>
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            ABIVYA GROUP <span className="text-orange-400">DTCP Approved Layout</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Plan in {approvalDetails.syNo} of {approvalDetails.village}, {approvalDetails.mandal}, {approvalDetails.district}
          </p>
          <div className="section-divider mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start mb-12 sm:mb-20">

          {/* Left — Schematic Map */}
          <div className="bg-[#0a0a14] border border-orange-500/20 rounded-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-orange-500/10 px-6 py-4 border-b border-orange-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-orange-400" />
                <span className="text-orange-400 font-bold text-sm tracking-wider">LAYOUT PLAN MAP</span>
              </div>
              <span className="text-gray-500 text-xs">Schematic</span>
            </div>

            {/* SVG Layout Schematic */}
            <div className="p-5">
              <svg viewBox="0 0 400 320" className="w-full rounded-xl" style={{ background: '#0d1a2e' }}>

                {/* ── NH 65 Highway (top) ── */}
                <rect x="0" y="0" width="400" height="32" fill="#374151" />
                <rect x="0" y="14" width="400" height="4" fill="#fbbf24" opacity="0.6" />
                <text x="200" y="20" textAnchor="middle" fill="#f3f4f6" fontSize="9" fontWeight="bold" letterSpacing="1">
                  NH 65 — MUMBAI HIGHWAY
                </text>

                {/* ── 40ft Road ── */}
                <rect x="0" y="50" width="400" height="18" fill="#92400e" opacity="0.7" />
                <text x="200" y="62" textAnchor="middle" fill="#fcd34d" fontSize="7.5" fontWeight="bold">
                  ← PROPOSED 40 FEET WIDE CC ROAD →
                </text>

                {/* ── Plot Blocks Row 1 (A, B, C) ── */}
                {/* Block A */}
                <rect x="8" y="76" width="108" height="72" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2" />
                <text x="62" y="106" textAnchor="middle" fill="#93c5fd" fontSize="18" fontWeight="900" opacity="0.4">A</text>
                <text x="62" y="122" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">BLOCK A</text>
                <text x="62" y="135" textAnchor="middle" fill="#60a5fa" fontSize="7">16 Plots</text>

                {/* Block B */}
                <rect x="124" y="76" width="108" height="72" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2" />
                <text x="178" y="106" textAnchor="middle" fill="#93c5fd" fontSize="18" fontWeight="900" opacity="0.4">B</text>
                <text x="178" y="122" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">BLOCK B</text>
                <text x="178" y="135" textAnchor="middle" fill="#60a5fa" fontSize="7">18 Plots</text>

                {/* Block C */}
                <rect x="240" y="76" width="108" height="72" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2" />
                <text x="294" y="106" textAnchor="middle" fill="#93c5fd" fontSize="18" fontWeight="900" opacity="0.4">C</text>
                <text x="294" y="122" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">BLOCK C</text>
                <text x="294" y="135" textAnchor="middle" fill="#60a5fa" fontSize="7">14 Plots</text>

                {/* ── 33ft Road ── */}
                <rect x="0" y="155" width="400" height="16" fill="#78350f" opacity="0.7" />
                <text x="200" y="166" textAnchor="middle" fill="#fcd34d" fontSize="7.5" fontWeight="bold">
                  ← PROPOSED 33 FEET WIDE CC ROAD →
                </text>

                {/* ── Plot Blocks Row 2 (D, E) + Park ── */}
                {/* Block D */}
                <rect x="8" y="178" width="108" height="72" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2" />
                <text x="62" y="208" textAnchor="middle" fill="#93c5fd" fontSize="18" fontWeight="900" opacity="0.4">D</text>
                <text x="62" y="224" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">BLOCK D</text>
                <text x="62" y="237" textAnchor="middle" fill="#60a5fa" fontSize="7">12 Plots</text>

                {/* Block E */}
                <rect x="124" y="178" width="108" height="72" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2" />
                <text x="178" y="208" textAnchor="middle" fill="#93c5fd" fontSize="18" fontWeight="900" opacity="0.4">E</text>
                <text x="178" y="224" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">BLOCK E</text>
                <text x="178" y="237" textAnchor="middle" fill="#60a5fa" fontSize="7">12 Plots</text>

                {/* Site Reserve / Park */}
                <rect x="240" y="178" width="108" height="72" rx="4" fill="#14532d" stroke="#22c55e" strokeWidth="1.2" />
                <text x="294" y="208" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">SITE</text>
                <text x="294" y="221" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">RESERVE</text>
                <text x="294" y="235" textAnchor="middle" fill="#4ade80" fontSize="7.5">Park / Open Space</text>

                {/* ── NIMZ zone indicator (bottom) ── */}
                <rect x="0" y="258" width="400" height="30" fill="#7c2d12" opacity="0.5" />
                <text x="200" y="277" textAnchor="middle" fill="#fb923c" fontSize="9" fontWeight="bold" letterSpacing="2">
                  ← NIMZ (NATIONAL INVESTMENT & MANUFACTURING ZONE)
                </text>

                {/* ── Site Marker Pin ── */}
                <circle cx="62" cy="68" r="5" fill="#f97316" opacity="0.9" />
                <text x="72" y="71" fill="#f97316" fontSize="7.5" fontWeight="bold">YOU ARE HERE</text>

                {/* ── North Arrow ── */}
                <text x="360" y="110" textAnchor="middle" fill="#6b7280" fontSize="7">N</text>
                <line x1="360" y1="112" x2="360" y2="125" stroke="#6b7280" strokeWidth="1.5" />
                <polygon points="360,106 356,113 364,113" fill="#6b7280" />

                {/* ── Compass frame ── */}
                <circle cx="360" cy="116" r="13" fill="none" stroke="#374151" strokeWidth="1" />

              </svg>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { color: 'bg-blue-900/60 border-blue-500/50',  label: 'Plot Blocks' },
                  { color: 'bg-green-900/60 border-green-500/50', label: 'Park / Reserve' },
                  { color: 'bg-amber-900/60 border-amber-500/50', label: 'CC Roads' },
                ].map(l => (
                  <div key={l.label} className={`${l.color} border rounded-lg py-1.5 px-2 text-center`}>
                    <p className="text-gray-300 text-xs">{l.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 text-xs text-center mt-3 italic">
                Schematic only · View interactive map on <Link to="/layout-plan" className="text-orange-400 hover:underline">Layout Plan page</Link>
              </p>
            </div>
          </div>

          {/* Right — Layout Details */}
          <div className="pt-2">
            <h3 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Layout <span className="text-orange-400">Features</span>
            </h3>
            <div className="space-y-4 mb-10">
              {[
                { label: 'Project',      value: 'NIMZ CITY' },
                { label: 'Location',     value: 'Kohir, Sangareddy District' },
                { label: 'Layout Type', value: 'DTCP Approved Residential Villa Plots' },
                { label: 'LP Number',   value: 'LP No. 102/2025/H' },
                { label: 'Survey No.',  value: 'Sy.No. 65/P' },
                { label: 'Village',     value: 'Venkatapur Grampanchayat' },
                { label: 'Mandal',      value: 'Kohir Mandal' },
                { label: 'District',    value: 'Sangareddy District' },
                { label: 'Road Width',  value: '40 Feet & 33 Feet CC Roads' },
              ].map(row => (
                <div key={row.label} className="flex items-start gap-3 border-b border-gray-800/70 pb-3">
                  <span className="text-gray-500 text-sm w-24 sm:w-32 flex-shrink-0">{row.label}</span>
                  <span className="text-orange-400 font-medium text-sm">: {row.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold px-4 py-2 rounded-full">
                ✅ Spot Registration
              </span>
              <span className="bg-teal-600/20 border border-teal-500/40 text-teal-300 text-xs font-bold px-4 py-2 rounded-full">
                🏦 Bank Loan Available
              </span>
              <span className="bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold px-4 py-2 rounded-full">
                📋 DTCP Approved
              </span>
            </div>
          </div>
        </div>

        {/* ── Available Plot Sizes ── */}
        <div className="text-center mb-12">
          <p className="text-orange-400 text-xs tracking-[4px] uppercase font-bold mb-3">Choose Your Plot</p>
          <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Available <span className="text-orange-400">Plot Sizes</span>
          </h2>
          <p className="text-gray-400 text-sm">Select the plot size that fits your dream home</p>
          <div className="section-divider mt-5" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 mb-12 sm:mb-24">
          {plotTypes.map(plot => (
            <div
              key={plot.size}
              className={`rounded-2xl p-4 sm:p-6 text-center card-hover border transition-all ${
                plot.highlight
                  ? 'bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/30'
                  : 'bg-[#0a0a14] border-orange-500/20 hover:border-orange-500/50'
              }`}
            >
              {plot.highlight && (
                <span className="block text-xs font-black mb-3 text-orange-900 bg-white/20 rounded-full px-2 py-0.5">
                  ★ POPULAR
                </span>
              )}
              <p className={`text-xl sm:text-2xl font-black mb-2 ${plot.highlight ? 'text-white' : 'text-orange-400'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}>
                {plot.size}
              </p>
              <p className={`text-xs mb-2 ${plot.highlight ? 'text-orange-100' : 'text-gray-500'}`}>{plot.dim}</p>
              <p className={`text-xs font-bold mb-4 ${plot.highlight ? 'text-white' : 'text-gray-400'}`}>{plot.type}</p>
              <Link
                to="/contact"
                className={`block text-xs font-bold py-2.5 rounded-lg transition-all ${
                  plot.highlight
                    ? 'bg-white text-orange-600 hover:bg-orange-50'
                    : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                }`}
              >
                Enquire Now
              </Link>
            </div>
          ))}
        </div>

        {/* ── Project Highlights ── */}
        <div className="text-center mb-12">
          <p className="text-orange-400 text-xs tracking-[4px] uppercase font-bold mb-3">Why Choose Us</p>
          <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Project <span className="text-orange-400">Highlights</span>
          </h2>
          <div className="section-divider mt-5" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {projectHighlights.map((item, i) => (
            <div key={i} className="bg-[#0a0a14] border border-orange-500/20 rounded-xl p-5 flex items-center gap-3 card-hover group hover:border-orange-500/50 transition-all">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <p className="text-gray-300 text-sm font-medium group-hover:text-orange-400 transition-colors leading-snug">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-orange-500 py-14 px-4 text-center">
        <p className="text-orange-100 text-xs tracking-[4px] uppercase font-bold mb-3">Limited Plots Available</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Ready to Invest in NIMZ CITY?
        </h2>
        <p className="text-orange-100 mb-8 text-sm">Spot Registration Available · Bank Loan Available · DTCP Approved</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-orange-600 font-black px-8 py-3.5 rounded-xl text-sm tracking-wider uppercase hover:bg-orange-50 transition-colors shadow-lg">
            Book a Free Site Visit <ArrowRight size={16} />
          </Link>
          <a
            href="/Nimz City (1).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600/80 text-white font-black px-8 py-3.5 rounded-xl text-sm tracking-wider uppercase hover:bg-orange-700 transition-colors border border-white/20"
          >
            <Download size={16} />
            Download Brochure
          </a>
        </div>
      </section>
    </div>
  );
}
