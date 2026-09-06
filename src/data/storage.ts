import {
  ContactMessage,
  DestinationItem,
  FlightEnquiry,
  QuoteRequest,
  SectionContent,
  ServiceItem,
  TestimonialItem,
  TourItem,
} from '../types';
import {
  initialBusinessInfo,
  initialDestinations,
  initialFlightEnquiries,
  initialQuoteRequests,
  initialSectionContent,
  initialServices,
  initialTestimonials,
  initialTours,
} from './mockData';

const KEYS = {
  FLIGHTS: 'ians_flight_enquiries_v1',
  QUOTES: 'ians_quote_requests_v1',
  CONTACTS: 'ians_contact_messages_v1',
  TOURS: 'ians_tours_v1',
  DESTINATIONS: 'ians_destinations_v1',
  TESTIMONIALS: 'ians_testimonials_v1',
  ADMIN_LOGS: 'ians_admin_change_logs_v1',
  ADMIN_AUTH: 'ians_admin_auth_v1',
};

// Safe localStorage accessor
function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Error reading localStorage key ${key}:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage key ${key}:`, e);
  }
}

export const StorageService = {
  getServices(): ServiceItem[] {
    return initialServices;
  },

  isAdminAuthenticated(): boolean {
    return safeGet<boolean>(KEYS.ADMIN_AUTH, false);
  },

  setAdminAuthenticated(auth: boolean): void {
    safeSet(KEYS.ADMIN_AUTH, auth);
  },

  clearAdminSession(): void {
    safeSet(KEYS.ADMIN_AUTH, false);
  },

  getFlightEnquiries(): FlightEnquiry[] {
    return safeGet<FlightEnquiry[]>(KEYS.FLIGHTS, initialFlightEnquiries);
  },

  saveFlightEnquiry(enquiry: Omit<FlightEnquiry, 'id' | 'createdAt' | 'status'>): FlightEnquiry {
    const existing = this.getFlightEnquiries();
    const newEnquiry: FlightEnquiry = {
      ...enquiry,
      id: `FL-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const updated = [newEnquiry, ...existing];
    safeSet(KEYS.FLIGHTS, updated);
    return newEnquiry;
  },

  updateFlightEnquiryStatus(id: string, status: FlightEnquiry['status']): void {
    const existing = this.getFlightEnquiries();
    const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
    safeSet(KEYS.FLIGHTS, updated);
  },

  deleteFlightEnquiry(id: string): void {
    const existing = this.getFlightEnquiries();
    const updated = existing.filter((item) => item.id !== id);
    safeSet(KEYS.FLIGHTS, updated);
  },

  getQuoteRequests(): QuoteRequest[] {
    return safeGet<QuoteRequest[]>(KEYS.QUOTES, initialQuoteRequests);
  },

  saveQuoteRequest(quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
    const existing = this.getQuoteRequests();
    const newQuote: QuoteRequest = {
      ...quote,
      id: `QR-${Math.floor(100 + Math.random() * 900)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const updated = [newQuote, ...existing];
    safeSet(KEYS.QUOTES, updated);
    return newQuote;
  },

  updateQuoteStatus(id: string, status: QuoteRequest['status']): void {
    const existing = this.getQuoteRequests();
    const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
    safeSet(KEYS.QUOTES, updated);
  },

  deleteQuoteRequest(id: string): void {
    const existing = this.getQuoteRequests();
    const updated = existing.filter((item) => item.id !== id);
    safeSet(KEYS.QUOTES, updated);
  },

  getContactMessages(): ContactMessage[] {
    return safeGet<ContactMessage[]>(KEYS.CONTACTS, []);
  },

  saveContactMessage(contact: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const existing = this.getContactMessages();
    const newMessage: ContactMessage = {
      ...contact,
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const updated = [newMessage, ...existing];
    safeSet(KEYS.CONTACTS, updated);
    return newMessage;
  },

  getTours(): TourItem[] {
    return safeGet<TourItem[]>(KEYS.TOURS, initialTours);
  },

  saveTour(tour: TourItem): void {
    const existing = this.getTours();
    const idx = existing.findIndex((t) => t.id === tour.id);
    let updated: TourItem[];
    if (idx >= 0) {
      updated = [...existing];
      updated[idx] = tour;
    } else {
      updated = [tour, ...existing];
    }
    safeSet(KEYS.TOURS, updated);
  },

  deleteTour(id: string): void {
    const existing = this.getTours();
    const updated = existing.filter((t) => t.id !== id);
    safeSet(KEYS.TOURS, updated);
  },

  getDestinations(): DestinationItem[] {
    return safeGet<DestinationItem[]>(KEYS.DESTINATIONS, initialDestinations);
  },

  saveDestination(destination: DestinationItem): void {
    const existing = this.getDestinations();
    const idx = existing.findIndex((d) => d.id === destination.id);
    let updated: DestinationItem[];
    if (idx >= 0) {
      updated = [...existing];
      updated[idx] = destination;
    } else {
      updated = [destination, ...existing];
    }
    safeSet(KEYS.DESTINATIONS, updated);
  },

  deleteDestination(id: string): void {
    const existing = this.getDestinations();
    const updated = existing.filter((d) => d.id !== id);
    safeSet(KEYS.DESTINATIONS, updated);
  },

  getTestimonials(): TestimonialItem[] {
    return safeGet<TestimonialItem[]>(KEYS.TESTIMONIALS, initialTestimonials);
  },

  saveTestimonial(test: TestimonialItem): void {
    const existing = this.getTestimonials();
    const idx = existing.findIndex((t) => t.id === test.id);
    let updated: TestimonialItem[];
    if (idx >= 0) {
      updated = [...existing];
      updated[idx] = test;
    } else {
      updated = [test, ...existing];
    }
    safeSet(KEYS.TESTIMONIALS, updated);
  },

  deleteTestimonial(id: string): void {
    const existing = this.getTestimonials();
    const updated = existing.filter((t) => t.id !== id);
    safeSet(KEYS.TESTIMONIALS, updated);
  },

  // Per §32: Capture simulated content editor changes in local logs
  logAdminChange(section: string, action: string, data: Record<string, unknown>): void {
    const logs = safeGet<Array<{ timestamp: string; section: string; action: string; data: Record<string, unknown> }>>(KEYS.ADMIN_LOGS, []);
    const entry = {
      timestamp: new Date().toISOString(),
      section,
      action,
      data,
    };
    safeSet(KEYS.ADMIN_LOGS, [entry, ...logs.slice(0, 49)]);
  },

  getAdminLogs() {
    return safeGet<Array<{ timestamp: string; section: string; action: string; data: Record<string, unknown> }>>(KEYS.ADMIN_LOGS, []);
  },
};

// WhatsApp URL generator
export function buildWhatsAppUrl(phoneClean: string, message: string): string {
  // Format number without spaces or plus for wa.me
  const digitsOnly = phoneClean.replace(/[^0-9]/g, '');
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
