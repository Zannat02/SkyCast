import { useState } from 'react'
import Button from './Button'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const name = value.trim()
    if (name) onSearch(name)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2 md:max-w-md">
      <label htmlFor="city" className="sr-only">City name</label>
      <input
        id="city"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search city…"
        className="min-w-0 flex-1 rounded-pill bg-panel px-5 py-3 text-caption outline-none ring-1 ring-line placeholder:text-muted focus:ring-2 focus:ring-sky"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}
