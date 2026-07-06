import type { Metadata }    from "next"
import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import { Briefcase, Users2, MapPin, Building2 } from "lucide-react"
import { authOptions }           from "@/lib/auth"
import { listJobsForAdmin, listApplicationsForAdmin } from "@/lib/services/jobs.service"
import { cn }                    from "@/lib/utils"

export const metadata: Metadata = { title: "Prácticas y Bolsa Laboral | Coordinador · EPIS" }
export const dynamic = "force-dynamic"

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME:               "Tiempo completo",
  PART_TIME:               "Medio tiempo",
  CONTRACT:                "Contrato",
  INTERNSHIP:              "Práctica preprofesional",
  PROFESSIONAL_INTERNSHIP: "Práctica profesional",
}

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

function formatDate(date: Date | string | null | undefined) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })
}

export default async function CoordinadorPracticasPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "PRACTICE_COORDINATOR") redirect("/login")

  const [jobsResult, appsResult] = await Promise.all([
    listJobsForAdmin({ isActive: true, pageSize: 20 }),
    listApplicationsForAdmin({ pageSize: 20 }),
  ])

  const jobs = jobsResult.jobs
  const apps = appsResult.applications

  const internships = jobs.filter((j) => j.type === "INTERNSHIP" || j.type === "PROFESSIONAL_INTERNSHIP")
  const otherJobs   = jobs.filter((j) => j.type !== "INTERNSHIP" && j.type !== "PROFESSIONAL_INTERNSHIP")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Prácticas y Bolsa Laboral</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ofertas activas y postulaciones de egresados
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-slate-900">{jobsResult.total}</p>
          <p className="mt-0.5 text-xs text-slate-500">Ofertas activas</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-amber-600">{internships.length}</p>
          <p className="mt-0.5 text-xs text-slate-500">Prácticas</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-una-secondary">{appsResult.total}</p>
          <p className="mt-0.5 text-xs text-slate-500">Postulaciones</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-amber-500">
            {apps.filter((a) => a.status === "PENDING").length}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">Pendientes</p>
        </div>
      </div>

      {/* Internships section */}
      {internships.length > 0 && (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="border-b bg-amber-50/50 px-5 py-3.5 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-amber-600" />
            <h2 className="text-sm font-semibold text-slate-700">Prácticas Profesionales ({internships.length})</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {internships.map((job) => (
              <div key={job.id} className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{job.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      {job.company.name}
                    </span>
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {job.location}
                        {job.isRemote && " (Remoto)"}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users2 className="h-3.5 w-3.5 text-slate-400" />
                      {job._count.applications} postulaciones
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
                    Prácticas
                  </span>
                  {job.salary && (
                    <p className="mt-1 text-xs text-slate-500">{job.salary}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other active jobs */}
      {otherJobs.length > 0 && (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="border-b bg-blue-50/50 px-5 py-3.5 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-una-secondary" />
            <h2 className="text-sm font-semibold text-slate-700">Otras Ofertas Activas ({otherJobs.length})</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {otherJobs.map((job) => (
              <div key={job.id} className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{job.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      {job.company.name}
                    </span>
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {job.location}
                        {job.isRemote && " (Remoto)"}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users2 className="h-3.5 w-3.5 text-slate-400" />
                      {job._count.applications} postulaciones
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
                    {JOB_TYPE_LABELS[job.type] ?? job.type}
                  </span>
                  {job.salary && (
                    <p className="mt-1 text-xs text-slate-500">{job.salary}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-16 shadow-sm">
          <Briefcase className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm font-medium text-slate-500">Sin ofertas activas</p>
        </div>
      )}

      {/* Recent applications */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="border-b bg-slate-50/70 px-5 py-3.5 flex items-center gap-2">
          <Users2 className="h-4 w-4 text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-700">
            Postulaciones Recientes ({appsResult.total})
          </h2>
        </div>
        {apps.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-400">Sin postulaciones registradas.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Egresado</th>
                <th className="px-4 py-3">Oferta</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-900">
                      {app.graduate.firstName} {app.graduate.lastName}
                    </p>
                    <p className="text-xs text-slate-400">{app.graduate.school.name}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-700 max-w-[200px]">
                    <p className="truncate">{app.job.title}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {app.job.company.name}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                    {formatDate(app.appliedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                      APP_STATUS_COLORS[app.status] ?? "bg-slate-100 text-slate-500 ring-slate-200"
                    )}>
                      {APP_STATUS_LABELS[app.status] ?? app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
