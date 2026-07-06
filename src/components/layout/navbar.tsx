"use client"

import { Bell, Menu, Search } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function getInitials(name?: string | null): string {
  if (!name) return "U"
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

interface NavbarProps {
  onMenuClick: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { data: session } = useSession()

  const userName  = session?.user?.name  ?? "Usuario"
  const userEmail = session?.user?.email ?? ""

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Botón hamburguesa — solo mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Buscador */}
      <div className="relative hidden max-w-xs flex-1 sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Buscar egresados, empleos..."
          className="h-9 border-slate-200 bg-slate-50 pl-9 text-sm focus-visible:bg-white"
        />
      </div>

      {/* Acciones derecha */}
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-600"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-una-secondary" />
        </Button>

        <div className="mx-1 h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-una-primary text-xs font-bold text-white">
            {getInitials(userName)}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-[13px] font-medium text-slate-900 leading-tight dark:text-slate-100">
              {userName}
            </p>
            <p className="text-[11px] text-slate-500 leading-tight dark:text-slate-400">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
