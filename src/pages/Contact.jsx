import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { propertyInfo } from '../data/propertyData';
import {
  Phone, Mail, MapPin, Clock, CheckCircle, Send, ChevronDown, ArrowRight,
} from 'lucide-react';

const inputCls =
  'w-full h-12 bg-[#0a0a14] border border-white/10 rounded-lg px-4 text-white text-sm ' +
  'placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 ' +
  'focus:ring-orange-500/20 transition-all duration-200';

const selectCls =
  'w-full h-12 bg-[#0a0a14] border border-white/10 rounded-lg px-4 text-sm ' +
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
  const { submitLead, clientUser } = useAuth();
  const { contact } = propertyInfo;

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

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      submitLead(form);
      setSubmitted(true);
      setLoading(false);
    }, 900);
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
      <div className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ══ LEFT — Contact Info ══ */}
          <div className="flex flex-col gap-6">

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
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
                    className="flex items-start gap-4 bg-[#111827] border border-white/8 rounded-xl p-4
                               hover:border-orange-500/40 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-orange-500/10 border border-orange-500/20
                                    flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">{item.label}</p>
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
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-xl p-5">
              <p className="text-orange-400 text-xs font-bold tracking-[3px] uppercase mb-4">Why Choose Us</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {[
                  'Free site visit arrangement',
                  'No hidden charges ever',
                  'Bank loan assistance',
                  'Spot registration available',
                  'Legal documentation support',
                  'Expert investment guidance',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-orange-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ RIGHT — Enquiry Form ══ */}
          <div className="flex flex-col gap-4">
            {submitted ? (
              <div className="bg-[#111827] border border-green-500/30 rounded-2xl p-10 sm:p-14 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/30
                                flex items-center justify-center mx-auto mb-5">
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
                  className="btn-gold px-8 py-3 rounded-lg text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2"
                >
                  Submit Another <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                {/* Form header bar */}
                <div className="bg-gradient-to-r from-orange-500/10 to-transparent border-b border-white/8 px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
                    <Send size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Send an Enquiry
                    </h2>
                    <p className="text-gray-500 text-xs">We respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label text="Full Name" required />
                      <input
                        name="name"
                        value={form.name}
                        onChange={set('name')}
                        required
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
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Email + Plot Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          required
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
                      className="w-full bg-[#0a0a14] border border-white/10 rounded-lg px-4 py-3 text-white
                                 text-sm placeholder:text-gray-500 focus:outline-none focus:border-orange-500
                                 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Trust tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Free Site Visit', 'Spot Registration', 'Bank Loan', 'Legal Support'].map(tag => (
                      <span
                        key={tag}
                        className="bg-orange-500/8 border border-orange-500/20 text-orange-300 text-[10px] font-semibold px-3 py-1 rounded-full"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full py-3.5 rounded-lg text-sm font-black tracking-widest uppercase
                               flex items-center justify-center gap-2 disabled:opacity-50"
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
            )}

            {/* Quick contact buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-3 bg-[#111827] border border-white/10
                           hover:border-orange-500/40 rounded-xl px-4 py-3.5 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center
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
                           hover:border-orange-500/40 rounded-xl px-4 py-3.5 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center
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
      <div className="border-t border-white/8 py-8 px-4 text-center">
        <p className="text-orange-400 text-[10px] font-bold tracking-[4px] uppercase mb-2">Registered Office</p>
        <p className="text-white font-bold text-sm mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
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
