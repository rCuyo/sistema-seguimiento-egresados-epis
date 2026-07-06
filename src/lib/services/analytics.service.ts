import { prisma } from "@/lib/prisma"

const EMPLOYMENT_LABELS: Record<string, string> = {
  EMPLOYED:      "Empleado",
  SELF_EMPLOYED: "Independiente",
  UNEMPLOYED:    "Desempleado",
  SEEKING:       "Buscando empleo",
  STUDYING:      "Estudiando",
}

// ─── Filters ────────────────────────────────────────────────────────────────

export interface AnalyticsFilters {
  facultyId?: string
  schoolId?:  string
  year?:      number
  status?:    string
}

function buildGraduateWhere(filters: AnalyticsFilters) {
  return {
    ...(filters.schoolId  && { schoolId: filters.schoolId }),
    ...(filters.facultyId && { school: { facultyId: filters.facultyId } }),
    ...(filters.year      && { graduationYear: filters.year }),
    ...(filters.status    && { employmentStatus: filters.status as never }),
  }
}

// ─── KPIs ───────────────────────────────────────────────────────────────────

export async function getGlobalKPIs(filters: AnalyticsFilters = {}) {
  const where = buildGraduateWhere(filters)
  const now   = new Date()
  const thisYear = now.getFullYear()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    totalGraduates,
    employed,
    selfEmployed,
    seeking,
    unemployed,
    totalSurveyResponses,
    activeSurveys,
    activeJobs,
    totalApplications,
    totalCompanies,
    newThisMonth,
  ] = await Promise.all([
    prisma.graduate.count({ where }),
    prisma.graduate.count({ where: { ...where, employmentStatus: "EMPLOYED"      } }),
    prisma.graduate.count({ where: { ...where, employmentStatus: "SELF_EMPLOYED" } }),
    prisma.graduate.count({ where: { ...where, employmentStatus: "SEEKING"       } }),
    prisma.graduate.count({ where: { ...where, employmentStatus: "UNEMPLOYED"    } }),
    prisma.surveyResponse.count(),
    prisma.survey.count({ where: { isActive: true } }),
    prisma.jobOffer.count({ where: { isActive: true, OR: [{ expiresAt: null }, { expiresAt: { gte: now } }] } }),
    prisma.jobApplication.count(),
    prisma.company.count(),
    prisma.graduate.count({ where: { ...where, createdAt: { gte: startOfMonth } } }),
  ])

  const employmentRate = totalGraduates > 0
    ? Math.round(((employed + selfEmployed) / totalGraduates) * 100)
    : 0

  return {
    totalGraduates,
    employmentRate,
    employed,
    selfEmployed,
    seeking,
    unemployed,
    totalSurveyResponses,
    activeSurveys,
    activeJobs,
    totalApplications,
    totalCompanies,
    newThisMonth,
  }
}

// ─── Employment status distribution ────────────────────────────────────────

export async function getEmploymentStatusDist(filters: AnalyticsFilters = {}) {
  const where = buildGraduateWhere(filters)
  const groups = await prisma.graduate.groupBy({
    by:      ["employmentStatus"],
    where,
    _count:  { id: true },
    orderBy: { _count: { id: "desc" } },
  })
  return groups.map((g) => ({
    status: g.employmentStatus,
    label:  EMPLOYMENT_LABELS[g.employmentStatus] ?? g.employmentStatus,
    count:  g._count.id,
  }))
}

// ─── Graduates by faculty ───────────────────────────────────────────────────

export async function getGraduatesByFaculty(filters: AnalyticsFilters = {}) {
  const where = buildGraduateWhere(filters)
  const faculties = await prisma.faculty.findMany({
    select: {
      name:    true,
      schools: {
        select: {
          _count: { select: { graduates: { where } } },
        },
      },
    },
    orderBy: { name: "asc" },
  })

  return faculties
    .map((f) => ({
      faculty: f.name,
      count:   f.schools.reduce((sum, s) => sum + s._count.graduates, 0),
    }))
    .filter((f) => f.count > 0)
    .sort((a, b) => b.count - a.count)
}

// ─── Graduates by school ────────────────────────────────────────────────────

