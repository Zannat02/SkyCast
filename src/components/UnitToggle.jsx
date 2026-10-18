import Button from './Button'

export default function UnitToggle({ unit, onChange }) {
  const next = unit === 'c' ? 'f' : 'c'
  return (
    <Button variant="ghost" size="sm" onClick={() => onChange(next)} aria-label={`Switch to °${next.toUpperCase()}`}>
      °{unit.toUpperCase()}
    </Button>
  )
}
