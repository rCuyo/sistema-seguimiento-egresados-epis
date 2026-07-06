---
title: "Manual de Instalación y Despliegue"
subtitle: "Sistema Web de Seguimiento e Inserción Laboral del Egresado\nEscuela Profesional de Ingeniería de Sistemas\nUniversidad Nacional del Altiplano Puno"
author: "Comisión de Seguimiento al Egresado — E.P. Ingeniería de Sistemas"
date: "Junio 2026"
lang: es
toc: true
toc-depth: 3
numbersections: true
geometry: "top=2.5cm,bottom=2.5cm,left=3cm,right=2.5cm"
fontsize: 12pt
linestretch: 1.5
---

\newpage

# Hoja de Control

| Campo | Detalle |
|---|---|
| **Título del documento** | Manual de Instalación y Despliegue |
| **Nombre del sistema** | Sistema Web de Seguimiento e Inserción Laboral del Egresado |
| **Unidad académica** | E.P. Ingeniería de Sistemas — Universidad Nacional del Altiplano Puno |
| **Versión del documento** | 1.0 |
| **Fecha de elaboración** | Junio 2026 |
| **Elaborado por** | Robert Charlie Cuyo Zamata (practicante preprofesional) |
| **Supervisado por** | Guina Guadalupe Sotomayor Alzamora |
| **Estado** | Versión inicial |

## Historial de Versiones

| Versión | Fecha | Autor | Descripción |
|---|---|---|---|
| 1.0 | Junio 2026 | Robert Charlie Cuyo Zamata | Creación del documento inicial |

\newpage

# Introducción

## Propósito

Este manual describe los procedimientos necesarios para instalar, configurar y desplegar el Sistema Web de Seguimiento e Inserción Laboral del Egresado en entornos de desarrollo local y en producción. Está dirigido al personal técnico encargado de la puesta en marcha y mantenimiento del sistema.

## Alcance

El manual cubre los siguientes escenarios de despliegue:

- **Entorno de desarrollo local**: instalación en una máquina personal para pruebas y desarrollo.
- **Producción en la nube**: despliegue recomendado mediante Vercel (plataforma de alojamiento) con base de datos en Supabase (PostgreSQL en la nube).
- **Alternativas**: Railway, Render y servidor VPS con PM2.

No se aborda la administración del sistema ni el uso de sus módulos funcionales; para ello consultar el Manual de Administración y el Manual de Usuario.

## Definiciones Clave

| Término | Significado |
|---|---|
| **Next.js** | Framework de React para aplicaciones web con renderizado en servidor |
| **Prisma** | ORM (mapeador objeto-relacional) que gestiona el acceso a la base de datos PostgreSQL |
| **Supabase** | Plataforma de base de datos PostgreSQL administrada en la nube |
| **Vercel** | Plataforma de despliegue especializada en aplicaciones Next.js |
| **npm** | Gestor de paquetes de Node.js |
| **Migración** | Script SQL que crea o actualiza la estructura de la base de datos |
| **Seed** | Proceso de carga de datos iniciales de prueba en la base de datos |
| **PM2** | Gestor de procesos para Node.js en servidores Linux/VPS |

\newpage

# Requisitos del Sistema

## Requisitos de Software

| Software | Versión mínima | Versión recomendada | Notas |
|---|---|---|---|
| Node.js | 20.x LTS | 22.x LTS | Usar versión LTS estable |
| npm | 10.x | 10.x o superior | Incluido con Node.js |
| Git | 2.x | última estable | Para clonar el repositorio |
| PostgreSQL | 15.x | 16.x | Puede ser local o en la nube (Supabase) |

> **Nota**: Se recomienda usar [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) para gestionar versiones de Node.js. El repositorio incluye un archivo `.nvmrc` con la versión correcta.

## Requisitos de Hardware (mínimos para el servidor de producción)