export async function getGraduatesBySchool(filters: AnalyticsFilters = {}) {
  const where = buildGraduateWhere(filters)
  const schools = await prisma.school.findMany({
    select: {
      name:    true,
      faculty: { select: { name: true } },
      _count:  { select: { graduates: { where } } },
    },
    orderBy: { name: "asc" },
  })

  return schools
    .map((s) => ({
      school:  s.name,
      faculty: s.faculty.name,
      count:   s._count.graduates,
    }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)
}

// ─── Graduation by year trend ───────────────────────────────────────────────

export async function getGraduationByYear(filters: AnalyticsFilters = {}) {
  const where = buildGraduateWhere(filters)
  const groups = await prisma.graduate.groupBy({
    by:      ["graduationYear"],
    where,
    _count:  { id: true },
    orderBy: { graduationYear: "asc" },
  })
  return groups.map((g) => ({ year: g.graduationYear, count: g._count.id }))
}

// ─── Employment rate by school ──────────────────────────────────────────────

export async function getEmploymentBySchool(filters: AnalyticsFilters = {}) {
  const where = buildGraduateWhere(filters)
  const schools = await prisma.school.findMany({
    select: {
      name:      true,
      graduates: {
        where,
        select: { employmentStatus: true },
      },
    },
    orderBy: { name: "asc" },
  })

  return schools
    .map((s) => {
      const total    = s.graduates.length
      const employed = s.graduates.filter(
        (g) => g.employmentStatus === "EMPLOYED" || g.employmentStatus === "SELF_EMPLOYED"
      ).length
      return {
        school:   s.name,
        total,
        employed,
        rate:     total > 0 ? Math.round((employed / total) * 100) : 0,
      }
    })
    .filter((s) => s.total > 0)
    .sort((a, b) => b.rate - a.rate)
}

// ─── Top employers (where graduates currently work) ─────────────────────────

export async function getTopEmployers() {
  const groups = await prisma.graduate.groupBy({
    by:      ["currentCompany"],
    where:   { currentCompany: { not: null } },
    _count:  { id: true },
    orderBy: { _count: { id: "desc" } },
    take:    10,
  })
  return groups
    .filter((g) => g.currentCompany)
    .map((g) => ({ company: g.currentCompany!, count: g._count.id }))
}

// ─── Job applications by status ─────────────────────────────────────────────

const APPLICATION_STATUS_LABELS: Record<string, string> = {
  PENDING:   "Pendiente",
  REVIEWED:  "Revisado",
  INTERVIEW: "Entrevista",
  ACCEPTED:  "Aceptado",
  REJECTED:  "Rechazado",
}

export async function getApplicationStatusDist() {
  const groups = await prisma.jobApplication.groupBy({
    by:      ["status"],
    _count:  { id: true },
    orderBy: { _count: { id: "desc" } },
  })
  return groups.map((g) => ({
    status: g.status,
    label:  APPLICATION_STATUS_LABELS[g.status] ?? g.status,
    count:  g._count.id,
  }))
}

// ─── Companies by sector ────────────────────────────────────────────────────

export async function getCompaniesBySector() {
  const groups = await prisma.company.groupBy({
    by:      ["sector"],
    _count:  { id: true },
    orderBy: { _count: { id: "desc" } },
  })
  return groups.map((g) => ({
    sector: g.sector ?? "Sin sector",
    count:  g._count.id,
  }))
}

// ─── Survey participation ───────────────────────────────────────────────────

export async function getSurveyParticipation() {
  const totalGraduates = await prisma.graduate.count()

  const surveys = await prisma.survey.findMany({
    select: {
      title:    true,
      _count:   { select: { responses: true } },
    },
    orderBy: { createdAt: "desc" },
    take:    8,
  })

  return surveys.map((s) => ({
    survey:    s.title.length > 40 ? s.title.slice(0, 40) + "…" : s.title,
    responses: s._count.responses,
    rate:      totalGraduates > 0
      ? Math.round((s._count.responses / totalGraduates) * 100)
      : 0,
  }))
}

// ─── Full analytics bundle ──────────────────────────────────────────────────

export async function getFullAnalytics(filters: AnalyticsFilters = {}) {
  const [
    kpis,
    statusDist,
    byYear,
    topEmployers,
    applicationStats,
    bySector,
    surveyParticipation,
  ] = await Promise.all([
    getGlobalKPIs(filters),
    getEmploymentStatusDist(filters),
    getGraduationByYear(filters),
    getTopEmployers(),
    getApplicationStatusDist(),
    getCompaniesBySector(),
    getSurveyParticipation(),
  ])

  return {
    kpis,
    statusDist,
    byYear,
    topEmployers,
    applicationStats,
    bySector,
    surveyParticipation,
  }
}

// ─── Raw data for exports ───────────────────────────────────────────────────

export async function getGraduatesForExport(filters: AnalyticsFilters = {}) {
  const where = buildGraduateWhere(filters)
  return prisma.graduate.findMany({
    where,
    select: {
      firstName:             true,
      lastName:              true,
      secondLastName:        true,
      dni:                   true,
      enrollmentCode:        true,
      admissionPeriod:       true,
      graduationYear:        true,
      graduationSemester:    true,
      firstEnrollmentPeriod: true,
      degree:                true,
      institutionalEmail:    true,
      personalEmail:         true,
      maritalStatus:         true,
      employmentStatus:      true,
      currentPosition:       true,
      currentCompany:        true,
      city:                  true,
      country:               true,
      createdAt:             true,
      school: { select: { name: true, faculty: { select: { name: true } } } },
      user:   { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getApplicationsForExport() {
  return prisma.jobApplication.findMany({
    select: {
      status:    true,
      appliedAt: true,
      coverLetter: true,
      graduate: { select: { firstName: true, lastName: true, dni: true } },
      job:      { select: { title: true, company: { select: { name: true } } } },
    },
    orderBy: { appliedAt: "desc" },
  })
}

export async function getSurveyResponsesForExport() {
  return prisma.surveyResponse.findMany({
    select: {
      completedAt: true,
      graduate: { select: { firstName: true, lastName: true, dni: true } },
      survey:   { select: { title: true } },
    },
    orderBy: { completedAt: "desc" },
  })
}

export async function getJobsForExport() {
  return prisma.jobOffer.findMany({
    select: {
      title:     true,
      type:      true,
      location:  true,
      salary:    true,
      isRemote:  true,
      isActive:  true,
      createdAt: true,
      expiresAt: true,
      company:   { select: { name: true, sector: true } },
      _count:    { select: { applications: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}

export type FullAnalytics = Awaited<ReturnType<typeof getFullAnalytics>>
export type AnalyticsKPIs = Awaited<ReturnType<typeof getGlobalKPIs>>
