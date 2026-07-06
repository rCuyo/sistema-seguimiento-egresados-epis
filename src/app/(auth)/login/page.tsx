"use client"

import { Suspense, useState } from "react"
import { signIn }              from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { GraduationCap, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import { Label }  from "@/components/ui/label"

// Isolated because useSearchParams() requires a Suspense boundary in Next.js 16
function RegisteredBanner() {
  const searchParams = useSearchParams()
  if (searchParams.get("registered") !== "true") return null
  return (
    <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      Cuenta creada correctamente. Ya puedes iniciar sesión.
    </div>
  )
}

function LoginForm() {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [error,    setError]    = useState("")
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push("/")
      router.refresh()
    } else {
      setError("Email o contraseña incorrectos")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">Correo institucional</Label>
        <Input
          id="email"
          type="email"
          placeholder="usuario@una.edu.pe"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="h-10"
        />
      </div>

      <div className="space-y-1.5">
        <div>
          <Label htmlFor="password">Contraseña</Label>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="h-10"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-una-secondary hover:bg-blue-700 h-10"
      >
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Ingresando...</>
        ) : (
          "Ingresar"
        )}
      </Button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm space-y-6">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-una-primary">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Ing. Sistemas · UNA Puno</h1>
          <p className="mt-1 text-sm text-slate-500">
            Observatorio — Ingresa a tu cuenta
          </p>
        </div>

        <Suspense>
          <RegisteredBanner />
        </Suspense>

        <LoginForm />

        <p className="text-center text-sm text-slate-500">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/registro" className="font-medium text-una-secondary hover:underline">
            Regístrate aquí
          </Link>
        </p>


</div>
    </div>
  )
}
