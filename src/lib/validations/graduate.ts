import { z } from "zod"

export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "EMPLOYED",      label: "Empleado en relación de dependencia" },
  { value: "SELF_EMPLOYED", label: "Independiente / Emprendedor" },
  { value: "UNEMPLOYED",    label: "Desempleado" },
  { value: "SEEKING",       label: "Buscando empleo activamente" },
  { value: "STUDYING",      label: "Estudiando (posgrado u otra carrera)" },
] as const

export const MARITAL_STATUS_OPTIONS = [
  { value: "Soltero/a",   label: "Soltero/a" },
  { value: "Casado/a",    label: "Casado/a" },
  { value: "Conviviente", label: "Conviviente" },
  { value: "Divorciado/a", label: "Divorciado/a" },
  { value: "Viudo/a",     label: "Viudo/a" },
] as const

export const GRADUATION_SEMESTER_OPTIONS = [
  { value: "I",  label: "I (primer semestre)" },
  { value: "II", label: "II (segundo semestre)" },
] as const

export const updateProfileSchema = z.object({
  firstName:        z.string().min(2, "Mínimo 2 caracteres").max(100),
  lastName:         z.string().min(2, "Mínimo 2 caracteres").max(100),
  secondLastName:   z.string().max(100).optional().nullable(),
  phone:            z.string().max(20).optional().nullable(),
  institutionalEmail: z.string().email("Correo institucional inválido").max(150).optional().nullable().or(z.literal("")),
  personalEmail:    z.string().email("Email inválido").max(150).optional().nullable().or(z.literal("")),
  maritalStatus:    z.string().max(50).optional().nullable(),
  bio:              z.string().max(500, "Máximo 500 caracteres").optional().nullable(),
  employmentStatus: z.enum([
    "EMPLOYED",
    "SELF_EMPLOYED",
    "UNEMPLOYED",
    "SEEKING",
    "STUDYING",
  ]),
  currentPosition: z.string().max(150).optional().nullable(),
  currentCompany:  z.string().max(150).optional().nullable(),
  city:            z.string().max(100).optional().nullable(),
  country:         z.string().max(100).default("Perú"),
  linkedinUrl:     z.string().optional().nullable(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
