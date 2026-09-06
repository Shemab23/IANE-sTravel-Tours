import React, { useState } from 'react';
import { X, MessageCircle, CheckCircle2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { QuoteRequest } from '../types';
import { StorageService, buildWhatsAppUrl } from '../data/storage';
import { initialBusinessInfo } from '../data/mockData';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultDestination?: string;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Tailored Tour',
  defaultDestination = '',
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [serviceType, setServiceType] = useState(defaultService);
  const [destinations, setDestinations] = useState(defaultDestination);
  const [travelDates, setTravelDates] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [details, setDetails] = useState('');

  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!contact.trim()) {
      setFormError('Please provide your phone number or email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newQuote = StorageService.saveQuoteRequest({
        name: name.trim(),
        contact: contact.trim(),
        serviceType,
        destinations: destinations.trim() || undefined,
        travelDates: travelDates.trim() || undefined,
        estimatedBudget: estimatedBudget.trim() || undefined,
        groupSize: Number(groupSize) || 1,
        details: details.trim() || 'No additional notes provided.',
      });

      setIsSubmitting(false);
      setSubmittedQuote(newQuote);
    }, 450);
  };

  const handleWhatsAppContinuation = () => {
    if (!submittedQuote) return;
    const msg = `Hello IAN'S Travel & Tours, I requested a quote (${submittedQuote.id}) on your website:
- Client: ${submittedQuote.name}
- Service: ${submittedQuote.serviceType}
- Destination: ${submittedQuote.destinations || 'Flexible'}
- Group: ${submittedQuote.groupSize} traveler(s)
- Dates: ${submittedQuote.travelDates || 'Pending discussion'}
- Notes: ${submittedQuote.details}
Could you provide a detailed cost estimate and availability?`;

    const url = buildWhatsAppUrl(initialBusinessInfo.whatsappPrimary, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setSubmittedQuote(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0B2A4A]/5 text-[#0B2A4A] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B2A4A] font-heading">
                Request a Travel Quote
              </h3>
              <p className="text-xs text-slate-500">Customized pricing tailored to your schedule</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {submittedQuote ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                Quote Logged · Ref #{submittedQuote.id}
              </span>

              <h4 className="text-xl font-bold text-[#0B2A4A] font-heading">
                Thank you, {submittedQuote.name}!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your quotation request for <strong>{submittedQuote.serviceType}</strong> has been assigned to our travel planners. We will respond with transparent estimates.
              </p>

              {/* WhatsApp Fast Track */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span>Immediate WhatsApp Consultation</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Want to discuss options right away? Tap below to send this request directly to our WhatsApp travel team:
                </p>
                <button
                  onClick={handleWhatsAppContinuation}
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Forward Request on WhatsApp</span>
                </button>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+250... or email"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service Required
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  >
                    <option value="Tailored Tour">Tailored Tour (Rwanda / East Africa)</option>
                    <option value="Flight Booking">Flight Booking</option>
                    <option value="Hotel Reservation">Hotel Reservation</option>
                    <option value="Visa Assistance">Visa Assistance</option>
                    <option value="Airport Transfer">Airport Transfer</option>
                    <option value="Travel Insurance Assistance">Travel Insurance Assistance</option>
                    <option value="Corporate Travel Service">Corporate / Group Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Destination / Route
                  </label>
                  <input
                    type="text"
                    value={destinations}
                    onChange={(e) => setDestinations(e.target.value)}
                    placeholder="e.g. Volcanoes, Dubai, Akagera"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Travel Dates
                  </label>
                  <input
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    placeholder="e.g. June 2025"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Group Size
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Budget (Optional)
                  </label>
                  <input
                    type="text"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    placeholder="e.g. $1,000 - $2,000"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Specific Requirements or Details
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Preferences, children traveling, special assistance, hotel tier..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                />
              </div>

              {formError && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
                  {formError}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Zero booking fee.</span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Quote Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7EC8E3]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
