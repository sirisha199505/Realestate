import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = {
  email: 'admin@abivyagroup.com',
  password: 'Abivya@2025',
};

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [clientUser, setClientUser] = useState(null);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('abivya_admin');
    const storedClient = localStorage.getItem('abivya_client');
    const storedLeads = localStorage.getItem('abivya_leads');
    if (storedAdmin) setAdminUser(JSON.parse(storedAdmin));
    if (storedClient) setClientUser(JSON.parse(storedClient));
    if (storedLeads) setLeads(JSON.parse(storedLeads));
  }, []);

  const adminLogin = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user = { email, role: 'admin', name: 'Admin' };
      setAdminUser(user);
      localStorage.setItem('abivya_admin', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('abivya_admin');
  };

  const clientRegister = (name, email, phone) => {
    const existingClients = JSON.parse(localStorage.getItem('abivya_clients') || '[]');
    const exists = existingClients.find(c => c.email === email);
    if (exists) return { success: false, message: 'Email already registered. Please login.' };
    const newClient = { name, email, phone, id: Date.now().toString(), createdAt: new Date().toISOString() };
    existingClients.push(newClient);
    localStorage.setItem('abivya_clients', JSON.stringify(existingClients));
    setClientUser(newClient);
    localStorage.setItem('abivya_client', JSON.stringify(newClient));
    return { success: true };
  };

  const clientLogin = (email) => {
    const existingClients = JSON.parse(localStorage.getItem('abivya_clients') || '[]');
    const client = existingClients.find(c => c.email === email);
    if (client) {
      setClientUser(client);
      localStorage.setItem('abivya_client', JSON.stringify(client));
      return { success: true };
    }
    return { success: false, message: 'Email not found. Please register first.' };
  };

  const clientLogout = () => {
    setClientUser(null);
    localStorage.removeItem('abivya_client');
  };

  const submitLead = (data) => {
    const newLead = {
      id: Date.now().toString(),
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const updatedLeads = [...leads, newLead];
    setLeads(updatedLeads);
    localStorage.setItem('abivya_leads', JSON.stringify(updatedLeads));
    return newLead;
  };

  const updateLeadStatus = (id, status) => {
    const updatedLeads = leads.map(l => l.id === id ? { ...l, status } : l);
    setLeads(updatedLeads);
    localStorage.setItem('abivya_leads', JSON.stringify(updatedLeads));
  };

  const deleteLead = (id) => {
    const updatedLeads = leads.filter(l => l.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem('abivya_leads', JSON.stringify(updatedLeads));
  };

  const getClientLeads = (email) => leads.filter(l => l.email === email);

  return (
    <AuthContext.Provider value={{
      adminUser, clientUser, leads,
      adminLogin, adminLogout,
      clientLogin, clientRegister, clientLogout,
      submitLead, updateLeadStatus, deleteLead,
      getClientLeads,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
