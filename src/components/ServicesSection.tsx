import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#556B4A]/10 text-xs font-bold uppercase tracking-wider text-[#556B4A] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Travel Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
              Everything you need for the journey.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
              From your first flight search to the details of your trip, we're here to help make travel simpler.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Representing 6 specialized pillars of assistance
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 bg-white"
            >
              {/* Background Image with subtle zoom on hover */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Gradient Overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/95 via-[#0B2A4A]/40 to-black/10 transition-opacity duration-300 group-hover:from-[#0B2A4A] group-hover:via-[#0B2A4A]/50" />

              {/* Badge */}
              {service.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 text-[11px] font-bold text-white bg-[#0B2A4A]/70 backdrop-blur-md rounded-full border border-white/20">
                    {service.badge}
                  </span>
                </div>
              )}

              {/* Card Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 transition-transform duration-300">
                <h3 className="text-xl font-bold font-heading mb-1.5 text-white group-hover:text-[#7EC8E3] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed mb-3">
                  {service.shortDesc}
                </p>

                {/* Arrow link nudges right on hover */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#7EC8E3] group-hover:text-white transition-colors">
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
