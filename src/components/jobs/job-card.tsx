import Link         from "next/link"
import { MapPin, Wifi, Clock } from "lucide-react"
import { cn }        from "@/lib/utils"
import { JOB_TYPE_LABELS } from "@/lib/validations/job"
import type { JobPublicItem } from "@/lib/services/jobs.service"

const TYPE_COLORS: Record<string, string> = {
  FULL_TIME:               "bg-blue-50   text-blue-700   ring-blue-200   dark:bg-blue-900/30   dark:text-blue-300   dark:ring-blue-800",
  PART_TIME:               "bg-amber-50  text-amber-700  ring-amber-200  dark:bg-amber-900/30  dark:text-amber-300  dark:ring-amber-800",
  CONTRACT:                "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:ring-violet-800",
  INTERNSHIP:              "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800",
  PROFESSIONAL_INTERNSHIP: "bg-teal-50   text-teal-700   ring-teal-200   dark:bg-teal-900/30   dark:text-teal-300   dark:ring-teal-800",
}

function daysAgo(d: Date | string) {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000)
  if (diff === 0) return "Hoy"
  if (diff === 1) return "Hace 1 día"
  return `Hace ${diff} días`
}

interface JobCardProps {
  job:              JobPublicItem
  href:             string
  applied?:         boolean
  applicationStatus?: string
}

export function JobCard({ job, href, applied, applicationStatus }: JobCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border bg-white p-5 shadow-sm transition-all hover:border-una-secondary/30 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-una-secondary/50"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{job.company?.name}</p>
          {job.company?.sector && (
            <p className="text-xs text-slate-400 dark:text-slate-500">{job.company.sector}</p>
          )}
        </div>
        {applied && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">
            {applicationStatus ?? "Postulado"}
          </span>
        )}
      </div>

      <h3 className="mb-3 font-semibold text-slate-900 transition-colors group-hover:text-una-secondary dark:text-slate-100">
        {job.title}
      </h3>

      <div className="mt-auto space-y-2">
        <div className="flex flex-wrap gap-2">
          <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", TYPE_COLORS[job.type] ?? "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700")}>
            {JOB_TYPE_LABELS[job.type] ?? job.type}
          </span>
          {job.isRemote && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:ring-sky-800">
              <Wifi className="h-3 w-3" /> Remoto
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />{job.location}
            </span>
          )}
          {job.salary && <span className="font-medium text-slate-600 dark:text-slate-300">{job.salary}</span>}
          <span className="ml-auto flex items-center gap-1">
            <Clock className="h-3 w-3" />{daysAgo(job.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  )
}
