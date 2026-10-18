import { useState, useEffect } from 'react'
import { usePlaceSearch } from '../hooks/usePlaceSearch'
import { useForecast } from '../hooks/useForecast'
import { useTheme } from '../hooks/useTheme'
import Header from '../components/Header'
import PlacesPanel from '../components/PlacesPanel'
import ForecastPreview from '../components/ForecastPreview'

// পুরো অ্যাপের state আর layout এই page থেকে নিয়ন্ত্রিত হয়
export default function Home() {
  const [text, setText] = useState('Dhaka') // search box-এর লেখা
  const [selected, setSelected] = useState(null) // তালিকা থেকে বেছে নেওয়া জায়গা
  const [unit, setUnit] = useState('c')
  const { theme, toggle } = useTheme()

  const search = usePlaceSearch(text)
  const weather = useForecast(selected)

  // প্রথমবার তালিকা এলে প্রথম জায়গাটা নিজে থেকে বেছে নেওয়া
  useEffect(() => {
    if (!selected && search.places.length > 0) setSelected(search.places[0])
  }, [selected, search.places])

  // Enter চাপলে তালিকার প্রথম জায়গাটা খোলে
  function handleSubmit() {
    if (search.places.length > 0) setSelected(search.places[0])
  }

  const waitingForFirstPlace = !selected && search.loading

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 md:py-8 lg:px-8 lg:py-10">
      <Header
        text={text}
        onTextChange={setText}
        onSubmit={handleSubmit}
        unit={unit}
        onUnitChange={setUnit}
        theme={theme}
        onThemeToggle={toggle}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_1fr]">
        <PlacesPanel
          text={text}
          places={search.places}
          loading={search.loading}
          error={search.error}
          onRetry={search.retry}
          selectedId={selected?.id}
          onSelect={setSelected}
        />
        <div aria-live="polite">
          <ForecastPreview
            place={selected}
            forecast={weather.forecast}
            loading={weather.loading || waitingForFirstPlace}
            error={weather.error}
            onRetry={weather.retry}
            unit={unit}
          />
        </div>
      </div>
    </main>
  )
}