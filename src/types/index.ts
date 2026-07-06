export type UserRole = "ADMIN" | "GRADUATE" | "DIRECTOR" | "PRACTICE_COORDINATOR" | "SCHOOL"

export type EmploymentStatus =
  | "EMPLOYED"
  | "SELF_EMPLOYED"
  | "UNEMPLOYED"
  | "SEEKING"
  | "STUDYING"

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}
