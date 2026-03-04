"use client";

import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { API_CONFIG } from "../src/config/api";

const API_BASE = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ITINERARIES}`;

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [itineraries, setItineraries] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE);
      if (response.ok) {
        const data = await response.json();
        setItineraries(data);
      }
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItinerary = async () => {
    if (destination && date) {
      try {
        setLoading(true);
        if (editingId) {
          const response = await fetch(
            `${API_BASE}/${editingId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ destination, date, notes }),
            }
          );
          if (response.ok) {
            await fetchItineraries();
            setEditingId(null);
          }
        } else {
          const response = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ destination, date, notes }),
          });
          if (response.ok) {
            await fetchItineraries();
          }
        }
        setDestination("");
        setDate("");
        setNotes("");
        setShowForm(false);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        console.error("Error saving itinerary:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split('T')[0];
  };

  const editItinerary = (itinerary) => {
    setDestination(itinerary.destination);
    setDate(formatDateForInput(itinerary.date));
    setNotes(itinerary.notes);
    setEditingId(itinerary.id);
    setShowForm(true);
  };

  const deleteItinerary = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchItineraries();
      }
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setEditingId(null);
    setDestination("");
    setDate("");
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {loading && <Loading />}

      <div className="container max-w-4xl px-4 py-8 mx-auto">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">
            Travel Itinerary
          </h1>
          <p className="text-gray-600">Plan and organize your trips</p>
        </header>

        <div className="mb-6">
          <button
            onClick={() => {
              setDestination("");
              setDate("");
              setNotes("");
              setEditingId(null);
              setShowForm(true);
            }}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
          >
            + Add New Trip
          </button>
        </div>

        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-4 text-2xl font-semibold">
                {editingId ? "Edit Itinerary" : "New Itinerary"}
              </h2>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                className="w-full px-4 py-2 mb-3 border rounded-lg"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 mb-3 border rounded-lg"
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="w-full h-24 px-4 py-2 mb-3 border rounded-lg"
              />
              <div className="flex gap-2">
                <button
                  onClick={addItinerary}
                  className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => editItinerary(itinerary)}
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {itinerary.destination}
                  </h3>
                  <p className="mb-2 text-gray-600">{itinerary.date}</p>
                  <p className="text-gray-700">{itinerary.notes}</p>
                </div>
                <button
                  onClick={() => deleteItinerary(itinerary.id)}
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAlert && (
        <div className="fixed z-50 px-4 py-3 text-white bg-green-500 rounded-lg shadow-lg bottom-4 right-4">
          Trip added successfully!
        </div>
      )}
    </div>
  );
}
