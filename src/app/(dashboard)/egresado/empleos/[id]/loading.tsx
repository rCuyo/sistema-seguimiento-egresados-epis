function Sk({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-100 ${className ?? ""}`} />
}

export default function Loading() {
  return (
    <div className="space-y-6">
      <Sk className="h-4 w-32" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
            <Sk className="h-4 w-32" />
            <Sk className="h-8 w-3/4" />
            <div className="flex gap-2">
              <Sk className="h-6 w-24 rounded-full" />
              <Sk className="h-6 w-20 rounded-full" />
            </div>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-2">
            <Sk className="h-5 w-40" />
            <Sk className="h-4 w-full" />
            <Sk className="h-4 w-full" />
            <Sk className="h-4 w-3/4" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
            <Sk className="h-5 w-32" />
            <Sk className="h-32 w-full rounded-lg" />
            <Sk className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
