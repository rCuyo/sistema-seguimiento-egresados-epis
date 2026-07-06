import Link from "next/link"
import { CheckCircle2, ClipboardList, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GraduateSurveyData } from "@/lib/services/surveys.service"

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("es-PE", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  })
}

function isExpiringSoon(date: Date): boolean {
  const diff = new Date(date).getTime() - Date.now()
  return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000
}

interface GraduateSurveysListProps {
  data: GraduateSurveyData
}

export function GraduateSurveysList({ data }: GraduateSurveysListProps) {
  const { pending, completed } = data

  return (
    <div className="space-y-8">
      {/* ─── Section A: Pendientes ─── */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Pendientes</h2>
          {pending.length > 0 && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              {pending.length}
            </span>
          )}
        </div>

        {pending.length === 0 ? (
          <div className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50/60 px-6 py-5 dark:border-emerald-800/50 dark:bg-emerald-900/20">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-800/50">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                ¡Estás al día!
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                No tienes encuestas pendientes.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((survey) => {
              const expiring = survey.endsAt ? isExpiringSoon(survey.endsAt) : false

              return (
                <div
                  key={survey.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
                      {survey.title}
                    </h3>
                    {survey.description && (
                      <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                        {survey.description}
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <ClipboardList className="h-3 w-3" />
                        {survey._count.questions}{" "}
                        {survey._count.questions === 1 ? "pregunta" : "preguntas"}
                      </span>
                      {survey.endsAt && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                            expiring
                              ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          )}
                        >
                          <Clock className="h-3 w-3" />
                          Cierra el {formatDate(survey.endsAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 px-5 py-3.5 dark:border-slate-700">
                    <Link
                      href={`/egresado/encuestas/${survey.id}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-una-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Responder encuesta
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ─── Section B: Completadas ─── */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Completadas</h2>
          {completed.length > 0 && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              {completed.length}
            </span>
          )}
        </div>

        {completed.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Aún no has completado ninguna encuesta.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <ul className="divide-y divide-slate-100 dark:divide-slate-700">
              {completed.map((response) => (
                <li
                  key={response.id}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                      {response.survey.title}
                    </p>
                    {response.survey.description && (
                      <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                        {response.survey.description}
                      </p>
                    )}
                  </div>
                  <time className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                    {formatDate(response.completedAt)}
                  </time>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
