import React from "react";
import { AdminPasswordModal } from "./AdminPasswordModal";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { QuoteRequestModal } from "./QuoteRequestModal";
import { ServiceItem } from "../types";

interface AppModalsProps {
  // Admin modal
  isAdminModalOpen: boolean;
  onCloseAdminModal: () => void;
  onAdminSuccess: () => void;

  // Service detail modal
  selectedService: ServiceItem | null;
  onCloseServiceModal: () => void;
  onServiceRequestQuote: (service: ServiceItem) => void;

  // Quote request modal
  isQuoteModalOpen: boolean;
  onCloseQuoteModal: () => void;
  quoteDefaultService: string;
  quoteDefaultDestination: string;
}

/**
 * Groups every modal the app can show behind one component, so App.tsx
 * only has to render <AppModals {...modalProps} /> instead of three
 * separate blocks. State still lives in App — this just renders it.
 */
export const AppModals: React.FC<AppModalsProps> = ({
  isAdminModalOpen,
  onCloseAdminModal,
  onAdminSuccess,
  selectedService,
  onCloseServiceModal,
  onServiceRequestQuote,
  isQuoteModalOpen,
  onCloseQuoteModal,
  quoteDefaultService,
  quoteDefaultDestination,
}) => (
  <>
    <AdminPasswordModal
      isOpen={isAdminModalOpen}
      onClose={onCloseAdminModal}
      onSuccess={onAdminSuccess}
    />

    <ServiceDetailModal
      service={selectedService}
      isOpen={!!selectedService}
      onClose={onCloseServiceModal}
      onRequestQuote={onServiceRequestQuote}
      onOpenFlightEnquiry={() => alert("Coming soon!..[onOpenFlightEnquiry]")}
      onOpenQuoteRequest={() => alert("Coming soon!..[onOpenQuoteRequest]")}
    />

    <QuoteRequestModal
      isOpen={isQuoteModalOpen}
      onClose={onCloseQuoteModal}
      defaultService={quoteDefaultService}
      defaultDestination={quoteDefaultDestination}
    />
  </>
);
