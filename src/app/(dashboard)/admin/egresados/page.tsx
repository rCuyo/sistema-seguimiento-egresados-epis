import type { Metadata } from "next"
import { getServerSession }            from "next-auth"
import { redirect }                    from "next/navigation"
import { authOptions }                 from "@/lib/auth"
import {
  listGraduatesForAdmin,
  getGraduateStatsForAdmin,
} from "@/lib/services/admin-graduates.service"
import { GraduatesStats }      from "@/components/admin/graduates/graduates-stats"
import { GraduatesFilters }    from "@/components/admin/graduates/graduates-filters"
import { GraduatesTable }      from "@/components/admin/graduates/graduates-table"
import { GraduatesPagination } from "@/components/admin/graduates/graduates-pagination"

export const metadata: Metadata = { title: "Gestión de Egresados" }
export const dynamic = "force-dynamic"

const PAGE_SIZE = 12

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminEgresadosPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login")

  const sp = await searchParams

  function str(key: string) {
    const v = sp[key]
    return Array.isArray(v) ? v[0] : v
  }

  const page = Math.max(1, parseInt(str("page") ?? "1"))

  const [listResult, stats] = await Promise.all([
    listGraduatesForAdmin({
      search:   str("search"),
      status:   str("status"),
      year:     str("year"),
      page,
      pageSize: PAGE_SIZE,
    }),
    getGraduateStatsForAdmin(),
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Egresados</h1>
        <p className="mt-1 text-sm text-slate-500">
          Administra el directorio de egresados de la Escuela Profesional de Ingeniería de Sistemas.
        </p>
      </div>

      {/* Stats */}
      <GraduatesStats stats={stats} />

      {/* Filters (Client Component) */}
      <GraduatesFilters />

      {/* Table */}
      <GraduatesTable graduates={listResult.graduates} total={listResult.total} />

      {/* Pagination (Client Component) */}
      <GraduatesPagination
        page={listResult.page}
        totalPages={listResult.totalPages}
        total={listResult.total}
        pageSize={PAGE_SIZE}
      />
    </div>
  )
}
