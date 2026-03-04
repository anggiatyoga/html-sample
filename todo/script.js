let itineraries = [...itinerariesData];

function renderItineraries() {
    const list = document.getElementById('itineraryList');
    list.innerHTML = itineraries.map(item => `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-2xl font-semibold text-gray-800">${item.destination}</h3>
                <button onclick="deleteItinerary(${item.id})" class="text-red-500 hover:text-red-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
            <p class="text-gray-600 mb-2"><span class="font-medium">Date:</span> ${item.date}</p>
            <p class="text-gray-700">${item.notes}</p>
        </div>
    `).join('');
}

function showAddForm() {
    document.getElementById('addForm').classList.remove('hidden');
}

function hideAddForm() {
    document.getElementById('addForm').classList.add('hidden');
    document.getElementById('destination').value = '';
    document.getElementById('date').value = '';
    document.getElementById('notes').value = '';
}

function addItinerary() {
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    if (!destination || !date) {
        alert('Please fill in destination and date');
        return;
    }

    const newItem = {
        id: Date.now(),
        destination,
        date,
        notes
    };

    itineraries.unshift(newItem);
    renderItineraries();
    hideAddForm();
}

function deleteItinerary(id) {
    if (confirm('Delete this itinerary?')) {
        itineraries = itineraries.filter(item => item.id !== id);
        renderItineraries();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderItineraries();
});