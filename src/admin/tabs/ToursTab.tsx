import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { TourItem } from "../../types";

interface ToursTabProps {
  tours: TourItem[];
  onAddTour: () => void;
  onToggleFeatured: (tour: TourItem) => void;
  onDeleteTour: (tour: TourItem) => void;
}

export const ToursTab: React.FC<ToursTabProps> = ({
  tours,
  onAddTour,
  onToggleFeatured,
  onDeleteTour,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
            Tours Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage bespoke guided tour itineraries across Rwanda & East Africa.
          </p>
        </div>
        <button
          onClick={onAddTour}
          className="px-4 py-2 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tour</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tours.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white rounded-2xl border border-slate-200 flex gap-4 items-start shadow-xs"
          >
            <img
              src={t.image}
              alt={t.title}
              className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-[#0B2A4A]">
                  {t.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleFeatured(t)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      t.isFeatured
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {t.isFeatured ? "★ Featured" : "☆ Standard"}
                  </button>
                  <button
                    onClick={() => onDeleteTour(t)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                {t.title}
              </h4>
              <p className="text-[11px] text-[#556B4A] font-semibold">
                {t.duration} · {t.destination}
              </p>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {t.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
