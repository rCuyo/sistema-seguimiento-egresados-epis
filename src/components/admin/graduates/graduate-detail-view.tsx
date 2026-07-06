import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Building2,
  Briefcase,
  ClipboardList,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { GraduateDetail } from "@/lib/services/admin-graduates.service"

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  EMPLOYED:      { label: "Empleado",      className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  SELF_EMPLOYED: { label: "Independiente", className: "bg-blue-50 text-blue-700 ring-blue-200"         },
  UNEMPLOYED:    { label: "Desempleado",   className: "bg-red-50 text-red-700 ring-red-200"             },
  SEEKING:       { label: "Buscando",      className: "bg-amber-50 text-amber-700 ring-amber-200"       },
  STUDYING:      { label: "Estudiando",    className: "bg-violet-50 text-violet-700 ring-violet-200"    },
}

const APP_STATUS_CONFIG: Record<string, { label: string; icon: typeof CheckCircle2; className: string }> = {
  PENDING:   { label: "Pendiente",  icon: Clock,         className: "text-amber-600"  },
  REVIEWED:  { label: "Revisado",   icon: CheckCircle2,  className: "text-blue-600"   },
  ACCEPTED:  { label: "Aceptado",   icon: CheckCircle2,  className: "text-emerald-600"},
  REJECTED:  { label: "Rechazado",  icon: XCircle,       className: "text-red-500"    },
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-una-primary text-xl font-bold text-white shadow-sm">
      {initials}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, className: "bg-slate-100 text-slate-600 ring-slate-200" }
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset", cfg.className)}>
      {cfg.label}
    </span>
  )
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: typeof Briefcase; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="flex items-center gap-2.5 border-b px-5 py-3.5">
        <Icon className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-slate-50">
      <span className="w-32 shrink-0 text-xs font-medium text-slate-400">{label}</span>
      <span className="min-w-0 flex-1 text-sm text-slate-800">{value ?? <span className="text-slate-300">—</span>}</span>
    </div>
  )
}

function formatDate(date: Date | string | null | undefined, opts?: Intl.DateTimeFormatOptions) {
  if (!date) return null
  return new Date(date).toLocaleDateString("es-PE", opts ?? { day: "2-digit", month: "short", year: "numeric" })
}

