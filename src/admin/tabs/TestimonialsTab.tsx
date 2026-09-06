import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { TestimonialItem } from "../../types";

interface TestimonialsTabProps {
  testimonials: TestimonialItem[];
  onAddTestimonial: () => void;
  onToggleApproval: (testimonial: TestimonialItem) => void;
  onDeleteTestimonial: (id: string) => void;
}

export const TestimonialsTab: React.FC<TestimonialsTabProps> = ({
  testimonials,
  onAddTestimonial,
  onToggleApproval,
  onDeleteTestimonial,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
            Testimonials & Reviews
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Client satisfaction statements. Per §31 & §43: Only approved
            testimonials appear on the public site.
          </p>
        </div>
        <button
          onClick={onAddTestimonial}
          className="px-4 py-2 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <img
                src={t.photo}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <span className="text-[10px] text-slate-400">
                    ({t.location})
                  </span>
                </div>
                <p className="text-[11px] text-[#556B4A] font-semibold">
                  {t.serviceUsed}
                </p>
                <p className="text-xs text-slate-600 italic line-clamp-2 mt-0.5">
                  "{t.review}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                onClick={() => onToggleApproval(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  t.isApproved
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {t.isApproved ? "✓ Publicly Approved" : "Hidden / Unapproved"}
              </button>

              <button
                onClick={() => onDeleteTestimonial(t.id)}
                className="text-red-500 hover:text-red-700 p-1.5"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
