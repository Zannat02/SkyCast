import Card from './Card'
import Button from './Button'
import PlaceItem from './PlaceItem'


export default function PlacesPanel({ text, places, loading, error, onRetry, selectedId, onSelect }) {
  const trimmed = text.trim()

  function renderBody() {
    if (trimmed.length < 2) {
      return <p className="px-2 py-4 text-caption text-muted">Type at least 2 letters to search for a place.</p>
    }
    if (loading) {
      return (
        <div role="status" className="flex flex-col gap-2">
          <p className="px-2 text-caption text-muted">Searching places…</p>
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-14 rounded-tile" />)}
        </div>
      )
    }
    if (error) {
      return (
        <div className="flex flex-col items-start gap-3 px-2 py-4">
          <p className="text-caption text-muted">Couldn’t search places. Check your connection and try again.</p>
          <Button variant="accent" size="sm" onClick={onRetry}>Retry</Button>
        </div>
      )
    }
    if (places.length === 0) {
      return <p className="px-2 py-4 text-caption text-muted">No places match “{trimmed}”. Try another spelling.</p>
    }
    return (
      <ul className="flex flex-col gap-1">
        {places.map((p) => (
          <PlaceItem key={p.id} place={p} active={p.id === selectedId} onSelect={onSelect} />
        ))}
      </ul>
    )
  }

  return (
    <Card as="section" radius="card" className="p-4 sm:p-5">
      <h2 className="mb-3 text-heading font-bold">Places</h2>
      <div className="max-h-72 overflow-y-auto lg:max-h-[32rem]" aria-live="polite">
        {renderBody()}
      </div>
    </Card>
  )
}