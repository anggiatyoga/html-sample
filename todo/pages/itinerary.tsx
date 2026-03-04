"use client";

import { useState } from "react";
import { useItineraries } from "../hooks/useItineraries";
import { ItineraryForm } from "../components/ItineraryForm";
import { ItineraryCard } from "../components/ItineraryCard";
import { Loading } from "../components/Loading";
import { Itinerary, ItineraryInput } from "../types/itinerary";

export default function ItineraryPage() {
  const { itineraries, loading, createItinerary, updateItinerary, deleteItinerary } = useItineraries();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState<Itinerary | undefined>();

  const handleSave = async (data: ItineraryInput) => {
    if (editingItinerary) {
      await updateItinerary(editingItinerary.id, data);
    } else {
      await createItinerary(data);
    }
    setEditingItinerary(undefined);
  };

  const handleEdit = (itinerary: Itinerary) => {
    setEditingItinerary(itinerary);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingItinerary(undefined);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading && <Loading />}
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Travel Itinerary
          </h1>
          <p className="text-gray-600">Plan and organize your trips</p>
        </header>

        <div className="mb-6">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
          >
            + Add New Trip
          </button>
        </div>

        <ItineraryForm
          isOpen={isFormOpen}
          editingItinerary={editingItinerary}
          onSave={handleSave}
          onClose={handleClose}
        />

        <div className="space-y-4">
          {itineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary.id}
              itinerary={itinerary}
              onEdit={handleEdit}
              onDelete={deleteItinerary}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
