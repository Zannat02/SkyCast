
export default function LoadingSkeleton() {
  return (
    <div role="status" className="flex flex-col gap-4">
      <p className="text-caption text-muted">Fetching weather data…</p>
      <div className="skeleton h-96 rounded-card md:h-80" />
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="skeleton h-40 rounded-tile sm:h-52" />
        <div className="skeleton h-40 rounded-tile sm:h-52" />
        <div className="skeleton h-40 rounded-tile sm:h-52" />
      </div>
    </div>
  )
}