# Itinerary API Specification

## Base URL
```
http://localhost:3001
```

## Endpoints

### Get All Itineraries
- **URL:** `/api/itineraries`
- **Method:** `GET`
- **Description:** Retrieve all itineraries ordered by creation date (newest first)

**Response:**
- **200 OK**
  ```json
  [
    {
      "id": 1,
      "destination": "Paris",
      "date": "2024-06-15",
      "notes": "Visit Eiffel Tower",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Error message"
  }
  ```

### Get Itinerary by ID
- **URL:** `/api/itineraries/{id}`
- **Method:** `GET`
- **Description:** Retrieve a specific itinerary by ID

**Parameters:**
- `id` (path, required): Integer - Itinerary ID

**Response:**
- **200 OK**
  ```json
  {
    "id": 1,
    "destination": "Paris",
    "date": "2024-06-15",
    "notes": "Visit Eiffel Tower",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": "Itinerary not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Error message"
  }
  ```

### Create New Itinerary
- **URL:** `/api/itineraries`
- **Method:** `POST`
- **Description:** Create a new itinerary

**Request Body:**
```json
{
  "destination": "Paris",
  "date": "2024-06-15",
  "notes": "Visit Eiffel Tower"
}
```

**Response:**
- **201 Created**
  ```json
  {
    "id": 1,
    "destination": "Paris",
    "date": "2024-06-15",
    "notes": "Visit Eiffel Tower",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Error message"
  }
  ```

### Update Itinerary
- **URL:** `/api/itineraries/{id}`
- **Method:** `PUT`
- **Description:** Update an existing itinerary

**Parameters:**
- `id` (path, required): Integer - Itinerary ID

**Request Body:**
```json
{
  "destination": "London",
  "date": "2024-07-20",
  "notes": "Visit Big Ben"
}
```

**Response:**
- **200 OK**
  ```json
  {
    "id": 1,
    "destination": "London",
    "date": "2024-07-20",
    "notes": "Visit Big Ben",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-16T14:45:00Z"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": "Itinerary not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Error message"
  }
  ```

### Delete Itinerary
- **URL:** `/api/itineraries/{id}`
- **Method:** `DELETE`
- **Description:** Delete an itinerary by ID

**Parameters:**
- `id` (path, required): Integer - Itinerary ID

**Response:**
- **200 OK**
  ```json
  {
    "message": "Itinerary deleted successfully"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": "Itinerary not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "error": "Error message"
  }
  ```

## Data Models

### Itinerary
```json
{
  "id": "integer (auto-generated)",
  "destination": "string (required)",
  "date": "string (date format, required)",
  "notes": "string (optional)",
  "created_at": "string (datetime, auto-generated)",
  "updated_at": "string (datetime, auto-generated)"
}
```

### ItineraryInput
```json
{
  "destination": "string (required)",
  "date": "string (date format, required)",
  "notes": "string (optional)"
}
```

## Interactive Documentation
Swagger UI documentation is available at: `http://localhost:3001/api-docs`