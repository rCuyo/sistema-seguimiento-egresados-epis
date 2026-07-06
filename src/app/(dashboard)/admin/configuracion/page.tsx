import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import { authOptions }      from "@/lib/auth"
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Info,
  CheckCircle2,
  Database,
  ShieldCheck,
} from "lucide-react"

export const metadata = { title: "Configuración | Ing. Sistemas · UNA Puno" }

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500 shrink-0 w-48">{label}</span>
      <span className="text-sm font-medium text-slate-800 text-right">{value}</span>
    </div>
  )
}

function StatusBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex h-2 w-2 rounded-full ${active ? "bg-emerald-500" : "bg-red-400"}`}
      />
      <span className="text-sm text-slate-700">{label}</span>
      <span
        className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
          active
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-600"
        }`}
      >
        {active ? "Activo" : "Inactivo"}
      </span>
    </div>
  )
}

export default async function ConfiguracionPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") redirect("/login")

  const env = process.env.NODE_ENV ?? "production"
  const appUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000"

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Configuración</h1>
        <p className="mt-1 text-sm text-slate-500">
          Información del sistema y datos institucionales de la plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Información del sistema */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-4 w-4 text-una-secondary" />
            <h2 className="text-sm font-semibold text-slate-700">Información del sistema</h2>
          </div>
          <div className="divide-y divide-slate-100">
            <InfoRow label="Nombre del sistema"   value="Sistema de Seguimiento de Egresados" />
            <InfoRow label="Versión"               value="0.1.0" />
            <InfoRow label="Framework"             value="Next.js 16 · App Router" />
            <InfoRow label="Entorno"               value={env === "production" ? "Producción" : "Desarrollo"} />
            <InfoRow label="URL de la plataforma"  value={appUrl} />
            <InfoRow label="Base de datos"         value="PostgreSQL · Supabase" />
            <InfoRow label="ORM"                   value="Prisma 5" />
            <InfoRow label="Autenticación"         value="NextAuth v4 · Credentials" />
          </div>
        </div>

        {/* Información institucional */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-4 w-4 text-una-secondary" />
            <h2 className="text-sm font-semibold text-slate-700">Información institucional</h2>
          </div>
          <div className="divide-y divide-slate-100">
            <InfoRow label="Universidad"           value="Universidad Nacional del Altiplano" />
            <InfoRow label="Sigla"                 value="UNA Puno" />
            <InfoRow label="Escuela profesional"   value="Ingeniería de Sistemas (EPIS)" />
            <InfoRow label="Ciudad"                value="Puno, Perú" />
            <InfoRow label="Código postal"         value="21001" />
          </div>
        </div>

        {/* Datos de contacto */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-4 w-4 text-una-secondary" />
            <h2 className="text-sm font-semibold text-slate-700">Datos de contacto</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Globe className="h-4 w-4 text-slate-400 shrink-0" />
              <a
                href="https://www.unap.edu.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-una-secondary hover:underline"
              >
                www.unap.edu.pe
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="text-slate-700">sistemas@unap.edu.pe</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="text-slate-700">(051) 363 288</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="text-slate-700">Av. El Ejército 329, Puno</span>
            </div>
          </div>
        </div>

        {/* Estado de la plataforma */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-4 w-4 text-una-secondary" />
            <h2 className="text-sm font-semibold text-slate-700">Estado de la plataforma</h2>
          </div>
          <div className="space-y-3">
            <StatusBadge active label="Servidor web" />
            <StatusBadge active label="Conexión a base de datos" />
            <StatusBadge active label="Autenticación" />
            <StatusBadge active label="Módulo de egresados" />
            <StatusBadge active label="Módulo de encuestas" />
            <StatusBadge active label="Módulo de bolsa laboral" />
            <StatusBadge active label="Módulo de reportes y analytics" />
            <StatusBadge active={false} label="Módulo de escuelas (en desarrollo)" />
          </div>
        </div>

        {/* Variables de configuración */}
        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-una-secondary" />
            <h2 className="text-sm font-semibold text-slate-700">Variables de configuración del sistema</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="divide-y divide-slate-100">
              <InfoRow label="NEXTAUTH_URL"    value={appUrl} />
              <InfoRow label="NODE_ENV"        value={env} />
            </div>
            <div className="divide-y divide-slate-100">
              <InfoRow label="NEXTAUTH_SECRET" value="••••••••••••••••" />
              <InfoRow label="DATABASE_URL"    value="••••••••••••••••" />
            </div>
            <div className="divide-y divide-slate-100">
              <InfoRow label="Pool mode"       value="Transaction (PgBouncer)" />
              <InfoRow label="Connection limit" value="5" />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
            <Database className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-500">
              Los valores sensibles (secrets, URLs de base de datos) están enmascarados por seguridad. Para modificarlos, edita el archivo{" "}
              <code className="font-mono bg-slate-100 px-1 rounded">.env</code> en el servidor.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
