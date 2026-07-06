import type { Metadata } from "next"

export const metadata: Metadata = { title: "Escuela Profesional" }

export default function EscuelaDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Escuela Profesional</h1>
      <p className="text-slate-500">Panel de escuela — disponible en la Fase 2.</p>
    </div>
  )
}
