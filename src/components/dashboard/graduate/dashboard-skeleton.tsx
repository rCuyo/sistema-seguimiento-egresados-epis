function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className ?? ""}`} />
}

export function GraduateDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="h-28 animate-pulse rounded-xl bg-slate-200" />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Job offers skeleton */}
        <div className="lg:col-span-2 rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <Skeleton className="h-5 w-44" />
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-7 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="space-y-4">
          {/* Profile card */}
          <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
            <Skeleton className="h-5 w-24 rounded-full" />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>

          {/* Surveys skeleton */}
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {[1, 2].map((i) => (
                <div key={i} className="px-5 py-3.5 space-y-1.5">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-slate-100">
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity skeleton */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <Skeleton className="h-5 w-36" />
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-4 px-6 py-4">
              <Skeleton className="h-8 w-8 rounded-full mt-0.5" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
