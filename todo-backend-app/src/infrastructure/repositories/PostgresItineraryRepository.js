const ItineraryRepository = require("../../domain/repositories/ItineraryRepository");
const Itinerary = require("../../domain/entities/Itinerary");
const pool = require("../database/connection");

class PostgresItineraryRepository extends ItineraryRepository {
  async findAll() {
    const result = await pool.query(
      "SELECT * FROM itineraries ORDER BY created_at DESC"
    );
    return result.rows.map((row) => new Itinerary(row));
  }

  async findById(id) {
    const result = await pool.query("SELECT * FROM itineraries WHERE id = $1", [
      id,
    ]);
    return result.rows.length > 0 ? new Itinerary(result.rows[0]) : null;
  }

  async create(itinerary) {
    const result = await pool.query(
      "INSERT INTO itineraries (destination, date, notes) VALUES ($1, $2, $3) RETURNING *",
      [itinerary.destination, itinerary.date, itinerary.notes]
    );
    return new Itinerary(result.rows[0]);
  }

  async update(id, itinerary) {
    const result = await pool.query(
      "UPDATE itineraries SET destination = $1, date = $2, notes = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [itinerary.destination, itinerary.date, itinerary.notes, id]
    );
    return result.rows.length > 0 ? new Itinerary(result.rows[0]) : null;
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM itineraries WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows.length > 0;
  }
}

module.exports = PostgresItineraryRepository;
