import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { getSurveyResults }          from "@/lib/services/surveys.service"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const { id } = await params
  const results = await getSurveyResults(id)
  if (!results.survey) return NextResponse.json({ error: "Encuesta no encontrada" }, { status: 404 })

  return NextResponse.json({ data: results })
}
