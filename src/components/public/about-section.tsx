import { CheckCircle2, Award, Globe, Code2, Quote } from "lucide-react"
import { Reveal } from "@/components/public/reveal"

const HIGHLIGHTS = [
  "Carrera acreditada por ICACIT con estándares internacionales de calidad",
  "Plan curricular orientado a las demandas reales del mercado TI",
  "Laboratorios de software, redes y hardware equipados",
  "Convenios con empresas tecnológicas y organismos del Estado",
  "Egresados colocados en empresas nacionales e internacionales",
  "Programas de posgrado en Ingeniería de Sistemas e Informática",
]

const VALUES = [
  { icon: Code2,  label: "Formación técnica",    desc: "Software y sistemas",        color: "bg-una-primary/5 text-una-primary" },
  { icon: Award,  label: "Acreditación ICACIT",  desc: "Calidad internacional",      color: "bg-emerald-50    text-emerald-600" },
  { icon: Globe,  label: "Proyección laboral",   desc: "Mercado nacional y global",  color: "bg-amber-50      text-amber-600"   },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">

          {/* ── Left ── */}
          <Reveal direction="left">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-una-secondary">
                  Sobre nosotros
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Escuela Profesional de Ingeniería de Sistemas
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Formamos ingenieros de sistemas competitivos con sólidas bases en desarrollo de software,
                  redes, inteligencia artificial y gestión de proyectos TI, comprometidos con el desarrollo
                  tecnológico de la región Puno y del Perú.
                </p>
              </div>

              {/* Mission */}
              <div className="relative rounded-2xl border border-una-secondary/20 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-una-secondary/10" />
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-una-secondary">
                  Misión
                </p>
                <p className="text-sm leading-relaxed text-slate-700">
                  "Formar ingenieros de sistemas con alto nivel académico, competencias técnicas
                  actualizadas y visión humanística, capaces de diseñar, desarrollar e implementar
                  soluciones tecnológicas que contribuyan al desarrollo regional y nacional."
                </p>
              </div>

              {/* Vision */}
              <div className="relative rounded-2xl border border-teal-200/60 bg-gradient-to-br from-teal-50 to-emerald-50 p-6">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-teal-400/20" />
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-teal-600">
                  Visión
                </p>
                <p className="text-sm leading-relaxed text-slate-700">
                  "Ser una escuela profesional acreditada y reconocida a nivel nacional por la
                  excelencia en la formación de ingenieros de sistemas innovadores, con impacto
                  en el desarrollo tecnológico y social del país."
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Right ── */}
          <Reveal direction="right" delay={150}>
            <div className="space-y-6">
              {/* Value pillars */}
              <div className="grid grid-cols-3 gap-3">
                {VALUES.map((v) => {
                  const Icon = v.icon
                  const [bg, text] = v.color.split(" ")
                  return (
                    <div
                      key={v.label}
                      className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm"
                    >
                      <div className={`mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
                        <Icon className={`h-5 w-5 ${text}`} />
                      </div>
                      <p className="text-xs font-bold text-slate-800 leading-snug">{v.label}</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">{v.desc}</p>
                    </div>
                  )
                })}
              </div>

              {/* Highlights */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <p className="mb-4 text-sm font-bold text-slate-800">Aspectos destacados</p>
                <ul className="space-y-3">
                  {HIGHLIGHTS.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                {[
                  { value: "25+",  label: "Años formando ing." },
                  { value: "12",   label: "Especialidades TI"  },
                  { value: "500+", label: "Egresados activos"  },
                ].map(({ value, label }) => (
                  <div key={label} className="py-5 text-center px-3">
                    <p className="text-2xl font-extrabold text-una-primary">{value}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
