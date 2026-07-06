"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts"

interface Props {
  data: { company: string; count: number }[]
}

function truncate(s: string, n = 24) {
  return s.length > n ? s.slice(0, n) + "…" : s
}

export function TopEmployersChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        Sin datos disponibles
      </div>
    )
  }

  const chartData = data.slice(0, 10).map((d) => ({ ...d, name: truncate(d.company) }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fontSize: 10, fill: "#64748b" }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 10, fill: "#64748b" }}
          width={140}
        />
        <Tooltip
          contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
          formatter={(value: unknown) => [(value as number).toLocaleString("es-PE"), "Egresados"]}
          labelFormatter={(label) =>
            data.find((d) => truncate(d.company) === label)?.company ?? label
          }
        />
        <Bar
          dataKey="count"
          name="Egresados"
          radius={[0, 4, 4, 0]}
          fill="#2563EB"
          background={{ fill: "#f8fafc", radius: [0, 4, 4, 0] as any }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
