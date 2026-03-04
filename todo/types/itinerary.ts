export interface Itinerary {
  id: number;
  destination: string;
  date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ItineraryInput {
  destination: string;
  date: string;
  notes: string;
}