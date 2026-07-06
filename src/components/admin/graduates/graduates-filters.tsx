"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "EMPLOYED",      label: "Empleado"         },
  { value: "SELF_EMPLOYED", label: "Independiente"     },
  { value: "UNEMPLOYED",    label: "Desempleado"       },
  { value: "SEEKING",       label: "Buscando empleo"   },
  { value: "STUDYING",      label: "Estudiando"        },
] as const

const YEAR_OPTIONS = Array.from({ length: 20 }, (_, i) => {
  const year = new Date().getFullYear() - i
  return { value: String(year), label: String(year) }
})

export function GraduatesFilters() {
  const router     = useRouter()
  const sp         = useSearchParams()
  const debounceId = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [search, setSearch] = useState(sp.get("search") ?? "")
  const [status, setStatus] = useState(sp.get("status") ?? "")
  const [year,   setYear]   = useState(sp.get("year")   ?? "")

  const pushUrl = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams()
      const merged = { search, status, year, ...overrides }
      if (merged.search) params.set("search", merged.search)
      if (merged.status) params.set("status", merged.status)
      if (merged.year)   params.set("year",   merged.year)
      router.push(`?${params.toString()}`)
    },
    [router, search, status, year]
  )

  useEffect(() => {
    if (debounceId.current) clearTimeout(debounceId.current)
    debounceId.current = setTimeout(() => pushUrl({ search }), 350)
    return () => { if (debounceId.current) clearTimeout(debounceId.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  function handleStatus(value: string) {
    setStatus(value)
    pushUrl({ status: value })
  }

  function handleYear(value: string) {
    setYear(value)
    pushUrl({ year: value })
  }

  function clearAll() {
    setSearch("")
    setStatus("")
    setYear("")
    router.push("?")
  }

  const hasFilters = search || status || year

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, DNI…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-una-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => handleStatus(e.target.value)}
          className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 focus:border-una-secondary focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
        >
          <option value="">Todos los estados</option>
          {EMPLOYMENT_STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Year */}
        <select
          value={year}
          onChange={(e) => handleYear(e.target.value)}
          className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 focus:border-una-secondary focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
        >
          <option value="">Todos los años</option>
          {YEAR_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar
          </button>
        )}
      </div>
    </div>
  )
}
