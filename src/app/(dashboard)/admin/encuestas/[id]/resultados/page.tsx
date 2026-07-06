import type { Metadata }  from "next"
import Link               from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft }      from "lucide-react"
import { getServerSession }   from "next-auth"
import { authOptions }        from "@/lib/auth"
import { getSurveyResults }   from "@/lib/services/surveys.service"
import { SurveyResultsView }  from "@/components/admin/surveys/survey-results"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const { survey } = await getSurveyResults(id)
  if (!survey) return { title: "Resultados" }
  return { title: `Resultados — ${survey.title}` }
}

export default async function SurveyResultsPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    redirect("/login")

  const { id } = await params
  const data = await getSurveyResults(id)

  if (!data.survey) notFound()

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <Link
          href="/admin/encuestas"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a encuestas
        </Link>
        <span className="text-xs text-slate-400">
          ID: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600">{id}</code>
        </span>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">{data.survey.title}</h1>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
              data.survey.isActive
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-slate-100 text-slate-500 ring-slate-200"
            }`}
          >
            {data.survey.isActive ? "Activa" : "Inactiva"}
          </span>
        </div>
        {data.survey.description && (
          <p className="mt-1 text-sm text-slate-500">{data.survey.description}</p>
        )}
      </div>

      <SurveyResultsView data={data} />
    </div>
  )
}
