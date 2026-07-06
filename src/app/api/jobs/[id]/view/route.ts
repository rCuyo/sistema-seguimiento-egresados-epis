import { NextRequest, NextResponse } from "next/server"
import { incrementViewCount }        from "@/lib/services/jobs.service"

type Params = { params: Promise<{ id: string }> }

export async function POST(_req: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    await incrementViewCount(id)
  } catch {
    // Silently ignore — view tracking is best-effort
  }
  return NextResponse.json({ ok: true })
}
