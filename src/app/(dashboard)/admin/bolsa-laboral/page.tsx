import type { Metadata }   from "next"
import Link                 from "next/link"
import { redirect }         from "next/navigation"
import { Plus, Briefcase, CheckCircle2, Users, Building2, Eye, MousePointerClick, TrendingUp } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import { listJobsForAdmin, getJobStats, getCompaniesForSelect, getJobInteractionStats } from "@/lib/services/jobs.service"
import { StatCard }         from "@/components/dashboard/stat-card"
import { JobsList }         from "@/components/admin/jobs/jobs-list"

export const metadata: Metadata = { title: "Bolsa Laboral" }
export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminBolsaLaboralPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role)) redirect("/login")

  const sp = await searchParams
  function str(k: string) { const v = sp[k]; return Array.isArray(v) ? v[0] : v }

  const page      = Math.max(1, parseInt(str("page") ?? "1"))
  const search    = str("search")
  const companyId = str("companyId")

  const [listResult, stats, interaction] = await Promise.all([
    listJobsForAdmin({ search, companyId, page }),
    getJobStats(),
    getJobInteractionStats(),
  ])

  const isAdmin = session.user.role === "ADMIN"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bolsa Laboral</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gestiona las oportunidades laborales y de prácticas TI para egresados de Ingeniería de Sistemas.
          </p>
        </div>
        {isAdmin && (
          <Link
            href="/admin/bolsa-laboral/nueva"
            className="inline-flex items-center gap-2 rounded-lg bg-una-secondary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Nueva oferta
          </Link>
        )}
      </div>

      {/* Publicaciones */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total ofertas"      value={stats.totalJobs}          icon={Briefcase}    variant="blue"   description="Registradas en el sistema" />
        <StatCard title="Ofertas activas"    value={stats.activeJobs}         icon={CheckCircle2} variant="green"  description="Publicadas y vigentes" />
        <StatCard title="Postulaciones"      value={stats.totalApplications}   icon={Users}        variant="violet" description="De todos los egresados" />
        <StatCard title="Empresas"           value={stats.companiesCount}      icon={Building2}    variant="amber"  description="Registradas en el sistema" />
      </div>

      {/* Interacción */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">Interacción con ofertas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Visualizaciones totales</p>
              <p className="text-xl font-bold text-slate-900">{interaction.totalViews.toLocaleString("es-PE")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">
              <MousePointerClick className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Clics en enlace externo</p>
              <p className="text-xl font-bold text-slate-900">{interaction.totalClicks.toLocaleString("es-PE")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Tasa de interacción</p>
              <p className="text-xl font-bold text-slate-900">{interaction.interactionRate}%</p>
              <p className="text-xs text-slate-400">clics / visualizaciones</p>
            </div>
          </div>
        </div>

        {interaction.topByViews.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 text-xs font-medium text-slate-500">Ofertas más vistas</p>
            <div className="space-y-2">
              {interaction.topByViews.map((j) => (
                <div key={j.id} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-slate-700">{j.title}</span>
                  <span className="shrink-0 font-semibold text-slate-900">{j.viewCount} vistas</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {interaction.topByClicks.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 text-xs font-medium text-slate-500">Ofertas con más clics en enlace externo</p>
            <div className="space-y-2">
              {interaction.topByClicks.map((j) => (
                <div key={j.jobId} className="flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-slate-700">{j.title}</span>
                  <span className="shrink-0 font-semibold text-sky-700">{j.clicks} clic{j.clicks !== 1 ? "s" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <JobsList jobs={listResult.jobs} />

      {listResult.totalPages > 1 && (
        <div className="flex items-center justify-between rounded-xl border bg-white px-5 py-3 shadow-sm">
          <p className="text-xs text-slate-500">
            Página <span className="font-semibold">{listResult.page}</span> de <span className="font-semibold">{listResult.totalPages}</span>
            {" "}· {listResult.total} oferta{listResult.total !== 1 ? "s" : ""}
          </p>
          <div className="flex gap-2">
            {listResult.page > 1 && (
              <Link
                href={`?page=${listResult.page - 1}`}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-slate-300"
              >
                ← Anterior
              </Link>
            )}
            {listResult.page < listResult.totalPages && (
              <Link
                href={`?page=${listResult.page + 1}`}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-slate-300"
              >
                Siguiente →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
