import React from 'react';
import { MessageCircle, FileText, PhoneCall, ShieldCheck, Clock } from 'lucide-react';
import { initialBusinessInfo } from '../data/mockData';
import { buildWhatsAppUrl } from '../data/storage';

interface FinalCTASectionProps {
  onOpenQuoteModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenQuoteModal }) => {
  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(
      initialBusinessInfo.whatsappPrimary,
      "Hello IAN'S Travel & Tours, I would like to begin planning my travel journey."
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F0F7FB]/60 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-xl text-center relative overflow-hidden">
          {/* Subtle decorative sky blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7EC8E3]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#556B4A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-block px-3 py-1 bg-[#0B2A4A]/5 text-xs font-bold uppercase tracking-widest text-[#0B2A4A] rounded-full">
              Start Today
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2A4A] tracking-tight font-heading leading-tight">
              Your journey starts with a conversation.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tell us where you want to go, what you need, and when you want to travel. We'll help you take the next step — with reliable fares, clear guidance, and human care.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {/* Primary: Brand Green WhatsApp Styling (Visually Dominant) */}
              <button
                id="final-whatsapp-primary-cta"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </button>

              {/* Secondary: Request a Quote */}
              <button
                id="final-quote-secondary-cta"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto px-8 py-4 bg-[#0B2A4A] hover:bg-[#12395E] text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-95"
              >
                <FileText className="w-4 h-4 text-[#7EC8E3]" />
                <span>Request a Detailed Quote</span>
              </button>
            </div>

            {/* Office reassurance */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#556B4A]" />
                <span>Office: Mon–Fri 08:00–18:00</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#3FA9DD]" />
                <span>24/7 Helpline: +250 783 553 278</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#556B4A]" />
                <span>Town Center Building, Kigali</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
