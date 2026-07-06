import { NextResponse }    from "next/server"
import { getServerSession } from "next-auth"
import { authOptions }      from "@/lib/auth"
import { getGraduateDashboardData } from "@/lib/services/dashboard.service"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "GRADUATE")
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const data = await getGraduateDashboardData(session.user.id)
  if (!data)
    return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 })

  return NextResponse.json({ data })
}
