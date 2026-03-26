import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { propertyInfo } from '../data/propertyData';

export default function Footer() {
  const { contact, approvalDetails } = propertyInfo;

  return (
    <footer className="bg-[#07070f] border-t border-orange-500/20">
      {/* Main footer */}
      <div className="px-4 sm:px-8 lg:px-12 py-10 sm:py-12 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <p className="text-white font-black tracking-[4px] text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>ABIVYA</p>
            <p className="text-orange-400 font-bold tracking-[6px] text-sm">GROUP</p>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Your trusted real estate partner. Building dreams with integrity, trust, and commitment.
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">DTCP</span>
            <span className="text-gray-400 text-xs">{approvalDetails.lpNo}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">RERA</span>
            <span className="text-green-400 text-xs font-semibold">P01100010688</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/projects', label: 'projects' },
              { to: '/layout-plan', label: 'Layout Plan' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/location', label: 'Location' },
              { to: '/contact', label: 'Contact Us' },
              { to: '/client-login', label: 'My Inquiries' },
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2">
                  <span className="text-orange-500">›</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Info */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">NIMZ CITY</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">›</span>
              <span>DTCP Approved Residential Villa Plots</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">›</span>
              <span className="text-green-400">RERA Regd. No. P01100010688</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">›</span>
              <span>{approvalDetails.syNo}, {approvalDetails.village}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">›</span>
              <span>{approvalDetails.mandal}, {approvalDetails.district}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">›</span>
              <span>Spot Registration & Bank Loan Available</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">›</span>
              <span>Beside NIMZ — NH 65</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
          <ul className="space-y-3 text-sm">
            {contact.phones.map(p => (
              <li key={p} className="flex items-center gap-2 text-gray-400">
                <Phone size={14} className="text-orange-400 flex-shrink-0" />
                <a href={`tel:${p.replace(/\s/g,'')}`} className="hover:text-orange-400 transition-colors">{p}</a>
              </li>
            ))}
            <li className="flex items-center gap-2 text-gray-400">
              <Mail size={14} className="text-orange-400 flex-shrink-0" />
              <a href={`mailto:${contact.email}`} className="hover:text-orange-400 transition-colors">{contact.email}</a>
            </li>
            <li className="flex items-start gap-2 text-gray-400">
              <MapPin size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{contact.officeAddress}</span>
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <Clock size={14} className="text-orange-400 flex-shrink-0" />
              <span>{contact.officeHours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-orange-500/10 py-4 px-4 sm:px-6">
        <div className="px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ABIVYA GROUP. All Rights Reserved.</p>
          <p className="italic text-center text-gray-600 text-xs sm:max-w-xl">
            {propertyInfo.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
