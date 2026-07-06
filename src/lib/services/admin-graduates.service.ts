import { prisma } from "@/lib/prisma"
import { type EmploymentStatus } from "@/generated/prisma"

export interface GraduatesListQuery {
  search?:    string
  facultyId?: string
  schoolId?:  string
  status?:    string
  year?:      string
  page:       number
  pageSize:   number
}

export async function listGraduatesForAdmin({
  search,
  facultyId,
  schoolId,
  status,
  year,
  page,
  pageSize,
}: GraduatesListQuery) {
  const where = {
    ...(search && {
      OR: [
        { firstName:      { contains: search, mode: "insensitive" as const } },
        { lastName:       { contains: search, mode: "insensitive" as const } },
        { secondLastName: { contains: search, mode: "insensitive" as const } },
        { dni:            { contains: search, mode: "insensitive" as const } },
        { enrollmentCode: { contains: search, mode: "insensitive" as const } },
        { user:           { email: { contains: search, mode: "insensitive" as const } } },
      ],
    }),
    ...(schoolId  && { schoolId }),
    ...(facultyId && { school: { facultyId } }),
    ...(status    && { employmentStatus: status as EmploymentStatus }),
    ...(year      && { graduationYear: parseInt(year) }),
  }

  const [graduates, total] = await Promise.all([
    prisma.graduate.findMany({
      where,
      select: {
        id:                    true,
        firstName:             true,
        lastName:              true,
        secondLastName:        true,
        dni:                   true,
        enrollmentCode:        true,
        photo:                 true,
        employmentStatus:      true,
        currentPosition:       true,
        currentCompany:        true,
        city:                  true,
        graduationYear:        true,
        graduationSemester:    true,
        admissionPeriod:       true,
        createdAt:             true,
        school: {
          select: {
            name:    true,
            faculty: { select: { name: true } },
          },
        },
        user: { select: { email: true, isActive: true } },
      },
      orderBy: { createdAt: "desc" },
      skip:    (page - 1) * pageSize,
      take:    pageSize,
    }),
    prisma.graduate.count({ where }),
  ])

  return {
    graduates,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  }
}

export async function getGraduateStatsForAdmin() {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [total, employed, seeking, thisMonth] = await Promise.all([
    prisma.graduate.count(),
    prisma.graduate.count({ where: { employmentStatus: "EMPLOYED" } }),
    prisma.graduate.count({ where: { employmentStatus: "SEEKING"  } }),
    prisma.graduate.count({ where: { createdAt: { gte: startOfMonth } } }),
  ])

  return { total, employed, seeking, thisMonth }
}

export async function getFacultiesAndSchoolsForFilters() {
  const [faculties, schools] = await Promise.all([
    prisma.faculty.findMany({
      select:  { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.school.findMany({
      select:  { id: true, name: true, facultyId: true },
      orderBy: { name: "asc" },
    }),
  ])
  return { faculties, schools }
}

export async function getGraduateDetailForAdmin(id: string) {
  return prisma.graduate.findUnique({
    where: { id },
    include: {
      school: { include: { faculty: true } },
      user:   { select: { email: true, createdAt: true, isActive: true } },
      workExperiences: { orderBy: { startDate: "desc" } },
      applications: {
        include: {
          job: {
            select: {
              title:   true,
              type:    true,
              company: { select: { name: true, sector: true } },
            },
          },
        },
        orderBy: { appliedAt: "desc" },
        take:    10,
      },
      surveyResponses: {
        include: { survey: { select: { title: true } } },
        orderBy: { completedAt: "desc" },
        take:    5,
      },
    },
  })
}

export type GraduateListItem   = Awaited<ReturnType<typeof listGraduatesForAdmin>>["graduates"][number]
export type GraduateDetail     = NonNullable<Awaited<ReturnType<typeof getGraduateDetailForAdmin>>>
export type GraduateAdminStats = Awaited<ReturnType<typeof getGraduateStatsForAdmin>>
