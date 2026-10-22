# SkyCast

A weather dashboard built with React and Tailwind CSS. Search for any city, see its current conditions, the next 24 hours, and the days ahead. All data comes live from the free [Open-Meteo](https://open-meteo.com/) API, so no API key is needed.

**Live demo:** [https://sky-cast-eta-rose.vercel.app/](https://sky-cast-eta-rose.vercel.app/)

## Features

- **Place search** with debounced input and a ranked results list (largest places first)
- **Current conditions:** temperature, real feel, humidity, pressure, wind, local date and live local time
- **Temperature chart** for today with morning, afternoon, evening and night values
- **Condition cards:** wind trend, rain chance, UV index and cloud cover, each with a level label
- **Hourly forecast** for the next 24 hours with arrow-button scrolling
- **Daily forecast** for the next 5 days
- **°C / °F toggle** and **dark / light theme** (theme is remembered)
- **Loading states:** skeleton cards and "Searching places…" / "Fetching weather data…" messages
- **Error states:** friendly messages with a Retry button when a request fails
- **Responsive layout** for mobile, tablet and desktop
- **Accessible:** labelled controls, keyboard focus styles, reduced-motion support

## Tech stack

- React
- Vite
- Tailwind CSS
- Open-Meteo Geocoding and Forecast APIs

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# create a production build
npm run build
```

## Testing loading and error states

Two URL flags simulate slow and failing requests, so the loading and error UI is easy to see:

| Flag | Effect |
| --- | --- |
| `?slow=1` | Delays every request by 2.5 seconds (shows loading states) |
| `?fail=1` | Makes every request fail (shows error states and Retry) |

Example: `http://localhost:5173/?fail=1`

## Project structure

```
src/
├── components/   UI pieces (Dashboard, HeroCard, WeekPanel, RingCard, ...)
├── hooks/        useForecast, usePlaceSearch, useDebounce, useClock, useTheme
├── lib/          helpers for charts, units, labels, time and weather codes
├── pages/        Home page that wires everything together
└── services/     openMeteo.js (API calls and response shaping)
```

## How it works

1. Typing in the search bar is debounced, then `searchPlaces` queries the Open-Meteo geocoding API.
2. Selecting a place (the first result is picked automatically) triggers `fetchForecast`.
3. The forecast response is reshaped into the data each card needs: current weather, the next 24 hours, today's temperatures and the daily summary.
4. Every request goes through one helper that turns network, status and JSON problems into a single error type the UI can handle.

## Credits

Weather data by [Open-Meteo](https://open-meteo.com/).