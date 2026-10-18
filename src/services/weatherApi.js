
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'


export class CityNotFoundError extends Error {}
export class NetworkError extends Error {}

const params = new URLSearchParams(window.location.search)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getJson(url) {
  if (params.get('slow')) await sleep(2500)
  if (params.get('fail')) throw new NetworkError('Simulated failure')
  let res
  try {
    res = await fetch(url)
  } catch {
    throw new NetworkError('Network request failed')
  }

  if (!res.ok) throw new NetworkError(`Server responded with ${res.status}`)
  return res.json()
}

export async function fetchWeather(cityName) {

  const geo = await getJson(`${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1`)
  if (!geo.results?.length) throw new CityNotFoundError(cityName)
  const place = geo.results[0]


  const query = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
  })
  const data = await getJson(`${WEATHER_URL}?${query}`)

  return {
    place: { name: place.name, country: place.country, admin: place.admin1 },
    current: data.current,
    daily: data.daily.time.map((date, i) => ({
      date,
      code: data.daily.weather_code[i],
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
    })),
  }
}
