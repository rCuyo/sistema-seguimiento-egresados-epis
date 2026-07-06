import {
  Code2, Brain, Shield, Database, Cloud, Globe,
  Smartphone, Network, BarChart2, Layers, Cpu, Settings2,
} from "lucide-react"
import { Reveal } from "@/components/public/reveal"

const TECH_AREAS = [
  { name: "Desarrollo de Software",        icon: Code2,      bg: "bg-blue-50",    fg: "text-blue-600",    ring: "ring-blue-200"    },
  { name: "Inteligencia Artificial",        icon: Brain,      bg: "bg-violet-50",  fg: "text-violet-600",  ring: "ring-violet-200"  },
  { name: "Ciberseguridad",                 icon: Shield,     bg: "bg-red-50",     fg: "text-red-600",     ring: "ring-red-200"     },
  { name: "Bases de Datos",                 icon: Database,   bg: "bg-amber-50",   fg: "text-amber-600",   ring: "ring-amber-200"   },
  { name: "Cloud Computing",                icon: Cloud,      bg: "bg-sky-50",     fg: "text-sky-600",     ring: "ring-sky-200"     },
  { name: "Desarrollo Web",                 icon: Globe,      bg: "bg-emerald-50", fg: "text-emerald-600", ring: "ring-emerald-200" },
  { name: "Desarrollo Móvil",               icon: Smartphone, bg: "bg-pink-50",    fg: "text-pink-600",    ring: "ring-pink-200"    },
  { name: "Redes y Telecomunicaciones",     icon: Network,    bg: "bg-teal-50",    fg: "text-teal-600",    ring: "ring-teal-200"    },
  { name: "Ciencia de Datos",               icon: BarChart2,  bg: "bg-indigo-50",  fg: "text-indigo-600",  ring: "ring-indigo-200"  },
  { name: "Arquitectura de Software",       icon: Layers,     bg: "bg-orange-50",  fg: "text-orange-600",  ring: "ring-orange-200"  },
  { name: "Sistemas Embebidos / IoT",       icon: Cpu,        bg: "bg-lime-50",    fg: "text-lime-600",    ring: "ring-lime-200"    },
  { name: "Gestión de Proyectos TI",        icon: Settings2,  bg: "bg-slate-50",   fg: "text-slate-600",   ring: "ring-slate-200"   },
]

export function FacultiesSection() {
  return (
    <section id="areas" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-una-secondary">
            Áreas de desempeño profesional
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Donde trabajan nuestros egresados
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-base text-slate-500">
            Los egresados de Ingeniería de Sistemas se desempeñan en las principales
            áreas tecnológicas del mercado laboral nacional e internacional
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {TECH_AREAS.map((area, i) => {
            const Icon = area.icon
            return (
              <Reveal key={area.name} delay={i * 50}>
                <div className="group flex flex-col items-center gap-3 rounded-xl border border-slate-100 p-5 text-center transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${area.bg} ${area.ring}`}>
                    <Icon className={`h-5 w-5 ${area.fg}`} />
                  </div>
                  <p className="text-xs font-medium leading-snug text-slate-700">
                    {area.name}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
