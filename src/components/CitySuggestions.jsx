import Button from './Button'

const CITIES = ['Dhaka', 'London', 'Tokyo', 'New York']

export default function CitySuggestions({ onPick }) {
  return CITIES.map((c) => (
    <Button key={c} variant="chip" size="sm" onClick={() => onPick(c)}>{c}</Button>
  ))
}
