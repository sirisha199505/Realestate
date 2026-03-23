import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { propertyInfo } from '../data/propertyData';
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, ChevronDown } from 'lucide-react';

// ── Reusable styled input ─────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-300 text-xs font-semibold tracking-widest uppercase">
        {label}{required && <span className="text-orange-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full h-12 bg-[#111827] border border-white/10 rounded-xl px-4 text-white text-sm ' +
  'placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 ' +
  'focus:ring-orange-500/20 transition-all duration-200';

const selectCls =
  'w-full h-12 bg-[#111827] border border-white/10 rounded-xl px-4 text-sm ' +
  'focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ' +
  'transition-all duration-200 appearance-none text-white cursor-pointer';

// ── Contact info card ─────────────────────────────────────────────────────
function InfoCard({ icon, label, children, href }) {
  const inner = (
    <div className="flex items-start gap-4 bg-[#111827] border border-white/10 rounded-2xl p-5
                    hover:border-orange-500/40 transition-all duration-200 group">
      <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20
                      flex items-center justify-center flex-shrink-0
                      group-hover:bg-orange-500/20 transition-colors duration-200">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-1">{label}</p>
        {children}
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

export default function Contact() {
  const { submitLead, clientUser } = useAuth();
  const { contact }                = propertyInfo;

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
    <div className="bg-[#0d0d1a] min-h-screen pb-24">

      {/* ── Page header ── */}
      <section
        className="relative py-16 sm:py-20 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #070714 0%, #0d0d1a 55%, #110800 100%)' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-orange-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-4 py-1.5 rounded-full mb-5">
            <Phone size={10} className="text-orange-400" />
            <span className="text-orange-400 text-[10px] font-black tracking-[3px] uppercase">Get In Touch</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Contact <span className="text-orange-400">Us</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Book a free site visit or enquire about NIMZ CITY plots
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </section>

      {/* ── Two-column layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12">

        {/* ── LEFT: Contact details ── */}
        <div>
          <h2
            className="text-2xl font-black text-white mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Reach <span className="text-orange-400">Us</span>
          </h2>

          <div className="flex flex-col gap-4 mb-8">
            {contact.phones.map((p, i) => (
              <InfoCard
                key={p}
                icon={<Phone size={18} className="text-orange-400" />}
                label={i === 0 ? 'Primary Contact' : 'Secondary Contact'}
                href={`tel:${p.replace(/\s/g, '')}`}
              >
                <p className="text-white font-bold text-base">{p}</p>
              </InfoCard>
            ))}

            <InfoCard
              icon={<Mail size={18} className="text-orange-400" />}
              label="Email"
              href={`mailto:${contact.email}`}
            >
              <p className="text-white font-bold text-sm break-all">{contact.email}</p>
            </InfoCard>

            <InfoCard
              icon={<MapPin size={18} className="text-orange-400" />}
              label="Office Address"
            >
              <p className="text-gray-300 text-sm leading-relaxed">{contact.officeAddress}</p>
            </InfoCard>

            <InfoCard
              icon={<Clock size={18} className="text-orange-400" />}
              label="Working Hours"
            >
              <p className="text-white font-semibold text-sm">{contact.officeHours}</p>
            </InfoCard>
          </div>

          {/* Why contact us */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-4 sm:p-6">
            <p className="text-orange-400 text-xs font-bold tracking-[4px] uppercase mb-4">
              Why Contact Us?
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Free site visit arrangement',
                'No hidden charges',
                'Spot registration guidance',
                'Bank loan assistance',
                'Legal documentation support',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={15} className="text-orange-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Enquiry form ── */}
        <div>
          <h2
            className="text-2xl font-black text-white mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Send an <span className="text-orange-400">Enquiry</span>
          </h2>

          {submitted ? (
            <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30
                              flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={30} className="text-green-400" />
              </div>
              <h3
                className="text-white font-bold text-xl mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Enquiry Submitted!
              </h3>
              <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                Thank you! Our team will contact you within 24 hours to arrange a free site visit.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-gold px-7 py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#111827] border border-white/10 rounded-2xl p-5 sm:p-7 lg:p-8 flex flex-col gap-4 sm:gap-5"
            >
              {/* Name + Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field label="Full Name" required>
                  <input
                    name="name"
                    value={form.name}
                    onChange={set('name')}
                    required
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={set('phone')}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* Email */}
              <Field label="Email Address">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="your@email.com"
                  className={inputCls}
                />
              </Field>

              {/* Plot Size select */}
              <Field label="Interested Plot Size" required>
                <div className="relative">
                  <select
                    name="plotSize"
                    value={form.plotSize}
                    onChange={set('plotSize')}
                    required
                    className={selectCls}
                  >
                    <option value="" disabled>Select a plot size</option>
                    {['100 Sq Yds', '150 Sq Yds', '200 Sq Yds', '250 Sq Yds', '300 Sq Yds', 'Not Sure'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              </Field>

              {/* Message */}
              <Field label="Message">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Any questions or special requirements..."
                  rows={4}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3.5 text-white
                             text-sm placeholder:text-gray-500 focus:outline-none focus:border-orange-500
                             focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                />
              </Field>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-gold h-12 rounded-xl text-sm font-bold tracking-widest uppercase
                           flex items-center justify-center gap-2 disabled:opacity-50 mt-1"
              >
                {loading
                  ? <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  : <><Send size={15} /> Submit Enquiry</>
                }
              </button>

              <p className="text-gray-600 text-xs text-center">
                We respond within 24 hours. Spot Registration &amp; Bank Loan available.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
