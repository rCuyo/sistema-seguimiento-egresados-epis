function Sk({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-100 ${className ?? ""}`} />
}

export function ApplicationsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Sk className="h-7 w-48" />
          <Sk className="h-4 w-64" />
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <Sk className="h-9 w-40 rounded-lg" />
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-slate-50/60 px-5 py-3">
          <Sk className="h-3 w-32" />
        </div>
        <div className="divide-y divide-slate-50">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 space-y-1.5">
                <Sk className="h-4 w-40" />
                <Sk className="h-3 w-56" />
              </div>
              <div className="w-40 space-y-1.5">
                <Sk className="h-4 w-32" />
                <Sk className="h-3 w-24" />
              </div>
              <Sk className="h-6 w-24 rounded-full" />
              <Sk className="h-3 w-20" />
              <Sk className="h-4 w-4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
