import { useState, useEffect, useCallback } from 'react'
import { fetchForecast } from '../services/openMeteo'


export function useForecast(place) {
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!place) return

    let ignore = false
    async function run() {
      setLoading(true)
      setError(false)
      try {
        const data = await fetchForecast(place)
        if (!ignore) setForecast(data)
      } catch {
        if (!ignore) setError(true)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    run()
    return () => { ignore = true }
  }, [place, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  return { forecast, loading, error, retry }
}