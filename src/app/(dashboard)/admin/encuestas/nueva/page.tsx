import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import { authOptions }      from "@/lib/auth"
import { SurveyBuilder }    from "@/components/admin/surveys/survey-builder"

export const metadata: Metadata = { title: "Nueva Encuesta" }

export default async function NuevaEncuestaPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || !["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role)) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Nueva Encuesta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Diseña un formulario de seguimiento para egresados de Ingeniería de Sistemas.
        </p>
      </div>

      <SurveyBuilder />
    </div>
  )
}
