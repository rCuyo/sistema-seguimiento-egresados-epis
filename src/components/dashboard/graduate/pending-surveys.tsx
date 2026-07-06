import Link from "next/link"
import { ClipboardList, CheckCircle2, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GraduateDashboardData } from "@/lib/services/dashboard.service"

function formatDate(date: Date): string {
  return date.toLocaleDateString("es-PE", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  })
}

interface PendingSurveysProps {
  surveys: GraduateDashboardData["pendingSurveys"]
}

export function PendingSurveys({ surveys }: PendingSurveysProps) {
  if (surveys.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5 shadow-sm dark:border-emerald-800/50 dark:bg-emerald-900/20">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-800/50">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">¡Estás al día!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">No tienes encuestas pendientes.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-700">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/30">
          <ClipboardList className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Encuestas pendientes</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {surveys.length} {surveys.length === 1 ? "encuesta sin responder" : "encuestas sin responder"}
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {surveys.slice(0, 3).map((survey) => (
          <div key={survey.id} className="px-5 py-3.5">
            <p className="text-sm font-medium leading-snug text-slate-800 dark:text-slate-200">{survey.title}</p>
            {survey.endsAt && (
              <p className={cn(
                "mt-1 flex items-center gap-1 text-[11px] font-medium",
                new Date(survey.endsAt) < new Date(Date.now() + 7 * 86400000)
                  ? "text-red-500 dark:text-red-400"
                  : "text-slate-400 dark:text-slate-500"
              )}>
                <Clock className="h-3 w-3" />
                Vence: {formatDate(survey.endsAt)}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-700">
        <Link
          href="/egresado/encuestas"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
        >
          Responder encuestas
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
