import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import {
  getSurveyWithQuestions,
  updateSurvey,
  deleteSurvey,
} from "@/lib/services/surveys.service"
import { updateSurveySchema } from "@/lib/validations/survey"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const { id } = await params
  const survey = await getSurveyWithQuestions(id)
  if (!survey) return NextResponse.json({ error: "Encuesta no encontrada" }, { status: 404 })

  return NextResponse.json({ data: survey })
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const { id } = await params
  const body   = await request.json()
  const parsed = updateSurveySchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  const survey = await updateSurvey(id, parsed.data)
  return NextResponse.json({ data: survey })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (session.user.role !== "ADMIN")
    return NextResponse.json({ error: "Solo ADMIN puede eliminar encuestas" }, { status: 403 })

  const { id } = await params
  await deleteSurvey(id)
  return NextResponse.json({ ok: true })
}
