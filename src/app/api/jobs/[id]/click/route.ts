import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import { recordJobClick }            from "@/lib/services/jobs.service"

type Params = { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const { id }    = await params
  const session   = await getServerSession(authOptions)
  const userId    = session?.user?.id ?? null
  try {
    await recordJobClick(id, userId)
  } catch {
    // Silently ignore — click tracking is best-effort
  }
  return NextResponse.json({ ok: true })
}
