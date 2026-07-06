import { prisma } from "@/lib/prisma"
import type { UpdateProfileInput } from "@/lib/validations/graduate"
import { toTitleCase } from "@/lib/utils"

export async function getGraduateByUserId(userId: string) {
  return prisma.graduate.findUnique({
    where: { userId },
    include: {
      school: {
        select: {
          id:      true,
          name:    true,
          faculty: { select: { name: true } },
        },
      },
      user: { select: { email: true } },
    },
  })
}

export async function updateGraduateProfile(
  graduateId: string,
  userId:     string,
  data:       UpdateProfileInput
) {
  const owns = await prisma.graduate.findFirst({
    where:  { id: graduateId, userId },
    select: { id: true },
  })
  if (!owns) return null

  return prisma.graduate.update({
    where: { id: graduateId },
    data: {
      ...data,
      firstName:          toTitleCase(data.firstName),
      lastName:           toTitleCase(data.lastName),
      secondLastName:     data.secondLastName     ? toTitleCase(data.secondLastName) : null,
      phone:              data.phone              || null,
      institutionalEmail: data.institutionalEmail || null,
      personalEmail:      data.personalEmail      || null,
      maritalStatus:      data.maritalStatus      || null,
      linkedinUrl:        data.linkedinUrl        || null,
      bio:                data.bio                || null,
    },
  })
}
