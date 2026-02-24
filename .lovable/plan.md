

# Make the App PWA Compatible

Convert the app into a Progressive Web App so users can install it on their devices and use it offline.

## What This Enables
- Users can "Add to Home Screen" on mobile and desktop
- The app works offline (since all processing is client-side anyway)
- Feels like a native app with a splash screen and no browser chrome

## Changes

### 1. Web App Manifest (`public/manifest.json`)
- Create a standard `manifest.json` with:
  - App name: "CryptoTax AU" (or similar)
  - Short name, description, theme color, background color
  - Display mode: `standalone`
  - Icons at 192x192 and 512x512 sizes (generated as simple SVG-based PNGs or using the existing favicon)

### 2. Service Worker (`public/sw.js`)
- A simple cache-first service worker that:
  - Caches the app shell (HTML, JS, CSS) on install
  - Serves from cache when offline
  - Updates cache when new versions are available

### 3. Register the Service Worker (`src/main.tsx`)
- Add service worker registration after the app renders
- Only register in production mode

### 4. Update `index.html`
- Add `<link rel="manifest" href="/manifest.json">`
- Add `<meta name="theme-color">` tag
- Add Apple-specific meta tags (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`)
- Update the title to "CryptoTax AU"

### 5. PWA Icons (`public/icon-192.png`, `public/icon-512.png`)
- Generate simple icons using an inline SVG approach or reference the existing favicon

