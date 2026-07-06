"use client"

import { useActionState } from "react"
import Link from "next/link"
import { GraduationCap, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import { Label }  from "@/components/ui/label"
import { registerGraduate, type RegisterState } from "@/lib/actions/auth.actions"

const currentYear = new Date().getFullYear()

const SemesterSelect = ({ id, name, label, required }: {
  id: string; name: string; label: string; required?: boolean
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>
      {label}
      {!required && <span className="ml-1 text-xs font-normal text-slate-400">(opcional)</span>}
    </Label>
    <select
      id={id}
      name={name}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <option value="">— Semestre —</option>
      <option value="I">I (primer semestre)</option>
      <option value="II">II (segundo semestre)</option>
    </select>
  </div>
)

export function RegistroForm() {
  const [state, action, pending] = useActionState<RegisterState, FormData>(
    registerGraduate,
    null
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg space-y-6">

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-una-primary">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Registro de Egresado</h1>
          <p className="mt-1 text-sm text-slate-500">
            Crea tu cuenta en la Plataforma de Egresados · Ing. Sistemas UNAP
          </p>
        </div>

        <form action={action} className="rounded-xl border bg-white p-6 shadow-sm space-y-5">

          {state && "error" in state && state.error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {state.error}
            </div>
          )}

          {/* ── Datos personales ───────────────────────────────────────── */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-wide text-slate-400 pb-1 border-b w-full">
              Datos personales
            </legend>

            <div className="space-y-1.5">
              <Label htmlFor="firstName">Nombres *</Label>
              <Input id="firstName" name="firstName" placeholder="Juan Carlos" required className="h-10" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Apellido paterno *</Label>
                <Input id="lastName" name="lastName" placeholder="Mamani" required className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="secondLastName">Apellido materno *</Label>
                <Input id="secondLastName" name="secondLastName" placeholder="Quispe" required className="h-10" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dni">DNI *</Label>
              <Input
                id="dni"
                name="dni"
                placeholder="12345678"
                maxLength={8}
                pattern="\d{8}"
                required
                className="h-10"
              />
            </div>
          </fieldset>

          {/* ── Información académica ──────────────────────────────────── */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-wide text-slate-400 pb-1 border-b w-full">
              Información académica
            </legend>

            <div className="space-y-1.5">
              <Label htmlFor="enrollmentCode">
                Código de matrícula
                <span className="ml-1 text-xs font-normal text-slate-400">(opcional)</span>
              </Label>
              <Input
                id="enrollmentCode"
                name="enrollmentCode"
                placeholder="143919"
                className="h-10"
              />
            </div>

            <p className="text-xs text-slate-500 font-medium">Período de ingreso</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="admissionYear">
                  Año de ingreso
                  <span className="ml-1 text-xs font-normal text-slate-400">(opcional)</span>
                </Label>
                <Input
                  id="admissionYear"
                  name="admissionYear"
                  type="number"
                  placeholder={String(currentYear - 5)}
                  min={1990}
                  max={currentYear}
                  className="h-10"
                />
              </div>
              <SemesterSelect id="admissionSemester" name="admissionSemester" label="Semestre de ingreso" />
            </div>

            <p className="text-xs text-slate-500 font-medium">Período de egreso</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="graduationYear">Año de egreso *</Label>
                <Input
                  id="graduationYear"
                  name="graduationYear"
                  type="number"
                  placeholder={String(currentYear - 1)}
                  min={1990}
                  max={currentYear}
                  required
                  className="h-10"
                />
              </div>
              <SemesterSelect id="graduationSemester" name="graduationSemester" label="Semestre de egreso" />
            </div>

            <p className="text-xs text-slate-500 font-medium">Período de primera matrícula</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstEnrollmentYear">
                  Año
                  <span className="ml-1 text-xs font-normal text-slate-400">(opcional)</span>
                </Label>
                <Input
                  id="firstEnrollmentYear"
                  name="firstEnrollmentYear"
                  type="number"
                  placeholder={String(currentYear - 6)}
                  min={1990}
                  max={currentYear}
                  className="h-10"
                />
              </div>
              <SemesterSelect id="firstEnrollmentSemester" name="firstEnrollmentSemester" label="Semestre" />
            </div>
          </fieldset>

          {/* ── Contacto ──────────────────────────────────────────────── */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-wide text-slate-400 pb-1 border-b w-full">
              Datos de contacto
            </legend>

            <div className="space-y-1.5">
              <Label htmlFor="institutionalEmail">
                Correo institucional
                <span className="ml-1 text-xs font-normal text-slate-400">(opcional — ej: 20201234@est.unap.edu.pe)</span>
              </Label>
              <Input
                id="institutionalEmail"
                name="institutionalEmail"
                type="email"
                placeholder="codigo@est.unap.edu.pe"
                className="h-10"
              />
            </div>
          </fieldset>

          {/* ── Cuenta ────────────────────────────────────────────────── */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-wide text-slate-400 pb-1 border-b w-full">
              Cuenta de acceso
            </legend>

            <div className="space-y-1.5">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@gmail.com"
                required
                autoComplete="email"
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
                autoComplete="new-password"
                className="h-10"
              />
            </div>
          </fieldset>

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-una-secondary hover:bg-blue-700 h-10"
          >
            {pending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creando cuenta...</>
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-medium text-una-secondary hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
