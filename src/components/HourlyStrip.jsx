import { describeWeather } from '../lib/weatherCodes'
import { formatTemp } from '../lib/units'


function hourLabel(iso) {
  const h = parseInt(iso.slice(11, 13), 10)
  return `${h % 12 || 12}${h < 12 ? 'am' : 'pm'}`
}


export default function HourlyStrip({ hours, unit, scrollRef }) {
  return (
    <ul
      ref={scrollRef}
      aria-label="Next 24 hours"
      tabIndex={0}
      className="flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {hours.map((hour, i) => {
        const info = describeWeather(hour.code, hour.isDay)
        return (
          <li
            key={hour.time}
            className={`flex w-24 shrink-0 snap-start flex-col items-center gap-3 rounded-card bg-panel-2 px-2 py-5 ${
              i === 0 ? 'ring-1 ring-accent/50' : ''
            }`}
          >
            <span className="text-caption font-semibold">{i === 0 ? 'Now' : hourLabel(hour.time)}</span>
            <span className="text-4xl leading-none" role="img" aria-label={info.text} title={info.text}>
              {info.icon}
            </span>
            <span className="text-heading font-bold">
              {formatTemp(hour.temp, unit)} {unit.toUpperCase()}
            </span>
          </li>
        )
      })}
    </ul>
  )
}