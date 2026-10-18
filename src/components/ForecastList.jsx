import ForecastCard from './ForecastCard'

// mobile: পাশে scroll | tablet+: ৭ কলামের grid
export default function ForecastList({ daily, unit }) {
  return (
    <section>
      <h2 className="mb-4 text-heading font-bold">7-day forecast</h2>
      <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0 md:pb-0">
        {daily.map((day, i) => (
          <ForecastCard
            key={day.date}
            day={day}
            unit={unit}
            highlighted={i === 0}
            label={i === 0 ? 'Today' : new Date(day.date + 'T00:00').toLocaleDateString('en', { weekday: 'short' })}
          />
        ))}
      </ul>
    </section>
  )
}
