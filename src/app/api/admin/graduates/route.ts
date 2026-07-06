import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import {
  listGraduatesForAdmin,
  getGraduateStatsForAdmin,
} from "@/lib/services/admin-graduates.service"

const PAGE_SIZE = 12

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const sp   = request.nextUrl.searchParams
  const page = Math.max(1, parseInt(sp.get("page") ?? "1"))

  const [data, stats] = await Promise.all([
    listGraduatesForAdmin({
      search:    sp.get("search")    ?? undefined,
      facultyId: sp.get("facultyId") ?? undefined,
      schoolId:  sp.get("schoolId")  ?? undefined,
      status:    sp.get("status")    ?? undefined,
      year:      sp.get("year")      ?? undefined,
      page,
      pageSize:  PAGE_SIZE,
    }),
    getGraduateStatsForAdmin(),
  ])

  return NextResponse.json({ data, stats })
}
