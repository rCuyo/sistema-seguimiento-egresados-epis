import type { Metadata } from "next"
import { getServerSession }           from "next-auth"
import { notFound, redirect }         from "next/navigation"
import { authOptions }                from "@/lib/auth"
import { getGraduateDetailForAdmin }  from "@/lib/services/admin-graduates.service"
import { GraduateDetailView }         from "@/components/admin/graduates/graduate-detail-view"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const graduate = await getGraduateDetailForAdmin(id)
  if (!graduate) return { title: "Egresado no encontrado" }
  return { title: `${graduate.firstName} ${graduate.lastName} — Egresado` }
}

export default async function AdminEgresadoDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login")

  const { id } = await params
  const graduate = await getGraduateDetailForAdmin(id)
  if (!graduate) notFound()

  return <GraduateDetailView graduate={graduate} />
}
