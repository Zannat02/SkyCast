import { useRef } from 'react'
import Card from './Card'
import HourlyStrip from './HourlyStrip'
import DailyList from './DailyList'

const SCROLL_STEP = 216


function Arrow({ direction }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
    </svg>
  )
}

function ArrowButton({ direction, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-panel-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Arrow direction={direction} />
    </button>
  )
}


export default function WeekPanel({ className = '', forecast, loading, error, unit }) {
  const listRef = useRef(null)

  function scroll(direction) {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    listRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: reduce ? 'auto' : 'smooth' })
  }

  function renderBody() {
    if (loading) {
      return (
        <div role="status" aria-label="Loading hourly forecast" className="flex gap-3 overflow-hidden pb-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-44 w-24 shrink-0 rounded-card" />
          ))}
        </div>
      )
    }
    if (error) {
      return <p className="py-4 text-caption text-muted">Hourly forecast is unavailable right now.</p>
    }
    if (!forecast) {
      return <p className="py-4 text-caption text-muted">Choose a place to see its forecast.</p>
    }
    return (
      <>
        <HourlyStrip hours={forecast.hourly} unit={unit} scrollRef={listRef} />
        <DailyList daily={forecast.daily} unit={unit} />
      </>
    )
  }

  return (
    <Card as="aside" radius="card" className={`p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <ArrowButton direction="left" label="Show earlier hours" onClick={() => scroll(-1)} />
        <h2 className="text-title font-bold">This week</h2>
        <ArrowButton direction="right" label="Show later hours" onClick={() => scroll(1)} />
      </div>

      <h3 className="mb-3 mt-6 text-heading font-bold">Today</h3>
      {renderBody()}
    </Card>
  )
}