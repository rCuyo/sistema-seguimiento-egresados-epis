import type { Metadata }    from "next"
import { getServerSession } from "next-auth"
import { redirect }         from "next/navigation"
import { FileText, FileSpreadsheet, FileDown } from "lucide-react"
import { authOptions }      from "@/lib/auth"
import { getGlobalKPIs }    from "@/lib/services/analytics.service"
import { ExportButtons }    from "@/components/admin/analytics/export-buttons"

export const metadata: Metadata = { title: "Reportes | Director · EPIS" }
export const dynamic = "force-dynamic"

export default async function DirectorReportesPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== "DIRECTOR") redirect("/login")

  const kpis = await getGlobalKPIs()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Exportar Reportes</h1>
        <p className="mt-1 text-sm text-slate-500">
          Descarga los indicadores institucionales en formato Excel o PDF
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm text-center">
          <p className="text-3xl font-bold text-una-secondary">{kpis.totalGraduates.toLocaleString("es-PE")}</p>
          <p className="mt-1 text-sm text-slate-500">Egresados registrados</p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm text-center">
          <p className="text-3xl font-bold text-emerald-600">{kpis.employmentRate}%</p>
          <p className="mt-1 text-sm text-slate-500">Tasa de empleabilidad</p>
        </div>
        <div className="rounded-xl border bg-white p-5 shadow-sm text-center">
          <p className="text-3xl font-bold text-amber-600">{kpis.totalSurveyResponses.toLocaleString("es-PE")}</p>
          <p className="mt-1 text-sm text-slate-500">Respuestas en encuestas</p>
        </div>
      </div>

      {/* Export section */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-700">Opciones de Exportación</h2>
          <p className="mt-1 text-xs text-slate-400">
            Los reportes incluyen todos los egresados registrados con sus datos académicos, laborales y de encuesta.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ExportButtons />
        </div>
      </div>

      {/* Export guide */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">Contenido de los Reportes</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex gap-3 rounded-lg border border-green-100 bg-green-50/50 p-4">
            <FileSpreadsheet className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Excel (.xlsx)</p>
              <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
                <li>• Hoja 1: Egresados (datos completos)</li>
                <li>• Hoja 2: Postulaciones laborales</li>
                <li>• Hoja 3: Respuestas de encuestas</li>
                <li>• Hoja 4: Ofertas de empleo</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-red-100 bg-red-50/50 p-4">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-slate-800">PDF</p>
              <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
                <li>• Portada institucional</li>
                <li>• Indicadores clave (KPIs)</li>
                <li>• Tablas de distribución por estado</li>
                <li>• Generado automáticamente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
