import { describeWeather } from '../lib/weatherCodes'
import { formatTemp } from '../lib/units'


function formatDate(date, options) {
  return new Intl.DateTimeFormat('en', { timeZone: 'UTC', ...options }).formatToParts(new Date(`${date}T00:00:00Z`))
}
const pick = (parts, type) => parts.find((p) => p.type === type)?.value

const dayName = (date) => pick(formatDate(date, { weekday: 'long' }), 'weekday')
function shortDate(date) {
  const parts = formatDate(date, { day: 'numeric', month: 'short' })
  return `${pick(parts, 'day')} ${pick(parts, 'month')}`
}


export default function DailyList({ daily, unit }) {
  const days = daily.slice(1, 6)
  if (days.length === 0) return null

  return (
    <ul aria-label="Next days" className="mt-3 flex flex-col">
      {days.map((day, i) => {
        const info = describeWeather(day.code)
        return (
          <li key={day.date} className="grid grid-cols-[1fr_4.5rem_3.5rem] items-center gap-3 py-3">
            <div>
              <p className="text-heading font-bold">{i === 0 ? 'Tomorrow' : dayName(day.date)}</p>
              <p className="text-caption text-muted">{shortDate(day.date)}</p>
            </div>
            <p
              className="text-center text-heading font-bold"
              title={`High ${formatTemp(day.max, unit)}, low ${formatTemp(day.min, unit)}`}
            >
              {formatTemp(day.max, unit)} {unit.toUpperCase()}
            </p>
            <span className="text-center text-4xl leading-none" role="img" aria-label={info.text} title={info.text}>
              {info.icon}
            </span>
          </li>
        )
      })}
    </ul>
  )
}