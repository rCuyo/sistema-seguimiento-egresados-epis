import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
})

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",      type: "email"    },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where:   { email: parsed.data.email },
          include: {
            graduate: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        })

        if (!user || !user.password || !user.isActive) return null

        const valid = await bcrypt.compare(parsed.data.password, user.password)
        if (!valid) return null

        const roleName =
          user.role === "DIRECTOR"             ? "Director" :
          user.role === "PRACTICE_COORDINATOR" ? "Coordinador de Prácticas" :
          "Administrador"

        return {
          id:         user.id,
          email:      user.email,
          name:       user.graduate
            ? `${user.graduate.firstName} ${user.graduate.lastName}`
            : roleName,
          role:       user.role,
          graduateId: user.graduate?.id ?? null,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Al hacer login, "user" está definido y guardamos los datos en el token JWT
      if (user) {
        token.id         = user.id
        token.role       = (user as { role: string }).role
        token.graduateId = (user as { graduateId: string | null }).graduateId ?? null
      }
      return token
    },
    async session({ session, token }) {
      // Inyectamos los datos del token en la sesión disponible al cliente
      if (session.user) {
        session.user.id         = token.id         as string
        session.user.role       = token.role       as string
        session.user.graduateId = token.graduateId as string | null
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
    error:  "/login",
  },

  session: { strategy: "jwt" },
  secret:  process.env.NEXTAUTH_SECRET,
}
