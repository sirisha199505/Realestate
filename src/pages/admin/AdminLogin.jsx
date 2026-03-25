import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const { adminLogin, adminUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adminUser) navigate('/admin/dashboard');
  }, [adminUser, navigate]);

  if (adminUser) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#0d0d1a]/92" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center mx-auto mb-4">
            <Shield size={36} className="text-orange-400" />
          </div>
          <p className="text-white font-black tracking-[4px] text-base sm:text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            ABIVYA GROUP
          </p>
          <p className="text-orange-400 text-xs tracking-[3px] font-bold uppercase">Admin Portal</p>
        </div>

        <div className="bg-[#0a0a14] border border-orange-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admin Login
          </h2>
          <p className="text-gray-400 text-sm mb-8">Sign in to manage enquiries and leads</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-400 text-xs font-bold mb-2 block tracking-wider uppercase">Admin Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-500" />
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  placeholder="admin@abivyagroup.com"
                  className="w-full h-12 bg-[#0d0d1a] border border-orange-500/20 rounded-xl pl-11 pr-4 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors placeholder:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs font-bold mb-2 block tracking-wider uppercase">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-500" />
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 bg-[#0d0d1a] border border-orange-500/20 rounded-xl pl-11 pr-12 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors placeholder:text-gray-500"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/40 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 rounded text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <span className="animate-spin text-xl">⟳</span> : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 bg-[#0d0d1a] rounded-lg p-4 border border-orange-500/10">
            <p className="text-gray-500 text-xs font-bold mb-2 tracking-wider">ADMIN CREDENTIALS:</p>
            <p className="text-gray-400 text-xs">Email: <span className="text-orange-400">admin@abivyagroup.com</span></p>
            <p className="text-gray-400 text-xs">Password: <span className="text-orange-400">Abivya@2025</span></p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} ABIVYA GROUP. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
