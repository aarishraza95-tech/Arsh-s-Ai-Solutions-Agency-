export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  estimatedTimeline: string;
  keyMetric: string;
  image?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  idealFor: string;
  supportLevel: string;
  setupTimeline: string;
  isPopular?: boolean;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  company: string;
  serviceId: string;
  budget: string;
  timeline: string;
  message: string;
}

export interface AgencyConfig {
  agencyName: string;
  ownerName: string;
  email: string;
  whatsappNumber: string; // international digits without + or spaces for wa.me
  whatsappDisplay: string;
  location: string;
  operatingHours: string;
  responseSla: string;
  webhookUrl?: string; // e.g. Formspree, Make, Zapier
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
