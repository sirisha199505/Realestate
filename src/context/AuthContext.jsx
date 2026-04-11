import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [adminUser,  setAdminUser]  = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const a = localStorage.getItem('abivya_admin');
    if (a) { const d = JSON.parse(a); setAdminUser(d.user); setAdminToken(d.token); }
  }, []);

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

  return (
    <AuthContext.Provider value={{ adminUser, adminToken, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
