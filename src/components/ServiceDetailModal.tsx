import React from 'react';
import { X, MessageCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { ServiceItem } from '../types';
import { initialBusinessInfo } from '../data/mockData';
import { buildWhatsAppUrl } from '../data/storage';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenFlightEnquiry: () => void;
  onOpenQuoteRequest: (serviceName?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenFlightEnquiry,
  onOpenQuoteRequest,
}) => {
  if (!service) return null;

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(initialBusinessInfo.whatsappPrimary, service.whatsappPrompt);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Header */}
        <div className="relative h-56 w-full">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A] via-[#0B2A4A]/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            {service.badge && (
              <span className="inline-block px-2.5 py-1 text-[11px] font-bold text-white bg-[#3FA9DD] rounded-full mb-1.5 shadow-sm">
                {service.badge}
              </span>
            )}
            <h3 className="text-2xl font-black font-heading tracking-tight">{service.title}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed font-normal">{service.fullDesc}</p>

          {/* Explicit Legal Disclaimers for Visa & Insurance & Hotels per prompt */}
          {service.id === 'visa' && (
            <div className="p-3 bg-amber-50/90 border border-amber-200/80 rounded-xl text-xs text-amber-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Important Note:</strong> IAN'S Travel & Tours provides administrative guidance, appointment scheduling, and document review. Consular approvals and visa decisions remain strictly under the authority of individual embassies.
              </span>
            </div>
          )}

          {service.id === 'insurance' && (
            <div className="p-3 bg-blue-50/90 border border-blue-200/80 rounded-xl text-xs text-blue-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-[#3FA9DD] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Underwriting Partners:</strong> Travel insurance products are issued and underwritten by licensed partner institutions (Radiant Insurance & Sanlam Allianz General Insurance). IAN'S acts as an organizing travel facilitator.
              </span>
            </div>
          )}

          {service.id === 'hotels' && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
              <span>
                Accommodation reservations are tailored to your budget and travel dates across verified hospitality partners in Rwanda and abroad.
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            {service.id === 'flights' ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenFlightEnquiry();
                }}
                className="flex-1 py-3 px-4 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Request Flight Options</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteRequest(service.title);
                }}
                className="flex-1 py-3 px-4 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Request Service Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleWhatsApp}
              className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp Inquiry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
