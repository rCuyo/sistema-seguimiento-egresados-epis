import type { Metadata }   from "next"
import { redirect }         from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import { listApplicationsForAdmin } from "@/lib/services/jobs.service"
import { ApplicationsList }         from "@/components/admin/applications/applications-list"

export const metadata: Metadata = { title: "Postulaciones" }
export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminPostulacionesPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role)) redirect("/login")

  const sp = await searchParams
  function str(k: string) { const v = sp[k]; return Array.isArray(v) ? v[0] : v }

  const page   = Math.max(1, parseInt(str("page") ?? "1"))
  const status = str("status")
  const jobId  = str("jobId")

  const result = await listApplicationsForAdmin({ status, jobId, page })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Postulaciones</h1>
        <p className="mt-1 text-sm text-slate-500">
          Gestiona las postulaciones de egresados a las ofertas laborales.
        </p>
      </div>

      <ApplicationsList applications={result.applications} total={result.total} />

      {result.totalPages > 1 && (
        <div className="text-center text-xs text-slate-400">
          Página {result.page} de {result.totalPages}
        </div>
      )}
    </div>
  )
}
