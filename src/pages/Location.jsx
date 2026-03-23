import { propertyInfo } from '../data/propertyData';
import { MapPin, Clock } from 'lucide-react';

export default function Location() {
  const { locationAdvantages } = propertyInfo;

  const nearbyBrands = ['Mahindra', 'Hatsun', 'Hyundai', 'MRF', 'Pepsi', 'Toshiba'];

  return (
    <div className="bg-[#0d0d1a] min-h-screen pb-24 w-full">
      {/* Header */}
      <section
        className="relative flex items-center justify-center px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #070714 0%, #0d0d1a 55%, #110800 100%)' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-orange-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 w-full max-w-2xl mx-auto pt-8 pb-10 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-4 py-1.5 rounded-full">
            <MapPin size={10} className="text-orange-400" />
            <span className="text-orange-400 text-[10px] font-black tracking-[3px] uppercase">Find Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Location <span className="text-orange-400">Map</span>
          </h1>
          <p className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <MapPin size={14} className="text-orange-400" />
            NIMZ CITY, Kohir, Sangareddy District, Telangana
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </section>

      {/* Map + Advantages — Map LEFT, Advantages RIGHT */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* LEFT — Location Map */}
          <div>
            <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-orange-400">Location</span> Map
            </h2>

            {/* Visual Map Card */}
            <div className="rounded-2xl overflow-hidden border border-orange-500/20 shadow-2xl mb-6 bg-[#0d1a2e]">

              {/* Card header */}
              <div className="bg-[#0a0a14] border-b border-orange-500/10 px-4 py-3 flex items-center gap-3">
                <MapPin size={16} className="text-orange-400" />
                <span className="text-gray-300 text-sm font-medium">NIMZ CITY — Kohir, Sangareddy</span>
              </div>

              {/* NH 65 Highway bar — full width, no overlap */}
              <div className="w-full bg-gray-700 py-2.5 flex items-center justify-center border-b border-yellow-500/20">
                <span className="text-yellow-300 text-xs font-black tracking-[2px] uppercase">
                  ← NH 65 — MUMBAI HIGHWAY →
                </span>
              </div>

              {/* NIMZ CITY site pin */}
              <div className="flex justify-center py-4 border-b border-white/5">
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/40 animate-pulse">
                    📍 NIMZ CITY — OUR SITE
                  </div>
                  <div className="w-px h-3 bg-orange-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                </div>
              </div>

              {/* Landmark grid — 3 columns, no overlap */}
              <div className="grid grid-cols-3 gap-2 p-4">
                {[
                  { name: 'NIMZ Zone',    icon: '🏭', color: 'border-blue-500/40   bg-blue-600/10   text-blue-300'   },
                  { name: 'Kohir X Road', icon: '🔀', color: 'border-green-500/40  bg-green-600/10  text-green-300'  },
                  { name: 'Woxsen Univ',  icon: '🎓', color: 'border-purple-500/40 bg-purple-600/10 text-purple-300' },
                  { name: 'IIT Kandi',   icon: '🏛️', color: 'border-red-500/40    bg-red-600/10    text-red-300'    },
                  { name: 'Sangareddy',  icon: '🏙️', color: 'border-teal-500/40   bg-teal-600/10   text-teal-300'   },
                  { name: 'Food SEZ',    icon: '🏗️', color: 'border-amber-500/40  bg-amber-600/10  text-amber-300'  },
                ].map(l => (
                  <div key={l.name} className={`border rounded-xl p-2 flex flex-col items-center gap-1 text-center ${l.color}`}>
                    <span className="text-base">{l.icon}</span>
                    <p className="text-white text-[10px] font-bold leading-tight">{l.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-orange-500/20">
              <iframe
                title="NIMZ CITY Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15222.345678901234!2d77.88260000000001!3d17.884600000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf0b0b0b0b0b1%3A0xabcdef1234567890!2sKohir%2C%20Sangareddy%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Nearby brands */}
            <div className="mt-6 bg-[#0a0a14] border border-orange-500/10 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <span className="text-orange-400">🏢</span> Major Companies Nearby
              </h3>
              <div className="flex flex-wrap gap-2">
                {nearbyBrands.map(b => (
                  <span key={b} className="bg-[#1a1a3e] text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-orange-500/10">
                    {b}
                  </span>
                ))}
                <span className="bg-orange-500/10 text-orange-400 text-xs font-medium px-3 py-1.5 rounded-lg border border-orange-500/20">
                  + More Upcoming
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Location Advantages */}
          <div>
            <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-orange-400">Location</span> Advantages
            </h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              NIMZ CITY enjoys an unmatched strategic location at Kohir, Sangareddy District — right beside the National Investment
              and Manufacturing Zone (NIMZ) with excellent connectivity to NH 65 Mumbai Highway and major institutions.
            </p>

            <div className="space-y-3">
              {locationAdvantages.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-[#0a0a14] border border-orange-500/10 hover:border-orange-500/40 rounded-xl p-4 transition-all group card-hover"
                >
                  <div className="flex-shrink-0 bg-orange-500 text-white text-xs font-black px-3 py-2 rounded-lg min-w-[60px] sm:min-w-[72px] text-center leading-tight">
                    {item.time}
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-orange-400/60 flex-shrink-0" />
                    <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80', label: 'NIMZ Zone' },
                { img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80', label: 'Mumbai Highway NH65' },
                { img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80', label: 'Woxsen University' },
                { img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80', label: 'IIT Kandi' },
              ].map(img => (
                <div key={img.label} className="gallery-item relative rounded-xl overflow-hidden h-24 sm:h-32">
                  <img src={img.img} alt={img.label} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2">
                    <p className="text-white text-xs font-bold">{img.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Site Address */}
      <section className="bg-[#0a0a14] border-t border-orange-500/10 py-10 px-4 sm:px-8 lg:px-12">
        <div className="text-center">
          <p className="text-orange-400 text-xs tracking-[4px] uppercase font-bold mb-4">Office Address</p>
          <p className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>ABIVYA GROUP</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            8-2-293/82/HE/82&83, Flat No 102, Serenade Apartment,<br />
            Road Number 69, Nandagiri Hills, Jubilee Hills, Hyderabad.
          </p>
        </div>
      </section>
    </div>
  );
}
