import Button from './Button'

export default function ThemeToggle({ theme, onToggle }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <Button variant="ghost" size="sm" onClick={onToggle} aria-label={`Switch to ${next} theme`}>
      <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
    </Button>
  )
}