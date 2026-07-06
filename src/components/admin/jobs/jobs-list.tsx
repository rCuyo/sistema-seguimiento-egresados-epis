"use client"

import { useState, useTransition } from "react"
import Link                         from "next/link"
import { useRouter }                from "next/navigation"
import {
  Briefcase, Users, MapPin, Pencil, Trash2,
  ToggleLeft, ToggleRight, AlertTriangle, ExternalLink, Eye, MousePointerClick,
} from "lucide-react"
import { toast } from "sonner"
import { cn }    from "@/lib/utils"
import { JOB_TYPE_LABELS, MODALITY_LABELS } from "@/lib/validations/job"
import type { JobListItem } from "@/lib/services/jobs.service"

const TYPE_COLORS: Record<string, string> = {
  FULL_TIME:               "bg-blue-50 text-blue-700 ring-blue-200",
  PART_TIME:               "bg-amber-50 text-amber-700 ring-amber-200",
  CONTRACT:                "bg-violet-50 text-violet-700 ring-violet-200",
  INTERNSHIP:              "bg-emerald-50 text-emerald-700 ring-emerald-200",
  PROFESSIONAL_INTERNSHIP: "bg-teal-50 text-teal-700 ring-teal-200",
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })
}

export function JobsList({ jobs }: { jobs: JobListItem[] }) {
  const router                      = useRouter()
  const [isPending, startTransition] = useTransition()
  const [confirmId, setConfirmId]   = useState<string | null>(null)
  const [loadingId, setLoadingId]   = useState<string | null>(null)

  async function handleToggle(id: string) {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/jobs/${id}/toggle`, { method: "PATCH" })
      if (!res.ok) throw new Error()
      toast.success("Estado actualizado")
      startTransition(() => router.refresh())
    } catch {
      toast.error("Error al actualizar el estado")
    } finally {
      setLoadingId(null)
    }
  }

  async function handleDelete(id: string) {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      toast.success("Oferta eliminada")
      startTransition(() => router.refresh())
    } catch {
      toast.error("Error al eliminar la oferta")
    } finally {
      setLoadingId(null)
      setConfirmId(null)
    }
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-20 text-center shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <Briefcase className="h-5 w-5 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-700">No hay ofertas laborales</p>
        <p className="mt-1 text-xs text-slate-400">Crea la primera oferta para comenzar.</p>
        <Link
          href="/admin/bolsa-laboral/nueva"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-una-secondary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Nueva oferta
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className={cn(
            "rounded-xl border border-l-4 bg-white shadow-sm transition-shadow hover:shadow-md",
            job.isActive ? "border-l-emerald-400" : "border-l-slate-200"
          )}
        >
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
            {/* Info */}
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{job.company?.name}</span>
                {job.company?.sector && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                    {job.company.sector}
                  </span>
                )}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                    job.isActive
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-slate-100 text-slate-500 ring-slate-200"
                  )}
                >
                  {job.isActive ? "Activa" : "Inactiva"}
                </span>
                {job.externalUrl && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-600 ring-1 ring-inset ring-sky-200">
                    <ExternalLink className="h-3 w-3" /> Enlace externo
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-slate-900">{job.title}</h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 ring-1 ring-inset font-medium", TYPE_COLORS[job.type] ?? "bg-slate-100 text-slate-600 ring-slate-200")}>
                  {JOB_TYPE_LABELS[job.type] ?? job.type}
                </span>
                {job.modality && (
                  <span className="text-slate-500">{MODALITY_LABELS[job.modality] ?? job.modality}</span>
                )}
                {job.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />{job.location}
                  </span>
                )}
                {job.salary && <span className="text-slate-600">{job.salary}</span>}
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />{job._count.applications} postulante{job._count.applications !== 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />{job.viewCount} vista{job.viewCount !== 1 ? "s" : ""}
                </span>
                {job._count.clicks > 0 && (
                  <span className="flex items-center gap-1 text-sky-600">
                    <MousePointerClick className="h-3 w-3" />{job._count.clicks} clic{job._count.clicks !== 1 ? "s" : ""}
                  </span>
                )}
                <span>{formatDate(job.createdAt)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              {confirmId === job.id ? (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                  <span className="text-xs font-medium text-red-700">¿Eliminar?</span>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="text-xs text-slate-500 underline hover:text-slate-700"
                  >Cancelar</button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    disabled={loadingId === job.id}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                  >Sí, eliminar</button>
                </div>
              ) : (
                <>
                  <Link
                    href={`/admin/bolsa-laboral/${job.id}/editar`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  <button
                    onClick={() => handleToggle(job.id)}
                    disabled={loadingId === job.id || isPending}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 disabled:opacity-50"
                    title={job.isActive ? "Desactivar" : "Activar"}
                  >
                    {job.isActive
                      ? <ToggleRight className="h-4 w-4 text-emerald-600" />
                      : <ToggleLeft  className="h-4 w-4" />
                    }
                  </button>

                  <button
                    onClick={() => setConfirmId(job.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-red-200 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