export function GraduateDetailView({ graduate }: { graduate: GraduateDetail }) {
  const fullName = [graduate.firstName, graduate.lastName, graduate.secondLastName]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Link
          href="/admin/egresados"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a egresados
        </Link>

        <span className="text-xs text-slate-400">
          ID: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600">{graduate.id}</code>
        </span>
      </div>

      {/* Profile hero */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar name={fullName} />
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{fullName}</h1>
              <StatusBadge status={graduate.employmentStatus} />
              {!graduate.user?.isActive && (
                <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-200">
                  Cuenta inactiva
                </span>
              )}
            </div>

            {graduate.currentPosition && (
              <p className="text-sm text-slate-600">
                {graduate.currentPosition}
                {graduate.currentCompany && (
                  <span className="text-slate-400"> · {graduate.currentCompany}</span>
                )}
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-400">
              {graduate.user?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {graduate.user.email}
                </span>
              )}
              {graduate.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {graduate.phone}
                </span>
              )}
              {graduate.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {graduate.city}, {graduate.country}
                </span>
              )}
              <span className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                Egresado {graduate.graduationYear}
              </span>
            </div>
          </div>

          {graduate.linkedinUrl && (
            <a
              href={graduate.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-una-secondary hover:text-una-secondary"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          )}
        </div>

        {graduate.bio && (
          <p className="mt-4 border-t pt-4 text-sm leading-relaxed text-slate-600">
            {graduate.bio}
          </p>
        )}
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-5 lg:col-span-1">
          {/* Academic info */}
          <SectionCard title="Información académica" icon={GraduationCap}>
            <DataRow label="DNI"              value={graduate.dni} />
            <DataRow label="Cód. matrícula"   value={graduate.enrollmentCode} />
            <DataRow label="Escuela"          value={graduate.school?.name} />
            <DataRow label="Ingreso"          value={graduate.admissionPeriod} />
            <DataRow label="Egreso"           value={
              graduate.graduationSemester
                ? `${graduate.graduationYear}-${graduate.graduationSemester}`
                : String(graduate.graduationYear)
            } />
            <DataRow label="1ra matrícula"    value={graduate.firstEnrollmentPeriod} />
            <DataRow label="Título"           value={graduate.degree} />
          </SectionCard>

          {/* Personal info */}
          <SectionCard title="Datos personales" icon={Mail}>
            <DataRow label="Correo de acceso"     value={graduate.user?.email} />
            <DataRow label="Correo institucional" value={graduate.institutionalEmail} />
            <DataRow label="Correo personal"      value={graduate.personalEmail} />
            <DataRow label="Estado civil"   value={graduate.maritalStatus} />
            <DataRow label="Estado cuenta"  value={graduate.user?.isActive ? "Activa" : "Inactiva"} />
            <DataRow label="Registro"       value={formatDate(graduate.user?.createdAt)} />
            <DataRow label="CV"             value={graduate.cvUrl
              ? <a href={graduate.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-una-secondary hover:underline">Ver CV <ExternalLink className="h-3 w-3" /></a>
              : null}
            />
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-5 lg:col-span-2">
          {/* Work experience */}
          <SectionCard title="Experiencia laboral" icon={Briefcase}>
            {graduate.workExperiences.length === 0 ? (
              <p className="text-sm text-slate-400">Sin experiencias registradas.</p>
            ) : (
              <div className="space-y-4">
                {graduate.workExperiences.map((exp) => (
                  <div key={exp.id} className="relative pl-4 [&:not(:last-child)]:pb-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-slate-50">
                    <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-una-secondary" />
                    <p className="font-medium text-slate-800">{exp.position}</p>
                    <p className="text-sm text-slate-500">{exp.company}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {formatDate(exp.startDate, { month: "short", year: "numeric" })} —{" "}
                      {exp.endDate
                        ? formatDate(exp.endDate, { month: "short", year: "numeric" })
                        : "Actualidad"}
                    </p>
                    {exp.description && (
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Applications */}
          <SectionCard title="Postulaciones recientes" icon={Building2}>
            {graduate.applications.length === 0 ? (
              <p className="text-sm text-slate-400">Sin postulaciones registradas.</p>
            ) : (
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="py-2 pl-3 pr-2 text-left text-xs font-semibold text-slate-400">Oferta</th>
                      <th className="px-2 py-2 text-left text-xs font-semibold text-slate-400">Empresa</th>
                      <th className="px-2 py-2 text-left text-xs font-semibold text-slate-400">Estado</th>
                      <th className="py-2 pl-2 pr-3 text-right text-xs font-semibold text-slate-400">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {graduate.applications.map((app) => {
                      const cfg = APP_STATUS_CONFIG[app.status] ?? { label: app.status, icon: Clock, className: "text-slate-500" }
                      const AppIcon = cfg.icon
                      return (
                        <tr key={app.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 pl-3 pr-2 font-medium text-slate-800">{app.job?.title}</td>
                          <td className="px-2 py-2.5 text-slate-500">{app.job?.company?.name}</td>
                          <td className="px-2 py-2.5">
                            <span className={cn("flex items-center gap-1 text-xs font-medium", cfg.className)}>
                              <AppIcon className="h-3.5 w-3.5" />
                              {cfg.label}
                            </span>
                          </td>
                          <td className="py-2.5 pl-2 pr-3 text-right text-xs text-slate-400">
                            {formatDate(app.appliedAt)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>

          {/* Survey responses */}
          <SectionCard title="Encuestas respondidas" icon={ClipboardList}>
            {graduate.surveyResponses.length === 0 ? (
              <p className="text-sm text-slate-400">Sin encuestas respondidas.</p>
            ) : (
              <div className="space-y-2">
                {graduate.surveyResponses.map((sr) => (
                  <div
                    key={sr.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-sm text-slate-700">{sr.survey?.title}</span>
                    </div>
                    <span className="text-xs text-slate-400">{formatDate(sr.completedAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
