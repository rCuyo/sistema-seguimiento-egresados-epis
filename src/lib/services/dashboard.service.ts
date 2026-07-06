import { prisma } from "@/lib/prisma"

export async function getGraduateDashboardData(userId: string) {
  const graduate = await prisma.graduate.findUnique({
    where: { userId },
    select: {
      id:               true,
      firstName:        true,
      lastName:         true,
      degree:           true,
      bio:              true,
      photo:            true,
      employmentStatus: true,
      currentPosition:  true,
      currentCompany:   true,
      city:             true,
      country:          true,
      graduationYear:   true,
      linkedinUrl:      true,
      phone:            true,
      updatedAt:        true,
      school: {
        select: {
          name:    true,
          faculty: { select: { name: true } },
        },
      },
      user: { select: { email: true } },
    },
  })

  if (!graduate) return null

  const [
    applicationsCount,
    surveysAnsweredCount,
    activeJobsCount,
    pendingSurveys,
    recentJobs,
    recentApplications,
    recentSurveyResponses,
  ] = await Promise.all([
    prisma.jobApplication.count({ where: { graduateId: graduate.id } }),
    prisma.surveyResponse.count({ where: { graduateId: graduate.id } }),
    prisma.jobOffer.count({ where: { isActive: true } }),
    prisma.survey.findMany({
      where: {
        isActive:  true,
        responses: { none: { graduateId: graduate.id } },
      },
      select:  { id: true, title: true, description: true, endsAt: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.jobOffer.findMany({
      where:   { isActive: true },
      orderBy: { createdAt: "desc" },
      take:    3,
      select: {
        id:        true,
        title:     true,
        location:  true,
        type:      true,
        salary:    true,
        isRemote:  true,
        createdAt: true,
        company:   { select: { name: true, sector: true } },
      },
    }),
    prisma.jobApplication.findMany({
      where:   { graduateId: graduate.id },
      orderBy: { appliedAt: "desc" },
      take:    5,
      select: {
        appliedAt: true,
        status:    true,
        job: {
          select: {
            title:   true,
            company: { select: { name: true } },
          },
        },
      },
    }),
    prisma.surveyResponse.findMany({
      where:   { graduateId: graduate.id },
      orderBy: { completedAt: "desc" },
      take:    3,
      select: {
        completedAt: true,
        survey:      { select: { title: true } },
      },
    }),
  ])

  const activity = [
    ...recentApplications.map((app) => ({
      type:     "application" as const,
      title:    app.job.title,
      subtitle: app.job.company.name,
      status:   app.status,
      date:     app.appliedAt,
    })),
    ...recentSurveyResponses.map((r) => ({
      type:     "survey" as const,
      title:    r.survey.title,
      subtitle: "Encuesta completada",
      status:   "COMPLETED",
      date:     r.completedAt,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)

  return {
    profile: graduate,
    stats: {
      applicationsCount,
      surveysAnsweredCount,
      activeJobsCount,
      pendingSurveysCount: pendingSurveys.length,
    },
    pendingSurveys,
    recentJobs,
    activity,
  }
}

export type GraduateDashboardData = NonNullable<
  Awaited<ReturnType<typeof getGraduateDashboardData>>
>
