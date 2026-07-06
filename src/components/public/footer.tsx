import Link  from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react"

const QUICK_LINKS = [
  { label: "Inicio",        href: "/"          },
  { label: "Nosotros",      href: "/#nosotros"  },
  { label: "Beneficios",    href: "/#beneficios"},
  { label: "Bolsa laboral", href: "/empleos"    },
  { label: "Eventos",       href: "/#eventos"   },
  { label: "Registrarse",   href: "/registro"   },
]

const SERVICES = [
  { label: "Bolsa de empleo",         href: "/empleos"  },
  { label: "Encuestas institucionales", href: "/login"  },
  { label: "Red de egresados",          href: "/registro" },
  { label: "Portal del egresado",       href: "/login"  },
]

export function PublicFooter() {
  return (
    <footer className="bg-una-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 p-1.5">
                <Image
                  src="/images/logos/Logo_UNAP.png"
                  alt="Universidad Nacional del Altiplano Puno"
                  width={36}
                  height={39}
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1) opacity(0.85)" }}
                />
              </div>
              <div>
                <p className="font-bold leading-none text-white">UNA Puno · EPIS</p>
                <p className="text-[11px] leading-none text-white/55 tracking-wide mt-0.5">Ing. Sistemas</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Observatorio oficial de egresados de la
              Escuela Profesional de Ingeniería de Sistemas — Universidad Nacional del Altiplano Puno.
            </p>
            <div className="flex gap-3">
              {[
                { label: "FB",  title: "Facebook" },
                { label: "TW",  title: "Twitter"  },
                { label: "LI",  title: "LinkedIn" },
                { label: "YT",  title: "YouTube"  },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.title}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Navegación
            </p>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Servicios
            </p>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Contacto
            </p>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-una-accent" />
                Av. Floral 1153, Ciudad Universitaria, Puno, Perú
              </li>
              <li>
                <a
                  href="tel:+51051363158"
                  className="flex gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-una-accent" />
                  (051) 36-3158
                </a>
              </li>
              <li>
                <a
                  href="mailto:egresados@unap.edu.pe"
                  className="flex gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-una-accent" />
                  egresados@unap.edu.pe
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm text-una-accent transition-colors hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  www.unap.edu.pe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Escuela Profesional de Ingeniería de Sistemas — UNA Puno. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Términos de uso</a>
            <a href="#" className="hover:text-white/70 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white/70 transition-colors">Accesibilidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
