"use client"

import { createContext, useContext, type Dispatch, type SetStateAction } from "react"

export type AuthTab = "login" | "register"

export interface AuthModalCtx {
  isOpen:       boolean
  tab:          AuthTab
  openLogin:    () => void
  openRegister: () => void
  close:        () => void
  setTab:       Dispatch<SetStateAction<AuthTab>>
}

export const AuthModalContext = createContext<AuthModalCtx | null>(null)

export function useAuthModal(): AuthModalCtx {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider")
  return ctx
}
