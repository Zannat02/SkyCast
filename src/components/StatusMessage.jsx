import Card from './Card'

// error / not found / empty সব অবস্থার জন্য একই component
export default function StatusMessage({ icon, title, text, children }) {
  return (
    <Card radius="card" className="mx-auto mt-4 max-w-md p-8 text-center sm:mt-10">
      <div className="text-5xl">{icon}</div>
      <h2 className="mt-4 text-title font-extrabold">{title}</h2>
      <p className="mt-2 text-muted">{text}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-2">{children}</div>}
    </Card>
  )
}
