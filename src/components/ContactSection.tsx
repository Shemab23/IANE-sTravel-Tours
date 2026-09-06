import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Instagram } from 'lucide-react';
import { initialBusinessInfo, initialServices } from '../data/mockData';
import { StorageService, buildWhatsAppUrl } from '../data/storage';

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [serviceInterested, setServiceInterested] = useState('General Travel Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailOrPhone.trim() || !message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      StorageService.saveContactMessage({
        fullName: fullName.trim(),
        emailOrPhone: emailOrPhone.trim(),
        serviceInterested,
        message: message.trim(),
      });
      setIsSending(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleDirectWhatsApp = () => {
    const url = buildWhatsAppUrl(
      initialBusinessInfo.whatsappPrimary,
      "Hello IAN'S Travel & Tours, I would like to speak with a travel advisor."
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#556B4A] mb-2">
                Get in Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
                We are right here in Rwanda.
              </h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Visit our Kigali offices at Town Center Building, call our 24/7 hotline, or send a message directly to our travel team.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-[#0B2A4A]/5 text-[#0B2A4A] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Office Location</h4>
                  <p className="text-sm font-bold text-[#0B2A4A] mt-0.5">
                    {initialBusinessInfo.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Rwanda · East Africa · International</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-[#3FA9DD]/10 text-[#3FA9DD] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Lines (24/7 Support)</h4>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1">
                    <a
                      href={`tel:${initialBusinessInfo.phonePrimary.replace(/\s+/g, '')}`}
                      className="text-sm font-bold text-[#0B2A4A] hover:text-[#3FA9DD] transition-colors"
                    >
                      {initialBusinessInfo.phonePrimary}
                    </a>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <a
                      href={`tel:${initialBusinessInfo.phoneSecondary.replace(/\s+/g, '')}`}
                      className="text-sm font-bold text-[#0B2A4A] hover:text-[#3FA9DD] transition-colors"
                    >
                      {initialBusinessInfo.phoneSecondary}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-[#0B2A4A]/5 text-[#0B2A4A] flex items-center justify-center mb-2">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Inquiry</h4>
                  <a
                    href={`mailto:${initialBusinessInfo.email}`}
                    className="text-xs font-bold text-[#0B2A4A] hover:text-[#3FA9DD] block truncate mt-1"
                  >
                    {initialBusinessInfo.email}
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 text-[#1E7E34] flex items-center justify-center mb-2">
                    <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                  </div>
                  <h4 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">WhatsApp Direct</h4>
                  <button
                    onClick={handleDirectWhatsApp}
                    className="text-xs font-bold text-[#1E7E34] hover:underline block truncate mt-1 text-left"
                  >
                    +250 783 553 278 (Chat Now)
                  </button>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-600">
                  <strong>Office Hours:</strong> {initialBusinessInfo.hours}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2A4A] font-heading">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. A travel consultant from IAN'S will review your message and reply promptly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#0B2A4A] font-heading mb-4">
                  Send a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Marie Claire"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address or Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="e.g. claire@example.com / +250..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Interested In (Optional)
                  </label>
                  <select
                    value={serviceInterested}
                    onChange={(e) => setServiceInterested(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  >
                    <option value="General Travel Inquiry">General Travel Inquiry</option>
                    {initialServices.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Custom Rwanda Safari">Custom Rwanda Safari</option>
                    <option value="Corporate Delegation Booking">Corporate Delegation Booking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Travel Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what dates, destinations, or questions you have in mind..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    No account required. Fast email/phone reply.
                  </span>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-3 bg-[#0B2A4A] hover:bg-[#12395E] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#7EC8E3]" />
                    <span>{isSending ? 'Transmitting...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
