import { Itinerary, CreateItineraryRequest, UpdateItineraryRequest } from '../entities/Itinerary';

export interface ItineraryRepository {
  getAll(): Promise<Itinerary[]>;
  getById(id: number): Promise<Itinerary | null>;
  create(data: CreateItineraryRequest): Promise<Itinerary>;
  update(id: number, data: UpdateItineraryRequest): Promise<Itinerary>;
  delete(id: number): Promise<void>;
}