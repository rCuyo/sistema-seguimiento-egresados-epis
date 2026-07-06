"use client"

import { useState } from "react"
import { Pencil }   from "lucide-react"
import { Button }   from "@/components/ui/button"
import { ProfileHeader }          from "./profile-header"
import { ProfileInfoCards }       from "./profile-info-cards"
import { ProfileEditForm }        from "./profile-edit-form"
import { WorkExperienceSection }  from "./work-experience-section"
import type { GraduateProfile }  from "@/types/graduate"

interface ProfileViewProps {
  initialProfile: GraduateProfile
}

export function ProfileView({ initialProfile }: ProfileViewProps) {
  const [profile, setProfile] = useState<GraduateProfile>(initialProfile)
  const [editing, setEditing] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Mi Perfil</h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Gestiona tu información profesional y datos de contacto
          </p>
        </div>
        {!editing && (
          <Button
            onClick={() => setEditing(true)}
            className="shrink-0 bg-una-secondary hover:bg-blue-700"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar perfil
          </Button>
        )}
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: profile card */}
        <div>
          <ProfileHeader profile={profile} />
        </div>

        {/* Right: info view or edit form */}
        <div className="lg:col-span-2">
          {editing ? (
            <ProfileEditForm
              profile={profile}
              onSuccess={(updated) => {
                setProfile(updated)
                setEditing(false)
              }}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <ProfileInfoCards profile={profile} />
          )}
        </div>
      </div>

      {/* Work experience section — full width */}
      {!editing && <WorkExperienceSection />}
    </div>
  )
}
