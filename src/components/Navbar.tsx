import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { MessageCircle, Menu, X, Lock, ShieldCheck } from 'lucide-react';
import { initialBusinessInfo } from '../data/mockData';
import { buildWhatsAppUrl } from '../data/storage';

interface NavbarProps {
  onOpenAdminAuth?: () => void;
  onAdminTrigger?: () => void;
  onOpenQuoteModal?: () => void;
  onRequestQuote?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdminAuth,
  onAdminTrigger,
  onOpenQuoteModal,
  onRequestQuote,
  activeSection = 'hero',
}) => {
  const triggerAdmin = onOpenAdminAuth || onAdminTrigger || (() => {});
  const triggerQuote = onOpenQuoteModal || onRequestQuote || (() => {});
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Flights', href: '#flights' },
    { label: 'Tours', href: '#tours' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Rwanda', href: '#rwanda' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleWhatsAppGeneral = () => {
    const url = buildWhatsAppUrl(
      initialBusinessInfo.whatsappPrimary,
      "Hello IAN'S Travel & Tours, I would like to inquire about your travel services."
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center group">
          <BrandLogo variant="dark" size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-[#0B2A4A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#3FA9DD] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions & Discreet Admin Trigger */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-quote-btn"
            onClick={triggerQuote}
            className="px-3.5 py-2 text-xs font-semibold text-[#0B2A4A] bg-[#0B2A4A]/5 hover:bg-[#0B2A4A]/10 rounded-xl transition-all"
          >
            Get a Quote
          </button>

          <button
            id="nav-whatsapp-btn"
            onClick={handleWhatsAppGeneral}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </button>

          {/* Admin Entrance Trigger */}
          <button
            id="nav-admin-entrance-btn"
            onClick={triggerAdmin}
            aria-label="Admin Entrance"
            title="Administrator Portal Entrance"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0B2A4A] bg-slate-100 hover:bg-[#0B2A4A] hover:text-white border border-slate-200/90 rounded-xl transition-all shadow-xs group"
          >
            <Lock className="w-3.5 h-3.5 text-[#3FA9DD] group-hover:text-[#7EC8E3] transition-colors" />
            <span className="tracking-wide">Admin Entrance</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleWhatsAppGeneral}
            aria-label="WhatsApp"
            className="p-2 rounded-lg bg-[#25D366] text-white"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                triggerQuote();
              }}
              className="w-full py-2.5 text-sm font-semibold text-[#0B2A4A] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
            >
              Request a Travel Quote
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppGeneral();
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          {/* Admin Entrance Trigger inside Mobile menu */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                triggerAdmin();
              }}
              className="w-full py-2 px-3 text-xs font-bold text-[#0B2A4A] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#3FA9DD]" />
              <span>Administrator Portal Entrance</span>
            </button>
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>IAN'S Travel & Tours · Kigali</span>
              <span>4th Year of Excellence</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
