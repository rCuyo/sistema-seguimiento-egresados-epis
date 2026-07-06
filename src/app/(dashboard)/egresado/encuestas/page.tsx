import type { Metadata }   from "next"
import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import { authOptions }      from "@/lib/auth"
import { getSurveysForGraduate } from "@/lib/services/surveys.service"
import { GraduateSurveysList }   from "@/components/surveys/graduate-surveys-list"
import { ClipboardList }         from "lucide-react"

export const metadata: Metadata = { title: "Mis Encuestas" }

export const dynamic = "force-dynamic"

export default async function EgresadoEncuestasPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user)                   redirect("/login")
  if (session.user.role !== "GRADUATE") redirect("/")

  const graduateId = session.user.graduateId
  if (!graduateId) redirect("/egresado")

  const data = await getSurveysForGraduate(graduateId)

  const pendingCount   = data.pending.length
  const completedCount = data.completed.length

  return (
    <div className="space-y-6">
      {/* ─── Page header ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-una-primary/10">
            <ClipboardList className="h-5 w-5 text-una-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Mis Encuestas</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Completa las encuestas para ayudarnos a mejorar.
            </p>
          </div>
        </div>

        {/* Count badges */}
        <div className="flex shrink-0 flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs text-white">
              {pendingCount}
            </span>
            pendientes
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
              {completedCount}
            </span>
            completadas
          </span>
        </div>
      </div>

      {/* ─── Surveys list ─── */}
      <GraduateSurveysList data={data} />
    </div>
  )
}
