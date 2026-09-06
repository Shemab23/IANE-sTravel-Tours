import React from "react";
import { Trash2 } from "lucide-react";
import { QuoteRequest, EnquiryStatus } from "../../types";
import { StatusSelect } from "../components/StatusSelect";

interface QuotesTabProps {
  quoteRequests: QuoteRequest[];
  onUpdateStatus: (id: string, status: EnquiryStatus) => void;
  onDelete: (id: string) => void;
}

export const QuotesTab: React.FC<QuotesTabProps> = ({
  quoteRequests,
  onUpdateStatus,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
          Quote Requests
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          General bespoke trip and service quotes submitted via modals and
          forms.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Ref</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Service & Destination</th>
                <th className="py-3 px-4">Group & Dates</th>
                <th className="py-3 px-4">Requirements</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quoteRequests.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">
                    {q.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{q.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {q.contact}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">
                      {q.serviceType}
                    </div>
                    <div className="text-[11px] text-[#556B4A]">
                      {q.destinations || "Flexible"}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{q.groupSize ? `${q.groupSize} people` : "—"}</div>
                    <div className="text-[10px] text-slate-500">
                      {q.travelDates || "Flexible"}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-600">
                    {q.details}
                  </td>
                  <td className="py-3 px-4">
                    <StatusSelect
                      value={q.status}
                      onChange={(status) => onUpdateStatus(q.id, status)}
                    />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDelete(q.id)}
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
