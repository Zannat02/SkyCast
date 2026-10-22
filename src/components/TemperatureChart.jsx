import { useId } from 'react'
import { toPoints, smoothPath, areaPath } from '../lib/chart'
import { formatTemp } from '../lib/units'


const VIEW_W = 340 
const VIEW_H = 170
const PAD_X = 22 
const PAD_TOP = 14
const PAD_BOTTOM = 8

const PARTS = [
  { key: 'morning', label: 'Morning', hour: 6 },
  { key: 'afternoon', label: 'Afternoon', hour: 12 },
  { key: 'evening', label: 'Evening', hour: 18 },
  { key: 'night', label: 'Night', hour: 22 },
]

export default function TemperatureChart({ temps, parts, unit }) {
  const gradientId = `temp-fill-${useId().replace(/:/g, '')}`
  if (!temps || temps.length < 2) return null

  
  const plotWidth = VIEW_W - PAD_X * 2
  const points = toPoints(temps, { width: plotWidth, height: VIEW_H, padTop: PAD_TOP, padBottom: PAD_BOTTOM })
    .map((p) => ({ ...p, x: p.x + PAD_X }))


  const line = smoothPath(points)
  const area = areaPath(points, VIEW_H)


  const gridY = [PAD_TOP, (PAD_TOP + VIEW_H - PAD_BOTTOM) / 2, VIEW_H - PAD_BOTTOM]

  return (
    <div>
      <h3 className="text-heading font-bold">Temperature</h3>

      <div className="mt-3">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full" role="img" aria-label="Temperature through today">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.45 }} />
              <stop offset="1" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.02 }} />
            </linearGradient>
          </defs>

          {gridY.map((y) => (
            <line key={y} x1="0" x2={VIEW_W} y1={y} y2={y} strokeDasharray="4 6" className="stroke-muted/30" />
          ))}

          <path d={area} fill={`url(#${gradientId})`} />
          <path d={line} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent" />

          {PARTS.map(({ key, hour }) => {
            const p = points[hour]
            return p && <circle key={key} cx={p.x} cy={p.y} r="5.5" strokeWidth="2" className="fill-ring-track stroke-accent" />
          })}
        </svg>

       
        <div className="relative mt-3 h-14">
          {PARTS.map(({ key, label, hour }) => {
            const p = points[hour]
            if (!p) return null
            const value = parts?.[key]
            return (
              <div
                key={key}
                className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-center"
                style={{ left: `${(p.x / VIEW_W) * 100}%` }}
              >
                <p className="text-xs text-muted sm:text-caption">{label}</p>
                <p className="text-caption font-bold sm:text-heading">
                  {value == null ? '–' : `${formatTemp(value, unit)} ${unit.toUpperCase()}`}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}