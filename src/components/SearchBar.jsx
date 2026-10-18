import Button from './Button'


export default function SearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2 md:max-w-md">
      <label htmlFor="city" className="sr-only">Search places</label>
      <input
        id="city"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search city…"
        autoComplete="off"
        className="min-w-0 flex-1 rounded-pill bg-panel px-5 py-3 text-caption outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-sky"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}