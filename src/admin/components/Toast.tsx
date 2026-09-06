import React from "react";
import { CheckCircle } from "lucide-react";

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-[#0B2A4A] text-white flex items-center justify-between shadow-lg animate-fadeIn border border-[#3FA9DD]/30">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-[#3FA9DD] flex-shrink-0" />
        <span className="text-xs sm:text-sm font-semibold">{message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-white text-xs px-2 py-1"
      >
        Dismiss
      </button>
    </div>
  );
};
