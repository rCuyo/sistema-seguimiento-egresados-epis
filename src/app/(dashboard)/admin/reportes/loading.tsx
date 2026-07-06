import { AnalyticsSkeleton } from "@/components/admin/analytics/analytics-skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <div className="h-7 w-56 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-80 rounded bg-slate-100 animate-pulse" />
      </div>
      <AnalyticsSkeleton />
    </div>
  )
}
