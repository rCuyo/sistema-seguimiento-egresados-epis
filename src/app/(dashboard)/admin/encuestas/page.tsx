import type { Metadata } from "next"
import Link              from "next/link"
import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import { Plus, ClipboardList, CheckCircle2, Users } from "lucide-react"
import { authOptions }              from "@/lib/auth"
import { listSurveysForAdmin }      from "@/lib/services/surveys.service"
import { StatCard }                 from "@/components/dashboard/stat-card"
import { SurveysList }              from "@/components/admin/surveys/surveys-list"

export const metadata: Metadata = { title: "Encuestas" }
export const dynamic = "force-dynamic"

export default async function AdminEncuestasPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || !["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role)) {
    redirect("/login")
  }

  const surveys = await listSurveysForAdmin()

  const total          = surveys.length
  const active         = surveys.filter((s) => s.isActive).length
  const totalResponses = surveys.reduce((sum, s) => sum + s._count.responses, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Encuestas</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gestiona las encuestas de seguimiento de egresados.
          </p>
        </div>
        <Link
          href="/admin/encuestas/nueva"
          className="inline-flex items-center gap-2 rounded-lg bg-una-secondary px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-una-secondary"
        >
          <Plus className="h-4 w-4" />
          Nueva encuesta
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total encuestas"
          value={total}
          description="Registradas en el sistema"
          icon={ClipboardList}
          variant="blue"
        />
        <StatCard
          title="Activas"
          value={active}
          description={`${total - active} inactiva${total - active !== 1 ? "s" : ""}`}
          icon={CheckCircle2}
          variant="green"
        />
        <StatCard
          title="Total respuestas"
          value={totalResponses.toLocaleString("es-PE")}
          description="Respuestas recibidas"
          icon={Users}
          variant="violet"
        />
      </div>

      {/* Surveys list */}
      <SurveysList surveys={surveys} />
    </div>
  )
}
