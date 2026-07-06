"use client"

import { useState } from "react"
import { signIn }   from "next-auth/react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import { Label }  from "@/components/ui/label"

interface Props {
  onSwitchToRegister: () => void
}

export function LoginForm({ onSwitchToRegister }: Props) {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [error,    setError]    = useState("")
  const [loading,  setLoading]  = useState(false)
  const [showPwd,  setShowPwd]  = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", { email, password, redirect: false })

    if (result?.ok) {
      router.push("/")
      router.refresh()
    } else {
      setError("Correo o contraseña incorrectos. Verifica tus datos.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="modal-email">Correo electrónico</Label>
        <Input
          id="modal-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@gmail.com"
          required
          autoComplete="email"
          className="h-11"
        />
      </div>

      <div className="space-y-1.5">
        <div>
          <Label htmlFor="modal-password">Contraseña</Label>
        </div>
        <div className="relative">
          <Input
            id="modal-password"
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            className="h-11 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPwd((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
          >
            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
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
        className="w-full h-11 bg-una-secondary hover:bg-blue-700 font-semibold text-white"
      >
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Ingresando...</>
        ) : (
          "Ingresar"
        )}
      </Button>

<p className="text-center text-sm text-slate-500">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-una-secondary hover:underline"
        >
          Regístrate gratis
        </button>
      </p>
    </form>
  )
}
