const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo Backend API',
      version: '1.0.0',
      description: 'Express.js backend API for travel itinerary management with PostgreSQL',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.js'],
};

module.exports = swaggerJsdoc(options);
