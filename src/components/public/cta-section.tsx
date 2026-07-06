import Link from "next/link"
import { ArrowRight, Briefcase, CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/public/reveal"

const PERKS = [
  "Registro gratuito",
  "Solo para egresados de Ing. Sistemas",
  "Ofertas TI exclusivas",
  "Red profesional activa",
]

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#080f20] via-una-primary to-[#163060] py-24">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize:  "32px 32px",
        }}
      />
      {/* Blobs */}
      <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-una-secondary/15 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-una-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-widest text-una-accent">
            Únete hoy — Es gratis
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            ¿Eres egresado de Ingeniería de Sistemas?
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Regístrate en segundos y accede a la plataforma oficial de la EPIS — UNA Puno.
            Conecta con ofertas TI y oportunidades diseñadas para ingenieros de sistemas.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/registro"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-una-primary shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-white/20"
            >
              Crear cuenta gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/empleos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/[0.14]"
            >
              <Briefcase className="h-4 w-4" />
              Explorar empleos
            </Link>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-1.5 text-xs text-white/40">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
                {perk}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
