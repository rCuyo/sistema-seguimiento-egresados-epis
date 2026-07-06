function Sk({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-100 ${className ?? ""}`} />
}

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Sk className="h-8 w-40" />
        <Sk className="h-4 w-64" />
      </div>
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <Sk className="h-9 flex-1 rounded-lg" />
          <Sk className="h-9 w-32 rounded-lg" />
          <Sk className="h-9 w-28 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
            <Sk className="h-3 w-24" />
            <Sk className="h-5 w-3/4" />
            <div className="flex gap-2">
              <Sk className="h-5 w-20 rounded-full" />
              <Sk className="h-5 w-16 rounded-full" />
            </div>
            <Sk className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
