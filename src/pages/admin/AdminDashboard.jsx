import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api, orderToLead } from '../../api';
import {
  LayoutDashboard, Users, FileText, LogOut, Phone, Mail,
  CheckCircle, TrendingUp, Trash2, Home, Menu, X,
  Map, Sun, Moon, RefreshCw, Calendar, MessageSquare,
  ChevronRight, AlertCircle, ChevronDown,
} from 'lucide-react';
import AdminLayoutPlots from './AdminLayoutPlots';

// ─── Brand icons (same as public Navbar) ──────────────────────────────────────
function AbivyaIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="8"  width="16" height="44" fill="#1E3A5F" rx="1" />
      <rect x="4"  y="12" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="9"  y="12" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="4"  y="20" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="9"  y="20" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="4"  y="28" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="9"  y="28" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="20" y="0"  width="20" height="52" fill="#1A4F8A" rx="1" />
      <rect x="23" y="4"  width="4"  height="5"  fill="#7EC8E3" />
      <rect x="31" y="4"  width="4"  height="5"  fill="#7EC8E3" />
      <rect x="23" y="14" width="4"  height="5"  fill="#7EC8E3" />
      <rect x="31" y="14" width="4"  height="5"  fill="#7EC8E3" />
      <rect x="23" y="24" width="4"  height="5"  fill="#7EC8E3" />
      <rect x="31" y="24" width="4"  height="5"  fill="#7EC8E3" />
      <rect x="23" y="34" width="4"  height="5"  fill="#7EC8E3" />
      <rect x="31" y="34" width="4"  height="5"  fill="#7EC8E3" />
      <rect x="42" y="14" width="16" height="38" fill="#1E3A5F" rx="1" />
      <rect x="44" y="18" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="50" y="18" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="44" y="26" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="50" y="26" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="44" y="34" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
      <rect x="50" y="34" width="3"  height="4"  fill="#5B9BD5" opacity="0.9" />
    </svg>
  );
}

