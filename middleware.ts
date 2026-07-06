import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// withAuth envuelve el middleware con verificación de sesión automática.
// Si el usuario no está autenticado, lo redirige a /login.
// Si está autenticado, ejecuta la función para verificar el rol.

export default withAuth(
  function middleware(req) {
    const token    = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Verificar que el rol coincide con la ruta que intenta acceder
    if (pathname.startsWith("/admin")       && token?.role !== "ADMIN")                {
      return NextResponse.redirect(new URL(dashboardFor(token?.role), req.url))
    }
    if (pathname.startsWith("/egresado")    && token?.role !== "GRADUATE")             {
      return NextResponse.redirect(new URL(dashboardFor(token?.role), req.url))
    }
    if (pathname.startsWith("/director")    && token?.role !== "DIRECTOR")             {
      return NextResponse.redirect(new URL(dashboardFor(token?.role), req.url))
    }
    if (pathname.startsWith("/coordinador") && token?.role !== "PRACTICE_COORDINATOR") {
      return NextResponse.redirect(new URL(dashboardFor(token?.role), req.url))
    }
    if (pathname.startsWith("/escuela")     && token?.role !== "SCHOOL")               {
      return NextResponse.redirect(new URL(dashboardFor(token?.role), req.url))
    }
  },
  {
    callbacks: {
      // authorized retorna true si el usuario puede acceder a la ruta protegida.
      // Si retorna false, NextAuth redirige automáticamente a /login.
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
)

function dashboardFor(role?: string | null): string {
  switch (role) {
    case "ADMIN":                return "/admin"
    case "GRADUATE":             return "/egresado"
    case "DIRECTOR":             return "/director"
    case "PRACTICE_COORDINATOR": return "/coordinador"
    case "SCHOOL":               return "/escuela"
    default:                     return "/login"
  }
}

// Solo protege estas rutas — las páginas /login y /registro quedan públicas
export const config = {
  matcher: ["/admin/:path*", "/egresado/:path*", "/director/:path*", "/coordinador/:path*", "/escuela/:path*"],
}
