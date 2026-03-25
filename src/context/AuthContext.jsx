import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [adminUser,  setAdminUser]  = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [clientUser,  setClientUser]  = useState(null);
  const [clientToken, setClientToken] = useState(null);

  // Restore sessions from localStorage on mount
  useEffect(() => {
    const a = localStorage.getItem('abivya_admin');
    const c = localStorage.getItem('abivya_client');
    if (a) { const d = JSON.parse(a); setAdminUser(d.user);  setAdminToken(d.token); }
    if (c) { const d = JSON.parse(c); setClientUser(d.user); setClientToken(d.token); }
  }, []);

  // ── Admin ──────────────────────────────────────────────────────────
  const adminLogin = async (email, password) => {
    const res = await api.login(email, password);
    const { token, info } = res.data;
    if (info.role !== 1 && info.role !== 2) {
      throw new Error('This account does not have admin access.');
    }
    setAdminUser(info);
    setAdminToken(token);
    localStorage.setItem('abivya_admin', JSON.stringify({ user: info, token }));
  };

  const adminLogout = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('abivya_admin');
  };

  // ── Client ─────────────────────────────────────────────────────────
  const clientLogin = async (email, password) => {
    const res = await api.login(email, password);
    const { token, info } = res.data;
    // Normalise field names for UI compatibility
    const user = { ...info, name: info.full_name, phone: info.phone_number || '' };
    setClientUser(user);
    setClientToken(token);
    localStorage.setItem('abivya_client', JSON.stringify({ user, token }));
  };

  const clientRegister = async (name, email, password, phone) => {
    const res = await api.register(name, email, password, phone);
    const { token, info } = res.data;
    const user = { ...info, name: info.full_name, phone: info.phone_number || '' };
    setClientUser(user);
    setClientToken(token);
    localStorage.setItem('abivya_client', JSON.stringify({ user, token }));
  };

  const clientLogout = () => {
    setClientUser(null);
    setClientToken(null);
    localStorage.removeItem('abivya_client');
  };

  return (
    <AuthContext.Provider value={{
      adminUser,  adminToken,
      clientUser, clientToken,
      adminLogin, adminLogout,
      clientLogin, clientRegister, clientLogout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
