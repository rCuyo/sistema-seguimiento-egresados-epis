export function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-l-4 border-l-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2 min-w-0 flex-1">
                <div className="h-3 w-24 rounded bg-slate-100" />
                <div className="h-7 w-16 rounded bg-slate-200" />
              </div>
              <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[300, 260].map((h, i) => (
          <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 h-5 w-40 rounded bg-slate-100" />
            <div className={`rounded bg-slate-50`} style={{ height: h }} />
          </div>
        ))}
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[260, 260].map((h, i) => (
          <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 h-5 w-36 rounded bg-slate-100" />
            <div className="rounded bg-slate-50" style={{ height: h }} />
          </div>
        ))}
      </div>

      {/* Charts row 3 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[260, 260].map((h, i) => (
          <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 h-5 w-44 rounded bg-slate-100" />
            <div className="rounded bg-slate-50" style={{ height: h }} />
          </div>
        ))}
      </div>
    </div>
  )
}
