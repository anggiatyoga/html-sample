import { useState, useEffect } from 'react';
import { Itinerary, CreateItineraryRequest } from '../../domain/entities/Itinerary';

interface ItineraryFormProps {
  isOpen: boolean;
  editingItinerary?: Itinerary;
  onSave: (data: CreateItineraryRequest) => Promise<void>;
  onClose: () => void;
}

export const ItineraryForm = ({ isOpen, editingItinerary, onSave, onClose }: ItineraryFormProps) => {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingItinerary) {
      setFormData({
        destination: editingItinerary.destination,
        date: editingItinerary.date,
        notes: editingItinerary.notes,
      });
    } else {
      setFormData({ destination: '', date: '', notes: '' });
    }
    setErrors({});
  }, [editingItinerary, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (new Date(formData.date) < new Date()) {
      newErrors.date = 'Date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await onSave(formData);
      onClose();
    } catch (error) {
      // Error is handled by the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {editingItinerary ? 'Edit Itinerary' : 'New Itinerary'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              placeholder="Destination"
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.destination ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.destination && (
              <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Notes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};