// আসল layout-এর মতো একই আকারের skeleton, যাতে data এলে লাফিয়ে না ওঠে
const Block = ({ className }) => <div className={`skeleton rounded-tile ${className}`} />

export default function LoadingSkeleton() {
  return (
    <div role="status" className="flex flex-col gap-8">
      <p className="text-caption text-muted">Fetching weather data…</p>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Block className="h-64 !rounded-card" />
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
          <Block className="h-24" /><Block className="h-24" /><Block className="h-24" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 md:grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => <Block key={i} className="h-36 !rounded-card" />)}
      </div>
    </div>
  )
}
