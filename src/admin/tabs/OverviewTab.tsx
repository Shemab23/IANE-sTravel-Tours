import React from "react";
import { Plane, FileText, Compass, Star } from "lucide-react";
import {
  FlightEnquiry,
  QuoteRequest,
  TourItem,
  TestimonialItem,
  EnquiryStatus,
} from "../../types";
import { StatusPill } from "../components/StatusPill";
import { TabType } from "../adminTypes";

interface OverviewTabProps {
  flightEnquiries: FlightEnquiry[];
  quoteRequests: QuoteRequest[];
  tours: TourItem[];
  testimonials: TestimonialItem[];
  onGoToTab: (tab: TabType) => void;
  onAdvanceFlightStatus: (id: string, status: EnquiryStatus) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  flightEnquiries,
  quoteRequests,
  tours,
  testimonials,
  onGoToTab,
  onAdvanceFlightStatus,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
          Dashboard Overview
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Active enquiries, tour catalog counts, and recent traveler
          interactions.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Flight Enquiries
            </span>
            <Plane className="w-4 h-4 text-[#3FA9DD]" />
          </div>
          <p className="text-2xl font-black text-[#0B2A4A] font-heading">
            {flightEnquiries.length}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {flightEnquiries.filter((f) => f.status === "New").length} pending
            review
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Quote Requests
            </span>
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-[#0B2A4A] font-heading">
            {quoteRequests.length}
          </p>
          <span className="text-[11px] text-amber-600 font-semibold">
            {quoteRequests.filter((q) => q.status === "New").length} new
            requests
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Active Tours
            </span>
            <Compass className="w-4 h-4 text-[#556B4A]" />
          </div>
          <p className="text-2xl font-black text-[#0B2A4A] font-heading">
            {tours.length}
          </p>
          <span className="text-[11px] text-slate-500 font-semibold">
            {tours.filter((t) => t.isFeatured).length} featured itineraries
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Approved Reviews
            </span>
            <Star className="w-4 h-4 text-[#C7A15A]" />
          </div>
          <p className="text-2xl font-black text-[#0B2A4A] font-heading">
            {testimonials.filter((t) => t.isApproved).length}
          </p>
          <span className="text-[11px] text-slate-500 font-semibold">
            {testimonials.length} total entries
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#0B2A4A] font-heading uppercase tracking-wider">
            Recent Flight Inquiries
          </h3>
          <button
            onClick={() => onGoToTab("flights")}
            className="text-xs font-bold text-[#3FA9DD] hover:underline"
          >
            View all flights →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Ref</th>
                <th className="py-2.5 px-3">Traveler</th>
                <th className="py-2.5 px-3">Route</th>
                <th className="py-2.5 px-3">Departure</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {flightEnquiries.slice(0, 4).map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                    {enquiry.id}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-800">
                      {enquiry.customerName}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {enquiry.phoneOrEmail}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-700">
                    {enquiry.departureCity} ➔ {enquiry.destinationCity}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {enquiry.departureDate}
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusPill status={enquiry.status} />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() =>
                        onAdvanceFlightStatus(
                          enquiry.id,
                          enquiry.status === "New" ? "Contacted" : "Processing",
                        )
                      }
                      className="text-xs font-semibold text-[#0B2A4A] hover:underline"
                    >
                      Advance
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
