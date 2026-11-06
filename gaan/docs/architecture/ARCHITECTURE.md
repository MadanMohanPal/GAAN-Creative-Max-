# GAAN — System Architecture & Design Specification

## Overview
GAAN is a complete, scalable music streaming ecosystem inspired by YouTube Music, engineered natively for dark AMOLED displays and high-fidelity lossless streaming.

```
+--------------------------------------------------------------------------------+
|                                GAAN ECOSYSTEM                                  |
+--------------------------------------------------------------------------------+
             |                                                  |
     +-------v--------+                                +--------v-------+
     |  Android App   |                                |    Website     |
     | (Flutter/Dart) |                                | (Next.js/TS)   |
     +-------+--------+                                +--------+-------+
             |                                                  |
             |           +---------------------------+          |
             +---------->|   Shared Types & Models   |<---------+
                         +---------------------------+
                                       |
                         +-------------v-------------+
                         |      GAAN Backend API     |
                         |  (Express/Node/TypeScript)|
                         +-------------+-------------+
                                       |
                         +-------------v-------------+
                         |      Supabase Backend     |
                         |  PostgreSQL + Auth + RLS  |
                         |  + Storage Buckets (CDN)  |
                         +---------------------------+
```

---

## 1. Monorepo Organization
```
/gaan
  /android-app      -> Flutter 3.47+ mobile application for Android (AMOLED UI)
  /website          -> Next.js 14 App Router responsive web player
  /admin-panel      -> Vite + React 18 admin management portal
  /backend          -> Express + TypeScript secure API gateway & search
  /database         -> Supabase PostgreSQL schema, migrations, seeds, RLS policies
  /shared           -> Cross-platform schemas, TypeScript DTOs, Dart models, branding
  /docs             -> System architecture, API documentation, setup guides
```

---

## 2. Audio Engine Architecture

### Mobile (Flutter)
- Powered by `audioplayers` 6.8+ with native Android `AudioContext` binding.
- Background playback configured via `AVAudioSessionCategory.playback` and `AndroidContentType.music`.
- Media notification & focus management handled via `AndroidAudioFocus.gain`.
- Persistent `AudioPlayerService` ChangeNotifier provider managing queue, shuffle, repeat (off, all, one), and state.

### Web (Next.js)
- Global `PlayerProvider` HTML5 Audio engine.
- Web `navigator.mediaSession` integration for hardware media keys (play/pause/prev/next/seek) and lock screen metadata.
- Floating docked `MiniPlayer` with micro-progress bar and full `FullPlayerModal` expanded view with synchronized lyrics and queue management.

---

## 3. Database & Security Schema

### PostgreSQL Tables
1. `profiles`: Extends Supabase `auth.users` with display name, username, and avatars.
2. `songs`: Title, artist_id, album_id, genre_id, duration, audio_url, cover_url, lyrics, plays_count, likes_count.
3. `artists`: Name, bio, image_url, header_url, verified status, monthly_listeners.
4. `albums`: Title, artist_id, cover_url, release_date, type ('album' | 'single' | 'ep').
5. `genres`: Name, slug, accent_color, image_url.
6. `playlists`: Title, description, cover_url, user_id, is_public.
7. `playlist_songs`: Junction table with unique constraints and track ordering.
8. `liked_songs`: Strictly private user favorites.
9. `listening_history`: Playback logging for smart recommendations.
10. `user_preferences`: Audio streaming bitrate, AMOLED dark theme modes, volume normalization.

### Row Level Security (RLS)
- Public catalogue read access (`songs`, `artists`, `albums`, `genres`).
- User isolated read/write for `liked_songs`, `listening_history`, and `user_preferences`.
- Public/private playlist visibility enforcement.
- Service-role key isolated exclusively to server-side backend operations.
