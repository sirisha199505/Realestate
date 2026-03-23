import { Link } from 'react-router-dom';
import { propertyInfo, galleryImages } from '../data/propertyData';
import { CheckCircle, Phone, ArrowRight, Star, Shield, TrendingUp, Download } from 'lucide-react';

// ── Reusable Section Header ─────────────────────────────────────────────────
function SectionHeader({ kicker, title, highlight }) {
  return (
    <div className="text-center mb-10 sm:mb-12">
      <p className="text-orange-400 text-xs tracking-[5px] uppercase font-bold mb-3">{kicker}</p>
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        {title} <span className="text-orange-400">{highlight}</span>
      </h2>
      <div className="mx-auto mt-4 w-16 h-[3px] rounded bg-gradient-to-r from-orange-400 to-orange-600" />
    </div>
  );
}

export default function Home() {
  const { projectHighlights, locationAdvantages, contact, approvalDetails } = propertyInfo;

  return (
    <div className="bg-[#0d0d1a] w-full">

      {/* ══════════════════════════════════════════
          HERO — full viewport
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-[calc(100vh-112px)] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a]/95 via-[#0d0d1a]/80 to-[#0d0d1a]/90" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto py-12">
          {/* DTCP Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 px-4 py-2 rounded-full mb-6">
            <Shield size={13} className="text-orange-400" />
            <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">
              DTCP Approved — {approvalDetails.lpNo}
            </span>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm tracking-[6px] uppercase font-medium mb-5">
            ABIVYA GROUP PRESENTS
          </p>

          {/* NC Icon */}
          <div className="flex items-center justify-center mb-4">
            <svg width="70" height="63" viewBox="0 0 90 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="45,2 8,28 82,28" fill="#00B4C8" />
              <rect x="37" y="12" width="6" height="5" fill="white" opacity="0.5" rx="1" />
              <rect x="48" y="12" width="6" height="5" fill="white" opacity="0.5" rx="1" />
              <rect x="6" y="30" width="11" height="48" fill="#F47920" rx="1" />
              <polygon points="6,30 17,30 42,68 42,78 31,78 6,40" fill="#F47920" />
              <rect x="31" y="30" width="11" height="48" fill="#F47920" rx="1" />
              <path d="M83,36 C68,30 52,36 52,55 C52,74 68,80 83,74"
                stroke="#1A2B6B" strokeWidth="12" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-3 leading-none"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <span className="text-white">NIMZ </span>
            <span className="text-orange-400">CITY</span>
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 sm:w-24 h-px bg-orange-500/40" />
            <p className="text-gray-300 font-bold text-xs sm:text-sm tracking-[3px] uppercase">KOHIR, SANGAREDDY.</p>
            <div className="w-16 sm:w-24 h-px bg-orange-500/40" />
          </div>

          <p className="text-orange-300 text-base sm:text-lg italic font-medium mb-1">
            "NIMZ Advantage, Assured Growth"
          </p>
          <p className="text-gray-400 text-sm font-medium mb-8">
            DTCP Approved Residential Villa Plots Beside NIMZ
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              ✅ Spot Registration
            </span>
            <span className="bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              🏦 Bank Loan Available
            </span>
            <span className="bg-[#1a1a3e] border border-orange-500/40 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full">
              {approvalDetails.syNo} — {approvalDetails.village}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/contact" className="btn-gold px-8 py-3 rounded text-sm font-bold tracking-wider uppercase flex items-center gap-2">
              Book a FREE Site Visit <ArrowRight size={15} />
            </Link>
            <Link to="/properties" className="btn-outline-gold px-8 py-3 rounded text-sm font-bold tracking-wider uppercase">
              View Properties
            </Link>
            <a
              href="/Nimz City (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 rounded text-sm font-bold tracking-wider uppercase border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-all duration-200"
            >
              <Download size={15} />
              Brochure
            </a>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-px h-8 bg-orange-500/40" />
            <p className="text-gray-500 text-[10px] tracking-widest">SCROLL TO EXPLORE</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUICK STATS STRIP
      ══════════════════════════════════════════ */}
      <section className="bg-orange-500 py-8 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          {[
            { val: 'NH 65',  label: 'Mumbai Highway Access' },
            { val: 'NIMZ',   label: 'National Manufacturing Zone' },
            { val: '2 Min',  label: 'Kohir X Roads' },
            { val: '100%',   label: 'DTCP Legal Clearance' },
          ].map(stat => (
            <div key={stat.label} className="text-white">
              <p className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'Playfair Display, serif' }}>{stat.val}</p>
              <p className="text-xs font-semibold opacity-80 mt-1.5 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT PROJECT
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="text-orange-400 text-xs tracking-[5px] uppercase font-bold mb-3">About The Project</p>
            <h2
              className="text-3xl sm:text-4xl font-black mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="text-white">ABIVYA GROUP</span><br />
              <span className="text-orange-400">DTCP Approved Layout</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-[15px]">
              NIMZ CITY is a premium DTCP approved residential villa plots project by Abivya Group, strategically located
              beside the National Investment and Manufacturing Zone (NIMZ) at Kohir, Sangareddy District, Telangana.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-[15px]">
              Plan in <strong className="text-orange-400">Sy.No. 65/P of Venkatapur Grampanchayat, Kohir Mandal, Sangareddy District</strong> —
              legally approved plots with excellent connectivity to Mumbai Highway (NH 65).
            </p>
            <div className="space-y-3 mb-8">
              {[
                'DTCP Approved — LP No. 102/2025/H',
                'Spot Registration Available',
                'Bank Loan Facility Available',
                'Vaasthu Compliant Plots',
                "40' & 33' CC Roads Throughout",
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={15} className="text-orange-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/properties" className="btn-gold px-7 py-3 rounded text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2">
              Explore Layout <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="rounded-2xl overflow-hidden border border-orange-500/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
                alt="NIMZ CITY Villa"
                className="w-full h-52 sm:h-64 md:h-[380px] object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#0a0a14] border border-orange-500/20 rounded-xl px-4 py-3 text-center">
                <p className="text-orange-400 text-xs font-bold tracking-wider mb-1">APPROVED BY</p>
                <p className="text-white font-black text-sm sm:text-base">DTCP</p>
                <p className="text-gray-500 text-xs">{approvalDetails.lpNo}</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3 text-center">
                <p className="text-orange-400 text-xs font-bold tracking-wider mb-1">BESIDE</p>
                <p className="text-white font-black text-sm sm:text-base">NIMZ</p>
                <p className="text-gray-400 text-xs">National Mfg. Zone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT WE OFFER — Project Highlights
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-[#070710]">
        <div>
          <SectionHeader kicker="What We Offer" title="Project" highlight="Highlights" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {projectHighlights.map((item, i) => (
              <div
                key={i}
                className="bg-[#0d0d1a] border border-orange-500/20 rounded-2xl p-5 sm:p-6 text-center card-hover group cursor-default"
              >
                <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
                <p className="text-gray-300 text-xs sm:text-sm font-semibold leading-snug group-hover:text-orange-400 transition-colors duration-300">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY NIMZ CITY
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
        <div>
          <SectionHeader kicker="Why NIMZ CITY" title="Smart Investment," highlight="Assured Growth" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <Shield size={32} className="text-orange-400" />,
                title: "100% Legal & Secure",
                desc: "DTCP approved layout with clear title, LP No. 102/2025/H. No disputes, no hidden charges.",
              },
              {
                icon: <TrendingUp size={32} className="text-orange-400" />,
                title: "High Appreciation",
                desc: "Located beside NIMZ — National Investment & Manufacturing Zone. 930 acres Food Processing SEZ adjacent to the project.",
              },
              {
                icon: <Star size={32} className="text-orange-400" />,
                title: "Premium Amenities",
                desc: "40' & 33' CC Roads, Compound Wall, Underground Drainage, Children Park, 24×7 Security and more.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-[#0a0a14] border border-orange-500/20 rounded-2xl p-6 sm:p-7 card-hover group"
              >
                <div className="mb-5 p-3 bg-orange-500/10 rounded-xl inline-block group-hover:bg-orange-500/20 transition-colors">
                  {card.icon}
                </div>
                <h3
                  className="text-white font-bold text-lg sm:text-xl mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONNECTIVITY
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-[#070710]">
        <div>
          <SectionHeader kicker="Connectivity" title="Location" highlight="Advantages" />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">

            {/* LEFT — Location Map */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-orange-400">Location</span> Map
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                {[
                  { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', label: 'NIMZ Zone' },
                  { img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80', label: 'Mumbai Highway NH65' },
                  { img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80', label: 'Woxsen University' },
                  { img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80', label: 'IIT Kandi' },
                ].map(img => (
                  <div key={img.label} className="gallery-item relative rounded-xl overflow-hidden h-32 sm:h-40">
                    <img src={img.img} alt={img.label} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2">
                      <p className="text-white text-xs font-bold">{img.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#12203a] rounded-xl border border-orange-500/20 p-4 mb-4">
                <div className="bg-gray-700/70 rounded py-1.5 px-3 text-center mb-3">
                  <span className="text-yellow-300 text-xs font-bold tracking-wider">NH 65 — MUMBAI HIGHWAY</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '📍 NIMZ CITY',    color: 'bg-orange-500/30 border-orange-400/60', text: 'text-orange-300' },
                    { label: '🏭 NIMZ Zone',     color: 'bg-blue-600/20 border-blue-400/40',    text: 'text-blue-300' },
                    { label: '🔀 Kohir X Roads', color: 'bg-green-600/20 border-green-400/40',  text: 'text-green-300' },
                    { label: '🎓 Woxsen Univ',   color: 'bg-purple-600/20 border-purple-400/40',text: 'text-purple-300' },
                    { label: '🏛️ IIT Kandi',    color: 'bg-red-600/20 border-red-400/40',      text: 'text-red-300' },
                    { label: '🏙️ Sangareddy',   color: 'bg-teal-600/20 border-teal-400/40',    text: 'text-teal-300' },
                  ].map(item => (
                    <div key={item.label} className={`${item.color} border rounded-xl p-2 text-center`}>
                      <p className={`text-xs font-bold ${item.text} leading-tight`}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/location"
                className="btn-outline-gold w-full text-center py-3 rounded text-sm font-bold tracking-wider uppercase block"
              >
                View Full Location Map →
              </Link>
            </div>

            {/* RIGHT — Location Advantages */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-orange-400">Distance</span> From Site
              </h3>
              <div className="space-y-2">
                {locationAdvantages.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#0d0d1a] border border-orange-500/10 hover:border-orange-500/50 rounded-xl p-3 sm:p-4 transition-all group"
                  >
                    <span className="bg-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-lg min-w-[70px] sm:min-w-[76px] text-center flex-shrink-0">
                      {item.time}
                    </span>
                    <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VISUAL TOUR — Gallery Preview
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
        <div>
          <SectionHeader kicker="Visual Tour" title="Project" highlight="Gallery" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {galleryImages.slice(0, 6).map((img, i) => (
              <div
                key={img.id}
                className={`gallery-item rounded-2xl overflow-hidden border border-orange-500/10 hover:border-orange-500/40 transition-all ${
                  i === 0 ? 'col-span-2 h-36 sm:h-52 lg:h-64' : 'h-32 sm:h-40 lg:h-52'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/gallery"
              className="btn-gold px-8 py-3 rounded text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2"
            >
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section
        className="py-14 sm:py-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0d0d1a]/88" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-orange-400 text-xs tracking-[5px] uppercase font-bold mb-4">Limited Plots Available</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Book Your Dream Plot Today
          </h2>
          <p className="text-gray-300 mb-1 text-base font-medium">Spot Registration & Bank Loan Available</p>
          <p className="text-orange-300 italic mb-8 text-base">— "NIMZ Advantage, Assured Growth" —</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-gold px-8 py-3 rounded text-sm font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <Phone size={15} />
              Contact Us Now
            </Link>
            <a
              href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
              className="btn-outline-gold px-8 py-3 rounded text-sm font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <Phone size={15} />
              {contact.phones[0]}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
