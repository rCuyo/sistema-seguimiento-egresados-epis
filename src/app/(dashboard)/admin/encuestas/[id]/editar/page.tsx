import type { Metadata } from "next"
import { getServerSession }        from "next-auth"
import { notFound, redirect }      from "next/navigation"
import { authOptions }             from "@/lib/auth"
import { getSurveyWithQuestions }  from "@/lib/services/surveys.service"
import { SurveyBuilder }           from "@/components/admin/surveys/survey-builder"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id }  = await params
  const survey  = await getSurveyWithQuestions(id)
  if (!survey) return { title: "Encuesta no encontrada" }
  return { title: `Editar: ${survey.title}` }
}

export default async function EditarEncuestaPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role)) {
    redirect("/login")
  }

  const { id } = await params

  const survey = await getSurveyWithQuestions(id)

  if (!survey) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Editar Encuesta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Modifica el contenido y configuración de &quot;{survey.title}&quot;.
        </p>
      </div>

      <SurveyBuilder survey={survey} />
    </div>
  )
}
