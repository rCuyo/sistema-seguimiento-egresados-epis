"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

interface Props {
  years: number[]
}

const STATUSES = [
  { value: "EMPLOYED",      label: "Empleado"       },
  { value: "SELF_EMPLOYED", label: "Independiente"  },
  { value: "UNEMPLOYED",    label: "Desempleado"    },
  { value: "SEEKING",       label: "Buscando empleo"},
  { value: "STUDYING",      label: "Estudiando"     },
]

export function AnalyticsFilters({ years }: Props) {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const year   = searchParams.get("year")   ?? ""
  const status = searchParams.get("status") ?? ""

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`?${params.toString()}`)
    },
    [router, searchParams],
  )

  const hasFilters = year || status

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={year}
        onChange={(e) => update("year", e.target.value)}
        className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm focus:border-una-secondary focus:outline-none focus:ring-1 focus:ring-una-secondary"
      >
        <option value="">Todos los años</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>{y}</option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => update("status", e.target.value)}
        className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm focus:border-una-secondary focus:outline-none focus:ring-1 focus:ring-una-secondary"
      >
        <option value="">Todos los estados</option>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={() => router.push("?")}
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}
