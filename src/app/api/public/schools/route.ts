import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const schools = await prisma.school.findMany({
    select: { id: true, name: true, faculty: { select: { name: true } } },
    orderBy: { name: "asc" },
  })
  return NextResponse.json(schools)
}
