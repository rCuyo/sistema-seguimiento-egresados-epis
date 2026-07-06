import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { getJobForAdmin, updateJob, deleteJob } from "@/lib/services/jobs.service"
import { updateJobSchema }           from "@/lib/validations/job"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const { id } = await params
  const job = await getJobForAdmin(id)
  if (!job) return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 })
  return NextResponse.json({ data: job })
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Solo ADMIN puede editar ofertas" }, { status: 403 })

  const { id } = await params
  const body   = await request.json()
  const parsed = updateJobSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  const job = await updateJob(id, parsed.data)
  return NextResponse.json({ data: job })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Solo ADMIN puede eliminar ofertas" }, { status: 403 })

  const { id } = await params
  await deleteJob(id)
  return NextResponse.json({ ok: true })
}
