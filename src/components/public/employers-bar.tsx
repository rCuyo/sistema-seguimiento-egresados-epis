const EMPLOYERS = [
  "Tech Solutions SAC",
  "Indra Perú",
  "IBM Perú",
  "Gobierno Regional de Puno",
  "Ministerio de Transformación Digital",
  "RENIEC",
  "SUNAT",
  "Banco de la Nación",
  "NTT Data Perú",
  "Limebit",
  "Pragma",
  "Freelance / Remote",
  "Electro Puno",
  "SUNARP",
  "BCP — Banco de Crédito",
]

export function EmployersBar() {
  const all = [...EMPLOYERS, ...EMPLOYERS]

  return (
    <div className="border-y border-slate-100 bg-white py-5 overflow-hidden">
      <div className="mb-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          Egresados de Ing. Sistemas trabajando en organizaciones líderes
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex gap-6 whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {all.map((name, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-500"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
