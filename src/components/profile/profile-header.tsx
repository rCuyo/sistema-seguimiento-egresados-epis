import { ExternalLink, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GraduateProfile } from "@/types/graduate"

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  EMPLOYED:      { label: "Empleado",         className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  SELF_EMPLOYED: { label: "Independiente",    className: "bg-blue-100   text-blue-700   border-blue-200"   },
  UNEMPLOYED:    { label: "Desempleado",      className: "bg-red-100    text-red-700    border-red-200"    },
  SEEKING:       { label: "Buscando empleo",  className: "bg-amber-100  text-amber-700  border-amber-200"  },
  STUDYING:      { label: "Estudiando",       className: "bg-purple-100 text-purple-700 border-purple-200" },
}

function getInitials(first: string, last: string): string {
  return [first, last].map((n) => n[0]).join("").toUpperCase()
}

interface ProfileHeaderProps {
  profile: GraduateProfile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const status   = STATUS_CONFIG[profile.employmentStatus] ?? {
    label: profile.employmentStatus,
    className: "bg-slate-100 text-slate-700 border-slate-200",
  }
  const fullName = `${profile.firstName} ${profile.lastName}`

  return (
    <div className="flex flex-col items-center rounded-xl border bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* Avatar */}
      {profile.photo ? (
        <img
          src={profile.photo}
          alt={fullName}
          className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-100"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-una-primary text-2xl font-bold text-white ring-4 ring-slate-100">
          {getInitials(profile.firstName, profile.lastName)}
        </div>
      )}

      {/* Name & school */}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{fullName}</h2>
        <p className="mt-0.5 text-sm font-medium text-una-secondary">Ingeniería de Sistemas</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">EPIS · UNA Puno</p>
      </div>

      {/* Employment status badge */}
      <span
        className={cn(
          "mt-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
          status.className
        )}
      >
        {status.label}
      </span>

      {/* Location */}
      {profile.city && (
        <div className="mt-3 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>
            {profile.city}
            {profile.country && `, ${profile.country}`}
          </span>
        </div>
      )}

      {/* LinkedIn */}
      {profile.linkedinUrl && (
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-1.5 text-sm text-blue-600 transition-colors hover:text-blue-800"
        >
          <ExternalLink className="h-4 w-4" />
          Ver LinkedIn
        </a>
      )}

      {/* Bio */}
      {profile.bio && (
        <p className="mt-4 border-t border-slate-100 pt-4 text-left text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:text-slate-400">
          {profile.bio}
        </p>
      )}
    </div>
  )
}
