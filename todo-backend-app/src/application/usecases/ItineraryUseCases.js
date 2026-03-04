const Itinerary = require('../../domain/entities/Itinerary');

class ItineraryUseCases {
  constructor(itineraryRepository) {
    this.itineraryRepository = itineraryRepository;
  }

  async getAllItineraries() {
    return await this.itineraryRepository.findAll();
  }

  async getItineraryById(id) {
    const itinerary = await this.itineraryRepository.findById(id);
    if (!itinerary) {
      throw new Error('Itinerary not found');
    }
    return itinerary;
  }

  async createItinerary({ destination, date, notes }) {
    const itinerary = Itinerary.create({ destination, date, notes });
    return await this.itineraryRepository.create(itinerary);
  }

  async updateItinerary(id, { destination, date, notes }) {
    const existingItinerary = await this.itineraryRepository.findById(id);
    if (!existingItinerary) {
      throw new Error('Itinerary not found');
    }
    
    existingItinerary.update({ destination, date, notes });
    return await this.itineraryRepository.update(id, existingItinerary);
  }

  async deleteItinerary(id) {
    const existingItinerary = await this.itineraryRepository.findById(id);
    if (!existingItinerary) {
      throw new Error('Itinerary not found');
    }
    
    await this.itineraryRepository.delete(id);
    return { message: 'Itinerary deleted successfully' };
  }
}

module.exports = ItineraryUseCases;