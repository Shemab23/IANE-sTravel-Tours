import React, { useState, useEffect } from "react";
import {
  DestinationItem,
  EnquiryStatus,
  FlightEnquiry,
  QuoteRequest,
  SectionContent,
  TestimonialItem,
  TourItem,
} from "../types";
import { StorageService } from "../data/storage";
import { initialSectionContent } from "../data/mockData";

import { TabType, AdminLogEntry } from "./adminTypes";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";
import { Toast } from "./components/Toast";

import { OverviewTab } from "./tabs/OverviewTab";
import { FlightsTab } from "./tabs/FlightsTab";
import { QuotesTab } from "./tabs/QuotesTab";
import { ToursTab } from "./tabs/ToursTab";
import { DestinationsTab } from "./tabs/DestinationsTab";
import { TestimonialsTab } from "./tabs/TestimonialsTab";
import { ContentEditorTab } from "./tabs/ContentEditorTab";
import { LogsTab } from "./tabs/LogsTab";

interface AdminDashboardProps {
  onLogout: () => void;
}

/**
 * AdminDashboard — orchestrator only.
 *
 * This component owns all state (data + drafts) and all handlers (the "what
 * happens" logic). It renders the header, sidebar, toast, and whichever tab
 * is active, passing down data + callbacks as props.
 *
 * Presentation for each area lives in its own file:
 *   components/AdminHeader.tsx      — top bar
 *   components/AdminSidebar.tsx     — left nav + counts
 *   components/Toast.tsx            — confirmation banner
 *   components/StatusSelect.tsx     — editable status dropdown (Flights/Quotes)
 *   components/StatusPill.tsx       — read-only status badge (Overview)
 *   components/SectionCard.tsx      — wrapper used by every content-editor block
 *   components/FormField.tsx        — labeled input/textarea used in the editor
 *   tabs/OverviewTab.tsx             — §26/28 metrics + recent flights
 *   tabs/FlightsTab.tsx              — §27 flight enquiries table
 *   tabs/QuotesTab.tsx               — §28 quote requests table
 *   tabs/ToursTab.tsx                — §29 tours catalog
 *   tabs/DestinationsTab.tsx         — §30 destinations catalog
 *   tabs/TestimonialsTab.tsx         — §31 testimonials
 *   tabs/ContentEditorTab.tsx        — §32 section-by-section site editor
 *   tabs/LogsTab.tsx                 — simulated change log viewer
 *
 * If you need to change what a tab looks like, edit that tab's file.
 * If you need to change what happens when a button is clicked (the data
 * flow, StorageService calls, toasts), edit the handler in THIS file.
 */
