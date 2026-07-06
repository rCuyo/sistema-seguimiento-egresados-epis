"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts"
import { cn } from "@/lib/utils"
import type { SurveyResults } from "@/lib/services/surveys.service"

const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4"]

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b px-5 py-3.5">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function TextAnswers({ answers }: { answers: string[] }) {
  if (answers.length === 0)
    return <p className="text-sm text-slate-400">Sin respuestas.</p>
  return (
    <ul className="space-y-2">
      {answers.slice(0, 15).map((text, i) => (
        <li key={i} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          {text}
        </li>
      ))}
      {answers.length > 15 && (
        <li className="text-xs text-slate-400">
          +{answers.length - 15} respuestas más
        </li>
      )}
    </ul>
  )
}

function BarChartCard({ data }: { data: { name: string; count: number }[] }) {
  if (data.length === 0)
    return <p className="text-sm text-slate-400">Sin respuestas.</p>
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
        <YAxis tick={{ fontSize: 12, fill: "#64748b" }} allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
          cursor={{ fill: "#f8fafc" }}
        />
        <Bar dataKey="count" name="Respuestas" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

function PieChartCard({ data }: { data: { name: string; value: number }[] }) {
  if (data.length === 0)
    return <p className="text-sm text-slate-400">Sin respuestas.</p>
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
          label={({ name, percent }) =>
            percent != null && percent > 0.05 ? `${name} (${(percent * 100).toFixed(0)}%)` : ""
          }
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: 12 }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

function RatingCard({ answers }: { answers: number[] }) {
  if (answers.length === 0)
    return <p className="text-sm text-slate-400">Sin respuestas.</p>

  const avg = answers.reduce((a, b) => a + b, 0) / answers.length
  const dist = [1, 2, 3, 4, 5].map((star) => ({
    name:  `${star}★`,
    count: answers.filter((a) => a === star).length,
  }))
  const max = Math.max(...dist.map((d) => d.count), 1)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold text-slate-900">{avg.toFixed(1)}</span>
        <div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={cn("text-xl", s <= Math.round(avg) ? "text-amber-400" : "text-slate-200")}
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400">{answers.length} respuesta{answers.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {dist.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="w-6 text-right text-xs text-slate-500">{d.name}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-amber-400 transition-all"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
            <span className="w-6 text-xs text-slate-400">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function YesNoCard({ answers }: { answers: string[] }) {
  const yes = answers.filter((a) => a.toLowerCase() === "si" || a === "true" || a === "yes").length
  const no  = answers.length - yes
  const data = [
    { name: "Sí",  value: yes },
    { name: "No",  value: no  },
  ].filter((d) => d.value > 0)
  return <PieChartCard data={data} />
}

interface QuestionResult {
  id:      string
  text:    string
  type:    string
  order:   number
  answers: { value: unknown }[]
}

function QuestionResults({ question, index }: { question: QuestionResult; index: number }) {
  const rawValues = question.answers.map((a) => a.value)

  const renderContent = () => {
    switch (question.type) {
      case "text":
      case "textarea":
        return <TextAnswers answers={rawValues.filter((v): v is string => typeof v === "string")} />

      case "single": {
        const counts: Record<string, number> = {}
        rawValues.forEach((v) => {
          if (typeof v === "string") counts[v] = (counts[v] ?? 0) + 1
        })
        const data = Object.entries(counts).map(([name, count]) => ({ name, count }))
        return <BarChartCard data={data} />
      }

      case "multiple": {
        const counts: Record<string, number> = {}
        rawValues.forEach((v) => {
          const arr = Array.isArray(v) ? v : []
          arr.forEach((opt: string) => {
            counts[opt] = (counts[opt] ?? 0) + 1
          })
        })
        const data = Object.entries(counts).map(([name, count]) => ({ name, count }))
        return <BarChartCard data={data} />
      }

      case "rating": {
        const nums = rawValues.filter((v): v is number => typeof v === "number")
        return <RatingCard answers={nums} />
      }

      case "yesno": {
        const strs = rawValues.filter((v): v is string => typeof v === "string")
        return <YesNoCard answers={strs} />
      }

      default:
        return <p className="text-sm text-slate-400">Tipo de pregunta no soportado.</p>
    }
  }

  const typeLabel: Record<string, string> = {
    text:      "Texto corto",
    textarea:  "Texto largo",
    single:    "Selección única",
    multiple:  "Selección múltiple",
    rating:    "Calificación",
    yesno:     "Sí / No",
  }

  return (
    <SectionCard title={`${index + 1}. ${question.text}`}>
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
          {typeLabel[question.type] ?? question.type}
        </span>
        <span className="text-xs text-slate-400">
          {question.answers.length} respuesta{question.answers.length !== 1 ? "s" : ""}
        </span>
      </div>
      {renderContent()}
    </SectionCard>
  )
}

interface SurveyResultsViewProps {
  data: SurveyResults
}

export function SurveyResultsView({ data }: SurveyResultsViewProps) {
  const { survey, totalGraduates } = data
  if (!survey) return null

  const responseCount   = survey._count.responses
  const participationPct = totalGraduates > 0
    ? Math.round((responseCount / totalGraduates) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-l-4 border-l-una-secondary bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Total respuestas</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{responseCount}</p>
        </div>
        <div className="rounded-xl border border-l-4 border-l-emerald-400 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Tasa de participación</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{participationPct}%</p>
          <p className="text-xs text-slate-400">{totalGraduates} egresados totales</p>
        </div>
        <div className="rounded-xl border border-l-4 border-l-violet-400 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Preguntas</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{survey.questions.length}</p>
        </div>
      </div>

      {/* Participation bar */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Participación general</span>
          <span className="font-semibold text-una-secondary">{participationPct}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-una-secondary transition-all"
            style={{ width: `${participationPct}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-400">
          {responseCount} de {totalGraduates} egresados han respondido
        </p>
      </div>

      {/* Per-question results */}
      {survey.questions.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-slate-400">Esta encuesta no tiene preguntas.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {survey.questions.map((q, i) => (
            <QuestionResults key={q.id} question={q} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
