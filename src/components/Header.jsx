import SearchBar from './SearchBar'
import UnitToggle from './UnitToggle'
import ThemeToggle from './ThemeToggle'

// mobile: উপরে নিচে সাজানো | tablet+: এক সারিতে, ডানে toggle দুটো
export default function Header({ onSearch, unit, onUnitChange, theme, onThemeToggle }) {
  const controls = (
    <div className="flex items-center gap-2">
      <UnitToggle unit={unit} onChange={onUnitChange} />
      <ThemeToggle theme={theme} onToggle={onThemeToggle} />
    </div>
  )

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between md:justify-start">
        <h1 className="text-title font-extrabold tracking-tight">SkyCast</h1>
        <div className="md:hidden">{controls}</div>
      </div>
      <SearchBar onSearch={onSearch} />
      <div className="hidden md:block">{controls}</div>
    </header>
  )
}