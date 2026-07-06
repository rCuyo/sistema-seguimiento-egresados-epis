"use client"

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts"

const COLORS = ["#10B981", "#2563EB", "#F59E0B", "#EF4444", "#8B5CF6"]

interface Props {
  data: { status: string; label: string; count: number }[]
}

export function EmploymentStatusChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        Sin datos disponibles
      </div>
    )
  }

  const chartData = data.map((d) => ({ name: d.label, value: d.count }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={3}
          dataKey="value"
          label={({ percent }) =>
            percent != null && percent > 0.04 ? `${(percent * 100).toFixed(0)}%` : ""
          }
          labelLine={false}
        >
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
          formatter={(value: unknown) => [(value as number).toLocaleString("es-PE"), "Egresados"]}
        />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
