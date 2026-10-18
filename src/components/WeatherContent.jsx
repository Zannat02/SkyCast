import LoadingSkeleton from './LoadingSkeleton'
import StatusMessage from './StatusMessage'
import CitySuggestions from './CitySuggestions'
import CurrentWeather from './CurrentWeather'
import ForecastList from './ForecastList'
import Button from './Button'

// চারটা অবস্থার মধ্যে কোনটা দেখাবে সেই সিদ্ধান্ত এখানে: loading / not_found / network / success
export default function WeatherContent({ weather, loading, error, city, unit, onPick, onRetry }) {
  if (loading) return <LoadingSkeleton />

  if (error === 'not_found') {
    return (
      <StatusMessage icon="🧭" title={`No city found for “${city}”`} text="Check the spelling or try a larger nearby city.">
        <CitySuggestions onPick={onPick} />
      </StatusMessage>
    )
  }

  if (error === 'network') {
    return (
      <StatusMessage icon="📡" title="Weather data couldn’t be loaded" text="The request failed. Check your internet connection and try again.">
        <Button variant="accent" onClick={onRetry}>Retry</Button>
      </StatusMessage>
    )
  }

  if (!weather) return null

  return (
    <div className="flex flex-col gap-8">
      <CurrentWeather place={weather.place} current={weather.current} unit={unit} />
      <ForecastList daily={weather.daily} unit={unit} />
    </div>
  )
}
