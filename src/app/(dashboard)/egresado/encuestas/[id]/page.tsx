import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import Link                  from "next/link"
import { authOptions }       from "@/lib/auth"
import { getSurveyForResponse } from "@/lib/services/surveys.service"
import { SurveyForm }           from "@/components/surveys/survey-form"
import { ArrowLeft, ClipboardList, AlertCircle } from "lucide-react"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ id: string }>
}

export default async function ResponderEncuestaPage({ params }: Props) {
  const { id } = await params

  const session = await getServerSession(authOptions)

  if (!session?.user)                   redirect("/login")
  if (session.user.role !== "GRADUATE") redirect("/")

  const graduateId = session.user.graduateId
  if (!graduateId) redirect("/egresado")

  const survey = await getSurveyForResponse(id, graduateId)

  /* Survey not available or already answered */
  if (!survey) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
            <AlertCircle className="h-8 w-8 text-amber-500" />
          </div>
        </div>
        <h1 className="mb-2 text-xl font-bold text-slate-900">
          Encuesta no disponible
        </h1>
        <p className="mb-8 text-sm text-slate-500">
          Esta encuesta ya fue respondida, está inactiva o no está disponible
          en este momento.
        </p>
        <Link
          href="/egresado/encuestas"
          className="inline-flex items-center gap-1.5 rounded-lg bg-una-secondary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a mis encuestas
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* ─── Back link ─── */}
      <Link
        href="/egresado/encuestas"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a mis encuestas
      </Link>

      {/* ─── Survey header ─── */}
      <div className="overflow-hidden rounded-xl border border-una-secondary/20 bg-gradient-to-br from-una-primary to-una-secondary p-6 text-white shadow-md">
        <div className="mb-3 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 opacity-80" />
          <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
            Encuesta
          </span>
        </div>
        <h1 className="mb-2 text-xl font-bold leading-snug">{survey.title}</h1>
        {survey.description && (
          <p className="text-sm leading-relaxed opacity-85">
            {survey.description}
          </p>
        )}
        <p className="mt-4 text-xs opacity-70">
          {survey.questions.length}{" "}
          {survey.questions.length === 1 ? "pregunta" : "preguntas"} en total
        </p>
      </div>

      {/* ─── Form ─── */}
      <SurveyForm survey={survey} />
    </div>
  )
}
