import Card from './Card'
import StatCard from './StatCard'
import { describeWeather } from '../lib/weatherCodes'
import { formatTemp, formatWind } from '../lib/units'

// desktop: বড় card বাঁয়ে, stat ডানে | mobile/tablet: উপরে card, নিচে ৩টা stat এক সারিতে
export default function CurrentWeather({ place, current, unit }) {
  const info = describeWeather(current.weather_code)

  return (
    <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <Card tone="accent" radius="card" className="p-6 sm:p-8">
        <p className="text-heading font-bold">
          {place.name}
          <span className="font-medium opacity-70">
            {place.admin ? `, ${place.admin}` : ''}, {place.country}
          </span>
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-display font-extrabold tracking-tighter">{formatTemp(current.temperature_2m, unit)}</p>
          <span className="text-7xl sm:text-8xl" role="img" aria-label={info.text}>{info.icon}</span>
        </div>
        <p className="mt-4 text-title font-bold">{info.text}</p>
      </Card>

      <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
        <StatCard label="Feels like" value={formatTemp(current.apparent_temperature, unit)} />
        <StatCard label="Humidity" value={`${current.relative_humidity_2m}%`} />
        <StatCard label="Wind" value={formatWind(current.wind_speed_10m, unit)} />
      </div>
    </section>
  )
}
