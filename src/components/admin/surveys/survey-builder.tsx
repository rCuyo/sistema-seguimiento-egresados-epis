"use client"

import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { useRouter } from "next/navigation"
import {
  GripVertical,
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  X,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import { Label }  from "@/components/ui/label"
import {
  createSurveySchema,
  QUESTION_TYPES,
  type CreateSurveyInput,
  type SurveyQuestionInput,
} from "@/lib/validations/survey"
import type { SurveyWithQuestions } from "@/lib/services/surveys.service"

// ---------------------------------------------------------------------------
// Helpers — duplicate option detection
// ---------------------------------------------------------------------------

function getDuplicateKeys(opts: string[]): Set<string> {
  const count = new Map<string, number>()
  for (const o of opts) {
    const k = o.trim().toLowerCase()
    if (!k) continue
    count.set(k, (count.get(k) ?? 0) + 1)
  }
  const dups = new Set<string>()
  for (const [k, n] of count) {
    if (n > 1) dups.add(k)
  }
  return dups
}

function questionsHaveDuplicateOptions(questions: CreateSurveyInput["questions"]): number | null {
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    if ((q.type === "single" || q.type === "multiple") && Array.isArray(q.options)) {
      if (getDuplicateKeys(q.options).size > 0) return i
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const QUESTION_TYPE_LABELS: Record<typeof QUESTION_TYPES[number], string> = {
  text:      "Texto corto",
  textarea:  "Texto largo",
  single:    "Selección única",
  multiple:  "Selección múltiple",
  rating:    "Calificación (1-5)",
  yesno:     "Sí / No",
}

const DEFAULT_QUESTION: SurveyQuestionInput = {
  text:     "",
  type:     "text",
  options:  null,
  required: true,
  order:    0,
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SurveyBuilderProps {
  survey?: SurveyWithQuestions
}

// ---------------------------------------------------------------------------
// Options editor (sub-component to avoid re-renders)
// ---------------------------------------------------------------------------

interface OptionsEditorProps {
  questionIndex: number
  options: string[] | null | undefined
  onOptionsChange: (opts: string[]) => void
}

function OptionsEditor({ options, onOptionsChange }: OptionsEditorProps) {
  const safeOptions = options ?? ["", ""]
  const dupeKeys    = getDuplicateKeys(safeOptions)
  const hasDupes    = dupeKeys.size > 0

  function handleChange(i: number, value: string) {
    const next = [...safeOptions]
    next[i] = value
    onOptionsChange(next)
  }

  function handleAdd() {
    onOptionsChange([...safeOptions, ""])
  }

  function handleRemove(i: number) {
    if (safeOptions.length <= 2) return
    const next = safeOptions.filter((_, idx) => idx !== i)
    onOptionsChange(next)
  }

  return (
    <div className="space-y-2">
      <Label className="text-xs text-slate-500">Opciones de respuesta</Label>
      {safeOptions.map((opt, i) => {
        const isDupe = dupeKeys.has(opt.trim().toLowerCase()) && opt.trim() !== ""
        return (
          <div key={i} className="flex items-center gap-2">
            <span className="w-5 shrink-0 text-center text-xs font-medium text-slate-400">
              {i + 1}.
            </span>
            <Input
              value={opt}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={`Opción ${i + 1}`}
              className={
                "h-8 flex-1 text-sm " +
                (isDupe
                  ? "border-amber-400 bg-amber-50 focus-visible:ring-amber-400"
                  : "")
              }
              aria-invalid={isDupe}
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              disabled={safeOptions.length <= 2}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Eliminar opción"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      })}

      <button
        type="button"
        onClick={handleAdd}
        className="mt-1 flex items-center gap-1.5 text-xs font-medium text-una-secondary transition-colors hover:text-blue-700"
      >
        <Plus className="h-3.5 w-3.5" />
        Añadir opción
      </button>

      {hasDupes && (
        <div className="mt-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
          <p className="text-xs font-medium text-amber-700">
            Se encontraron alternativas repetidas. Revise las opciones ingresadas antes de guardar la pregunta.
          </p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Single question editor
// ---------------------------------------------------------------------------

interface QuestionEditorProps {
  index:         number
  totalQuestions: number
  control:       ReturnType<typeof useForm<CreateSurveyInput>>["control"]
  register:      ReturnType<typeof useForm<CreateSurveyInput>>["register"]
  setValue:      ReturnType<typeof useForm<CreateSurveyInput>>["setValue"]
  errors:        ReturnType<typeof useForm<CreateSurveyInput>>["formState"]["errors"]
  onRemove:      () => void
  onMoveUp:      () => void
  onMoveDown:    () => void
}

function QuestionEditor({
  index,
  totalQuestions,
  control,
  register,
  setValue,
  errors,
  onRemove,
  onMoveUp,
  onMoveDown,
}: QuestionEditorProps) {
  const type    = useWatch({ control, name: `questions.${index}.type` })   as typeof QUESTION_TYPES[number]
  const options = useWatch({ control, name: `questions.${index}.options` }) as string[] | null | undefined

  const hasOptions = type === "single" || type === "multiple"

  function handleTypeChange(newType: typeof QUESTION_TYPES[number]) {
    setValue(`questions.${index}.type`, newType, { shouldValidate: true })
    if (newType === "single" || newType === "multiple") {
      setValue(`questions.${index}.options`, ["", ""], { shouldValidate: false })
    } else {
      setValue(`questions.${index}.options`, null, { shouldValidate: false })
    }
  }

  const qErrors = errors.questions?.[index]

  return (
    <div className="group relative rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Question header */}
      <div className="flex items-center gap-2 rounded-t-xl border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        {/* Drag handle (visual only) */}
        <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-slate-300" />

        <span className="text-xs font-semibold text-slate-500">
          Pregunta #{index + 1}
        </span>

        <div className="ml-auto flex items-center gap-1">
          {/* Move up */}
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Mover arriba"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>

          {/* Move down */}
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === totalQuestions - 1}
            className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Mover abajo"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {/* Remove */}
          <button
            type="button"
            onClick={onRemove}
            disabled={totalQuestions <= 1}
            className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Eliminar pregunta"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Question body */}
      <div className="space-y-4 p-4">
        {/* Question text */}
        <div className="space-y-1.5">
          <Label htmlFor={`q-text-${index}`} className="text-sm">
            Texto de la pregunta <span className="text-red-500">*</span>
          </Label>
          <Input
            id={`q-text-${index}`}
            {...register(`questions.${index}.text`)}
            placeholder="Escribe la pregunta aquí..."
            className="h-10"
            aria-invalid={!!qErrors?.text}
          />
          {qErrors?.text && (
            <p className="text-xs text-red-500">{qErrors.text.message as string}</p>
          )}
        </div>

        {/* Type + Required row */}
        <div className="flex flex-wrap items-start gap-4">
          <div className="min-w-[180px] flex-1 space-y-1.5">
            <Label htmlFor={`q-type-${index}`} className="text-sm">
              Tipo de respuesta
            </Label>
            <select
              id={`q-type-${index}`}
              value={type}
              onChange={(e) => handleTypeChange(e.target.value as typeof QUESTION_TYPES[number])}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {QUESTION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {QUESTION_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex shrink-0 items-center gap-2 pt-7">
            <input
              id={`q-required-${index}`}
              type="checkbox"
              {...register(`questions.${index}.required`)}
              className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-una-secondary"
            />
            <Label htmlFor={`q-required-${index}`} className="cursor-pointer text-sm">
              Obligatoria
            </Label>
          </div>
        </div>

        {/* Options editor (only for single/multiple) */}
        {hasOptions && (
          <div className="rounded-lg bg-slate-50 p-3">
            <OptionsEditor
              questionIndex={index}
              options={options}
              onOptionsChange={(opts) =>
                setValue(`questions.${index}.options`, opts, { shouldValidate: false })
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main SurveyBuilder
// ---------------------------------------------------------------------------

export function SurveyBuilder({ survey }: SurveyBuilderProps) {
  const router   = useRouter()
  const isEdit   = !!survey

  // Build default values
  const defaultValues: CreateSurveyInput = survey
    ? {
        title:       survey.title,
        description: survey.description ?? null,
        isGlobal:    survey.isGlobal,
        schoolId:    survey.schoolId    ?? null,
        endsAt:      survey.endsAt
          ? new Date(survey.endsAt).toISOString().slice(0, 10)
          : null,
        questions: survey.questions.map((q, i) => ({
          id:       q.id,
          text:     q.text,
          type:     q.type as typeof QUESTION_TYPES[number],
          options:  Array.isArray(q.options) ? (q.options as string[]) : null,
          required: q.required,
          order:    i,
        })),
      }
    : {
        title:       "",
        description: null,
        isGlobal:    true,
        schoolId:    null,
        endsAt:      null,
        questions:   [{ ...DEFAULT_QUESTION, order: 0 }],
      }

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateSurveyInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver:      standardSchemaResolver(createSurveySchema) as any,
    defaultValues,
  })

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "questions",
  })

  async function onSubmit(data: CreateSurveyInput) {
    // Pre-validate: block if any question with options has duplicates
    const badIndex = questionsHaveDuplicateOptions(data.questions)
    if (badIndex !== null) {
      toast.error(
        `Pregunta #${badIndex + 1}: Se encontraron alternativas repetidas. Revise las opciones ingresadas antes de guardar la pregunta.`,
        { duration: 5000 },
      )
      return
    }

    // Assign order from array index before sending
    const payload: CreateSurveyInput = {
      ...data,
      questions: data.questions.map((q, i) => ({ ...q, order: i })),
    }

    const url    = isEdit ? `/api/admin/surveys/${survey.id}` : "/api/admin/surveys"
    const method = isEdit ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error ?? "Error al guardar la encuesta")
        return
      }

      toast.success(isEdit ? "Encuesta actualizada correctamente" : "Encuesta creada correctamente")
      router.push("/admin/encuestas")
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.")
    }
  }

  function handleAddQuestion() {
    append({ ...DEFAULT_QUESTION, order: fields.length })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — Survey info                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">Información de la encuesta</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Configura el título, alcance y duración de la encuesta.
          </p>
        </div>

        <div className="space-y-5 p-6">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Ej. Encuesta de empleabilidad 2025"
              className="h-10"
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">
              Descripción{" "}
              <span className="text-xs font-normal text-slate-400">(opcional)</span>
            </Label>
            <textarea
              id="description"
              {...register("description")}
              rows={3}
              placeholder="Describe el propósito de la encuesta..."
              className="flex w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* endsAt date */}
          <div className="space-y-1.5">
            <Label htmlFor="endsAt">
              Fecha de cierre{" "}
              <span className="text-xs font-normal text-slate-400">(opcional)</span>
            </Label>
            <Input
              id="endsAt"
              type="date"
              {...register("endsAt")}
              className="h-10 w-full max-w-xs"
            />
            {errors.endsAt && (
              <p className="text-xs text-red-500">{errors.endsAt.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — Questions builder                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Preguntas</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {fields.length} {fields.length === 1 ? "pregunta" : "preguntas"} configuradas
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAddQuestion}
            size="sm"
            className="bg-una-secondary hover:bg-blue-700 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar pregunta
          </Button>
        </div>

        <div className="space-y-4 p-6">
          {errors.questions && !Array.isArray(errors.questions) && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">
                {(errors.questions as { message?: string }).message}
              </p>
            </div>
          )}

          {fields.map((field, index) => (
            <QuestionEditor
              key={field.id}
              index={index}
              totalQuestions={fields.length}
              control={control}
              register={register}
              setValue={setValue}
              errors={errors}
              onRemove={() => remove(index)}
              onMoveUp={() => swap(index, index - 1)}
              onMoveDown={() => swap(index, index + 1)}
            />
          ))}

          {/* Empty state */}
          {fields.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-12 text-center">
              <p className="text-sm font-medium text-slate-500">Sin preguntas aún</p>
              <p className="mt-1 text-xs text-slate-400">
                Haz clic en &quot;Agregar pregunta&quot; para comenzar.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Submit                                                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center justify-end gap-3 pb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/encuestas")}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-una-primary hover:bg-[#162d4a] min-w-[160px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar encuesta"
          )}
        </Button>
      </div>
    </form>
  )
}