| Componente | Mínimo |
|---|---|
| CPU | 1 vCPU |
| RAM | 512 MB (recomendado 1 GB) |
| Almacenamiento | 1 GB disponible |
| Ancho de banda | Según carga esperada |

Para despliegue en Vercel (opción recomendada), los requisitos de hardware son gestionados por la plataforma y no aplican directamente.

## Navegadores Compatibles

| Navegador | Versión mínima |
|---|---|
| Google Chrome | 110 o superior |
| Mozilla Firefox | 110 o superior |
| Microsoft Edge | 110 o superior |
| Safari | 16 o superior |

No se garantiza compatibilidad con Internet Explorer en ninguna versión.

\newpage

# Obtención del Código Fuente

## Clonar el Repositorio

Para obtener el código fuente del sistema, ejecutar el siguiente comando en la terminal:

```bash
git clone <URL_DEL_REPOSITORIO> seguimiento_egresado_web
cd seguimiento_egresado_web
```

Reemplazar `<URL_DEL_REPOSITORIO>` con la URL del repositorio Git proporcionada por el equipo de desarrollo.

## Verificar la Versión de Node.js

Si se usa nvm, activar la versión correcta automáticamente:

```bash
nvm use
```

De lo contrario, verificar manualmente que la versión instalada sea la adecuada:

```bash
node --version
npm --version
```

\newpage

# Instalación de Dependencias

## Instalar Paquetes npm

Desde la raíz del proyecto, ejecutar:

```bash
npm install
```

Este comando descarga todas las dependencias listadas en `package.json`. El paso de post-instalación ejecuta automáticamente `npx prisma generate`, que genera el cliente Prisma necesario para acceder a la base de datos. No es necesario ejecutar `prisma generate` manualmente después de `npm install`.

## Verificar la Instalación

Al finalizar, el directorio `node_modules/` debe existir y no debe haberse producido ningún error crítico. Las advertencias (`warn`) son aceptables y no impiden el funcionamiento del sistema.

\newpage

# Configuración de Variables de Entorno

## Crear el Archivo .env

En la raíz del proyecto, crear un archivo llamado `.env` (sin extensión adicional) con el siguiente contenido como plantilla:

```env
# Base de datos — URL con pooling (PgBouncer / Supabase Transaction Mode)
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/basededatos?pgbouncer=true"

# URL directa sin pooling — usada por Prisma para migraciones
DIRECT_URL="postgresql://usuario:contraseña@host:puerto/basededatos"

# Secreto para firma de tokens JWT de NextAuth (mínimo 32 caracteres)
NEXTAUTH_SECRET="reemplazar_con_cadena_aleatoria_larga_y_secreta"

# URL canónica del sistema (sin barra al final)
NEXTAUTH_URL="http://localhost:3000"
```

> **ADVERTENCIA DE SEGURIDAD**: El archivo `.env` contiene credenciales sensibles. Nunca lo incluya en el repositorio Git. Verificar que `.gitignore` lo excluya (ya está configurado en este proyecto). No compartir este archivo por correo electrónico ni canales no seguros.

## Descripción de Cada Variable

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DATABASE_URL` | Cadena de conexión PostgreSQL con pooling habilitado. Usada en tiempo de ejecución de la aplicación. El parámetro `?pgbouncer=true` es obligatorio cuando se usa Supabase Transaction Mode o PgBouncer. | Ver sección 6 |
| `DIRECT_URL` | Cadena de conexión directa sin pooling. Usada exclusivamente por Prisma al ejecutar migraciones (`prisma migrate dev` / `prisma migrate deploy`). | Ver sección 6 |
| `NEXTAUTH_SECRET` | Cadena aleatoria usada para firmar y cifrar los tokens de sesión. Debe ser única y secreta. | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL base donde está disponible el sistema. En producción, usar el dominio real (ej. `https://seguimiento.epis.unap.edu.pe`). | `http://localhost:3000` |

## Generar un NEXTAUTH_SECRET Seguro

En sistemas Unix/macOS o en la terminal de Git Bash (Windows), ejecutar:

