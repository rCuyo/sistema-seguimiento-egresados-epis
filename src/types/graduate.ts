export type EmploymentStatusValue =
  | "EMPLOYED"
  | "SELF_EMPLOYED"
  | "UNEMPLOYED"
  | "SEEKING"
  | "STUDYING"

export interface GraduateProfile {
  id:                   string
  firstName:            string
  lastName:             string
  secondLastName:       string | null
  dni:                  string
  phone:                string | null
  birthDate:            string | null
  institutionalEmail:   string | null
  personalEmail:        string | null
  maritalStatus:        string | null
  enrollmentCode:       string | null
  admissionPeriod:      string | null
  graduationYear:       number
  graduationSemester:   string | null
  firstEnrollmentPeriod: string | null
  degree:               string
  photo:                string | null
  cvUrl:                string | null
  linkedinUrl:          string | null
  bio:                  string | null
  employmentStatus:     EmploymentStatusValue
  currentPosition:      string | null
  currentCompany:       string | null
  city:                 string | null
  country:              string
  createdAt:            string
  updatedAt:            string
  user:                 { email: string }
  school: {
    id:      string
    name:    string
    faculty: { name: string }
  }
}
