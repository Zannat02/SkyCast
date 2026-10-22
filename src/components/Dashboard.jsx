import Button from './Button'
import StatusMessage from './StatusMessage'
import LoadingSkeleton from './LoadingSkeleton'
import HeroCard from './HeroCard'
import RingCard from './RingCard'
import { RainIcon, SunIcon, CloudIcon } from './icons'
import { uvLevel, rainLevel, cloudLevel } from '../lib/labels'
import WindCard from './WindCard'

const UV_SCALE_MAX = 11 

export default function Dashboard({ place, forecast, loading, error, onRetry, unit }) {
  if (loading) return <LoadingSkeleton />

  if (error) {
    return (
      <StatusMessage icon="📡" title="Weather data couldn’t be loaded" text="The request failed. Check your internet connection and try again.">
        <Button onClick={onRetry}>Retry</Button>
      </StatusMessage>
    )
  }

  if (!forecast || !place) {
    return <StatusMessage icon="🔎" title="Pick a place" text="Search for a city, then choose it from the list." />
  }

  const rain = forecast.rainChance
  const cloud = forecast.current.cloudCover
  const uv = forecast.uvMax

  return (
    <div className="flex flex-col gap-4">
      <HeroCard place={place} forecast={forecast} unit={unit} />

      <section aria-label="Conditions" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
           <WindCard speeds={forecast.hourly.map((h) => h.wind)} current={forecast.current.wind} unit={unit} />
        <RingCard
          icon={RainIcon}
          label="Rain chance"
          valueText={rain == null ? '–' : `${rain}%`}
          percent={rain}
          level={rainLevel(rain)}
        />
        <RingCard
          icon={SunIcon}
          label="UV index"
          valueText={uv.toFixed(1)}
          percent={(Math.min(uv, UV_SCALE_MAX) / UV_SCALE_MAX) * 100}
          level={uvLevel(uv)}
        />
        <RingCard
          icon={CloudIcon}
          label="Cloud cover"
          valueText={`${cloud}%`}
          percent={cloud}
          level={cloudLevel(cloud)}
        />
      </section>
    </div>
  )
}