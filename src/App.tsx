import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustSection } from "./components/TrustSection";
import { ServicesSection } from "./components/ServicesSection";
import { FlightEnquirySection } from "./components/FlightEnquirySection";
import { DestinationsSection } from "./components/DestinationsSection";
import { RwandaExperienceSection } from "./components/RwandaExperienceSection";
import { ToursSection } from "./components/ToursSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { BrandMomentSection } from "./components/BrandMomentSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CertificateAwardedSection } from "./components/CertificateAwardedSection";
import { FAQSection } from "./components/FAQSection";

// Extracted pieces
import { RevealSection, RevealTransition } from "./components/Revealsection";
import { AdminEntranceButton } from "./components/Adminentrancebutton";
import { AppModals } from "./components/Appmodals";

// Admin Panel
import { AdminDashboard } from "./admin/AdminDashboard";

// Data & Storage
import { StorageService } from "./data/storage";
import {
  DestinationItem,
  ServiceItem,
  TestimonialItem,
  TourItem,
} from "./types";

export default function App() {
  // App views
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Modals state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteDefaultService, setQuoteDefaultService] =
    useState("Tailored Tour");
  const [quoteDefaultDestination, setQuoteDefaultDestination] = useState("");

  // Live catalogs from storage layer
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [tours, setTours] = useState<TourItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  // Load initial data + admin route handling
  useEffect(() => {
    setServices(StorageService.getServices());
    setDestinations(StorageService.getDestinations());
    setTours(StorageService.getTours());
    setTestimonials(StorageService.getTestimonials());

    const syncAdminRoute = () => {
      if (window.location.hash === "#/manage") {
        if (StorageService.isAdminAuthenticated()) {
          setIsAdminView(true);
        } else {
          setIsAdminModalOpen(true);
        }
      }
    };

    syncAdminRoute();
    window.addEventListener("hashchange", syncAdminRoute);
    return () => window.removeEventListener("hashchange", syncAdminRoute);
  }, []);

  // Admin auth handlers
  const handleAdminSuccess = () => {
    setIsAdminModalOpen(false);
    setIsAdminView(true);
    window.location.hash = "#/manage";
  };

  const handleAdminLogout = () => {
    StorageService.clearAdminSession();
    setIsAdminView(false);
    window.location.hash = "";
  };

  // Quote modal trigger helpers
  const handleOpenGeneralQuote = (
    serviceName = "Tailored Tour",
    destination = "",
  ) => {
    setQuoteDefaultService(serviceName);
    setQuoteDefaultDestination(destination);
    setIsQuoteModalOpen(true);
  };

  const handleServiceRequestQuote = (service: ServiceItem) => {
    setSelectedService(null);
    handleOpenGeneralQuote(service.title);
  };

  if (isAdminView) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // ---------------------------------------------------------------------
  // THIS is "the outer function" you keep sections in: a plain array,
  // declared inside App (it needs closures over state/handlers above).
  // Add, remove, or reorder the page by editing this list — nothing else
  // in the JSX below needs to change.
  //
  // Each entry also picks a `transition` (see StackedSection) so the join
  // effect isn't identical everywhere — mix them based on the section's
  // content and how long someone will likely dwell on it.
  // ---------------------------------------------------------------------
  // `id` values below match the Navbar's href="#..." links exactly.
  // If a section isn't in the nav, it still gets an id for future deep-links.
  const mainSections: {
    key: string;
    id: string;
    node: React.ReactNode;
    transition: RevealTransition;
  }[] = [
    {
      key: "hero",
      id: "hero",
      transition: "zoom-out",
      node: (
        <Hero
          onSelectServiceCard={(service: ServiceItem) =>
            setSelectedService(service)
          }
          onRequestQuote={() => handleOpenGeneralQuote("Tailored Tour")}
          onPlanTripClick={() => alert("Coming soon!..")}
        />
      ),
    },
    {
      key: "services",
      id: "services",
      transition: "zoom-out",
      node: (
        <ServicesSection
          services={services}
          onSelectService={(service) => setSelectedService(service)}
        />
      ),
    },
    {
      key: "certificate",
      id: "credentials",
      transition: "blur-in",
      node: <CertificateAwardedSection />,
    },
    {
      key: "flight-enquiry",
      id: "flights",
      transition: "slide-left",
      node: <FlightEnquirySection />,
    },
    {
      key: "destinations",
      id: "destinations",
      transition: "blur-in",
      node: (
        <DestinationsSection
          destinations={destinations}
          onRequestDestinationQuote={(destName) =>
            handleOpenGeneralQuote("Tailored Tour", destName)
          }
        />
      ),
    },
    {
      key: "rwanda-experience",
      id: "rwanda",
      transition: "zoom-out",
      node: (
        <RwandaExperienceSection
          onExploreRwandaClick={() =>
            handleOpenGeneralQuote("Rwanda Guided Safari", "Volcanoes / Rwanda")
          }
        />
      ),
    },
    {
      key: "tours",
      id: "tours",
      transition: "slide-left",
      node: (
        <ToursSection
          tours={tours}
          onPlanCustomTripClick={(tourTitle) =>
            handleOpenGeneralQuote(
              tourTitle ? `Custom Itinerary: ${tourTitle}` : "Custom Tour",
            )
          }
        />
      ),
    },
    {
      key: "how-it-works",
      id: "how-it-works",
      transition: "blur-in",
      node: <HowItWorksSection />,
    },
    { key: "faq", id: "faq", transition: "zoom-out", node: <FAQSection /> },
    {
      key: "testimonials",
      id: "testimonials",
      transition: "slide-left",
      node: (
        <TestimonialsSection
          testimonials={testimonials}
          onRequestQuote={() => handleOpenGeneralQuote("Tailored Tour")}
        />
      ),
    },
    {
      key: "brand-moment",
      id: "brand-moment",
      transition: "blur-in",
      node: <BrandMomentSection />,
    },
    {
      key: "final-cta",
      id: "final-cta",
      transition: "zoom-out",
      node: (
        <FinalCTASection
          onOpenQuoteModal={() => handleOpenGeneralQuote("Tailored Tour")}
        />
      ),
    },
    {
      key: "contact",
      id: "contact",
      transition: "slide-left",
      node: <ContactSection />,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#7EC8E3]/30 selection:text-[#0B2A4A] flex flex-col font-sans">
      {/* Navbar sits above all content, no z-index coordination needed anymore */}
      <Navbar
        onAdminTrigger={() => setIsAdminModalOpen(true)}
        onRequestQuote={() => handleOpenGeneralQuote("Tailored Tour")}
      />

      <main className="flex-1">
        {mainSections.map(({ key, id, node, transition }) => (
          <RevealSection key={key} id={id} transition={transition}>
            {node}
          </RevealSection>
        ))}
      </main>

      {/* Footer scrolls normally beneath the last section */}
      <Footer />

      <AdminEntranceButton onClick={() => setIsAdminModalOpen(true)} />

      <AppModals
        isAdminModalOpen={isAdminModalOpen}
        onCloseAdminModal={() => {
          setIsAdminModalOpen(false);
          if (window.location.hash === "#/manage") {
            window.location.hash = "";
          }
        }}
        onAdminSuccess={handleAdminSuccess}
        selectedService={selectedService}
        onCloseServiceModal={() => setSelectedService(null)}
        onServiceRequestQuote={handleServiceRequestQuote}
        isQuoteModalOpen={isQuoteModalOpen}
        onCloseQuoteModal={() => setIsQuoteModalOpen(false)}
        quoteDefaultService={quoteDefaultService}
        quoteDefaultDestination={quoteDefaultDestination}
      />
    </div>
  );
}
