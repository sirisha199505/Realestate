import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { propertyInfo } from '../data/propertyData';
import {
  Phone, Mail, MapPin, Clock, CheckCircle, Send, ChevronDown, ArrowRight, Lock, UserPlus,
} from 'lucide-react';

const inputCls =
  'w-full h-12 bg-[#0a0a14] border border-white/10 rounded-xl px-4 text-white text-sm ' +
  'placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 ' +
  'focus:ring-orange-500/20 transition-all duration-200';

const selectCls =
  'w-full h-12 bg-[#0a0a14] border border-white/10 rounded-xl px-4 text-sm ' +
  'focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ' +
  'transition-all duration-200 appearance-none text-white cursor-pointer';

function Label({ text, required }) {
  return (
    <label className="block text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">
      {text}{required && <span className="text-orange-400 ml-1">*</span>}
    </label>
  );
}

export default function Contact() {
  const { clientUser } = useAuth();
  const { contact } = propertyInfo;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:     clientUser?.name  || '',
    email:    clientUser?.email || '',
    phone:    clientUser?.phone || '',
    plotSize: '',
    message:  '',
    source:   'contact_page',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Pre-fill form when clientUser loads from localStorage (async on mount)
  useEffect(() => {
    if (clientUser) {
      setForm(f => ({
        ...f,
        name:  f.name  || clientUser.name  || '',
        email: f.email || clientUser.email || '',
        phone: f.phone || clientUser.phone || '',
      }));
    }
  }, [clientUser]);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Manual validation — gives clear inline feedback instead of browser tooltips
    if (!form.name.trim())  return setSubmitError('Please enter your full name.');
    if (!form.phone.trim()) return setSubmitError('Please enter your phone number.');
    if (!form.plotSize)     return setSubmitError('Please select a plot size.');

    setLoading(true);
    try {
      await api.submitEnquiry(form);
      // Also save to localStorage so the client can view it in My Inquiries
      const stored = JSON.parse(localStorage.getItem('abivya_leads') || '[]');
      stored.push({ id: Date.now().toString(), ...form, status: 'new', createdAt: new Date().toISOString() });
      localStorage.setItem('abivya_leads', JSON.stringify(stored));
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Submission failed. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d0d1a] min-h-screen w-full">

      {/* ── Hero Banner ── */}
      <section
        className="relative flex items-center justify-center px-4 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a]/90 via-[#0d0d1a]/80 to-[#0d0d1a]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 w-full max-w-2xl mx-auto pt-8 pb-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-5 py-2 rounded-full">
            <Phone size={12} className="text-orange-400" />
            <span className="text-orange-400 text-[11px] font-black tracking-[3px] uppercase">Get In Touch</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Contact <span className="text-orange-400">Us</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Book a free site visit or enquire about NIMZ CITY plots.
            Our team responds within 24 hours.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </section>

      {/* ── Main Content ── */}
      <div className="px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ══ LEFT — Contact Info ══ */}
          <div className="flex flex-col gap-7">

            {/* Heading */}
            <div>
              <p className="text-orange-400 text-xs font-bold tracking-[4px] uppercase mb-3">Abivya Group</p>
              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-3 leading-snug"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                We're Here to <span className="text-orange-400">Help You</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Reach out for plot enquiries, site visits, pricing, or any questions about NIMZ CITY.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                {
                  icon: <Phone size={18} className="text-orange-400" />,
                  label: 'Call Us',
                  lines: contact.phones,
                  href: `tel:${contact.phones[0].replace(/\s/g, '')}`,
                },
                {
                  icon: <Mail size={18} className="text-orange-400" />,
                  label: 'Email',
                  lines: [contact.email],
                  href: `mailto:${contact.email}`,
                },
                {
                  icon: <Clock size={18} className="text-orange-400" />,
                  label: 'Working Hours',
                  lines: [contact.officeHours],
                },
                {
                  icon: <MapPin size={18} className="text-orange-400" />,
                  label: 'Office Address',
                  lines: ['Flat No 102, Serenade Apartment,', 'Road No 69, Jubilee Hills, Hyderabad.'],
                },
              ].map((item) => {
                const card = (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 bg-[#111827] border border-white/8 rounded-xl p-5
                               hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5
                               transition-all duration-200 group"
                  >
                    <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-orange-500/10 border border-orange-500/20
                                    flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1.5">{item.label}</p>
                      {item.lines.map((line, i) => (
                        <p key={i} className="text-white text-sm font-medium leading-snug break-all">{line}</p>
                      ))}
                    </div>
                  </div>
                );
                return item.href
                  ? <a key={item.label} href={item.href}>{card}</a>
                  : <div key={item.label}>{card}</div>;
              })}
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-xl p-6">
              <p className="text-orange-400 text-xs font-bold tracking-[3px] uppercase mb-5">Why Choose Us</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {[
                  'Free site visit arrangement',
                  'No hidden charges ever',
                  'Bank loan assistance',
                  'Spot registration available',
                  'Legal documentation support',
                  'Expert investment guidance',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-lg px-4 py-2.5">
                    <CheckCircle size={15} className="text-orange-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ RIGHT — Enquiry Form ══ */}
          <div className="flex flex-col gap-5">

            {/* ── Login Gate ── */}
            {!clientUser && (
              <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500/10 to-transparent border-b border-white/8 px-6 py-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
                    <Lock size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Login to Send Enquiry
                    </h2>
                    <p className="text-gray-500 text-xs mt-0.5">Create a free account to get started</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Lock size={32} className="text-orange-400" />
                  </div>

                  <div>
                    <h3 className="text-white font-black text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Members Only Access
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                      Please login or create a free account to view plot details and submit your enquiry.
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-3">
                    <button
                      onClick={() => navigate('/client-login', { state: { from: '/contact', mode: 'login' } })}
                      className="btn-gold w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25"
                    >
                      <ArrowRight size={16} /> Login to Enquire
                    </button>
                    <button
                      onClick={() => navigate('/client-login', { state: { from: '/contact', mode: 'register' } })}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold border border-white/10 text-gray-300 hover:text-white hover:border-orange-500/40 transition-all"
                    >
                      <UserPlus size={16} className="text-orange-400" /> Create Free Account
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-1">
                    {['Free Registration', 'No Spam', 'Instant Access'].map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <CheckCircle size={11} className="text-orange-400" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Enquiry Form (only when logged in) ── */}
            {clientUser && (submitted ? (
              <div className="bg-[#111827] border border-green-500/30 rounded-2xl p-10 sm:p-14 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/30
                                flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-green-400" />
                </div>
                <h3
                  className="text-white font-black text-2xl mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Enquiry Submitted!
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                  Thank you! Our team will reach out within 24 hours to arrange your free site visit.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-lg shadow-orange-500/25"
                >
                  Submit Another <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                {/* Form header bar */}
                <div className="bg-gradient-to-r from-orange-500/10 to-transparent border-b border-white/8 px-6 py-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
                    <Send size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Send an Enquiry
                    </h2>
                    <p className="text-gray-500 text-xs mt-0.5">We respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="p-6 flex flex-col gap-5">

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label text="Full Name" required />
                      <input
                        name="name"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your full name"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <Label text="Phone Number" required />
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+91 XXXXX XXXXX"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Email + Plot Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label text="Email Address" />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="your@email.com"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <Label text="Plot Size Interest" required />
                      <div className="relative">
                        <select
                          name="plotSize"
                          value={form.plotSize}
                          onChange={set('plotSize')}
                          className={selectCls}
                        >
                          <option value="" disabled>Select plot size</option>
                          {['100 Sq Yds', '150 Sq Yds', '200 Sq Yds', '250 Sq Yds', '300 Sq Yds', 'Not Sure'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label text="Your Message" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Any questions, requirements, or preferred time for a site visit..."
                      rows={4}
                      className="w-full bg-[#0a0a14] border border-white/10 rounded-xl px-4 py-3.5 text-white
                                 text-sm placeholder:text-gray-500 focus:outline-none focus:border-orange-500
                                 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Error */}
                  {submitError && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3">
                      <span className="text-red-400 text-sm">{submitError}</span>
                    </div>
                  )}

                  {/* Trust tags */}
                  <div className="flex flex-wrap gap-2.5">
                    {['Free Site Visit', 'Spot Registration', 'Bank Loan', 'Legal Support'].map(tag => (
                      <span
                        key={tag}
                        className="bg-orange-500/8 border border-orange-500/20 text-orange-300 text-[10px] font-semibold px-3 py-1.5 rounded-full"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full py-3.5 rounded-xl text-sm font-black tracking-widest uppercase
                               flex items-center justify-center gap-2 disabled:opacity-50
                               shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
                  >
                    {loading
                      ? <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      : <><Send size={16} /> Submit Enquiry</>
                    }
                  </button>

                  <p className="text-gray-600 text-xs text-center">
                    No spam, ever. We'll only contact you regarding your enquiry.
                  </p>
                </form>
              </div>
            ))}

            {/* Quick contact buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-3 bg-[#111827] border border-white/10
                           hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5
                           rounded-xl px-4 py-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center
                                group-hover:bg-orange-500 transition-colors flex-shrink-0">
                  <Phone size={16} className="text-orange-400 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Call Us</p>
                  <p className="text-white font-bold text-xs truncate">{contact.phones[0]}</p>
                </div>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 bg-[#111827] border border-white/10
                           hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5
                           rounded-xl px-4 py-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center
                                group-hover:bg-orange-500 transition-colors flex-shrink-0">
                  <Mail size={16} className="text-orange-400 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Email</p>
                  <p className="text-white font-bold text-xs truncate">{contact.email}</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Address Footer ── */}
      <div className="border-t border-white/8 py-10 px-4 text-center">
        <p className="text-orange-400 text-[10px] font-bold tracking-[4px] uppercase mb-3">Registered Office</p>
        <p className="text-white font-bold text-sm mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          ABIVYA GROUP
        </p>
        <p className="text-gray-500 text-sm leading-relaxed">
          8-2-293/82/HE/82&amp;83, Flat No 102, Serenade Apartment, Road Number 69,<br className="hidden sm:block" />
          Nandagiri Hills, Jubilee Hills, Hyderabad — 500033.
        </p>
      </div>

    </div>
  );
}
