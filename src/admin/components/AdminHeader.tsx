import React from "react";
import { Shield, LogOut } from "lucide-react";
import { BrandLogo } from "../../components/BrandLogo";

interface AdminHeaderProps {
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-[#0B2A4A] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#12395E] shadow-sm">
      <div className="flex items-center gap-3">
        <BrandLogo variant="light" size="sm" showSlogan={false} />
        <span className="hidden sm:inline text-slate-400">|</span>
        <span className="text-xs font-semibold text-slate-200 tracking-wide uppercase font-heading">
          Management Console (MVP)
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-slate-200">
          <Shield className="w-3.5 h-3.5 text-[#7EC8E3]" />
          <span>
            Admin: <strong className="text-white">shema...@gmail.com</strong>
          </span>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Console</span>
        </button>
      </div>
    </header>
  );
};
