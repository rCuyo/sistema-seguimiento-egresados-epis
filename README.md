# Sistema Web de Seguimiento e Inserción Laboral del Egresado

**Escuela Profesional de Ingeniería de Sistemas — Universidad Nacional del Altiplano Puno**

Sistema web institucional para el registro, seguimiento y análisis de la situación laboral de los egresados de la E.P. Ingeniería de Sistemas, en cumplimiento del Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado (v1, mayo 2026).

---

## Descripción

La Plataforma centraliza tres funciones mandatadas por el Reglamento institucional:

- **Seguimiento de egresados:** Registro y actualización de datos personales, académicos y laborales. Historial de experiencia profesional editable.
- **Bolsa laboral institucional:** Publicación y difusión de ofertas de empleo, prácticas preprofesionales y prácticas profesionales, con soporte para enlaces externos de postulación, control de visualizaciones e interacciones.
- **Encuestas institucionales:** Creación, distribución y análisis de encuestas de seguimiento para medir la empleabilidad y la trayectoria profesional de los egresados.

El sistema incluye analítica estadística con exportación a XLSX, CSV y PDF, y paneles diferenciados para cuatro roles: Administrador, Director, Coordinador de Prácticas y Egresado.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 |
| Base de datos | PostgreSQL (Supabase Cloud) |
| ORM | Prisma 5.22 |
| Autenticación | NextAuth v4 (JWT + Credentials) |
| UI | Tailwind CSS v4 + shadcn/ui (radix-nova) |
| Validación | Zod v3 |
| Formularios | React Hook Form |
| Gráficos | Recharts |
| PDF | @react-pdf/renderer |
| Excel | xlsx |
| Runtime | Node.js 22 |

---

## Arquitectura

El sistema sigue una arquitectura **monolítica por despliegue y en capas por diseño**:

```
src/
  app/
    (auth)/          # /login, /registro — sin layout shell
    (public)/        # /, /empleos — portal público sin auth
    (dashboard)/     # /admin/**, /egresado/**, /director/**, /coordinador/** — protegido por rol
    api/             # Route Handlers REST
  components/        # Componentes React organizados por dominio
  lib/
    services/        # Capa de servicios — toda lógica de negocio y acceso a datos
    validations/     # Esquemas Zod centralizados
    actions/         # Server Actions (solo registro de egresados)
  generated/
    prisma/          # Cliente Prisma generado (importar desde @/generated/prisma)
```

**Regla fundamental:** ningún componente ni route handler accede a Prisma directamente. Toda operación de datos pasa por `src/lib/services/`.

### Roles del sistema

| Rol | Dashboard | Acceso |
|---|---|---|
| `ADMIN` | `/admin` | Acceso completo a todos los módulos |
| `GRADUATE` | `/egresado` | Perfil propio, encuestas, bolsa laboral |
| `DIRECTOR` | `/director` | Analítica, encuestas (lectura), exportaciones |
| `PRACTICE_COORDINATOR` | `/coordinador` | Encuestas (CRUD), bolsa laboral, postulaciones, analítica |
| `SCHOOL` | `/escuela` | Obsoleto — no asignar a nuevos usuarios |

---

## Requisitos previos

- Node.js 22 (ver `.nvmrc`)
- PostgreSQL accesible (Supabase recomendado)
- npm

---

## Instalación

```bash
git clone <url-del-repositorio>
cd seguimiento_egresado_web
npm install
```

---

## Variables de entorno

Crear el archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://USER:PASS@pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5"
DIRECT_URL="postgresql://USER:PASS@db.supabase.co:5432/postgres"
NEXTAUTH_SECRET="cadena-aleatoria-minimo-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"
```

- `DATABASE_URL`: Transaction Pooler de PgBouncer (puerto 6543) — para runtime.
- `DIRECT_URL`: Conexión directa a PostgreSQL (puerto 5432) — solo para migraciones.
- `NEXTAUTH_SECRET`: Generar con `openssl rand -base64 32`.

---

## Ejecución local

```bash
# Aplicar migraciones pendientes
npx prisma migrate dev

# Cargar datos de prueba
npm run seed

# Iniciar servidor de desarrollo
npm run dev
```

Acceder en: [http://localhost:3000](http://localhost:3000)

### Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@unap.edu.pe` | `admin123` |
| Director | `director@epis.edu.pe` | `director123` |
| Coordinador | `coordinador@epis.edu.pe` | `coordinador123` |
| Egresado | `juan.mamani@gmail.com` | `password123` |

---

## Comandos disponibles

```bash
npm run dev          # Servidor de desarrollo (puerto 3000)
npm run build        # Build de producción
npm run start        # Servidor de producción (requiere build previo)
npm run lint         # ESLint
npm run seed         # Carga datos de prueba

npx prisma migrate dev      # Ejecutar migraciones pendientes
npx prisma migrate deploy   # Aplicar migraciones en producción
npx prisma studio           # Interfaz gráfica de base de datos
npx prisma generate         # Regenerar cliente Prisma
```

---

## Despliegue

El sistema está preparado para despliegue en Vercel, Railway, Render o cualquier plataforma compatible con Node.js 22.

```bash
npm run build
npx prisma migrate deploy
npm run start
```

Configurar las cuatro variables de entorno en la plataforma de despliegue antes de ejecutar.

> **Nota importante:** `NEXTAUTH_URL` debe coincidir exactamente con la URL pública del sistema en producción.

---

## Documentación

La documentación técnica y académica del proyecto se encuentra en `documentacion/`:

| Documento | Archivo | Versión |
|---|---|---|
| Especificación de Requerimientos (SRS) | `SRS_v3.md` | 3.2 |
| Arquitectura de Software (DA) | `DA_EPIS_UNAP_v1.md` | 1.3 |
| Plan de Desarrollo del Software | `Plan_Desarrollo_Software_EPIS_UNAP.md` | 1.1 |
| Informe Semanal de Prácticas | `Informe_Semanal_Practicas_EPIS_UNAP.md` | — |
| Manual de Usuario | `Manual_Usuario_v1.md` | 1.0 |
| Manual de Instalación y Despliegue | `Manual_Instalacion_v1.md` | 1.0 |
| Manual de Administración del Sistema | `Manual_Administracion_v1.md` | 1.0 |
| Reportes diarios de prácticas | `reportes_diarios/` | — |

---

## Licencia

Desarrollado como proyecto de prácticas preprofesionales en la Comisión de Seguimiento al Egresado, E.P. Ingeniería de Sistemas, Universidad Nacional del Altiplano Puno. Uso institucional exclusivo.

---

## Autores

- **Practicante:** Robert Charlie Cuyo Zamata
- **Supervisora:** Guina Guadalupe Sotomayor Alzamora — Comisión de Seguimiento al Egresado, E.P. Ingeniería de Sistemas, UNA Puno
