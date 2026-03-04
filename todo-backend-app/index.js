const os = require('os');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const createItineraryRoutes = require('./src/presentation/routes/itineraryRoutes');
const container = require('./src/shared/DIContainer');
const logger = require('./src/presentation/middleware/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.json({ status: 'ok', message: 'Service is running' }));

app.use('/api/itineraries', createItineraryRoutes(container.itineraryController));

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
  const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family === 'IPv4' && !i.internal)?.address || 'localhost';
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://${ip}:${PORT}/api-docs`);
});