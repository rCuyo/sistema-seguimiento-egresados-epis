import { Briefcase, ClipboardList, TrendingUp, Clock } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import type { GraduateDashboardData } from "@/lib/services/dashboard.service"

interface StatsGridProps {
  stats: GraduateDashboardData["stats"]
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        title="Postulaciones"
        value={stats.applicationsCount}
        description="realizadas"
        icon={Briefcase}
        variant="blue"
      />
      <StatCard
        title="Encuestas"
        value={stats.surveysAnsweredCount}
        description="respondidas"
        icon={ClipboardList}
        variant="green"
      />
      <StatCard
        title="Ofertas activas"
        value={stats.activeJobsCount}
        description="disponibles"
        icon={TrendingUp}
        variant="amber"
      />
      <StatCard
        title="Por responder"
        value={stats.pendingSurveysCount}
        description="encuestas pendientes"
        icon={Clock}
        variant="violet"
      />
    </div>
  )
}
