import { MoonIcon, SunIcon } from './icons'


export default function ThemeToggle({ theme, onToggle }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  const Icon = theme === 'dark' ? MoonIcon : SunIcon

  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
      className="flex items-center gap-2 rounded-pill bg-accent py-1 pl-3 pr-1 text-caption font-bold text-on-accent transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-accent">
        <Icon className="h-4 w-4" />
      </span>
    </button>
  )
}