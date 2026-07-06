import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { getFullAnalytics }          from "@/lib/services/analytics.service"
import type { AnalyticsFilters }     from "@/lib/services/analytics.service"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const sp = request.nextUrl.searchParams

  const filters: AnalyticsFilters = {
    facultyId: sp.get("facultyId") ?? undefined,
    schoolId:  sp.get("schoolId")  ?? undefined,
    year:      sp.get("year")      ? parseInt(sp.get("year")!) : undefined,
    status:    sp.get("status")    ?? undefined,
  }

  const data = await getFullAnalytics(filters)
  return NextResponse.json({ data })
}
