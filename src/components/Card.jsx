
const TONES = {
  default: 'bg-panel',
  raised: 'bg-panel-2 ring-1 ring-sky/50',
  accent: 'bg-sky text-on-accent',
}
const RADII = { card: 'rounded-card', tile: 'rounded-tile' }

export default function Card({ tone = 'default', radius = 'tile', as: Tag = 'div', className = '', ...props }) {
  return <Tag className={`${TONES[tone]} ${RADII[radius]} ${className}`} {...props} />
}
