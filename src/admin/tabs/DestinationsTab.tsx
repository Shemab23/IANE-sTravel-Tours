import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { DestinationItem } from "../../types";

interface DestinationsTabProps {
  destinations: DestinationItem[];
  onAddDestination: () => void;
  onToggleFeatured: (destination: DestinationItem) => void;
  onDeleteDestination: (destination: DestinationItem) => void;
}

export const DestinationsTab: React.FC<DestinationsTabProps> = ({
  destinations,
  onAddDestination,
  onToggleFeatured,
  onDeleteDestination,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
            Destinations Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Regions, cities, and national parks supported by IAN'S Travel &
            Tours.
          </p>
        </div>
        <button
          onClick={onAddDestination}
          className="px-4 py-2 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Destination</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {destinations.map((d) => (
          <div
            key={d.id}
            className="p-4 bg-white rounded-2xl border border-slate-200 flex gap-4 items-start shadow-xs"
          >
            <img
              src={d.image}
              alt={d.name}
              className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-[#0B2A4A]">
                  {d.region} · {d.country}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleFeatured(d)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      d.isFeatured
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {d.isFeatured ? "★ Featured" : "☆ Standard"}
                  </button>
                  <button
                    onClick={() => onDeleteDestination(d)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{d.name}</h4>
              <p className="text-[11px] text-slate-600 italic">"{d.tagline}"</p>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {d.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
