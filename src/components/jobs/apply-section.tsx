"use client"

import { useState }      from "react"
import { useRouter }     from "next/navigation"
import { toast }         from "sonner"
import { ExternalLink }  from "lucide-react"
import { cn }            from "@/lib/utils"
import { APP_STATUS_LABELS } from "@/lib/validations/job"

interface ApplySectionProps {
  jobId:              string
  alreadyApplied:     boolean
  applicationStatus?: string
  appliedAt?:         Date | string
  externalUrl?:       string | null
}

const STATUS_STYLE: Record<string, string> = {
  PENDING:   "bg-amber-50 text-amber-700 ring-amber-200",
  REVIEWED:  "bg-blue-50 text-blue-700 ring-blue-200",
  INTERVIEW: "bg-violet-50 text-violet-700 ring-violet-200",
  ACCEPTED:  "bg-emerald-50 text-emerald-700 ring-emerald-200",
  REJECTED:  "bg-red-50 text-red-700 ring-red-200",
}

export function ApplySection({
  jobId,
  alreadyApplied,
  applicationStatus,
  appliedAt,
  externalUrl,
}: ApplySectionProps) {
  const router        = useRouter()
  const [cover, setCover]     = useState("")
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(alreadyApplied)
  const [status, setStatus]   = useState(applicationStatus)

  function handleExternalClick() {
    fetch(`/api/jobs/${jobId}/click`, { method: "POST" }).catch(() => {})
  }

  async function handleApply() {
    setLoading(true)
    try {
      const res  = await fetch(`/api/jobs/${jobId}/apply`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ coverLetter: cover || null }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Error al postularse")
      toast.success("¡Postulación enviada con éxito!")
      setApplied(true)
      setStatus("PENDING")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al postularse")
    } finally {
      setLoading(false)
    }
  }

  // Oferta con URL externa: mostrar enlace directo
  if (externalUrl) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-sm font-semibold text-slate-800">Postularse a esta oferta</h2>
        <p className="mb-4 text-xs text-slate-400">
          Esta oferta gestiona las postulaciones a través del sitio web del empleador.
        </p>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleExternalClick}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-una-secondary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <ExternalLink className="h-4 w-4" />
          Ir al enlace de postulación
        </a>
        <p className="mt-3 text-xs text-slate-400">
          Serás redirigido al sitio del empleador. El proceso de selección es gestionado externamente.
        </p>
      </div>
    )
  }

  // Ya postulado (flujo interno)
  if (applied) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Tu postulación</h2>
        <div className="flex items-center gap-3">
          <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset", STATUS_STYLE[status ?? ""] ?? "bg-slate-100 text-slate-600 ring-slate-200")}>
            {APP_STATUS_LABELS[status ?? ""] ?? status}
          </span>
          {appliedAt && (
            <span className="text-xs text-slate-400">
              Postulado el {new Date(appliedAt).toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          )}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          El empleador revisará tu perfil y se pondrá en contacto contigo.
        </p>
      </div>
    )
  }

  // Flujo interno: carta de presentación
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-sm font-semibold text-slate-800">Postularse a esta oferta</h2>
      <p className="mb-4 text-xs text-slate-400">Tu perfil de egresado se adjuntará automáticamente.</p>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Carta de presentación <span className="text-slate-400">(opcional)</span>
          </label>
          <textarea
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            rows={5}
            maxLength={2000}
            placeholder="Cuéntale al empleador por qué eres el candidato ideal para este puesto…"
            className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-una-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
          />
          <p className="mt-1 text-right text-xs text-slate-400">{cover.length}/2000</p>
        </div>

        <button
          onClick={handleApply}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-una-secondary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {loading && (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? "Enviando…" : "Enviar postulación"}
        </button>
      </div>
    </div>
  )
}
