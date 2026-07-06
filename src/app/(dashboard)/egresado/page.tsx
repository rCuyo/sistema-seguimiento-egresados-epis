import type { Metadata }    from "next"
import { getServerSession }  from "next-auth"
import { redirect }          from "next/navigation"
import { authOptions }       from "@/lib/auth"
import { getGraduateDashboardData } from "@/lib/services/dashboard.service"
import { WelcomeBanner }  from "@/components/dashboard/graduate/welcome-banner"
import { StatsGrid }      from "@/components/dashboard/graduate/stats-grid"
import { ProfileCard }    from "@/components/dashboard/graduate/profile-card"
import { JobOffersList }  from "@/components/dashboard/graduate/job-offers-list"
import { PendingSurveys } from "@/components/dashboard/graduate/pending-surveys"
import { RecentActivity } from "@/components/dashboard/graduate/recent-activity"

export const metadata: Metadata = { title: "Mi Dashboard" }

export default async function EgresadoDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user)                  redirect("/login")
  if (session.user.role !== "GRADUATE") redirect("/")

  const data = await getGraduateDashboardData(session.user.id)
  if (!data) redirect("/login")

  const { profile, stats, pendingSurveys, recentJobs, activity } = data

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <WelcomeBanner
        firstName={profile.firstName}
        lastName={profile.lastName}
        degree={profile.degree}
        schoolName={profile.school.name}
        graduationYear={profile.graduationYear}
      />

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Middle row: job offers + right sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Job offers — 2/3 */}
        <div className="lg:col-span-2">
          <JobOffersList jobs={recentJobs} />
        </div>

        {/* Right column — 1/3 */}
        <div className="flex flex-col gap-4">
          <ProfileCard profile={profile} />
          <PendingSurveys surveys={pendingSurveys} />
        </div>
      </div>

      {/* Activity */}
      <RecentActivity activity={activity} />
    </div>
  )
}
