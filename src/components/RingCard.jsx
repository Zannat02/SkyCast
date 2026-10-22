import Card from './Card'


const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS 

export default function RingCard({ icon: Icon, label, valueText, percent, level }) {
  const pct = Math.max(0, Math.min(100, percent ?? 0))

  return (
    <Card radius="card" className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-2">
        <h3 className="flex items-center gap-2 text-heading font-bold">
          {Icon && <Icon className="h-5 w-5 shrink-0 text-muted" />}
          {label}
        </h3>
        <span className="text-caption font-semibold text-muted">{level}</span>
      </div>

      <div
        className="relative mx-auto mt-5 h-24 w-24 sm:h-28 sm:w-28"
        role="img"
        aria-label={`${label}: ${valueText}, ${level}`}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="9" className="stroke-ring-track" />
          {pct > 0 && (
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="9"
              strokeLinecap="round"
              className="stroke-accent"
              strokeDasharray={`${(pct / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            />
          )}
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-title font-extrabold">
          {valueText}
        </span>
      </div>
    </Card>
  )
}