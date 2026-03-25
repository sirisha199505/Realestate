import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Building2, Shield, Eye, EyeOff } from 'lucide-react';

const inputCls =
  'w-full h-12 bg-[#0d0d1a] border border-white/10 rounded-xl px-4 text-white text-sm ' +
  'placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 ' +
  'focus:ring-orange-500/20 transition-all duration-200';

function InputField({ label, name, type = 'text', value, onChange, placeholder, required, rightEl }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
        {label}{required && <span className="text-orange-400 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={inputCls + (rightEl ? ' pr-12' : '')}
        />
        {rightEl && (
          <span className="absolute inset-y-0 right-0 pr-4 flex items-center">{rightEl}</span>
        )}
      </div>
    </div>
  );
}

export default function ClientLogin() {
  const { clientLogin, clientRegister, clientUser } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const returnTo  = location.state?.from || '/my-inquiries';

  const [mode, setMode]   = useState(location.state?.mode || 'login');
  const [form, setForm]   = useState({ name: '', email: '', phone: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientUser) navigate(returnTo, { replace: true });
  }, [clientUser, navigate, returnTo]);

  if (clientUser) return null;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await clientLogin(form.email, form.password);
      } else {
        await clientRegister(form.name, form.email, form.password, form.phone);
      }
      navigate(returnTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passToggle = (
    <button type="button" onClick={() => setShowPass(v => !v)} className="text-gray-500 hover:text-gray-300 transition-colors">
      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );

  return (
    <div className="bg-[#0d0d1a] min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* ── Brand Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/30 mb-6">
            <Building2 size={36} className="text-orange-400" />
          </div>
          <p className="text-orange-400 text-xs tracking-[4px] uppercase font-bold mb-2">Client Portal</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            {mode === 'login'
              ? returnTo === '/contact'
                ? 'Sign in to submit your plot enquiry'
                : 'Sign in to view your submitted enquiries'
              : returnTo === '/contact'
                ? 'Create a free account to submit your plot enquiry'
                : 'Register to track all your NIMZ CITY enquiries'}
          </p>
        </div>

        {/* ── Mode Toggle ── */}
        <div className="flex bg-[#0a0a14] border border-white/10 rounded-xl p-1 mb-8">
          {[
            { key: 'login',    label: 'Login' },
            { key: 'register', label: 'New Account' },
          ].map(m => (
            <button
              key={m.key}
              onClick={() => { setMode(m.key); setError(''); }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                mode === m.key
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* ── Form Card ── */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] border border-white/10 rounded-2xl p-5 sm:p-7 lg:p-8 flex flex-col gap-4 sm:gap-5"
        >
          {mode === 'register' && (
            <InputField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          )}

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />

          {mode === 'register' && (
            <InputField
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
            />
          )}

          <InputField
            label="Password"
            name="password"
            type={showPass ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            rightEl={passToggle}
          />

          {mode === 'register' && (
            <p className="text-gray-600 text-xs -mt-1">Password must be at least 6 characters.</p>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3">
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold h-12 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-50 mt-1"
          >
            {loading
              ? <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              : <>{mode === 'login' ? 'View My Enquiries' : 'Register & Continue'}<ArrowRight size={16} /></>
            }
          </button>

          {mode === 'login' && (
            <p className="text-center text-gray-500 text-xs leading-relaxed">
              Don't have an account?{' '}
              <button type="button" onClick={() => setMode('register')} className="text-orange-400 hover:underline font-medium">
                Register here
              </button>
            </p>
          )}
        </form>

        {/* ── Trust badges ── */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <Shield size={12} className="text-orange-400/60" />
            <span>Secure Login</span>
          </div>
          <div className="w-px h-3 bg-gray-700" />
          <Link to="/contact" className="text-orange-400/80 hover:text-orange-400 transition-colors font-medium">
            Submit an Enquiry →
          </Link>
        </div>

      </div>
    </div>
  );
}
