import type { GraduateProfile } from "@/types/graduate"
import { ThemeSelector } from "./theme-selector"

const STATUS_LABELS: Record<string, string> = {
  EMPLOYED:      "Empleado en relación de dependencia",
  SELF_EMPLOYED: "Independiente / Emprendedor",
  UNEMPLOYED:    "Desempleado",
  SEEKING:       "Buscando empleo activamente",
  STUDYING:      "Estudiando (posgrado u otra carrera)",
}

function Field({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
        {value ?? <span className="text-slate-300 dark:text-slate-600">—</span>}
      </dd>
    </div>
  )
}

function parseAcademicPeriod(period: string | null | undefined) {
  if (!period) return { year: null, semester: null }
  const parts = period.split("-")
  return { year: parts[0] ?? null, semester: parts[1] ?? null }
}

interface ProfileInfoCardsProps {
  profile: GraduateProfile
}

export function ProfileInfoCards({ profile }: ProfileInfoCardsProps) {
  const admission     = parseAcademicPeriod(profile.admissionPeriod)
  const firstEnrollment = parseAcademicPeriod(profile.firstEnrollmentPeriod)

  return (
    <div className="space-y-4">
      {/* Personal */}
      <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 border-b border-slate-100 pb-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
          Información Personal
        </h3>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <Field label="Correo de acceso"       value={profile.user.email} />
          <Field label="Correo institucional"   value={profile.institutionalEmail} />
          <Field label="Correo personal"        value={profile.personalEmail} />
          <Field label="DNI"                    value={profile.dni} />
          <Field label="Teléfono o celular"     value={profile.phone} />
          {profile.maritalStatus && (
            <Field label="Estado civil"         value={profile.maritalStatus} />
          )}
          <Field label="Ciudad"                 value={profile.city} />
          <Field label="País"                   value={profile.country} />
        </dl>
      </div>

      {/* Academic */}
      <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 border-b border-slate-100 pb-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
          Información Académica
        </h3>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <Field label="Escuela Profesional"    value={profile.school.name} />
          <Field label="Código de matrícula"    value={profile.enrollmentCode} />
          <Field label="Año de ingreso"         value={admission.year} />
          <Field label="Semestre de ingreso"    value={admission.semester} />
          <Field label="Año de egreso"          value={profile.graduationYear} />
          <Field label="Semestre de egreso"     value={profile.graduationSemester} />
          <Field label="1.ª matrícula"          value={
            firstEnrollment.year
              ? firstEnrollment.semester
                ? `${firstEnrollment.year}-${firstEnrollment.semester}`
                : firstEnrollment.year
              : null
          } />
          <Field label="Título"                 value={profile.degree} />
        </dl>
      </div>

      {/* Employment */}
      <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 border-b border-slate-100 pb-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
          Situación Laboral
        </h3>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Estado Laboral" value={STATUS_LABELS[profile.employmentStatus]} />
          </div>
          <Field label="Cargo Actual"   value={profile.currentPosition} />
          <Field label="Empresa Actual" value={profile.currentCompany} />
        </dl>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-700">
        <h3 className="mb-1 border-b border-slate-100 pb-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
          Apariencia
        </h3>
        <p className="mb-4 text-xs text-slate-400 dark:text-slate-500">
          Elige cómo se ve el sistema. &quot;Sistema&quot; usa la preferencia de tu dispositivo.
        </p>
        <ThemeSelector />
      </div>
    </div>
  )
}
