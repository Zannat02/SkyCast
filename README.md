# SkyCast – Weather Explorer

শহরের নাম লিখে লাইভ আবহাওয়া ও ৭ দিনের forecast দেখার React অ্যাপ।
Data: [Open-Meteo](https://open-meteo.com) (Geocoding + Forecast API, API key লাগে না)।

**Live:** (Vercel link এখানে বসাও)

## Folder structure
```
src/
  App.jsx            শুধু <Home /> render করে
  pages/Home.jsx     state + layout
  components/        reusable UI (Button, Card, SearchBar, ForecastCard ...)
  hooks/useWeather   fetch + loading + error
  services/          API call
  lib/               helper (unit, weather code)
  index.css          design system tokens
```

## Run
```bash
npm install
npm run dev
```

## Demo video
- Loading: `/?slow=1`
- Error: `/?fail=1` (অথবা DevTools → Network → Offline)
- Not found: `asdfgh` লিখে search

Stack: React, Vite, Tailwind CSS v4
