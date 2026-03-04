import {
  Itinerary,
  CreateItineraryRequest,
  UpdateItineraryRequest,
} from "../../domain/entities/Itinerary";
import { ItineraryRepository } from "../../domain/repositories/ItineraryRepository";
import { API_CONFIG } from "../../config/api";

export class ApiItineraryRepository implements ItineraryRepository {
  private readonly baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITINERARIES}`;

  async getAll(): Promise<Itinerary[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch itineraries");
    }
    const data = await response.json();
    return data.map(this.mapToEntity);
  }

  async getById(id: number): Promise<Itinerary | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error("Failed to fetch itinerary");
    }
    const data = await response.json();
    return this.mapToEntity(data);
  }

  async create(data: CreateItineraryRequest): Promise<Itinerary> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create itinerary");
    }
    const result = await response.json();
    return this.mapToEntity(result);
  }

  async update(id: number, data: UpdateItineraryRequest): Promise<Itinerary> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update itinerary");
    }
    const result = await response.json();
    return this.mapToEntity(result);
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete itinerary");
    }
  }

  private mapToEntity(data: any): Itinerary {
    return {
      id: data.id,
      destination: data.destination,
      date: data.date,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }
}
