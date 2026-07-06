import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { listSurveysForAdmin, createSurvey } from "@/lib/services/surveys.service"
import { createSurveySchema }        from "@/lib/validations/survey"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const surveys = await listSurveysForAdmin()
  return NextResponse.json({ data: surveys })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const body   = await request.json()
  const parsed = createSurveySchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  const survey = await createSurvey(parsed.data)
  return NextResponse.json({ data: survey }, { status: 201 })
}
