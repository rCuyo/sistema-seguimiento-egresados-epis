"use client"

import { useRouter }          from "next/navigation"
import { useForm }            from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { toast }              from "sonner"
import { cn }                 from "@/lib/utils"
import {
  createJobSchema,
  updateJobSchema,
  JOB_TYPE_LABELS,
  MODALITY_LABELS,
  type CreateJobInput,
} from "@/lib/validations/job"

interface JobFormProps {
  job?: {
    id: string; companyId: string; title: string; description: string
    requirements?: string | null; location?: string | null; type: string
    modality?: string | null; salary?: string | null; isRemote: boolean
    isActive: boolean; externalUrl?: string | null; expiresAt?: Date | null
  }
  companies: { id: string; name: string; sector: string | null }[]
}

function Field({ label, error, children, hint }: {
  label: string; error?: string; children: React.ReactNode; hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputCls    = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-una-secondary focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
const textareaCls = `${inputCls} resize-none`

export function JobForm({ job, companies }: JobFormProps) {
  const router = useRouter()
  const isEdit = !!job

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateJobInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: standardSchemaResolver(isEdit ? updateJobSchema : createJobSchema) as any,
    defaultValues: job ? {
      companyId:    job.companyId,
      title:        job.title,
      description:  job.description,
      requirements: job.requirements  ?? "",
      location:     job.location      ?? "",
      type:         job.type as CreateJobInput["type"],
      modality:     (job.modality ?? (job.isRemote ? "REMOTE" : "PRESENTIAL")) as CreateJobInput["modality"],
      salary:       job.salary        ?? "",
      isActive:     job.isActive,
      externalUrl:  job.externalUrl   ?? "",
      expiresAt:    job.expiresAt
        ? new Date(job.expiresAt).toISOString().split("T")[0]
        : "",
    } : {
      type:     "FULL_TIME",
      modality: "PRESENTIAL",
      isActive: true,
    },
  })

  async function onSubmit(data: CreateJobInput) {
    const url    = isEdit ? `/api/admin/jobs/${job.id}` : "/api/admin/jobs"
    const method = isEdit ? "PUT" : "POST"

    const payload = {
      ...data,
      requirements: data.requirements || null,
      location:     data.location     || null,
      salary:       data.salary       || null,
      externalUrl:  data.externalUrl  || null,
      expiresAt:    data.expiresAt    || null,
      isRemote:     data.modality === "REMOTE",
    }

    try {
      const res  = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Error al guardar")
      toast.success(isEdit ? "Oferta actualizada" : "Oferta creada")
      router.push("/admin/bolsa-laboral")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al guardar")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-5 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700">Información general</h2>

          <Field label="Empresa *" error={errors.companyId?.message}>
            <select {...register("companyId")} className={inputCls}>
              <option value="">Seleccionar empresa…</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}{c.sector ? ` — ${c.sector}` : ""}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Título de la oportunidad *" error={errors.title?.message}>
            <input {...register("title")} placeholder="Ej. Desarrollador Full Stack" className={inputCls} />
          </Field>

          <Field label="Tipo de oportunidad *" error={errors.type?.message}>
            <select {...register("type")} className={inputCls}>
              {Object.entries(JOB_TYPE_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </Field>

          <Field label="Modalidad *" error={errors.modality?.message}>
            <select {...register("modality")} className={inputCls}>
              {Object.entries(MODALITY_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </Field>

          <Field label="Remuneración / Beneficios" error={errors.salary?.message} hint='Ej. "S/. 3,000 - 5,000" o "A convenir"'>
            <input {...register("salary")} placeholder="S/. 3,000 - 5,000 o A convenir" className={inputCls} />
          </Field>

          <Field label="Ubicación" error={errors.location?.message}>
            <input {...register("location")} placeholder="Ej. Puno, Perú" className={inputCls} />
          </Field>

          <Field
            label="Enlace externo de postulación"
            error={errors.externalUrl?.message}
            hint="URL de la convocatoria (LinkedIn, portal de empleo, WhatsApp, etc.). Si se indica, los egresados serán redirigidos directamente."
          >
            <input
              {...register("externalUrl")}
              type="url"
              placeholder="https://..."
              className={inputCls}
            />
          </Field>

          <Field label="Fecha límite de postulación" error={errors.expiresAt?.message} hint="Dejar en blanco para sin fecha límite">
            <input {...register("expiresAt")} type="date" className={inputCls} />
          </Field>

          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
            <input
              {...register("isActive")}
              type="checkbox"
              id="isActive"
              className="h-4 w-4 rounded border-slate-300 text-una-secondary focus:ring-una-secondary"
            />
            <label htmlFor="isActive" className="text-sm text-slate-700">Publicar oferta (visible para egresados)</label>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700">Descripción</h2>

          <Field label="Descripción de la oportunidad *" error={errors.description?.message}>
            <textarea
              {...register("description")}
              rows={8}
              placeholder="Describe las responsabilidades, el equipo, el contexto del puesto…"
              className={textareaCls}
            />
          </Field>

          <Field label="Requisitos" error={errors.requirements?.message}>
            <textarea
              {...register("requirements")}
              rows={6}
              placeholder="Experiencia, habilidades, títulos requeridos…"
              className={textareaCls}
            />
          </Field>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg bg-una-secondary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          )}
        >
          {isSubmitting && (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {isEdit ? "Guardar cambios" : "Crear oferta"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/bolsa-laboral")}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
