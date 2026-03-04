const express = require('express');
const cors = require('cors');
const pool = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/itineraries:
 *   get:
 *     summary: Get all itineraries
 *     tags: [Itineraries]
 *     responses:
 *       200:
 *         description: List of all itineraries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Itinerary'
 *       500:
 *         description: Server error
 */
app.get('/api/itineraries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM itineraries ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/itineraries/{id}:
 *   get:
 *     summary: Get itinerary by ID
 *     tags: [Itineraries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Itinerary ID
 *     responses:
 *       200:
 *         description: Itinerary details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Itinerary'
 *       404:
 *         description: Itinerary not found
 *       500:
 *         description: Server error
 */
app.get('/api/itineraries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM itineraries WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/itineraries:
 *   post:
 *     summary: Create new itinerary
 *     tags: [Itineraries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItineraryInput'
 *     responses:
 *       201:
 *         description: Itinerary created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Itinerary'
 *       500:
 *         description: Server error
 */
app.post('/api/itineraries', async (req, res) => {
  try {
    const { destination, date, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO itineraries (destination, date, notes) VALUES ($1, $2, $3) RETURNING *',
      [destination, date, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/itineraries/{id}:
 *   put:
 *     summary: Update itinerary
 *     tags: [Itineraries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Itinerary ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItineraryInput'
 *     responses:
 *       200:
 *         description: Itinerary updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Itinerary'
 *       404:
 *         description: Itinerary not found
 *       500:
 *         description: Server error
 */
app.put('/api/itineraries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { destination, date, notes } = req.body;
    const result = await pool.query(
      'UPDATE itineraries SET destination = $1, date = $2, notes = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [destination, date, notes, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/itineraries/{id}:
 *   delete:
 *     summary: Delete itinerary
 *     tags: [Itineraries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Itinerary ID
 *     responses:
 *       200:
 *         description: Itinerary deleted successfully
 *       404:
 *         description: Itinerary not found
 *       500:
 *         description: Server error
 */
app.delete('/api/itineraries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM itineraries WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }
    res.json({ message: 'Itinerary deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Itinerary:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         destination:
 *           type: string
 *           description: Travel destination
 *         date:
 *           type: string
 *           format: date
 *           description: Travel date
 *         notes:
 *           type: string
 *           description: Additional notes
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     ItineraryInput:
 *       type: object
 *       required:
 *         - destination
 *         - date
 *       properties:
 *         destination:
 *           type: string
 *           description: Travel destination
 *         date:
 *           type: string
 *           format: date
 *           description: Travel date
 *         notes:
 *           type: string
 *           description: Additional notes
 */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});