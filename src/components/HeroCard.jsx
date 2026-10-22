import Card from './Card'
import LocalClock from './LocalClock'
import TemperatureChart from './TemperatureChart'
import { ThermometerIcon, PressureIcon, HumidityIcon, WindIcon } from './icons'
import { describeWeather } from '../lib/weatherCodes'
import { formatTemp, formatWind } from '../lib/units'


function Fact({ icon: Icon, label, value }) {
  return (
    <li className="flex items-center gap-2 text-caption font-semibold">
      <Icon className="h-5 w-5 shrink-0 text-muted" />
      <span className="sr-only">{label}: </span>
      <span>{value}</span>
    </li>
  )
}


export default function HeroCard({ place, forecast, unit }) {
  const { current } = forecast
   const info = describeWeather(current.code, current.isDay)
  const where = [place.name, place.country].filter(Boolean).join(', ')
  const temp = (value) => (value == null ? '–' : formatTemp(value, unit))
  const unitLetter = unit.toUpperCase()

  return (
    <Card radius="card" className="@container p-6 sm:p-8">
      <div className="grid gap-8 @2xl:grid-cols-2">
     
        <div>
          <span className="block text-8xl leading-none" role="img" aria-label={info.text} title={info.text}>
            {info.icon}
          </span>
          <p className="mt-4 text-display font-extrabold tracking-tight">
            {temp(current.temp)} {unitLetter}
          </p>
          <p className="mt-2 text-title font-bold">{where}</p>
          <p className="mt-3 flex items-center gap-2 text-caption text-muted">
            <ThermometerIcon className="h-5 w-5" />
            <span>Real feel</span>
            <span className="font-bold text-ink">
              {temp(current.feelsLike)} {unitLetter}
            </span>
          </p>
          <hr className="mt-5 border-line" />
          <LocalClock timeZone={forecast.timezone} />
        </div>

        
        <div className="flex flex-col justify-between gap-6">
          <TemperatureChart temps={forecast.todayTemps} parts={forecast.dayParts} unit={unit} />
          <div>
            <hr className="border-line" />
            <ul className="mt-5 flex flex-wrap items-center justify-around gap-4">
              <Fact icon={PressureIcon} label="Pressure" value={`${Math.round(current.pressure)} hPa`} />
              <Fact icon={HumidityIcon} label="Humidity" value={`${current.humidity}%`} />
              <Fact icon={WindIcon} label="Wind" value={formatWind(current.wind, unit)} />
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}