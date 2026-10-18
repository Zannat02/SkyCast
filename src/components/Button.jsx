
const VARIANTS = {
  primary: 'bg-sky text-on-accent hover:brightness-110',
  accent: 'bg-sun text-on-accent hover:brightness-110',
  ghost: 'bg-panel text-ink ring-1 ring-line hover:bg-panel-2',
  chip: 'bg-panel-2 text-ink hover:bg-sky hover:text-on-accent',
}
const SIZES = {
  md: 'px-5 py-3 text-caption',
  sm: 'px-4 py-2 text-caption',
}

export default function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`rounded-pill font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  )
}
