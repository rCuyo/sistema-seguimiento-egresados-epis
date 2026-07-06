import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { listApplicationsForAdmin }  from "@/lib/services/jobs.service"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const sp     = request.nextUrl.searchParams
  const status  = sp.get("status")    ?? undefined
  const jobId   = sp.get("jobId")     ?? undefined
  const page    = Math.max(1, parseInt(sp.get("page") ?? "1"))

  const data = await listApplicationsForAdmin({ status, jobId, page })
  return NextResponse.json({ data })
}
