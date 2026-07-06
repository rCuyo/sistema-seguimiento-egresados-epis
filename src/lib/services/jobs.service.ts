import { prisma } from "@/lib/prisma"
import { type JobType } from "@/generated/prisma"
import type { CreateJobInput, UpdateJobInput, ApplyJobInput } from "@/lib/validations/job"

const PAGE_SIZE = 15

// ─── Admin ──────────────────────────────────────────────────────────────────

export async function listJobsForAdmin({
  search,
  companyId,
  isActive,
  page = 1,
  pageSize = PAGE_SIZE,
}: {
  search?:    string
  companyId?: string
  isActive?:  boolean
  page?:      number
  pageSize?:  number
}) {
  const where = {
    ...(search    && { title: { contains: search, mode: "insensitive" as const } }),
    ...(companyId && { companyId }),
    ...(isActive  !== undefined && { isActive }),
  }

  const [jobs, total] = await Promise.all([
    prisma.jobOffer.findMany({
      where,
      include: {
        company: { select: { name: true, sector: true } },
        _count:  { select: { applications: true, clicks: true } },
      },
      orderBy: { createdAt: "desc" },
      skip:    (page - 1) * pageSize,
      take:    pageSize,
    }),
    prisma.jobOffer.count({ where }),
  ])

  return { jobs, total, page, pageSize, totalPages: Math.ceil(total / pageSize) || 1 }
}

export async function getJobForAdmin(id: string) {
  return prisma.jobOffer.findUnique({
    where:   { id },
    include: {
      company:      true,
      _count:       { select: { applications: true, clicks: true } },
      applications: {
        include: {
          graduate: { select: { firstName: true, lastName: true, dni: true } },
        },
        orderBy: { appliedAt: "desc" },
        take:    10,
      },
    },
  })
}

export async function createJob(data: CreateJobInput) {
  const expiresAt = data.expiresAt ? new Date(data.expiresAt) : null
  const modality  = data.modality ?? null
  const isRemote  = modality ? modality === "REMOTE" : (data.isRemote ?? false)

  return prisma.jobOffer.create({
    data: {
      companyId:    data.companyId,
      title:        data.title,
      description:  data.description,
      requirements: data.requirements  ?? null,
      location:     data.location      ?? null,
      type:         data.type as JobType,
      modality,
      salary:       data.salary        ?? null,
      isRemote,
      isActive:     data.isActive,
      externalUrl:  data.externalUrl   ?? null,
      expiresAt,
    },
    include: { company: true },
  })
}

export async function updateJob(id: string, data: UpdateJobInput) {
  const expiresAt =
    data.expiresAt !== undefined
      ? data.expiresAt ? new Date(data.expiresAt) : null
      : undefined

  const modality = data.modality !== undefined ? (data.modality ?? null) : undefined
  const isRemote =
    modality !== undefined
      ? modality === "REMOTE"
      : data.isRemote !== undefined ? data.isRemote : undefined

  return prisma.jobOffer.update({
    where: { id },
    data: {
      ...(data.companyId    !== undefined && { companyId:    data.companyId }),
      ...(data.title        !== undefined && { title:        data.title }),
      ...(data.description  !== undefined && { description:  data.description }),
      ...(data.requirements !== undefined && { requirements: data.requirements ?? null }),
      ...(data.location     !== undefined && { location:     data.location     ?? null }),
      ...(data.type         !== undefined && { type:         data.type as JobType }),
      ...(modality          !== undefined && { modality }),
      ...(data.salary       !== undefined && { salary:       data.salary       ?? null }),
      ...(isRemote          !== undefined && { isRemote }),
      ...(data.isActive     !== undefined && { isActive:     data.isActive }),
      ...(data.externalUrl  !== undefined && { externalUrl:  data.externalUrl  ?? null }),
      ...(expiresAt         !== undefined && { expiresAt }),
    },
    include: { company: true },
  })
}

export async function deleteJob(id: string) {
  return prisma.jobOffer.delete({ where: { id } })
}

export async function toggleJobStatus(id: string) {
  const job = await prisma.jobOffer.findUnique({ where: { id }, select: { isActive: true } })
  return prisma.jobOffer.update({ where: { id }, data: { isActive: !job?.isActive } })
}

export async function getCompaniesForSelect() {
  return prisma.company.findMany({
    select:  { id: true, name: true, sector: true },
    orderBy: { name: "asc" },
  })
}

export async function getJobStats() {
  const [totalJobs, activeJobs, totalApplications, companiesCount, viewsAgg, totalClicks] =
    await Promise.all([
      prisma.jobOffer.count(),
      prisma.jobOffer.count({ where: { isActive: true } }),
      prisma.jobApplication.count(),
      prisma.company.count(),
      prisma.jobOffer.aggregate({ _sum: { viewCount: true } }),
      prisma.jobClick.count(),
    ])

  const totalViews      = viewsAgg._sum.viewCount ?? 0
  const interactionRate = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0

  return { totalJobs, activeJobs, totalApplications, companiesCount, totalViews, totalClicks, interactionRate }
}

export async function getJobInteractionStats() {
  const [topByViews, topByClicks, viewsAgg, totalClicks] = await Promise.all([
    prisma.jobOffer.findMany({
      where:   { viewCount: { gt: 0 } },
      orderBy: { viewCount: "desc" },
      take:    5,
      select:  { id: true, title: true, viewCount: true },
    }),
    prisma.jobClick.groupBy({
      by:      ["jobId"],
      _count:  { id: true },
      orderBy: { _count: { id: "desc" } },
      take:    5,
    }),
    prisma.jobOffer.aggregate({ _sum: { viewCount: true } }),
    prisma.jobClick.count(),
  ])

  const clickJobIds = topByClicks.map((c) => c.jobId)
  const clickJobs   = await prisma.jobOffer.findMany({
    where:  { id: { in: clickJobIds } },
    select: { id: true, title: true },
  })
  const clickJobMap = Object.fromEntries(clickJobs.map((j) => [j.id, j.title]))

  const totalViews      = viewsAgg._sum.viewCount ?? 0
  const interactionRate = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0

  return {
    totalViews,
    totalClicks,
    interactionRate,
    topByViews,
    topByClicks: topByClicks.map((c) => ({
      jobId:  c.jobId,
      title:  clickJobMap[c.jobId] ?? "",
      clicks: c._count.id,
    })),
  }
}

