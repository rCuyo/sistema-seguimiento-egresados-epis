"use client"

import { useState } from "react"
import { Download, FileText, FileSpreadsheet, Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

type ExportType   = "graduates" | "applications" | "surveys" | "jobs"
type ExportFormat = "xlsx" | "csv"

interface ExportConfig {
  type:  ExportType
  label: string
}

const EXPORTS: ExportConfig[] = [
  { type: "graduates",    label: "Egresados"     },
  { type: "applications", label: "Postulaciones" },
  { type: "surveys",      label: "Encuestas"     },
  { type: "jobs",         label: "Empleos"       },
]

export function ExportButtons() {
  const searchParams = useSearchParams()
  const [loading, setLoading]   = useState<string | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  async function download(type: ExportType, format: ExportFormat) {
    const key = `${type}-${format}`
    setLoading(key)
    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set("type", type)
      params.set("format", format)
      const res = await fetch(`/api/admin/analytics/export?${params.toString()}`)
      if (!res.ok) throw new Error("Export failed")
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement("a")
      a.href     = url
      a.download = `${type}-${new Date().toISOString().slice(0, 10)}.${format}`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert("Error al exportar. Inténtelo de nuevo.")
    } finally {
      setLoading(null)
    }
  }

  async function downloadPDF() {
    setPdfLoading(true)
    try {
      const res = await fetch("/api/admin/reports/pdf")
      if (!res.ok) throw new Error("PDF failed")
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement("a")
      a.href     = url
      a.download = `reporte-analytics-${new Date().toISOString().slice(0, 10)}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert("Error al generar PDF. Inténtelo de nuevo.")
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-slate-500">Exportar:</span>

      {EXPORTS.map(({ type, label }) => {
        const xlsxKey = `${type}-xlsx`
        const csvKey  = `${type}-csv`
        return (
          <div key={type} className="flex items-center gap-1">
            <button
              onClick={() => download(type, "xlsx")}
              disabled={loading !== null}
              title={`Descargar ${label} XLSX`}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              {loading === xlsxKey ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
              )}
              {label}
            </button>
            <button
              onClick={() => download(type, "csv")}
              disabled={loading !== null}
              title={`Descargar ${label} CSV`}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              {loading === csvKey ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              CSV
            </button>
          </div>
        )
      })}

      <button
        onClick={downloadPDF}
        disabled={pdfLoading}
        className="flex h-8 items-center gap-1.5 rounded-lg bg-una-primary px-3 text-xs font-medium text-white shadow-sm transition-colors hover:bg-una-primary/90 disabled:opacity-50"
      >
        {pdfLoading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <FileText className="h-3.5 w-3.5" />
        )}
        PDF Reporte
      </button>
    </div>
  )
}
