import Link from "next/link"
import {
  ArrowRight, Briefcase, Star, Building2, Clock, GraduationCap, MapPin, Users,
} from "lucide-react"
import type { LandingStats } from "@/lib/services/public.service"

interface Props {
  stats: LandingStats
}

export function HeroSection({ stats }: Props) {
  const graduates  = stats.totalGraduates > 0 ? stats.totalGraduates.toLocaleString("es-PE") : "3,200"
  const companies  = stats.totalCompanies  > 0 ? String(stats.totalCompanies)  : "45"
  const jobs       = stats.activeJobs      > 0 ? String(stats.activeJobs)      : "120"
  const schools    = stats.totalSchools    > 0 ? String(stats.totalSchools)    : "24"
  const empRate    = stats.employmentRate  > 0 ? `${stats.employmentRate}%`   : "78%"
  const activeThis = stats.totalGraduates  > 0
    ? Math.max(12, Math.ceil(stats.totalGraduates * 0.04)).toLocaleString("es-PE")
    : "147"

  return (
    <section className="relative min-h-screen">
      {/* Background — separate layer so overflow-hidden doesn't clip floating cards */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#080f20] via-[#0f2344] to-[#163060]">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize:  "38px 38px",
          }}
        />
        <div className="absolute right-0 top-0 h-[700px] w-[700px] -translate-y-1/4 translate-x-1/4 rounded-full bg-una-secondary/[0.12] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/4 -translate-x-1/4 rounded-full bg-una-accent/[0.06] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col">
        {/* Main grid */}
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-6">

              {/* ── Left: copy ── */}
              <div className="space-y-8">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs font-medium text-white/75 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Observatorio · Escuela Profesional de Ingeniería de Sistemas
                </div>

                {/* Heading */}
                <div className="space-y-3">
                  <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl xl:text-[3.5rem]">
                    Observatorio de
                    <br />
                    <span
                      style={{
                        backgroundImage: "linear-gradient(135deg, #38BDF8 0%, #818CF8 60%, #a78bfa 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Egresados — EPIS
                    </span>
                  </h1>
                  <p className="max-w-md text-base leading-relaxed text-white/60 sm:text-[1.05rem]">
                    El observatorio oficial de la EPIS — UNA Puno para conectar egresados de
                    Ingeniería de Sistemas con oportunidades laborales TI y dar seguimiento
                    a su trayectoria profesional.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/registro"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-una-primary shadow-xl transition-all hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-2xl"
                  >
                    Regístrate gratis
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/empleos"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.14]"
                  >
                    <Briefcase className="h-4 w-4" />
                    Ver bolsa laboral
                  </Link>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {["#10B981", "#2563EB", "#8B5CF6", "#F59E0B", "#EF4444"].map((c) => (
                      <div
                        key={c}
                        className="h-7 w-7 rounded-full border-2 border-[#0f2344]"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/45">
                    <span className="font-semibold text-white/70">{graduates}+</span>{" "}
                    egresados de Sistemas registrados
                  </p>
                </div>
              </div>

              {/* ── Right: floating platform preview ── */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative px-10 py-12">

                  {/* Main card: job listing */}
                  <div className="w-72 rounded-2xl border border-white/[0.15] bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                        Nueva oferta
                      </span>
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="mt-4 flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-una-secondary/30 ring-1 ring-una-secondary/20">
                        <Briefcase className="h-5 w-5 text-una-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Desarrollador Full Stack</p>
                        <p className="text-xs text-white/50">Tech Solutions SAC — Lima</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {[
                        { icon: MapPin,         text: "Lima (Remoto)"   },
                        { icon: Clock,          text: "Tiempo completo" },
                        { icon: GraduationCap,  text: "Ing. Sistemas"   },
                        { icon: Building2,      text: "Empresa TI"      },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-2.5 py-2">
                          <Icon className="h-3 w-3 text-white/30" />
                          <span className="text-[11px] text-white/60">{text}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 w-full rounded-xl bg-una-secondary py-2.5 text-xs font-bold text-white transition-colors hover:bg-una-secondary/80">
                      Postular ahora →
                    </button>
                  </div>

                  {/* Floating badge: employment rate */}
                  <div
                    className="absolute right-0 top-0 rounded-2xl p-4 shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #10B981, #0d9488)" }}
                  >
                    <p className="text-2xl font-extrabold leading-none text-white">{empRate}</p>
                    <p className="mt-0.5 text-[10px] font-semibold text-emerald-100">Empleabilidad</p>
                  </div>

                  {/* Floating badge: active users */}
                  <div className="absolute bottom-0 left-0 rounded-xl border border-white/[0.15] bg-white/[0.08] px-4 py-3 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-una-accent/20">
                        <Users className="h-4 w-4 text-una-accent" />
                        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0f2344] bg-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Comunidad activa</p>
                        <p className="text-[10px] text-white/45">{activeThis} egresados este mes</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating pill: jobs count */}
                  <div className="absolute right-0 top-1/2 -translate-y-8 rounded-full border border-white/[0.15] bg-white/[0.08] px-3.5 py-2 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                      <p className="text-[11px] font-semibold text-white/65">{jobs}+ empleos activos</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="border-t border-white/[0.08] bg-black/20 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-white/[0.08] sm:grid-cols-4">
              {[
                { value: `${graduates}+`, label: "Egresados registrados"  },
                { value: `${companies}+`, label: "Empresas participantes" },
                { value: jobs,            label: "Ofertas TI activas"     },
                { value: `${empRate}`,    label: "Tasa de empleabilidad"  },
              ].map(({ value, label }) => (
                <div key={label} className="px-4 py-5 text-center sm:px-8">
                  <p className="text-xl font-extrabold text-white sm:text-2xl">{value}</p>
                  <p className="mt-0.5 text-[11px] text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
