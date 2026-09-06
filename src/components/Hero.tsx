import React from 'react';
import { MessageCircle, Compass, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { initialBusinessInfo } from '../data/mockData';
import { buildWhatsAppUrl } from '../data/storage';

interface HeroProps {
  onPlanTripClick: () => void;
  onSelectServiceCard?: (serviceId: string) => void;
}

interface ServiceCard {
  hook: string;
  label: string;
  image: string;
  alt: string;
  tag: string;
}

export const Hero: React.FC<HeroProps> = ({ onPlanTripClick, onSelectServiceCard }) => {
  const serviceCards: ServiceCard[] = [
    {
      hook: 'Arrive',
      label: 'Airport Transfers & Chauffeur',
      tag: 'Kigali International (KGL)',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      alt: 'Professional airport pickup transfer in Rwanda',
    },
    {
      hook: 'Explore',
      label: 'Guided Tours & Safaris',
      tag: 'Volcanoes · Akagera · Kivu',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      alt: 'Travelers exploring nature and wildlife safari in Rwanda',
    },
    {
      hook: 'Fly',
      label: 'Domestic & International Flights',
      tag: 'Worldwide Routes & Fares',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      alt: 'African passenger boarding flight at airport terminal',
    },
    {
      hook: 'Rest',
      label: 'Curated Hotel Reservations',
      tag: 'Tailored to Your Budget',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      alt: 'Relaxing luxury safari lodge and hotel in Rwanda',
    },
  ];

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(
      initialBusinessInfo.whatsappPrimary,
      "Hello IAN'S Travel & Tours, I would like to plan a trip with you."
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F0F7FB]/70 via-[#F8FAFC] to-[#F8FAFC]"
    >
      {/* Subtle background ambient travel accents (light, non-distracting) */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#7EC8E3]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#556B4A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Vertical Auto-Scrolling Service Story Gallery (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 order-2 lg:order-1">
            <div className="relative h-[560px] rounded-3xl overflow-hidden bg-white/70 p-3 shadow-xl border border-slate-200/80 backdrop-blur-sm group">
              {/* Top & Bottom gradient mask for smooth fading */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

              {/* Looping Marquee Cards */}
              <div className="h-full overflow-hidden pause-on-hover">
                <div className="animate-marquee-up flex flex-col gap-4">
                  {/* Duplicate twice for seamless loop */}
                  {[...serviceCards, ...serviceCards].map((card, idx) => (
                    <div
                      key={`${card.hook}-${idx}`}
                      className="relative h-[210px] w-full rounded-2xl overflow-hidden shadow-md flex-shrink-0 cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                      onClick={() => onPlanTripClick()}
                    >
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Gradient overlay for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/90 via-[#0B2A4A]/30 to-transparent" />

                      {/* Content tags */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-white/95 bg-[#0B2A4A]/60 backdrop-blur-md rounded-full border border-white/20">
                          {card.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-3.5 left-4 right-4 text-white">
                        <div className="flex items-baseline gap-2">
                          <h4 className="text-2xl font-black tracking-tight text-white font-heading">
                            {card.hook}
                          </h4>
                          <span className="text-xs text-[#7EC8E3] font-medium">• IAN'S Experience</span>
                        </div>
                        <p className="text-xs font-medium text-slate-200 mt-0.5">
                          {card.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Small interactive helper pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full text-[11px] text-slate-500 shadow-sm pointer-events-none">
                Hover to pause service gallery
              </div>
            </div>
          </div>

          {/* Right/Center Column: Hero Pitch & CTAs (Fixed, High Prominence) */}
          <div className="lg:col-span-7 xl:col-span-7 order-1 lg:order-2 space-y-6 lg:pl-4">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A4A]/5 border border-[#3FA9DD]/30 text-xs font-semibold text-[#0B2A4A]">
              <span className="w-2 h-2 rounded-full bg-[#3FA9DD] animate-pulse" />
              <span>Rwanda • East Africa • Beyond</span>
            </div>

            {/* H1 & Sub-headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-[#0B2A4A] leading-[1.1] font-heading">
                IAN'S TRAVEL & TOURS
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#3FA9DD] font-heading">
                Conquer the world with us!
              </p>
            </div>

            {/* Supporting line */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Flights, tours, hotels and travel assistance from Rwanda to destinations across Africa and beyond. Dedicated to personal care, reliable routing, and trustworthy service throughout your entire voyage.
            </p>

            {/* Mobile horizontal service strip per Specification §11 */}
            <div className="lg:hidden pt-2 pb-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#3FA9DD]" />
                <span>Our Core Travel Capabilities:</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                {serviceCards.map((card) => (
                  <div
                    key={card.hook}
                    onClick={onPlanTripClick}
                    className="relative flex-shrink-0 w-44 h-28 rounded-xl overflow-hidden shadow-sm snap-start cursor-pointer border border-slate-200"
                  >
                    <img src={card.image} alt={card.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/90 via-[#0B2A4A]/40 to-transparent" />
                    <div className="absolute bottom-2 left-2.5 right-2 text-white">
                      <p className="text-base font-bold font-heading">{card.hook}</p>
                      <p className="text-[10px] text-slate-200 truncate">{card.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-plan-trip-cta"
                onClick={onPlanTripClick}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0B2A4A] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:bg-[#12395E] hover:ring-2 hover:ring-[#7EC8E3]/50 active:scale-[0.99]"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#7EC8E3]" />
              </button>

              <button
                id="hero-whatsapp-cta"
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border-2 border-[#25D366] text-[#1E7E34] hover:bg-[#25D366]/10 font-semibold text-sm transition-all duration-200 active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Micro trust indicators */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#556B4A]" />
                <span>Zero account required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#556B4A]" />
                <span>24/7 Phone support</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3FA9DD]" />
                <span>Registered in Rwanda</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
