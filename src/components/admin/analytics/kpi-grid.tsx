import {
  Users, TrendingUp, Briefcase, ClipboardList,
  Building2, Send, UserPlus, CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { AnalyticsKPIs } from "@/lib/services/analytics.service"

const CARDS = (kpis: AnalyticsKPIs) => [
  {
    label:    "Total egresados",
    value:    kpis.totalGraduates.toLocaleString("es-PE"),
    icon:     Users,
    color:    "border-l-una-secondary",
    iconBg:   "bg-blue-50",
    iconColor:"text-una-secondary",
  },
  {
    label:    "Tasa de empleabilidad",
    value:    `${kpis.employmentRate}%`,
    icon:     TrendingUp,
    color:    "border-l-emerald-500",
    iconBg:   "bg-emerald-50",
    iconColor:"text-emerald-600",
  },
  {
    label:    "Nuevos este mes",
    value:    kpis.newThisMonth.toLocaleString("es-PE"),
    icon:     UserPlus,
    color:    "border-l-violet-500",
    iconBg:   "bg-violet-50",
    iconColor:"text-violet-600",
  },
  {
    label:    "Encuestas respondidas",
    value:    kpis.totalSurveyResponses.toLocaleString("es-PE"),
    icon:     ClipboardList,
    color:    "border-l-amber-500",
    iconBg:   "bg-amber-50",
    iconColor:"text-amber-600",
  },
  {
    label:    "Encuestas activas",
    value:    kpis.activeSurveys.toLocaleString("es-PE"),
    icon:     CheckCircle2,
    color:    "border-l-teal-500",
    iconBg:   "bg-teal-50",
    iconColor:"text-teal-600",
  },
  {
    label:    "Ofertas laborales activas",
    value:    kpis.activeJobs.toLocaleString("es-PE"),
    icon:     Briefcase,
    color:    "border-l-sky-500",
    iconBg:   "bg-sky-50",
    iconColor:"text-sky-600",
  },
  {
    label:    "Total postulaciones",
    value:    kpis.totalApplications.toLocaleString("es-PE"),
    icon:     Send,
    color:    "border-l-rose-500",
    iconBg:   "bg-rose-50",
    iconColor:"text-rose-600",
  },
  {
    label:    "Empresas registradas",
    value:    kpis.totalCompanies.toLocaleString("es-PE"),
    icon:     Building2,
    color:    "border-l-orange-500",
    iconBg:   "bg-orange-50",
    iconColor:"text-orange-600",
  },
]

export function KPIGrid({ kpis }: { kpis: AnalyticsKPIs }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS(kpis).map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className={cn(
              "rounded-xl border border-l-4 bg-white p-5 shadow-sm transition-shadow hover:shadow-md",
              card.color
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <p className="truncate text-xs font-medium text-slate-500">{card.label}</p>
                <p className="text-2xl font-bold tracking-tight text-slate-900">{card.value}</p>
              </div>
              <div className={cn("shrink-0 rounded-lg p-2.5", card.iconBg)}>
                <Icon className={cn("h-5 w-5", card.iconColor)} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
