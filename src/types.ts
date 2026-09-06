export type TripType = 'return' | 'one-way' | 'multi-city' | 'group';
export type FlightClass = 'Economy' | 'Premium Economy' | 'Business' | 'First';
export type EnquiryStatus = 'New' | 'Contacted' | 'Processing' | 'Completed' | 'Cancelled';

export interface FlightEnquiry {
  id: string;
  customerName: string;
  phoneOrEmail: string;
  tripType: TripType;
  departureCity: string;
  destinationCity: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
  flightClass: FlightClass;
  additionalNotes?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  contact: string;
  serviceType: string;
  destinations?: string;
  travelDates?: string;
  estimatedBudget?: string;
  groupSize?: number;
  details: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  emailOrPhone: string;
  serviceInterested?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  badge?: string;
  whatsappPrompt: string;
}

export interface TourItem {
  id: string;
  title: string;
  category: 'Rwanda' | 'East Africa' | 'Group' | 'Private' | 'Family' | 'Corporate' | 'Custom';
  destination: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  isFeatured?: boolean;
}

export interface DestinationItem {
  id: string;
  region: 'Rwanda' | 'East Africa' | 'Dubai' | 'Europe' | 'International';
  name: string;
  country: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  isFeatured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  photo: string;
  rating: number;
  serviceUsed: string;
  review: string;
  date: string;
  isApproved: boolean;
}

export interface BusinessInfo {
  name: string;
  slogan: string;
  established: string;
  address: string;
  coverage: string;
  hours: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappPrimary: string;
  whatsappSecondary: string;
  email: string;
  instagram: string;
  tiktok: string;
}

export interface SectionContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    supportLine: string;
  };
  trust: {
    headline: string;
    subheadline: string;
  };
  services: {
    headline: string;
    subheadline: string;
  };
  flightEnquiry: {
    headline: string;
    subheadline: string;
  };
  destinations: {
    headline: string;
    subheadline: string;
  };
  rwandaExperience: {
    headline: string;
    subheadline: string;
    description: string;
  };
  tours: {
    headline: string;
    subheadline: string;
  };
  howItWorks: {
    headline: string;
    subheadline: string;
  };
  testimonials: {
    headline: string;
    subheadline: string;
  };
  brandMoment: {
    headline: string;
    words: string[];
  };
  finalCta: {
    headline: string;
    subheadline: string;
  };
  businessInfo: BusinessInfo;
}
