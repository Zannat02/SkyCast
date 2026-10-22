import { SearchIcon } from './icons'


export default function SearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-pill border-2 border-accent bg-panel py-1.5 pl-5 pr-1.5 focus-within:ring-2 focus-within:ring-accent/40 md:flex-1"
    >
      <label htmlFor="city" className="sr-only">Search places</label>
      <input
        id="city"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search location, city or place"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-caption outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </form>
  )
}