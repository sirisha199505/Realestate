import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { api } from '../api';

const ADMIN_WHATSAPP = '919996999872';

const inputCls =
  'w-full h-11 bg-[#0a0a14] border border-white/10 rounded-xl px-4 text-white text-sm ' +
  'placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 ' +
  'focus:ring-orange-500/20 transition-all duration-200';

const selectCls =
  'w-full h-11 bg-[#0a0a14] border border-white/10 rounded-xl px-4 text-sm text-white ' +
  'focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ' +
  'transition-all duration-200 appearance-none cursor-pointer';

function Label({ text, required }) {
  return (
    <label className="block text-gray-400 text-[10px] font-semibold tracking-widest uppercase mb-1.5">
      {text}{required && <span className="text-orange-400 ml-1">*</span>}
    </label>
  );
}

function WhatsAppIcon({ className = 'w-8 h-8' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={`${className} fill-white`}>
      <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.72.7 5.28 1.93 7.5L.5 31.5l8.27-1.9A15.45 15.45 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.14 13.14 0 01-6.7-1.84l-.48-.28-4.91 1.13 1.17-4.77-.32-.5A13.2 13.2 0 1116 28.8zm7.26-9.86c-.4-.2-2.36-1.16-2.72-1.3-.37-.13-.63-.2-.9.2s-1.03 1.3-1.27 1.57c-.23.27-.46.3-.86.1a10.83 10.83 0 01-3.19-1.97 11.96 11.96 0 01-2.21-2.75c-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68h-.76c-.27 0-.7.1-1.06.5-.37.4-1.4 1.37-1.4 3.33s1.43 3.86 1.63 4.13c.2.27 2.82 4.3 6.83 6.03.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.36-.96 2.7-1.9.33-.92.33-1.71.23-1.87-.1-.17-.36-.27-.76-.47z"/>
    </svg>
  );
}

function buildWhatsAppText(form) {
  const lines = [
    `Hello! I'm interested in NIMZ CITY plots.`,
    ``,
    `*Name:* ${form.name}`,
    `*Phone:* ${form.phone}`,
    `*Plot Size:* ${form.plotSize}`,
  ];
  if (form.message) lines.push(`*Message:* ${form.message}`);
  return encodeURIComponent(lines.join('\n'));
}

export default function WhatsAppPopup() {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [form,    setForm]    = useState({ name: '', phone: '', plotSize: '', message: '' });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setError('');
      setForm({ name: '', phone: '', plotSize: '', message: '' });
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim())  return setError('Please enter your full name.');
    if (!form.phone.trim()) return setError('Please enter your phone number.');
    if (!form.plotSize)     return setError('Please select a plot size.');

    setLoading(true);

    // Save to backend for admin dashboard (fire-and-forget — don't block WhatsApp opening)
    api.submitEnquiry({ ...form, source: 'whatsapp_popup' }).catch(() => {});

    // Open admin WhatsApp with client details pre-filled
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${buildWhatsAppText(form)}`, '_blank');

    setLoading(false);
    handleClose();
  };

  return (
    <>
      {/* Floating WhatsApp button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#1ebe57] transition-colors"
        aria-label="Enquire on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Modal */}
          <div
            className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366]/15 to-transparent border-b border-white/8 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#25D366]/30">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-black text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                  WhatsApp Enquiry
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">Fill your details — we'll open a chat with our team</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="p-5 flex flex-col gap-4">

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label text="Full Name" required />
                  <input
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <Label text="Phone" required />
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+91 XXXXX"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <Label text="Plot Size Interest" required />
                <div className="relative">
                  <select value={form.plotSize} onChange={set('plotSize')} className={selectCls}>
                    <option value="" disabled>Select plot size</option>
                    {['100 Sq Yds', '150 Sq Yds', '200 Sq Yds', '250 Sq Yds', '300 Sq Yds', 'Not Sure'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label text="Message" />
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Any questions or preferred time for a site visit..."
                  rows={3}
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-xl px-4 py-3 text-white
                             text-sm placeholder:text-gray-500 focus:outline-none focus:border-orange-500
                             focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-2.5">
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black
                           tracking-wider uppercase bg-[#25D366] hover:bg-[#1ebe57] text-white transition-colors
                           shadow-lg shadow-[#25D366]/25 disabled:opacity-50"
              >
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><WhatsAppIcon className="w-4 h-4" /> Send on WhatsApp</>
                }
              </button>

              <p className="text-gray-600 text-[11px] text-center">
                This will open WhatsApp with your details sent to our team.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
