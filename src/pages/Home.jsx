import { useState } from 'react'
import { useWeather } from '../hooks/useWeather'
import Header from '../components/Header'
import WeatherContent from '../components/WeatherContent'
import { useTheme } from '../hooks/useTheme'


export default function Home() {
  const { city, weather, loading, error, search, retry } = useWeather('Dhaka')
  const [unit, setUnit] = useState('c')

  const { theme, toggle } = useTheme()

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 md:py-8 lg:px-8 lg:py-10">
      <Header onSearch={search} unit={unit} onUnitChange={setUnit} theme={theme} onThemeToggle={toggle} />
      <div className="mt-8" aria-live="polite">
        <WeatherContent
          weather={weather}
          loading={loading}
          error={error}
          city={city}
          unit={unit}
          onPick={search}
          onRetry={retry}
        />
      </div>
    </main>
  )
}
