// Singleton de Prisma Client para Next.js.
//
// Problema sin esto: en desarrollo, Next.js recarga el módulo en cada cambio
// (hot reload), lo que crearía cientos de conexiones a la base de datos.
// Solución: guardar la instancia en globalThis para reutilizarla.

import { PrismaClient } from "@/generated/prisma"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
