import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { submitSurveyResponse }      from "@/lib/services/surveys.service"
import { submitResponseSchema }      from "@/lib/validations/survey"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "GRADUATE")
    return NextResponse.json({ error: "Solo egresados pueden responder encuestas" }, { status: 403 })
  if (!session.user.graduateId)
    return NextResponse.json({ error: "Perfil de egresado no encontrado" }, { status: 404 })

  const { id } = await params
  const body   = await request.json()
  const parsed = submitResponseSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  const response = await submitSurveyResponse(id, session.user.graduateId, parsed.data)
  if (!response)
    return NextResponse.json({ error: "Ya respondiste esta encuesta" }, { status: 409 })

  return NextResponse.json({ data: response }, { status: 201 })
}
