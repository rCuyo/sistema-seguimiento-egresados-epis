import { DashboardThemeProvider } from "@/components/layout/dashboard-theme-provider"

export default function EgresadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardThemeProvider>{children}</DashboardThemeProvider>
}
