import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, Mail, MessageCircle, Instagram, ArrowUp } from 'lucide-react';
import { initialBusinessInfo, initialServices } from '../data/mockData';
import { buildWhatsAppUrl } from '../data/storage';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(
      initialBusinessInfo.whatsappPrimary,
      "Hello IAN'S Travel & Tours, I am reaching out from your website."
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#0B2A4A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" size="lg" showSlogan={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Conquer the world with us! Dedicated to personal care, reliable flight options, tailored Rwanda and East Africa tours, hotel reservations, and visa guidance.
            </p>

            <div className="pt-2">
              <div className="text-[11px] font-semibold text-[#7EC8E3] mb-2 uppercase tracking-wider">
                Connect With Us On Social
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/iane_s_travelandtours"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <button
                  onClick={handleWhatsApp}
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-[#25D366]" />
                </button>
                <span className="text-xs text-slate-400">
                  TikTok: <strong>{initialBusinessInfo.tiktok}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#flights" className="hover:text-white transition-colors">
                  Flight Options
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-white transition-colors">
                  Guided Tours
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#rwanda" className="hover:text-white transition-colors">
                  Rwanda Experience
                </a>
              </li>
              <li>
                <a href="#credentials" className="hover:text-white transition-colors">
                  Credentials & 4th Year
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Travel FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Office
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Travel Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              {initialServices.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-[#7EC8E3] transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Office & Support Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Office & Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#7EC8E3] flex-shrink-0 mt-0.5" />
                <span>{initialBusinessInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#7EC8E3] flex-shrink-0" />
                <a href="tel:+250783553278" className="hover:text-white transition-colors">
                  +250 783 553 278
                </a>
                <span>·</span>
                <a href="tel:+250788724724" className="hover:text-white transition-colors">
                  +250 788 724 724
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7EC8E3] flex-shrink-0" />
                <a href="mailto:ianestraveltours@gmail.com" className="hover:text-white transition-colors truncate">
                  {initialBusinessInfo.email}
                </a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Coverage: Rwanda · East Africa · International
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Strictly no admin or login link per Specification §22) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} IAN'S TRAVEL & TOURS. All rights reserved. Registered in Rwanda.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
