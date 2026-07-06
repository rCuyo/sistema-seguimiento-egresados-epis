"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Briefcase, Loader2, CheckCircle2 } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type WorkExp = {
  id:        string
  company:   string
  position:  string
  startDate: string
  endDate:   string | null
  isCurrent: boolean
}

type FormState = {
  company:   string
  position:  string
  startDate: string
  endDate:   string
  isCurrent: boolean
}

const emptyForm: FormState = {
  company:   "",
  position:  "",
  startDate: "",
  endDate:   "",
  isCurrent: false,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMonth(isoStr: string): string {
  const [y, m] = isoStr.substring(0, 10).split("-")
  return new Date(Number(y), Number(m) - 1)
    .toLocaleDateString("es-PE", { month: "short", year: "numeric" })
}

function formatPeriod(item: WorkExp): string {
  const start = formatMonth(item.startDate)
  if (item.isCurrent)    return `${start} — Actualidad`
  if (!item.endDate)     return start
  return `${start} — ${formatMonth(item.endDate)}`
}

function toDateInput(iso: string | null): string {
  if (!iso) return ""
  return iso.substring(0, 10)
}

// ─── Form component ───────────────────────────────────────────────────────────

function WorkExperienceForm({
  initial,
  onSave,
  onCancel,
}: {
  initial:   FormState
  onSave:    (form: FormState) => Promise<void>
  onCancel:  () => void
}) {
  const [form, setForm]       = useState<FormState>(initial)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState<string | null>(null)

  function set(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.company.trim() || form.company.trim().length < 2) {
      setError("Ingresa el nombre de la empresa (mínimo 2 caracteres).")
      return
    }
    if (!form.position.trim() || form.position.trim().length < 2) {
      setError("Ingresa el cargo (mínimo 2 caracteres).")
      return
    }
    if (!form.startDate) {
      setError("Selecciona la fecha de inicio.")
      return
    }
    if (!form.isCurrent && form.endDate && form.endDate < form.startDate) {
      setError("La fecha de término debe ser posterior a la de inicio.")
      return
    }
    setSaving(true)
    try {
      await onSave(form)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar.")
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 " +
    "focus:border-una-secondary focus:outline-none focus:ring-1 focus:ring-una-secondary " +
    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 " +
    "dark:focus:border-una-secondary"

  const labelClass = "mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-una-secondary/30 bg-blue-50/40 p-5 dark:border-slate-700 dark:bg-slate-800/40">
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {initial.company ? "Editar experiencia" : "Nueva experiencia laboral"}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Empresa / Institución *</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Ej. Tech Solutions SAC"
            maxLength={200}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Cargo / Puesto *</label>
          <input
            type="text"
            value={form.position}
            onChange={(e) => set("position", e.target.value)}
            placeholder="Ej. Desarrollador Full Stack"
            maxLength={200}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Fecha de inicio *</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => set("startDate", e.target.value)}
            className={inputClass}
          />
        </div>
        {!form.isCurrent && (
          <div>
            <label className={labelClass}>Fecha de término</label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)}
              min={form.startDate || undefined}
              className={inputClass}
            />
          </div>
        )}
      </div>

      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={form.isCurrent}
          onChange={(e) => {
            set("isCurrent", e.target.checked)
            if (e.target.checked) set("endDate", "")
          }}
          className="h-4 w-4 rounded border-slate-300 text-una-secondary accent-una-secondary"
        />
        <span className="text-sm text-slate-700 dark:text-slate-300">Es mi empleo actual</span>
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-una-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          {saving ? "Guardando…" : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function WorkExperienceSection() {
  const [experiences, setExperiences] = useState<WorkExp[]>([])
  const [loading, setLoading]         = useState(true)
  const [editingId, setEditingId]     = useState<string | null | "new">(null)
  const [deleteId, setDeleteId]       = useState<string | null>(null)
  const [deleting, setDeleting]       = useState(false)

  async function fetchExperiences() {
    try {
      const res  = await fetch("/api/graduates/me/work-experience")
      const json = await res.json() as { data: WorkExp[] }
      setExperiences(json.data ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchExperiences() }, [])

  async function handleSave(form: FormState) {
    const isNew = editingId === "new"
    const url   = isNew
      ? "/api/graduates/me/work-experience"
      : `/api/graduates/me/work-experience/${editingId}`

    const payload = {
      company:   form.company.trim(),
      position:  form.position.trim(),
      startDate: form.startDate,
      endDate:   form.isCurrent ? null : (form.endDate || null),
      isCurrent: form.isCurrent,
    }

    const res = await fetch(url, {
      method:  isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json() as { error?: string }
      throw new Error(err.error ?? "Error al guardar")
    }

    setEditingId(null)
    await fetchExperiences()
  }

  async function handleDelete(id: string) {
    setDeleting(true)
    try {
      await fetch(`/api/graduates/me/work-experience/${id}`, { method: "DELETE" })
      setDeleteId(null)
      await fetchExperiences()
    } finally {
      setDeleting(false)
    }
  }

  function getFormInitial(): FormState {
    if (editingId === "new" || editingId === null) return emptyForm
    const item = experiences.find((e) => e.id === editingId)
    if (!item) return emptyForm
    return {
      company:   item.company,
      position:  item.position,
      startDate: toDateInput(item.startDate),
      endDate:   toDateInput(item.endDate),
      isCurrent: item.isCurrent,
    }
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Historial Laboral</h2>
        </div>
        {editingId === null && (
          <button
            onClick={() => setEditingId("new")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-una-secondary px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar
          </button>
        )}
      </div>

      <div className="p-6 space-y-4">
        {/* Form (add or edit) */}
        {editingId !== null && (
          <WorkExperienceForm
            initial={getFormInitial()}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
          />
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        )}

        {/* Empty state */}
        {!loading && experiences.length === 0 && editingId === null && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Briefcase className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">Sin experiencias registradas</p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Agrega tu historial laboral para completar tu perfil profesional.
            </p>
          </div>
        )}

        {/* Experience list */}
        {!loading && experiences.length > 0 && (
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/40"
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  {/* Timeline dot */}
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-una-secondary/10 dark:bg-una-secondary/20">
                    <Briefcase className="h-4 w-4 text-una-secondary" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {exp.position}
                      </p>
                      {exp.isCurrent && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-800">
                          Actual
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{exp.company}</p>
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                      {formatPeriod(exp)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {deleteId === exp.id ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">¿Eliminar?</p>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      disabled={deleting}
                      className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                    >
                      {deleting ? "…" : "Sí"}
                    </button>
                    <button
                      onClick={() => setDeleteId(null)}
                      disabled={deleting}
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => setEditingId(exp.id)}
                      title="Editar"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(exp.id)}
                      title="Eliminar"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
