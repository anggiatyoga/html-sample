import { useState, useEffect } from 'react';
import { Itinerary, ItineraryInput } from '../types/itinerary';
import { itineraryService } from '../services/itineraryService';

export const useItineraries = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      const data = await itineraryService.getAll();
      setItineraries(data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    } finally {
      setLoading(false);
    }
  };

  const createItinerary = async (data: ItineraryInput) => {
    try {
      setLoading(true);
      await itineraryService.create(data);
      await fetchItineraries();
    } catch (error) {
      console.error('Error creating itinerary:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateItinerary = async (id: number, data: ItineraryInput) => {
    try {
      setLoading(true);
      await itineraryService.update(id, data);
      await fetchItineraries();
    } catch (error) {
      console.error('Error updating itinerary:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteItinerary = async (id: number) => {
    try {
      setLoading(true);
      await itineraryService.delete(id);
      await fetchItineraries();
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return {
    itineraries,
    loading,
    createItinerary,
    updateItinerary,
    deleteItinerary
  };
};