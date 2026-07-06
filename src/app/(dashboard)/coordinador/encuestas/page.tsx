import type { Metadata }    from "next"
import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import { ClipboardList, MessageSquare, HelpCircle } from "lucide-react"
import { authOptions }          from "@/lib/auth"
import { listSurveysForAdmin }  from "@/lib/services/surveys.service"
import { cn }                   from "@/lib/utils"

export const metadata: Metadata = { title: "Encuestas | Coordinador · EPIS" }
export const dynamic = "force-dynamic"

function formatDate(date: Date | null | undefined) {
  if (!date) return "Sin fecha"
  return new Date(date).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })
}

export default async function CoordinadorEncuestasPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "PRACTICE_COORDINATOR") redirect("/login")

  const surveys = await listSurveysForAdmin()

  const total    = surveys.length
  const active   = surveys.filter((s) => s.isActive).length
  const withResp = surveys.filter((s) => s._count.responses > 0).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Encuestas</h1>
        <p className="mt-1 text-sm text-slate-500">
          Supervisión y seguimiento de encuestas institucionales
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-slate-900">{total}</p>
          <p className="mt-0.5 text-xs text-slate-500">Total</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">{active}</p>
          <p className="mt-0.5 text-xs text-slate-500">Activas</p>
        </div>
        <div className="rounded-xl border bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-una-secondary">{withResp}</p>
          <p className="mt-0.5 text-xs text-slate-500">Con respuestas</p>
        </div>
      </div>

      {/* Survey list */}
      {surveys.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-16 shadow-sm">
          <ClipboardList className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm font-medium text-slate-500">Sin encuestas registradas</p>
          <p className="mt-1 text-xs text-slate-400">Solicita al administrador la creación de encuestas.</p>
        </div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Encuesta</th>
                <th className="px-4 py-3 text-center">Preguntas</th>
                <th className="px-4 py-3 text-center">Respuestas</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Vence</th>
                <th className="px-4 py-3">Alcance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {surveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900 leading-snug">{survey.title}</p>
                    {survey.description && (
                      <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{survey.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 text-slate-600">
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                      {survey._count.questions}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 text-slate-600">
                      <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                      {survey._count.responses}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                      survey.isActive
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : "bg-slate-100 text-slate-500 ring-slate-200"
                    )}>
                      {survey.isActive ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 text-xs">
                    {formatDate(survey.endsAt)}
                  </td>
                  <td className="px-4 py-3.5">
                    {survey.isGlobal ? (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-inset ring-blue-200">
                        Global
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        {survey.school?.name ?? "—"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">
        Para crear o editar encuestas contacta al Administrador del sistema.
      </p>
    </div>
  )
}
