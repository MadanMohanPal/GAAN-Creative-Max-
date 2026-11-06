# GAAN — True AMOLED Music Streaming Ecosystem

> Inspired by YouTube Music, engineered for pure AMOLED dark aesthetics (#000000) and lossless audio fidelity.

---

## Architecture Overview

```
/gaan
  /android-app      # Flutter + Dart mobile application for Android
  /website          # Next.js 14 + TypeScript responsive web player
  /admin-panel      # Vite + React 18 administrative studio
  /backend          # Express + TypeScript secure API service
  /database         # Supabase PostgreSQL schema migrations, RLS & seed data
  /shared           # Cross-platform types, constants, models, and branding
  /docs             # Comprehensive system architecture & API specifications
```

---

## 🎨 GAAN AMOLED Design System
- **Background**: Pure AMOLED Black (`#000000`) for zero pixel illumination and OLED battery efficiency.
- **Surface**: Deep Charcoal (`#0A0A0F`, `#12121A`).
- **Brand Accents**: Vibrant Purple (`#8B5CF6`), Violet (`#7C3AED`), Fuchsia (`#D946EF`), Pink (`#EC4899`).
- **Gradients**: Neon violet-fuchsia glow with subtle glassmorphic backdrop filters.
- **Brand Mark**: Stylized 'G' intertwined with sonic equalizer waveforms.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm
- Flutter 3.24+ & Dart 3.5+
- Git

### 1. Backend Service
```bash
cd gaan/backend
cp .env.example .env
npm install
npm run build
npm start
# Server runs on http://localhost:4000
# Health check: http://localhost:4000/health
```

### 2. Website (Next.js)
```bash
cd gaan/website
cp .env.example .env.local
npm install
npm run build
npm run dev
# Web player runs on http://localhost:3000
```

### 3. Admin Panel (React)
```bash
cd gaan/admin-panel
npm install
npm run build
npm run dev
# Admin studio runs on http://localhost:3001
```

### 4. Android Mobile Application (Flutter)
```bash
cd gaan/android-app
flutter pub get
flutter test
flutter run
```

---

## 🎵 Legal Sample Catalogue
Development and testing use legally verified, royalty-free audio streams hosted on high-performance CDNs (SoundHelix series 1-10) with verified status codes, correct bitrates, and Creative Commons metadata.

---

## 🛡️ Database & Security
- 10 PostgreSQL tables with full Row Level Security (RLS) enforcement.
- Service-role secrets are restricted to server-side backend operations only.
- Instant Guest/Demo mode allows immediate exploration without requiring external credentials.
