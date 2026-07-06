import { AuthModalProvider } from "@/components/auth/auth-modal-provider"
import { PublicNavbar }      from "@/components/public/navbar"
import { PublicFooter }      from "@/components/public/footer"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      <PublicNavbar />
      <div className="pt-16">{children}</div>
      <PublicFooter />
    </AuthModalProvider>
  )
}
