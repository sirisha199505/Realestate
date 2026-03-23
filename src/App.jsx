import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import Contact from './pages/Contact';
import ClientLogin from './pages/ClientLogin';
import MyInquiries from './pages/MyInquiries';
import LayoutPlan from './pages/LayoutPlan';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* Spacer exactly matches fixed navbar height: ~34px strip + 68px bar = 102px, +10 buffer */}
      <div style={{ height: '112px' }} />
      <main className="w-full">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin routes — no navbar/footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Client routes */}
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/properties" element={<ClientLayout><Properties /></ClientLayout>} />
          <Route path="/gallery" element={<ClientLayout><Gallery /></ClientLayout>} />
          <Route path="/location" element={<ClientLayout><Location /></ClientLayout>} />
          <Route path="/contact" element={<ClientLayout><Contact /></ClientLayout>} />
          <Route path="/client-login" element={<ClientLayout><ClientLogin /></ClientLayout>} />
          <Route path="/my-inquiries" element={<ClientLayout><MyInquiries /></ClientLayout>} />
          <Route path="/layout-plan" element={<ClientLayout><LayoutPlan /></ClientLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
