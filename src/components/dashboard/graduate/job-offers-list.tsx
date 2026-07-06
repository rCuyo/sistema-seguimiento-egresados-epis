import Link from "next/link"
import { Building2, MapPin, ChevronRight, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GraduateDashboardData } from "@/lib/services/dashboard.service"

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME:               "Tiempo completo",
  PART_TIME:               "Medio tiempo",
  CONTRACT:                "Por contrato",
  INTERNSHIP:              "Práctica preprofesional",
  PROFESSIONAL_INTERNSHIP: "Práctica profesional",
}

const JOB_TYPE_COLORS: Record<string, string> = {
  FULL_TIME:               "bg-blue-50   text-blue-700   dark:bg-blue-900/30   dark:text-blue-300",
  PART_TIME:               "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  CONTRACT:                "bg-amber-50  text-amber-700  dark:bg-amber-900/30  dark:text-amber-300",
  INTERNSHIP:              "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  PROFESSIONAL_INTERNSHIP: "bg-teal-50   text-teal-700   dark:bg-teal-900/30   dark:text-teal-300",
}

interface JobOffersListProps {
  jobs: GraduateDashboardData["recentJobs"]
}

export function JobOffersList({ jobs }: JobOffersListProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Últimas ofertas laborales</h2>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Briefcase className="h-6 w-6 text-slate-400 dark:text-slate-500" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">Sin ofertas activas</p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            No hay ofertas laborales disponibles en este momento.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">Últimas ofertas laborales</h2>
        <Link
          href="/egresado/empleos"
          className="flex items-center gap-1 text-sm font-medium text-una-secondary transition-colors hover:text-blue-800"
        >
          Ver todas
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
              <Building2 className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{job.title}</p>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">{job.company.name}</span>
                {job.location && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="flex items-center gap-0.5 text-xs text-slate-400 dark:text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {job.isRemote ? "Remoto" : job.location}
                    </span>
                  </>
                )}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-medium",
                    JOB_TYPE_COLORS[job.type] ?? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  )}
                >
                  {JOB_TYPE_LABELS[job.type] ?? job.type}
                </span>
                {job.salary && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{job.salary}</span>
                )}
              </div>
            </div>

            <Link
              href="/egresado/empleos"
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-una-secondary hover:text-una-secondary dark:border-slate-700 dark:text-slate-400 dark:hover:border-una-secondary dark:hover:text-una-secondary"
            >
              Ver oferta
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
