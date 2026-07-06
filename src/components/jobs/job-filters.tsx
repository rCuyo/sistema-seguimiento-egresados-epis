"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams }                from "next/navigation"
import { Search, X }                                 from "lucide-react"
import { JOB_TYPE_LABELS }                           from "@/lib/validations/job"

interface JobFiltersProps {
  companies?: { id: string; name: string }[]
}

export function JobFilters({ companies }: JobFiltersProps) {
  const router     = useRouter()
  const sp         = useSearchParams()
  const debounceId = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [search,    setSearch]    = useState(sp.get("search")    ?? "")
  const [type,      setType]      = useState(sp.get("type")      ?? "")
  const [isRemote,  setIsRemote]  = useState(sp.get("isRemote")  ?? "")
  const [companyId, setCompanyId] = useState(sp.get("companyId") ?? "")

  const pushUrl = useCallback(
    (overrides: Record<string, string>) => {
      const merged = { search, type, isRemote, companyId, ...overrides }
      const params = new URLSearchParams()
      if (merged.search)    params.set("search",    merged.search)
      if (merged.type)      params.set("type",      merged.type)
      if (merged.isRemote)  params.set("isRemote",  merged.isRemote)
      if (merged.companyId) params.set("companyId", merged.companyId)
      router.push(`?${params.toString()}`)
    },
    [router, search, type, isRemote, companyId]
  )

  useEffect(() => {
    if (debounceId.current) clearTimeout(debounceId.current)
    debounceId.current = setTimeout(() => pushUrl({ search }), 350)
    return () => { if (debounceId.current) clearTimeout(debounceId.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const hasFilters = search || type || isRemote || companyId

  function clearAll() {
    setSearch(""); setType(""); setIsRemote(""); setCompanyId("")
    router.push("?")
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border bg-white p-4 shadow-sm">
      <div className="relative min-w-[200px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar oferta…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-una-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-una-secondary/20"
        />
      </div>

      <select
        value={type}
        onChange={(e) => { setType(e.target.value); pushUrl({ type: e.target.value }) }}
        className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 focus:border-una-secondary focus:outline-none"
      >
        <option value="">Todos los tipos</option>
        {Object.entries(JOB_TYPE_LABELS).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>

      <label className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={isRemote === "true"}
          onChange={(e) => {
            const v = e.target.checked ? "true" : ""
            setIsRemote(v)
            pushUrl({ isRemote: v })
          }}
          className="h-4 w-4 rounded border-slate-300 text-una-secondary"
        />
        Solo remotas
      </label>

      {companies && companies.length > 0 && (
        <select
          value={companyId}
          onChange={(e) => { setCompanyId(e.target.value); pushUrl({ companyId: e.target.value }) }}
          className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 focus:border-una-secondary focus:outline-none"
        >
          <option value="">Todas las empresas</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      )}

      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700"
        >
          <X className="h-3.5 w-3.5" /> Limpiar
        </button>
      )}
    </div>
  )
}
