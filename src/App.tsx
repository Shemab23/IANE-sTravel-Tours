import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { FlightEnquirySection } from './components/FlightEnquirySection';
import { DestinationsSection } from './components/DestinationsSection';
import { RwandaExperienceSection } from './components/RwandaExperienceSection';
import { ToursSection } from './components/ToursSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BrandMomentSection } from './components/BrandMomentSection';
import { FinalCTASection } from './components/FinalCTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CertificateAwardedSection } from './components/CertificateAwardedSection';
import { FAQSection } from './components/FAQSection';
import { Lock } from 'lucide-react';

// Modals
import { AdminPasswordModal } from './components/AdminPasswordModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { QuoteRequestModal } from './components/QuoteRequestModal';

// Admin Panel
import { AdminDashboard } from './admin/AdminDashboard';

// Data & Storage
import { StorageService } from './data/storage';
import { DestinationItem, ServiceItem, TestimonialItem, TourItem } from './types';

export default function App() {
  // App views
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Modals state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteDefaultService, setQuoteDefaultService] = useState('Tailored Tour');
  const [quoteDefaultDestination, setQuoteDefaultDestination] = useState('');

  // Live catalogs from storage layer
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [tours, setTours] = useState<TourItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  // Load initial data
  useEffect(() => {
    setServices(StorageService.getServices());
    setDestinations(StorageService.getDestinations());
    setTours(StorageService.getTours());
    setTestimonials(StorageService.getTestimonials());

    // Check if URL hash is #/manage or if admin session exists
    if (window.location.hash === '#/manage' || StorageService.isAdminAuthenticated()) {
      if (StorageService.isAdminAuthenticated()) {
        setIsAdminView(true);
      } else {
        setIsAdminModalOpen(true);
      }
    }

    const handleHashChange = () => {
      if (window.location.hash === '#/manage') {
        if (StorageService.isAdminAuthenticated()) {
          setIsAdminView(true);
        } else {
          setIsAdminModalOpen(true);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Admin Auth handlers
  const handleAdminSuccess = () => {
    setIsAdminModalOpen(false);
    setIsAdminView(true);
    window.location.hash = '#/manage';
  };

  const handleAdminLogout = () => {
    StorageService.clearAdminSession();
    setIsAdminView(false);
    window.location.hash = '';
  };

  // Quote modal trigger helpers
  const handleOpenGeneralQuote = (serviceName = 'Tailored Tour', destination = '') => {
    setQuoteDefaultService(serviceName);
    setQuoteDefaultDestination(destination);
    setIsQuoteModalOpen(true);
  };

  // Service modal to quote modal flow
  const handleServiceRequestQuote = (service: ServiceItem) => {
    setSelectedService(null);
    handleOpenGeneralQuote(service.title);
  };

  // If currently in Admin view, render AdminDashboard
  if (isAdminView) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#7EC8E3]/30 selection:text-[#0B2A4A] flex flex-col font-sans">
      {/* Discreet Navigation Bar */}
      <Navbar
        onAdminTrigger={() => setIsAdminModalOpen(true)}
        onRequestQuote={() => handleOpenGeneralQuote('Tailored Tour')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Asymmetric Split Hero with auto-scrolling service gallery */}
        <Hero
          onSelectService={(service) => setSelectedService(service)}
          onRequestQuote={() => handleOpenGeneralQuote('Tailored Tour')}
        />

        {/* 4 Pillars of Trust Section */}
        <TrustSection />

        {/* Certificate Awarded & 4th Year Milestone Section */}
        <CertificateAwardedSection />

        {/* 6 Core Services Grid Section */}
        <ServicesSection
          services={services}
          onSelectService={(service) => setSelectedService(service)}
        />

        {/* Dedicated Flight Enquiry Section with WhatsApp Handoff */}
        <FlightEnquirySection />

        {/* Destinations Showcase Section */}
        <DestinationsSection
          destinations={destinations}
          onRequestDestinationQuote={(destName) =>
            handleOpenGeneralQuote('Tailored Tour', destName)
          }
        />

        {/* Rwanda Experience Spotlight Section */}
        <RwandaExperienceSection
          onExploreRwandaClick={() =>
            handleOpenGeneralQuote('Rwanda Guided Safari', 'Volcanoes / Rwanda')
          }
        />

        {/* Tailored Tours Section */}
        <ToursSection
          tours={tours}
          onPlanCustomTripClick={(tourTitle) =>
            handleOpenGeneralQuote(tourTitle ? `Custom Itinerary: ${tourTitle}` : 'Custom Tour')
          }
        />

        {/* How It Works 4-Step Process Section */}
        <HowItWorksSection />

        {/* Frequently Asked Questions Section (Travel Queries & Logistics) */}
        <FAQSection />

        {/* Genuine Testimonials Section */}
        <TestimonialsSection
          testimonials={testimonials}
          onRequestQuote={() => handleOpenGeneralQuote('Tailored Tour')}
        />

        {/* High-contrast Deep Blue Brand Moment Section: Conquer the world with us! */}
        <BrandMomentSection />

        {/* Final Conversion CTA Section */}
        <FinalCTASection
          onOpenQuoteModal={() => handleOpenGeneralQuote('Tailored Tour')}
        />

        {/* Kigali Office & Direct Contact Section */}
        <ContactSection />
      </main>

      {/* Clean Public Footer */}
      <Footer />

      {/* Floating Quick Admin Portal Entrance Button */}
      <button
        id="floating-admin-entrance-btn"
        onClick={() => setIsAdminModalOpen(true)}
        aria-label="Admin Entrance"
        title="Administrator Portal Entrance"
        className="fixed bottom-5 right-5 z-40 px-3.5 py-2.5 bg-[#0B2A4A] hover:bg-[#12395E] text-white rounded-2xl shadow-xl border border-[#C7A15A]/40 flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 group"
      >
        <Lock className="w-3.5 h-3.5 text-[#C7A15A] group-hover:rotate-12 transition-transform" />
        <span className="tracking-wide">Admin Entrance</span>
      </button>

      {/* MODALS */}
      {/* 1. Discreet Password Modal for Administrator */}
      <AdminPasswordModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          if (window.location.hash === '#/manage') {
            window.location.hash = '';
          }
        }}
        onSuccess={handleAdminSuccess}
      />

      {/* 2. Service Deep Dive & Regulatory Disclaimers Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={handleServiceRequestQuote}
      />

      {/* 3. Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultService={quoteDefaultService}
        defaultDestination={quoteDefaultDestination}
      />
    </div>
  );
}
