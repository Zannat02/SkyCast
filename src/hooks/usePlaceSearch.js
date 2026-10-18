import { useState, useEffect, useCallback } from 'react'
import { searchPlaces } from '../services/openMeteo'
import { useDebounce } from './useDebounce'


export function usePlaceSearch(text) {
  const trimmed = text.trim()
  const query = useDebounce(trimmed, 400)

  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0) 

  useEffect(() => {
    if (query.length < 2) {
      setPlaces([])
      setError(false)
      setLoading(false)
      return
    }

    let ignore = false 
    async function run() {
      setLoading(true)
      setError(false)
      try {
        const result = await searchPlaces(query)
        if (!ignore) setPlaces(result)
      } catch {
        if (!ignore) setError(true)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    run()
    return () => { ignore = true }
  }, [query, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])


  const waiting = trimmed.length >= 2 && trimmed !== query

  return { places, loading: loading || waiting, error, retry }
}