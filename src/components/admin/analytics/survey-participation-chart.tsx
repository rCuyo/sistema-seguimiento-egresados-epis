"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

interface Props {
  data: { survey: string; responses: number; rate: number }[]
}

export function SurveyParticipationChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        Sin encuestas disponibles
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 40, left: -10, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="survey"
          tick={{ fontSize: 10, fill: "#64748b" }}
          angle={-30}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#64748b" }}
          allowDecimals={false}
          label={{ value: "Respuestas", angle: -90, position: "insideLeft", offset: 15, style: { fontSize: 10, fill: "#94a3b8" } }}
        />
        <Tooltip
          contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
          formatter={(value: unknown, name: unknown, props: any) => [
            `${value as number} respuestas (${props.payload.rate}%)`,
            "Participación",
          ]}
        />
        <Bar dataKey="responses" name="Respuestas" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
