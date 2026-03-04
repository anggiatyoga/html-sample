const PostgresItineraryRepository = require('../infrastructure/repositories/PostgresItineraryRepository');
const ItineraryUseCases = require('../application/usecases/ItineraryUseCases');
const ItineraryController = require('../presentation/controllers/ItineraryController');

class DIContainer {
  constructor() {
    this._itineraryRepository = null;
    this._itineraryUseCases = null;
    this._itineraryController = null;
  }

  get itineraryRepository() {
    if (!this._itineraryRepository) {
      this._itineraryRepository = new PostgresItineraryRepository();
    }
    return this._itineraryRepository;
  }

  get itineraryUseCases() {
    if (!this._itineraryUseCases) {
      this._itineraryUseCases = new ItineraryUseCases(this.itineraryRepository);
    }
    return this._itineraryUseCases;
  }

  get itineraryController() {
    if (!this._itineraryController) {
      this._itineraryController = new ItineraryController(this.itineraryUseCases);
    }
    return this._itineraryController;
  }
}

module.exports = new DIContainer();