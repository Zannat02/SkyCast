const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'


export class NetworkError extends Error {}


const params = new URLSearchParams(window.location.search)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


async function getJson(url) {
  if (params.get('slow')) await sleep(2500)
  if (params.get('fail')) throw new NetworkError('Simulated failure')

  let response
  try {
    response = await fetch(url) 
  } catch {
    throw new NetworkError('Network request failed')
  }

  if (!response.ok) throw new NetworkError(`Server responded with ${response.status}`)

  try {
    return await response.json()
  } catch {
    throw new NetworkError('Response was not valid JSON')
  }
}


export async function searchPlaces(text) {
  const query = text.trim()
  if (query.length < 2) return [] 

  const data = await getJson(`${GEO_URL}?name=${encodeURIComponent(query)}&count=10`)

  
  const results = data.results ?? []

  return results
    .map((r) => ({
      id: r.id,
      name: r.name,
      region: r.admin1, 
      country: r.country,
      countryCode: r.country_code,
      latitude: r.latitude,
      longitude: r.longitude,
      population: r.population ?? 0, 
    }))
    .sort((a, b) => b.population - a.population)
}


export async function fetchForecast({ latitude, longitude }) {
  const query = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,pressure_msl,cloud_cover,weather_code',
    hourly: 'temperature_2m,weather_code,wind_speed_10m,precipitation_probability,uv_index',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    forecast_days: 7,
    timezone: 'auto',
  })
  const d = await getJson(`${FORECAST_URL}?${query}`)
  if (!d.current || !d.hourly || !d.daily) throw new NetworkError('Unexpected response')


  const h = d.hourly
  const hours = h.time.map((time, i) => ({
    time,
    temp: h.temperature_2m[i],
    code: h.weather_code[i],
    wind: h.wind_speed_10m[i],
    rain: h.precipitation_probability[i],
    uv: h.uv_index[i],
  }))

  const nowIndex = Math.max(0, hours.findIndex((x) => x.time.startsWith(d.current.time.slice(0, 13))))

  const today = d.current.time.slice(0, 10)
  const todayHours = hours.filter((x) => x.time.startsWith(today))
  const tempAt = (hour) => todayHours.find((x) => x.time.endsWith(`T${String(hour).padStart(2, '0')}:00`))?.temp

  return {
    timezone: d.timezone,
    current: {
      time: d.current.time,
      temp: d.current.temperature_2m,
      feelsLike: d.current.apparent_temperature,
      humidity: d.current.relative_humidity_2m,
      wind: d.current.wind_speed_10m,
      pressure: d.current.pressure_msl,
      cloudCover: d.current.cloud_cover,
      code: d.current.weather_code,
    },
    rainChance: hours[nowIndex].rain, 
    uvMax: Math.max(...todayHours.map((x) => x.uv)), 
    dayParts: { morning: tempAt(6), afternoon: tempAt(12), evening: tempAt(18), night: tempAt(22) },
    hourly: hours.slice(nowIndex, nowIndex + 24), 
    daily: d.daily.time.map((date, i) => ({
      date,
      code: d.daily.weather_code[i],
      max: d.daily.temperature_2m_max[i],
      min: d.daily.temperature_2m_min[i],
    })),
  }
}
