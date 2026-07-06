import type { Metadata }   from "next"
import Link                 from "next/link"
import { redirect }         from "next/navigation"
import { ArrowLeft }        from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import { getCompaniesForSelect } from "@/lib/services/jobs.service"
import { JobForm }          from "@/components/admin/jobs/job-form"

export const metadata: Metadata = { title: "Nueva Oferta Laboral" }
export const dynamic = "force-dynamic"

export default async function NuevaOfertaPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login")

  const companies = await getCompaniesForSelect()

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/bolsa-laboral"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a bolsa laboral
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Nueva Oferta Laboral</h1>
        <p className="mt-1 text-sm text-slate-500">Publica una nueva oportunidad de empleo para los egresados.</p>
      </div>

      <JobForm companies={companies} />
    </div>
  )
}
