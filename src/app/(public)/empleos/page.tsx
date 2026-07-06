import type { Metadata }   from "next"
import { GraduationCap }   from "lucide-react"
import { listJobsPublic, getCompaniesForSelect } from "@/lib/services/jobs.service"
import { JobCard }          from "@/components/jobs/job-card"
import { JobFilters }       from "@/components/jobs/job-filters"

export const metadata: Metadata = { title: "Bolsa de Empleo TI — Ing. Sistemas · UNA Puno" }
export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EmpleosPublicPage({ searchParams }: PageProps) {
  const sp = await searchParams
  function str(k: string) { const v = sp[k]; return Array.isArray(v) ? v[0] : v }

  const page      = Math.max(1, parseInt(str("page") ?? "1"))
  const search    = str("search")
  const type      = str("type")
  const companyId = str("companyId")
  const remoteStr = str("isRemote")
  const isRemote  = remoteStr === "true" ? true : remoteStr === "false" ? false : undefined

  const [result, companies] = await Promise.all([
    listJobsPublic({ search, type, isRemote, companyId, page }),
    getCompaniesForSelect(),
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-una-primary">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Bolsa de Empleo</h1>
              <p className="text-sm text-slate-500">Escuela Profesional de Ingeniería de Sistemas — UNA Puno</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <JobFilters companies={companies} />

        {result.jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-20 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-700">No hay ofertas disponibles</p>
            <p className="mt-1 text-xs text-slate-400">Intenta con otros filtros o vuelve más tarde.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500">
              {result.total} oferta{result.total !== 1 ? "s" : ""} encontrada{result.total !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.jobs.map((job) => (
                <JobCard key={job.id} job={job} href={`/empleos/${job.id}`} />
              ))}
            </div>

            {result.totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-4">
                {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
                  <a
                    key={p}
                    href={`?page=${p}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      p === result.page
                        ? "bg-una-secondary text-white"
                        : "border border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {p}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
