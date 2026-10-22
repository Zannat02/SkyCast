import { useState, useEffect } from 'react'
import { usePlaceSearch } from '../hooks/usePlaceSearch'
import { useForecast } from '../hooks/useForecast'
import { useTheme } from '../hooks/useTheme'
import { formatTemp } from '../lib/units'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import PlacesPanel from '../components/PlacesPanel'
import Dashboard from '../components/Dashboard'
import WeekPanel from '../components/WeekPanel'


export default function Home() {
  const [text, setText] = useState('Dhaka')
  const [selected, setSelected] = useState(null)
  const [unit, setUnit] = useState('c')
  const { theme, toggle } = useTheme()

  const search = usePlaceSearch(text)
  const weather = useForecast(selected)


  useEffect(() => {
    if (!selected && search.places.length > 0) setSelected(search.places[0])
  }, [selected, search.places])


  function handleSubmit() {
    if (search.places.length > 0) setSelected(search.places[0])
  }

  const waitingForFirstPlace = !selected && search.loading
  const ready = weather.forecast && !weather.loading && !weather.error


  let locationLabel = 'Search a place'
  if (selected) {
    locationLabel = ready ? `${selected.name}, ${formatTemp(weather.forecast.current.temp, unit)}` : selected.name
  }


  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
     <div className="grid grid-cols-1 gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)_26rem]">
        <Header
          className="lg:col-start-2 lg:row-start-1 xl:col-span-2"
          locationLabel={locationLabel}
          text={text}
          onTextChange={setText}
          onSubmit={handleSubmit}
          unit={unit}
          onUnitChange={setUnit}
          theme={theme}
          onThemeToggle={toggle}
        />

        <Sidebar className="lg:col-start-1 lg:row-span-3 lg:row-start-1 xl:row-span-2">
          <PlacesPanel
            text={text}
            places={search.places}
            loading={search.loading}
            error={search.error}
            onRetry={search.retry}
            selectedId={selected?.id}
            onSelect={setSelected}
          />
        </Sidebar>

        <main className="min-w-0 lg:col-start-2 lg:row-start-2" aria-live="polite">
          <Dashboard
            place={selected}
            forecast={weather.forecast}
            loading={weather.loading || waitingForFirstPlace}
            error={weather.error}
            onRetry={weather.retry}
            unit={unit}
          />
        </main>

        <WeekPanel
          className="lg:col-start-2 lg:row-start-3 xl:col-start-3 xl:row-start-2"
          forecast={weather.forecast}
          loading={weather.loading || waitingForFirstPlace}
          error={weather.error}
          unit={unit}
        />
      </div>
    </div>
  )
}