export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-32 rounded-lg bg-slate-200" />
          <div className="h-4 w-64 rounded bg-slate-200" />
        </div>
        <div className="h-9 w-36 rounded-lg bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left card */}
        <div className="flex flex-col items-center space-y-4 rounded-xl border bg-white p-6">
          <div className="h-24 w-24 rounded-full bg-slate-200" />
          <div className="space-y-2 text-center">
            <div className="mx-auto h-6 w-40 rounded bg-slate-200" />
            <div className="mx-auto h-4 w-32 rounded bg-slate-200" />
            <div className="mx-auto h-4 w-28 rounded bg-slate-200" />
          </div>
          <div className="h-5 w-20 rounded-full bg-slate-200" />
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="w-full space-y-2 border-t border-slate-100 pt-4">
            <div className="h-3 rounded bg-slate-200" />
            <div className="h-3 rounded bg-slate-200" />
            <div className="h-3 w-3/4 rounded bg-slate-200" />
          </div>
        </div>

        {/* Right cards */}
        <div className="space-y-4 lg:col-span-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border bg-white p-6 space-y-4">
              <div className="h-5 w-44 rounded bg-slate-200" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="space-y-1.5">
                    <div className="h-3 w-20 rounded bg-slate-200" />
                    <div className="h-5 rounded bg-slate-200" />
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
