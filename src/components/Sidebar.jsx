import Card from './Card'
import Logo from './Logo'


export default function Sidebar({ className = '', children }) {
  return (
    <Card as="aside" radius="card" className={`p-5 ${className}`}>
      <div className="hidden lg:block">
        <Logo />
      </div>
      <h2 className="text-heading font-bold lg:mt-8">Places</h2>
      <div className="mt-3">{children}</div>
    </Card>
  )
}