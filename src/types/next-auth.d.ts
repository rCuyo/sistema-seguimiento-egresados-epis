// Extiende los tipos base de NextAuth con los campos personalizados
// que agregamos en los callbacks (role, id, graduateId).

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id:         string
      role:       string       // "ADMIN" | "GRADUATE" | "DIRECTOR" | "PRACTICE_COORDINATOR" | "SCHOOL"
      graduateId: string | null
    } & DefaultSession["user"]
  }

  interface User {
    role:       string
    graduateId: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id:         string
    role:       string
    graduateId: string | null
  }
}
