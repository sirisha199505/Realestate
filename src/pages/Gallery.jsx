import { useState } from 'react';
import { galleryImages } from '../data/propertyData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['all', 'villa', 'layout', 'plots', 'amenities'];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'all' ? galleryImages : galleryImages.filter(g => g.category === active);

  const prev = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };
  const next = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  };

  return (
    <div className="bg-[#0d0d1a] min-h-screen pb-24">
      {/* Header */}
      <section
        className="relative py-16 sm:py-20 px-4 text-center overflow-hidden"
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
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-4 py-1.5 rounded-full mb-5">
            <span className="text-orange-400 text-[10px] font-black tracking-[3px] uppercase">Visual Tour</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Project <span className="text-orange-400">Gallery</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Explore NIMZ CITY — Premium Villa Plots at Kohir, Sangareddy</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                active === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-[#0a0a14] border border-orange-500/20 text-gray-400 hover:border-orange-500/50 hover:text-orange-400'
              }`}
            >
              {cat === 'all' ? 'All Photos' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className={`gallery-item group cursor-pointer rounded-xl overflow-hidden border border-orange-500/10 hover:border-orange-500/50 transition-all relative ${
                i === 0 ? 'col-span-2 h-40 sm:h-64 lg:h-80' : 'h-32 sm:h-40 lg:h-44'
              }`}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-xs font-semibold">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 bg-black/50 rounded-full p-2"
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={28} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
            <img src={lightbox.url} alt={lightbox.title} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <p className="text-center text-gray-300 mt-3 font-medium">{lightbox.title}</p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 bg-black/50 rounded-full p-2"
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}
