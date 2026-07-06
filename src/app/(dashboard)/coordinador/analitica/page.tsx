import type { Metadata }    from "next"
import { redirect }          from "next/navigation"
import { getServerSession }  from "next-auth"
import { authOptions }       from "@/lib/auth"
import {
  getGlobalKPIs,
  getEmploymentStatusDist,
  getSurveyParticipation,
  getApplicationStatusDist,
} from "@/lib/services/analytics.service"
import { getJobInteractionStats } from "@/lib/services/jobs.service"
import { EmploymentStatusChart }    from "@/components/admin/analytics/employment-status-chart"
import { SurveyParticipationChart } from "@/components/admin/analytics/survey-participation-chart"
import { ApplicationsStatusChart }  from "@/components/admin/analytics/applications-status-chart"
import {
  Users,
  Briefcase,
  TrendingUp,
  UserX,
  ClipboardCheck,
  Eye,
  MousePointerClick,
} from "lucide-react"

export const metadata: Metadata = { title: "Analítica | Coordinador · EPIS" }
export const dynamic = "force-dynamic"

function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: {
  title:    string
  value:    string | number
  subtitle: string
  icon:     React.ElementType
  color:    string
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  )
}

export default async function CoordinadorAnaliticaPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "PRACTICE_COORDINATOR") redirect("/login")

  const [kpis, statusDist, surveyPart, appStats, interaction] = await Promise.all([
    getGlobalKPIs(),
    getEmploymentStatusDist(),
    getSurveyParticipation(),
    getApplicationStatusDist(),
    getJobInteractionStats(),
  ])

  const sinEmpleo = kpis.seeking + kpis.unemployed

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Analítica de Empleabilidad</h1>
        <p className="mt-1 text-sm text-slate-500">
          Indicadores de inserción laboral y seguimiento de egresados · EPIS
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="Total egresados"
          value={kpis.totalGraduates}
          subtitle="registrados en el sistema"
          icon={Users}
          color="bg-una-primary"
        />
        <KPICard
          title="Tasa de empleabilidad"
          value={`${kpis.employmentRate}%`}
          subtitle={`${kpis.employed + kpis.selfEmployed} con empleo activo`}
          icon={TrendingUp}
          color="bg-emerald-500"
        />
        <KPICard
          title="Egresados sin empleo"
          value={sinEmpleo}
          subtitle={`${kpis.seeking} buscando · ${kpis.unemployed} desempleados`}
          icon={UserX}
          color="bg-amber-500"
        />
        <KPICard
          title="Respuestas de encuestas"
          value={kpis.totalSurveyResponses}
          subtitle={`${kpis.activeSurveys} encuesta${kpis.activeSurveys !== 1 ? "s" : ""} activa${kpis.activeSurveys !== 1 ? "s" : ""}`}
          icon={ClipboardCheck}
          color="bg-una-secondary"
        />
      </div>

      {/* Employment overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-slate-700">Distribución por situación laboral</h2>
          <p className="mb-4 text-xs text-slate-400">Estado de empleabilidad de todos los egresados registrados</p>
          <EmploymentStatusChart data={statusDist} />
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-slate-700">Participación en encuestas</h2>
          <p className="mb-4 text-xs text-slate-400">Respuestas recibidas por encuesta institucional</p>
          <SurveyParticipationChart data={surveyPart} />
        </div>
      </div>

      {/* Applications + detail breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-slate-700">Postulaciones por estado</h2>
          <p className="mb-4 text-xs text-slate-400">Resumen del estado de postulaciones en la bolsa laboral</p>
          <ApplicationsStatusChart data={appStats} />
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-slate-700">Desglose de empleabilidad</h2>
          <p className="mb-4 text-xs text-slate-400">Indicadores detallados de inserción laboral</p>
          <div className="space-y-3">
            {[
              {
                label: "Con empleo (dependiente)",
                count: kpis.employed,
                total: kpis.totalGraduates,
                color: "bg-emerald-500",
              },
              {
                label: "Trabajo independiente",
                count: kpis.selfEmployed,
                total: kpis.totalGraduates,
                color: "bg-teal-500",
              },
              {
                label: "Buscando empleo",
                count: kpis.seeking,
                total: kpis.totalGraduates,
                color: "bg-amber-400",
              },
              {
                label: "Desempleado",
                count: kpis.unemployed,
                total: kpis.totalGraduates,
                color: "bg-red-400",
              },
            ].map(({ label, count, total, color }) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0
              return (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-slate-600">{label}</span>
                    <span className="font-semibold text-slate-800">
                      {count} <span className="font-normal text-slate-400">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-2 rounded-full ${color} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Jobs KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Ofertas laborales activas</p>
              <p className="text-xl font-bold text-slate-900">{kpis.activeJobs}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
              <ClipboardCheck className="h-4 w-4 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Total postulaciones</p>
              <p className="text-xl font-bold text-slate-900">{kpis.totalApplications}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <Users className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Nuevos este mes</p>
              <p className="text-xl font-bold text-slate-900">{kpis.newThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interacción con ofertas */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold text-slate-700">Interacción con ofertas</h2>
        <p className="mb-4 text-xs text-slate-400">Visualizaciones y clics en enlaces de postulación externa</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <Eye className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Visualizaciones totales</p>
              <p className="text-xl font-bold text-slate-900">{interaction.totalViews.toLocaleString("es-PE")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50">
              <MousePointerClick className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Clics en enlace externo</p>
              <p className="text-xl font-bold text-slate-900">{interaction.totalClicks.toLocaleString("es-PE")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Tasa de interacción</p>
              <p className="text-xl font-bold text-slate-900">{interaction.interactionRate}%</p>
            </div>
          </div>
        </div>

        {interaction.topByViews.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium text-slate-500">Top 5 más vistas</p>
            <div className="space-y-1.5">
              {interaction.topByViews.map((j) => (
                <div key={j.id} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-slate-600">{j.title}</span>
                  <span className="shrink-0 font-semibold text-slate-800">{j.viewCount} vistas</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
