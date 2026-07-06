import { Suspense }        from "react"
import type { Metadata }    from "next"
import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import { authOptions }      from "@/lib/auth"
import { getFullAnalytics } from "@/lib/services/analytics.service"
import { prisma }           from "@/lib/prisma"
import { KPIGrid }                    from "@/components/admin/analytics/kpi-grid"
import { EmploymentStatusChart }      from "@/components/admin/analytics/employment-status-chart"
import { GraduationTrendChart }       from "@/components/admin/analytics/graduation-trend-chart"
import { TopEmployersChart }          from "@/components/admin/analytics/top-employers-chart"
import { ApplicationsStatusChart }    from "@/components/admin/analytics/applications-status-chart"
import { SectorChart }                from "@/components/admin/analytics/sector-chart"
import { SurveyParticipationChart }   from "@/components/admin/analytics/survey-participation-chart"
import { AnalyticsFilters }           from "@/components/admin/analytics/analytics-filters"
import { AnalyticsSkeleton }          from "@/components/admin/analytics/analytics-skeleton"

export const metadata: Metadata = { title: "Analítica | Director · EPIS" }
export const dynamic = "force-dynamic"

interface SearchParams { year?: string; status?: string }

async function getYears() {
  const groups = await prisma.graduate.groupBy({
    by:      ["graduationYear"],
    orderBy: { graduationYear: "desc" },
    _count:  { id: true },
  })
  return groups.map((g) => g.graduationYear).filter(Boolean) as number[]
}

async function AnaliticaContent({ sp }: { sp: SearchParams }) {
  const filters = {
    year:   sp.year ? Number(sp.year) : undefined,
    status: sp.status,
  }

  const [analytics, years] = await Promise.all([
    getFullAnalytics(filters),
    getYears(),
  ])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Suspense>
          <AnalyticsFilters years={years} />
        </Suspense>
      </div>

      <KPIGrid kpis={analytics.kpis} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Estado de empleabilidad</h2>
          <EmploymentStatusChart data={analytics.statusDist} />
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Tendencia de egresados por año</h2>
          <GraduationTrendChart data={analytics.byYear} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Principales empleadores de egresados</h2>
          <TopEmployersChart data={analytics.topEmployers} />
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Postulaciones por estado</h2>
          <ApplicationsStatusChart data={analytics.applicationStats} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Empresas por sector</h2>
          <SectorChart data={analytics.bySector} />
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Participación en encuestas</h2>
          <SurveyParticipationChart data={analytics.surveyParticipation} />
        </div>
      </div>
    </div>
  )
}

export default async function DirectorAnaliticaPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "DIRECTOR") redirect("/login")

  const sp = await searchParams

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Analítica Institucional</h1>
        <p className="mt-1 text-sm text-slate-500">
          Indicadores y tendencias del sistema de seguimiento de egresados · EPIS
        </p>
      </div>

      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnaliticaContent sp={sp} />
      </Suspense>
    </div>
  )
}
