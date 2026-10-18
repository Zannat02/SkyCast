
export default function PlaceItem({ place, active, onSelect }) {
  const where = [place.region, place.country].filter(Boolean).join(', ') // না থাকা অংশ বাদ

  return (
    <li>
      <button
        onClick={() => onSelect(place)}
        aria-current={active ? 'true' : undefined}
        className={`w-full rounded-tile px-4 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky ${
          active ? 'bg-panel-2 ring-1 ring-sky/50' : 'hover:bg-panel-2'
        }`}
      >
        <span className="block text-body font-bold">{place.name}</span>
        <span className="block text-caption text-muted">{where}</span>
      </button>
    </li>
  )
}