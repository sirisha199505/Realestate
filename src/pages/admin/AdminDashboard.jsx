import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Users, FileText, LogOut, Phone, Mail,
  CheckCircle, Clock, TrendingUp, Eye, Trash2, ChevronDown,
  Shield, Home, Menu, X
} from 'lucide-react';

const STATUS_STYLES = {
  new: { label: 'New', class: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
  contacted: { label: 'Contacted', class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  'site-visit': { label: 'Site Visit', class: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
  closed: { label: 'Closed', class: 'bg-green-500/20 text-green-400 border-green-500/40' },
};

function Sidebar({ active, setActive, onLogout, open, setOpen }) {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { key: 'leads', label: 'Leads', icon: <FileText size={18} /> },
    { key: 'clients', label: 'Clients', icon: <Users size={18} /> },
  ];
  const inner = (
    <div className="w-64 bg-[#07070f] border-r border-orange-500/10 min-h-screen flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-orange-500/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Shield size={18} className="text-orange-400" />
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-wider">ABIVYA</p>
            <p className="text-orange-400 text-xs font-bold">Admin Panel</p>
          </div>
        </div>
        <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setOpen(false)}>
          <X size={20} />
        </button>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => { setActive(item.key); setOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              active === item.key
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      {/* Footer */}
      <div className="px-4 pb-6 space-y-2">
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Home size={18} /> View Website
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex">{inner}</div>
      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex">{inner}</div>
          <div className="flex-1 bg-black/60" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

function StatsCard({ title, value, icon, color, sub }) {
  return (
    <div className={`bg-[#0a0a14] border rounded-xl p-6 ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className="opacity-70">{icon}</div>
      </div>
      <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const { adminUser, adminLogout, leads, updateLeadStatus, deleteLead } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!adminUser) navigate('/admin/login');
  }, [adminUser, navigate]);

  if (!adminUser) return null;

  const clients = JSON.parse(localStorage.getItem('abivya_clients') || '[]');

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    closed: leads.filter(l => l.status === 'closed').length,
  };

  const handleStatusChange = (id, status) => updateLeadStatus(id, status);
  const handleDelete = (id) => {
    if (window.confirm('Delete this lead?')) deleteLead(id);
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex">
      <Sidebar active={active} setActive={setActive} onLogout={() => { adminLogout(); navigate('/admin/login'); }} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-[#07070f] border-b border-orange-500/10 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                {active === 'dashboard' && 'Dashboard'}
                {active === 'leads' && 'Leads Management'}
                {active === 'clients' && 'Registered Clients'}
              </h1>
              <p className="text-gray-500 text-xs">NIMZ CITY — {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#0a0a14] border border-orange-500/10 rounded-xl px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white text-sm font-black">A</span>
            </div>
            <div>
              <p className="text-white text-sm font-bold">Admin</p>
              <p className="text-gray-400 text-xs">{adminUser.email}</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* ── DASHBOARD ── */}
          {active === 'dashboard' && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <StatsCard title="Total Enquiries" value={stats.total} color="border-orange-500/20" sub="All time" icon={<FileText size={20} className="text-orange-400" />} />
                <StatsCard title="New Leads" value={stats.new} color="border-blue-500/20" sub="Needs attention" icon={<TrendingUp size={20} className="text-blue-400" />} />
                <StatsCard title="Contacted" value={stats.contacted} color="border-yellow-500/20" sub="In progress" icon={<Phone size={20} className="text-yellow-400" />} />
                <StatsCard title="Closed" value={stats.closed} color="border-green-500/20" sub="Converted" icon={<CheckCircle size={20} className="text-green-400" />} />
              </div>

              {/* Recent Leads */}
              <div className="bg-[#0a0a14] border border-orange-500/10 rounded-2xl overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-orange-500/10 flex items-center justify-between">
                  <h2 className="text-white font-bold">Recent Enquiries</h2>
                  <button onClick={() => setActive('leads')} className="text-orange-400 text-xs font-bold hover:underline">View All</button>
                </div>
                {leads.length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    <FileText size={32} className="mx-auto mb-3 opacity-30" />
                    <p>No enquiries yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-orange-500/10 text-gray-500 text-xs uppercase tracking-wider">
                          <th className="px-6 py-3 text-left">Name</th>
                          <th className="px-6 py-3 text-left">Phone</th>
                          <th className="px-6 py-3 text-left">Plot Size</th>
                          <th className="px-6 py-3 text-left">Date</th>
                          <th className="px-6 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.slice(-5).reverse().map(lead => {
                          const s = STATUS_STYLES[lead.status] || STATUS_STYLES.new;
                          return (
                            <tr key={lead.id} className="border-b border-orange-500/5 hover:bg-white/2">
                              <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                              <td className="px-6 py-4 text-gray-400">{lead.phone}</td>
                              <td className="px-6 py-4 text-gray-400">{lead.plotSize || '—'}</td>
                              <td className="px-6 py-4 text-gray-500">{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${s.class}`}>{s.label}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quick Stats cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#0a0a14] border border-orange-500/10 rounded-xl p-5">
                  <p className="text-gray-400 text-xs font-bold mb-3 tracking-wider uppercase">Registered Clients</p>
                  <p className="text-3xl font-black text-white">{clients.length}</p>
                </div>
                <div className="bg-[#0a0a14] border border-orange-500/10 rounded-xl p-5">
                  <p className="text-gray-400 text-xs font-bold mb-3 tracking-wider uppercase">Today's Enquiries</p>
                  <p className="text-3xl font-black text-white">
                    {leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length}
                  </p>
                </div>
                <div className="bg-[#0a0a14] border border-orange-500/10 rounded-xl p-5">
                  <p className="text-gray-400 text-xs font-bold mb-3 tracking-wider uppercase">Conversion Rate</p>
                  <p className="text-3xl font-black text-orange-400">
                    {leads.length > 0 ? Math.round((stats.closed / leads.length) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── LEADS ── */}
          {active === 'leads' && (
            <div>
              <div className="bg-[#0a0a14] border border-orange-500/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-orange-500/10 flex items-center justify-between">
                  <h2 className="text-white font-bold">All Enquiries ({leads.length})</h2>
                  <div className="flex gap-2 text-xs">
                    {Object.entries(STATUS_STYLES).map(([key, val]) => (
                      <span key={key} className={`px-2 py-1 rounded-full border ${val.class}`}>{val.label}</span>
                    ))}
                  </div>
                </div>
                {leads.length === 0 ? (
                  <div className="py-16 text-center text-gray-500">
                    <FileText size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No enquiries yet. Leads will appear here when clients submit forms.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-orange-500/5">
                    {[...leads].reverse().map(lead => {
                      const s = STATUS_STYLES[lead.status] || STATUS_STYLES.new;
                      return (
                        <div key={lead.id} className="p-4 sm:p-5 lg:p-6 hover:bg-white/1 transition-colors">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <span className="text-white font-bold">{lead.name}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${s.class}`}>{s.label}</span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Phone size={10} className="text-orange-400" />{lead.phone}</span>
                                {lead.email && <span className="flex items-center gap-1"><Mail size={10} className="text-orange-400" />{lead.email}</span>}
                                {lead.plotSize && <span className="text-orange-300">{lead.plotSize}</span>}
                                <span className="flex items-center gap-1"><Clock size={10} />{new Date(lead.createdAt).toLocaleDateString('en-IN')}</span>
                              </div>
                              {lead.message && <p className="text-gray-500 text-xs mt-2 italic">"{lead.message}"</p>}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <select
                                value={lead.status}
                                onChange={e => handleStatusChange(lead.id, e.target.value)}
                                className="bg-[#0d0d1a] border border-orange-500/20 text-gray-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                              >
                                {Object.entries(STATUS_STYLES).map(([key, val]) => (
                                  <option key={key} value={key}>{val.label}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
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

          {/* ── CLIENTS ── */}
          {active === 'clients' && (
            <div>
              <div className="bg-[#0a0a14] border border-orange-500/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-orange-500/10">
                  <h2 className="text-white font-bold">Registered Clients ({clients.length})</h2>
                </div>
                {clients.length === 0 ? (
                  <div className="py-16 text-center text-gray-500">
                    <Users size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No registered clients yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-orange-500/10 text-gray-500 text-xs uppercase tracking-wider">
                          <th className="px-6 py-3 text-left">Name</th>
                          <th className="px-6 py-3 text-left">Email</th>
                          <th className="px-6 py-3 text-left">Phone</th>
                          <th className="px-6 py-3 text-left">Enquiries</th>
                          <th className="px-6 py-3 text-left">Registered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map(client => (
                          <tr key={client.id} className="border-b border-orange-500/5 hover:bg-white/2">
                            <td className="px-6 py-4 text-white font-medium">{client.name}</td>
                            <td className="px-6 py-4 text-gray-400">{client.email}</td>
                            <td className="px-6 py-4 text-gray-400">{client.phone}</td>
                            <td className="px-6 py-4 text-orange-400 font-bold">
                              {leads.filter(l => l.email === client.email).length}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {new Date(client.createdAt).toLocaleDateString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
