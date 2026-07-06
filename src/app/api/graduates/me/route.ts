import { NextResponse }    from "next/server"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import {
  getGraduateByUserId,
  updateGraduateProfile,
} from "@/lib/services/graduate.service"
import { updateProfileSchema } from "@/lib/validations/graduate"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "GRADUATE")
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const graduate = await getGraduateByUserId(session.user.id)
  if (!graduate)
    return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 })

  return NextResponse.json({ data: graduate })
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "GRADUATE")
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  let body: unknown
  try   { body = await request.json() }
  catch { return NextResponse.json({ error: "JSON inválido" }, { status: 400 }) }

  const parsed = updateProfileSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 422 })

  const graduate = await getGraduateByUserId(session.user.id)
  if (!graduate)
    return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 })

  const updated = await updateGraduateProfile(graduate.id, session.user.id, parsed.data)
  if (!updated)
    return NextResponse.json({ error: "Sin permiso para editar este perfil" }, { status: 403 })

  return NextResponse.json({ data: updated })
}
