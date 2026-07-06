"use client"

import { useActionState, useEffect } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import { Label }  from "@/components/ui/label"
import { registerGraduateModal, type RegisterState } from "@/lib/actions/auth.actions"

interface Props {
  onSuccess:       () => void
  onSwitchToLogin: () => void
}

const currentYear = new Date().getFullYear()

const SemesterSelect = ({ id, name, label }: { id: string; name: string; label: string }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>
      {label}
      <span className="ml-1 text-xs font-normal text-slate-400">(opc.)</span>
    </Label>
    <select
      id={id}
      name={name}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <option value="">— Semestre —</option>
      <option value="I">I</option>
      <option value="II">II</option>
    </select>
  </div>
)

export function RegisterForm({ onSuccess, onSwitchToLogin }: Props) {
  const [state, action, pending] = useActionState<RegisterState, FormData>(
    registerGraduateModal,
    null,
  )

  useEffect(() => {
    if (state && "success" in state) onSuccess()
  }, [state, onSuccess])

  const serverError = state && "error" in state ? state.error : null

  return (
    <form action={action} className="space-y-3">
      {serverError && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {serverError}
        </div>
      )}

      {/* Nombres */}
      <div className="space-y-1.5">
        <Label htmlFor="reg-firstName">Nombres *</Label>
        <Input id="reg-firstName" name="firstName" placeholder="Juan Carlos" required className="h-10" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="reg-lastName">Apellido paterno *</Label>
          <Input id="reg-lastName" name="lastName" placeholder="Mamani" required className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-secondLastName">Apellido materno *</Label>
          <Input id="reg-secondLastName" name="secondLastName" placeholder="Quispe" required className="h-10" />
        </div>
      </div>

      {/* DNI */}
      <div className="space-y-1.5">
        <Label htmlFor="reg-dni">DNI *</Label>
        <Input
          id="reg-dni"
          name="dni"
          placeholder="12345678"
          maxLength={8}
          pattern="\d{8}"
          required
          className="h-10"
        />
      </div>

      {/* Ingreso */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="reg-admissionYear">
            Año de ingreso
            <span className="ml-1 text-xs font-normal text-slate-400">(opc.)</span>
          </Label>
          <Input
            id="reg-admissionYear"
            name="admissionYear"
            type="number"
            placeholder={String(currentYear - 5)}
            min={1990}
            max={currentYear}
            className="h-10"
          />
        </div>
        <SemesterSelect id="reg-admissionSemester" name="admissionSemester" label="Semestre ingreso" />
      </div>

      {/* Egreso */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="reg-year">Año de egreso *</Label>
          <Input
            id="reg-year"
            name="graduationYear"
            type="number"
            placeholder={String(currentYear - 1)}
            min={1990}
            max={currentYear}
            required
            className="h-10"
          />
        </div>
        <SemesterSelect id="reg-graduationSemester" name="graduationSemester" label="Semestre egreso" />
      </div>

      {/* Cuenta */}
      <div className="space-y-1.5">
        <Label htmlFor="reg-email">Correo electrónico *</Label>
        <Input
          id="reg-email"
          name="email"
          type="email"
          placeholder="correo@gmail.com"
          required
          autoComplete="email"
          className="h-10"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reg-password">Contraseña *</Label>
        <Input
          id="reg-password"
          name="password"
          type="password"
          placeholder="Mínimo 6 caracteres"
          minLength={6}
          required
          autoComplete="new-password"
          className="h-10"
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full h-11 bg-una-secondary hover:bg-blue-700 font-semibold text-white"
      >
        {pending ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creando cuenta...</>
        ) : (
          "Crear cuenta gratis"
        )}
      </Button>

      <p className="text-center text-sm text-slate-500">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-una-secondary hover:underline"
        >
          Inicia sesión
        </button>
      </p>
    </form>
  )
}
