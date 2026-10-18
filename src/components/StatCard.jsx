import Card from './Card'

export default function StatCard({ label, value }) {
  return (
    <Card className="p-4 sm:p-5">
      <p className="text-caption text-muted">{label}</p>
      <p className="mt-1 text-heading font-extrabold sm:text-title">{value}</p>
    </Card>
  )
}
