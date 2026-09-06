import React from "react";
import { RefreshCw, Trash2 } from "lucide-react";
import { FlightEnquiry, EnquiryStatus } from "../../types";
import { StatusSelect } from "../components/StatusSelect";

interface FlightsTabProps {
  flightEnquiries: FlightEnquiry[];
  onUpdateStatus: (id: string, status: EnquiryStatus) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export const FlightsTab: React.FC<FlightsTabProps> = ({
  flightEnquiries,
  onUpdateStatus,
  onDelete,
  onRefresh,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
            Flight Enquiries Desk
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming flight itinerary and fare quote requests.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Ref & Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Route & Dates</th>
                <th className="py-3 px-4">Class & Group</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {flightEnquiries.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-slate-800 block">
                      {f.id}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(f.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">
                      {f.customerName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {f.phoneOrEmail}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">
                      {f.departureCity} ➔ {f.destinationCity}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Dept: {f.departureDate}{" "}
                      {f.returnDate ? `· Ret: ${f.returnDate}` : ""}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">
                      {f.flightClass}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {f.travelers} traveler(s) · {f.tripType}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-500">
                    {f.additionalNotes || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <StatusSelect
                      value={f.status}
                      onChange={(status) => onUpdateStatus(f.id, status)}
                    />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDelete(f.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
