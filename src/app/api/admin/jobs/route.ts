import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { listJobsForAdmin, createJob, getJobStats, getCompaniesForSelect } from "@/lib/services/jobs.service"
import { createJobSchema }           from "@/lib/validations/job"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const sp       = request.nextUrl.searchParams
  const page     = Math.max(1, parseInt(sp.get("page") ?? "1"))
  const search   = sp.get("search")    ?? undefined
  const companyId = sp.get("companyId") ?? undefined
  const isActiveStr = sp.get("isActive")
  const isActive = isActiveStr === "true" ? true : isActiveStr === "false" ? false : undefined

  const [data, stats, companies] = await Promise.all([
    listJobsForAdmin({ search, companyId, isActive, page }),
    getJobStats(),
    getCompaniesForSelect(),
  ])

  return NextResponse.json({ data, stats, companies })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Solo ADMIN puede crear ofertas" }, { status: 403 })

  const body   = await request.json()
  const parsed = createJobSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  const job = await createJob(parsed.data)
  return NextResponse.json({ data: job }, { status: 201 })
}
