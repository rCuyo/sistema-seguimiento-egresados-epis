"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GraduatesPaginationProps {
  page:       number
  totalPages: number
  total:      number
  pageSize:   number
}

export function GraduatesPagination({
  page,
  totalPages,
  total,
  pageSize,
}: GraduatesPaginationProps) {
  const router = useRouter()
  const sp     = useSearchParams()

  if (totalPages <= 1) return null

  function goTo(p: number) {
    const params = new URLSearchParams(sp.toString())
    params.set("page", String(p))
    router.push(`?${params.toString()}`)
  }

  const from = (page - 1) * pageSize + 1
  const to   = Math.min(page * pageSize, total)

  const pages = buildPageNumbers(page, totalPages)

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white px-5 py-3 shadow-sm">
      <p className="text-xs text-slate-500">
        Mostrando <span className="font-semibold text-slate-700">{from}–{to}</span> de{" "}
        <span className="font-semibold text-slate-700">{total.toLocaleString("es-PE")}</span> egresados
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 disabled:opacity-40"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-xs text-slate-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p as number)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors",
                p === page
                  ? "bg-una-secondary text-white shadow-sm"
                  : "border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 disabled:opacity-40"
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function buildPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "…")[] = []

  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "…", total)
  } else if (current >= total - 3) {
    pages.push(1, "…", total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, "…", current - 1, current, current + 1, "…", total)
  }

  return pages
}
