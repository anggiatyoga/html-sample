import { Itinerary, CreateItineraryRequest, UpdateItineraryRequest } from '../entities/Itinerary';
import { ItineraryRepository } from '../repositories/ItineraryRepository';

export class ItineraryUseCases {
  constructor(private repository: ItineraryRepository) {}

  async getAllItineraries(): Promise<Itinerary[]> {
    return this.repository.getAll();
  }

  async getItineraryById(id: number): Promise<Itinerary | null> {
    return this.repository.getById(id);
  }

  async createItinerary(data: CreateItineraryRequest): Promise<Itinerary> {
    this.validateItineraryData(data);
    return this.repository.create(data);
  }

  async updateItinerary(id: number, data: UpdateItineraryRequest): Promise<Itinerary> {
    this.validateItineraryData(data);
    return this.repository.update(id, data);
  }

  async deleteItinerary(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  private validateItineraryData(data: CreateItineraryRequest | UpdateItineraryRequest): void {
    if (!data.destination?.trim()) {
      throw new Error('Destination is required');
    }
    if (!data.date) {
      throw new Error('Date is required');
    }
    if (new Date(data.date) < new Date()) {
      throw new Error('Date cannot be in the past');
    }
  }
}