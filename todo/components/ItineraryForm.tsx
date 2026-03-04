import { useState, useEffect } from 'react';
import { Itinerary, ItineraryInput } from '../types/itinerary';

interface ItineraryFormProps {
  isOpen: boolean;
  editingItinerary?: Itinerary;
  onSave: (data: ItineraryInput) => Promise<void>;
  onClose: () => void;
}

export const ItineraryForm = ({ isOpen, editingItinerary, onSave, onClose }: ItineraryFormProps) => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingItinerary) {
      setDestination(editingItinerary.destination);
      setDate(editingItinerary.date);
      setNotes(editingItinerary.notes);
    } else {
      setDestination('');
      setDate('');
      setNotes('');
    }
  }, [editingItinerary]);

  const handleSave = async () => {
    if (destination && date) {
      setIsLoading(true);
      try {
        await onSave({ destination, date, notes });
        onClose();
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg z-60">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-4">
          {editingItinerary ? 'Edit Itinerary' : 'New Itinerary'}
        </h2>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          className="w-full mb-3 px-4 py-2 border rounded-lg h-24"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg"
          >
            {editingItinerary ? 'Save' : 'Add'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};