function NcIcon({ size = 26 }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="25,1 6,14 44,14" fill="#00B4C8" />
      <rect x="4"  y="16" width="5" height="22" fill="#F47920" rx="0.5" />
      <polygon points="4,16 9,16 20,32 20,38 15,38 4,22" fill="#F47920" />
      <rect x="15" y="16" width="5" height="22" fill="#F47920" rx="0.5" />
      <path d="M41,19 C33,16 26,20 26,28 C26,36 33,40 41,37"
        stroke="#1A2B6B" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS = {
  new:          { label: 'New',          light: 'bg-blue-50 text-blue-700 border-blue-200',    dark: 'bg-blue-500/15 text-blue-300 border-blue-500/30'   },
  contacted:    { label: 'Contacted',    light: 'bg-amber-50 text-amber-700 border-amber-200',  dark: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  'site-visit': { label: 'Site Visit',   light: 'bg-violet-50 text-violet-700 border-violet-200',dark:'bg-violet-500/15 text-violet-300 border-violet-500/30'},
  closed:       { label: 'Closed',       light: 'bg-emerald-50 text-emerald-700 border-emerald-200',dark:'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'},
};

// ─── Theme tokens ─────────────────────────────────────────────────────────────
function t(dark, dCls, lCls) { return dark ? dCls : lCls; }

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, onLogout, open, setOpen, dark }) {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
    { key: 'leads',     label: 'Enquiries',  icon: FileText },
    { key: 'clients',   label: 'Clients',    icon: Users },
    { key: 'layout',    label: 'Layout Plan',icon: Map },
  ];

  const inner = (
    <div className={`w-64 min-h-screen flex flex-col flex-shrink-0 ${t(dark,'bg-[#0d0d1a] border-r border-white/8','bg-white border-r border-gray-200 shadow-sm')}`}>

      {/* Logo — same as public navbar */}
      <div className={`px-5 py-4 border-b flex items-center justify-between ${t(dark,'border-white/8','border-gray-100')}`}>
        <div className="flex items-center gap-2.5">
          <AbivyaIcon size={28} />
          <div className="leading-[1.15]">
            <p className={`font-black text-[13px] tracking-[3px] ${t(dark,'text-white','text-gray-900')}`}>ABIVYA</p>
            <p className="text-orange-400 font-bold text-[9px] tracking-[5px]">GROUP</p>
          </div>
          <div className={`w-px h-7 mx-1 ${t(dark,'bg-white/10','bg-gray-200')}`} />
          <NcIcon size={22} />
          <div className="leading-[1.15]">
            <p className={`font-black text-[12px] tracking-wide ${t(dark,'text-white','text-gray-900')}`}>
              NIMZ <span className="text-orange-400">CITY</span>
            </p>
            <p className={`text-[8px] tracking-widest ${t(dark,'text-gray-500','text-gray-400')}`}>KOHIR</p>
          </div>
        </div>
        <button className={`lg:hidden p-1 rounded-lg ${t(dark,'text-slate-400 hover:text-white hover:bg-white/5','text-gray-400 hover:text-gray-600 hover:bg-gray-100')}`} onClick={() => setOpen(false)}>
          <X size={16} />
        </button>
      </div>

      {/* Section label */}
      <div className={`px-5 pt-5 pb-2`}>
        <p className={`text-[10px] font-bold tracking-widest uppercase ${t(dark,'text-slate-500','text-gray-400')}`}>Main Menu</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setActive(key); setOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 relative ${
              active === key
                ? t(dark,
                    'bg-orange-500/15 text-orange-400 border border-orange-500/25',
                    'bg-orange-50 text-orange-600 border border-orange-200')
                : t(dark,
                    'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent',
                    'text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent')
            }`}
          >
            {active === key && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-orange-500" />
            )}
            <Icon size={16} className={active === key ? t(dark,'text-orange-400','text-orange-500') : ''} />
            {label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className={`px-3 pb-5 pt-3 mt-4 border-t space-y-0.5 ${t(dark,'border-white/8','border-gray-100')}`}>
        <p className={`px-4 pb-1 text-[10px] font-bold tracking-widest uppercase ${t(dark,'text-slate-600','text-gray-400')}`}>Account</p>
        <Link
          to="/"
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border border-transparent ${t(dark,'text-slate-400 hover:text-white hover:bg-white/5','text-gray-500 hover:text-gray-900 hover:bg-gray-50')}`}
        >
          <Home size={15} /> View Website
        </Link>
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 border border-transparent transition-all ${t(dark,'hover:bg-red-500/10 hover:border-red-500/20','hover:bg-red-50 hover:border-red-100')}`}
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:flex">{inner}</div>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {inner}
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

// ─── Stats card ───────────────────────────────────────────────────────────────
function StatsCard({ title, value, icon: Icon, accentLight, accentDark, sub, dark }) {
  return (
    <div className={`rounded-2xl p-5 border transition-all hover:shadow-lg hover:-translate-y-0.5 duration-200 ${t(dark,'bg-[#0d0d1a] border-white/8 hover:border-white/15','bg-white border-gray-100 shadow-sm hover:shadow-md')}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${dark ? accentDark : accentLight}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className={`text-3xl font-black mb-1 ${t(dark,'text-white','text-gray-900')}`}>{value}</p>
      <p className={`text-sm font-semibold ${t(dark,'text-slate-300','text-gray-700')}`}>{title}</p>
      {sub && <p className={`text-xs mt-0.5 ${t(dark,'text-slate-500','text-gray-400')}`}>{sub}</p>}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { adminUser, adminToken, adminLogout } = useAuth();
  const navigate = useNavigate();

  const [active,      setActive]      = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark,        setDark]        = useState(() => {
    const saved = localStorage.getItem('abivya_admin_theme');
    return saved !== null ? saved === 'dark' : true; // default dark
  });
  const [leads,       setLeads]       = useState([]);
  const [clients,     setClients]     = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [dataError,   setDataError]   = useState('');
  const [toast,       setToast]       = useState({ msg: '', type: 'success' });
  const [statusFilter,setStatusFilter]= useState('all');

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('abivya_admin_theme', next ? 'dark' : 'light');
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    if (!adminUser) navigate('/admin/login');
  }, [adminUser, navigate]);

  const fetchData = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    setDataError('');
    try {
      const [ordersRes, customersRes] = await Promise.all([
        api.getOrders(adminToken),
        api.getCustomers(adminToken),
      ]);
      setLeads((ordersRes.data || []).map(orderToLead));
      setClients(customersRes.data || []);
    } catch (err) {
      setDataError(err.message || 'Failed to load. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (!adminUser) return null;

  const stats = {
    total:     leads.length,
    new:       leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    siteVisit: leads.filter(l => l.status === 'site-visit').length,
    closed:    leads.filter(l => l.status === 'closed').length,
  };

  const todayLeads = leads.filter(l => {
    if (!l.createdAt) return false;
    return new Date(l.createdAt).toDateString() === new Date().toDateString();
  }).length;

  const filteredLeads = statusFilter === 'all' ? leads : leads.filter(l => l.status === statusFilter);

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateOrderStatus(id, status, adminToken);
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      showToast('Status updated successfully');
    } catch (err) {
      showToast(err.message || 'Update failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this enquiry? It will be marked as closed.')) return;
    try {
      await api.updateOrderStatus(id, 'closed', adminToken);
      setLeads(prev => prev.filter(l => l.id !== id));
      showToast('Enquiry removed');
    } catch (err) {
      showToast(err.message || 'Failed to remove', 'error');
    }
  };

  const [userDropOpen, setUserDropOpen] = useState(false);
  const dropRef    = useRef(null);
  const btnRef     = useRef(null);
  const [dropPos,  setDropPos]  = useState({ top: 0, right: 0 });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target) &&
          btnRef.current  && !btnRef.current.contains(e.target)) {
        setUserDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openDrop = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
    setUserDropOpen(prev => !prev);
  };

  const pageTitle = { dashboard: 'Dashboard', leads: 'Enquiries', clients: 'Clients', layout: 'Layout Plan' };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen flex ${t(dark,'bg-[#080810]','bg-gray-50')}`}>

      {/* Toast */}
      {toast.msg && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold shadow-2xl transition-all ${
          toast.type === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-emerald-500 text-white'
        }`}>
          {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        active={active} setActive={setActive}
        onLogout={() => { adminLogout(); navigate('/admin/login'); }}
        open={sidebarOpen} setOpen={setSidebarOpen}
        dark={dark}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-auto">

        {/* Top bar */}
        <header className={`sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 border-b ${t(dark,'bg-[#0d0d1a]/95 backdrop-blur border-white/8','bg-white border-gray-200 shadow-sm')}`}>
          <div className="flex items-center gap-3">
            <button className={`lg:hidden p-2 rounded-xl ${t(dark,'text-slate-400 hover:text-white hover:bg-white/5','text-gray-500 hover:bg-gray-100')}`} onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${t(dark,'text-slate-500','text-gray-400')}`}>Admin</span>
                <ChevronRight size={12} className={t(dark,'text-slate-600','text-gray-300')} />
                <h1 className={`font-bold text-sm ${t(dark,'text-white','text-gray-900')}`}>{pageTitle[active]}</h1>
              </div>
              <p className={`text-xs mt-0.5 ${t(dark,'text-slate-500','text-gray-400')}`}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Refresh */}
            <button
              onClick={fetchData}
              disabled={loading}
              className={`p-2 rounded-xl border transition-all ${t(dark,'border-white/8 text-slate-400 hover:text-white hover:bg-white/5','border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50')} ${loading ? 'opacity-50' : ''}`}
              title="Refresh data"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>

            {/* Admin user dropdown */}
            <button
              ref={btnRef}
              onClick={openDrop}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all ${t(dark,'border-white/8 bg-white/5 hover:bg-white/10','border-gray-200 bg-white hover:bg-gray-50')}`}
            >
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/30">
                <span className="text-white text-xs font-black">{adminUser.full_name?.[0]?.toUpperCase() || 'A'}</span>
              </div>
              <div className="hidden sm:block leading-tight text-left">
                <p className={`text-sm font-bold ${t(dark,'text-white','text-gray-900')}`}>{adminUser.full_name || 'Admin'}</p>
                <p className={`text-[11px] ${t(dark,'text-slate-400','text-gray-400')}`}>{adminUser.email}</p>
              </div>
              <ChevronDown size={14} className={`flex-shrink-0 transition-transform duration-200 ${t(dark,'text-slate-400','text-gray-400')} ${userDropOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown — fixed so it escapes overflow-auto clipping */}
            {userDropOpen && (
              <div
                ref={dropRef}
                style={{ position: 'fixed', top: dropPos.top, right: dropPos.right, zIndex: 9999 }}
                className={`w-56 rounded-2xl border shadow-2xl overflow-hidden ${t(dark,'bg-[#0d0d1a] border-white/8','bg-white border-gray-200')}`}
              >
                {/* Theme toggle */}
                <button
                  onClick={() => { toggleDark(); setUserDropOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-colors border-b ${
                    t(dark,'text-slate-200 hover:bg-white/5 border-white/8','text-gray-700 hover:bg-gray-50 border-gray-100')
                  }`}
                >
                  {dark
                    ? <><Sun size={16} className="text-amber-400 flex-shrink-0" /><span>Switch to Light Mode</span></>
                    : <><Moon size={16} className="text-indigo-500 flex-shrink-0" /><span>Switch to Dark Mode</span></>
                  }
                </button>

                {/* View Website */}
                <Link
                  to="/"
                  onClick={() => setUserDropOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-sm font-semibold transition-colors border-b ${
                    t(dark,'text-slate-200 hover:bg-white/5 border-white/8','text-gray-700 hover:bg-gray-50 border-gray-100')
                  }`}
                >
                  <Home size={16} className="text-orange-500 flex-shrink-0" /><span>View Website</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={() => { setUserDropOpen(false); adminLogout(); navigate('/admin/login'); }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-red-500 transition-colors ${t(dark,'hover:bg-red-500/10','hover:bg-red-50')}`}
                >
                  <LogOut size={16} className="flex-shrink-0" /><span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Error banner */}
        {dataError && (
          <div className="mx-4 sm:mx-8 mt-4 bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center justify-between gap-4">
            <span className="text-red-600 text-sm flex items-center gap-2"><AlertCircle size={14} />{dataError}</span>
            <button onClick={fetchData} className="text-orange-500 text-xs font-bold hover:underline flex-shrink-0">Retry</button>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          {/* ── DASHBOARD ── */}
          {active === 'dashboard' && (
            <div className="space-y-6">

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard dark={dark} title="Total Enquiries" value={stats.total}     icon={FileText}   sub="All time"        accentLight="bg-orange-100 text-orange-600"  accentDark="bg-orange-500/20 text-orange-400" />
                <StatsCard dark={dark} title="New Leads"       value={stats.new}       icon={TrendingUp} sub="Need attention"  accentLight="bg-blue-100 text-blue-600"     accentDark="bg-blue-500/20 text-blue-400"    />
                <StatsCard dark={dark} title="In Progress"     value={stats.contacted + stats.siteVisit} icon={Phone} sub="Being followed up" accentLight="bg-amber-100 text-amber-600"    accentDark="bg-amber-500/20 text-amber-400"  />
                <StatsCard dark={dark} title="Closed"          value={stats.closed}    icon={CheckCircle}sub="Converted"       accentLight="bg-emerald-100 text-emerald-600" accentDark="bg-emerald-500/20 text-emerald-400"/>
              </div>

              {/* Quick info row */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Today's Enquiries", value: todayLeads, accent: 'text-orange-500' },
                  { label: 'Registered Clients', value: clients.length, accent: 'text-blue-500' },
                  { label: 'Conversion Rate',    value: `${leads.length > 0 ? Math.round((stats.closed / leads.length) * 100) : 0}%`, accent: 'text-emerald-500' },
                ].map(c => (
                  <div key={c.label} className={`rounded-2xl p-5 border ${t(dark,'bg-[#0d0d1a] border-white/8','bg-white border-gray-100 shadow-sm')}`}>
                    <p className={`text-xs font-bold tracking-wider uppercase mb-2 ${t(dark,'text-slate-500','text-gray-400')}`}>{c.label}</p>
                    <p className={`text-4xl font-black ${c.accent}`}>{c.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent enquiries table */}
              <div className={`rounded-2xl border overflow-hidden ${t(dark,'bg-[#0d0d1a] border-white/8','bg-white border-gray-100 shadow-sm')}`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${t(dark,'border-white/8','border-gray-100')}`}>
                  <div>
                    <h2 className={`font-bold ${t(dark,'text-white','text-gray-900')}`}>Recent Enquiries</h2>
                    <p className={`text-xs mt-0.5 ${t(dark,'text-slate-500','text-gray-400')}`}>Latest 5 submissions</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={fetchData} className={`text-xs font-medium flex items-center gap-1 ${t(dark,'text-slate-400 hover:text-white','text-gray-500 hover:text-gray-700')}`}>
                      <RefreshCw size={12} /> Refresh
                    </button>
                    <button onClick={() => setActive('leads')} className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
                      View All <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
                {leads.length === 0 ? (
                  <div className="py-16 text-center">
                    <FileText size={36} className={`mx-auto mb-3 ${t(dark,'text-slate-600','text-gray-300')}`} />
                    <p className={`text-sm ${t(dark,'text-slate-500','text-gray-400')}`}>No enquiries yet</p>
                    <p className={`text-xs mt-1 ${t(dark,'text-slate-600','text-gray-300')}`}>Submissions from the contact form will appear here</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`text-xs uppercase tracking-wider font-bold border-b ${t(dark,'bg-[#080810] border-white/8 text-slate-500','bg-gray-50 border-gray-100 text-gray-500')}`}>
                          <th className="px-6 py-3 text-left">Name</th>
                          <th className="px-6 py-3 text-left">Phone</th>
                          <th className="px-6 py-3 text-left">Plot Size</th>
                          <th className="px-6 py-3 text-left">Date</th>
                          <th className="px-6 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...leads].reverse().slice(0, 5).map(lead => {
                          const s = STATUS[lead.status] || STATUS.new;
                          return (
                            <tr key={lead.id} className={`border-b last:border-0 transition-colors ${t(dark,'border-white/5 hover:bg-white/3','border-gray-50 hover:bg-gray-50')}`}>
                              <td className={`px-6 py-4 font-semibold ${t(dark,'text-white','text-gray-900')}`}>{lead.name}</td>
                              <td className={`px-6 py-4 ${t(dark,'text-slate-400','text-gray-500')}`}>{lead.phone}</td>
                              <td className={`px-6 py-4 font-medium ${t(dark,'text-orange-400','text-orange-600')}`}>{lead.plotSize || '—'}</td>
                              <td className={`px-6 py-4 text-xs ${t(dark,'text-slate-500','text-gray-400')}`}>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${dark ? s.dark : s.light}`}>{s.label}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── ENQUIRIES / LEADS ── */}
          {active === 'leads' && (
            <div className="space-y-4">
              {/* Filter bar */}
              <div className={`rounded-2xl border p-4 flex flex-wrap items-center gap-3 ${t(dark,'bg-[#0d0d1a] border-white/8','bg-white border-gray-100 shadow-sm')}`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${t(dark,'text-slate-400','text-gray-400')}`}>Filter:</span>
                {[['all','All'], ...Object.entries(STATUS).map(([k,v]) => [k, v.label])].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      statusFilter === key
                        ? 'bg-orange-500 text-white border-orange-500'
                        : t(dark,'border-slate-600 text-slate-400 hover:border-orange-500 hover:text-orange-400','border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500')
                    }`}
                  >
                    {label} {key !== 'all' && `(${leads.filter(l => l.status === key).length})`}
                  </button>
                ))}
                <span className={`ml-auto text-xs ${t(dark,'text-slate-500','text-gray-400')}`}>{filteredLeads.length} result{filteredLeads.length !== 1 && 's'}</span>
              </div>

              {/* Table */}
              <div className={`rounded-2xl border overflow-hidden ${t(dark,'bg-[#0d0d1a] border-white/8','bg-white border-gray-100 shadow-sm')}`}>
                <div className={`px-6 py-4 border-b ${t(dark,'border-white/8','border-gray-100')}`}>
                  <h2 className={`font-bold ${t(dark,'text-white','text-gray-900')}`}>All Enquiries <span className={`text-sm font-normal ${t(dark,'text-slate-400','text-gray-400')}`}>({filteredLeads.length})</span></h2>
                </div>
                {filteredLeads.length === 0 ? (
                  <div className="py-20 text-center">
                    <FileText size={40} className={`mx-auto mb-3 ${t(dark,'text-slate-600','text-gray-300')}`} />
                    <p className={`text-sm ${t(dark,'text-slate-500','text-gray-400')}`}>No enquiries found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {[...filteredLeads].reverse().map(lead => {
                      const s = STATUS[lead.status] || STATUS.new;
                      return (
                        <div key={lead.id} className={`p-5 sm:p-6 transition-colors ${t(dark,'divide-white/5 hover:bg-white/3','divide-gray-100 hover:bg-gray-50/80')}`}>
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            {/* Lead info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                                <span className={`font-bold text-base ${t(dark,'text-white','text-gray-900')}`}>{lead.name}</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${dark ? s.dark : s.light}`}>{s.label}</span>
                              </div>
                              <div className="flex flex-wrap gap-4 text-xs">
                                <span className={`flex items-center gap-1.5 ${t(dark,'text-slate-300','text-gray-600')}`}>
                                  <Phone size={11} className="text-orange-500" />{lead.phone}
                                </span>
                                {lead.email && (
                                  <span className={`flex items-center gap-1.5 ${t(dark,'text-slate-300','text-gray-600')}`}>
                                    <Mail size={11} className="text-orange-500" />{lead.email}
                                  </span>
                                )}
                                {lead.plotSize && (
                                  <span className="flex items-center gap-1.5 font-semibold text-orange-500">
                                    📐 {lead.plotSize}
                                  </span>
                                )}
                                <span className={`flex items-center gap-1.5 ${t(dark,'text-slate-500','text-gray-400')}`}>
                                  <Calendar size={11} />{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', { day:'numeric',month:'short',year:'numeric' }) : '—'}
                                </span>
                              </div>
                              {lead.message && (
                                <p className={`text-xs mt-2.5 flex items-start gap-1.5 ${t(dark,'text-slate-400','text-gray-500')}`}>
                                  <MessageSquare size={11} className="mt-0.5 flex-shrink-0 text-orange-400" />
                                  <span className="italic">"{lead.message}"</span>
                                </p>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <select
                                value={lead.status}
                                onChange={e => handleStatusChange(lead.id, e.target.value)}
                                className={`text-xs font-medium rounded-xl px-3 py-2 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all ${t(dark,'bg-[#080810] border-white/8 text-slate-300','bg-white border-gray-200 text-gray-700')}`}
                              >
                                {Object.entries(STATUS).map(([key, val]) => (
                                  <option key={key} value={key}>{val.label}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className={`p-2 rounded-xl border transition-all ${t(dark,'border-slate-700 text-slate-500 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10','border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50')}`}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── LAYOUT ── */}
          {active === 'layout' && <AdminLayoutPlots />}

          {/* ── CLIENTS ── */}
          {active === 'clients' && (
            <div className={`rounded-2xl border overflow-hidden ${t(dark,'bg-[#0d0d1a] border-white/8','bg-white border-gray-100 shadow-sm')}`}>
              <div className={`px-6 py-4 border-b ${t(dark,'border-white/8','border-gray-100')}`}>
                <h2 className={`font-bold ${t(dark,'text-white','text-gray-900')}`}>
                  Registered Clients <span className={`text-sm font-normal ${t(dark,'text-slate-400','text-gray-400')}`}>({clients.length})</span>
                </h2>
                <p className={`text-xs mt-0.5 ${t(dark,'text-slate-500','text-gray-400')}`}>Users who registered through the client portal</p>
              </div>
              {clients.length === 0 ? (
                <div className="py-20 text-center">
                  <Users size={40} className={`mx-auto mb-3 ${t(dark,'text-slate-600','text-gray-300')}`} />
                  <p className={`text-sm ${t(dark,'text-slate-500','text-gray-400')}`}>No registered clients yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`text-xs uppercase tracking-wider font-bold border-b ${t(dark,'bg-[#080810] border-white/8 text-slate-500','bg-gray-50 border-gray-100 text-gray-500')}`}>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Phone</th>
                        <th className="px-6 py-3 text-left">Enquiries</th>
                        <th className="px-6 py-3 text-left">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(client => (
                        <tr key={client.id} className={`border-b last:border-0 transition-colors ${t(dark,'border-white/5 hover:bg-white/3','border-gray-50 hover:bg-gray-50')}`}>
                          <td className={`px-6 py-4 font-semibold ${t(dark,'text-white','text-gray-900')}`}>{client.full_name}</td>
                          <td className={`px-6 py-4 ${t(dark,'text-slate-400','text-gray-500')}`}>{client.email}</td>
                          <td className={`px-6 py-4 ${t(dark,'text-slate-400','text-gray-500')}`}>{client.phone_number || '—'}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/15 text-orange-500 border border-orange-500/20">
                              {leads.filter(l => l.email === client.email).length}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-xs ${t(dark,'text-slate-500','text-gray-400')}`}>
                            {client.created_at ? new Date(client.created_at).toLocaleDateString('en-IN', { day:'numeric',month:'short',year:'numeric' }) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className={`px-8 py-4 border-t text-xs ${t(dark,'border-white/8 text-slate-600','border-gray-100 text-gray-400')}`}>
          © {new Date().getFullYear()} Abivya Group · NIMZ CITY Admin Panel
        </footer>
      </div>
    </div>
  );
}
