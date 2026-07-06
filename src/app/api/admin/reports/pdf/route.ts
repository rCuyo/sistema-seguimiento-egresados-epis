import { NextRequest, NextResponse } from "next/server"
import { getServerSession }          from "next-auth"
import { authOptions }               from "@/lib/auth"
import {
  getGlobalKPIs,
  getGraduatesByFaculty,
  getEmploymentStatusDist,
  getGraduationByYear,
} from "@/lib/services/analytics.service"

// Dynamic import to keep @react-pdf/renderer server-only
async function generatePDF(data: {
  kpis:        Awaited<ReturnType<typeof getGlobalKPIs>>
  byFaculty:   Awaited<ReturnType<typeof getGraduatesByFaculty>>
  statusDist:  Awaited<ReturnType<typeof getEmploymentStatusDist>>
  byYear:      Awaited<ReturnType<typeof getGraduationByYear>>
  generatedAt: string
}) {
  const ReactPDF = await import("@react-pdf/renderer")
  const React    = await import("react")

  const { Document, Page, Text, View, StyleSheet, pdf } = ReactPDF

  const styles = StyleSheet.create({
    page:    { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#1e293b" },
    header:  { marginBottom: 24, borderBottom: "2 solid #1E3A5F", paddingBottom: 12 },
    title:   { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#1E3A5F", marginBottom: 2 },
    subtitle: { fontSize: 10, color: "#64748b" },
    section: { marginTop: 20, marginBottom: 8 },
    sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", color: "#1E3A5F", marginBottom: 8, borderBottom: "1 solid #e2e8f0", paddingBottom: 4 },
    kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
    kpiCard: { width: "22%", backgroundColor: "#f8fafc", border: "1 solid #e2e8f0", borderRadius: 4, padding: 8 },
    kpiValue: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#1E3A5F" },
    kpiLabel: { fontSize: 8, color: "#64748b", marginTop: 2 },
    table:   { marginTop: 8 },
    tableRow:  { flexDirection: "row", borderBottom: "1 solid #f1f5f9", paddingVertical: 4 },
    tableHeader: { flexDirection: "row", backgroundColor: "#f1f5f9", paddingVertical: 5, paddingHorizontal: 4, marginBottom: 2 },
    col1: { flex: 3, fontSize: 9 },
    col2: { flex: 1, textAlign: "right" as const, fontSize: 9 },
    footer: { position: "absolute" as never, bottom: 30, left: 40, right: 40, textAlign: "center" as const, fontSize: 8, color: "#94a3b8" },
  })

  const Doc = React.createElement(
    Document,
    { title: "Reporte Institucional — Ing. Sistemas · UNA Puno" },
    React.createElement(
      Page,
      { size: "A4", style: styles.page },

      // Header
      React.createElement(View, { style: styles.header },
        React.createElement(Text, { style: styles.title }, "Reporte Institucional de Egresados"),
        React.createElement(Text, { style: styles.subtitle },
          `Escuela Profesional de Ingeniería de Sistemas — UNA Puno · Generado el ${data.generatedAt}`
        )
      ),

      // KPIs
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Indicadores Clave"),
        React.createElement(View, { style: styles.kpiGrid },
          ...[
            { label: "Total Egresados",       value: String(data.kpis.totalGraduates)    },
            { label: "Tasa de Empleabilidad", value: `${data.kpis.employmentRate}%`      },
            { label: "Encuestas respondidas", value: String(data.kpis.totalSurveyResponses) },
            { label: "Total Postulaciones",   value: String(data.kpis.totalApplications) },
          ].map((kpi) =>
            React.createElement(View, { style: styles.kpiCard, key: kpi.label },
              React.createElement(Text, { style: styles.kpiValue }, kpi.value),
              React.createElement(Text, { style: styles.kpiLabel }, kpi.label)
            )
          )
        )
      ),

      // Faculty table
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Egresados por Facultad"),
        React.createElement(View, { style: styles.table },
          React.createElement(View, { style: styles.tableHeader },
            React.createElement(Text, { style: styles.col1 }, "Facultad"),
            React.createElement(Text, { style: styles.col2 }, "Egresados")
          ),
          ...data.byFaculty.map((f) =>
            React.createElement(View, { style: styles.tableRow, key: f.faculty },
              React.createElement(Text, { style: styles.col1 }, f.faculty),
              React.createElement(Text, { style: styles.col2 }, String(f.count))
            )
          )
        )
      ),

      // Employment status table
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Distribución de Estado Laboral"),
        React.createElement(View, { style: styles.table },
          React.createElement(View, { style: styles.tableHeader },
            React.createElement(Text, { style: styles.col1 }, "Estado"),
            React.createElement(Text, { style: styles.col2 }, "Cantidad")
          ),
          ...data.statusDist.map((s) =>
            React.createElement(View, { style: styles.tableRow, key: s.status },
              React.createElement(Text, { style: styles.col1 }, s.label),
              React.createElement(Text, { style: styles.col2 }, String(s.count))
            )
          )
        )
      ),

      // Graduation trend table
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Evolución de Egresos por Año"),
        React.createElement(View, { style: styles.table },
          React.createElement(View, { style: styles.tableHeader },
            React.createElement(Text, { style: styles.col1 }, "Año"),
            React.createElement(Text, { style: styles.col2 }, "Egresados")
          ),
          ...data.byYear.map((y) =>
            React.createElement(View, { style: styles.tableRow, key: String(y.year) },
              React.createElement(Text, { style: styles.col1 }, String(y.year)),
              React.createElement(Text, { style: styles.col2 }, String(y.count))
            )
          )
        )
      ),

      // Footer
      React.createElement(Text, { style: styles.footer },
        `UNA Puno · EPIS — Observatorio — Página 1`
      )
    )
  )

  const stream = await pdf(Doc).toBuffer()
  return stream
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  if (!["ADMIN", "DIRECTOR", "PRACTICE_COORDINATOR"].includes(session.user.role))
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

  const sp = request.nextUrl.searchParams
  const filters = {
    facultyId: sp.get("facultyId") ?? undefined,
    schoolId:  sp.get("schoolId")  ?? undefined,
    year:      sp.get("year")      ? parseInt(sp.get("year")!) : undefined,
    status:    sp.get("status")    ?? undefined,
  }

  const [kpis, byFaculty, statusDist, byYear] = await Promise.all([
    getGlobalKPIs(filters),
    getGraduatesByFaculty(filters),
    getEmploymentStatusDist(filters),
    getGraduationByYear(filters),
  ])

  const generatedAt = new Date().toLocaleDateString("es-PE", {
    day: "2-digit", month: "long", year: "numeric",
  })

  try {
    const buffer = await generatePDF({ kpis, byFaculty, statusDist, byYear, generatedAt })

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="reporte-una-puno-${new Date().toISOString().split("T")[0]}.pdf"`,
      },
    })
  } catch (err) {
    console.error("PDF generation error:", err)
    return NextResponse.json({ error: "Error al generar el PDF" }, { status: 500 })
  }
}
