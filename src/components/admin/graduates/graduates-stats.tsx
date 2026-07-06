import { Users, Briefcase, Search, CalendarPlus } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import type { GraduateAdminStats } from "@/lib/services/admin-graduates.service"

export function GraduatesStats({ stats }: { stats: GraduateAdminStats }) {
  const employedPct =
    stats.total > 0 ? Math.round((stats.employed / stats.total) * 100) : 0

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Egresados"
        value={stats.total.toLocaleString("es-PE")}
        description="Registrados en el sistema"
        icon={Users}
        variant="blue"
      />
      <StatCard
        title="Empleados"
        value={stats.employed.toLocaleString("es-PE")}
        description={`${employedPct}% del total`}
        icon={Briefcase}
        variant="green"
      />
      <StatCard
        title="Buscando empleo"
        value={stats.seeking.toLocaleString("es-PE")}
        description="Con estado SEEKING"
        icon={Search}
        variant="amber"
      />
      <StatCard
        title="Nuevos este mes"
        value={stats.thisMonth.toLocaleString("es-PE")}
        description="Registros del mes actual"
        icon={CalendarPlus}
        variant="violet"
      />
    </div>
  )
}
