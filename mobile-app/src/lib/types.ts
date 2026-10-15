export type EventCategory =
  | "music"
  | "workshops"
  | "theatre"
  | "food"
  | "heritage"
  | "nightlife"
  | "outdoor";

export type CityZone = "South Kolkata" | "Salt Lake & New Town" | "Park Street & Central" | "North Kolkata";

export type OutboundType = "bookmyshow" | "insider" | "instagram" | "google_forms" | "maps";

export interface KolkataEvent {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: EventCategory;
  categoryLabel: string;
  categoryIcon: string;
  vibe: string;
  zone: CityZone;
  neighborhood: string;
  venueName: string;
  venueAddress: string;
  dayType: "Friday" | "Saturday" | "Sunday" | "All Weekend";
  timeStr: string;
  isTonight: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isFree: boolean;
  priceLabel: string;
  priceAmount: number; // in INR
  coverImage: string;
  outboundUrl: string;
  outboundType: OutboundType;
  outboundLabel: string;
  isFeatured?: boolean;
  attendeesCount?: number;
  tags: string[];
}

export interface CircuitStop {
  timeSlot: string;
  title: string;
  category: string;
  venueName: string;
  neighborhood: string;
  estimatedCost: string;
  description: string;
  imageSrc: string;
  outboundLink: string;
}

export interface CircuitPlan {
  id: string;
  title: string;
  day: string;
  zone: string;
  vibe: string;
  budgetRange: string;
  totalEstimatedCost: string;
  walkingNote: string;
  stops: CircuitStop[];
}

export interface PollOption {
  id: string;
  title: string;
  venue: string;
  timeStr: string;
  category: string;
  votes: number;
}

export interface WhatsAppPoll {
  id: string;
  title: string;
  targetDate: string;
  createdBy: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: string;
}

export interface EventSubmission {
  id: string;
  title: string;
  category: EventCategory;
  zone: CityZone;
  venueName: string;
  neighborhood: string;
  dayType: "Friday" | "Saturday" | "Sunday";
  timeStr: string;
  priceLabel: string;
  outboundUrl: string;
  contactInfo: string;
  flyerImage?: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}
