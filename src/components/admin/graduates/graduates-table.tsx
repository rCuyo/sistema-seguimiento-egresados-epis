import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GraduateListItem } from "@/lib/services/admin-graduates.service"

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  EMPLOYED:      { label: "Empleado",       className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  SELF_EMPLOYED: { label: "Independiente",  className: "bg-blue-50 text-blue-700 ring-blue-200"         },
  UNEMPLOYED:    { label: "Desempleado",    className: "bg-red-50 text-red-700 ring-red-200"             },
  SEEKING:       { label: "Buscando",       className: "bg-amber-50 text-amber-700 ring-amber-200"       },
  STUDYING:      { label: "Estudiando",     className: "bg-violet-50 text-violet-700 ring-violet-200"    },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, className: "bg-slate-100 text-slate-600 ring-slate-200" }
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", cfg.className)}>
      {cfg.label}
    </span>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-una-primary text-xs font-semibold text-white">
      {initials}
    </div>
  )
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("es-PE", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
  })
}

interface GraduatesTableProps {
  graduates: GraduateListItem[]
  total:     number
}

export function GraduatesTable({ graduates, total }: GraduatesTableProps) {
  if (graduates.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <ExternalLink className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-700">Sin resultados</p>
          <p className="mt-1 text-xs text-slate-400">
            Ajusta los filtros para encontrar egresados.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Table header row with result count */}
      <div className="flex items-center justify-between border-b bg-slate-50/60 px-5 py-3">
        <p className="text-xs font-medium text-slate-500">
          {total.toLocaleString("es-PE")} resultado{total !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 pl-5 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Egresado</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Año</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Estado</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Cargo / Empresa</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Registro</th>
              <th className="py-3 pl-3 pr-5 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {graduates.map((g) => {
              const fullName = [g.firstName, g.lastName, g.secondLastName].filter(Boolean).join(" ")
              return (
                <tr
                  key={g.id}
                  className="group transition-colors hover:bg-slate-50/70"
                >
                  {/* Name + email */}
                  <td className="py-3.5 pl-5 pr-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={fullName} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">{fullName}</p>
                        <p className="truncate text-xs text-slate-400">{g.user?.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Graduation year */}
                  <td className="px-3 py-3.5">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                      {g.graduationYear}
                    </span>
                  </td>

                  {/* Employment status */}
                  <td className="px-3 py-3.5">
                    <StatusBadge status={g.employmentStatus} />
                  </td>

                  {/* Position / Company */}
                  <td className="px-3 py-3.5">
                    {g.currentPosition ? (
                      <>
                        <p className="truncate text-slate-700">{g.currentPosition}</p>
                        {g.currentCompany && (
                          <p className="truncate text-xs text-slate-400">{g.currentCompany}</p>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </td>

                  {/* Created at */}
                  <td className="px-3 py-3.5 text-xs text-slate-400">
                    {formatDate(g.createdAt)}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 pl-3 pr-5 text-right">
                    <Link
                      href={`/admin/egresados/${g.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-una-secondary hover:text-una-secondary group-hover:shadow-sm"
                    >
                      Ver
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
