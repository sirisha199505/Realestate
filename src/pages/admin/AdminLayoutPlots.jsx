import { useState, useRef } from 'react';
import { allPlots, PLOTS_VERSION } from '../../data/layoutData';
import { Pencil, X, Upload, Trash2, Check, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';

const PLOT_STATUS = {
  available: { label: 'Available', color: '#22c55e' },
  booked:    { label: 'Booked',    color: '#eab308' },
  sold:      { label: 'Sold',      color: '#ef4444' },
};

// Compress image to base64 via canvas
function compressImage(file, maxW = 900) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new window.Image();
      img.onload = () => {
        const ratio = Math.min(maxW / img.width, 1);
        const canvas = document.createElement('canvas');
        canvas.width  = Math.round(img.width  * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Load / save helpers
function loadPlots() {
  try {
    const ver   = parseInt(localStorage.getItem('abivya_plots_ver') || '0');
    const saved = localStorage.getItem('abivya_plots');
    if (saved && ver === PLOTS_VERSION) {
      const parsed = JSON.parse(saved);
      if (parsed.length === allPlots.length) return parsed;
    }
    localStorage.setItem('abivya_plots_ver', String(PLOTS_VERSION));
    localStorage.removeItem('abivya_plots');
  } catch { /* ignore */ }
  return allPlots;
}

function loadOverrides() {
  try { return JSON.parse(localStorage.getItem('abivya_plot_overrides') || '{}'); }
  catch { return {}; }
}

function savePlots(plots)  {
  localStorage.setItem('abivya_plots', JSON.stringify(plots));
  localStorage.setItem('abivya_plots_ver', String(PLOTS_VERSION));
}
function saveOverrides(ov) { localStorage.setItem('abivya_plot_overrides', JSON.stringify(ov)); }

// Parse a stored dim string like "56'-9''" or "40'" → { ft, in }
function parseDim(str, fallbackFt = 0) {
  if (!str) return { ft: fallbackFt, in: 0 };
  const m = String(str).match(/^(\d+)'(?:-(\d+)''?)?/);
  if (m) return { ft: parseInt(m[1]) || 0, in: parseInt(m[2]) || 0 };
  const n = parseInt(str);
  return { ft: isNaN(n) ? fallbackFt : n, in: 0 };
}

// Format ft + inches → "56'-9''" or "40'"
function formatDim(ft, inches) {
  const f = parseInt(ft)  || 0;
  const i = parseInt(inches) || 0;
  return i > 0 ? `${f}'-${i}''` : `${f}'`;
}

// ─────────────────────────────────────────────────────────────────────────
export default function AdminLayoutPlots() {
  const [plots,     setPlots]     = useState(loadPlots);
  const [overrides, setOverrides] = useState(loadOverrides);
  const [editing,   setEditing]   = useState(null);   // plot.id being edited
  const [form,      setForm]      = useState({});
  const [search,    setSearch]    = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  // counts for header
  const counts = {
    total:     plots.length,
    available: plots.filter(p => p.status === 'available').length,
    booked:    plots.filter(p => p.status === 'booked').length,
    sold:      plots.filter(p => p.status === 'sold').length,
  };

  // Open edit panel
  const startEdit = plot => {
    const ov  = overrides[plot.id] || {};
    const sqY = Math.round((plot.width * plot.depth) / 9);
    const w   = parseDim(ov.dimW, plot.width);
    const d   = parseDim(ov.dimD, plot.depth);
    setForm({
      widthFt:  w.ft,
      widthIn:  w.in,
      depthFt:  d.ft,
      depthIn:  d.in,
      sqYards:  ov.sqYards ?? sqY,
      facing:   ov.facing  ?? plot.facing,
      status:   plot.status,
    });
    setEditing(plot.id);
  };

  // Save edits
  const saveEdit = plot => {
    // Update status in abivya_plots
    const newPlots = plots.map(p =>
      p.id === plot.id ? { ...p, status: form.status } : p
    );
    setPlots(newPlots);
    savePlots(newPlots);

    // Update overrides
    const newOv = {
      ...overrides,
      [plot.id]: {
        ...(overrides[plot.id] || {}),
        dimW:    formatDim(form.widthFt, form.widthIn),
        dimD:    formatDim(form.depthFt, form.depthIn),
        sqYards: Number(form.sqYards),
        facing:  form.facing,
      },
    };
    setOverrides(newOv);
    saveOverrides(newOv);
    setEditing(null);
  };

  // Upload images for a plot
  const handleImageUpload = async (plotId, files) => {
    setUploading(true);
    const compressed = await Promise.all(Array.from(files).map(f => compressImage(f)));
    const existing   = overrides[plotId]?.images || [];
    const combined   = [...existing, ...compressed];

    const newOv = {
      ...overrides,
      [plotId]: { ...(overrides[plotId] || {}), images: combined },
    };
    setOverrides(newOv);
    saveOverrides(newOv);
    setUploading(false);
  };

  // Delete one image
  const deleteImage = (plotId, idx) => {
    const imgs = [...(overrides[plotId]?.images || [])];
    imgs.splice(idx, 1);
    const newOv = { ...overrides, [plotId]: { ...(overrides[plotId] || {}), images: imgs } };
    setOverrides(newOv);
    saveOverrides(newOv);
  };

  // Filtered plots
  const visible = plots.filter(p => {
    if (!search) return true;
    const q   = search.toLowerCase();
    const ov  = overrides[p.id] || {};
    const sqY = ov.sqYards ?? Math.round((p.width * p.depth) / 9);
    return (
      String(p.seqNo).includes(q) ||
      p.facing.toLowerCase().includes(q) ||
      p.status.includes(q) ||
      String(sqY).includes(q)
    );
  });

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-white font-black text-xl" style={{ fontFamily: 'Playfair Display,serif' }}>
            Layout Plan — 96 Plots
          </h2>
          <p className="text-gray-500 text-xs mt-1">Edit dimensions, sq yards, status and plot images</p>
        </div>
        {/* mini stats */}
        <div className="sm:ml-auto flex gap-3 text-xs font-bold flex-wrap">
          {[['Available', counts.available, '#22c55e'], ['Booked', counts.booked, '#eab308'], ['Sold', counts.sold, '#ef4444']].map(([l, v, c]) => (
            <span key={l} className="px-3 py-1 rounded-full border"
              style={{ background: c+'18', color: c, borderColor: c+'44' }}>
              {l}: {v}
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <input
        placeholder="Search plot no, facing, status, sq yards…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full sm:w-72 h-9 bg-[#0a0a14] border border-white/10 rounded-full px-4 text-white text-xs focus:border-orange-500/50 focus:outline-none placeholder:text-gray-600 mb-5"
      />

      {/* Plot list */}
      <div className="space-y-2">
        {visible.map(plot => {
          const ov    = overrides[plot.id] || {};
          const sqY   = ov.sqYards  ?? Math.round((plot.width * plot.depth) / 9);
          const dimW  = ov.dimW     ?? `${plot.width}'`;
          const dimD  = ov.dimD     ?? `${plot.depth}'`;
          const imgs  = ov.images   || [];
          const st    = PLOT_STATUS[plot.status] || PLOT_STATUS.available;
          const isOpen = editing === plot.id;

          return (
            <div key={plot.id}
              className="bg-[#0a0a14] border border-white/[0.06] rounded-xl overflow-hidden transition-all">

              {/* ── Row ── */}
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Plot badge */}
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex flex-col items-center justify-center"
                  style={{ background: st.color+'18', border: `1.5px solid ${st.color}44` }}>
                  <span className="text-[10px] text-gray-500 leading-none">No.</span>
                  <span className="font-black text-base leading-none" style={{ color: st.color }}>{plot.seqNo}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">Plot {plot.seqNo}
                    <span className="text-gray-600 text-xs font-normal ml-2">{plot.facing} Facing · Block {plot.block}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    <span className="text-orange-400 font-semibold">{sqY} Sq.Yd</span>
                    <span className="mx-1.5 text-gray-700">·</span>
                    {dimW} × {dimD}
                    {imgs.length > 0 && <span className="ml-2 text-blue-400/70"><ImageIcon size={10} className="inline mr-0.5"/>{imgs.length}</span>}
                  </p>
                </div>

                {/* Status pill */}
                <span className="hidden sm:inline text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: st.color+'18', color: st.color, border: `1px solid ${st.color}44` }}>
                  {st.label}
                </span>

                {/* Edit toggle */}
                <button
                  onClick={() => isOpen ? setEditing(null) : startEdit(plot)}
                  className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                    isOpen ? 'bg-orange-500/20 border-orange-500/50 text-orange-300' : 'border-gray-700 text-gray-400 hover:border-orange-500/40 hover:text-orange-400'
                  }`}>
                  {isOpen ? <><ChevronUp size={13}/> Close</> : <><Pencil size={12}/> Edit</>}
                </button>
              </div>

              {/* ── Edit Panel ── */}
              {isOpen && (
                <div className="border-t border-white/[0.05] bg-[#070710] px-4 py-5 space-y-5">

                  {/* Dimensions + Sq Yards + Status */}
                  <div className="space-y-4">

                    {/* Width row */}
                    <div>
                      <label className="text-gray-500 text-[11px] uppercase tracking-wide font-semibold mb-2 block">
                        Width
                        <span className="ml-2 text-orange-400/60 font-normal normal-case tracking-normal">
                          = {formatDim(form.widthFt, form.widthIn)}
                        </span>
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-gray-700 text-[10px] mb-1 block">Feet</label>
                          <input type="number" min="0" placeholder="40"
                            value={form.widthFt}
                            onChange={e => setForm(v => ({ ...v, widthFt: e.target.value }))}
                            className="w-full h-10 bg-[#0d0d1a] border border-orange-500/20 rounded-lg px-3 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-700" />
                        </div>
                        <span className="text-gray-600 text-sm mt-5">ft</span>
                        <div className="flex-1">
                          <label className="text-gray-700 text-[10px] mb-1 block">Inches</label>
                          <input type="number" min="0" max="11" placeholder="0"
                            value={form.widthIn}
                            onChange={e => setForm(v => ({ ...v, widthIn: e.target.value }))}
                            className="w-full h-10 bg-[#0d0d1a] border border-orange-500/20 rounded-lg px-3 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-700" />
                        </div>
                        <span className="text-gray-600 text-sm mt-5">in</span>
                      </div>
                    </div>

                    {/* Depth row */}
                    <div>
                      <label className="text-gray-500 text-[11px] uppercase tracking-wide font-semibold mb-2 block">
                        Depth (Length)
                        <span className="ml-2 text-orange-400/60 font-normal normal-case tracking-normal">
                          = {formatDim(form.depthFt, form.depthIn)}
                        </span>
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-gray-700 text-[10px] mb-1 block">Feet</label>
                          <input type="number" min="0" placeholder="56"
                            value={form.depthFt}
                            onChange={e => setForm(v => ({ ...v, depthFt: e.target.value }))}
                            className="w-full h-10 bg-[#0d0d1a] border border-orange-500/20 rounded-lg px-3 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-700" />
                        </div>
                        <span className="text-gray-600 text-sm mt-5">ft</span>
                        <div className="flex-1">
                          <label className="text-gray-700 text-[10px] mb-1 block">Inches</label>
                          <input type="number" min="0" max="11" placeholder="9"
                            value={form.depthIn}
                            onChange={e => setForm(v => ({ ...v, depthIn: e.target.value }))}
                            className="w-full h-10 bg-[#0d0d1a] border border-orange-500/20 rounded-lg px-3 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-700" />
                        </div>
                        <span className="text-gray-600 text-sm mt-5">in</span>
                      </div>
                    </div>

                    {/* Sq Yards + Facing + Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-gray-500 text-[11px] uppercase tracking-wide font-semibold mb-1 block">Sq. Yards</label>
                        <input type="number" min="0" placeholder="160"
                          value={form.sqYards}
                          onChange={e => setForm(v => ({ ...v, sqYards: e.target.value }))}
                          className="w-full h-10 bg-[#0d0d1a] border border-orange-500/20 rounded-lg px-3 text-white text-sm focus:border-orange-500 focus:outline-none placeholder:text-gray-700" />
                      </div>
                      <div>
                        <label className="text-gray-500 text-[11px] uppercase tracking-wide font-semibold mb-1 block">Facing</label>
                        <select value={form.facing}
                          onChange={e => setForm(v => ({ ...v, facing: e.target.value }))}
                          className="w-full h-10 bg-[#0d0d1a] border border-orange-500/20 rounded-lg px-3 text-white text-sm focus:border-orange-500 focus:outline-none">
                          <option value="East">East Facing</option>
                          <option value="West">West Facing</option>
                          <option value="North">North Facing</option>
                          <option value="South">South Facing</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-500 text-[11px] uppercase tracking-wide font-semibold mb-1 block">Status</label>
                        <select value={form.status}
                          onChange={e => setForm(v => ({ ...v, status: e.target.value }))}
                          className="w-full h-10 bg-[#0d0d1a] border border-orange-500/20 rounded-lg px-3 text-white text-sm focus:border-orange-500 focus:outline-none">
                          <option value="available">Available</option>
                          <option value="booked">Booked</option>
                          <option value="sold">Sold</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-gray-500 text-[11px] uppercase tracking-wide font-semibold">
                        Plot Images ({imgs.length})
                      </label>
                      <label className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                        uploading ? 'border-gray-700 text-gray-600' : 'border-orange-500/40 text-orange-400 hover:bg-orange-500/10'
                      }`}>
                        <Upload size={12}/> {uploading ? 'Uploading…' : 'Add Photos'}
                        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
                          disabled={uploading}
                          onChange={e => handleImageUpload(plot.id, e.target.files)}
                        />
                      </label>
                    </div>

                    {imgs.length === 0 ? (
                      <div className="border border-dashed border-gray-800 rounded-xl p-6 text-center">
                        <ImageIcon size={24} className="text-gray-700 mx-auto mb-2"/>
                        <p className="text-gray-700 text-xs">No images yet. Click "Add Photos" to upload.</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {imgs.map((src, i) => (
                          <div key={i} className="relative group w-24 h-24 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                            <img src={src} alt={`Plot ${plot.seqNo}`}
                              className="w-full h-full object-cover"/>
                            <button
                              onClick={() => deleteImage(plot.id, i)}
                              className="absolute top-1 right-1 bg-red-600/90 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X size={12}/>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 text-[10px] mt-2">Images are compressed and stored locally. Recommended: clear/bright photos of the plot land.</p>
                  </div>

                  {/* Save / Cancel */}
                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={() => saveEdit(plot)}
                      className="btn-gold flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black tracking-wider uppercase">
                      <Check size={15}/> Save Changes
                    </button>
                    <button onClick={() => setEditing(null)}
                      className="text-sm text-gray-500 hover:text-gray-300 px-4 py-2.5 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
