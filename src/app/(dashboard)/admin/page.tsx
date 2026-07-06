import type { Metadata } from "next"
import {
  Users,
  ClipboardList,
  TrendingUp,
  Briefcase,
  Building2,
  FileCheck,
} from "lucide-react"
import { StatCard }      from "@/components/dashboard/stat-card"
import { getGlobalKPIs } from "@/lib/services/analytics.service"
import { prisma }        from "@/lib/prisma"

export const metadata: Metadata = { title: "Dashboard" }
export const dynamic = "force-dynamic"

function relativeTime(date: Date): string {
  const diffMin = Math.floor((Date.now() - date.getTime()) / 60_000)
  if (diffMin < 1)  return "hace un momento"
  if (diffMin < 60) return `hace ${diffMin} min`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24)   return `hace ${diffH} hora${diffH > 1 ? "s" : ""}`
  const diffD = Math.floor(diffH / 24)
  return `hace ${diffD} día${diffD > 1 ? "s" : ""}`
}

export default async function AdminDashboardPage() {
  const kpis = await getGlobalKPIs()

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const [recentApplications, recentSurveyResponses, recentJobs] = await Promise.all([
    prisma.jobApplication.findMany({
      where:   { appliedAt: { gte: oneWeekAgo } },
      orderBy: { appliedAt: "desc" },
      take:    3,
      select: {
        appliedAt: true,
        graduate:  { select: { firstName: true, lastName: true } },
        job:       { select: { title: true, company: { select: { name: true } } } },
      },
    }),
    prisma.surveyResponse.findMany({
      where:   { completedAt: { gte: oneWeekAgo } },
      orderBy: { completedAt: "desc" },
      take:    3,
      select: {
        completedAt: true,
        graduate:    { select: { firstName: true, lastName: true } },
        survey:      { select: { title: true } },
      },
    }),
    prisma.jobOffer.findMany({
      where:   { createdAt: { gte: oneWeekAgo } },
      orderBy: { createdAt: "desc" },
      take:    2,
      select: {
        createdAt: true,
        title:     true,
        company:   { select: { name: true } },
      },
    }),
  ])

  const activity = [
    ...recentApplications.map((a) => ({
      text: `${a.graduate.firstName} ${a.graduate.lastName} postuló a ${a.job.title} — ${a.job.company.name}`,
      date: a.appliedAt,
    })),
    ...recentSurveyResponses.map((r) => ({
      text: `${r.graduate.firstName} ${r.graduate.lastName} respondió "${r.survey.title}"`,
      date: r.completedAt,
    })),
    ...recentJobs.map((j) => ({
      text: `Nueva oferta "${j.title}" publicada por ${j.company.name}`,
      date: j.createdAt,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)

  const stats = [
    {
      title:       "Total Egresados",
      value:       kpis.totalGraduates.toLocaleString("es-PE"),
      description: "Registrados en el sistema",
      icon:        Users,
      variant:     "blue" as const,
      trend:       kpis.newThisMonth > 0
        ? { value: kpis.newThisMonth, label: "nuevos este mes" }
        : undefined,
    },
    {
      title:       "Encuestas Respondidas",
      value:       kpis.totalSurveyResponses.toLocaleString("es-PE"),
      description: "Total de respuestas registradas",
      icon:        ClipboardList,
      variant:     "green" as const,
    },
    {
      title:       "Tasa de Empleabilidad",
      value:       `${kpis.employmentRate}%`,
      description: "Egresados empleados o independientes",
      icon:        TrendingUp,
      variant:     "amber" as const,
    },
    {
      title:       "Ofertas Laborales",
      value:       kpis.activeJobs.toLocaleString("es-PE"),
      description: "Activas en la bolsa de trabajo",
      icon:        Briefcase,
      variant:     "violet" as const,
    },
    {
      title:       "Empresas Afiliadas",
      value:       kpis.totalCompanies.toLocaleString("es-PE"),
      description: "Empresas registradas",
      icon:        Building2,
      variant:     "blue" as const,
    },
    {
      title:       "Encuestas Activas",
      value:       kpis.activeSurveys.toLocaleString("es-PE"),
      description: "Disponibles para responder",
      icon:        FileCheck,
      variant:     "green" as const,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Panel de Administración</h1>
        <p className="mt-1 text-sm text-slate-500">
          Resumen general — Escuela Profesional de Ingeniería de Sistemas · UNA Puno
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Gráficos — ver análisis completo en Reportes */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Empleabilidad por Área TI</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex h-56 items-center justify-center rounded-lg bg-slate-50">
            <p className="text-sm text-slate-400">Ver análisis completo en Reportes</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Distribución por Estado Laboral</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex h-56 items-center justify-center rounded-lg bg-slate-50">
            <p className="text-sm text-slate-400">Ver análisis completo en Reportes</p>
          </div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-slate-900">Actividad Reciente</h2>
        {activity.length === 0 ? (
          <p className="text-sm text-slate-400">
            No hay actividad registrada en los últimos 7 días.
          </p>
        ) : (
          <div className="space-y-3">
            {activity.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-una-secondary" />
                  <p className="text-sm text-slate-600">{item.text}</p>
                </div>
                <span className="ml-4 shrink-0 text-xs text-slate-400">
                  {relativeTime(item.date)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
