"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts"

interface Props {
  data: { school: string; rate: number; employed: number; total: number }[]
}

function truncate(s: string, n = 18) {
  return s.length > n ? s.slice(0, n) + "…" : s
}

export function EmploymentBySchoolChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        Sin datos disponibles
      </div>
    )
  }

  const chartData = data
    .slice(0, 10)
    .map((d) => ({ ...d, name: truncate(d.school) }))

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
          domain={[0, 100] as any}
          tick={{ fontSize: 10, fill: "#64748b" }}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 10, fill: "#64748b" }}
          width={120}
        />
        <Tooltip
          contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
          formatter={(value: unknown, _: unknown, props: any) => [
            `${value as number}% (${props.payload.employed}/${props.payload.total})`,
            "Empleabilidad",
          ]}
          labelFormatter={(label) =>
            data.find((d) => truncate(d.school) === label)?.school ?? label
          }
        />
        <ReferenceLine x={80} stroke="#10B981" strokeDasharray="4 4" label={{ value: "80%", position: "insideTopRight", fontSize: 9, fill: "#10B981" }} />
        <Bar
          dataKey="rate"
          name="Tasa de empleabilidad"
          radius={[0, 4, 4, 0]}
          fill="#2563EB"
          background={{ fill: "#f8fafc", radius: [0, 4, 4, 0] as any }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
