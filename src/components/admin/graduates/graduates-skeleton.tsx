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

function RowSkeleton() {
  return (
    <tr>
      <td className="py-3.5 pl-5 pr-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </td>
      <td className="px-3 py-3.5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-1 h-3 w-20" />
      </td>
      <td className="px-3 py-3.5"><Skeleton className="h-5 w-12 rounded-full" /></td>
      <td className="px-3 py-3.5"><Skeleton className="h-5 w-20 rounded-full" /></td>
      <td className="px-3 py-3.5"><Skeleton className="h-4 w-28" /></td>
      <td className="px-3 py-3.5"><Skeleton className="h-3 w-20" /></td>
      <td className="py-3.5 pl-3 pr-5 text-right"><Skeleton className="ml-auto h-7 w-12 rounded-lg" /></td>
    </tr>
  )
}

export function GraduatesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-9 flex-1 min-w-[220px] rounded-lg" />
          <Skeleton className="h-9 w-40 rounded-lg" />
          <Skeleton className="h-9 w-40 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-slate-50/60 px-5 py-3">
          <Skeleton className="h-4 w-24" />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              {["Egresado","Escuela / Facultad","Año","Estado","Cargo / Empresa","Registro","Acción"].map((h) => (
                <th key={h} className="py-3 px-3 first:pl-5 last:pr-5">
                  <Skeleton className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {Array.from({ length: 8 }).map((_, i) => <RowSkeleton key={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
