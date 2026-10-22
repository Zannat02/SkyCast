import SearchBar from './SearchBar'
import UnitToggle from './UnitToggle'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'
import { PinIcon } from './icons'


export default function Header({ className = '', locationLabel, text, onTextChange, onSubmit, unit, onUnitChange, theme, onThemeToggle }) {
  const controls = (
    <div className="flex items-center gap-2">
      <UnitToggle unit={unit} onChange={onUnitChange} />
      <ThemeToggle theme={theme} onToggle={onThemeToggle} />
    </div>
  )

  return (
    <header className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between lg:hidden">
        <Logo />
        {controls}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <p className="flex min-w-0 items-center gap-2 text-title font-bold md:max-w-xs md:shrink-0">
          <PinIcon className="h-6 w-6 shrink-0" />
          <span className="truncate">{locationLabel}</span>
        </p>
        <SearchBar value={text} onChange={onTextChange} onSubmit={onSubmit} />
        <div className="hidden lg:block">{controls}</div>
      </div>
    </header>
  )
}