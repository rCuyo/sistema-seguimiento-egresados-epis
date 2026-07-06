import type { Metadata }   from "next"
import { redirect }         from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import { listJobsPublic, getGraduateApplications, getCompaniesForSelect } from "@/lib/services/jobs.service"
import { JobCard }          from "@/components/jobs/job-card"
import { JobFilters }       from "@/components/jobs/job-filters"
import { APP_STATUS_LABELS } from "@/lib/validations/job"
import { Briefcase, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = { title: "Empleos" }
export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EgresadoEmpleosPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "GRADUATE") redirect("/login")
  if (!session.user.graduateId) redirect("/egresado")

  const graduateId = session.user.graduateId
  const sp = await searchParams
  function str(k: string) { const v = sp[k]; return Array.isArray(v) ? v[0] : v }

  const page      = Math.max(1, parseInt(str("page") ?? "1"))
  const search    = str("search")
  const type      = str("type")
  const companyId = str("companyId")
  const remoteStr = str("isRemote")
  const isRemote  = remoteStr === "true" ? true : remoteStr === "false" ? false : undefined

  const [result, applications, companies] = await Promise.all([
    listJobsPublic({ search, type, isRemote, companyId, page }),
    getGraduateApplications(graduateId),
    getCompaniesForSelect(),
  ])

  const appliedJobIds = new Set(applications.map((a) => a.jobId))
  const appByJobId    = Object.fromEntries(applications.map((a) => [a.jobId, a]))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Empleos</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Encuentra tu próxima oportunidad laboral.</p>
      </div>

      {/* My applications summary */}
      {applications.length > 0 && (
        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <Briefcase className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              Mis postulaciones ({applications.length})
            </h2>
          </div>
          <div className="space-y-2">
            {applications.slice(0, 5).map((app) => (
              <Link
                key={app.id}
                href={`/egresado/empleos/${app.job.id}`}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5 transition-colors hover:border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{app.job.title}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{app.job.company.name}</p>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                  app.status === "ACCEPTED"  ? "bg-emerald-50 text-emerald-700 ring-emerald-200" :
                  app.status === "REJECTED"  ? "bg-red-50 text-red-700 ring-red-200"             :
                  app.status === "INTERVIEW" ? "bg-violet-50 text-violet-700 ring-violet-200"    :
                  app.status === "REVIEWED"  ? "bg-blue-50 text-blue-700 ring-blue-200"          :
                                               "bg-amber-50 text-amber-700 ring-amber-200"
                }`}>
                  {APP_STATUS_LABELS[app.status] ?? app.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Job listing */}
      <JobFilters companies={companies} />

      {result.jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-20 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <CheckCircle2 className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No hay ofertas disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {result.jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              href={`/egresado/empleos/${job.id}`}
              applied={appliedJobIds.has(job.id)}
              applicationStatus={appByJobId[job.id]?.status ? APP_STATUS_LABELS[appByJobId[job.id].status] : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
