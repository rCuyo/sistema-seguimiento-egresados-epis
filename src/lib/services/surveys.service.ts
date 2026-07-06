import { prisma }  from "@/lib/prisma"
import { Prisma }   from "@/generated/prisma"
import type { CreateSurveyInput, UpdateSurveyInput, SubmitResponseInput } from "@/lib/validations/survey"

// ---------------------------------------------------------------------------
// Admin functions
// ---------------------------------------------------------------------------

export async function listSurveysForAdmin() {
  return prisma.survey.findMany({
    include: {
      _count: { select: { questions: true, responses: true } },
      school: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getSurveyWithQuestions(id: string) {
  return prisma.survey.findUnique({
    where: { id },
    include: {
      questions: { orderBy: { order: "asc" } },
      school:    { select: { name: true } },
      _count:    { select: { responses: true } },
    },
  })
}

export async function createSurvey(data: CreateSurveyInput) {
  const endsAt = data.endsAt ? new Date(data.endsAt) : null

  return prisma.$transaction(async (tx) => {
    const survey = await tx.survey.create({
      data: {
        title:       data.title,
        description: data.description ?? null,
        isGlobal:    data.isGlobal,
        schoolId:    data.schoolId ?? null,
        endsAt,
      },
    })

    await tx.surveyQuestion.createMany({
      data: data.questions.map((q) => ({
        surveyId: survey.id,
        text:     q.text,
        type:     q.type,
        options:  q.options ?? Prisma.DbNull,
        required: q.required,
        order:    q.order,
      })),
    })

    return tx.survey.findUnique({
      where:   { id: survey.id },
      include: { questions: { orderBy: { order: "asc" } } },
    })
  })
}

export async function updateSurvey(id: string, data: UpdateSurveyInput) {
  const endsAt =
    data.endsAt !== undefined
      ? data.endsAt
        ? new Date(data.endsAt)
        : null
      : undefined

  return prisma.$transaction(async (tx) => {
    await tx.survey.update({
      where: { id },
      data: {
        ...(data.title       !== undefined && { title:       data.title }),
        ...(data.description !== undefined && { description: data.description ?? null }),
        ...(data.isGlobal    !== undefined && { isGlobal:    data.isGlobal }),
        ...(data.schoolId    !== undefined && { schoolId:    data.schoolId ?? null }),
        ...(endsAt           !== undefined && { endsAt }),
      },
    })

    if (data.questions !== undefined) {
      await tx.surveyQuestion.deleteMany({ where: { surveyId: id } })

      await tx.surveyQuestion.createMany({
        data: data.questions.map((q) => ({
          surveyId: id,
          text:     q.text,
          type:     q.type,
          options:  q.options ?? Prisma.DbNull,
          required: q.required,
          order:    q.order,
        })),
      })
    }

    return tx.survey.findUnique({
      where:   { id },
      include: { questions: { orderBy: { order: "asc" } } },
    })
  })
}

export async function deleteSurvey(id: string) {
  return prisma.survey.delete({ where: { id } })
}

export async function toggleSurveyStatus(id: string) {
  const survey = await prisma.survey.findUnique({
    where:  { id },
    select: { isActive: true },
  })
  return prisma.survey.update({
    where: { id },
    data:  { isActive: !survey?.isActive },
  })
}

export async function getSurveyResults(id: string) {
  const survey = await prisma.survey.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          answers: { select: { value: true } },
        },
      },
      _count: { select: { responses: true } },
    },
  })

  const totalGraduates = await prisma.graduate.count()

  return { survey, totalGraduates }
}

// ---------------------------------------------------------------------------
// Graduate functions
// ---------------------------------------------------------------------------

export async function getSurveysForGraduate(graduateId: string) {
  const [pending, completed] = await Promise.all([
    prisma.survey.findMany({
      where: {
        isActive:  true,
        responses: { none: { graduateId } },
        OR: [
          { endsAt: null },
          { endsAt: { gte: new Date() } },
        ],
      },
      include:  { _count: { select: { questions: true } } },
      orderBy:  { createdAt: "desc" },
    }),
    prisma.surveyResponse.findMany({
      where:   { graduateId },
      include: {
        survey: { select: { id: true, title: true, description: true } },
      },
      orderBy: { completedAt: "desc" },
    }),
  ])

  return { pending, completed }
}

export async function getSurveyForResponse(surveyId: string, graduateId: string) {
  const alreadyAnswered = await prisma.surveyResponse.findUnique({
    where: { surveyId_graduateId: { surveyId, graduateId } },
  })
  if (alreadyAnswered) return null

  const survey = await prisma.survey.findFirst({
    where: {
      id:       surveyId,
      isActive: true,
      OR: [
        { endsAt: null },
        { endsAt: { gte: new Date() } },
      ],
    },
    include: { questions: { orderBy: { order: "asc" } } },
  })

  return survey
}

export async function submitSurveyResponse(
  surveyId:   string,
  graduateId: string,
  data:       SubmitResponseInput
) {
  const existing = await prisma.surveyResponse.findUnique({
    where: { surveyId_graduateId: { surveyId, graduateId } },
  })
  if (existing) return null

  return prisma.$transaction(async (tx) => {
    const response = await tx.surveyResponse.create({
      data: { surveyId, graduateId },
    })

    await tx.surveyAnswer.createMany({
      data: data.answers.map((a) => ({
        responseId: response.id,
        questionId: a.questionId,
        value:      a.value,
      })),
    })

    return response
  })
}

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type SurveyListItem      = Awaited<ReturnType<typeof listSurveysForAdmin>>[number]
export type SurveyWithQuestions = NonNullable<Awaited<ReturnType<typeof getSurveyWithQuestions>>>
export type SurveyResults       = Awaited<ReturnType<typeof getSurveyResults>>
export type GraduateSurveyData  = Awaited<ReturnType<typeof getSurveysForGraduate>>
export type SurveyForResponse   = NonNullable<Awaited<ReturnType<typeof getSurveyForResponse>>>
