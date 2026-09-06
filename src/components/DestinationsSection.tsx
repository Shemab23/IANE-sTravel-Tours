import React, { useState } from 'react';
import { MapPin, ArrowRight, Compass, Sparkles, Check } from 'lucide-react';
import { DestinationItem } from '../types';

interface DestinationsSectionProps {
  destinations: DestinationItem[];
  onRequestDestinationQuote: (destinationName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  destinations,
  onRequestDestinationQuote,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'Rwanda', 'East Africa', 'Dubai', 'Europe'];

  const filteredDestinations =
    selectedRegion === 'All'
      ? destinations
      : destinations.filter((d) => d.region === selectedRegion);

  return (
    <section id="destinations" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3FA9DD]/10 text-xs font-bold uppercase tracking-wider text-[#3FA9DD] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Regions We Connect</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
              Your next destination is waiting.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Rwanda, East Africa, Dubai, Europe and global hubs — presented as personalized itineraries we curate, not rigid packages.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRegion === region
                    ? 'bg-[#0B2A4A] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Card Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#3FA9DD]/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/80 via-transparent to-black/20" />
                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#0B2A4A]/80 backdrop-blur-md rounded-full border border-white/20">
                    {dest.region}
                  </span>
                  {dest.isFeatured && (
                    <span className="px-2.5 py-1 text-[11px] font-bold text-slate-900 bg-[#C7A15A] rounded-full shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-xs text-[#7EC8E3] font-semibold">{dest.country}</p>
                  <h3 className="text-lg font-bold font-heading leading-snug">{dest.name}</h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[#556B4A] italic mb-2">
                    "{dest.tagline}"
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Curated Highlights:
                    </span>
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#3FA9DD] flex-shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60">
                  <button
                    onClick={() => onRequestDestinationQuote(dest.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#0B2A4A] text-[#0B2A4A] hover:text-white border border-slate-300 hover:border-[#0B2A4A] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs group-hover:bg-[#0B2A4A] group-hover:text-white"
                  >
                    <span>Inquire About {dest.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