export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // ---- Data loaded from StorageService ----
  const [flightEnquiries, setFlightEnquiries] = useState<FlightEnquiry[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [tours, setTours] = useState<TourItem[]>([]);
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [adminLogs, setAdminLogs] = useState<AdminLogEntry[]>([]);

  // ---- Content Editor draft state (§32) ----
  const [contentDraft, setContentDraft] = useState<SectionContent>(
    initialSectionContent,
  );

  // ---- Toast ----
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

  // ============ Flight enquiry handlers ============
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

  // ============ Quote request handlers ============
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

  // ============ Tour handlers ============
  const handleAddTour = () => {
    const newTitle = prompt("Enter new tour itinerary title:");
    if (!newTitle) return;
    const newTour: TourItem = {
      id: `tour-${Date.now()}`,
      title: newTitle,
      category: "Rwanda",
      destination: "Rwanda Highlights",
      duration: "3 Days / 2 Nights",
      description: "Tailored expedition created via management console.",
      highlights: [
        "Scenic transfers",
        "Guided naturalist experience",
        "Lodge bookings",
      ],
      image:
        "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
    };
    StorageService.saveTour(newTour);
    refreshData();
    showToast(`Tour "${newTitle}" added.`);
  };

  const handleToggleTourFeatured = (tour: TourItem) => {
    StorageService.saveTour({ ...tour, isFeatured: !tour.isFeatured });
    refreshData();
    showToast(`Updated featured status for ${tour.title}`);
  };

  const handleDeleteTour = (tour: TourItem) => {
    if (confirm(`Delete tour "${tour.title}"?`)) {
      StorageService.deleteTour(tour.id);
      refreshData();
      showToast(`Tour "${tour.title}" deleted.`);
    }
  };

  // ============ Destination handlers ============
  const handleAddDestination = () => {
    const name = prompt("Enter new destination name:");
    if (!name) return;
    const newDest: DestinationItem = {
      id: `dest-${Date.now()}`,
      region: "Rwanda",
      name,
      country: "Rwanda",
      tagline: "Customized regional itinerary",
      description: "Added via management console.",
      highlights: ["Scenic highlights", "Private transportation"],
      image:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
    };
    StorageService.saveDestination(newDest);
    refreshData();
    showToast(`Destination "${name}" added.`);
  };

  const handleToggleDestinationFeatured = (destination: DestinationItem) => {
    StorageService.saveDestination({
      ...destination,
      isFeatured: !destination.isFeatured,
    });
    refreshData();
    showToast(`Updated featured status for ${destination.name}`);
  };

  const handleDeleteDestination = (destination: DestinationItem) => {
    if (confirm(`Delete destination "${destination.name}"?`)) {
      StorageService.deleteDestination(destination.id);
      refreshData();
      showToast(`Destination "${destination.name}" deleted.`);
    }
  };

  // ============ Testimonial handlers ============
  const handleAddTestimonial = () => {
    const clientName = prompt("Enter client name:");
    if (!clientName) return;
    const reviewText = prompt("Enter client review text:");
    if (!reviewText) return;
    const newTest: TestimonialItem = {
      id: `test-${Date.now()}`,
      name: clientName,
      location: "Kigali, Rwanda",
      photo:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      serviceUsed: "Flight & Tour Service",
      review: reviewText,
      date: "Recently",
      isApproved: true,
    };
    StorageService.saveTestimonial(newTest);
    refreshData();
    showToast(`Testimonial by ${clientName} added.`);
  };

  const handleToggleTestimonialApproval = (testimonial: TestimonialItem) => {
    const updated = { ...testimonial, isApproved: !testimonial.isApproved };
    StorageService.saveTestimonial(updated);
    refreshData();
    showToast(
      `Testimonial by ${testimonial.name} is now ${updated.isApproved ? "Approved & Visible" : "Hidden"}.`,
    );
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Delete this testimonial?")) {
      StorageService.deleteTestimonial(id);
      refreshData();
      showToast("Testimonial removed.");
    }
  };

  // ============ Content editor — MVP simulated persistence (§32) ============
  const handleSimulateSaveSection = (
    sectionName: string,
    sectionData: Record<string, unknown>,
  ) => {
    StorageService.logAdminChange(sectionName, "SAVE_SECTION", sectionData);
    setAdminLogs(StorageService.getAdminLogs());
    showToast(
      `Change captured for [${sectionName}] — will apply once connected to the live database.`,
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      <AdminHeader onLogout={onLogout} />

      <div className="flex-1 flex flex-col lg:flex-row">
        <AdminSidebar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          newFlightCount={
            flightEnquiries.filter((f) => f.status === "New").length
          }
          newQuoteCount={quoteRequests.filter((q) => q.status === "New").length}
          toursCount={tours.length}
          destinationsCount={destinations.length}
          testimonialsCount={testimonials.length}
        />

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-6xl">
          <Toast
            message={toastMessage}
            onDismiss={() => setToastMessage(null)}
          />

          {activeTab === "overview" && (
            <OverviewTab
              flightEnquiries={flightEnquiries}
              quoteRequests={quoteRequests}
              tours={tours}
              testimonials={testimonials}
              onGoToTab={setActiveTab}
              onAdvanceFlightStatus={handleUpdateFlightStatus}
            />
          )}

          {activeTab === "flights" && (
            <FlightsTab
              flightEnquiries={flightEnquiries}
              onUpdateStatus={handleUpdateFlightStatus}
              onDelete={handleDeleteFlight}
              onRefresh={refreshData}
            />
          )}

          {activeTab === "quotes" && (
            <QuotesTab
              quoteRequests={quoteRequests}
              onUpdateStatus={handleUpdateQuoteStatus}
              onDelete={handleDeleteQuote}
            />
          )}

          {activeTab === "tours" && (
            <ToursTab
              tours={tours}
              onAddTour={handleAddTour}
              onToggleFeatured={handleToggleTourFeatured}
              onDeleteTour={handleDeleteTour}
            />
          )}

          {activeTab === "destinations" && (
            <DestinationsTab
              destinations={destinations}
              onAddDestination={handleAddDestination}
              onToggleFeatured={handleToggleDestinationFeatured}
              onDeleteDestination={handleDeleteDestination}
            />
          )}

          {activeTab === "testimonials" && (
            <TestimonialsTab
              testimonials={testimonials}
              onAddTestimonial={handleAddTestimonial}
              onToggleApproval={handleToggleTestimonialApproval}
              onDeleteTestimonial={handleDeleteTestimonial}
            />
          )}

          {activeTab === "content" && (
            <ContentEditorTab
              contentDraft={contentDraft}
              setContentDraft={setContentDraft}
              onSaveSection={handleSimulateSaveSection}
            />
          )}

          {activeTab === "logs" && <LogsTab adminLogs={adminLogs} />}
        </main>
      </div>
    </div>
  );
};
