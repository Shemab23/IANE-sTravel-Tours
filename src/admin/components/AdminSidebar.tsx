import React from "react";
import {
  LayoutDashboard,
  Plane,
  FileText,
  Compass,
  MapPin,
  Star,
  Edit3,
  Clock,
} from "lucide-react";
import { TabType } from "../adminTypes";

interface AdminSidebarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  newFlightCount: number;
  newQuoteCount: number;
  toursCount: number;
  destinationsCount: number;
  testimonialsCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onChangeTab,
  newFlightCount,
  newQuoteCount,
  toursCount,
  destinationsCount,
  testimonialsCount,
}) => {
  const navBtnClass = (tab: TabType) =>
    `w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
      activeTab === tab
        ? "bg-[#0B2A4A] text-white shadow-xs"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-4 space-y-1">
      <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        Operational Desk
      </div>

      <button
        onClick={() => onChangeTab("overview")}
        className={navBtnClass("overview")}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Overview</span>
      </button>

      <button
        onClick={() => onChangeTab("flights")}
        className={`${navBtnClass("flights")} justify-between`}
      >
        <div className="flex items-center gap-2.5">
          <Plane className="w-4 h-4" />
          <span>Flight Enquiries</span>
        </div>
        {newFlightCount > 0 && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#3FA9DD] text-white">
            {newFlightCount}
          </span>
        )}
      </button>

      <button
        onClick={() => onChangeTab("quotes")}
        className={`${navBtnClass("quotes")} justify-between`}
      >
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4" />
          <span>Quote Requests</span>
        </div>
        {newQuoteCount > 0 && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white">
            {newQuoteCount}
          </span>
        )}
      </button>

      <div className="pt-4 px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        Catalog & Content
      </div>

      <button
        onClick={() => onChangeTab("tours")}
        className={navBtnClass("tours")}
      >
        <Compass className="w-4 h-4" />
        <span>Tours ({toursCount})</span>
      </button>

      <button
        onClick={() => onChangeTab("destinations")}
        className={navBtnClass("destinations")}
      >
        <MapPin className="w-4 h-4" />
        <span>Destinations ({destinationsCount})</span>
      </button>

      <button
        onClick={() => onChangeTab("testimonials")}
        className={navBtnClass("testimonials")}
      >
        <Star className="w-4 h-4" />
        <span>Testimonials ({testimonialsCount})</span>
      </button>

      <button
        onClick={() => onChangeTab("content")}
        className={navBtnClass("content")}
      >
        <Edit3 className="w-4 h-4" />
        <span>Site Content Editor (§32)</span>
      </button>

      <button
        onClick={() => onChangeTab("logs")}
        className={navBtnClass("logs")}
      >
        <Clock className="w-4 h-4" />
        <span>Simulated Change Logs</span>
      </button>

      <div className="pt-6">
        <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-[11px] text-blue-900 leading-relaxed">
          <strong>MVP Environment:</strong> Content editor changes simulate
          saving with alerts per client specs. Storage is ready for database
          binding.
        </div>
      </div>
    </aside>
  );
};
