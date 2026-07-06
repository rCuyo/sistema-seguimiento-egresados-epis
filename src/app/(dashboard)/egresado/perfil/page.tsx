import type { Metadata }    from "next"
import { getServerSession }  from "next-auth"
import { redirect }          from "next/navigation"
import { authOptions }       from "@/lib/auth"
import { getGraduateByUserId } from "@/lib/services/graduate.service"
import { ProfileView }       from "@/components/profile/profile-view"
import type { GraduateProfile } from "@/types/graduate"

export const metadata: Metadata = { title: "Mi Perfil" }

export default async function PerfilPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user)                  redirect("/login")
  if (session.user.role !== "GRADUATE") redirect("/")

  const graduate = await getGraduateByUserId(session.user.id)
  if (!graduate) redirect("/egresado")

  // Convert Prisma model to plain serializable object for Client Components
  const profile: GraduateProfile = {
    id:                    graduate.id,
    firstName:             graduate.firstName,
    lastName:              graduate.lastName,
    secondLastName:        graduate.secondLastName,
    dni:                   graduate.dni,
    phone:                 graduate.phone,
    birthDate:             graduate.birthDate?.toISOString() ?? null,
    institutionalEmail:    graduate.institutionalEmail,
    personalEmail:         graduate.personalEmail,
    maritalStatus:         graduate.maritalStatus,
    enrollmentCode:        graduate.enrollmentCode,
    admissionPeriod:       graduate.admissionPeriod,
    graduationYear:        graduate.graduationYear,
    graduationSemester:    graduate.graduationSemester,
    firstEnrollmentPeriod: graduate.firstEnrollmentPeriod,
    degree:                graduate.degree,
    photo:                 graduate.photo,
    cvUrl:                 graduate.cvUrl,
    linkedinUrl:           graduate.linkedinUrl,
    bio:                   graduate.bio,
    employmentStatus:      graduate.employmentStatus as GraduateProfile["employmentStatus"],
    currentPosition:       graduate.currentPosition,
    currentCompany:        graduate.currentCompany,
    city:                  graduate.city,
    country:               graduate.country,
    createdAt:             graduate.createdAt.toISOString(),
    updatedAt:             graduate.updatedAt.toISOString(),
    user:                  { email: graduate.user.email },
    school:                graduate.school,
  }

  return <ProfileView initialProfile={profile} />
}
