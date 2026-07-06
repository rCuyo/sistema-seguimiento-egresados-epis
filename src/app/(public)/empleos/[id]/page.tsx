import type { Metadata }  from "next"
import Link               from "next/link"
import { notFound }       from "next/navigation"
import {
  ArrowLeft, MapPin, Building2, Globe, BadgeCheck, Clock, Monitor, ExternalLink,
} from "lucide-react"
import { getJobDetailPublic } from "@/lib/services/jobs.service"
import { JOB_TYPE_LABELS, MODALITY_LABELS } from "@/lib/validations/job"
import { ViewTracker }        from "@/components/jobs/view-tracker"

export const dynamic = "force-dynamic"

interface PageProps { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const job    = await getJobDetailPublic(id)
  return { title: job ? `${job.title} — ${job.company.name}` : "Oportunidad Laboral" }
}

function daysAgo(d: Date | string) {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000)
  if (diff === 0) return "Publicado hoy"
  if (diff === 1) return "Publicado hace 1 día"
  return `Publicado hace ${diff} días`
}

export default async function EmpleoPublicDetailPage({ params }: PageProps) {
  const { id } = await params
  const job    = await getJobDetailPublic(id)
  if (!job) notFound()

  const modalityLabel = job.modality ? (MODALITY_LABELS[job.modality] ?? job.modality) : null

  return (
    <div className="min-h-screen bg-slate-50">
      <ViewTracker jobId={id} />

      <div className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link
            href="/empleos"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a ofertas
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-slate-500">{job.company.name}</span>
                {job.company.isVerified && (
                  <span className="inline-flex items-center gap-1 text-xs text-una-secondary">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verificada
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200">
                  {JOB_TYPE_LABELS[job.type] ?? job.type}
                </span>
                {modalityLabel && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
                    <Monitor className="h-3 w-3" /> {modalityLabel}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                {job.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>}
                {job.salary   && <span className="font-medium text-slate-700">{job.salary}</span>}
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{daysAgo(job.createdAt)}</span>
                {job.expiresAt && (
                  <span className="text-amber-600">
                    Cierra: {new Date(job.expiresAt).toLocaleDateString("es-PE")}
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold text-slate-900">Descripción del puesto</h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{job.description}</p>
            </div>

            {job.requirements && (
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 font-semibold text-slate-900">Requisitos</h2>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{job.requirements}</p>
              </div>
            )}

            {job.externalUrl ? (
              <div className="rounded-xl border border-una-secondary/20 bg-una-secondary/5 p-6">
                <p className="text-sm font-medium text-slate-700">¿Interesado en esta oportunidad?</p>
                <p className="mt-1 text-xs text-slate-500">
                  Inicia sesión para postularte, o accede directamente al enlace del empleador.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-una-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Iniciar sesión
                  </Link>
                  <a
                    href={job.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Ir al enlace del empleador
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-una-secondary/20 bg-una-secondary/5 p-6">
                <p className="text-sm font-medium text-slate-700">¿Eres egresado de Ingeniería de Sistemas — UNA Puno?</p>
                <p className="mt-1 text-xs text-slate-500">Inicia sesión para postularte directamente desde tu perfil.</p>
                <Link
                  href="/login"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-una-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Iniciar sesión y postularme
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <Building2 className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{job.company.name}</p>
                  {job.company.sector && <p className="text-xs text-slate-500">{job.company.sector}</p>}
                </div>
              </div>
              {job.company.description && (
                <p className="text-xs leading-relaxed text-slate-600 line-clamp-4">{job.company.description}</p>
              )}
              {job.company.website && (
                <a
                  href={job.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs text-una-secondary hover:underline"
                >
                  <Globe className="h-3 w-3" /> Sitio web
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
