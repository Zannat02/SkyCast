
import Card from './Card'
import Button from './Button'
import StatCard from './StatCard'
import StatusMessage from './StatusMessage'
import LoadingSkeleton from './LoadingSkeleton'
import { describeWeather } from '../lib/weatherCodes'
import { formatTemp, formatWind } from '../lib/units'

export default function ForecastPreview({ place, forecast, loading, error, onRetry, unit }) {
  if (loading) return <LoadingSkeleton />

  if (error) {
    return (
      <StatusMessage icon="📡" title="Weather data couldn’t be loaded" text="The request failed. Check your internet connection and try again.">
        <Button variant="accent" onClick={onRetry}>Retry</Button>
      </StatusMessage>
    )
  }

  if (!forecast || !place) {
    return <StatusMessage icon="🔎" title="Pick a place" text="Search for a city, then choose it from the list." />
  }

  const { current, dayParts } = forecast
  const info = describeWeather(current.code)
  const where = [place.region, place.country].filter(Boolean).join(', ')
  const rain = forecast.rainChance == null ? '–' : `${forecast.rainChance}%`

  return (
    <div className="flex flex-col gap-4">
      <Card tone="accent" radius="card" className="p-6 sm:p-8">
        <p className="text-heading font-bold">
          {place.name}
          {where && <span className="font-medium opacity-70">, {where}</span>}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-display font-extrabold tracking-tighter">{formatTemp(current.temp, unit)}</p>
          <span className="text-7xl sm:text-8xl" role="img" aria-label={info.text}>{info.icon}</span>
        </div>
        <p className="mt-4 text-title font-bold">{info.text}</p>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Feels like" value={formatTemp(current.feelsLike, unit)} />
        <StatCard label="Humidity" value={`${current.humidity}%`} />
        <StatCard label="Wind" value={formatWind(current.wind, unit)} />
        <StatCard label="Pressure" value={`${Math.round(current.pressure)} hPa`} />
        <StatCard label="Cloud cover" value={`${current.cloudCover}%`} />
        <StatCard label="Rain chance" value={rain} />
        <StatCard label="UV (today max)" value={forecast.uvMax.toFixed(1)} />
        <StatCard label="Morning / Noon" value={`${formatTemp(dayParts.morning, unit)} / ${formatTemp(dayParts.afternoon, unit)}`} />
        <StatCard label="Evening / Night" value={`${formatTemp(dayParts.evening, unit)} / ${formatTemp(dayParts.night, unit)}`} />
      </div>

      <p className="text-caption text-muted">
        Data check: {forecast.hourly.length} hourly items, {forecast.daily.length} daily items.
      </p>
    </div>
  )
}