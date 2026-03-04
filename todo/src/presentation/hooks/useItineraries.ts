import { useState, useEffect } from 'react';
import { Itinerary, CreateItineraryRequest, UpdateItineraryRequest } from '../../domain/entities/Itinerary';
import { ItineraryUseCases } from '../../domain/usecases/ItineraryUseCases';

interface UseItinerariesResult {
  itineraries: Itinerary[];
  loading: boolean;
  error: string | null;
  createItinerary: (data: CreateItineraryRequest) => Promise<void>;
  updateItinerary: (id: number, data: UpdateItineraryRequest) => Promise<void>;
  deleteItinerary: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useItineraries = (useCases: ItineraryUseCases): UseItinerariesResult => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await useCases.getAllItineraries();
      setItineraries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  const createItinerary = async (data: CreateItineraryRequest) => {
    try {
      setError(null);
      await useCases.createItinerary(data);
      await fetchItineraries();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create itinerary';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateItinerary = async (id: number, data: UpdateItineraryRequest) => {
    try {
      setError(null);
      await useCases.updateItinerary(id, data);
      await fetchItineraries();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update itinerary';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteItinerary = async (id: number) => {
    try {
      setError(null);
      await useCases.deleteItinerary(id);
      await fetchItineraries();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete itinerary';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const clearError = () => setError(null);

  useEffect(() => {
    fetchItineraries();
  }, []);

  return {
    itineraries,
    loading,
    error,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    clearError,
  };
};