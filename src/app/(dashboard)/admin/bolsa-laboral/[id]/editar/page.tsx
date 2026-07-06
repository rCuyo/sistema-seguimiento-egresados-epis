import type { Metadata }   from "next"
import Link                 from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft }        from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import { getJobForAdmin, getCompaniesForSelect } from "@/lib/services/jobs.service"
import { JobForm }          from "@/components/admin/jobs/job-form"

export const dynamic = "force-dynamic"

interface PageProps { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const job    = await getJobForAdmin(id)
  return { title: job ? `Editar — ${job.title}` : "Editar oferta" }
}

export default async function EditarOfertaPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login")

  const { id } = await params
  const [job, companies] = await Promise.all([getJobForAdmin(id), getCompaniesForSelect()])
  if (!job) notFound()

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
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Editar Oferta</h1>
        <p className="mt-1 text-sm text-slate-500">{job.title} · {job.company.name}</p>
      </div>

      <JobForm job={job} companies={companies} />
    </div>
  )
}
