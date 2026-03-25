import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { allPlots, STATUS, PLOTS_VERSION } from '../data/layoutData';
import { X, Phone, Mail, User, Send, CheckCircle, ArrowRight, Search } from 'lucide-react';

// ── Persist plot statuses + merge admin overrides ─────────────────────────
function usePlots() {
  const [plots, setPlots] = useState(() => {
    try {
      const ver   = parseInt(localStorage.getItem('abivya_plots_ver') || '0');
      const saved = localStorage.getItem('abivya_plots');
      if (saved && ver === PLOTS_VERSION) {
        const parsed = JSON.parse(saved);
        if (parsed.length === allPlots.length) return parsed;
      }
      // Version mismatch or missing — reset to fresh data
      localStorage.setItem('abivya_plots_ver', String(PLOTS_VERSION));
      localStorage.removeItem('abivya_plots');
    } catch { /* ignore */ }
    return allPlots;
  });

  // Admin overrides: { [plotId]: { dimW, dimD, sqYards, images } }
  const [overrides] = useState(() => {
    try { return JSON.parse(localStorage.getItem('abivya_plot_overrides') || '{}'); }
    catch { return {}; }
  });

  const updatePlot = (id, updates) => setPlots(prev => {
    const next = prev.map(p => p.id === id ? { ...p, ...updates } : p);
    localStorage.setItem('abivya_plots', JSON.stringify(next));
    localStorage.setItem('abivya_plots_ver', String(PLOTS_VERSION));
    return next;
  });

  // Merge overrides into each plot (dimW, dimD, sqYards, images)
  const mergedPlots = plots.map(p => ({ ...p, ...(overrides[p.id] || {}) }));

  return { plots: mergedPlots, updatePlot };
}

