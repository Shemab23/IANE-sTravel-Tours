import React from "react";
import { Lock } from "lucide-react";

interface AdminEntranceButtonProps {
  onClick: () => void;
}

export const AdminEntranceButton: React.FC<AdminEntranceButtonProps> = ({
  onClick,
}) => (
  <button
    id="floating-admin-entrance-btn"
    onClick={onClick}
    aria-label="Admin Entrance"
    title="Administrator Portal Entrance"
    className="fixed bottom-5 right-5 z-50 px-3.5 py-2.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white rounded-2xl shadow-xl border border-[#C7A15A]/40 flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 group"
  >
    <Lock className="w-3.5 h-3.5 text-[#C7A15A] group-hover:rotate-12 transition-transform" />
    <span className="tracking-wide">Admin Entrance</span>
  </button>
);
