import { z } from "zod"

export const workExperienceSchema = z.object({
  company:   z.string().min(2, "Mínimo 2 caracteres").max(200),
  position:  z.string().min(2, "Mínimo 2 caracteres").max(200),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  endDate:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida").nullable().optional(),
  isCurrent: z.boolean().default(false),
})

export type WorkExperienceInput = z.infer<typeof workExperienceSchema>
