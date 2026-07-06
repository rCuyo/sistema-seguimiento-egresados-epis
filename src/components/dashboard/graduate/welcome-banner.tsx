import { GraduationCap } from "lucide-react"

interface WelcomeBannerProps {
  firstName:      string
  lastName:       string
  degree:         string
  schoolName:     string
  graduationYear: number
}

export function WelcomeBanner({
  firstName,
  lastName,
  degree,
  schoolName,
  graduationYear,
}: WelcomeBannerProps) {
  const today = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    day:     "numeric",
    month:   "long",
    year:    "numeric",
  })
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-una-primary via-[#1a4a7a] to-una-secondary p-6 text-white shadow-sm">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -right-4 bottom-0 h-28 w-28 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute right-32 top-2 h-16 w-16 rounded-full bg-white/5" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white/60">Bienvenido de vuelta</p>
          <h1 className="mt-1 text-2xl font-bold leading-tight">
            {firstName} {lastName}
          </h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
            <span>{degree}</span>
            <span className="text-white/30">·</span>
            <span>Egresado {graduationYear}</span>
            <span className="text-white/30">·</span>
            <span>UNA Puno</span>
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xs text-white/50">{formattedDate}</p>
          <div className="mt-2 flex items-center justify-end gap-1.5">
            <GraduationCap className="h-4 w-4 text-white/60" />
            <span className="text-sm text-white/70">{schoolName}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
