import React from "react";
import { EnquiryStatus } from "../../types";

const styles: Record<EnquiryStatus, string> = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-slate-100 text-slate-600",
  Processing: "bg-amber-100 text-amber-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-slate-100 text-slate-600",
};

export const StatusPill: React.FC<{ status: EnquiryStatus }> = ({ status }) => (
  <span
    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
      styles[status] || "bg-slate-100 text-slate-600"
    }`}
  >
    {status}
  </span>
);
