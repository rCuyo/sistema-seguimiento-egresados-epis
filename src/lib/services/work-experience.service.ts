import { prisma } from "@/lib/prisma"
import type { WorkExperienceInput } from "@/lib/validations/work-experience"

export async function getWorkExperiences(graduateId: string) {
  return prisma.workExperience.findMany({
    where:   { graduateId },
    orderBy: [{ isCurrent: "desc" }, { startDate: "desc" }],
  })
}

export async function createWorkExperience(graduateId: string, data: WorkExperienceInput) {
  return prisma.workExperience.create({
    data: {
      graduateId,
      company:   data.company,
      position:  data.position,
      startDate: new Date(data.startDate),
      endDate:   data.endDate ? new Date(data.endDate) : null,
      isCurrent: data.isCurrent ?? false,
    },
  })
}

export async function updateWorkExperience(
  id:         string,
  graduateId: string,
  data:       WorkExperienceInput,
) {
  const existing = await prisma.workExperience.findFirst({ where: { id, graduateId } })
  if (!existing) return null

  return prisma.workExperience.update({
    where: { id },
    data: {
      company:   data.company,
      position:  data.position,
      startDate: new Date(data.startDate),
      endDate:   data.endDate ? new Date(data.endDate) : null,
      isCurrent: data.isCurrent ?? false,
    },
  })
}

export async function deleteWorkExperience(id: string, graduateId: string) {
  const existing = await prisma.workExperience.findFirst({ where: { id, graduateId } })
  if (!existing) return null

  return prisma.workExperience.delete({ where: { id } })
}

export type WorkExperienceItem = Awaited<ReturnType<typeof getWorkExperiences>>[number]
