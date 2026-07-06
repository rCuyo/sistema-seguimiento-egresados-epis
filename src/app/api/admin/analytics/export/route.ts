import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import * as XLSX                     from "xlsx"
import {
  getGraduatesForExport,
  getApplicationsForExport,
  getSurveyResponsesForExport,
  getJobsForExport,
} from "@/lib/services/analytics.service"

const EMPLOYMENT_LABELS: Record<string, string> = {
  EMPLOYED:      "Empleado",
  SELF_EMPLOYED: "Independiente",
  UNEMPLOYED:    "Desempleado",
  SEEKING:       "Buscando empleo",
  STUDYING:      "Estudiando",
}

const APP_STATUS_LABELS: Record<string, string> = {
  PENDING:   "Pendiente",
  REVIEWED:  "En revisión",
  INTERVIEW: "Entrevista",
  ACCEPTED:  "Aceptado",
  REJECTED:  "Rechazado",
}

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME:               "Tiempo completo",
  PART_TIME:               "Medio tiempo",
  CONTRACT:                "Por contrato",
  INTERNSHIP:              "Práctica preprofesional",
  PROFESSIONAL_INTERNSHIP: "Práctica profesional",
}

function formatDate(d: Date | null | undefined) {
  if (!d) return ""
  return new Date(d).toLocaleDateString("es-PE")
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const type   = request.nextUrl.searchParams.get("type") ?? "graduates"
  const format = request.nextUrl.searchParams.get("format") ?? "xlsx"

  let rows: Record<string, unknown>[] = []
  let sheetName = "Datos"
  let fileName  = "reporte"

  if (type === "graduates") {
    const data = await getGraduatesForExport()
    rows = data.map((g) => ({
      "Nombres":              g.firstName,
      "Apellido paterno":     g.lastName,
      "Apellido materno":     g.secondLastName        ?? "",
      "DNI":                  g.dni,
      "Código de matrícula":  g.enrollmentCode        ?? "",
      "Correo de acceso":        g.user?.email             ?? "",
      "Correo institucional":    g.institutionalEmail      ?? "",
      "Correo personal":         g.personalEmail           ?? "",
      "Estado civil":         g.maritalStatus         ?? "",
      "Facultad":             g.school?.faculty?.name ?? "",
      "Escuela":              g.school?.name          ?? "",
      "Año-semestre ingreso": g.admissionPeriod       ?? "",
      "Año de egreso":        g.graduationYear,
      "Semestre de egreso":   g.graduationSemester    ?? "",
      "1ra matrícula":        g.firstEnrollmentPeriod ?? "",
      "Título":               g.degree,
      "Estado laboral":       EMPLOYMENT_LABELS[g.employmentStatus] ?? g.employmentStatus,
      "Cargo actual":         g.currentPosition       ?? "",
      "Empresa actual":       g.currentCompany        ?? "",
      "Ciudad":               g.city                  ?? "",
      "País":                 g.country,
      "Fecha de registro":    formatDate(g.createdAt),
    }))
    sheetName = "Egresados"
    fileName  = "egresados"

  } else if (type === "applications") {
    const data = await getApplicationsForExport()
    rows = data.map((a) => ({
      "Candidato":     `${a.graduate?.firstName} ${a.graduate?.lastName}`,
      "DNI":           a.graduate?.dni ?? "",
      "Oferta":        a.job?.title    ?? "",
      "Empresa":       a.job?.company?.name ?? "",
      "Estado":        APP_STATUS_LABELS[a.status] ?? a.status,
      "Fecha":         formatDate(a.appliedAt),
      "Carta de presentación": a.coverLetter ?? "",
    }))
    sheetName = "Postulaciones"
    fileName  = "postulaciones"

  } else if (type === "surveys") {
    const data = await getSurveyResponsesForExport()
    rows = data.map((r) => ({
      "Egresado":       `${r.graduate?.firstName} ${r.graduate?.lastName}`,
      "DNI":            r.graduate?.dni ?? "",
      "Encuesta":       r.survey?.title ?? "",
      "Completado el":  formatDate(r.completedAt),
    }))
    sheetName = "Respuestas"
    fileName  = "encuestas"

  } else if (type === "jobs") {
    const data = await getJobsForExport()
    rows = data.map((j) => ({
      "Título":           j.title,
      "Empresa":          j.company?.name   ?? "",
      "Sector":           j.company?.sector ?? "",
      "Tipo":             JOB_TYPE_LABELS[j.type] ?? j.type,
      "Ubicación":        j.location  ?? "",
      "Remoto":           j.isRemote  ? "Sí" : "No",
      "Salario":          j.salary    ?? "",
      "Estado":           j.isActive  ? "Activa" : "Inactiva",
      "Postulantes":      j._count.applications,
      "Publicada":        formatDate(j.createdAt),
      "Expira":           formatDate(j.expiresAt),
    }))
    sheetName = "Ofertas"
    fileName  = "ofertas"
  }

  if (format === "csv") {
    if (rows.length === 0) {
      return new NextResponse("", {
        headers: {
          "Content-Type":        "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${fileName}.csv"`,
        },
      })
    }
    const headers = Object.keys(rows[0])
    const csvRows = [
      headers.join(","),
      ...rows.map((r) =>
        headers.map((h) => {
          const val = String(r[h] ?? "").replace(/"/g, '""')
          return val.includes(",") || val.includes('"') || val.includes("\n") ? `"${val}"` : val
        }).join(",")
      ),
    ]
    const csv = "﻿" + csvRows.join("\r\n")  // BOM for Excel UTF-8

    return new NextResponse(csv, {
      headers: {
        "Content-Type":        "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${fileName}.csv"`,
      },
    })
  }

  // XLSX default
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" })

  return new NextResponse(buf, {
    headers: {
      "Content-Type":        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${fileName}.xlsx"`,
    },
  })
}
