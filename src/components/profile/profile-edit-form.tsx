"use client"

import { useForm } from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button }  from "@/components/ui/button"
import { Input }   from "@/components/ui/input"
import { Label }   from "@/components/ui/label"
import {
  updateProfileSchema,
  EMPLOYMENT_STATUS_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  type UpdateProfileInput,
} from "@/lib/validations/graduate"
import type { GraduateProfile } from "@/types/graduate"

interface ProfileEditFormProps {
  profile:   GraduateProfile
  onSuccess: (updated: GraduateProfile) => void
  onCancel:  () => void
}

export function ProfileEditForm({ profile, onSuccess, onCancel }: ProfileEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: standardSchemaResolver(updateProfileSchema) as any,
    defaultValues: {
      firstName:          profile.firstName,
      lastName:           profile.lastName,
      secondLastName:     profile.secondLastName     ?? "",
      phone:              profile.phone              ?? "",
      institutionalEmail: profile.institutionalEmail ?? "",
      personalEmail:      profile.personalEmail      ?? "",
      maritalStatus:      profile.maritalStatus      ?? "",
      bio:              profile.bio              ?? "",
      employmentStatus: profile.employmentStatus,
      currentPosition:  profile.currentPosition  ?? "",
      currentCompany:   profile.currentCompany   ?? "",
      city:             profile.city             ?? "",
      country:          profile.country,
      linkedinUrl:      profile.linkedinUrl      ?? "",
    },
  })

  async function onSubmit(data: UpdateProfileInput) {
    try {
      const res = await fetch("/api/graduates/me", {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error ?? "Error al guardar los cambios")
        return
      }

      toast.success("Perfil actualizado correctamente")
      onSuccess({ ...profile, ...json.data })
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Personal */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4 dark:border-slate-700 dark:bg-slate-900">
        <h3 className="border-b border-slate-100 pb-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
          Información Personal
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">Nombres *</Label>
            <Input id="firstName" {...register("firstName")} className="h-10" />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName">Apellido paterno *</Label>
            <Input id="lastName" {...register("lastName")} className="h-10" />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="secondLastName">Apellido materno</Label>
            <Input id="secondLastName" {...register("secondLastName")} placeholder="Segundo apellido" className="h-10" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Teléfono o celular</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+51 999 999 999"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="institutionalEmail">Correo institucional</Label>
            <Input
              id="institutionalEmail"
              {...register("institutionalEmail")}
              type="email"
              placeholder="codigo@est.unap.edu.pe"
              className="h-10"
            />
            {errors.institutionalEmail && (
              <p className="text-xs text-red-500">{errors.institutionalEmail.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="personalEmail">Correo personal</Label>
            <Input
              id="personalEmail"
              {...register("personalEmail")}
              type="email"
              placeholder="correo@gmail.com"
              className="h-10"
            />
            {errors.personalEmail && (
              <p className="text-xs text-red-500">{errors.personalEmail.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="maritalStatus">Estado civil</Label>
            <select
              id="maritalStatus"
              {...register("maritalStatus")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">— Seleccionar —</option>
              {MARITAL_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" {...register("city")} placeholder="Puno" className="h-10" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="country">País</Label>
            <Input id="country" {...register("country")} placeholder="Perú" className="h-10" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="linkedinUrl">LinkedIn</Label>
            <Input
              id="linkedinUrl"
              {...register("linkedinUrl")}
              placeholder="https://linkedin.com/in/..."
              className="h-10"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="bio">
            Biografía
            <span className="ml-1 text-xs font-normal text-slate-400">(máx. 500 caracteres)</span>
          </Label>
          <textarea
            id="bio"
            {...register("bio")}
            rows={3}
            placeholder="Una breve descripción sobre ti..."
            className="flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.bio && (
            <p className="text-xs text-red-500">{errors.bio.message}</p>
          )}
        </div>
      </div>

      {/* Employment */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4 dark:border-slate-700 dark:bg-slate-900">
        <h3 className="border-b border-slate-100 pb-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
          Situación Laboral
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="employmentStatus">Estado Laboral *</Label>
            <select
              id="employmentStatus"
              {...register("employmentStatus")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {EMPLOYMENT_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.employmentStatus && (
              <p className="text-xs text-red-500">{errors.employmentStatus.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="currentPosition">Cargo Actual</Label>
            <Input
              id="currentPosition"
              {...register("currentPosition")}
              placeholder="Desarrollador Full Stack"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="currentCompany">Empresa Actual</Label>
            <Input
              id="currentCompany"
              {...register("currentCompany")}
              placeholder="Tech Solutions SAC"
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pb-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-una-secondary hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </form>
  )
}
