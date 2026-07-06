import { z } from "zod"

export const QUESTION_TYPES = ["text", "textarea", "single", "multiple", "rating", "yesno"] as const
export type QuestionType = typeof QUESTION_TYPES[number]

export const surveyQuestionSchema = z.object({
  id:       z.string().optional(),
  text:     z.string().min(1, "La pregunta no puede estar vacía"),
  type:     z.enum(QUESTION_TYPES),
  options:  z.array(z.string().min(1)).optional().nullable(),
  required: z.boolean().default(true),
  order:    z.number().int().min(0),
}).superRefine((q, ctx) => {
  if (
    (q.type === "single" || q.type === "multiple") &&
    Array.isArray(q.options) &&
    q.options.length > 0
  ) {
    const seen = new Set<string>()
    for (const opt of q.options) {
      const key = opt.trim().toLowerCase()
      if (!key) continue
      if (seen.has(key)) {
        ctx.addIssue({
          code:    z.ZodIssueCode.custom,
          path:    ["options"],
          message: "Se encontraron alternativas repetidas. Revise las opciones ingresadas antes de guardar la pregunta.",
        })
        return
      }
      seen.add(key)
    }
  }
})

export const createSurveySchema = z.object({
  title:       z.string().min(3, "Mínimo 3 caracteres").max(200),
  description: z.string().max(1000).optional().nullable(),
  isGlobal:    z.boolean().default(true),
  schoolId:    z.string().optional().nullable(),
  endsAt:      z.string().optional().nullable(),
  questions:   z.array(surveyQuestionSchema).min(1, "Agrega al menos una pregunta"),
})

export const updateSurveySchema = createSurveySchema.partial().extend({
  // All fields optional for update
})

export const answerSchema = z.object({
  questionId: z.string(),
  value:      z.union([z.string(), z.number(), z.array(z.string())]),
})

export const submitResponseSchema = z.object({
  answers: z.array(answerSchema).min(1),
})

export type CreateSurveyInput   = z.infer<typeof createSurveySchema>
export type UpdateSurveyInput   = z.infer<typeof updateSurveySchema>
export type SubmitResponseInput = z.infer<typeof submitResponseSchema>
export type SurveyQuestionInput = z.infer<typeof surveyQuestionSchema>
