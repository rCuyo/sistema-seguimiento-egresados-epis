import { z } from "zod"

export const JOB_TYPES = [
  "FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "PROFESSIONAL_INTERNSHIP",
] as const

export const MODALITY_VALUES = ["PRESENTIAL", "HYBRID", "REMOTE"] as const

export const APPLICATION_STATUSES = ["PENDING", "REVIEWED", "INTERVIEW", "ACCEPTED", "REJECTED"] as const

export const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME:               "Empleo (tiempo completo)",
  PART_TIME:               "Empleo (medio tiempo)",
  CONTRACT:                "Empleo (contrato / proyecto)",
  INTERNSHIP:              "Prácticas preprofesionales",
  PROFESSIONAL_INTERNSHIP: "Prácticas profesionales",
}

export const MODALITY_LABELS: Record<string, string> = {
  PRESENTIAL: "Presencial",
  HYBRID:     "Semipresencial (híbrida)",
  REMOTE:     "Remota",
}

export const APP_STATUS_LABELS: Record<string, string> = {
  PENDING:   "Pendiente",
  REVIEWED:  "En revisión",
  INTERVIEW: "Entrevista",
  ACCEPTED:  "Aceptado",
  REJECTED:  "Rechazado",
}

export const createJobSchema = z.object({
  companyId:    z.string().min(1, "Selecciona una empresa"),
  title:        z.string().min(3, "Mínimo 3 caracteres").max(200),
  description:  z.string().min(10, "Mínimo 10 caracteres"),
  requirements: z.string().optional().nullable(),
  location:     z.string().max(150).optional().nullable(),
  type:         z.enum(JOB_TYPES).default("FULL_TIME"),
  modality:     z.enum(MODALITY_VALUES).optional().nullable(),
  salary:       z.string().max(100).optional().nullable(),
  isRemote:     z.boolean().default(false),
  isActive:     z.boolean().default(true),
  externalUrl:  z.string().max(500).optional().nullable(),
  expiresAt:    z.string().optional().nullable(),
})

export const updateJobSchema = createJobSchema.partial()

export const applyJobSchema = z.object({
  coverLetter: z.string().max(2000).optional().nullable(),
})

export const updateStatusSchema = z.object({
  status: z.enum(APPLICATION_STATUSES),
})

export type CreateJobInput    = z.infer<typeof createJobSchema>
export type UpdateJobInput    = z.infer<typeof updateJobSchema>
export type ApplyJobInput     = z.infer<typeof applyJobSchema>
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>
