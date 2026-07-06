import Link from "next/link"
import { CalendarDays, MapPin, ArrowRight, Megaphone, GraduationCap, Briefcase, Users } from "lucide-react"
import { Reveal } from "@/components/public/reveal"

const EVENTS = [
  {
    badge:     "Conferencia",
    badgeBg:   "bg-violet-100 text-violet-700",
    gradient:  "from-violet-500 to-purple-600",
    icon:      GraduationCap,
    title:     "XII Conferencia Internacional de Ciencias e Ingeniería",
    date:      "28 Mayo 2026",
    location:  "Auditorio Central — Ciudad Universitaria",
    desc:      "Investigaciones y avances tecnológicos liderados por egresados y docentes de la región altiplánica.",
  },
  {
    badge:     "Feria",
    badgeBg:   "bg-blue-100 text-blue-700",
    gradient:  "from-una-secondary to-blue-600",
    icon:      Briefcase,
    title:     "Feria de Empleabilidad UNA Puno 2026",
    date:      "12 Junio 2026",
    location:  "Pabellón de Ciencias — UNA Puno",
    desc:      "+40 empresas regionales y nacionales para reclutar egresados de todas las facultades.",
  },
  {
    badge:     "Programa",
    badgeBg:   "bg-emerald-100 text-emerald-700",
    gradient:  "from-emerald-500 to-teal-500",
    icon:      Users,
    title:     "Programa de Mentorías para Egresados 2026",
    date:      "Inscripciones abiertas",
    location:  "Modalidad virtual y presencial",
    desc:      "Conecta con mentores experimentados en tu área y recibe orientación profesional personalizada.",
  },
  {
    badge:     "Convocatoria",
    badgeBg:   "bg-amber-100 text-amber-700",
    gradient:  "from-amber-500 to-orange-500",
    icon:      Megaphone,
    title:     "Actualización de Datos para Egresados",
    date:      "Hasta 30 Junio 2026",
    location:  "Plataforma en línea",
    desc:      "Actualiza tu información laboral y de contacto. Accede a beneficios exclusivos verificados.",
  },
]

export function EventsSection() {
  return (
    <section id="eventos" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-una-secondary">
                Agenda institucional
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Eventos y convocatorias
              </h2>
              <p className="mt-2 text-base text-slate-500 max-w-lg">
                Mantente al día con las actividades académicas, laborales y de networking
              </p>
            </div>
            <Link
              href="/login"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map((ev, i) => {
            const Icon = ev.icon
            return (
              <Reveal key={ev.title} delay={i * 90}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Colored header */}
                  <div className={`relative h-20 bg-gradient-to-br ${ev.gradient} flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white/80" />
                    <span className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${ev.badgeBg}`}>
                      {ev.badge}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-sm font-bold leading-snug text-slate-900">
                      {ev.title}
                    </h3>
                    <p className="flex-1 text-xs leading-relaxed text-slate-500">
                      {ev.desc}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      {ev.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