```bash
openssl rand -base64 32
```

Copiar el resultado y pegarlo como valor de `NEXTAUTH_SECRET` en el archivo `.env`.

\newpage

# Configuración de la Base de Datos

## Opción Recomendada: Supabase

Supabase ofrece un plan gratuito (con límites) adecuado para desarrollo y proyectos institucionales de escala media. A continuación se describe el proceso de creación del proyecto:

### Pasos para Crear el Proyecto en Supabase

1. Ingresar a [https://supabase.com](https://supabase.com) y crear una cuenta o iniciar sesión.
2. Hacer clic en **New Project**.
3. Seleccionar la organización o crear una nueva.
4. Completar los datos del proyecto:
   - **Name**: `seguimiento-egresado` (o el nombre deseado)
   - **Database Password**: establecer una contraseña segura y guardarla
   - **Region**: seleccionar la región más cercana (ej. `South America (São Paulo)`)
5. Hacer clic en **Create new project** y esperar a que se aprovisione (puede tomar 1-2 minutos).

### Obtener las Cadenas de Conexión

Una vez creado el proyecto:

1. En el menú lateral de Supabase, ir a **Project Settings** → **Database**.
2. En la sección **Connection string**, seleccionar la pestaña **URI**.
3. Copiar la cadena de **Transaction** (modo pooled) — esta es la `DATABASE_URL`.
4. Copiar la cadena de **Session** o la URL directa — esta es la `DIRECT_URL`.

La `DATABASE_URL` debe incluir `?pgbouncer=true` al final si se usa Transaction Mode. Supabase lo indica en su interfaz.

### Ejemplo de Cadenas Supabase

```env
DATABASE_URL="postgresql://postgres.abcdefghijkl:MiContraseña@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

DIRECT_URL="postgresql://postgres.abcdefghijkl:MiContraseña@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
```

> **Nota**: Los puertos estándar son `6543` para Transaction Mode (pooled) y `5432` para Session/Direct. Estos valores pueden variar según la región.

## Opción Alternativa: PostgreSQL Local

Para desarrollo con base de datos local instalada en la misma máquina:

```env
DATABASE_URL="postgresql://postgres:contraseña@localhost:5432/seguimiento_egresado"
DIRECT_URL="postgresql://postgres:contraseña@localhost:5432/seguimiento_egresado"
```

Crear la base de datos previamente:

```bash
psql -U postgres -c "CREATE DATABASE seguimiento_egresado;"
```

\newpage

# Migraciones de Base de Datos

## Concepto

Las migraciones son scripts SQL que crean o modifican la estructura de las tablas en la base de datos. Deben ejecutarse antes de iniciar el sistema por primera vez, y cada vez que se actualice el código con cambios en el esquema.

## Para Entorno de Desarrollo

```bash
npx prisma migrate dev
```

Este comando:
1. Detecta cambios en `prisma/schema.prisma`.
2. Genera y aplica los scripts SQL correspondientes en la base de datos indicada por `DIRECT_URL`.
3. Regenera el cliente Prisma.

Al ejecutarlo por primera vez creará todas las tablas necesarias desde cero.

> **Nota**: En desarrollo, si se solicita nombre para la migración, ingresar algo descriptivo como `init` o `initial`.

## Para Entorno de Producción

En producción nunca usar `migrate dev`. Usar en su lugar:

```bash
npx prisma migrate deploy
```

Este comando aplica únicamente las migraciones pendientes que ya han sido generadas y versionadas en el repositorio, sin crear migraciones nuevas ni interactuar con el código fuente.

## Verificar el Estado de Migraciones

Para ver qué migraciones están aplicadas y cuáles están pendientes:

```bash
npx prisma migrate status
```

\newpage

# Carga de Datos Iniciales (Seed)

## Descripción

El proceso de seed carga datos iniciales de prueba en la base de datos: un usuario administrador, un director, un coordinador, una facultad, una escuela profesional, egresados de ejemplo, encuestas, ofertas de trabajo y respuestas.

## Ejecutar el Seed

```bash
npm run seed
```

Este comando ejecuta `prisma/seed.ts` mediante `tsx`. El proceso puede tardar entre 10 y 30 segundos según la velocidad de la conexión a la base de datos.

## Credenciales Creadas por el Seed

| Rol | Correo | Contraseña | Ruta de acceso |
|---|---|---|---|
| ADMIN | admin@unap.edu.pe | admin123 | /admin |
| DIRECTOR | director@epis.edu.pe | director123 | /director |
| PRACTICE_COORDINATOR | coordinador@epis.edu.pe | coordinador123 | /coordinador |
| GRADUATE | juan.mamani@gmail.com | password123 | /egresado |

> **ADVERTENCIA**: Estas credenciales son únicamente para pruebas. En producción, cambiar las contraseñas inmediatamente después del primer inicio de sesión usando las herramientas de administración de la base de datos, o bien no ejecutar el seed y crear los usuarios manualmente.

## Consideraciones

- El seed puede ejecutarse varias veces de forma segura; usa operaciones `upsert` para no duplicar datos.
- Si se ejecuta el seed sin haber corrido las migraciones primero, el proceso fallará con un error de tabla inexistente.

\newpage

# Ejecución en Entorno Local

## Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El sistema iniciará en modo desarrollo con recarga en caliente (hot reload). Al terminar de compilar, se mostrará en la terminal:

```
▲ Next.js 16.x.x
- Local: http://localhost:3000
```

Abrir un navegador y acceder a `http://localhost:3000`.

## Verificar el Funcionamiento

1. La página de inicio (landing) debe cargarse correctamente.
2. Acceder a `http://localhost:3000/login` y autenticarse con alguna de las credenciales de prueba.
3. Verificar que el panel correspondiente al rol se muestre sin errores.

## Otros Comandos Útiles

```bash
# Abrir la interfaz gráfica de Prisma para explorar la base de datos
npx prisma studio

# Ejecutar el linter ESLint para detectar errores de código
npm run lint
```

Prisma Studio abre en el navegador en `http://localhost:5555` y permite visualizar y editar los datos directamente.

\newpage

# Construcción y Ejecución en Producción (Local)

## Generar el Build de Producción

```bash
npm run build
```

Este comando compila la aplicación para producción. Puede tardar varios minutos. Al finalizar exitosamente mostrará un resumen de las páginas generadas.

> **Nota**: El build fallará si existen errores de TypeScript o ESLint. Resolver los errores indicados antes de reintentar.

## Iniciar el Servidor de Producción

```bash
npm run start
```

Inicia el servidor Next.js en modo producción. Por defecto escucha en el puerto 3000. Para cambiar el puerto:

```bash
npm run start -- -p 8080
```

\newpage

# Despliegue en Vercel (Recomendado)

Vercel es la plataforma de despliegue oficial de Next.js y la opción recomendada para este sistema.

## Requisitos Previos

- Cuenta en [https://vercel.com](https://vercel.com) (puede registrarse con su cuenta de GitHub, GitLab o Bitbucket).
- Repositorio del proyecto subido a GitHub (o GitLab/Bitbucket).
- Proyecto en Supabase configurado con las tablas migradas.

## Pasos de Despliegue

### Paso 1: Conectar el Repositorio

1. Iniciar sesión en Vercel.
2. Hacer clic en **Add New → Project**.
3. Seleccionar el repositorio de GitHub donde está el código del sistema.
4. Vercel detectará automáticamente que es un proyecto Next.js.

### Paso 2: Configurar Variables de Entorno

En la pantalla de configuración del proyecto (antes de hacer clic en Deploy):

1. Expandir la sección **Environment Variables**.
2. Agregar cada variable una por una:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | Cadena de conexión pooled de Supabase |
| `DIRECT_URL` | Cadena de conexión directa de Supabase |
| `NEXTAUTH_SECRET` | Cadena aleatoria segura (min. 32 caracteres) |
| `NEXTAUTH_URL` | URL del despliegue, ej. `https://mi-proyecto.vercel.app` |

> **Importante**: `NEXTAUTH_URL` debe coincidir exactamente con la URL donde el sistema queda desplegado. Si se usa un dominio personalizado, usar ese dominio.

### Paso 3: Ejecutar el Despliegue

1. Hacer clic en **Deploy**.
2. Vercel compilará y desplegará el sistema automáticamente.
3. Al finalizar, se mostrará la URL de producción (ej. `https://seguimiento-egresado.vercel.app`).

### Paso 4: Ejecutar Migraciones en Producción

Una vez desplegado, ejecutar las migraciones en la base de datos de producción desde la máquina local (con las variables de entorno de producción cargadas):

```bash
# Opción 1: usando un archivo .env.production local
npx dotenv -e .env.production -- npx prisma migrate deploy

# Opción 2: estableciendo las variables directamente
DATABASE_URL="..." DIRECT_URL="..." npx prisma migrate deploy
```

### Paso 5: Cargar Datos Iniciales (Opcional)

Si se desea cargar datos de prueba en producción:

```bash
DATABASE_URL="..." DIRECT_URL="..." npm run seed
```

### Actualizaciones Futuras

Cada `git push` a la rama principal (`main`) desencadenará automáticamente un nuevo despliegue en Vercel. Las migraciones de base de datos deben ejecutarse manualmente antes o después de cada despliegue que incluya cambios en el esquema.

\newpage

# Despliegue en Alternativas

## Railway

[Railway](https://railway.app) es una plataforma que permite desplegar tanto la aplicación como la base de datos PostgreSQL en un mismo proyecto.

```bash
# Instalar CLI de Railway
npm install -g @railway/cli

# Iniciar sesión
railway login

# Inicializar proyecto en Railway
railway init

# Vincular con el proyecto creado en Railway
railway link

# Desplegar
railway up
```

Configurar las variables de entorno desde el panel web de Railway en la sección **Variables** del servicio.

## Render

[Render](https://render.com) ofrece despliegue de aplicaciones Node.js con una capa gratuita.

1. Crear una cuenta en Render.
2. Seleccionar **New → Web Service**.
3. Conectar el repositorio.
4. Configurar:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. Agregar las variables de entorno en la sección correspondiente.
6. Hacer clic en **Create Web Service**.

## Servidor VPS con PM2

Para despliegue en un servidor Linux propio (Ubuntu/Debian):

```bash
# 1. Instalar Node.js (usando nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22

# 2. Instalar PM2 globalmente
npm install -g pm2

# 3. Clonar el repositorio en el servidor
git clone <URL_DEL_REPOSITORIO> /var/www/seguimiento_egresado
cd /var/www/seguimiento_egresado

# 4. Instalar dependencias
npm install

# 5. Crear el archivo .env con las variables de producción
# (editar manualmente con nano o vim)

# 6. Ejecutar migraciones
npx prisma migrate deploy

# 7. Construir la aplicación
npm run build

# 8. Iniciar con PM2
pm2 start npm --name "seguimiento-egresado" -- start

# 9. Configurar PM2 para iniciar en el arranque del servidor
pm2 startup
pm2 save
```

Para nginx como proxy inverso, agregar una configuración que redirija el tráfico del puerto 80/443 al puerto 3000 donde escucha Next.js.

\newpage

# Problemas Comunes y Soluciones

## Error de Conexión a la Base de Datos

**Síntoma**: `PrismaClientInitializationError: Can't reach database server`

**Causas y soluciones**:

1. Las variables `DATABASE_URL` o `DIRECT_URL` en el archivo `.env` son incorrectas o están vacías. Verificar que los valores sean los correctos copiados desde Supabase o el servidor PostgreSQL.
2. La IP del servidor de despliegue no está en la lista de IPs permitidas de Supabase. En Supabase ir a **Project Settings → Database → Connection Pooling** y verificar la configuración de red.
3. El proyecto de Supabase está pausado (ocurre en el plan gratuito tras inactividad). Entrar al panel de Supabase y reactivarlo.

## Error en npx prisma generate

**Síntoma**: `Error: Could not find Prisma Schema`

**Solución**: Verificar que el comando se ejecute desde la raíz del proyecto donde está el archivo `prisma/schema.prisma`. Navegar a la raíz si es necesario:

```bash
cd /ruta/al/proyecto
npx prisma generate
```

## El Build Falla con Errores de TypeScript

**Síntoma**: `Type error: ...` durante `npm run build`

**Solución**: Ejecutar primero el linter para ver todos los errores:

```bash
npm run lint
```

Corregir los errores indicados. Los errores de tipo TypeScript deben resolverse en el código fuente antes de que el build pueda completarse.

## Sesión No Funciona / Redirige en Bucle

**Síntoma**: Al iniciar sesión, el sistema redirige al login repetidamente, o la sesión no persiste.

**Causas y soluciones**:

1. `NEXTAUTH_URL` no coincide con la URL real del sistema. Asegurarse de que sea exactamente la misma URL (incluido `https://` o `http://`).
2. `NEXTAUTH_SECRET` no está definido o es diferente entre instancias. Verificar que exista en las variables de entorno y sea consistente.

## npm install Falla con Error de Permisos

**Síntoma**: `EACCES: permission denied` en sistemas Linux/macOS.

**Solución**: No ejecutar `npm install` con `sudo`. En su lugar, usar nvm para gestionar Node.js sin privilegios de root:

```bash
nvm install 22
nvm use 22
npm install
```

## Las Migraciones Fallan con "Column already exists"

**Síntoma**: Error durante `npx prisma migrate dev` indicando que una columna o tabla ya existe.

**Solución**: Esto ocurre cuando la base de datos tiene un estado diferente al historial de migraciones. En desarrollo, se puede resetear la base de datos (esto elimina todos los datos):

```bash
npx prisma migrate reset
```

En producción, no usar `migrate reset`. Revisar el historial de migraciones y resolver manualmente.

\newpage

# Lista de Verificación de Seguridad Antes de Poner en Producción

Completar esta lista antes de hacer el sistema accesible al público o a los usuarios institucionales:

## Variables de Entorno

- [ ] `NEXTAUTH_SECRET` tiene al menos 32 caracteres aleatorios y no es un valor de ejemplo.
- [ ] `NEXTAUTH_URL` apunta al dominio real de producción (con `https://`).
- [ ] `DATABASE_URL` y `DIRECT_URL` apuntan a la base de datos de producción, no a la de desarrollo.
- [ ] El archivo `.env` no está incluido en el repositorio Git (verificar con `git status`).

## Base de Datos

- [ ] Las migraciones están aplicadas y actualizadas (`npx prisma migrate status` muestra todo como aplicado).
- [ ] Las contraseñas de los usuarios de prueba (admin123, password123, etc.) han sido cambiadas o los usuarios de prueba eliminados si el seed se ejecutó en producción.
- [ ] El acceso directo a la base de datos desde internet está restringido solo a las IPs necesarias.

## Aplicación

- [ ] `npm run build` completa sin errores.
- [ ] El sistema se prueba con todas las credenciales de los roles disponibles antes de la entrega.
- [ ] Los errores en los formularios se muestran correctamente.
- [ ] El cierre de sesión funciona correctamente en todos los roles.

## Dominio y HTTPS

- [ ] Se usa HTTPS en producción (Vercel lo configura automáticamente; en VPS configurar Let's Encrypt).
- [ ] El dominio está correctamente apuntado al servidor de despliegue.

## Accesos

- [ ] Solo el personal autorizado conoce las credenciales de administrador.
- [ ] Se ha comunicado al personal de la E.P. Ingeniería de Sistemas los procesos de acceso al sistema.
