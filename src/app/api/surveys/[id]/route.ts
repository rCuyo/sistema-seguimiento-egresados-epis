import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { getSurveyForResponse }      from "@/lib/services/surveys.service"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "GRADUATE")
    return NextResponse.json({ error: "Solo egresados pueden responder encuestas" }, { status: 403 })
  if (!session.user.graduateId)
    return NextResponse.json({ error: "Perfil de egresado no encontrado" }, { status: 404 })

  const { id } = await params
  const survey = await getSurveyForResponse(id, session.user.graduateId)
  if (!survey)
    return NextResponse.json({ error: "Encuesta no disponible o ya respondida" }, { status: 404 })

  return NextResponse.json({ data: survey })
}
