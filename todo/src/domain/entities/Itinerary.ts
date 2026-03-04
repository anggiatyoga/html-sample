export interface Itinerary {
  id: number;
  destination: string;
  date: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItineraryRequest {
  destination: string;
  date: string;
  notes: string;
}

export interface UpdateItineraryRequest {
  destination: string;
  date: string;
  notes: string;
}