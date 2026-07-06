import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { applyToJob }                from "@/lib/services/jobs.service"
import { applyJobSchema }            from "@/lib/validations/job"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "GRADUATE")
    return NextResponse.json({ error: "Solo egresados pueden postularse" }, { status: 403 })
  if (!session.user.graduateId)
    return NextResponse.json({ error: "Perfil de egresado no encontrado" }, { status: 404 })

  const { id } = await params
  const body   = await request.json()
  const parsed = applyJobSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  const result = await applyToJob(id, session.user.graduateId, parsed.data)
  if ("error" in result) {
    const status = result.error === "already_applied" ? 409 : 404
    const msg    = result.error === "already_applied"
      ? "Ya te has postulado a esta oferta"
      : "Esta oferta no está disponible"
    return NextResponse.json({ error: msg }, { status })
  }

  return NextResponse.json({ data: result }, { status: 201 })
}
