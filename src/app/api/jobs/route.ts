import { NextRequest, NextResponse } from "next/server"
import { listJobsPublic }            from "@/lib/services/jobs.service"

export async function GET(request: NextRequest) {
  const sp        = request.nextUrl.searchParams
  const search    = sp.get("search")    ?? undefined
  const type      = sp.get("type")      ?? undefined
  const companyId = sp.get("companyId") ?? undefined
  const page      = Math.max(1, parseInt(sp.get("page") ?? "1"))
  const remoteStr = sp.get("isRemote")
  const isRemote  = remoteStr === "true" ? true : remoteStr === "false" ? false : undefined

  const data = await listJobsPublic({ search, type, isRemote, companyId, page })
  return NextResponse.json({ data })
}
