"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

const OPTIONS = [
  { value: "light",  label: "Claro",   icon: Sun     },
  { value: "dark",   label: "Oscuro",  icon: Moon    },
  { value: "system", label: "Sistema", icon: Monitor },
] as const

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch — only render selection after mount
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="flex gap-2">
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const active = mounted && theme === value
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex flex-1 flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-xs font-medium transition-all",
              active
                ? "border-una-secondary bg-blue-50 text-una-secondary dark:bg-blue-950/40"
                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600",
            )}
            aria-pressed={active}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
