import type { Metadata }    from "next"
import Link                  from "next/link"
import { getServerSession }  from "next-auth"
import { redirect }          from "next/navigation"
import {
  ClipboardList, Briefcase, Users2, CheckCircle2,
  ChevronRight, AlertCircle,
} from "lucide-react"
import { authOptions }           from "@/lib/auth"
import { getGlobalKPIs }         from "@/lib/services/analytics.service"
import { listSurveysForAdmin }   from "@/lib/services/surveys.service"
import { getJobStats, listApplicationsForAdmin } from "@/lib/services/jobs.service"
import { StatCard }              from "@/components/dashboard/stat-card"
import { cn }                    from "@/lib/utils"

export const metadata: Metadata = { title: "Panel del Coordinador | EPIS" }
export const dynamic = "force-dynamic"

const APP_STATUS_LABELS: Record<string, string> = {
  PENDING:   "Pendiente",
  REVIEWED:  "Revisado",
  INTERVIEW: "Entrevista",
  ACCEPTED:  "Aceptado",
  REJECTED:  "Rechazado",
}
const APP_STATUS_COLORS: Record<string, string> = {
  PENDING:   "bg-amber-50 text-amber-700 ring-amber-200",
  REVIEWED:  "bg-blue-50 text-blue-700 ring-blue-200",
  INTERVIEW: "bg-violet-50 text-violet-700 ring-violet-200",
  ACCEPTED:  "bg-emerald-50 text-emerald-700 ring-emerald-200",
  REJECTED:  "bg-red-50 text-red-600 ring-red-200",
}

export default async function CoordinadorDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "PRACTICE_COORDINATOR") redirect("/login")

  const [kpis, jobStats, surveysRaw, appsResult] = await Promise.all([
    getGlobalKPIs(),
    getJobStats(),
    listSurveysForAdmin(),
    listApplicationsForAdmin({ pageSize: 6 }),
  ])

  const activeSurveys = surveysRaw.filter((s) => s.isActive)
  const recentApps    = appsResult.applications
  const pendingCount  = appsResult.applications.filter((a) => a.status === "PENDING").length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Panel del Coordinador de Prácticas
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Gestión de encuestas y bolsa laboral · E.P. Ingeniería de Sistemas — UNA Puno
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Encuestas Activas"
          value={kpis.activeSurveys.toLocaleString("es-PE")}
          description={`${surveysRaw.length} encuestas en total`}
          icon={ClipboardList}
          variant="blue"
        />
        <StatCard
          title="Respuestas Recibidas"
          value={kpis.totalSurveyResponses.toLocaleString("es-PE")}
          description="Respuestas acumuladas"
          icon={CheckCircle2}
          variant="green"
        />
        <StatCard
          title="Ofertas Activas"
          value={jobStats.activeJobs.toLocaleString("es-PE")}
          description={`${jobStats.totalJobs} ofertas registradas`}
          icon={Briefcase}
          variant="amber"
        />
        <StatCard
          title="Postulaciones"
          value={jobStats.totalApplications.toLocaleString("es-PE")}
          description={`${pendingCount} pendientes de revisión`}
          icon={Users2}
          variant="violet"
        />
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Active surveys */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Encuestas Activas</h2>
            <Link
              href="/coordinador/encuestas"
              className="flex items-center gap-1 text-xs text-una-secondary hover:underline"
            >
              Ver todas <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {activeSurveys.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">{s.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {s._count.responses} respuestas · {s._count.questions} preguntas
                    {s.school && <span className="ml-1">· {s.school.name}</span>}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  Activa
                </span>
              </div>
            ))}
            {activeSurveys.length === 0 && (
              <p className="py-4 text-center text-sm text-slate-400">No hay encuestas activas.</p>
            )}
          </div>
        </div>

        {/* Recent applications */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Postulaciones Recientes</h2>
            <Link
              href="/coordinador/practicas"
              className="flex items-center gap-1 text-xs text-una-secondary hover:underline"
            >
              Ver todas <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentApps.map((app) => (
              <div
                key={app.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {app.graduate.firstName} {app.graduate.lastName}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {app.job.title} · {app.job.company.name}
                  </p>
                </div>
                <span className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                  APP_STATUS_COLORS[app.status] ?? "bg-slate-100 text-slate-500 ring-slate-200"
                )}>
                  {APP_STATUS_LABELS[app.status] ?? app.status}
                </span>
              </div>
            ))}
            {recentApps.length === 0 && (
              <p className="py-4 text-center text-sm text-slate-400">Sin postulaciones recientes.</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick access */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">Gestión Rápida</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/coordinador/encuestas"
            className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:border-una-secondary hover:bg-blue-50/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <ClipboardList className="h-5 w-5 text-una-secondary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Encuestas</p>
              <p className="text-xs text-slate-400">Administrar y revisar resultados</p>
            </div>
          </Link>

          <Link
            href="/coordinador/practicas"
            className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:border-una-secondary hover:bg-blue-50/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
              <Briefcase className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Prácticas y Bolsa Laboral</p>
              <p className="text-xs text-slate-400">Ofertas activas y postulaciones</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Info footer */}
      <div className="flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50/60 px-4 py-3 text-sm text-amber-700">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <p>
          Como Coordinador de Prácticas puedes gestionar encuestas y revisar postulaciones.
          Para modificar el directorio de egresados o la configuración del sistema, contacta al Administrador.
        </p>
      </div>
    </div>
  )
}
