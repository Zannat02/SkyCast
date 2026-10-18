import { useState, useEffect, useCallback } from 'react'
import { fetchWeather, CityNotFoundError } from '../services/weatherApi'

// data আনা, loading আর error সামলানোর পুরো দায়িত্ব এই hook-এর
export function useWeather(initialCity) {
  const [city, setCity] = useState(initialCity)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // null | 'not_found' | 'network'
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false // পুরনো request-এর উত্তর যেন নতুনকে ওভাররাইট না করে
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeather(city)
        if (!ignore) setWeather(data)
      } catch (err) {
        if (!ignore) setError(err instanceof CityNotFoundError ? 'not_found' : 'network')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [city, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { city, weather, loading, error, search: setCity, retry }
}
