import { Link } from 'react-router-dom';
import { propertyInfo } from '../data/propertyData';
import { MapPin, ArrowRight, Shield, Download, Clock, FileCheck, Home, Layers } from 'lucide-react';

function SectionTitle({ kicker, title, highlight, sub }) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <p className="text-orange-400 text-xs tracking-[4px] uppercase font-bold mb-4">{kicker}</p>
      <h2
        className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        {title} <span className="text-orange-400">{highlight}</span>
      </h2>
      {sub && <p className="text-gray-400 text-sm max-w-xl mx-auto mb-2">{sub}</p>}
      <div className="mx-auto mt-4 w-20 h-[3px] rounded bg-gradient-to-r from-orange-400 to-orange-600" />
    </div>
  );
}

export default function Project() {
  const { approvalDetails, projectHighlights, rera, locationAdvantages } = propertyInfo;

  const plotTypes = [
    { size: '100 Sq Yds', dim: '25×36 ft', type: 'Standard',  highlight: false },
    { size: '150 Sq Yds', dim: '30×45 ft', type: 'Popular',   highlight: true  },
    { size: '200 Sq Yds', dim: '33×55 ft', type: 'Premium',   highlight: false },
    { size: '250 Sq Yds', dim: '36×63 ft', type: 'Grand',     highlight: false },
    { size: '300 Sq Yds', dim: '40×68 ft', type: 'Elite',     highlight: false },
  ];

  return (
    <div className="bg-[#0d0d1a] min-h-screen pb-20 w-full">

      {/* ── Hero ── */}
      <section
        className="relative flex items-start justify-center px-4 text-center overflow-hidden"
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
        <div className="relative z-10 w-full max-w-2xl mx-auto pt-8 pb-10 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-5 py-2 rounded-full">
            <Shield size={10} className="text-orange-400" />
            <span className="text-orange-400 text-[10px] font-black tracking-[3px] uppercase">Our Offering</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            NIMZ <span className="text-orange-400">CITY</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            DTCP Approved Residential Villa Plots Beside NIMZ
          </p>
          <p className="text-green-400 text-xs font-semibold">
            RERA Regd. No. P01100010688
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <MapPin size={14} className="text-orange-400" />
            <span>Kohir, Sangareddy District, Telangana</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </section>

      {/* ── Legal Info Strip ── */}
      <section className="bg-[#1a1a3e] py-4 px-4 sm:px-8 lg:px-12 border-b border-orange-500/10">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Shield size={13} className="text-orange-400" />
            <span className="text-gray-300"><span className="text-orange-400 font-bold">LP No.:</span> 102/2025/H</span>
          </div>
          <span className="text-gray-700 hidden sm:block">|</span>
          <span className="text-gray-300"><span className="text-orange-400 font-bold">Sy.No.:</span> {approvalDetails.syNo}</span>
          <span className="text-gray-700 hidden sm:block">|</span>
          <span className="text-gray-300"><span className="text-orange-400 font-bold">Village:</span> {approvalDetails.village}</span>
          <span className="text-gray-700 hidden sm:block">|</span>
          <a
            href={rera.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-green-300 hover:text-green-200 transition-colors"
          >
            <span className="font-bold text-green-400">RERA Regd. No:</span> {rera.registrationNo}
          </a>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="px-4 sm:px-8 lg:px-12 py-16 sm:py-24">

        {/* ══ MASTER PLAN ══ */}
        <SectionTitle
          kicker="Master Plan"
          title="ABIVYA GROUP"
          highlight="DTCP Approved Layout"
          sub={`Plan in ${approvalDetails.syNo} of ${approvalDetails.village}, ${approvalDetails.mandal}, ${approvalDetails.district}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start mb-20 sm:mb-24">

          {/* Left — Real Layout Plan Image */}
          <div className="bg-[#0a0a14] border border-orange-500/20 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-colors">
            <img
              src="/layout-plan.png"
              alt="NIMZ CITY Layout Plan"
              className="w-full object-contain"
            />
            <div className="px-5 py-3 border-t border-orange-500/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-orange-400" />
                <span className="text-orange-400 text-[11px] font-bold tracking-wider uppercase">DTCP Approved Layout</span>
              </div>
              <Link to="/layout-plan" className="text-orange-400 text-[11px] font-bold hover:underline underline-offset-2">
                View Full Plan →
              </Link>
            </div>
          </div>

          {/* Right — Details + Badges + CTA */}
          <div className="flex flex-col gap-6">

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Home size={18} className="text-orange-400" />,      stat: '93',   label: 'Total Plots'        },
                { icon: <Layers size={18} className="text-orange-400" />,    stat: '5',    label: 'Plot Blocks'        },
                { icon: <FileCheck size={18} className="text-orange-400" />, stat: 'DTCP', label: 'Approved Layout'    },
                { icon: <Shield size={18} className="text-orange-400" />,    stat: 'RERA', label: 'Registered Project' },
              ].map((s, i) => (
                <div key={i} className="bg-[#0a0a14] border border-orange-500/20 rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2">{s.icon}</div>
                  <p className="text-xl font-black text-white mb-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>{s.stat}</p>
                  <p className="text-gray-500 text-[10px] tracking-wider uppercase">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Layout Details Table */}
            <div className="bg-[#0a0a14] border border-orange-500/15 rounded-2xl overflow-hidden">
              <div className="bg-orange-500/10 px-5 py-3 border-b border-orange-500/20 flex items-center gap-3">
                <Shield size={13} className="text-orange-400" />
                <span className="text-orange-400 font-bold text-xs tracking-wider uppercase">Layout Details</span>
              </div>
              {[
                { label: 'Project',     value: 'NIMZ CITY' },
                { label: 'Location',    value: 'Kohir, Sangareddy District' },
                { label: 'Layout Type', value: 'DTCP Approved Residential Villa Plots' },
                { label: 'LP Number',   value: 'LP No. 102/2025/H' },
                { label: 'Survey No.',  value: 'Sy.No. 65/P' },
                { label: 'Village',     value: 'Venkatapur Grampanchayat' },
                { label: 'Mandal',      value: 'Kohir Mandal' },
                { label: 'District',    value: 'Sangareddy District' },
                { label: 'Road Width',  value: '40 Feet & 33 Feet CC Roads' },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex items-start gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors ${i !== arr.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <span className="text-gray-500 text-xs w-24 flex-shrink-0 pt-0.5">{row.label}</span>
                  <span className="text-orange-400 font-semibold text-xs leading-snug">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold px-3 py-2 rounded-full">✅ Spot Registration</span>
              <span className="bg-teal-600/20 border border-teal-500/40 text-teal-300 text-xs font-bold px-3 py-2 rounded-full">🏦 Bank Loan Available</span>
              <span className="bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-bold px-3 py-2 rounded-full">📋 DTCP Approved</span>
              <span className="bg-green-600/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-2 rounded-full">RERA Regd. No. P01100010688</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase shadow-lg shadow-orange-500/25 flex-1"
              >
                Enquire Now <ArrowRight size={15} />
              </Link>
              <Link
                to="/layout-plan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 transition-colors flex-1"
              >
                View Layout Plan
              </Link>
            </div>
          </div>
        </div>

        {/* ══ PLOT SIZES ══ */}
        <SectionTitle
          kicker="Choose Your Plot"
          title="Available"
          highlight="Plot Sizes"
          sub="Select the plot size that best fits your dream home and budget"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-20 sm:mb-24">
          {plotTypes.map(plot => (
            <div
              key={plot.size}
              className={`rounded-2xl p-5 sm:p-7 text-center border transition-all duration-300 hover:-translate-y-1 ${
                plot.highlight
                  ? 'bg-orange-500 border-orange-400 shadow-xl shadow-orange-500/40'
                  : 'bg-[#0a0a14] border-orange-500/20 hover:border-orange-500/60 hover:shadow-xl hover:shadow-orange-500/10'
              }`}
            >
              {plot.highlight && (
                <span className="block text-xs font-black mb-4 text-orange-900 bg-white/25 rounded-full px-3 py-1">
                  ★ POPULAR
                </span>
              )}
              <p
                className={`text-xl sm:text-2xl font-black mb-2 ${plot.highlight ? 'text-white' : 'text-orange-400'}`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {plot.size}
              </p>
              <p className={`text-sm mb-1.5 font-medium ${plot.highlight ? 'text-orange-100' : 'text-gray-400'}`}>{plot.dim}</p>
              <p className={`text-xs font-bold mb-5 tracking-wider uppercase ${plot.highlight ? 'text-white/80' : 'text-gray-500'}`}>{plot.type}</p>
              <Link
                to="/contact"
                className={`block text-xs font-bold py-2.5 rounded-xl transition-all ${
                  plot.highlight
                    ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-md'
                    : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 hover:text-orange-300'
                }`}
              >
                Enquire Now
              </Link>
            </div>
          ))}
        </div>

        {/* ══ LOCATION ADVANTAGES ══ */}
        <SectionTitle
          kicker="Prime Location"
          title="Location"
          highlight="Advantages"
          sub="Strategically located near key landmarks, highways, and institutions"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-20 sm:mb-24">
          {locationAdvantages.map((item, i) => (
            <div
              key={i}
              className="bg-[#0a0a14] border border-orange-500/20 rounded-xl px-5 py-4 flex items-center gap-4
                         hover:border-orange-500/50 hover:bg-[#111827] hover:shadow-lg hover:shadow-orange-500/5
                         hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex-shrink-0 flex items-center justify-center bg-orange-500/10 border border-orange-500/25 rounded-lg w-16 h-12 text-center">
                <div>
                  <Clock size={11} className="text-orange-400 mx-auto mb-0.5" />
                  <p className="text-orange-400 text-[10px] font-black leading-none">{item.time}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm font-medium group-hover:text-orange-400 transition-colors leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ══ PROJECT HIGHLIGHTS ══ */}
        <SectionTitle
          kicker="Why Choose Us"
          title="Project"
          highlight="Highlights"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {projectHighlights.map((item, i) => (
            <div
              key={i}
              className="bg-[#0a0a14] border border-orange-500/20 rounded-xl p-5 sm:p-6 flex items-center gap-4
                         hover:border-orange-500/50 hover:bg-[#111827] hover:shadow-lg hover:shadow-orange-500/5
                         hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <span className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
              <p className="text-gray-300 text-sm font-medium group-hover:text-orange-400 transition-colors leading-snug">
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ── CTA Banner ── */}
      <section className="bg-orange-500 py-14 sm:py-18 px-4 sm:px-8 lg:px-12 text-center">
        <p className="text-orange-100 text-xs tracking-[4px] uppercase font-bold mb-4">Limited Plots Available</p>
        <h2
          className="text-3xl sm:text-4xl font-black text-white mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Ready to Invest in NIMZ CITY?
        </h2>
        <p className="text-orange-100 mb-2 text-sm">Spot Registration Available · Bank Loan Available · DTCP Approved</p>
        <p className="text-green-200 mb-10 text-xs font-semibold">RERA Regd. No. P01100010688</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-black px-10 py-3.5 rounded-xl text-sm tracking-wider uppercase hover:bg-orange-50 transition-colors shadow-lg w-full sm:w-auto justify-center"
          >
            Book a Free Site Visit <ArrowRight size={16} />
          </Link>
          <a
            href="/ABIVYA GROUP'S NIMZ CITY FLYER.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600/80 text-white font-black px-10 py-3.5 rounded-xl text-sm tracking-wider uppercase hover:bg-orange-700 transition-colors border border-white/20 w-full sm:w-auto justify-center"
          >
            <Download size={16} />
            Download Brochure
          </a>
        </div>
      </section>

      {/* ── RERA Compliance Section ── */}
      <section className="bg-[#0a0a14] border-t border-green-500/10 px-4 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
          <div className="flex-shrink-0 flex flex-col items-center justify-center bg-green-600/10 border border-green-500/25 rounded-2xl px-6 py-5 min-w-[160px] text-center">
            <p className="text-green-400 text-[10px] font-black tracking-[3px] uppercase mb-2">RERA Registered</p>
            <p className="text-white font-black text-lg tracking-wider">{rera.registrationNo}</p>
            <p className="text-green-400/70 text-[9px] tracking-widest uppercase mt-1">{rera.shortAuthority}</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-green-400 text-xs font-bold tracking-[3px] uppercase mb-2">
              {rera.authority}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              <span className="text-white font-semibold">NIMZ CITY</span> is registered under the Real Estate (Regulation and Development) Act, 2016.
              Registration valid from <span className="text-orange-400 font-semibold">{rera.validFrom}</span> to{' '}
              <span className="text-orange-400 font-semibold">{rera.validUpto}</span>.
              Promoted by <span className="text-white font-semibold">{rera.promoter}</span>, represented by{' '}
              <span className="text-white font-semibold">{rera.representative}</span>.
            </p>
            <a
              href={rera.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-xs font-bold tracking-wider underline underline-offset-4 transition-colors"
            >
              🔗 Verify on {rera.website}
            </a>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-6 leading-relaxed border-t border-white/5 pt-5">
          As per Section 37 of the Real Estate (Regulation &amp; Development) Act, 2016 — all advertisements must display the RERA Registration Number and {rera.shortAuthority} website URL. This project's RERA Registration No. is <span className="text-gray-400 font-semibold">{rera.registrationNo}</span>. Visit <a href={rera.website} target="_blank" rel="noopener noreferrer" className="text-green-400 underline underline-offset-2">{rera.website}</a> for details.
        </p>
      </section>
    </div>
  );
}