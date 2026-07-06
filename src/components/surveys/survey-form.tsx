"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SurveyForResponse } from "@/lib/services/surveys.service"

interface SurveyFormProps {
  survey: SurveyForResponse
}

type AnswerValue = string | string[] | number

export function SurveyForm({ survey }: SurveyFormProps) {
  const router = useRouter()

  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const { questions } = survey
  const total         = questions.length
  const answeredCount = questions.filter((q) => {
    const val = answers[q.id]
    if (val === undefined || val === null) return false
    if (typeof val === "string") return val.trim() !== ""
    if (Array.isArray(val)) return val.length > 0
    if (typeof val === "number") return val > 0
    return false
  }).length

  const progress = total > 0 ? Math.round((answeredCount / total) * 100) : 0

  function setAnswer(questionId: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    // Clear error on change
    setErrors((prev) => {
      if (!prev[questionId]) return prev
      const next = { ...prev }
      delete next[questionId]
      return next
    })
  }

  function validateBeforeSubmit(): boolean {
    const newErrors: Record<string, string> = {}
    for (const q of questions) {
      if (!q.required) continue
      const val = answers[q.id]
      if (val === undefined || val === null) {
        newErrors[q.id] = "Esta pregunta es obligatoria."
        continue
      }
      if (typeof val === "string" && val.trim() === "") {
        newErrors[q.id] = "Esta pregunta es obligatoria."
        continue
      }
      if (Array.isArray(val) && val.length === 0) {
        newErrors[q.id] = "Selecciona al menos una opción."
        continue
      }
      if (typeof val === "number" && val === 0) {
        newErrors[q.id] = "Esta pregunta es obligatoria."
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateBeforeSubmit()) {
      toast.error("Por favor responde todas las preguntas obligatorias.")
      return
    }

    setSubmitting(true)
    try {
      const answersPayload = questions
        .filter((q) => answers[q.id] !== undefined)
        .map((q) => ({
          questionId: q.id,
          value:      answers[q.id],
        }))

      const res = await fetch(`/api/surveys/${survey.id}/respond`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ answers: answersPayload }),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error ?? "Error al enviar la encuesta.")
        return
      }

      toast.success("¡Encuesta completada!")
      router.push("/egresado/encuestas")
      router.refresh()
    } catch {
      toast.error("Error de conexión. Intenta de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ─── Progress bar ─── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Progreso
          </span>
          <span className="text-sm font-semibold text-una-secondary">
            {answeredCount} de {total} preguntas
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-una-secondary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {answeredCount === total && total > 0 && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            ¡Todas las preguntas respondidas! Ya puedes enviar.
          </p>
        )}
      </div>

      {/* ─── Questions ─── */}
      <div className="space-y-5">
        {questions
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((question, index) => {
            const options = question.options as string[] | null | undefined

            return (
              <div
                key={question.id}
                className={cn(
                  "rounded-xl border bg-white p-5 shadow-sm transition-colors",
                  errors[question.id]
                    ? "border-red-300"
                    : "border-slate-200"
                )}
              >
                {/* Question header */}
                <div className="mb-4 flex items-start gap-2">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-una-secondary/10 text-xs font-bold text-una-secondary">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-snug text-slate-900">
                      {question.text}
                      {question.required && (
                        <span
                          className="ml-1.5 inline-flex items-center rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-500"
                          aria-label="Obligatoria"
                        >
                          Obligatoria
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Answer input by type */}
                <div className="pl-8">
                  {question.type === "text" && (
                    <input
                      type="text"
                      value={(answers[question.id] as string) ?? ""}
                      onChange={(e) => setAnswer(question.id, e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-una-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
                    />
                  )}

                  {question.type === "textarea" && (
                    <textarea
                      rows={4}
                      value={(answers[question.id] as string) ?? ""}
                      onChange={(e) => setAnswer(question.id, e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-una-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
                    />
                  )}

                  {question.type === "single" && options && (
                    <div className="space-y-2">
                      {options.map((option) => {
                        const selected = answers[question.id] === option
                        return (
                          <label
                            key={option}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors",
                              selected
                                ? "border-una-secondary bg-una-secondary/5 font-medium text-una-secondary"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                            )}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={selected}
                              onChange={() => setAnswer(question.id, option)}
                              className="accent-una-secondary"
                            />
                            {option}
                          </label>
                        )
                      })}
                    </div>
                  )}

                  {question.type === "multiple" && options && (
                    <div className="space-y-2">
                      {options.map((option) => {
                        const current = (answers[question.id] as string[]) ?? []
                        const checked  = current.includes(option)
                        return (
                          <label
                            key={option}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors",
                              checked
                                ? "border-una-secondary bg-una-secondary/5 font-medium text-una-secondary"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                            )}
                          >
                            <input
                              type="checkbox"
                              value={option}
                              checked={checked}
                              onChange={(e) => {
                                const prev = (answers[question.id] as string[]) ?? []
                                const next = e.target.checked
                                  ? [...prev, option]
                                  : prev.filter((v) => v !== option)
                                setAnswer(question.id, next)
                              }}
                              className="accent-una-secondary"
                            />
                            {option}
                          </label>
                        )
                      })}
                    </div>
                  )}

                  {question.type === "rating" && (
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => {
                        const current = (answers[question.id] as number) ?? 0
                        const active  = rating <= current
                        return (
                          <button
                            key={rating}
                            type="button"
                            onClick={() =>
                              setAnswer(
                                question.id,
                                current === rating ? 0 : rating
                              )
                            }
                            aria-label={`Calificación ${rating}`}
                            className={cn(
                              "flex h-11 w-11 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all",
                              active
                                ? "border-amber-400 bg-amber-400 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-400 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-500"
                            )}
                          >
                            {rating}
                          </button>
                        )
                      })}
                      <span className="ml-2 self-center text-xs text-slate-400">
                        {(answers[question.id] as number) > 0
                          ? `Seleccionado: ${answers[question.id]}`
                          : "Sin calificación"}
                      </span>
                    </div>
                  )}

                  {question.type === "yesno" && (
                    <div className="flex gap-3">
                      {(["Sí", "No"] as const).map((option) => {
                        const selected = answers[question.id] === option
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setAnswer(question.id, option)}
                            className={cn(
                              "flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition-all",
                              selected
                                ? option === "Sí"
                                  ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                                  : "border-red-400 bg-red-400 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            )}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Inline error */}
                {errors[question.id] && (
                  <p className="mt-2.5 pl-8 text-xs font-medium text-red-500">
                    {errors[question.id]}
                  </p>
                )}
              </div>
            )
          })}
      </div>

      {/* ─── Submit ─── */}
      <div className="sticky bottom-4 z-10">
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-una-secondary px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enviando respuestas…
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Enviar encuesta
            </>
          )}
        </button>
      </div>
    </form>
  )
}
