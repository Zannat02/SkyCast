import Card from './Card'
import { describeWeather } from '../lib/weatherCodes'
import { formatTemp } from '../lib/units'

export default function ForecastCard({ day, label, unit, highlighted }) {
  const info = describeWeather(day.code)
  return (
    <Card
      as="li"
      radius="card"
      tone={highlighted ? 'raised' : 'default'}
      className="flex min-w-[5.5rem] shrink-0 snap-start flex-col items-center gap-2 px-3 py-5 md:min-w-0"
    >
      <span className="text-caption font-semibold text-muted">{label}</span>
      <span className="text-3xl" role="img" aria-label={info.text}>{info.icon}</span>
      <span className="text-heading font-extrabold">{formatTemp(day.max, unit)}</span>
      <span className="text-caption text-muted">{formatTemp(day.min, unit)}</span>
    </Card>
  )
}
