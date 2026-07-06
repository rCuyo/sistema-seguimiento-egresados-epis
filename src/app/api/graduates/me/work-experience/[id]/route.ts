import { NextResponse }    from "next/server"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import {
  updateWorkExperience,
  deleteWorkExperience,
} from "@/lib/services/work-experience.service"
import { workExperienceSchema } from "@/lib/validations/work-experience"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "GRADUATE")
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const graduateId = session.user.graduateId
  if (!graduateId)
    return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 })

  let body: unknown
  try   { body = await request.json() }
  catch { return NextResponse.json({ error: "JSON inválido" }, { status: 400 }) }

  const parsed = workExperienceSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 422 })

  const { id } = await params
  const data = await updateWorkExperience(id, graduateId, parsed.data)
  if (!data)
    return NextResponse.json({ error: "Experiencia no encontrada" }, { status: 404 })

  return NextResponse.json({ data })
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "GRADUATE")
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const graduateId = session.user.graduateId
  if (!graduateId)
    return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 })

  const { id } = await params
  const data = await deleteWorkExperience(id, graduateId)
  if (!data)
    return NextResponse.json({ error: "Experiencia no encontrada" }, { status: 404 })

  return NextResponse.json({ data })
}
