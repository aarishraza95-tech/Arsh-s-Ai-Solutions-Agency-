import { AgencyConfig, ServiceItem, PricingPlan, FAQItem } from '../types';

export const DEFAULT_AGENCY_CONFIG: AgencyConfig = {
  agencyName: "ARSH'S AI SOLUTION AGENCY",
  ownerName: "Arsh",
  email: "aarishraza865@gmail.com",
  whatsappNumber: "15550198234", // Replaceable in UI config modal or environment
  whatsappDisplay: "+1 (555) 019-8234",
  location: "Global Remote Delivery · Dedicated Enterprise Operations",
  operatingHours: "Monday – Saturday, 08:00 – 20:00 (EST / UTC-5)",
  responseSla: "Within 2 Hours (Priority WhatsApp) / Under 24 Hours (Email)",
  webhookUrl: ""
};

const STORAGE_KEY = 'arsh_agency_config_v1';

export function getAgencyConfig(): AgencyConfig {
  if (typeof window === 'undefined') return DEFAULT_AGENCY_CONFIG;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_AGENCY_CONFIG, ...JSON.parse(stored) };
    }
  } catch {
    // Fall back to default
  }
  return DEFAULT_AGENCY_CONFIG;
}

export function saveAgencyConfig(config: Partial<AgencyConfig>): AgencyConfig {
  const updated = { ...getAgencyConfig(), ...config };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save config to localStorage', err);
  }
  return updated;
}

