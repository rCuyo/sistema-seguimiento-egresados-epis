import { NextResponse }    from "next/server"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import { getGraduateDetailForAdmin } from "@/lib/services/admin-graduates.service"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const { id } = await params
  const graduate = await getGraduateDetailForAdmin(id)

  if (!graduate)
    return NextResponse.json({ error: "Egresado no encontrado" }, { status: 404 })

  return NextResponse.json({ data: graduate })
}
