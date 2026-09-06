import React from "react";
import { Save } from "lucide-react";

interface SectionCardProps {
  title: string;
  saveLabel: string;
  onSave: () => void;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  saveLabel,
  onSave,
  children,
}) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <h3 className="text-sm font-bold text-[#0B2A4A] font-heading uppercase tracking-wider">
        {title}
      </h3>
      <button
        onClick={onSave}
        className="px-3.5 py-1.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
      >
        <Save className="w-3.5 h-3.5" />
        <span>{saveLabel}</span>
      </button>
    </div>
    {children}
  </div>
);
