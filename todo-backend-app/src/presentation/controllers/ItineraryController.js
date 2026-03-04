class ItineraryController {
  constructor(itineraryUseCases) {
    this.itineraryUseCases = itineraryUseCases;
  }

  async getAllItineraries(req, res) {
    try {
      const itineraries = await this.itineraryUseCases.getAllItineraries();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getItineraryById(req, res) {
    try {
      const { id } = req.params;
      const itinerary = await this.itineraryUseCases.getItineraryById(id);
      res.json(itinerary);
    } catch (error) {
      if (error.message === 'Itinerary not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async createItinerary(req, res) {
    try {
      const { destination, date, notes } = req.body;
      const itinerary = await this.itineraryUseCases.createItinerary({ destination, date, notes });
      res.status(201).json(itinerary);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateItinerary(req, res) {
    try {
      const { id } = req.params;
      const { destination, date, notes } = req.body;
      const itinerary = await this.itineraryUseCases.updateItinerary(id, { destination, date, notes });
      res.json(itinerary);
    } catch (error) {
      if (error.message === 'Itinerary not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async deleteItinerary(req, res) {
    try {
      const { id } = req.params;
      const result = await this.itineraryUseCases.deleteItinerary(id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Itinerary not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ItineraryController;