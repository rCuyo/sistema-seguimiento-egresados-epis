"use client"

import { useState, type ReactNode } from "react"
import { AuthModalContext, type AuthTab } from "./auth-context"
import { AuthModal } from "./auth-modal"

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [tab,    setTab]    = useState<AuthTab>("login")

  const openLogin    = () => { setTab("login");    setIsOpen(true) }
  const openRegister = () => { setTab("register"); setIsOpen(true) }
  const close        = () => setIsOpen(false)

  return (
    <AuthModalContext.Provider value={{ isOpen, tab, openLogin, openRegister, close, setTab }}>
      {children}
      <AuthModal />
    </AuthModalContext.Provider>
  )
}
