import Link from "next/link"
import {
  Briefcase, Users, ClipboardList, TrendingUp, CalendarDays, UserCog, ArrowRight,
} from "lucide-react"
import { Reveal } from "@/components/public/reveal"

const BENEFITS = [
  {
    icon:    Briefcase,
    accent:  "from-blue-500 to-una-secondary",
    iconBg:  "bg-blue-50",
    iconFg:  "text-una-secondary",
    border:  "hover:border-blue-200",
    title:   "Bolsa laboral exclusiva",
    desc:    "Ofertas TI dirigidas a egresados de Ingeniería de Sistemas. Postula en segundos con tu perfil verificado por la EPIS.",
    href:    "/empleos",
  },
  {
    icon:    Users,
    accent:  "from-emerald-500 to-teal-500",
    iconBg:  "bg-emerald-50",
    iconFg:  "text-emerald-600",
    border:  "hover:border-emerald-200",
    title:   "Red de contactos",
    desc:    "Conecta con egresados de Ingeniería de Sistemas de todas las promociones. Amplía tu red en el sector tecnológico.",
    href:    "/registro",
  },
  {
    icon:    ClipboardList,
    accent:  "from-violet-500 to-purple-500",
    iconBg:  "bg-violet-50",
    iconFg:  "text-violet-600",
    border:  "hover:border-violet-200",
    title:   "Encuestas institucionales",
    desc:    "Participa en encuestas de empleabilidad que contribuyen a mejorar el plan curricular de Ingeniería de Sistemas.",
    href:    "/login",
  },
  {
    icon:    TrendingUp,
    accent:  "from-amber-500 to-orange-500",
    iconBg:  "bg-amber-50",
    iconFg:  "text-amber-600",
    border:  "hover:border-amber-200",
    title:   "Seguimiento de carrera",
    desc:    "Registra tu trayectoria en el sector TI y tus logros profesionales. La EPIS te acompaña después de egresar.",
    href:    "/registro",
  },
  {
    icon:    CalendarDays,
    accent:  "from-rose-500 to-pink-500",
    iconBg:  "bg-rose-50",
    iconFg:  "text-rose-600",
    border:  "hover:border-rose-200",
    title:   "Eventos y capacitaciones",
    desc:    "Talleres, hackathons y eventos TI organizados por la EPIS y sus empresas aliadas del sector tecnológico.",
    href:    "/#eventos",
  },
  {
    icon:    UserCog,
    accent:  "from-teal-500 to-cyan-500",
    iconBg:  "bg-teal-50",
    iconFg:  "text-teal-600",
    border:  "hover:border-teal-200",
    title:   "Perfil profesional",
    desc:    "Mantén un perfil completo y actualizado con tu experiencia, especialidades y disponibilidad laboral.",
    href:    "/registro",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-una-secondary">
            ¿Por qué unirte?
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Todo lo que necesitas para tu carrera en TI
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-base text-slate-500">
            Herramientas diseñadas para impulsar tu inserción laboral en el sector tecnológico
            y mantenerte conectado con la Escuela Profesional de Ingeniería de Sistemas.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.title} delay={i * 80}>
                <div
                  className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${b.border}`}
                >
                  {/* Gradient top accent */}
                  <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r ${b.accent} mb-5`} />
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${b.iconBg} mb-4`}>
                    <Icon className={`h-5 w-5 ${b.iconFg}`} />
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-slate-900">{b.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-500">{b.desc}</p>
                  <Link
                    href={b.href}
                    className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-una-secondary transition-colors hover:text-una-primary"
                  >
                    Saber más <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
