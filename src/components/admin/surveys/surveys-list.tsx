"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Pencil,
  BarChart2,
  Power,
  Trash2,
  X,
  AlertTriangle,
  HelpCircle,
  MessageSquare,
  Calendar,
  Globe,
  School,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { SurveyListItem } from "@/lib/services/surveys.service"

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("es-PE", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
  })
}

interface SurveysListProps {
  surveys: SurveyListItem[]
}

export function SurveysList({ surveys }: SurveysListProps) {
  const router = useRouter()
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  async function handleToggle(id: string, currentlyActive: boolean) {
    setTogglingId(id)
    try {
      const res = await fetch(`/api/admin/surveys/${id}/toggle`, { method: "PATCH" })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        toast.error(body.error ?? "No se pudo cambiar el estado")
        return
      }
      toast.success(currentlyActive ? "Encuesta desactivada" : "Encuesta activada")
      startTransition(() => { router.refresh() })
    } catch {
      toast.error("Error de red. Intenta de nuevo.")
    } finally {
      setTogglingId(null)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/surveys/${id}`, { method: "DELETE" })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        toast.error(body.error ?? "No se pudo eliminar la encuesta")
        return
      }
      toast.success("Encuesta eliminada")
      setConfirmDeleteId(null)
      startTransition(() => { router.refresh() })
    } catch {
      toast.error("Error de red. Intenta de nuevo.")
    } finally {
      setDeletingId(null)
    }
  }

  if (surveys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-20 text-center shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <HelpCircle className="h-7 w-7 text-slate-400" />
        </div>
        <p className="text-sm font-semibold text-slate-700">No hay encuestas aún</p>
        <p className="mt-1.5 text-xs text-slate-400">
          Crea tu primera encuesta para comenzar a recopilar información.
        </p>
        <Link
          href="/admin/encuestas/nueva"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-una-secondary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Nueva encuesta
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {surveys.map((survey) => {
        const isConfirmingDelete = confirmDeleteId === survey.id
        const isToggling = togglingId === survey.id
        const isDeleting = deletingId === survey.id

        return (
          <div
            key={survey.id}
            className={cn(
              "group rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md",
              survey.isActive ? "border-l-4 border-l-emerald-400" : "border-l-4 border-l-slate-200"
            )}
          >
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              {/* Left: info */}
              <div className="min-w-0 flex-1 space-y-3">
                {/* Title row + badges */}
                <div className="flex flex-wrap items-start gap-2">
                  <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                    {survey.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {/* Active / Inactive badge */}
                    {survey.isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        <CheckCircle2 className="h-3 w-3" />
                        Activa
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
                        <XCircle className="h-3 w-3" />
                        Inactiva
                      </span>
                    )}

                    {/* Global / School badge */}
                    {survey.isGlobal ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200">
                        <Globe className="h-3 w-3" />
                        Global
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-200">
                        <School className="h-3 w-3" />
                        {survey.school?.name ?? "Escuela"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {survey.description && (
                  <p className="line-clamp-2 text-xs text-slate-500">{survey.description}</p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <HelpCircle className="h-3.5 w-3.5" />
                    {survey._count.questions} pregunta{survey._count.questions !== 1 ? "s" : ""}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {survey._count.responses} respuesta{survey._count.responses !== 1 ? "s" : ""}
                  </span>
                  {survey.endsAt && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Cierra: {formatDate(survey.endsAt)}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    Creada: {formatDate(survey.createdAt)}
                  </span>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                {isConfirmingDelete ? (
                  /* Inline delete confirm */
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-xs font-medium text-red-700">¿Eliminar?</span>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded px-2 py-0.5 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleDelete(survey.id)}
                      disabled={isDeleting}
                      className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      {isDeleting ? "Eliminando…" : "Sí, eliminar"}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Primary actions row */}
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/encuestas/${survey.id}/editar`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-una-secondary hover:text-una-secondary"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Editar
                      </Link>
                      <Link
                        href={`/admin/encuestas/${survey.id}/resultados`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-una-secondary hover:text-una-secondary"
                      >
                        <BarChart2 className="h-3.5 w-3.5" />
                        Ver resultados
                      </Link>
                    </div>

                    {/* Secondary actions row */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggle(survey.id, survey.isActive)}
                        disabled={isToggling}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-60",
                          survey.isActive
                            ? "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-400 hover:bg-amber-100"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100"
                        )}
                      >
                        <Power className="h-3.5 w-3.5" />
                        {isToggling
                          ? "Cambiando…"
                          : survey.isActive
                          ? "Desactivar"
                          : "Activar"}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(survey.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Eliminar
                      </button>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
