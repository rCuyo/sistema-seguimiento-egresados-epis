"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { z } from "zod"
import { toTitleCase } from "@/lib/utils"

const RegisterSchema = z.object({
  email:                   z.string().email("Email inválido"),
  password:                z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  firstName:               z.string().min(2, "El nombre es requerido"),
  lastName:                z.string().min(2, "El apellido paterno es requerido"),
  secondLastName:          z.string().min(2, "El apellido materno es requerido").max(100),
  dni:                     z.string().length(8, "El DNI debe tener exactamente 8 dígitos"),
  institutionalEmail:      z.string().email("Correo institucional inválido").max(150).optional(),
  enrollmentCode:          z.string().max(20).optional(),
  admissionYear:           z.coerce.number().min(1990).max(2030).optional(),
  admissionSemester:       z.string().max(2).optional(),
  graduationYear:          z.coerce.number().min(1990).max(2030, "Año de egreso inválido"),
  graduationSemester:      z.string().max(2).optional(),
  firstEnrollmentYear:     z.coerce.number().min(1990).max(2030).optional(),
  firstEnrollmentSemester: z.string().max(2).optional(),
})

export type RegisterState      = { error: string } | { success: true } | null
export type RegisterModalState = RegisterState

function buildRaw(formData: FormData) {
  return {
    email:                   formData.get("email"),
    password:                formData.get("password"),
    firstName:               formData.get("firstName"),
    lastName:                formData.get("lastName"),
    secondLastName:          formData.get("secondLastName"),
    dni:                     formData.get("dni"),
    institutionalEmail:      formData.get("institutionalEmail")      || undefined,
    enrollmentCode:          formData.get("enrollmentCode")          || undefined,
    admissionYear:           formData.get("admissionYear")           || undefined,
    admissionSemester:       formData.get("admissionSemester")       || undefined,
    graduationYear:          formData.get("graduationYear"),
    graduationSemester:      formData.get("graduationSemester")      || undefined,
    firstEnrollmentYear:     formData.get("firstEnrollmentYear")     || undefined,
    firstEnrollmentSemester: formData.get("firstEnrollmentSemester") || undefined,
  }
}

function buildPeriod(year: number | undefined, semester: string | undefined): string | null {
  if (!year) return null
  return semester ? `${year}-${semester}` : String(year)
}

export async function registerGraduate(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = RegisterSchema.safeParse(buildRaw(formData))
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const {
    email, password, firstName, lastName, secondLastName,
    dni, institutionalEmail, enrollmentCode,
    admissionYear, admissionSemester,
    graduationYear, graduationSemester,
    firstEnrollmentYear, firstEnrollmentSemester,
  } = parsed.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) return { error: "Ya existe una cuenta con este email" }

  const existingDni = await prisma.graduate.findUnique({ where: { dni } })
  if (existingDni) return { error: "Ya existe un egresado registrado con ese DNI" }

  const school = await prisma.school.findFirst({ orderBy: { id: "asc" } })
  if (!school) return { error: "Error de configuración del sistema. Contacta al administrador." }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "GRADUATE",
      graduate: {
        create: {
          firstName:             toTitleCase(firstName),
          lastName:              toTitleCase(lastName),
          secondLastName:        toTitleCase(secondLastName),
          dni,
          institutionalEmail:    institutionalEmail || null,
          enrollmentCode:        enrollmentCode     || null,
          admissionPeriod:       buildPeriod(admissionYear, admissionSemester),
          graduationYear,
          graduationSemester:    graduationSemester || null,
          firstEnrollmentPeriod: buildPeriod(firstEnrollmentYear, firstEnrollmentSemester),
          schoolId: school.id,
          degree:   school.name,
        },
      },
    },
  })

  redirect("/login?registered=true")
}

export async function registerGraduateModal(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = RegisterSchema.safeParse(buildRaw(formData))
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const {
    email, password, firstName, lastName, secondLastName,
    dni, institutionalEmail, enrollmentCode,
    admissionYear, admissionSemester,
    graduationYear, graduationSemester,
    firstEnrollmentYear, firstEnrollmentSemester,
  } = parsed.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) return { error: "Ya existe una cuenta con este email" }

  const existingDni = await prisma.graduate.findUnique({ where: { dni } })
  if (existingDni) return { error: "Ya existe un egresado registrado con ese DNI" }

  const school = await prisma.school.findFirst({ orderBy: { id: "asc" } })
  if (!school) return { error: "Error de configuración del sistema. Contacta al administrador." }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "GRADUATE",
      graduate: {
        create: {
          firstName:             toTitleCase(firstName),
          lastName:              toTitleCase(lastName),
          secondLastName:        toTitleCase(secondLastName),
          dni,
          institutionalEmail:    institutionalEmail || null,
          enrollmentCode:        enrollmentCode     || null,
          admissionPeriod:       buildPeriod(admissionYear, admissionSemester),
          graduationYear,
          graduationSemester:    graduationSemester || null,
          firstEnrollmentPeriod: buildPeriod(firstEnrollmentYear, firstEnrollmentSemester),
          schoolId: school.id,
          degree:   school.name,
        },
      },
    },
  })

  return { success: true }
}
