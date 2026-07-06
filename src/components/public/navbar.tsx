"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthModal } from "@/components/auth/auth-context"

const NAV_LINKS = [
  { label: "Inicio",        href: "/"           },
  { label: "Nosotros",      href: "/#nosotros"  },
  { label: "Beneficios",    href: "/#beneficios"},
  { label: "Bolsa laboral", href: "/empleos"    },
  { label: "Eventos",       href: "/#eventos"   },
]

export function PublicNavbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const pathname = usePathname()
  const { openLogin, openRegister }   = useAuthModal()

  const isLanding = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const solidBg  = scrolled || !isLanding
  const textBase = solidBg
    ? "text-slate-600 hover:text-una-secondary"
    : "text-white/85 hover:text-white"

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solidBg
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
            solidBg ? "bg-una-primary/5 ring-1 ring-una-primary/10" : "bg-white/15 backdrop-blur-sm",
          )}>
            <Image
              src="/images/logos/Logo_UNAP.png"
              alt="Universidad Nacional del Altiplano Puno"
              width={30}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <p className={cn("text-sm font-bold leading-none", solidBg ? "text-una-primary" : "text-white")}>
              UNA Puno
            </p>
            <p className={cn("text-[10px] leading-none tracking-wide", solidBg ? "text-slate-400" : "text-white/55")}>
              Ing. Sistemas
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                textBase,
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={openLogin}
            className={cn(
              "rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors",
              solidBg
                ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                : "border-white/35 text-white hover:bg-white/10",
            )}
          >
            Ingresar
          </button>
          <button
            onClick={openRegister}
            className={cn(
              "rounded-lg px-4 py-1.5 text-sm font-semibold transition-all",
              solidBg
                ? "bg-una-secondary text-white shadow-sm hover:bg-una-secondary/90"
                : "bg-white text-una-primary shadow-md hover:bg-white/90",
            )}
          >
            Regístrate
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className={cn(
            "rounded-lg p-2 transition-colors md:hidden",
            solidBg ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10",
          )}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white shadow-lg md:hidden">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-una-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-2">
              <button
                onClick={() => { setMobileOpen(false); openLogin() }}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Ingresar
              </button>
              <button
                onClick={() => { setMobileOpen(false); openRegister() }}
                className="w-full rounded-lg bg-una-secondary px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-una-secondary/90 transition-colors"
              >
                Regístrate gratis
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
