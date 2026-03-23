import { useState } from 'react';
import { galleryImages } from '../data/propertyData';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const CATEGORIES = ['all', 'villa', 'layout', 'plots', 'amenities'];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'all' ? galleryImages : galleryImages.filter(g => g.category === active);
  const count = (cat) => cat === 'all' ? galleryImages.length : galleryImages.filter(g => g.category === cat).length;

  const prev = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };
  const next = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  };

  return (
    <div className="bg-[#0d0d1a] min-h-screen pb-24 w-full">

      {/* ── Header ── */}
      <section
        className="relative flex items-center justify-center px-4 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80')`,
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
        <div className="relative z-10 w-full max-w-2xl mx-auto pt-8 pb-10 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-5 py-2 rounded-full">
            <Eye size={11} className="text-orange-400" />
            <span className="text-orange-400 text-[10px] font-black tracking-[3px] uppercase">Visual Tour</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Project <span className="text-orange-400">Gallery</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Explore NIMZ CITY — Premium Villa Plots at Kohir, Sangareddy</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </section>

      {/* ── Filter Tabs ── */}
      <div className="px-4 sm:px-8 lg:px-12 pt-10 pb-6">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                active === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40 scale-105'
                  : 'bg-[#0a0a14] border border-orange-500/20 text-gray-400 hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-500/5'
              }`}
            >
              {cat === 'all' ? 'All Photos' : cat}
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                active === cat ? 'bg-white/20 text-white' : 'bg-orange-500/15 text-orange-400'
              }`}>
                {count(cat)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Gallery Grid ── */}
      <div className="px-4 sm:px-8 lg:px-12 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-orange-500/10
                         hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10
                         transition-all duration-300 relative h-48 sm:h-56 lg:h-64"
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <div className="bg-orange-500 rounded-full p-2 shadow-lg">
                    <Eye size={16} className="text-white" />
                  </div>
                </div>
                <p className="text-white text-sm font-semibold">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">No images in this category yet.</p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white hover:text-orange-400 transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={() => setLightbox(null)}
          >
            <X size={22} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 bg-black/60 hover:bg-orange-500/20 rounded-full p-3 transition-all"
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={26} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-5xl w-full">
            <img src={lightbox.url} alt={lightbox.title} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            <p className="text-center text-gray-300 mt-4 font-semibold text-base">{lightbox.title}</p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 bg-black/60 hover:bg-orange-500/20 rounded-full p-3 transition-all"
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </div>
  );
}
