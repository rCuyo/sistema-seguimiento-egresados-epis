"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthModal, type AuthTab } from "./auth-context"
import { LoginForm }    from "./login-form"
import { RegisterForm } from "./register-form"

export function AuthModal() {
  const { isOpen, tab, setTab, close } = useAuthModal()

  const [registered, setRegistered] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    if (isOpen) document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, close])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // Clear success banner when leaving login tab
  useEffect(() => {
    if (tab !== "login") setRegistered(false)
  }, [tab])

  const handleRegisterSuccess = () => {
    setRegistered(true)
    setTab("login")
  }

  const TABS: { key: AuthTab; label: string }[] = [
    { key: "login",    label: "Ingresar"     },
    { key: "register", label: "Registrarse"  },
  ]

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-[100] bg-black/55 backdrop-blur-[3px] transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* ── Panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Autenticación"
        className={cn(
          "fixed inset-0 z-[101] flex items-center justify-center p-4 transition-all duration-300",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl",
            "ring-1 ring-black/5 transition-all duration-300",
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-95 opacity-0",
          )}
        >
          {/* Gradient accent bar at top */}
          <div className="h-1 w-full bg-gradient-to-r from-una-primary via-una-secondary to-una-accent" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-una-primary/5 ring-1 ring-una-primary/10 flex items-center justify-center">
                <Image
                  src="/images/logos/Logo_UNAP.png"
                  alt="Universidad Nacional del Altiplano Puno"
                  width={34}
                  height={37}
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-una-primary">UNA Puno · EPIS</p>
                <p className="text-[11px] leading-tight text-slate-400">Ing. Sistemas — Egresados</p>
              </div>
            </div>
            <button
              onClick={close}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-una-secondary"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="px-6 pb-4">
            <div className="flex rounded-xl bg-slate-100 p-1">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={cn(
                    "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-una-secondary",
                    tab === key
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Body — scrollable */}
          <div className="max-h-[68vh] overflow-y-auto px-6 pb-6">
            {registered && tab === "login" && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Cuenta creada correctamente. Ya puedes iniciar sesión.
              </div>
            )}

            {/* Both forms stay mounted to preserve useActionState */}
            <div className={tab === "login" ? "block" : "hidden"}>
              <LoginForm onSwitchToRegister={() => setTab("register")} />
            </div>
            <div className={tab === "register" ? "block" : "hidden"}>
              <RegisterForm
                onSuccess={handleRegisterSuccess}
                onSwitchToLogin={() => setTab("login")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
