const express = require('express');
const router = express.Router();

function createItineraryRoutes(itineraryController) {
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
  router.get('/', (req, res) => itineraryController.getAllItineraries(req, res));

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
  router.get('/:id', (req, res) => itineraryController.getItineraryById(req, res));

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
  router.post('/', (req, res) => itineraryController.createItinerary(req, res));

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
  router.put('/:id', (req, res) => itineraryController.updateItinerary(req, res));

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
  router.delete('/:id', (req, res) => itineraryController.deleteItinerary(req, res));

  return router;
}

module.exports = createItineraryRoutes;