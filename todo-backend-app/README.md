# Todo Backend App

Express.js backend API for travel itinerary management with PostgreSQL.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create PostgreSQL database:
```sql
CREATE DATABASE todo_db;
```

3. Run the SQL script to create table:
```bash
psql -d todo_db -f database.sql
```

4. Update .env file with your database credentials

5. Start server:
```bash
npm start
```

## API Documentation

Swagger UI documentation is available at: http://localhost:3001/api-docs

## API Endpoints

- `GET /api/itineraries` - Get all itineraries
- `GET /api/itineraries/:id` - Get itinerary by ID
- `POST /api/itineraries` - Create new itinerary
- `PUT /api/itineraries/:id` - Update itinerary
- `DELETE /api/itineraries/:id` - Delete itinerary

Server runs on http://localhost:3001