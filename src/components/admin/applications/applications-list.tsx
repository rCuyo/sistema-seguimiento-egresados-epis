"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, ChevronUp, Inbox } from "lucide-react"
import { toast } from "sonner"
import { cn }   from "@/lib/utils"
import { APPLICATION_STATUSES, APP_STATUS_LABELS } from "@/lib/validations/job"
import type { ApplicationListItem } from "@/lib/services/jobs.service"

const STATUS_STYLE: Record<string, string> = {
  PENDING:   "bg-amber-50 text-amber-700 ring-amber-200",
  REVIEWED:  "bg-blue-50 text-blue-700 ring-blue-200",
  INTERVIEW: "bg-violet-50 text-violet-700 ring-violet-200",
  ACCEPTED:  "bg-emerald-50 text-emerald-700 ring-emerald-200",
  REJECTED:  "bg-red-50 text-red-700 ring-red-200",
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })
}

function StatusSelect({ appId, current }: { appId: string; current: string }) {
  const router                      = useRouter()
  const [isPending, startTransition] = useTransition()
  const [value, setValue]           = useState(current)

  async function handleChange(newStatus: string) {
    setValue(newStatus)
    try {
      const res = await fetch(`/api/admin/applications/${appId}/status`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      toast.success("Estado actualizado")
      startTransition(() => router.refresh())
    } catch {
      setValue(current)
      toast.error("Error al actualizar el estado")
    }
  }

  return (
    <select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      disabled={isPending}
      className={cn(
        "rounded-lg border px-2 py-1 text-xs font-medium ring-1 ring-inset focus:outline-none disabled:opacity-50",
        STATUS_STYLE[value] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      )}
    >
      {APPLICATION_STATUSES.map((s) => (
        <option key={s} value={s}>{APP_STATUS_LABELS[s]}</option>
      ))}
    </select>
  )
}

function StatusFilter() {
  const router = useRouter()
  const sp     = useSearchParams()
  const current = sp.get("status") ?? ""

  function handleChange(value: string) {
    const params = new URLSearchParams(sp.toString())
    if (value) params.set("status", value)
    else params.delete("status")
    params.delete("page")
    router.push(`?${params.toString()}`)
  }

  return (
    <select
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 focus:border-una-secondary focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
    >
      <option value="">Todos los estados</option>
      {APPLICATION_STATUSES.map((s) => (
        <option key={s} value={s}>{APP_STATUS_LABELS[s]}</option>
      ))}
    </select>
  )
}

interface ApplicationsListProps {
  applications: ApplicationListItem[]
  total:        number
}

export function ApplicationsList({ applications, total }: ApplicationsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-20 text-center shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <Inbox className="h-5 w-5 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-700">No hay postulaciones</p>
        <p className="mt-1 text-xs text-slate-400">Las postulaciones de los egresados aparecerán aquí.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm">
        <StatusFilter />
        <span className="text-xs text-slate-400">
          {total} postulación{total !== 1 ? "es" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50/60">
                <th className="py-3 pl-5 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Candidato</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Oferta</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Estado</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Fecha</th>
                <th className="py-3 pl-3 pr-5 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">CV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {applications.map((app) => (
                <>
                  <tr
                    key={app.id}
                    className="group cursor-pointer transition-colors hover:bg-slate-50/70"
                    onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                  >
                    <td className="py-3.5 pl-5 pr-3">
                      <p className="font-medium text-slate-900">
                        {app.graduate?.firstName} {app.graduate?.lastName}
                      </p>
                      <p className="text-xs text-slate-400">
                        DNI {app.graduate?.dni} · {app.graduate?.school?.name}
                      </p>
                      <p className="text-xs text-slate-400">{app.graduate?.school?.faculty?.name}</p>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="font-medium text-slate-800">{app.job?.title}</p>
                      <p className="text-xs text-slate-400">{app.job?.company?.name}</p>
                    </td>
                    <td className="px-3 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <StatusSelect appId={app.id} current={app.status} />
                    </td>
                    <td className="px-3 py-3.5 text-xs text-slate-400">{formatDate(app.appliedAt)}</td>
                    <td className="py-3.5 pl-3 pr-5 text-right">
                      {app.coverLetter ? (
                        <button className="text-una-secondary hover:underline text-xs">
                          {expandedId === app.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </td>
                  </tr>

                  {expandedId === app.id && app.coverLetter && (
                    <tr key={`${app.id}-expanded`}>
                      <td colSpan={5} className="bg-slate-50/60 px-5 pb-4 pt-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Carta de presentación</p>
                        <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{app.coverLetter}</p>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
