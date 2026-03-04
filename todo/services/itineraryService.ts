import { Itinerary, ItineraryInput } from '../types/itinerary';
import { API_CONFIG } from '../src/config/api';

export const itineraryService = {
  async getAll(): Promise<Itinerary[]> {
    console.log('[API Request] GET /itineraries');
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITINERARIES}`);
    const data = await response.json();
    console.log('[API Response] GET /itineraries', { status: response.status, data });
    if (!response.ok) throw new Error('Failed to fetch itineraries');
    return data;
  },

  async create(data: ItineraryInput): Promise<Itinerary> {
    console.log('[API Request] POST /itineraries', data);
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITINERARIES}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('[API Response] POST /itineraries', { status: response.status, data: result });
    if (!response.ok) throw new Error('Failed to create itinerary');
    return result;
  },

  async update(id: number, data: ItineraryInput): Promise<Itinerary> {
    console.log(`[API Request] PUT /itineraries/${id}`, data);
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITINERARIES}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(`[API Response] PUT /itineraries/${id}`, { status: response.status, data: result });
    if (!response.ok) throw new Error('Failed to update itinerary');
    return result;
  },

  async delete(id: number): Promise<void> {
    console.log(`[API Request] DELETE /itineraries/${id}`);
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITINERARIES}/${id}`, {
      method: 'DELETE'
    });
    console.log(`[API Response] DELETE /itineraries/${id}`, { status: response.status });
    if (!response.ok) throw new Error('Failed to delete itinerary');
  }
};