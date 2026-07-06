import { prisma } from "@/lib/prisma"

export async function getLandingStats() {
  const [
    totalGraduates,
    employed,
    selfEmployed,
    totalCompanies,
    activeJobs,
    totalSchools,
    totalResponses,
  ] = await Promise.all([
    prisma.graduate.count(),
    prisma.graduate.count({ where: { employmentStatus: "EMPLOYED"      } }),
    prisma.graduate.count({ where: { employmentStatus: "SELF_EMPLOYED" } }),
    prisma.company.count(),
    prisma.jobOffer.count({ where: { isActive: true } }),
    prisma.school.count(),
    prisma.surveyResponse.count(),
  ])

  const employmentRate =
    totalGraduates > 0
      ? Math.round(((employed + selfEmployed) / totalGraduates) * 100)
      : 0

  return {
    totalGraduates,
    totalCompanies,
    activeJobs,
    totalSchools,
    totalResponses,
    employmentRate,
  }
}

export type LandingStats = Awaited<ReturnType<typeof getLandingStats>>
