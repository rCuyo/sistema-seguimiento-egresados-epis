function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-100 ${className ?? ""}`} />
}

function StatSkeleton() {
  return (
    <div className="rounded-xl border border-l-4 border-l-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </div>
  )
}

function JobCardSkeleton() {
  return (
    <div className="rounded-xl border border-l-4 border-l-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left info */}
        <div className="min-w-0 flex-1 space-y-3">
          {/* Company + sector row */}
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          {/* Job title */}
          <Skeleton className="h-5 w-56" />
          {/* Location */}
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Center meta */}
        <div className="flex shrink-0 flex-col gap-2 sm:items-center">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex gap-1.5">
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function JobsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-36 rounded-lg" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>

      {/* Job cards */}
      <div className="space-y-3">
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
      </div>
    </div>
  )
}
