import { Briefcase, ClipboardList, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GraduateDashboardData } from "@/lib/services/dashboard.service"

const APP_STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  PENDING:   { label: "Enviada",    className: "bg-slate-100  text-slate-600  dark:bg-slate-800 dark:text-slate-300"  },
  REVIEWED:  { label: "Revisada",   className: "bg-blue-50    text-blue-700   dark:bg-blue-900/40 dark:text-blue-300"   },
  INTERVIEW: { label: "Entrevista", className: "bg-purple-50  text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
  ACCEPTED:  { label: "Aceptada",   className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  REJECTED:  { label: "Rechazada",  className: "bg-red-50     text-red-600    dark:bg-red-900/40 dark:text-red-300"    },
  COMPLETED: { label: "Completada", className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
}

function formatRelativeDate(date: Date): string {
  const now  = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 86400000)
  if (diff === 0) return "Hoy"
  if (diff === 1) return "Ayer"
  if (diff < 7)  return `Hace ${diff} días`
  if (diff < 30) return `Hace ${Math.floor(diff / 7)} sem.`
  return date.toLocaleDateString("es-PE", { day: "numeric", month: "short" })
}

interface RecentActivityProps {
  activity: GraduateDashboardData["activity"]
}

export function RecentActivity({ activity }: RecentActivityProps) {
  if (activity.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Actividad reciente</h2>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Activity className="h-6 w-6 text-slate-400 dark:text-slate-500" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">Sin actividad reciente</p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Aquí aparecerán tus postulaciones y encuestas respondidas.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-700">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">Actividad reciente</h2>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {activity.map((item, idx) => {
          const isApp    = item.type === "application"
          const statusCf = APP_STATUS_CONFIG[item.status] ?? APP_STATUS_CONFIG["PENDING"]

          return (
            <div key={idx} className="flex items-start gap-4 px-6 py-4">
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  isApp ? "bg-blue-50 dark:bg-blue-900/30" : "bg-emerald-50 dark:bg-emerald-900/30"
                )}
              >
                {isApp
                  ? <Briefcase    className="h-4 w-4 text-blue-600 dark:text-blue-400"    />
                  : <ClipboardList className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                }
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-slate-900 dark:text-slate-100">
                  {isApp ? "Postulaste a" : "Respondiste"}{" "}
                  <span className="font-semibold">&quot;{item.title}&quot;</span>
                </p>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  {item.subtitle} · {formatRelativeDate(item.date)}
                </p>
              </div>

              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                  statusCf.className
                )}
              >
                {statusCf.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
