import type { Metadata }      from "next"
import { getServerSession }    from "next-auth"
import { authOptions }         from "@/lib/auth"
import { redirect }            from "next/navigation"
import { getLandingStats }     from "@/lib/services/public.service"
import { PublicNavbar }        from "@/components/public/navbar"
import { PublicFooter }        from "@/components/public/footer"
import { HeroSection }         from "@/components/public/hero-section"
import { StatsSection }        from "@/components/public/stats-section"
import { BenefitsSection }     from "@/components/public/benefits-section"
import { AboutSection }        from "@/components/public/about-section"
import { FacultiesSection }    from "@/components/public/faculties-section"
import { EventsSection }       from "@/components/public/events-section"
import { CTASection }          from "@/components/public/cta-section"
import { EmployersBar }        from "@/components/public/employers-bar"
import { AuthModalProvider }   from "@/components/auth/auth-modal-provider"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Observatorio — Escuela Profesional de Ingeniería de Sistemas · UNA Puno",
  description:
    "Observatorio oficial de egresados de la Escuela Profesional de Ingeniería de Sistemas. Accede a la bolsa laboral TI, encuestas institucionales y tu perfil profesional.",
  keywords: [
    "egresados Ingeniería de Sistemas", "UNA Puno", "UNAP", "bolsa laboral TI",
    "observatorio de egresados", "inserción laboral tecnológica", "EPIS Puno",
    "Ingeniería de Sistemas Puno", "empleabilidad TI",
  ],
  openGraph: {
    title: "Observatorio — Ing. Sistemas · UNA Puno",
    description: "Observatorio oficial de egresados de la Escuela Profesional de Ingeniería de Sistemas — Universidad Nacional del Altiplano Puno.",
    type: "website",
    locale: "es_PE",
  },
}

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    switch (session.user.role) {
      case "ADMIN":                redirect("/admin")
      case "GRADUATE":             redirect("/egresado")
      case "DIRECTOR":             redirect("/director")
      case "PRACTICE_COORDINATOR": redirect("/coordinador")
      case "SCHOOL":               redirect("/escuela")
    }
  }

  const stats = await getLandingStats()

  return (
    <AuthModalProvider>
      <PublicNavbar />
      <main>
        <HeroSection    stats={stats} />
        <EmployersBar />
        <StatsSection   stats={stats} />
        <BenefitsSection />
        <AboutSection  />
        <FacultiesSection />
        <EventsSection />
        <CTASection    />
      </main>
      <PublicFooter />
    </AuthModalProvider>
  )
}
