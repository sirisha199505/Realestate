import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppPopup from './components/WhatsAppPopup';
import Home from './pages/Home';
import Project from './pages/Project';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import Contact from './pages/Contact';
import LayoutPlan from './pages/LayoutPlan';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* Spacer: mobile ~128px (2-line strip ~48px + 68px bar + 12 buffer), desktop ~112px */}
      <div className="h-[128px] sm:h-[112px]" />
      <main className="w-full">{children}</main>
      <Footer />
      <WhatsAppPopup />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin routes — no navbar/footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />

          {/* Client routes */}
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/projects" element={<ClientLayout><Project /></ClientLayout>} />
          <Route path="/gallery" element={<ClientLayout><Gallery /></ClientLayout>} />
          <Route path="/location" element={<ClientLayout><Location /></ClientLayout>} />
          <Route path="/contact" element={<ClientLayout><Contact /></ClientLayout>} />
          <Route path="/layout-plan" element={<ClientLayout><LayoutPlan /></ClientLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
