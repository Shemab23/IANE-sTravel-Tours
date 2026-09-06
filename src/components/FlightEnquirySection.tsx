import React, { useState } from 'react';
import { Plane, Calendar, Users, Briefcase, MessageCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { FlightClass, FlightEnquiry, TripType } from '../types';
import { StorageService, buildWhatsAppUrl } from '../data/storage';
import { initialBusinessInfo } from '../data/mockData';

export const FlightEnquirySection: React.FC = () => {
  const [tripType, setTripType] = useState<TripType>('return');
  const [departureCity, setDepartureCity] = useState('Kigali (KGL)');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState<number>(1);
  const [flightClass, setFlightClass] = useState<FlightClass>('Economy');
  const [customerName, setCustomerName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [submittedEnquiry, setSubmittedEnquiry] = useState<FlightEnquiry | null>(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!departureCity.trim()) {
      setFormError('Please provide a departure city or airport.');
      return;
    }
    if (!destinationCity.trim()) {
      setFormError('Please specify your destination city or airport.');
      return;
    }
    if (!departureDate) {
      setFormError('Please choose a departure date.');
      return;
    }
    if (tripType === 'return' && !returnDate) {
      setFormError('Please specify a return date or select One-Way.');
      return;
    }
    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phoneOrEmail.trim()) {
      setFormError('Please enter your phone number or email so we can reach you with options.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay, then persist to local store
    setTimeout(() => {
      const newEnquiry = StorageService.saveFlightEnquiry({
        customerName: customerName.trim(),
        phoneOrEmail: phoneOrEmail.trim(),
        tripType,
        departureCity: departureCity.trim(),
        destinationCity: destinationCity.trim(),
        departureDate,
        returnDate: tripType === 'return' ? returnDate : undefined,
        travelers: Number(travelers) || 1,
        flightClass,
        additionalNotes: additionalNotes.trim() || undefined,
      });

      setIsSubmitting(false);
      setSubmittedEnquiry(newEnquiry);
    }, 500);
  };

  const handleWhatsAppContinuation = () => {
    if (!submittedEnquiry) return;
    const msg = `Hello IAN'S Travel & Tours, I submitted flight request ${submittedEnquiry.id} on your website:
- Passenger: ${submittedEnquiry.customerName}
- Route: ${submittedEnquiry.departureCity} ➔ ${submittedEnquiry.destinationCity}
- Dates: ${submittedEnquiry.departureDate} ${submittedEnquiry.returnDate ? 'to ' + submittedEnquiry.returnDate : '(One Way)'}
- Type: ${submittedEnquiry.tripType.toUpperCase()}, ${submittedEnquiry.travelers} traveler(s), ${submittedEnquiry.flightClass} class
Could you share flight availability and quote options?`;

    const url = buildWhatsAppUrl(initialBusinessInfo.whatsappPrimary, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const resetForm = () => {
    setSubmittedEnquiry(null);
    setDestinationCity('');
    setDepartureDate('');
    setReturnDate('');
    setAdditionalNotes('');
  };

  return (
    <section id="flights" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A4A]/5 border border-[#3FA9DD]/30 text-xs font-semibold text-[#0B2A4A] mb-3">
            <Plane className="w-3.5 h-3.5 text-[#3FA9DD]" />
            <span>Flight Booking Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
            Where will your journey take you?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Request flight itineraries with competitive fares. Domestic, regional across Africa, or worldwide connections.
          </p>
        </div>

        {submittedEnquiry ? (
          /* Polished Confirmation State per §14 */
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 text-center shadow-lg animate-fadeIn max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3">
              Request Logged · Ref #{submittedEnquiry.id}
            </span>

            <h3 className="text-2xl font-bold text-[#0B2A4A] font-heading mb-2">
              We have received your flight request!
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Thank you, <strong className="text-slate-800">{submittedEnquiry.customerName}</strong>. Our ticketing desk is checking optimal schedules for <strong className="text-slate-800">{submittedEnquiry.departureCity} ➔ {submittedEnquiry.destinationCity}</strong>.
            </p>

            {/* Quick summary pill container */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left mb-6">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Route</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {submittedEnquiry.departureCity} → {submittedEnquiry.destinationCity}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Dates</span>
                <span className="font-semibold text-slate-800 block">
                  {submittedEnquiry.departureDate}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Travelers</span>
                <span className="font-semibold text-slate-800 block">
                  {submittedEnquiry.travelers} · {submittedEnquiry.flightClass}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
                <span className="font-semibold text-amber-600 block">Under Review</span>
              </div>
            </div>

            {/* WhatsApp handoff button per §14 */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl mb-6 text-left">
              <p className="text-xs text-emerald-900 font-semibold mb-1 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Fastest Response Channel</span>
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed mb-3">
                For immediate pricing, seat holds, or urgent departures, connect with our ticketing desk on WhatsApp:
              </p>
              <button
                onClick={handleWhatsAppContinuation}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Continue on WhatsApp with Booking Summary</span>
              </button>
            </div>

            <button
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline underline-offset-4"
            >
              Submit another flight enquiry
            </button>
          </div>
        ) : (
          /* Flight Request Form */
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
            {/* Trip Type Selector */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {(['return', 'one-way', 'multi-city', 'group'] as TripType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTripType(type)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    tripType === type
                      ? 'bg-[#0B2A4A] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {type === 'return' ? 'Round Trip' : type === 'one-way' ? 'One Way' : type === 'multi-city' ? 'Multi-City' : 'Group Booking (10+)'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Departure & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Departure City / Airport *
                  </label>
                  <div className="relative">
                    <Plane className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      placeholder="e.g. Kigali (KGL), Entebbe, Nairobi"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Destination City / Airport *
                  </label>
                  <div className="relative">
                    <Plane className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 rotate-90" />
                    <input
                      type="text"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      placeholder="e.g. Dubai (DXB), Brussels, Johannesburg, London"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Departure Date, Return Date, Travelers, Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Departure Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800 font-medium"
                    />
                  </div>
                </div>

                {tripType === 'return' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Return Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Return Date
                    </label>
                    <div className="px-3.5 py-2.5 text-xs text-slate-400 bg-slate-100 border border-slate-200 rounded-xl">
                      Not required for {tripType}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Travelers *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Class *
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={flightClass}
                      onChange={(e) => setFlightClass(e.target.value as FlightClass)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800 font-medium"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business Class</option>
                      <option value="First">First Class</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Contact details & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Patrick Kalisa"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number or Email *
                  </label>
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="e.g. +250 788 123 456 or name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferences or Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Extra baggage, flexible dates (+/- 2 days), morning departure preferred"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3FA9DD] text-slate-800"
                />
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  {formError}
                </div>
              )}

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-[#556B4A]" />
                  <span>No payment required now. Fast quotation provided.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Request Flight Options</span>
                      <ArrowRight className="w-4 h-4 text-[#7EC8E3]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
