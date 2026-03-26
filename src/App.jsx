import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Project from './pages/Project';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import Contact from './pages/Contact';
import ClientLogin from './pages/ClientLogin';
import MyInquiries from './pages/MyInquiries';
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
      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/919996999872"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#1ebe57] transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.72.7 5.28 1.93 7.5L.5 31.5l8.27-1.9A15.45 15.45 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.14 13.14 0 01-6.7-1.84l-.48-.28-4.91 1.13 1.17-4.77-.32-.5A13.2 13.2 0 1116 28.8zm7.26-9.86c-.4-.2-2.36-1.16-2.72-1.3-.37-.13-.63-.2-.9.2s-1.03 1.3-1.27 1.57c-.23.27-.46.3-.86.1a10.83 10.83 0 01-3.19-1.97 11.96 11.96 0 01-2.21-2.75c-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68h-.76c-.27 0-.7.1-1.06.5-.37.4-1.4 1.37-1.4 3.33s1.43 3.86 1.63 4.13c.2.27 2.82 4.3 6.83 6.03.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.36-.96 2.7-1.9.33-.92.33-1.71.23-1.87-.1-.17-.36-.27-.76-.47z"/>
        </svg>
      </a>
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
          <Route path="/client-login" element={<ClientLayout><ClientLogin /></ClientLayout>} />
          <Route path="/my-inquiries" element={<ClientLayout><MyInquiries /></ClientLayout>} />
          <Route path="/layout-plan" element={<ClientLayout><LayoutPlan /></ClientLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
