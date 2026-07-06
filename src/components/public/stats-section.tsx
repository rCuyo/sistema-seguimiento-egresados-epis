"use client"

import { useEffect, useRef, useState } from "react"
import {
  GraduationCap, Building2, Briefcase, TrendingUp, ClipboardList, BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { LandingStats } from "@/lib/services/public.service"

interface StatCard {
  icon:    React.ElementType
  value:   number
  suffix:  string
  label:   string
  gradient: string
  iconBg:  string
  iconFg:  string
}

function buildCards(s: LandingStats): StatCard[] {
  return [
    { icon: GraduationCap, value: s.totalGraduates, suffix: "+",  label: "Egresados registrados",  gradient: "from-blue-50 to-indigo-50",   iconBg: "bg-una-secondary/10", iconFg: "text-una-secondary" },
    { icon: TrendingUp,    value: s.employmentRate, suffix: "%",  label: "Tasa de empleabilidad",  gradient: "from-emerald-50 to-teal-50",  iconBg: "bg-emerald-100",       iconFg: "text-emerald-600"   },
    { icon: Building2,     value: s.totalCompanies, suffix: "+",  label: "Empresas participantes", gradient: "from-violet-50 to-purple-50", iconBg: "bg-violet-100",        iconFg: "text-violet-600"    },
    { icon: Briefcase,     value: s.activeJobs,     suffix: "",   label: "Ofertas laborales",      gradient: "from-amber-50 to-orange-50",  iconBg: "bg-amber-100",         iconFg: "text-amber-600"     },
    { icon: ClipboardList, value: s.totalResponses, suffix: "+",  label: "Encuestas respondidas",  gradient: "from-rose-50 to-pink-50",     iconBg: "bg-rose-100",          iconFg: "text-rose-600"      },
    { icon: BookOpen,      value: s.totalSchools,   suffix: "",   label: "Áreas de especialización", gradient: "from-teal-50 to-cyan-50",     iconBg: "bg-teal-100",          iconFg: "text-teal-600"      },
  ]
}

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started || target === 0) { setCount(target); return }
    let raf: number
    const t0 = Date.now()
    const step = () => {
      const p = Math.min((Date.now() - t0) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])
  return count
}

function StatCard({ card, started, index }: { card: StatCard; started: boolean; index: number }) {
  const Icon  = card.icon
  const count = useCountUp(card.value, 2000, started)
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br border border-slate-100 p-6 shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200",
        card.gradient,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4", card.iconBg)}>
        <Icon className={cn("h-5 w-5", card.iconFg)} />
      </div>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {card.value > 0
          ? `${count.toLocaleString("es-PE")}${card.suffix}`
          : <span className="text-2xl text-slate-300">—</span>
        }
      </p>
      <p className="mt-1 text-sm font-medium text-slate-500">{card.label}</p>
    </div>
  )
}

export function StatsSection({ stats }: { stats: LandingStats }) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-una-secondary">
            Impacto de la EPIS
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Ingeniería de Sistemas en números
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-base text-slate-500">
            Métricas reales de egresados, empleabilidad y oportunidades laborales TI en la plataforma
          </p>
        </div>
        <div
          className={cn(
            "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 transition-all duration-700",
            started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          {buildCards(stats).map((card, i) => (
            <StatCard key={card.label} card={card} started={started} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
