import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  onRequestQuote: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onRequestQuote,
}) => {
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (approvedTestimonials.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length);
  };

  const prevSlide = () => {
    if (approvedTestimonials.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + approvedTestimonials.length) % approvedTestimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7A15A]/15 text-xs font-bold uppercase tracking-wider text-[#92702c] mb-3">
              <Star className="w-3.5 h-3.5 fill-[#C7A15A] text-[#C7A15A]" />
              <span>Traveler Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight font-heading">
              Real journeys. Real people.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Authentic stories from individuals, families, and organizations who trusted IAN’S Travel & Tours with their itinerary.
            </p>
          </div>

          {approvedTestimonials.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="p-2.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {approvedTestimonials.length === 0 ? (
          /* Elegant Placeholder / Verified Empty State per §19 & §43 */
          <div className="p-10 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-center max-w-xl mx-auto">
            <Quote className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0B2A4A] font-heading mb-1">
              Verified Traveler Testimonials
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              We publish exclusively genuine traveler feedback approved directly by our team. Have you recently traveled with IAN'S? Share your feedback with us!
            </p>
            <button
              onClick={onRequestQuote}
              className="px-4 py-2 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl"
            >
              Plan Your Journey With Us
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedTestimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating
                            ? 'text-[#C7A15A] fill-[#C7A15A]'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-bold text-slate-500 ml-1.5">
                      Verified Client
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{t.review}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2A4A] font-heading">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-[#556B4A] font-semibold">
                      {t.serviceUsed}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {t.location} · {t.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transparency banner */}
        <div className="mt-8 p-3.5 bg-slate-50/80 border border-slate-200/60 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#556B4A]" />
            <span>Strict Authenticity: Only actual clients with confirmed travel bookings are featured.</span>
          </div>
          <span className="text-[11px] text-slate-400">Client Reviews Monitored by IAN'S Desk</span>
        </div>
      </div>
    </section>
  );
};
