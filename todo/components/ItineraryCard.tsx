import { Itinerary } from '../types/itinerary';

interface ItineraryCardProps {
  itinerary: Itinerary;
  onEdit: (itinerary: Itinerary) => void;
  onDelete: (id: number) => void;
}

export const ItineraryCard = ({ itinerary, onEdit, onDelete }: ItineraryCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1 cursor-pointer" onClick={() => onEdit(itinerary)}>
          <h3 className="text-xl font-semibold text-gray-800">{itinerary.destination}</h3>
          <p className="text-gray-600 mb-2">{itinerary.date}</p>
          <p className="text-gray-700">{itinerary.notes}</p>
        </div>
        <button
          onClick={() => onDelete(itinerary.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};