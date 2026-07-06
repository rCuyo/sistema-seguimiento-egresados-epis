function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-slate-200 ${className ?? ""}`} />
  )
}

export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back link */}
      <Skeleton className="h-5 w-36" />

      {/* Survey header card */}
      <div className="overflow-hidden rounded-xl bg-slate-300 p-6 shadow-md">
        <Skeleton className="mb-3 h-4 w-20 bg-slate-400" />
        <Skeleton className="mb-2 h-7 w-3/4 bg-slate-400" />
        <Skeleton className="h-4 w-full bg-slate-400" />
        <Skeleton className="mt-1 h-4 w-2/3 bg-slate-400" />
        <Skeleton className="mt-4 h-3 w-24 bg-slate-400" />
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-2.5 w-full rounded-full" />
      </div>

      {/* Question cards */}
      <div className="space-y-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-start gap-2">
              <Skeleton className="mt-0.5 h-6 w-6 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="pl-8 space-y-2">
              <Skeleton className="h-10 w-full rounded-lg" />
              {i % 2 === 0 && <Skeleton className="h-10 w-full rounded-lg" />}
            </div>
          </div>
        ))}
      </div>

      {/* Submit button */}
      <Skeleton className="h-14 w-full rounded-xl" />
    </div>
  )
}
