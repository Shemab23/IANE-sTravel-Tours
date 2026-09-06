import React, { useState } from "react";
import { Clock, MapPin, ArrowRight, Compass, Users, Check } from "lucide-react";
import { TourItem } from "../types";

interface ToursSectionProps {
  tours: TourItem[];
  onPlanCustomTripClick: (tourTitle?: string) => void;
}

export const ToursSection: React.FC<ToursSectionProps> = ({
  tours,
  onPlanCustomTripClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Rwanda",
    "East Africa",
    "Group",
    "Private",
    "Family",
    "Corporate",
  ];

  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter(
          (t) => t.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <section id="tours" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#556B4A]/10 text-xs font-bold uppercase tracking-wider text-[#556B4A] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Tailored Expeditions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
              Not every journey should look the same.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Tell us what you want to experience, and we'll help shape the
              journey around you. Private groups, family adventures, or
              corporate delegates.
            </p>
          </div>

          <button
            id="plan-custom-trip-btn"
            onClick={() => onPlanCustomTripClick()}
            className="px-5 py-3 rounded-xl bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 self-start md:self-auto"
          >
            <span>Plan a Custom Trip</span>
            <ArrowRight className="w-4 h-4 text-[#7EC8E3]" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#556B4A] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-slate-50/80 rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#3FA9DD]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with duration tag */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-200">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#0B2A4A]/80 backdrop-blur-md rounded-full">
                      {tour.category}
                    </span>
                    {tour.isFeatured && (
                      <span className="px-2.5 py-1 text-[11px] font-bold text-slate-900 bg-[#C7A15A] rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1 text-[#7EC8E3]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{tour.duration}</span>
                    </span>
                    <span className="text-[11px] text-slate-300 truncate max-w-[160px]">
                      {tour.destination}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-[#0B2A4A] font-heading line-clamp-2">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {tour.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Itinerary Highlights:
                    </span>
                    {tour.highlights.slice(0, 3).map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs text-slate-700"
                      >
                        <Check className="w-3.5 h-3.5 text-[#556B4A] flex-shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onPlanCustomTripClick(tour.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#0B2A4A] text-[#0B2A4A] hover:text-white border border-slate-300 hover:border-[#0B2A4A] text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>Customize This Tour</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
