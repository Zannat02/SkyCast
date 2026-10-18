// unit = 'c' (metric) অথবা 'f' (imperial)
export const formatTemp = (celsius, unit) =>
  `${Math.round(unit === 'f' ? (celsius * 9) / 5 + 32 : celsius)}°`

export const formatWind = (kmh, unit) =>
  unit === 'f' ? `${Math.round(kmh * 0.621)} mph` : `${Math.round(kmh)} km/h`
