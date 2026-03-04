class Itinerary {
  constructor({ id, destination, date, notes, created_at, updated_at }) {
    this.id = id;
    this.destination = destination;
    this.date = date;
    this.notes = notes;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create({ destination, date, notes }) {
    return new Itinerary({
      destination,
      date,
      notes,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  update({ destination, date, notes }) {
    if (destination !== undefined) this.destination = destination;
    if (date !== undefined) this.date = date;
    if (notes !== undefined) this.notes = notes;
    this.updated_at = new Date();
  }
}

module.exports = Itinerary;