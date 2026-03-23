import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FileText, Clock, CheckCircle, Phone, ArrowRight,
  User, LogOut, MapPin, Building2, CalendarDays, MessageSquare,
  Home, TrendingUp, Star, ChevronRight
} from 'lucide-react';

const STATUS_CONFIG = {
  new:          { label: 'New',                  cls: 'bg-blue-500/20 text-blue-300 border-blue-500/30',       dot: 'bg-blue-400',    step: 1 },
  contacted:    { label: 'Contacted',            cls: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', dot: 'bg-yellow-400',  step: 2 },
  'site-visit': { label: 'Site Visit Scheduled', cls: 'bg-purple-500/20 text-purple-300 border-purple-500/30', dot: 'bg-purple-400',  step: 3 },
  closed:       { label: 'Closed',               cls: 'bg-green-500/20 text-green-300 border-green-500/30',    dot: 'bg-green-400',   step: 4 },
};

const STEPS = ['New', 'Contacted', 'Site Visit', 'Closed'];

function ProgressBar({ status }) {
  const step = STATUS_CONFIG[status]?.step ?? 1;
  return (
    <div className="flex items-center gap-1 mt-3">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className={`w-full h-1 rounded-full transition-all ${i < step ? 'bg-orange-500' : 'bg-white/10'}`} />
        </div>
      ))}
    </div>
  );
}

