import { useClock } from '../hooks/useClock'
import { formatLocalDate, formatLocalTime } from '../lib/time'
import { CalendarIcon, ClockIcon } from './icons'


export default function LocalClock({ timeZone }) {
  const now = useClock()

  return (
    <div className="mt-4 flex flex-col gap-3 text-heading font-semibold">
      <p className="flex items-center gap-3">
        <CalendarIcon className="h-5 w-5 shrink-0 text-muted" />
        <span>{formatLocalDate(now, timeZone)}</span>
      </p>
      <p className="flex items-center gap-3">
        <ClockIcon className="h-5 w-5 shrink-0 text-muted" />
        <span className="tabular-nums">{formatLocalTime(now, timeZone)}</span>
      </p>
    </div>
  )
}