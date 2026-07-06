import Link   from "next/link"
import { Pencil } from "lucide-react"
import { cn }  from "@/lib/utils"
import type { GraduateDashboardData } from "@/lib/services/dashboard.service"

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  EMPLOYED:      { label: "Empleado",        className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800" },
  SELF_EMPLOYED: { label: "Independiente",   className: "bg-blue-100   text-blue-700   border-blue-200   dark:bg-blue-900/40   dark:text-blue-300   dark:border-blue-800"   },
  UNEMPLOYED:    { label: "Desempleado",     className: "bg-red-100    text-red-700    border-red-200    dark:bg-red-900/40    dark:text-red-300    dark:border-red-800"    },
  SEEKING:       { label: "Buscando empleo", className: "bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-900/40  dark:text-amber-300  dark:border-amber-800"  },
  STUDYING:      { label: "Estudiando",      className: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800" },
}

function computeCompleteness(profile: GraduateDashboardData["profile"]): number {
  const checks = [
    !!profile.phone,
    !!profile.bio,
    !!profile.photo,
    !!profile.linkedinUrl,
    !!profile.city,
    !!profile.currentPosition,
  ]
  const filled = checks.filter(Boolean).length
  return 50 + Math.round((filled / checks.length) * 50)
}

interface ProfileCardProps {
  profile: GraduateDashboardData["profile"]
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const initials    = [profile.firstName, profile.lastName].map((n) => n[0]).join("").toUpperCase()
  const status      = STATUS_CONFIG[profile.employmentStatus] ?? { label: profile.employmentStatus, className: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700" }
  const completeness = computeCompleteness(profile)

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt=""
            className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-una-primary text-sm font-bold text-white">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900 dark:text-slate-100">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="truncate text-xs text-slate-400 dark:text-slate-500">{profile.school.name}</p>
        </div>
      </div>

      <span
        className={cn(
          "mt-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
          status.className
        )}
      >
        {status.label}
      </span>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Completitud del perfil</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{completeness}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-una-secondary transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
        {completeness < 100 && (
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            Completa tu perfil para más visibilidad
          </p>
        )}
      </div>

      <Link
        href="/egresado/perfil"
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <Pencil className="h-3.5 w-3.5" />
        Editar perfil
      </Link>
    </div>
  )
}
