function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-100 ${className ?? ""}`} />
}

export function GraduateDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back link */}
      <Skeleton className="h-4 w-36" />

      {/* Hero */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex gap-4">
          <Skeleton className="h-16 w-16 shrink-0 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-64" />
            <div className="flex gap-4 pt-1">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-5">
          {[5, 4].map((rows, bi) => (
            <div key={bi} className="rounded-xl border bg-white shadow-sm">
              <div className="border-b px-5 py-3.5">
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="space-y-3 p-5">
                {Array.from({ length: rows }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-4 w-24 shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="space-y-5 lg:col-span-2">
          {[3, 3, 2].map((items, bi) => (
            <div key={bi} className="rounded-xl border bg-white shadow-sm">
              <div className="border-b px-5 py-3.5">
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="space-y-4 p-5">
                {Array.from({ length: items }).map((_, i) => (
                  <div key={i} className="space-y-1.5 pl-4">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
