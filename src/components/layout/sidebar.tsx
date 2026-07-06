"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Briefcase,
  BarChart3,
  Settings,
  GraduationCap,
  X,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types"

// Navegación del administrador
const adminNav: NavItem[] = [
  { title: "Dashboard",     href: "/admin",               icon: LayoutDashboard },
  { title: "Egresados",     href: "/admin/egresados",     icon: Users           },
  { title: "Encuestas",     href: "/admin/encuestas",     icon: ClipboardList   },
  { title: "Bolsa Laboral", href: "/admin/bolsa-laboral", icon: Briefcase       },
  { title: "Reportes",      href: "/admin/reportes",      icon: BarChart3       },
  { title: "Configuración", href: "/admin/configuracion", icon: Settings        },
]

// Navegación del egresado
const graduateNav: NavItem[] = [
  { title: "Mi Dashboard", href: "/egresado",          icon: LayoutDashboard },
  { title: "Mi Perfil",    href: "/egresado/perfil",   icon: Users           },
  { title: "Encuestas",    href: "/egresado/encuestas",icon: ClipboardList   },
  { title: "Empleos",      href: "/egresado/empleos",  icon: Briefcase       },
]

// Navegación del Director de Escuela Profesional
const directorNav: NavItem[] = [
  { title: "Dashboard",  href: "/director",            icon: LayoutDashboard },
  { title: "Analítica",  href: "/director/analitica",  icon: BarChart3       },
  { title: "Reportes",   href: "/director/reportes",   icon: ClipboardList   },
]

// Navegación del Coordinador de Prácticas Profesionales
const coordinatorNav: NavItem[] = [
  { title: "Dashboard",  href: "/coordinador",             icon: LayoutDashboard },
  { title: "Analítica",  href: "/coordinador/analitica",   icon: BarChart3       },
  { title: "Encuestas",  href: "/coordinador/encuestas",   icon: ClipboardList   },
  { title: "Prácticas",  href: "/coordinador/practicas",   icon: Briefcase       },
]

// Navegación legacy (SCHOOL) — solo por compatibilidad con rol obsoleto
const schoolNav: NavItem[] = [
  { title: "Dashboard",  href: "/escuela",            icon: LayoutDashboard },
  { title: "Egresados",  href: "/escuela/egresados",  icon: Users           },
  { title: "Reportes",   href: "/escuela/reportes",   icon: BarChart3       },
]

function getNavItems(role?: string): NavItem[] {
  switch (role) {
    case "ADMIN":                return adminNav
    case "GRADUATE":             return graduateNav
    case "DIRECTOR":             return directorNav
    case "PRACTICE_COORDINATOR": return coordinatorNav
    case "SCHOOL":               return schoolNav
    default:                     return adminNav
  }
}

// Iniciales del nombre para el avatar
function getInitials(name?: string | null): string {
  if (!name) return "U"
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

interface SidebarProps {
  isOpen:  boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname         = usePathname()
  const { data: session } = useSession()

  const role     = session?.user?.role
  const navItems = getNavItems(role)
  const userName  = session?.user?.name  ?? "Usuario"
  const userEmail = session?.user?.email ?? ""

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-una-primary",
          "transition-transform duration-300 ease-in-out",
          "lg:relative lg:z-auto lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-una-secondary">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">UNA Puno · EPIS</p>
              <p className="text-[11px] text-white/50">Observatorio · EPIS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-white/60 transition-colors hover:text-white lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href + "/") && item.href.split("/").length > 2)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                  "transition-colors duration-150",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.title}</span>
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-una-secondary px-1 text-[10px] font-bold text-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Usuario + cerrar sesión */}
        <div className="shrink-0 border-t border-white/10 p-3 space-y-1">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-una-secondary text-xs font-bold text-white">
              {getInitials(userName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-white">{userName}</p>
              <p className="truncate text-[11px] text-white/50">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}
