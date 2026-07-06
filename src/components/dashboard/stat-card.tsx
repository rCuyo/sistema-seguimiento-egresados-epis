import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const variants = {
  blue: {
    border:    "border-l-una-secondary",
    iconBg:    "bg-blue-50 dark:bg-blue-900/30",
    iconColor: "text-una-secondary",
  },
  green: {
    border:    "border-l-emerald-500",
    iconBg:    "bg-emerald-50 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    border:    "border-l-amber-500",
    iconBg:    "bg-amber-50 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  violet: {
    border:    "border-l-violet-500",
    iconBg:    "bg-violet-50 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
} as const

interface StatCardProps {
  title:        string
  value:        string | number
  description?: string
  icon:         LucideIcon
  variant?:     keyof typeof variants
  trend?: {
    value: number
    label: string
  }
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "blue",
  trend,
}: StatCardProps) {
  const colors = variants[variant]
  const trendPositive = trend && trend.value >= 0

  return (
    <div
      className={cn(
        "rounded-xl border border-l-4 bg-white p-5 shadow-sm",
        "transition-shadow hover:shadow-md",
        "dark:border-slate-700 dark:bg-slate-900",
        colors.border
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
          </p>
          {description && (
            <p className="text-xs text-slate-400 dark:text-slate-500">{description}</p>
          )}
        </div>
        <div className={cn("shrink-0 rounded-lg p-2.5", colors.iconBg)}>
          <Icon className={cn("h-5 w-5", colors.iconColor)} />
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5">
          {trendPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          )}
          <span
            className={cn(
              "text-xs font-semibold",
              trendPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
            )}
          >
            {trendPositive ? "+" : ""}{trend.value}%
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{trend.label}</span>
        </div>
      )}
    </div>
  )
}
