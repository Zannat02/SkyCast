import { useId } from 'react'
import Card from './Card'
import { WindIcon } from './icons'
import { toPoints, smoothPath, areaPath } from '../lib/chart'
import { formatWind } from '../lib/units'


const VIEW_W = 300
const VIEW_H = 90

export default function WindCard({ speeds, current, unit }) {
  const uid = useId().replace(/:/g, '')
  const lineId = `wind-line-${uid}`
  const fillId = `wind-fill-${uid}`

  const hasChart = speeds && speeds.length >= 2
  let line = ''
  let area = ''
  if (hasChart) {
    const points = toPoints(speeds, { width: VIEW_W, height: VIEW_H, padTop: 10, padBottom: 10 })
    line = smoothPath(points)
    area = areaPath(points, VIEW_H)
  }

  return (
    <Card radius="card" className="flex flex-col p-5">
      <h3 className="flex items-center gap-2 text-heading font-bold">
        <WindIcon className="h-5 w-5 shrink-0 text-muted" />
        Wind
      </h3>

      {hasChart && (
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="mt-4 block w-full"
          role="img"
          aria-label="Wind speed over the next 24 hours"
        >
          <defs>
            {/* রেখার দুই প্রান্ত ফিকে হয়ে মিলিয়ে যায়। userSpaceOnUse না দিলে সমান গতির (সমতল) রেখা অদৃশ্য হয়ে যায় */}
            <linearGradient id={lineId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VIEW_W} y2="0">
              <stop offset="0" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0 }} />
              <stop offset="0.15" style={{ stopColor: 'var(--color-accent)', stopOpacity: 1 }} />
              <stop offset="0.85" style={{ stopColor: 'var(--color-accent)', stopOpacity: 1 }} />
              <stop offset="1" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0 }} />
            </linearGradient>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.18 }} />
              <stop offset="1" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0 }} />
            </linearGradient>
          </defs>

          <line x1="0" x2={VIEW_W} y1="10" y2="10" strokeDasharray="4 6" className="stroke-muted/30" />
          <line x1="0" x2={VIEW_W} y1={VIEW_H - 10} y2={VIEW_H - 10} strokeDasharray="4 6" className="stroke-muted/30" />

          <path d={area} fill={`url(#${fillId})`} />
          {/* নিচের মোটা ফিকে রেখাটা আলোর আভা */}
          <path d={line} fill="none" stroke={`url(#${lineId})`} strokeWidth="9" strokeOpacity="0.25" strokeLinecap="round" />
          <path d={line} fill="none" stroke={`url(#${lineId})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      <p className="mt-auto pt-4 text-title font-bold">{formatWind(current, unit)}</p>
    </Card>
  )
}