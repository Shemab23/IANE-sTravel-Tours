import React from "react";
import { EnquiryStatus } from "../../types";

interface StatusSelectProps {
  value: EnquiryStatus;
  onChange: (status: EnquiryStatus) => void;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as EnquiryStatus)}
    className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-700"
  >
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Processing">Processing</option>
    <option value="Completed">Completed</option>
    <option value="Cancelled">Cancelled</option>
  </select>
);
