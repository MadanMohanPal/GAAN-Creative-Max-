# GAAN Backend REST API Specification

Base URL: `http://localhost:4000`

---

## Endpoints

### 1. System Health
- **`GET /health`**
  - Description: Returns server operational status and Supabase connectivity status.
  - Response:
    ```json
    {
      "status": "healthy",
      "platform": "GAAN Music Streaming Ecosystem Backend API",
      "version": "1.0.0",
      "timestamp": "2026-11-06T22:00:00.000Z",
      "supabaseConnected": true
    }
    ```

---

### 2. Songs Catalogue
- **`GET /api/songs`**
  - Query parameters:
    - `search` (string): Title or artist filter.
    - `genre` (UUID or name): Filter by genre.
    - `artist` (UUID or name): Filter by artist.
  - Response:
    ```json
    {
      "success": true,
      "count": 8,
      "data": [
        {
          "id": "44444444-4444-4444-4444-444444444401",
          "title": "Cybernetic Skyline",
          "artist_name": "Neon Mirage",
          "duration_seconds": 372,
          "audio_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          "cover_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
        }
      ]
    }
    ```

- **`GET /api/songs/:id`**
  - Returns song details including lyrics and artist information.

---

### 3. Artists
- **`GET /api/artists`**
  - List all verified and active artists sorted by monthly listeners.
- **`GET /api/artists/:id`**
  - Detail with artist top tracks and discography albums.

---

### 4. Albums & Genres
- **`GET /api/albums`**
- **`GET /api/albums/:id`**
- **`GET /api/genres`**

---

### 5. Explore & Discovery
- **`GET /api/explore`**
  - Curated home and discovery shelves: `quick_picks`, `trending`, `listen_again`, `featured_albums`, `top_artists`, and `moods_and_genres`.

---

### 6. Search
- **`GET /api/search?q=:query`**
  - Cross-catalogue unified search returning matching songs, artists, and albums.

---

### 7. Playback Telemetry
- **`POST /api/history`**
  - Request body:
    ```json
    {
      "songId": "44444444-4444-4444-4444-444444444401",
      "playbackSeconds": 145,
      "completed": false
    }
    ```
