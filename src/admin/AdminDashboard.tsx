import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Plane,
  FileText,
  Compass,
  MapPin,
  Star,
  Edit3,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Shield,
  Search,
  ExternalLink,
  Save,
  Bell,
  RefreshCw,
} from 'lucide-react';
import {
  DestinationItem,
  EnquiryStatus,
  FlightEnquiry,
  QuoteRequest,
  SectionContent,
  TestimonialItem,
  TourItem,
} from '../types';
import { StorageService } from '../data/storage';
import { initialSectionContent } from '../data/mockData';
import { BrandLogo } from '../components/BrandLogo';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType =
  | 'overview'
  | 'flights'
  | 'quotes'
  | 'tours'
  | 'destinations'
  | 'testimonials'
  | 'content'
  | 'logs';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // State loaded from StorageService
  const [flightEnquiries, setFlightEnquiries] = useState<FlightEnquiry[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [tours, setTours] = useState<TourItem[]>([]);
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [adminLogs, setAdminLogs] = useState<
    Array<{ timestamp: string; section: string; action: string; data: Record<string, unknown> }>
  >([]);

  // Content Editor draft state
  const [contentDraft, setContentDraft] = useState<SectionContent>(initialSectionContent);

  // Notifications / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const refreshData = () => {
    setFlightEnquiries(StorageService.getFlightEnquiries());
    setQuoteRequests(StorageService.getQuoteRequests());
    setTours(StorageService.getTours());
    setDestinations(StorageService.getDestinations());
    setTestimonials(StorageService.getTestimonials());
    setAdminLogs(StorageService.getAdminLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Status updates
  const handleUpdateFlightStatus = (id: string, status: EnquiryStatus) => {
    StorageService.updateFlightEnquiryStatus(id, status);
    refreshData();
    showToast(`Flight enquiry #${id} status updated to: ${status}`);
  };

  const handleDeleteFlight = (id: string) => {
    if (confirm(`Are you sure you want to delete flight enquiry #${id}?`)) {
      StorageService.deleteFlightEnquiry(id);
      refreshData();
      showToast(`Flight enquiry #${id} deleted.`);
    }
  };

  const handleUpdateQuoteStatus = (id: string, status: EnquiryStatus) => {
    StorageService.updateQuoteStatus(id, status);
    refreshData();
    showToast(`Quote request #${id} status updated to: ${status}`);
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm(`Delete quote request #${id}?`)) {
      StorageService.deleteQuoteRequest(id);
      refreshData();
      showToast(`Quote request #${id} deleted.`);
    }
  };

  const handleToggleTestimonial = (t: TestimonialItem) => {
    const updated = { ...t, isApproved: !t.isApproved };
    StorageService.saveTestimonial(updated);
    refreshData();
    showToast(`Testimonial by ${t.name} is now ${updated.isApproved ? 'Approved & Visible' : 'Hidden'}.`);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      StorageService.deleteTestimonial(id);
      refreshData();
      showToast('Testimonial removed.');
    }
  };

  // Section-by-Section Content Editor: MVP simulated persistence per §32
  const handleSimulateSaveSection = (sectionName: string, sectionData: Record<string, unknown>) => {
    StorageService.logAdminChange(sectionName, 'SAVE_SECTION', sectionData);
    setAdminLogs(StorageService.getAdminLogs());
    showToast(
      `Change captured for [${sectionName}] — will apply once connected to the live database.`
    );
  };

  const handleSimulateAddItem = (sectionName: string, itemName: string) => {
    StorageService.logAdminChange(sectionName, 'ADD_ITEM', { name: itemName });
    setAdminLogs(StorageService.getAdminLogs());
    showToast(
      `New item draft [${itemName}] captured — will apply once connected to the live database.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Bar with Administrator Identity per §25 */}
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

      {/* Main Console Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-4 space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Operational Desk
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#0B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('flights')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'flights'
                ? 'bg-[#0B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Plane className="w-4 h-4" />
              <span>Flight Enquiries</span>
            </div>
            {flightEnquiries.filter((f) => f.status === 'New').length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#3FA9DD] text-white">
                {flightEnquiries.filter((f) => f.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'quotes'
                ? 'bg-[#0B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Quote Requests</span>
            </div>
            {quoteRequests.filter((q) => q.status === 'New').length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white">
                {quoteRequests.filter((q) => q.status === 'New').length}
              </span>
            )}
          </button>

          <div className="pt-4 px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Catalog & Content
          </div>

          <button
            onClick={() => setActiveTab('tours')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'tours'
                ? 'bg-[#0B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tours ({tours.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'destinations'
                ? 'bg-[#0B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Destinations ({destinations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'testimonials'
                ? 'bg-[#0B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Testimonials ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'content'
                ? 'bg-[#0B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Site Content Editor (§32)</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'logs'
                ? 'bg-[#0B2A4A] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Simulated Change Logs</span>
          </button>

          {/* Architecture disclaimer banner */}
          <div className="pt-6">
            <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-[11px] text-blue-900 leading-relaxed">
              <strong>MVP Environment:</strong> Content editor changes simulate saving with alerts per client specs. Storage is ready for database binding.
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-6xl">
          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-[#0B2A4A] text-white flex items-center justify-between shadow-lg animate-fadeIn border border-[#3FA9DD]/30">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#3FA9DD] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
                  Dashboard Overview
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Active enquiries, tour catalog counts, and recent traveler interactions.
                </p>
              </div>

              {/* Metric Counts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Flight Enquiries</span>
                    <Plane className="w-4 h-4 text-[#3FA9DD]" />
                  </div>
                  <p className="text-2xl font-black text-[#0B2A4A] font-heading">
                    {flightEnquiries.length}
                  </p>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {flightEnquiries.filter((f) => f.status === 'New').length} pending review
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Quote Requests</span>
                    <FileText className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-black text-[#0B2A4A] font-heading">
                    {quoteRequests.length}
                  </p>
                  <span className="text-[11px] text-amber-600 font-semibold">
                    {quoteRequests.filter((q) => q.status === 'New').length} new requests
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Active Tours</span>
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
                    <span className="text-xs font-bold uppercase tracking-wider">Approved Reviews</span>
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

              {/* Recent Enquiries Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0B2A4A] font-heading uppercase tracking-wider">
                    Recent Flight Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('flights')}
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
                            <div className="font-semibold text-slate-800">{enquiry.customerName}</div>
                            <div className="text-[10px] text-slate-400">{enquiry.phoneOrEmail}</div>
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-700">
                            {enquiry.departureCity} ➔ {enquiry.destinationCity}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{enquiry.departureDate}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                enquiry.status === 'New'
                                  ? 'bg-blue-100 text-blue-800'
                                  : enquiry.status === 'Processing'
                                  ? 'bg-amber-100 text-amber-800'
                                  : enquiry.status === 'Completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {enquiry.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => {
                                handleUpdateFlightStatus(
                                  enquiry.id,
                                  enquiry.status === 'New' ? 'Contacted' : 'Processing'
                                );
                              }}
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
          )}

          {/* TAB 2: FLIGHT ENQUIRIES */}
          {activeTab === 'flights' && (
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
                  onClick={refreshData}
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
                            <div className="font-bold text-slate-800">{f.customerName}</div>
                            <div className="text-[11px] text-slate-500">{f.phoneOrEmail}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-800">
                              {f.departureCity} ➔ {f.destinationCity}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Dept: {f.departureDate} {f.returnDate ? `· Ret: ${f.returnDate}` : ''}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-800">{f.flightClass}</div>
                            <div className="text-[10px] text-slate-500">
                              {f.travelers} traveler(s) · {f.tripType}
                            </div>
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate text-slate-500">
                            {f.additionalNotes || '—'}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={f.status}
                              onChange={(e) =>
                                handleUpdateFlightStatus(f.id, e.target.value as EnquiryStatus)
                              }
                              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-700"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteFlight(f.id)}
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
          )}

          {/* TAB 3: QUOTE REQUESTS */}
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
                  Quote Requests
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  General bespoke trip and service quotes submitted via modals and forms.
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
                            <div className="text-[11px] text-slate-500">{q.contact}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-800">{q.serviceType}</div>
                            <div className="text-[11px] text-[#556B4A]">
                              {q.destinations || 'Flexible'}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>{q.groupSize ? `${q.groupSize} people` : '—'}</div>
                            <div className="text-[10px] text-slate-500">{q.travelDates || 'Flexible'}</div>
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate text-slate-600">
                            {q.details}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={q.status}
                              onChange={(e) =>
                                handleUpdateQuoteStatus(q.id, e.target.value as EnquiryStatus)
                              }
                              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-700"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteQuote(q.id)}
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
          )}

          {/* TAB 4: TOURS MANAGEMENT */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
                    Tours Management
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage bespoke guided tour itineraries across Rwanda & East Africa.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newTitle = prompt('Enter new tour itinerary title:');
                    if (newTitle) {
                      const newTour: TourItem = {
                        id: `tour-${Date.now()}`,
                        title: newTitle,
                        category: 'Rwanda',
                        destination: 'Rwanda Highlights',
                        duration: '3 Days / 2 Nights',
                        description: 'Tailored expedition created via management console.',
                        highlights: ['Scenic transfers', 'Guided naturalist experience', 'Lodge bookings'],
                        image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=800&q=80',
                        isFeatured: false,
                      };
                      StorageService.saveTour(newTour);
                      refreshData();
                      showToast(`Tour "${newTitle}" added.`);
                    }
                  }}
                  className="px-4 py-2 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Tour</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tours.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 flex gap-4 items-start shadow-xs"
                  >
                    <img
                      src={t.image}
                      alt={t.title}
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-[#0B2A4A]">
                          {t.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const updated = { ...t, isFeatured: !t.isFeatured };
                              StorageService.saveTour(updated);
                              refreshData();
                              showToast(`Updated featured status for ${t.title}`);
                            }}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              t.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {t.isFeatured ? '★ Featured' : '☆ Standard'}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete tour "${t.title}"?`)) {
                                StorageService.deleteTour(t.id);
                                refreshData();
                                showToast(`Tour "${t.title}" deleted.`);
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{t.title}</h4>
                      <p className="text-[11px] text-[#556B4A] font-semibold">{t.duration} · {t.destination}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DESTINATIONS */}
          {activeTab === 'destinations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
                    Destinations Catalog
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Regions, cities, and national parks supported by IAN'S Travel & Tours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt('Enter new destination name:');
                    if (name) {
                      const newDest: DestinationItem = {
                        id: `dest-${Date.now()}`,
                        region: 'Rwanda',
                        name,
                        country: 'Rwanda',
                        tagline: 'Customized regional itinerary',
                        description: 'Added via management console.',
                        highlights: ['Scenic highlights', 'Private transportation'],
                        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
                        isFeatured: false,
                      };
                      StorageService.saveDestination(newDest);
                      refreshData();
                      showToast(`Destination "${name}" added.`);
                    }
                  }}
                  className="px-4 py-2 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Destination</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destinations.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 flex gap-4 items-start shadow-xs"
                  >
                    <img
                      src={d.image}
                      alt={d.name}
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-[#0B2A4A]">
                          {d.region} · {d.country}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const updated = { ...d, isFeatured: !d.isFeatured };
                              StorageService.saveDestination(updated);
                              refreshData();
                              showToast(`Updated featured status for ${d.name}`);
                            }}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              d.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {d.isFeatured ? '★ Featured' : '☆ Standard'}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete destination "${d.name}"?`)) {
                                StorageService.deleteDestination(d.id);
                                refreshData();
                                showToast(`Destination "${d.name}" deleted.`);
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{d.name}</h4>
                      <p className="text-[11px] text-slate-600 italic">"{d.tagline}"</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{d.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
                    Testimonials & Reviews
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Client satisfaction statements. Per §31 & §43: Only approved testimonials appear on the public site.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const clientName = prompt('Enter client name:');
                    if (clientName) {
                      const reviewText = prompt('Enter client review text:');
                      if (reviewText) {
                        const newTest: TestimonialItem = {
                          id: `test-${Date.now()}`,
                          name: clientName,
                          location: 'Kigali, Rwanda',
                          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                          rating: 5,
                          serviceUsed: 'Flight & Tour Service',
                          review: reviewText,
                          date: 'Recently',
                          isApproved: true,
                        };
                        StorageService.saveTestimonial(newTest);
                        refreshData();
                        showToast(`Testimonial by ${clientName} added.`);
                      }
                    }
                  }}
                  className="px-4 py-2 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                          <span className="text-[10px] text-slate-400">({t.location})</span>
                        </div>
                        <p className="text-[11px] text-[#556B4A] font-semibold">{t.serviceUsed}</p>
                        <p className="text-xs text-slate-600 italic line-clamp-2 mt-0.5">"{t.review}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        onClick={() => handleToggleTestimonial(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          t.isApproved
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {t.isApproved ? '✓ Publicly Approved' : 'Hidden / Unapproved'}
                      </button>

                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="text-red-500 hover:text-red-700 p-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SECTION-BY-SECTION WEBSITE CONTENT EDITOR (§32) */}
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Section-by-Section Page Editor (§32)</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
                  Website Content Management
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
                  Per Specification §32: Modify live site section copy and card structures. Every Save action alerts and logs to the mock store ready for live database wiring.
                </p>
              </div>

              {/* 1. Hero Section Editor */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#0B2A4A] font-heading uppercase tracking-wider">
                    01. Hero Section
                  </h3>
                  <button
                    onClick={() =>
                      handleSimulateSaveSection('Hero', {
                        headline: contentDraft.hero.headline,
                        subheadline: contentDraft.hero.subheadline,
                        supportLine: contentDraft.hero.supportLine,
                      })
                    }
                    className="px-3.5 py-1.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Hero Draft</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Eyebrow Tagline
                    </label>
                    <input
                      type="text"
                      value={contentDraft.hero.eyebrow}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          hero: { ...contentDraft.hero, eyebrow: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Main Brand Headline (H1)
                    </label>
                    <input
                      type="text"
                      value={contentDraft.hero.headline}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          hero: { ...contentDraft.hero, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sub-Headline (Official Slogan)
                  </label>
                  <input
                    type="text"
                    value={contentDraft.hero.subheadline}
                    onChange={(e) =>
                      setContentDraft({
                        ...contentDraft,
                        hero: { ...contentDraft.hero, subheadline: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Supporting Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={contentDraft.hero.supportLine}
                    onChange={(e) =>
                      setContentDraft({
                        ...contentDraft,
                        hero: { ...contentDraft.hero, supportLine: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              {/* 2. Trust Section Editor */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#0B2A4A] font-heading uppercase tracking-wider">
                    02. Trust Section
                  </h3>
                  <button
                    onClick={() =>
                      handleSimulateSaveSection('Trust', {
                        headline: contentDraft.trust.headline,
                        subheadline: contentDraft.trust.subheadline,
                      })
                    }
                    className="px-3.5 py-1.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Trust Draft</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                    <input
                      type="text"
                      value={contentDraft.trust.headline}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          trust: { ...contentDraft.trust, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub-headline</label>
                    <input
                      type="text"
                      value={contentDraft.trust.subheadline}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          trust: { ...contentDraft.trust, subheadline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Flight Enquiry Section Copy */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#0B2A4A] font-heading uppercase tracking-wider">
                    03. Flight Enquiry Section
                  </h3>
                  <button
                    onClick={() =>
                      handleSimulateSaveSection('FlightEnquiry', {
                        headline: contentDraft.flightEnquiry.headline,
                        subheadline: contentDraft.flightEnquiry.subheadline,
                      })
                    }
                    className="px-3.5 py-1.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Flights Draft</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                    <input
                      type="text"
                      value={contentDraft.flightEnquiry.headline}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          flightEnquiry: { ...contentDraft.flightEnquiry, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub-headline</label>
                    <input
                      type="text"
                      value={contentDraft.flightEnquiry.subheadline}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          flightEnquiry: { ...contentDraft.flightEnquiry, subheadline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Rwanda Experience Copy */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#0B2A4A] font-heading uppercase tracking-wider">
                    04. Rwanda Experience Section
                  </h3>
                  <button
                    onClick={() =>
                      handleSimulateSaveSection('RwandaExperience', {
                        headline: contentDraft.rwandaExperience.headline,
                        subheadline: contentDraft.rwandaExperience.subheadline,
                        description: contentDraft.rwandaExperience.description,
                      })
                    }
                    className="px-3.5 py-1.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Rwanda Draft</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                    <input
                      type="text"
                      value={contentDraft.rwandaExperience.headline}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          rwandaExperience: { ...contentDraft.rwandaExperience, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub-headline</label>
                    <input
                      type="text"
                      value={contentDraft.rwandaExperience.subheadline}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          rwandaExperience: { ...contentDraft.rwandaExperience, subheadline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Narrative Body</label>
                  <textarea
                    rows={3}
                    value={contentDraft.rwandaExperience.description}
                    onChange={(e) =>
                      setContentDraft({
                        ...contentDraft,
                        rwandaExperience: { ...contentDraft.rwandaExperience, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              {/* 5. Business Details & Footer Editor */}
              <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#0B2A4A] font-heading uppercase tracking-wider">
                    05. Business & Office Info
                  </h3>
                  <button
                    onClick={() =>
                      handleSimulateSaveSection('BusinessInfo', {
                        address: contentDraft.businessInfo.address,
                        phone: contentDraft.businessInfo.phonePrimary,
                        email: contentDraft.businessInfo.email,
                      })
                    }
                    className="px-3.5 py-1.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Business Info</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Office Address</label>
                    <input
                      type="text"
                      value={contentDraft.businessInfo.address}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          businessInfo: { ...contentDraft.businessInfo, address: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Support Email</label>
                    <input
                      type="text"
                      value={contentDraft.businessInfo.email}
                      onChange={(e) =>
                        setContentDraft({
                          ...contentDraft,
                          businessInfo: { ...contentDraft.businessInfo, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SIMULATED CHANGE LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0B2A4A] font-heading">
                  Simulated Change Audit Logs
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Per Specification §32: Demonstrates captured content changes recorded for future live database binding.
                </p>
              </div>

              {adminLogs.length === 0 ? (
                <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                  No simulated editor actions captured yet. Try clicking "Save Draft" in the Site Content Editor tab.
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
                  {adminLogs.map((log, idx) => (
                    <div key={idx} className="p-4 text-xs flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold font-mono text-[10px]">
                            {log.action}
                          </span>
                          <span className="font-bold text-slate-800">{log.section}</span>
                        </div>
                        <pre className="bg-slate-50 p-2 rounded text-[10px] text-slate-600 font-mono overflow-x-auto max-w-xl">
                          {JSON.stringify(log.data, null, 2)}
                        </pre>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