export async function listApplicationsForAdmin({
  status,
  jobId,
  page = 1,
  pageSize = 20,
}: {
  status?:   string
  jobId?:    string
  page?:     number
  pageSize?: number
}) {
  const where = {
    ...(status && { status }),
    ...(jobId  && { jobId }),
  }

  const [applications, total] = await Promise.all([
    prisma.jobApplication.findMany({
      where,
      include: {
        graduate: {
          select: {
            firstName: true,
            lastName:  true,
            dni:       true,
            school:    { select: { name: true, faculty: { select: { name: true } } } },
          },
        },
        job: {
          select: {
            title:   true,
            company: { select: { name: true } },
          },
        },
      },
      orderBy: { appliedAt: "desc" },
      skip:    (page - 1) * pageSize,
      take:    pageSize,
    }),
    prisma.jobApplication.count({ where }),
  ])

  return { applications, total, page, pageSize, totalPages: Math.ceil(total / pageSize) || 1 }
}

export async function updateApplicationStatus(id: string, status: string) {
  return prisma.jobApplication.update({ where: { id }, data: { status } })
}

// ─── View & Click tracking ───────────────────────────────────────────────────

export async function incrementViewCount(id: string) {
  return prisma.jobOffer.update({
    where: { id },
    data:  { viewCount: { increment: 1 } },
    select: { id: true, viewCount: true },
  })
}

export async function recordJobClick(jobId: string, userId?: string | null) {
  return prisma.jobClick.create({
    data: { jobId, userId: userId ?? null },
    select: { id: true },
  })
}

// ─── Public / Graduate ───────────────────────────────────────────────────────

export async function listJobsPublic({
  search,
  type,
  isRemote,
  companyId,
  page = 1,
  pageSize = 12,
}: {
  search?:    string
  type?:      string
  isRemote?:  boolean
  companyId?: string
  page?:      number
  pageSize?:  number
}) {
  const now   = new Date()
  const where = {
    isActive:  true,
    OR:        [{ expiresAt: null }, { expiresAt: { gte: now } }],
    ...(search    && { title: { contains: search, mode: "insensitive" as const } }),
    ...(type      && { type: type as JobType }),
    ...(isRemote  !== undefined && { isRemote }),
    ...(companyId && { companyId }),
  }

  const [jobs, total] = await Promise.all([
    prisma.jobOffer.findMany({
      where,
      include: { company: { select: { name: true, sector: true, logo: true } } },
      orderBy: { createdAt: "desc" },
      skip:    (page - 1) * pageSize,
      take:    pageSize,
    }),
    prisma.jobOffer.count({ where }),
  ])

  return { jobs, total, page, pageSize, totalPages: Math.ceil(total / pageSize) || 1 }
}

export async function getJobDetailPublic(id: string) {
  const now = new Date()
  return prisma.jobOffer.findFirst({
    where: {
      id,
      isActive: true,
      OR: [{ expiresAt: null }, { expiresAt: { gte: now } }],
    },
    include: {
      company: {
        select: { name: true, sector: true, website: true, description: true, isVerified: true },
      },
    },
  })
}

export async function getGraduateApplications(graduateId: string) {
  return prisma.jobApplication.findMany({
    where:   { graduateId },
    include: {
      job: {
        select: {
          id:        true,
          title:     true,
          isActive:  true,
          expiresAt: true,
          company:   { select: { name: true, sector: true } },
        },
      },
    },
    orderBy: { appliedAt: "desc" },
  })
}

export async function applyToJob(
  jobId:      string,
  graduateId: string,
  data:       ApplyJobInput
): Promise<{ error: "already_applied" | "job_unavailable" } | { id: string }> {
  const existing = await prisma.jobApplication.findUnique({
    where: { jobId_graduateId: { jobId, graduateId } },
  })
  if (existing) return { error: "already_applied" }

  const now = new Date()
  const job = await prisma.jobOffer.findFirst({
    where: { id: jobId, isActive: true, OR: [{ expiresAt: null }, { expiresAt: { gte: now } }] },
    select: { id: true },
  })
  if (!job) return { error: "job_unavailable" }

  const application = await prisma.jobApplication.create({
    data: { jobId, graduateId, coverLetter: data.coverLetter ?? null },
  })
  return { id: application.id }
}

// ─── Inferred types ──────────────────────────────────────────────────────────

export type JobListItem             = Awaited<ReturnType<typeof listJobsForAdmin>>["jobs"][number]
export type JobDetail               = NonNullable<Awaited<ReturnType<typeof getJobForAdmin>>>
export type JobPublicItem           = Awaited<ReturnType<typeof listJobsPublic>>["jobs"][number]
export type JobPublicDetail         = NonNullable<Awaited<ReturnType<typeof getJobDetailPublic>>>
export type ApplicationListItem     = Awaited<ReturnType<typeof listApplicationsForAdmin>>["applications"][number]
export type GraduateApplication     = Awaited<ReturnType<typeof getGraduateApplications>>[number]
export type JobStats                = Awaited<ReturnType<typeof getJobStats>>
export type JobInteractionStats     = Awaited<ReturnType<typeof getJobInteractionStats>>