export function buildWhatsAppLink(phone: string, text: string): string {
  // sanitize phone: remove plus, dashes, brackets, spaces
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildMailtoLink(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-lead-generation',
    number: '01',
    title: 'AI Lead Generation',
    tagline: 'Autonomous Inbound & Outbound Pipeline Acceleration',
    description: 'Transform raw inquiries into qualified pipeline. We engineer autonomous lead capture systems that scrape, verify, enrich prospect data, score buyer intent, and orchestrate tailored multi-touch follow-ups.',
    deliverables: [
      'Multi-source intent lead capture (Web, LinkedIn, Ad funnels)',
      'Automated data enrichment with company size & tech stack',
      'Real-time CRM record creation and bi-directional sync',
      'Intelligent lead qualification & automated qualification routing'
    ],
    techStack: ['HubSpot / Salesforce API', 'n8n / Make Engine', 'Hunter / Apollo Data', 'Vector AI Qualifier'],
    estimatedTimeline: '2–3 weeks deployment',
    keyMetric: '+40% faster qualification velocity'
  },
  {
    id: 'ai-appointment-automation',
    number: '02',
    title: 'AI Appointment Automation',
    tagline: 'Zero-Friction Frictionless Booking & Calender Orchestration',
    description: 'Eliminate booking friction and back-and-forth email loops. Our conversational booking infrastructure checks real-time availability across team schedules, pre-qualifies candidates, and prevents no-shows.',
    deliverables: [
      'Instant calendar booking across multiple team members & timezones',
      'Pre-meeting intake questionnaire with dynamic branch logic',
      'Automated SMS & WhatsApp confirmation / reminder sequences',
      'Rescheduling workflows with automatic slot re-opening'
    ],
    techStack: ['Google Calendar API', 'Outlook 365', 'Calendly / Cal.com', 'Twilio SMS & WhatsApp API'],
    estimatedTimeline: '1–2 weeks deployment',
    keyMetric: '92% reduction in appointment no-shows'
  },
  {
    id: 'ai-customer-support',
    number: '03',
    title: 'AI Customer Support',
    tagline: '24/7 Precision Tier-1 Resolution & Intelligent Human Handoff',
    description: 'Deploy enterprise-grade conversational support trained exclusively on your standard operating procedures, documentation, and refund policies. Fast, factual responses with deterministic human handoff.',
    deliverables: [
      'Custom vector knowledge base ingestion of your documentation & FAQs',
      'Accurate, citation-backed answers with strict zero-hallucination boundaries',
      'Seamless warm handoff to live human support for sensitive edge cases',
      'Weekly resolution telemetry and unanswered question gap analysis'
    ],
    techStack: ['Private RAG Architecture', 'Zendesk / Intercom / Freshdesk', 'Slack / Teams Alerting', 'Enterprise LLM Guardrails'],
    estimatedTimeline: '3–4 weeks deployment',
    keyMetric: '70% autonomous first-contact resolution'
  },
  {
    id: 'business-process-automation',
    number: '04',
    title: 'Business Process Automation',
    tagline: 'End-to-End Operational Workflow & Document Intelligence',
    description: 'Remove repetitive administrative drag from your operations. We connect disparate software stacks, extract structured data from unstructured invoices and contracts, and automate cross-platform reconciliation.',
    deliverables: [
      'Automated invoice, receipt, and contract OCR extraction',
      'Cross-system reconciliation between accounting, ERP, and CRM',
      'Scheduled data aggregation and automated executive Slack/Email digests',
      'Custom error recovery pipelines with proactive failure alerting'
    ],
    techStack: ['Document AI / OCR', 'QuickBooks / Xero APIs', 'PostgreSQL / Supabase', 'Webhook Architectures'],
    estimatedTimeline: '2–4 weeks deployment',
    keyMetric: '15+ hours saved per staff member weekly'
  },
  {
    id: 'custom-ai-solutions',
    number: '05',
    title: 'Custom AI Solutions',
    tagline: 'Proprietary Internal Tools, Copilots & Bespoke Architectures',
    description: 'For unique operational workflows that standard SaaS cannot solve. We architect dedicated internal AI copilots, custom analytics scrapers, proprietary database query engines, and tailored enterprise workflows.',
    deliverables: [
      'Architectural discovery & enterprise data readiness audit',
      'Bespoke web applications or internal browser/Slack extensions',
      'Private cloud deployment with strict role-based data access (RBAC)',
      'Complete intellectual property transfer and documentation handoff'
    ],
    techStack: ['FastAPI / Node.js Microservices', 'Tailored Vector Databases', 'AWS / GCP Private VPC', 'Enterprise SLA'],
    estimatedTimeline: '4–8 weeks deployment',
    keyMetric: '100% Client-Owned Intellectual Property'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Automation',
    badge: 'Foundation Package',
    price: '$1,450',
    billingPeriod: 'One-time investment',
    description: 'Essential automated pipelines for growing service businesses, consultancies, and boutique agencies ready to eliminate manual appointment and lead handling.',
    idealFor: 'Small businesses & professional service practices',
    supportLevel: '30 Days Post-Deployment Warranty & Tuning',
    setupTimeline: '10–14 business days',
    features: [
      'AI Appointment Scheduling with multi-timezone sync',
      'Automated SMS / WhatsApp booking reminders & rescheduling',
      'Inbound Lead Capture Form with instant CRM dispatch',
      '1 Primary Software Integration (e.g. HubSpot, Google Calendar, Slack)',
      'Human-in-the-loop fallback notification routing',
      'Staff walkthrough session & recorded operational handover'
    ]
  },
  {
    id: 'growth',
    name: 'Growth Engine',
    badge: 'Most Popular',
    price: '$3,250',
    billingPeriod: 'One-time setup · $390/mo maintenance',
    description: 'Comprehensive business automation suite engineered to capture, qualify, and service leads round-the-clock while automating core administrative back-office workflows.',
    idealFor: 'Scaling agencies, B2B companies & high-volume service providers',
    supportLevel: 'Priority SLA, Ongoing Prompt Maintenance & Pipeline Monitoring',
    setupTimeline: '2–3 weeks deployment',
    isPopular: true,
    features: [
      'Everything in Starter Automation',
      '24/7 AI Customer Support Agent trained on your SOPs & knowledge base',
      'Automated Lead Qualification & high-value prospect scoring',
      'Up to 4 Integrated Software Systems (CRM, Email, Slack, Invoicing)',
      'Document & Invoice OCR extraction directly to accounting software',
      'Continuous monitoring, weekly health audits & edge-case refinement',
      'Private dedicated WhatsApp / Slack emergency channel'
    ]
  },
  {
    id: 'enterprise',
    name: 'Custom Enterprise',
    badge: 'Tailored Architecture',
    price: 'Custom Scope',
    billingPeriod: 'Milestone-based delivery',
    description: 'Bespoke AI solutions engineered from the ground up for established operations with complex data requirements, multi-department workflows, and strict compliance standards.',
    idealFor: 'Established enterprises, multi-location brands & high-security operations',
    supportLevel: 'Dedicated Technical Architect, 24/7 Response SLA & Custom Retainer',
    setupTimeline: '3–6 weeks roadmap',
    features: [
      'Everything in Growth Engine',
      'Custom proprietary AI Copilots & bespoke internal tooling',
      'Private VPC deployment with SOC2 & HIPAA compliant boundaries',
      'Unlimited system integrations & custom API middleware',
      'Bi-directional ERP, legacy database, and inventory synchronization',
      'Full Intellectual Property (IP) and code ownership transfer',
      'Quarterly executive automation roadmap & new capability prototyping'
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Implementation',
    question: 'How long does a typical AI automation project take to deploy?',
    answer: 'Starter packages are typically delivered and tested within 10 to 14 business days. Comprehensive multi-tool solutions (like our Growth Engine) take 2 to 3 weeks, while bespoke enterprise integrations take 4 to 6 weeks. Every project includes structured sandbox testing, staff training, and a post-launch warranty period before final handover.'
  },
  {
    id: 'faq-2',
    category: 'Technical',
    question: 'Do we need technical staff on our team to run and maintain these systems?',
    answer: 'No. We design every automation pipeline to operate autonomously without requiring code knowledge from your staff. You interact with familiar tools like your inbox, calendar, WhatsApp, or CRM. We also provide clear video walk-throughs and offer ongoing maintenance retainers so you never have to troubleshoot edge cases.'
  },
  {
    id: 'faq-3',
    category: 'Security',
    question: 'How do you protect our confidential business and customer data?',
    answer: 'Security is paramount. We build on enterprise-grade infrastructure with encrypted API connections. Your confidential business data, client conversations, and financial records are never used to train public AI models. We enforce strict role-based access control (RBAC) and adhere to industry-standard data protection protocols.'
  },
  {
    id: 'faq-4',
    category: 'Integrations',
    question: 'Can your automations integrate with our existing CRM, calendar, and software tools?',
    answer: 'Yes. We integrate with virtually all modern software platforms featuring webhooks or APIs, including HubSpot, Salesforce, Google Workspace, Microsoft 365, Slack, Stripe, QuickBooks, Zendesk, Calendly, ClickUp, Notion, and custom PostgreSQL/SQL databases.'
  },
  {
    id: 'faq-5',
    category: 'Safeguards',
    question: 'What happens if the AI encounters an edge case or an angry customer?',
    answer: 'We design all customer-facing systems with deterministic fallback boundaries. If a customer asks a question outside approved knowledge bounds, requests a human manager, or expresses urgent frustration, the system immediately pauses automated replies and escalates the full conversation history to your team via WhatsApp, SMS, or Slack with high priority.'
  },
  {
    id: 'faq-6',
    category: 'Ownership',
    question: 'Who owns the automation workflows, credentials, and code once built?',
    answer: 'You do. 100%. Unlike restrictive SaaS platforms that lock you into monthly fees to access your own workflows, our agency builds solutions inside your own tool accounts or transfers complete ownership of workflows and code directly to you upon delivery.'
  },
  {
    id: 'faq-7',
    category: 'ROI',
    question: 'What kind of return on investment (ROI) can we realistically expect?',
    answer: 'Our clients typically recover their full implementation investment within the first 60 days through two primary channels: recapturing 15 to 40 hours of lost staff time every week from administrative grunt work, and converting 25% to 50% more inbound leads through instantaneous 24/7 response times.'
  }
];
