import type { Metadata }     from "next"
import Link                    from "next/link"
import { getServerSession }    from "next-auth"
import { redirect }            from "next/navigation"
import {
  Users, TrendingUp, ClipboardList, Briefcase,
  BarChart3, FileText, CheckCircle2, AlertCircle,
} from "lucide-react"
import { authOptions }              from "@/lib/auth"
import { getGlobalKPIs, getEmploymentStatusDist } from "@/lib/services/analytics.service"
import { listSurveysForAdmin }      from "@/lib/services/surveys.service"
import { StatCard }                 from "@/components/dashboard/stat-card"
import { cn }                       from "@/lib/utils"

export const metadata: Metadata = { title: "Panel del Director | EPIS" }
export const dynamic = "force-dynamic"

const STATUS_LABELS: Record<string, string> = {
  EMPLOYED:      "Empleado",
  SELF_EMPLOYED: "Independiente",
  UNEMPLOYED:    "Desempleado",
  SEEKING:       "Buscando empleo",
  STUDYING:      "Estudiando",
}
const STATUS_COLORS: Record<string, string> = {
  EMPLOYED:      "bg-emerald-500",
  SELF_EMPLOYED: "bg-blue-500",
  UNEMPLOYED:    "bg-red-400",
  SEEKING:       "bg-amber-400",
  STUDYING:      "bg-violet-400",
}

function formatDate(date: Date | string | null | undefined) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })
}

export default async function DirectorDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "DIRECTOR") redirect("/login")

  const [kpis, statusDist, surveys] = await Promise.all([
    getGlobalKPIs(),
    getEmploymentStatusDist(),
    listSurveysForAdmin(),
  ])

  const recentSurveys = surveys.slice(0, 5)
  const totalSurveys  = surveys.length
  const activeSurveys = surveys.filter((s) => s.isActive).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Panel del Director de Escuela Profesional
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Seguimiento institucional de egresados · E.P. Ingeniería de Sistemas — UNA Puno
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total de Egresados"
          value={kpis.totalGraduates.toLocaleString("es-PE")}
          description="Registrados en la plataforma"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Tasa de Empleabilidad"
          value={`${kpis.employmentRate}%`}
          description={`${kpis.employed + kpis.selfEmployed} con empleo activo`}
          icon={TrendingUp}
          variant="green"
        />
        <StatCard
          title="Encuestas Activas"
          value={kpis.activeSurveys.toLocaleString("es-PE")}
          description={`${kpis.totalSurveyResponses} respuestas acumuladas`}
          icon={ClipboardList}
          variant="amber"
        />
        <StatCard
          title="Ofertas Laborales"
          value={kpis.activeJobs.toLocaleString("es-PE")}
          description={`${kpis.totalApplications} postulaciones registradas`}
          icon={Briefcase}
          variant="violet"
        />
      </div>

      {/* Two-column */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Employment distribution */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-sm font-semibold text-slate-700">
            Distribución de Estado Laboral
          </h2>
          <div className="space-y-3">
            {statusDist.map((item) => {
              const pct = kpis.totalGraduates > 0
                ? Math.round((item.count / kpis.totalGraduates) * 100)
                : 0
              return (
                <div key={item.status}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-600">{STATUS_LABELS[item.status] ?? item.status}</span>
                    <span className="font-semibold text-slate-900">
                      {item.count.toLocaleString("es-PE")}
                      <span className="ml-1.5 text-xs font-normal text-slate-400">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn("h-2 rounded-full transition-all", STATUS_COLORS[item.status] ?? "bg-slate-400")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
            {statusDist.length === 0 && (
              <p className="text-sm text-slate-400">Sin datos registrados.</p>
            )}
          </div>
        </div>

        {/* Recent surveys */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Encuestas Institucionales</h2>
            <span className="text-xs text-slate-400">{totalSurveys} total · {activeSurveys} activas</span>
          </div>
          <div className="space-y-3">
            {recentSurveys.map((survey) => (
              <div
                key={survey.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">{survey.title}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {survey._count.responses} respuestas · {survey._count.questions} preguntas
                  </p>
                </div>
                <span className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                  survey.isActive
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-slate-100 text-slate-500 ring-slate-200"
                )}>
                  {survey.isActive ? "Activa" : "Inactiva"}
                </span>
              </div>
            ))}
            {recentSurveys.length === 0 && (
              <p className="text-sm text-slate-400">Sin encuestas registradas.</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick access */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">Acceso Rápido</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            href="/director/analitica"
            className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:border-una-secondary hover:bg-blue-50/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <BarChart3 className="h-5 w-5 text-una-secondary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Analítica</p>
              <p className="text-xs text-slate-400">Indicadores estadísticos</p>
            </div>
          </Link>

          <Link
            href="/director/reportes"
            className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:border-una-secondary hover:bg-blue-50/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50">
              <FileText className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Reportes</p>
              <p className="text-xs text-slate-400">Exportar información</p>
            </div>
          </Link>

          <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
              <Users className="h-5 w-5 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Egresados</p>
              <p className="text-xs text-slate-400">Disponible en Fase 2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info footer */}
      <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-blue-700">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
        <p>
          Este panel corresponde al rol de Director de Escuela Profesional.
          Las funcionalidades de edición directa están reservadas al Administrador del sistema.
        </p>
      </div>
    </div>
  )
}