// ── Enquiry Modal ──────────────────────────────────────────────────────────
function PlotModal({ plot, onClose, onUpdate, isAdmin }) {
  const { submitLead, clientUser } = useAuth();
  const st   = STATUS[plot.status];
  const sqY  = plot.sqYards ?? Math.round((plot.width * plot.depth) / 9);
  const sqFt = plot.width * plot.depth;
  const dimW = plot.dimW ?? `${plot.width}'`;
  const dimD = plot.dimD ?? `${plot.depth}'`;
  const imgs = plot.images || [];

  const [form, setForm]       = useState({ name: clientUser?.name||'', phone: clientUser?.phone||'', email: clientUser?.email||'', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => {
      submitLead({ ...form, plotSize: `${sqY} Sq Yds`, plotId: plot.id,
        plotNo: `Plot ${plot.seqNo}`, source: 'layout_plan',
        message: form.message || `Interested in Plot ${plot.seqNo} (${plot.width}'×${plot.depth}', ${sqY} Sq Yds)` });
      if (isAdmin) onUpdate(plot.id, { status: 'booked', bookedBy: { ...form, enquiredAt: new Date().toISOString() } });
      setSent(true); setLoading(false);
    }, 800);
  };

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.92)' }} onClick={onClose}>
      <div className="relative bg-[#0d0d1a] border border-orange-500/30 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        <div className="bg-[#0a0a14] border-b border-orange-500/20 px-6 py-5 flex items-center justify-between sticky top-0 z-10 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: st.fill+'22', border: `1.5px solid ${st.fill}` }}>
              <span className="font-black text-xl" style={{ color: st.fill }}>{plot.seqNo}</span>
            </div>
            <div>
              <p className="text-white font-black text-lg" style={{ fontFamily: 'Playfair Display,serif' }}>Plot No. {plot.seqNo}</p>
              <p className="text-gray-400 text-xs">{plot.facing} Facing · {dimW} × {dimD}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1"><X size={22}/></button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-black text-sm px-4 py-1.5 rounded-full border"
              style={{ background: st.fill+'22', color: st.fill, borderColor: st.fill+'66' }}>● {st.label}</span>
            {isAdmin && (
              <div className="flex gap-2">
                {['available','booked','sold'].map(s => (
                  <button key={s} onClick={() => onUpdate(plot.id, { status: s })}
                    className="text-xs px-3 py-1.5 rounded-full border font-bold transition-all"
                    style={plot.status === s
                      ? { background: STATUS[s].fill+'22', color: STATUS[s].fill, borderColor: STATUS[s].fill+'66' }
                      : { borderColor: '#374151', color: '#6b7280' }}>
                    {STATUS[s].label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              ['Plot No.',   plot.seqNo],
              ['Sq. Yards',  `${sqY} Sq.Yards`],
              ['Width',      dimW],
              ['Depth',      dimD],
              ['Sq. Feet',   `${sqFt} Sq.Ft`],
              ['Facing',     `${plot.facing} Facing`],
              ['RERA No.',   'P01100010688'],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#0a0a14] border border-orange-500/10 rounded-xl px-4 py-3">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className="text-orange-400 font-bold text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Plot images (uploaded from admin) */}
          {imgs.length > 0 && (
            <div>
              <p className="text-gray-500 text-[11px] uppercase tracking-wide font-semibold mb-2">Plot Photos</p>
              <div className="flex flex-wrap gap-2">
                {imgs.map((src, i) => (
                  <img key={i} src={src} alt={`Plot ${plot.seqNo}`}
                    className="w-24 h-24 object-cover rounded-xl border border-orange-500/15 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(src, '_blank')}
                  />
                ))}
              </div>
            </div>
          )}

          {plot.status === 'sold' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
              <p className="text-red-400 font-bold">This plot has been sold.</p>
            </div>
          )}

          {(plot.status === 'available' || plot.status === 'booked') && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-orange-500/20"/>
                <p className="text-orange-400 text-xs font-bold tracking-widest uppercase">
                  {plot.status === 'booked' ? 'Join Waitlist' : 'Book This Plot'}
                </p>
                <div className="h-px flex-1 bg-orange-500/20"/>
              </div>
              {sent ? (
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <CheckCircle size={32} className="text-green-400 mx-auto mb-3"/>
                  <p className="text-white font-bold mb-1">Enquiry Submitted!</p>
                  <p className="text-gray-400 text-sm">Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {[
                    { icon: <User size={14}/>,  ph: 'Full Name *',    key: 'name',  type: 'text',  req: true  },
                    { icon: <Phone size={14}/>, ph: 'Phone Number *', key: 'phone', type: 'tel',   req: true  },
                    { icon: <Mail size={14}/>,  ph: 'Email Address',  key: 'email', type: 'email', req: false },
                  ].map(f => (
                    <div key={f.key} className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{f.icon}</span>
                      <input type={f.type} required={f.req} placeholder={f.ph}
                        value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                        className="w-full h-11 bg-[#0a0a14] border border-orange-500/20 rounded-xl pl-9 pr-4 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-500"/>
                    </div>
                  ))}
                  <textarea placeholder="Message (optional)" rows={2} value={form.message}
                    onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                    className="w-full bg-[#0a0a14] border border-orange-500/20 rounded-xl px-4 py-3 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-500 resize-none"/>
                  <button type="submit" disabled={loading}
                    className="btn-gold w-full py-3 rounded-xl text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-50">
                    {loading ? <span className="animate-spin text-lg">⟳</span> : <><Send size={15}/> Submit Enquiry</>}
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

// ── Main Page ──────────────────────────────────────────────────────────────
export default function LayoutPlan() {
  const { adminUser } = useAuth();
  const { plots, updatePlot } = usePlots();
  const [selected, setSelected]         = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch]             = useState('');

  const counts = {
    total:     plots.length,
    available: plots.filter(p => p.status === 'available').length,
    booked:    plots.filter(p => p.status === 'booked').length,
    sold:      plots.filter(p => p.status === 'sold').length,
  };

  const visible = plots.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      const sqY = Math.round((p.width * p.depth) / 9);
      return (
        String(p.seqNo).includes(q) ||
        p.facing.toLowerCase().includes(q) ||
        String(sqY).includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#0d0d1a] min-h-screen pb-24">

      {/* ── Header ── */}
      <section className="relative py-12 px-4 text-center border-b border-orange-500/10 bg-[#070710] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }}/>
        <div className="relative z-10">
          <p className="text-orange-400 text-[10px] tracking-[5px] uppercase font-bold mb-3">DTCP Approved · 93 Plots</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display,serif' }}>
            Plot <span className="text-orange-400">Availability</span>
          </h1>
          <p className="text-gray-400 text-sm mb-1">ABIVYA GROUP · NIMZ CITY · LP No. 102/2025/H · Sy.No. 65/P, Venkatapur</p>
          <p className="text-green-400 text-xs font-semibold tracking-wide">✓ RERA Regd. No. P01100010688</p>
        </div>
      </section>

      <div className="px-4 sm:px-8 lg:px-12 py-10 max-w-screen-xl mx-auto">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Plots', value: counts.total,     color: '#f97316', bg: 'border-orange-500/20' },
            { label: 'Available',   value: counts.available, color: '#22c55e', bg: 'border-green-500/20'  },
            { label: 'Booked',      value: counts.booked,    color: '#eab308', bg: 'border-yellow-500/20' },
            { label: 'Sold',        value: counts.sold,      color: '#ef4444', bg: 'border-red-500/20'    },
          ].map(s => (
            <div key={s.label} className={`bg-[#0a0a14] border ${s.bg} rounded-2xl p-5 text-center`}>
              <p className="text-4xl font-black mb-1" style={{ color: s.color, fontFamily: 'Playfair Display,serif' }}>{s.value}</p>
              <p className="text-gray-500 text-xs font-semibold tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Filters + Search ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          {/* Status filter pills */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilterStatus('all')}
              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                filterStatus === 'all' ? 'bg-orange-500/20 border-orange-500/50 text-orange-300' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>
              All ({counts.total})
            </button>
            {Object.entries(STATUS).map(([key, val]) => (
              <button key={key} onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
                className="text-xs font-bold px-4 py-2 rounded-full border transition-all"
                style={{
                  background:  filterStatus === key ? val.fill+'22' : 'transparent',
                  borderColor: filterStatus === key ? val.fill+'77' : '#374151',
                  color:       filterStatus === key ? val.fill : '#6b7280',
                }}>
                {val.label} ({counts[key]})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative sm:ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
            <input
              placeholder="Search plot no / facing / area…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-9 w-full sm:w-56 bg-[#0a0a14] border border-white/10 rounded-full pl-9 pr-4 text-white text-xs focus:border-orange-500/50 focus:outline-none placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* ── Plot Rows ── */}
        <div className="space-y-3">
          {visible.map((plot, idx) => {
            const sqY  = plot.sqYards ?? Math.round((plot.width * plot.depth) / 9);
            const sqFt = plot.width * plot.depth;
            const st   = STATUS[plot.status];
            const dimW = plot.dimW ?? `${plot.width}'`;
            const dimD = plot.dimD ?? `${plot.depth}'`;

            return (
              <div key={plot.id}
                className="bg-[#0a0a14] border border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-orange-500/20 transition-all">

                {/* Plot number badge */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center"
                  style={{ background: st.fill+'18', border: `1.5px solid ${st.fill}44` }}>
                  <span className="text-xs text-gray-500 font-semibold leading-none mb-0.5">Plot</span>
                  <span className="font-black text-xl leading-none" style={{ color: st.fill }}>{plot.seqNo}</span>
                </div>

                {/* Main info */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2">

                  {/* Area */}
                  <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Area</p>
                    <p className="text-white font-black text-lg leading-none">{sqY}
                      <span className="text-gray-400 text-xs font-semibold ml-1">Sq.Yards</span>
                    </p>
                    <p className="text-gray-600 text-xs mt-0.5">{sqFt} Sq.Ft</p>
                  </div>

                  {/* Dimensions */}
                  <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Dimensions</p>
                    <p className="text-orange-400 font-black text-base leading-none">{dimW}</p>
                    <p className="text-gray-500 text-xs">× {dimD}</p>
                  </div>

                  {/* Facing */}
                  <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Facing</p>
                    <p className="text-gray-200 font-bold text-sm">{plot.facing ?? plot.facing}</p>
                    <p className="text-gray-600 text-xs">Facing</p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider font-semibold mb-1">Status</p>
                    <span className="text-xs font-black px-3 py-1 rounded-full"
                      style={{ background: st.fill+'22', color: st.fill, border: `1px solid ${st.fill}44` }}>
                      ● {st.label}
                    </span>
                  </div>
                </div>

                {/* Enquire button */}
                <div className="flex-shrink-0">
                  {plot.status !== 'sold' ? (
                    <button
                      onClick={() => setSelected(plot)}
                      className="btn-gold px-6 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase w-full sm:w-auto">
                      {plot.status === 'booked' ? 'Waitlist' : 'Enquire'}
                    </button>
                  ) : (
                    <span className="text-gray-700 text-xs font-semibold px-6 py-2.5 rounded-xl border border-gray-800 block text-center">
                      Sold
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {visible.length === 0 && (
            <div className="text-center py-16 text-gray-600">
              <p className="text-lg font-semibold mb-1">No plots found</p>
              <p className="text-sm">Try adjusting your filter or search</p>
            </div>
          )}
        </div>

        {/* Showing count */}
        {visible.length > 0 && (
          <p className="text-center text-gray-700 text-xs mt-6">
            Showing {visible.length} of {plots.length} plots
          </p>
        )}

        {/* ── CTA ── */}
        <div className="mt-14 bg-orange-500 rounded-2xl p-10 text-center">
          <p className="text-orange-100 text-[10px] tracking-[4px] uppercase font-bold mb-3">Limited Availability</p>
          <h3 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Playfair Display,serif' }}>
            {counts.available} Plots Still Available
          </h3>
          <p className="text-orange-100 text-sm mb-8">Spot Registration · Bank Loan Available · DTCP Approved</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-black px-8 py-3 rounded-xl text-sm tracking-wider uppercase hover:bg-orange-50 transition-colors shadow-lg">
              <Phone size={15}/> Book a Site Visit
            </Link>
            <Link to="/gallery"
              className="inline-flex items-center gap-2 bg-orange-600/80 text-white font-black px-8 py-3 rounded-xl text-sm tracking-wider uppercase hover:bg-orange-700 transition-colors border border-white/20">
              View Gallery <ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <PlotModal
          plot={plots.find(p => p.id === selected.id)}
          onClose={() => setSelected(null)}
          onUpdate={(id, upd) => { updatePlot(id, upd); setSelected(p => ({ ...p, ...upd })); }}
          isAdmin={!!adminUser}
        />
      )}
    </div>
  );
}
