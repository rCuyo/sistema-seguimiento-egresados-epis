import { NextRequest, NextResponse } from "next/server"
import { getJobDetailPublic }        from "@/lib/services/jobs.service"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job    = await getJobDetailPublic(id)
  if (!job) return NextResponse.json({ error: "Oferta no encontrada" }, { status: 404 })
  return NextResponse.json({ data: job })
}