export default function MyInquiries() {
  const { clientUser, getClientLeads, clientLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientUser) navigate('/client-login');
  }, [clientUser, navigate]);

  if (!clientUser) return null;

  const myLeads = getClientLeads(clientUser.email);

  return (
    <div className="bg-[#0d0d1a] min-h-screen pb-24 w-full">

      {/* ══ HERO HEADER ══ */}
      <section
        className="relative py-12 sm:py-16 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #070714 0%, #0d0d1a 55%, #110800 100%)' }}
      >
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-orange-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-4 py-1.5 rounded-full mb-5">
            <Home size={10} className="text-orange-400" />
            <span className="text-orange-400 text-[10px] font-black tracking-[3px] uppercase">Client Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            My <span className="text-orange-400">Enquiries</span>
          </h1>
          <p className="text-gray-500 text-xs flex items-center justify-center gap-1.5 mb-8">
            <MapPin size={11} className="text-orange-400" />
            NIMZ CITY · Kohir, Sangareddy
          </p>

          {/* User info card */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-600/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-orange-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm leading-tight">{clientUser.name}</p>
              <p className="text-gray-500 text-xs">{clientUser.email}</p>
            </div>
            <div className="w-px h-8 bg-white/10 mx-1" />
            <button
              onClick={() => { clientLogout(); navigate('/'); }}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors group"
            >
              <LogOut size={12} className="group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </section>

      <div className="max-w-3xl mx-auto px-4 pt-8">

        {/* ══ STATS ══ */}
        {myLeads.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
            {[
              {
                label: 'Total',
                value: myLeads.length,
                icon: FileText,
                color: 'text-orange-400',
                bg: 'from-orange-500/15 to-orange-600/5',
                border: 'border-orange-500/20',
                glow: 'shadow-orange-500/10',
              },
              {
                label: 'In Progress',
                value: myLeads.filter(l => l.status !== 'closed').length,
                icon: TrendingUp,
                color: 'text-blue-400',
                bg: 'from-blue-500/15 to-blue-600/5',
                border: 'border-blue-500/20',
                glow: 'shadow-blue-500/10',
              },
              {
                label: 'Completed',
                value: myLeads.filter(l => l.status === 'closed').length,
                icon: CheckCircle,
                color: 'text-green-400',
                bg: 'from-green-500/15 to-green-600/5',
                border: 'border-green-500/20',
                glow: 'shadow-green-500/10',
              },
            ].map(s => (
              <div
                key={s.label}
                className={`relative bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 text-center shadow-lg ${s.glow} overflow-hidden`}
              >
                <div className={`w-10 h-10 rounded-xl border ${s.border} bg-white/5 flex items-center justify-center`}>
                  <s.icon size={17} className={s.color} />
                </div>
                <p className={`text-2xl sm:text-3xl font-black leading-none ${s.color}`}>{s.value}</p>
                <p className="text-gray-500 text-[10px] tracking-widest uppercase font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ══ EMPTY STATE ══ */}
        {myLeads.length === 0 ? (
          <div className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {/* Visual hero */}
            <div
              className="relative h-40 sm:h-52 flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0f0f2e 0%, #0d1a2e 50%, #120800 100%)' }}
            >
              {/* Subtle property image */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=60')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#111827]" />

              {/* Floating decorative circles */}
              <div className="absolute top-6 left-10 w-16 h-16 rounded-full border border-orange-500/10 opacity-50" />
              <div className="absolute bottom-10 right-8 w-24 h-24 rounded-full border border-orange-500/8 opacity-40" />

              <div className="relative z-10 text-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500/25 to-orange-600/10 border border-orange-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/20">
                  <Building2 size={38} className="text-orange-400" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-10 pt-6 text-center">
              <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-4">
                <Star size={10} className="text-orange-400" />
                <span className="text-orange-400 text-[10px] font-bold tracking-widest uppercase">Premium Villa Plots</span>
              </div>
              <h3 className="text-white font-black text-2xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                No Enquiries Yet
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                You haven't submitted any enquiries. Browse NIMZ CITY villa plots and connect with us — our team responds within 24 hours.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                  { icon: '✅', text: 'Spot Registration' },
                  { icon: '🏦', text: 'Bank Loan Available' },
                  { icon: '📋', text: 'DTCP Approved' },
                  { icon: '🏛️', text: 'RERA Regd. No. P01100010688' },
                  { icon: '🏠', text: 'Free Site Visit' },
                ].map(f => (
                  <span key={f.text} className="bg-[#0d0d1a] border border-white/10 text-gray-300 text-xs px-3.5 py-1.5 rounded-full font-medium hover:border-orange-500/30 transition-colors">
                    {f.icon} {f.text}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase shadow-lg shadow-orange-500/20"
                >
                  Submit Enquiry <ArrowRight size={15} />
                </Link>
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-all"
                >
                  View Plots <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </div>

        ) : (

          /* ══ ENQUIRY CARDS ══ */
          <div className="space-y-4">
            {myLeads.map((lead, idx) => {
              const status = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
              return (
                <div
                  key={lead.id}
                  className="group bg-[#111827] border border-white/8 rounded-2xl overflow-hidden hover:border-orange-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5"
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/5 bg-gradient-to-r from-white/2 to-transparent">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400 font-black text-sm">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate">{lead.name}</p>
                        <p className="text-gray-500 text-[11px] flex items-center gap-1 mt-0.5">
                          <CalendarDays size={10} />
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border flex-shrink-0 ${status.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status.dot}`} />
                      {status.label}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="px-5 pt-3 pb-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4].map(step => (
                        <div
                          key={step}
                          className={`flex-1 h-1 rounded-full transition-all duration-500 ${step <= status.step ? 'bg-orange-500' : 'bg-white/8'}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {['New', 'Contacted', 'Site Visit', 'Closed'].map((s, i) => (
                        <span key={s} className={`text-[9px] font-bold tracking-wide ${i + 1 <= status.step ? 'text-orange-400/70' : 'text-gray-700'}`}>{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Detail grid */}
                  <div className="grid grid-cols-3 divide-x divide-white/5 mt-1 sm:mt-2">
                    <div className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                      <p className="text-gray-600 text-[9px] uppercase tracking-widest font-bold mb-1.5">Phone</p>
                      <p className="text-gray-200 text-xs font-semibold">{lead.phone}</p>
                    </div>
                    <div className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                      <p className="text-gray-600 text-[9px] uppercase tracking-widest font-bold mb-1.5">Plot Size</p>
                      <p className="text-orange-400 text-xs font-bold">{lead.plotSize || '—'}</p>
                    </div>
                    <div className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                      <p className="text-gray-600 text-[9px] uppercase tracking-widest font-bold mb-1.5">Source</p>
                      <p className="text-gray-200 text-xs font-semibold capitalize">{(lead.source || 'contact').replace(/_/g, ' ')}</p>
                    </div>
                  </div>

                  {/* Message */}
                  {lead.message && (
                    <div className="px-5 py-3 border-t border-white/5 flex items-start gap-2.5 bg-white/[0.015]">
                      <MessageSquare size={12} className="text-orange-400/50 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-400 text-xs leading-relaxed italic">{lead.message}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom CTA */}
            <div
              className="relative rounded-2xl p-5 sm:p-7 text-center border border-orange-500/20 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #140800 0%, #0d0d1a 60%, #070712 100%)' }}
            >
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-20 bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4">
                  <Phone size={20} className="text-orange-400" />
                </div>
                <p className="text-white font-black text-lg mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Need Help or Another Plot?
                </p>
                <p className="text-gray-500 text-sm mb-5">Responds within 24 hours · Free site visit included</p>
                <Link
                  to="/contact"
                  className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold tracking-widest uppercase shadow-lg shadow-orange-500/20"
                >
                  <Phone size={13} />
                  New Enquiry
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
