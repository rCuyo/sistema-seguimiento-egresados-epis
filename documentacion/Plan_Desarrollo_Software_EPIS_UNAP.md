# PLAN DE DESARROLLO DEL SOFTWARE

## Sistema Web de Seguimiento e Inserción Laboral del Egresado
### Escuela Profesional de Ingeniería de Sistemas
### Universidad Nacional del Altiplano Puno

---

**Documento:** Plan de Desarrollo del Software (PDS)
**Versión:** 1.1
**Fecha:** Junio 2026
**Unidad académica:** Escuela Profesional de Ingeniería de Sistemas — UNA Puno
**Elaborado por:** Practicante Preprofesional — Comisión de Seguimiento al Egresado
**Estado:** Documento de evidencia para prácticas preprofesionales

---

\newpage

## TABLA DE CONTENIDO

1. Introducción
2. Objetivos del Plan de Desarrollo
3. Alcance del Proyecto
4. Metodología de Desarrollo Utilizada
5. Fase de Análisis
   - 5.1 Identificación del Problema
   - 5.2 Revisión de Normativa y Reglamentos
   - 5.3 Levantamiento de Requerimientos
   - 5.4 Identificación de Actores
   - 5.5 Elaboración del SRS
6. Fase de Diseño
   - 6.1 Diseño de Arquitectura
   - 6.2 Diseño de Base de Datos
   - 6.3 Diseño de Interfaces
   - 6.4 Diseño de Módulos
7. Fase de Desarrollo
   - 7.1 Autenticación y Control de Acceso
   - 7.2 Gestión de Egresados
   - 7.3 Encuestas
   - 7.4 Bolsa Laboral
   - 7.5 Gestión de Postulaciones
   - 7.6 Reportes y Analítica
   - 7.7 Landing Institucional
   - 7.8 Adaptación Final a EPIS
8. Fase de Pruebas
   - 8.1 Pruebas Funcionales
   - 8.2 Validaciones
   - 8.3 Corrección de Errores
   - 8.4 Ajustes Prisma + Supabase
   - 8.5 Optimización del Sistema
9. Fase de Preparación para Despliegue
   - 9.1 Configuración del Entorno
   - 9.2 Base de Datos
   - 9.3 Variables de Entorno
   - 9.4 Seguridad
   - 9.5 Estado Actual del Proyecto
10. Documentación Generada
11. Cronología General del Proyecto
12. Resultados Obtenidos
13. Conclusiones

---

\newpage

## 1. INTRODUCCIÓN

El presente documento constituye el Plan de Desarrollo del Software (PDS) del **Sistema Web de Seguimiento e Inserción Laboral del Egresado** de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno, en adelante denominado el Sistema o la Plataforma.

Este documento registra de forma cronológica, técnica y verificable el proceso completo de planificación, diseño, implementación, pruebas y preparación para despliegue del sistema, desarrollado en el marco de las prácticas preprofesionales. Toda afirmación contenida en este documento está respaldada por código fuente verificado, migraciones de base de datos con marcas de tiempo, documentos de requerimientos y el Reglamento institucional vigente.

El sistema tiene como propósito centralizar tres funciones institucionales mandatadas por el Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado (Versión 1, mayo 2026): el registro y seguimiento de egresados, la distribución y análisis de encuestas institucionales, y la gestión de una bolsa de trabajo para egresados de la Escuela Profesional de Ingeniería de Sistemas.

La Plataforma fue desarrollada utilizando tecnologías de desarrollo web modernas orientadas a la nube: Next.js 16 como framework principal, PostgreSQL como motor de base de datos gestionado mediante Prisma ORM, NextAuth v4 para la autenticación, y Tailwind CSS con shadcn/ui para la interfaz de usuario. El sistema está operativo y listo para su despliegue en producción.

---

\newpage

## 2. OBJETIVOS DEL PLAN DE DESARROLLO

### 2.1 Objetivo General

Documentar de manera formal, cronológica y técnicamente sustentada el proceso de desarrollo del Sistema Web de Seguimiento e Inserción Laboral del Egresado de la Escuela Profesional de Ingeniería de Sistemas, como evidencia del trabajo realizado durante las prácticas preprofesionales.

### 2.2 Objetivos Específicos

1. Reconstruir y documentar las fases reales del desarrollo del sistema a partir del código fuente, las migraciones de base de datos, los documentos de requerimientos y el Reglamento institucional.

2. Describir las decisiones de diseño arquitectónico tomadas durante el desarrollo, justificadas con las necesidades identificadas en el análisis de requerimientos.

3. Registrar los módulos implementados, sus funcionalidades verificadas, las tecnologías utilizadas y las pruebas realizadas.

4. Documentar el proceso de adaptación del sistema a las necesidades específicas de la Escuela Profesional de Ingeniería de Sistemas de la UNA Puno.

5. Servir como evidencia técnica formal para la evaluación de las prácticas preprofesionales ante la Comisión de Seguimiento al Egresado y las autoridades académicas de la Escuela Profesional.

---

\newpage

## 3. ALCANCE DEL PROYECTO

### 3.1 Descripción General

El Sistema Web de Seguimiento e Inserción Laboral del Egresado es una aplicación web institucional que centraliza tres funciones definidas como obligatorias en el Reglamento vigente: el registro y seguimiento del egresado, las encuestas institucionales de seguimiento, y la bolsa de trabajo institucional.

El sistema opera como una aplicación web accesible desde navegador, sin requerir instalación en los equipos de los usuarios. Fue diseñado para dar servicio a la Escuela Profesional de Ingeniería de Sistemas, con una arquitectura de datos que permite extensión futura a otras unidades académicas.

### 3.2 Funcionalidades Implementadas

| N° | Módulo | Estado |
|---|---|---|
| 1 | Autenticación y registro de egresados | Implementado y operativo |
| 2 | Gestión de perfil del egresado | Implementado y operativo |
| 3 | Dashboard del egresado con estadísticas | Implementado y operativo |
| 4 | Encuestas institucionales (administración) | Implementado y operativo |
| 5 | Encuestas institucionales (participación del egresado) | Implementado y operativo |
| 6 | Bolsa laboral (administración) | Implementado y operativo |
| 7 | Bolsa laboral (portal público y egresado) | Implementado y operativo |
| 8 | Gestión de postulaciones | Implementado y operativo |
| 9 | Directorio y gestión de egresados (ADMIN) | Implementado y operativo |
| 10 | Panel de analítica estadística | Implementado y operativo |
| 11 | Exportación de datos (XLSX, CSV, PDF) | Implementado y operativo |
| 12 | Portal público (landing + bolsa laboral pública) | Implementado y operativo |
| 13 | Panel de configuración institucional (ADMIN) | Implementado y operativo |
| 14 | Panel del Director de Escuela Profesional (DIRECTOR) | Implementado y operativo — `/director`, `/director/analitica`, `/director/reportes` |
| 15 | Panel del Coordinador de Prácticas (PRACTICE_COORDINATOR) | Implementado y operativo — `/coordinador`, `/coordinador/encuestas`, `/coordinador/practicas`, `/coordinador/analitica` |
| 16 | Historial de experiencia laboral (edición por egresado) | Implementado y operativo |
| 17 | Panel de escuela profesional (SCHOOL) | Stub legacy — sin funcionalidad activa |
| 18 | Módulo de eventos | Solo modelo de datos; sin UI ni API |

### 3.3 Fuera del Alcance (Versión Actual)

- Integración con el sistema académico de la universidad.
- Carga de fotografía de perfil y curriculum vitae en PDF.
- Recuperación de contraseña por correo electrónico.
- Sistema de notificaciones automáticas a egresados.
- Gestión directa de empresas (registro, edición, verificación) desde la interfaz de administración.
- Panel completo de escuela profesional (rol `SCHOOL`, reemplazado por `DIRECTOR` y `PRACTICE_COORDINATOR`).

---

\newpage

## 4. METODOLOGÍA DE DESARROLLO UTILIZADA

### 4.1 Enfoque Metodológico

El desarrollo del sistema siguió un enfoque iterativo e incremental adaptado a las condiciones del proyecto: un equipo reducido, un conjunto de requerimientos bien definidos por el Reglamento institucional y un horizonte temporal acotado a las prácticas preprofesionales.

El proceso se organizó en cinco fases secuenciales con retroalimentación interna:

1. **Análisis:** Estudio del Reglamento, identificación de actores y requerimientos, elaboración del SRS v1.
2. **Diseño:** Definición de la arquitectura, diseño del esquema de base de datos, selección del stack tecnológico.
3. **Desarrollo:** Implementación incremental de los módulos, comenzando por la infraestructura base (autenticación, base de datos) y avanzando hacia los módulos funcionales.
4. **Pruebas y corrección:** Verificación de funcionalidades, corrección de errores, ajuste de inconsistencias documentales y actualización del SRS a v2.
5. **Preparación para despliegue:** Configuración de variables de entorno, verificación de la conexión con Supabase, generación de datos de prueba mediante el seeder.

### 4.2 Organización del Trabajo

El trabajo se realizó de forma individual como parte de las prácticas preprofesionales en la Comisión de Seguimiento al Egresado de la Escuela Profesional de Ingeniería de Sistemas. Las tareas de análisis, diseño, implementación, documentación y pruebas fueron realizadas por el practicante con orientación del asesor institucional.

### 4.3 Herramientas de Desarrollo

| Herramienta | Uso |
|---|---|
| Visual Studio Code | Entorno de desarrollo integrado (IDE) |
| Node.js v22 (nvmrc) | Runtime de JavaScript en el servidor |
| npm | Gestor de dependencias y scripts |
| Git | Control de versiones del código fuente |
| Prisma Studio | Visualización y administración de la base de datos |
| Supabase Dashboard | Gestión de la instancia PostgreSQL en la nube |
| Navegador web | Pruebas funcionales de la interfaz |

---

\newpage

## 5. FASE DE ANÁLISIS

### 5.1 Identificación del Problema

#### 5.1.1 Situación Inicial

Antes del desarrollo del sistema, la Escuela Profesional de Ingeniería de Sistemas de la UNA Puno no contaba con un mecanismo centralizado y sistemático para realizar el seguimiento de sus egresados. La información sobre la situación laboral de los egresados, cuando existía, se obtenía de manera dispersa, manual e inconsistente.

Los problemas identificados durante el análisis fueron:

- **Ausencia de registro centralizado:** No existía una base de datos actualizada de egresados con información de contacto, situación laboral y trayectoria profesional.
- **Sin mecanismo de encuestas:** Las encuestas de seguimiento mandatadas por el Reglamento (Art. 18, inciso c) se aplicaban de manera informal o no se aplicaban, impidiendo obtener información estadística sobre empleabilidad.
- **Bolsa laboral inexistente:** No había un canal institucional para conectar a los egresados con oportunidades laborales, a pesar de estar establecido en el Art. 19 del Reglamento.
- **Sin analítica de empleabilidad:** La institución carecía de datos cuantitativos sobre la tasa de empleabilidad y el desempeño profesional de sus egresados, información indispensable para los procesos de acreditación y mejora curricular.

#### 5.1.2 Necesidad Institucional

El Art. 20 del Reglamento establece explícitamente que la plataforma tecnológica es el mecanismo central del sistema de seguimiento. Los Arts. 5 y 18 definen objetivos concretos que el sistema debe cumplir: mantener información actualizada de egresados, obtener estadísticas de empleabilidad, fortalecer la comunicación institucional y promover la inserción laboral.

### 5.2 Revisión de Normativa y Reglamentos

#### 5.2.1 Reglamento Analizado

Se analizó el **Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado** de la Escuela Profesional de Ingeniería de Sistemas, Universidad Nacional del Altiplano Puno, Versión 1, vigente desde mayo de 2026.

#### 5.2.2 Artículos de Mayor Relevancia para el Sistema

**Tabla 5.1. Artículos del Reglamento con impacto directo en el sistema**

| Artículo | Contenido relevante | Módulo del sistema derivado |
|---|---|---|
| Art. 5 | Objetivos del sistema: mantener información actualizada, obtener estadísticas, fortalecer comunicación, promover inserción laboral, implementar herramientas tecnológicas | Todos los módulos |
| Art. 11 (Deberes) | Los egresados deben registrar y mantener actualizados sus datos; responder encuestas semestrales | Módulo de registro, Módulo de perfil, Módulo de encuestas |
| Art. 12 (Derechos) | Acceso a ofertas laborales; derecho a información; solicitud de rectificación de datos (Ley N° 29733) | Bolsa laboral, Perfil del egresado |
| Art. 17 | Mecanismos de inserción laboral: bolsa laboral, publicación de ofertas | Módulo de bolsa laboral |
| Art. 18 | Mecanismos de seguimiento: encuestas semestrales, registro actualizado, análisis estadístico de empleabilidad | Módulo de encuestas, Módulo de analítica |
| Art. 19 | La Escuela ofrece bolsa laboral para estudiantes del último ciclo, egresados, graduados y titulados | Módulo de bolsa laboral |
| Art. 20 | La plataforma centraliza información mínima del egresado; información de carácter confidencial (Ley N° 29733); la OTI es responsable de su mantenimiento | Arquitectura general, seguridad |

#### 5.2.3 Marco Legal de Referencia

- **Ley N° 30220** — Ley Universitaria del Perú: fundamento para el funcionamiento de la Escuela Profesional y la obligatoriedad del seguimiento al egresado.
- **Ley N° 29733** — Ley de Protección de Datos Personales: determina el tratamiento de la información personal de los egresados almacenada en la Plataforma.
- **Decreto Supremo N° 003-2013-JUS** — Reglamento de la Ley N° 29733: disposiciones específicas de implementación.

### 5.3 Levantamiento de Requerimientos

#### 5.3.1 Técnicas Utilizadas

Los requerimientos se obtuvieron mediante:
- Análisis exhaustivo del Reglamento vigente y sus artículos relevantes.
- Revisión de la normativa legal aplicable (Ley N° 29733, Ley N° 30220).
- Análisis comparativo de sistemas similares de seguimiento al egresado en universidades nacionales.
- Consulta con la Comisión de Seguimiento al Egresado sobre las necesidades operativas prioritarias.

#### 5.3.2 Resumen de Requerimientos Identificados

Se identificaron inicialmente **47 requerimientos funcionales** (RF-01 a RF-47) en 8 módulos. El documento evolucionó hasta el SRS v3.2, que documenta **61 requerimientos funcionales** (RF-01 a RF-61), añadiendo módulos para el Director, el Coordinador, el historial laboral editable y el seguimiento de interacciones en la bolsa laboral. Se mantienen **30 requerimientos no funcionales** (RNF-01 a RNF-30).

**Tabla 5.2. Resumen de requerimientos por módulo (versión final SRS v3.2)**

| Módulo | Requerimientos Funcionales | Notas |
|---|---|---|
| Autenticación y Registro | RF-01 a RF-06 | |
| Gestión de Perfil del Egresado + Historial Laboral | RF-07 a RF-10, RF-59 | RF-59 añadido en v3.2 |
| Encuestas (Admin + Egresado) | RF-11 a RF-20 | RF-12/13 actualizados con validación de duplicados |
| Bolsa Laboral (Admin + Pública/Egresado) | RF-21 a RF-30 | RF-22/28 actualizados con modality, externalUrl, PROFESSIONAL_INTERNSHIP |
| Gestión de Postulaciones | RF-31 a RF-32 | |
| Gestión de Egresados (Admin) | RF-33 a RF-35 | |
| Analítica y Reportes | RF-36 a RF-45 | |
| Panel Público | RF-46 a RF-47 | |
| Panel del Director | RF-48 a RF-52 | Añadidos en v3.0; operativos en v3.2 |
| Panel del Coordinador | RF-53 a RF-57 | Añadidos en v3.0; operativos en v3.2 |
| Seguimiento de interacciones (Bolsa Laboral) | RF-60, RF-61 | Añadidos en v3.2 |

#### 5.3.3 Restricciones Críticas Identificadas

Las siguientes restricciones fueron identificadas como no negociables durante el análisis:

1. Autenticación obligatoria para todas las operaciones sobre datos sensibles (Art. 20 del Reglamento).
2. Control de acceso basado en roles con separación estricta ADMIN / GRADUATE / SCHOOL.
3. Un egresado solo puede responder cada encuesta una vez (Art. 18, inciso c del Reglamento).
4. Un egresado no puede postularse más de una vez a la misma oferta laboral.
5. La información personal de los egresados tiene carácter confidencial (Ley N° 29733).

### 5.4 Identificación de Actores

**Tabla 5.3. Actores del sistema identificados en la fase de análisis**

| Actor | Rol técnico | Descripción institucional | Estado de implementación |
|---|---|---|---|
| Administrador | `ADMIN` | Representa a la Comisión de Seguimiento al Egresado (Art. 6 del Reglamento). Acceso completo. | Operativo |
| Egresado | `GRADUATE` | Egresado, graduado o titulado de la EPIS registrado en la Plataforma (Arts. 8-10 del Reglamento). | Operativo |
| Director de Escuela Profesional | `DIRECTOR` | Director de la Escuela Profesional con competencia supervisora (Art. 21 del Reglamento). Acceso de solo lectura y exportación. | Operativo |
| Coordinador de Prácticas | `PRACTICE_COORDINATOR` | Responsable institucional de la gestión operativa de prácticas preprofesionales. | Operativo |
| Escuela | `SCHOOL` | Valor legacy — reemplazado por `DIRECTOR` y `PRACTICE_COORDINATOR`. | Obsoleto (sin usuarios asignados) |
| Público anónimo | — | Visitante no autenticado. Accede al portal informativo y a la bolsa laboral pública. | Operativo |

### 5.5 Elaboración del SRS

#### 5.5.1 Proceso de Elaboración

La elaboración del Documento de Requerimientos de Software (SRS) se realizó en dos iteraciones:

**SRS v1.0 (mayo 2026):** Primera versión del documento, elaborada al concluir el levantamiento de requerimientos y antes de iniciar el desarrollo. Siguió el estándar IEEE Std 830-1998. Contenía los 47 requerimientos funcionales, 28 no funcionales, 10 casos de uso y 20 reglas de negocio.

**SRS v2.1 (junio 2026):** Segunda versión, elaborada tras concluir el desarrollo e identificar 13 inconsistencias entre el documento v1 y el sistema realmente implementado. La principal causa de las correcciones fue la adaptación del sistema de un diseño inicial más genérico (multi-escuela) a las necesidades concretas de la EPIS. El detalle de las correcciones se documenta en la sección 7.8.

---

\newpage

## 6. FASE DE DISEÑO

### 6.1 Diseño de Arquitectura

#### 6.1.1 Decisión de Arquitectura Principal

El sistema sigue una arquitectura **monolítica por despliegue y en capas por diseño**, construida sobre Next.js 16 con App Router. Esta decisión arquitectónica (ADR-01) se tomó porque el App Router de Next.js unifica en un único artefacto desplegable el frontend, el backend (Route Handlers REST) y las Server Actions para mutaciones de formulario, reduciendo la complejidad operacional para el equipo de desarrollo y el equipo institucional encargado del mantenimiento.

#### 6.1.2 Modelo de Capas

La arquitectura define cuatro capas con flujo de dependencias estrictamente descendente:

**Capa 1 — Presentación:** Componentes React organizados en grupos de rutas de Next.js App Router. Incluye Server Components (renderizados en servidor), Client Components (hidratados en el navegador) y Server Actions (mutaciones de formulario ejecutadas en servidor).

**Capa 2 — API REST:** Manejadores de ruta Next.js (Route Handlers) organizados bajo `src/app/api/`. Verifican sesión y rol, delegan al servicio correspondiente y serializan la respuesta JSON.

**Capa 3 — Servicios:** Módulos TypeScript en `src/lib/services/` que encapsulan todas las operaciones de base de datos. Ninguna ruta API ni componente accede a Prisma directamente; toda consulta pasa por esta capa.

**Capa 4 — Datos:** PostgreSQL administrado por Supabase, accedido mediante el cliente Prisma generado en `src/generated/prisma`, a través del Transaction Pooler de PgBouncer.

**Regla de arquitectura fundamental:** Ningún componente, página o Route Handler puede importar o utilizar el cliente Prisma directamente. Toda interacción con la base de datos debe pasar por la capa de servicios (`src/lib/services/`). Esta regla se documentó en el CLAUDE.md del proyecto y se mantuvo durante todo el desarrollo.

#### 6.1.3 Registro de Decisiones Arquitectónicas

**Tabla 6.1. Decisiones arquitectónicas principales (ADR)**

| ID | Decisión | Razón |
|---|---|---|
| ADR-01 | Next.js 16 App Router como framework principal | Unifica SSR, API Routes y Server Actions en un único artefacto desplegable |
| ADR-02 | Estrategia de sesión JWT sin persistencia en BD | Elimina dependencia de tabla de sesiones; reduce latencia; simplifica escalado horizontal |
| ADR-03 | Prisma Client generado en `src/generated/prisma` | Control explícito del artefacto; facilita despliegues donde el código fuente se incluye en el contenedor |
| ADR-04 | Transaction Pooler de PgBouncer (puerto 6543) | Next.js crea múltiples instancias; el Transaction Pooler evita agotar el límite de conexiones directas de PostgreSQL |
| ADR-05 | Patrón Singleton para el cliente Prisma | Hot reload de Next.js recarga módulos en desarrollo; sin singleton se crean múltiples conexiones |
| ADR-06 | Capa de servicios obligatoria (Service Layer Pattern) | Centraliza la lógica de negocio, facilita el mantenimiento y garantiza tipos coherentes entre capas |
| ADR-07 | Validación Zod exclusivamente en el servidor | La validación del cliente es bypasseable; Zod en servidor previene inyección de datos malformados |
| ADR-08 | Server Actions solo para registro; API REST para el resto | Las Server Actions son adecuadas para mutaciones simples de formulario; para consultas paginadas y filtros complejos, la API REST ofrece mayor control |
| ADR-09 | `@react-pdf/renderer` como serverExternalPackage | Depende de APIs de Node.js no disponibles en el navegador; el flag evita errores en runtime |
| ADR-10 | Tailwind CSS v4 sin `tailwind.config.ts` | v4 utiliza variables CSS nativas y espacio OKLch; mayor fidelidad de color sin archivo de configuración separado |
| ADR-11 | Interfaz mono-escuela (EPIS) con arquitectura multi-escuela en datos | El Reglamento está orientado a EPIS; la arquitectura de datos (`Faculty → School → Graduate`) permite extensión futura sin migraciones |
| ADR-12 | Tipo String para `SurveyQuestion.type` y `JobApplication.status` | Permite agregar nuevos valores sin generar una migración de base de datos |

#### 6.1.4 Organización de Rutas del Sistema

Los grupos de rutas de Next.js App Router organizan las páginas según su naturaleza:

| Grupo de rutas | Prefijo URL | Descripción |
|---|---|---|
| `(auth)` | `/login`, `/registro` | Páginas de autenticación, sin shell de navegación |
| `(public)` | `/`, `/empleos` | Portal público, sin autenticación requerida |
| `(dashboard)` | `/admin/**`, `/egresado/**`, `/escuela/**` | Áreas protegidas, envueltas en `DashboardShell` |
| `api` | `/api/**` | Endpoints REST del backend |

### 6.2 Diseño de Base de Datos

#### 6.2.1 Motor y ORM

Se decidió utilizar **PostgreSQL** como motor de base de datos por su robustez para datos relacionales complejos, su compatibilidad con columnas de tipo `Json` (necesarias para respuestas de encuestas y opciones de preguntas) y su soporte nativo en Prisma. La instancia de PostgreSQL se gestiona mediante **Supabase** en su modalidad cloud.

**Prisma 5.22.0** se seleccionó como ORM por su sistema de migraciones versionadas (`prisma migrate`), la generación de un cliente TypeScript con tipos completamente inferidos, y la integración natural con el ecosistema de Next.js.

#### 6.2.2 Entidades Diseñadas

**Tabla 6.2. Entidades del modelo de datos**

| Entidad | Descripción | Relaciones |
|---|---|---|
| `User` | Base de autenticación. Almacena credenciales y rol. | 1:1 con `Graduate` |
| `Faculty` | Facultad universitaria (ej: Facultad de Ingeniería). | 1:N con `School` |
| `School` | Escuela Profesional dentro de una Facultad. | N:1 con `Faculty`; 1:N con `Graduate`, `Survey` |
| `Graduate` | Perfil académico y profesional del egresado. Entidad central. | N:1 con `User`, `School`; 1:N con `WorkExperience`, `SurveyResponse`, `JobApplication` |
| `WorkExperience` | Historial laboral del egresado. | N:1 con `Graduate` |
| `Survey` | Encuesta institucional creada por el administrador. | 1:N con `SurveyQuestion`, `SurveyResponse` |
| `SurveyQuestion` | Pregunta dentro de una encuesta. Tipo almacenado como String. | N:1 con `Survey`; 1:N con `SurveyAnswer` |
| `SurveyResponse` | Registro de que un egresado completó una encuesta. Restricción `@@unique([surveyId, graduateId])`. | N:1 con `Survey`, `Graduate`; 1:N con `SurveyAnswer` |
| `SurveyAnswer` | Respuesta individual a una pregunta. Campo `value` de tipo Json. | N:1 con `SurveyResponse`, `SurveyQuestion` |
| `Company` | Empresa que publica ofertas laborales. | 1:N con `JobOffer` |
| `JobOffer` | Oferta laboral. Estado activo y fecha de expiración. | N:1 con `Company`; 1:N con `JobApplication` |
| `JobApplication` | Postulación de egresado a oferta. Restricción `@@unique([jobId, graduateId])`. | N:1 con `JobOffer`, `Graduate` |
| `Event` | Eventos institucionales. Solo modelo definido; sin implementación. | — |

#### 6.2.3 Índices y Restricciones de Integridad

Los índices fueron diseñados para optimizar las consultas más frecuentes del sistema:

| Campo indexado | Entidad | Tipo | Propósito |
|---|---|---|---|
| `email` | `User` | UNIQUE | Unicidad de cuenta |
| `code` | `Faculty`, `School` | UNIQUE | Códigos únicos institucionales |
| `userId` | `Graduate` | UNIQUE | Un perfil por usuario |
| `dni` | `Graduate` | UNIQUE | Un DNI por egresado |
| `schoolId` | `Graduate` | INDEX | Filtros por escuela en listados |
| `employmentStatus` | `Graduate` | INDEX | Filtros y analítica por estado laboral |
| `graduationYear` | `Graduate` | INDEX | Reportes por año de egreso |
| `graduateId` | `WorkExperience` | INDEX | Historial laboral por egresado |
| `surveyId` | `SurveyQuestion` | INDEX | Preguntas de una encuesta |
| `(surveyId, graduateId)` | `SurveyResponse` | UNIQUE | Una respuesta por egresado por encuesta |
| `isActive` | `JobOffer` | INDEX | Filtros de bolsa laboral activa |
| `(jobId, graduateId)` | `JobApplication` | UNIQUE | Una postulación por egresado por oferta |

Las restricciones `@@unique` en `SurveyResponse` y `JobApplication` son la implementación a nivel de base de datos de las reglas de negocio RN-05 y RN-06, garantizando la integridad incluso ante peticiones concurrentes o fallos en la capa de aplicación.

#### 6.2.4 Migración Inicial

La migración inicial de la base de datos se ejecutó el **14 de mayo de 2026** (timestamp verificado: `20260514205052_init`), creando todas las tablas, enumeraciones, índices y restricciones de integridad del esquema diseñado.

### 6.3 Diseño de Interfaces

#### 6.3.1 Identidad Visual

El diseño de interfaces adoptó los colores institucionales de la Universidad Nacional del Altiplano Puno, definidos en el archivo `src/app/globals.css`:

| Variable CSS | Valor hexadecimal | Uso en la interfaz |
|---|---|---|
| `--color-una-primary` | `#1E3A5F` | Azul marino oscuro — sidebar, fondos de encabezado, avatares |
| `--color-una-secondary` | `#2563EB` | Azul institucional — botones de acción, acentos |
| `--color-una-accent` | `#38BDF8` | Celeste — detalles, gradientes, indicadores |

El sistema de temas utiliza el espacio de color OKLch (Tailwind CSS v4) con soporte para modo claro y oscuro.

#### 6.3.2 Biblioteca de Componentes

Se utilizó **shadcn/ui** (versión 4.7.0, estilo radix-nova) como biblioteca de componentes de interfaz. Esta biblioteca proporciona primitivos accesibles basados en Radix UI, sin imponer estilos por defecto, permitiendo personalización completa con Tailwind CSS. Los componentes primitivos (botones, formularios, tablas, diálogos, etc.) residen en `src/components/ui/`.

#### 6.3.3 Patrones de Interfaz

- **Loading states:** Cada página del dashboard cuenta con un archivo `loading.tsx` colocado junto a la página correspondiente (React Suspense boundaries) y componentes esqueleto (`*-skeleton.tsx`) para mostrar una interfaz utilizable durante la carga de datos.
- **Notificaciones:** Se utilizó la biblioteca `sonner` para notificaciones toast no intrusivas que comunican el resultado de las operaciones sin interrumpir el flujo de navegación.
- **Formularios:** React Hook Form con resolvedores Zod para validación en tiempo real con retroalimentación inmediata al usuario.

### 6.4 Diseño de Módulos

**Tabla 6.3. Módulos diseñados y su correspondencia con requerimientos**

| Módulo | Requerimientos funcionales | Servicios de backend |
|---|---|---|
| M1 — Autenticación y Registro | RF-01 a RF-06 | `src/lib/auth.ts`, `src/lib/actions/auth.actions.ts` |
| M2 — Perfil del Egresado | RF-07 a RF-10 | `graduate.service.ts`, `dashboard.service.ts` |
| M3 — Encuestas | RF-11 a RF-20 | `surveys.service.ts` |
| M4 — Bolsa Laboral | RF-21 a RF-30 | `jobs.service.ts` |
| M5 — Gestión de Postulaciones | RF-31 a RF-32 | `jobs.service.ts` |
| M6 — Gestión de Egresados (Admin) | RF-33 a RF-35 | `admin-graduates.service.ts` |
| M7 — Analítica y Reportes | RF-36 a RF-45 | `analytics.service.ts` |
| M8 — Panel Público | RF-46 a RF-47 | `public.service.ts` |

---

\newpage

## 7. FASE DE DESARROLLO

La fase de desarrollo se extendió desde el 14 de mayo de 2026 (fecha de la migración inicial, verificada en el timestamp `20260514205052_init`) hasta junio de 2026. La implementación siguió un orden lógico de dependencias: primero la infraestructura (autenticación, base de datos, layout), luego los módulos del egresado, y finalmente los módulos administrativos y de analítica.

### 7.1 Autenticación y Control de Acceso

#### 7.1.1 Descripción de lo Implementado

El módulo de autenticación es la base de toda la seguridad del sistema. Se implementó mediante **NextAuth v4.24.14** con un único proveedor de tipo `CredentialsProvider` (correo electrónico y contraseña), sin proveedores OAuth. Esta decisión garantiza control total sobre el proceso de autenticación dentro de la infraestructura institucional.

La configuración de autenticación reside en `src/lib/auth.ts` y exporta `authOptions`, que es importado por todas las rutas API y componentes de servidor que necesitan verificar la sesión.

#### 7.1.2 Flujo de Autenticación Implementado

1. El usuario envía correo y contraseña al endpoint `POST /api/auth/callback/credentials`.
2. NextAuth invoca la función `authorize` del `CredentialsProvider`.
3. El sistema valida el formato de los datos con un esquema Zod (correo válido, contraseña no vacía).
4. Se consulta el usuario en PostgreSQL por correo electrónico, incluyendo el perfil de egresado asociado.
5. Se verifica que `user.isActive === true`. Los usuarios inactivos son rechazados aunque sus credenciales sean correctas.
6. Se compara la contraseña ingresada contra el hash bcrypt almacenado (`bcrypt.compare`).
7. Si todas las verificaciones pasan, se retorna el objeto de usuario con campos personalizados (`id`, `role`, `graduateId`).
8. NextAuth genera un JWT firmado con `NEXTAUTH_SECRET` y lo almacena en una cookie HTTP-only.

#### 7.1.3 Control de Acceso en Dos Niveles

**Nivel 1 — Middleware de rutas (`middleware.ts`):**
Intercepta todas las peticiones HTTP antes de que alcancen cualquier ruta. Utiliza `withAuth` de `next-auth/middleware` para verificar el token JWT y aplicar redirecciones por rol. Protege las rutas `/admin/**`, `/egresado/**` y `/escuela/**`.

**Nivel 2 — Verificación en Route Handlers:**
Cada Route Handler de la API verifica independientemente la sesión mediante `getServerSession(authOptions)`, retornando HTTP 401 si no hay sesión y HTTP 403 si el rol no corresponde. Este nivel es el único efectivo contra peticiones directas a la API que eluden la interfaz de usuario.

#### 7.1.4 Extensión de Tipos TypeScript

Se extendieron los tipos de NextAuth en `src/types/next-auth.d.ts` para incluir los campos `id`, `role` y `graduateId` en `Session`, `User` y `JWT`. Esta extensión es global en toda la aplicación y evita duplicaciones de declaraciones de tipo en cada componente.

#### 7.1.5 Registro de Egresados

El registro de nuevos egresados se implementó mediante **Server Actions** de Next.js (`src/lib/actions/auth.actions.ts`), que es el único módulo que usa este patrón. Se implementaron dos acciones:

- `registerGraduate` — para la página dedicada `/registro`, que redirige a `/login?registered=true` al completar exitosamente.
- `registerGraduateModal` — para el modal de registro en la página pública, que retorna `{ success: true }` en lugar de redirigir.

El proceso de registro crea simultáneamente un `User` y un `Graduate` en una sola operación, verificando la unicidad del correo electrónico y del DNI antes de persistir.

---

[FIGURA 1. Landing Page Institucional]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Vista del portal público del sistema (ruta `/`). Se muestran las secciones informativas institucionales: encabezado con la identidad de la EPIS-UNA Puno, estadísticas del sistema en tiempo real (total de egresados, empleabilidad, encuestas y empleos activos), sección de beneficios de la plataforma, y llamadas a la acción para registro e inicio de sesión.*

---

[FIGURA 2. Inicio de Sesión]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Formulario de inicio de sesión en la ruta `/login`. Se muestra el formulario con campos de correo electrónico y contraseña, validación en tiempo real mediante Zod, y la identidad visual institucional. Tras la autenticación exitosa, el sistema redirige automáticamente al dashboard correspondiente según el rol del usuario.*

---

[FIGURA 3. Registro de Egresado]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Formulario de registro de nuevo egresado en la ruta `/registro`. Se muestran los campos requeridos: nombre, apellidos, DNI (8 dígitos), correo electrónico, contraseña (mínimo 6 caracteres) y año de egreso. La Escuela Profesional de Ingeniería de Sistemas se asigna automáticamente. El sistema verifica la unicidad del correo y DNI antes de crear la cuenta.*

---

### 7.2 Gestión de Egresados

#### 7.2.1 Perfil del Egresado

El módulo de perfil permite al egresado consultar y actualizar su información personal y laboral. Se implementó como una página del dashboard del egresado (`/egresado/perfil`) con carga de datos mediante Server Component y actualización mediante petición `PUT /api/graduates/me`.

Los campos actualizables son: nombre, apellido, teléfono, biografía personal (máximo 500 caracteres), estado laboral, cargo actual, empresa actual, ciudad, país y URL de LinkedIn. Todos los campos son validados mediante el esquema `updateProfileSchema` de Zod en el servidor antes de persistirse.

La seguridad de la actualización del perfil se implementó en el servicio `graduate.service.ts`: antes de ejecutar cualquier actualización, el servicio verifica que el `graduateId` del registro a modificar pertenezca al `userId` de la sesión activa. Esto cumple la restricción RNF-27 y el Art. 12h del Reglamento.

#### 7.2.2 Directorio de Egresados (ADMIN)

El módulo de gestión de egresados para el administrador se implementó en `/admin/egresados` y permite:

- **Listado paginado** (12 registros por página) con estadísticas de encabezado: total de egresados, empleados, en búsqueda de empleo y registrados en el mes actual.
- **Búsqueda** por nombre, apellido, DNI o correo electrónico.
- **Filtros** por estado laboral y año de egreso.
- **Detalle completo** de cada egresado: datos personales, escuela y facultad, estado de cuenta (`isActive`), historial de experiencias laborales, últimas 10 postulaciones con estado y últimas 5 respuestas a encuestas.

El servicio de backend (`admin-graduates.service.ts`) encapsula las consultas Prisma con las proyecciones necesarias, incluyendo los datos de escuela y facultad mediante relaciones anidadas.

---

[FIGURA 4. Dashboard Administrador]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Panel principal del administrador en la ruta `/admin`. Se muestran los KPIs globales del sistema: total de egresados registrados, tasa de empleabilidad, encuestas activas, empleos activos, total de postulaciones y nuevos registros del mes. El panel incluye accesos directos a todos los módulos de administración.*

---

[FIGURA 5. Gestión de Egresados]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Módulo de directorio de egresados en la ruta `/admin/egresados`. Se muestra la tabla paginada con los datos de cada egresado (nombre, DNI, escuela, año de egreso, estado laboral, fecha de registro), la barra de búsqueda y filtros por estado laboral y año de egreso, y las estadísticas del encabezado.*

---

[FIGURA 9. Perfil del Egresado]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Página de perfil del egresado en la ruta `/egresado/perfil`. Se muestra la información personal actualizable (nombre, teléfono, biografía, estado laboral, cargo actual, empresa, ciudad, LinkedIn), el formulario de edición con validación en tiempo real, y la información institucional de solo lectura (DNI, correo, escuela, año de egreso).*

---

### 7.3 Encuestas

#### 7.3.1 Administración de Encuestas (ADMIN)

El módulo de administración de encuestas permite al administrador gestionar el ciclo completo de las encuestas institucionales:

- **Creación** (`/admin/encuestas/nueva`): Formulario con constructor de preguntas dinámico (`SurveyBuilder`) que soporta seis tipos de pregunta: texto libre corto (`text`), texto libre largo (`textarea`), selección única (`single`), selección múltiple (`multiple`), escala de valoración numérica (`rating`) y sí/no (`yesno`). La creación de la encuesta y todas sus preguntas se realiza en una transacción atómica.
- **Edición** (`/admin/encuestas/[id]/editar`): Modificación de todos los atributos. Al actualizar preguntas, el sistema elimina las existentes y crea las nuevas en una transacción.
- **Activar/Desactivar**: Toggle de estado activo/inactivo sin necesidad de editar el registro completo.
- **Resultados** (`/admin/encuestas/[id]/resultados`): Panel de resultados con distribución de respuestas por pregunta, total de respuestas y tasa de participación.
- **Eliminación**: Eliminación en cascada de encuesta, preguntas, respuestas y respuestas individuales.

#### 7.3.2 Participación del Egresado en Encuestas

El módulo de encuestas del egresado se implementó en `/egresado/encuestas` y muestra dos listas diferenciadas:
- **Encuestas pendientes**: activas, no vencidas y no respondidas por el egresado.
- **Encuestas completadas**: respondidas por el egresado, con fecha de finalización.

Al responder una encuesta, el sistema verifica en el servidor que la encuesta esté activa, no haya vencido y el egresado no la haya respondido previamente. Las respuestas se persisten en una transacción atómica que crea el `SurveyResponse` y todos los `SurveyAnswer` correspondientes. El campo `value` de cada respuesta es de tipo `Json` para soportar cadenas (texto libre), números (valoraciones) y arreglos de cadenas (selección múltiple).

La restricción de respuesta única se aplica en dos niveles: HTTP 409 en la capa de API, y restricción `@@unique([surveyId, graduateId])` en la base de datos.

---

[FIGURA 6. Gestión de Encuestas]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Módulo de administración de encuestas en la ruta `/admin/encuestas`. Se muestra la lista de encuestas con metadatos (título, estado activo/inactivo, número de preguntas, número de respuestas, fecha de cierre), los controles de toggle de estado, y los botones de acceso a edición y resultados.*

---

### 7.4 Bolsa Laboral

#### 7.4.1 Administración de la Bolsa Laboral (ADMIN)

El administrador gestiona las ofertas laborales desde `/admin/bolsa-laboral`. Las funcionalidades implementadas incluyen:

- **Listado** con filtros por texto, empresa y estado activo/inactivo, con paginación de 15 registros por página. El encabezado muestra estadísticas globales: total de ofertas, ofertas activas, total de postulaciones y número de empresas.
- **Creación** (`/admin/bolsa-laboral/nueva`): Formulario con selección de empresa, título, descripción, requisitos, ubicación, tipo de empleo (`FULL_TIME`, `PART_TIME`, `CONTRACT`, `INTERNSHIP`), rango salarial como texto, modalidad remota, estado activo y fecha de expiración. Todos los campos se validan mediante esquema Zod.
- **Edición** (`/admin/bolsa-laboral/[id]/editar`): Modificación de cualquier atributo.
- **Activar/Desactivar**: Toggle de estado sin editar el registro completo.
- **Eliminación**: Eliminación permanente.

#### 7.4.2 Bolsa Laboral Pública

La bolsa laboral pública (`/(public)/empleos`) es accesible sin autenticación y muestra las ofertas activas y vigentes con filtros de búsqueda por texto, tipo de empleo y modalidad remota. El detalle de cada oferta incluye información de la empresa (nombre, sector, sitio web, descripción, estado de verificación).

#### 7.4.3 Bolsa Laboral del Egresado

El módulo de empleos del egresado (`/egresado/empleos`) muestra las mismas ofertas activas y vigentes, pero con la funcionalidad adicional de postulación:

- El egresado puede postularse adjuntando opcionalmente una carta de presentación (máximo 2000 caracteres).
- El sistema verifica que la oferta esté activa, no haya expirado y el egresado no se haya postulado anteriormente.
- La restricción de postulación única opera en dos niveles: HTTP 409 en la API y `@@unique([jobId, graduateId])` en la base de datos.

---

[FIGURA 7. Bolsa Laboral]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Vista de la bolsa laboral del egresado en la ruta `/egresado/empleos`. Se muestran las tarjetas de ofertas laborales activas con información resumida (título, empresa, tipo de empleo, modalidad, ubicación, salario, fecha de publicación), la barra de filtros y el estado de postulación de cada oferta (disponible / ya postulado).*

---

### 7.5 Gestión de Postulaciones

El módulo de gestión de postulaciones para el administrador se implementó en `/admin/postulaciones`. Permite:

- **Listado paginado** (20 registros por página) con filtros por estado de postulación y por oferta laboral. Por cada postulación se muestra: nombre del egresado, DNI, oferta laboral, empresa, estado actual y fecha de postulación.
- **Cambio de estado**: El administrador actualiza el estado de cualquier postulación al estado correspondiente dentro del ciclo: `PENDING → REVIEWED → INTERVIEW → ACCEPTED / REJECTED`.

El egresado puede ver el estado actualizado de sus postulaciones en su módulo de empleos (`/egresado/empleos`), con los estados mostrados en español mediante el mapa `APP_STATUS_LABELS` definido en `src/lib/validations/job.ts`.

---

[FIGURA 10. Gestión de Postulaciones]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Módulo de gestión de postulaciones en la ruta `/admin/postulaciones`. Se muestra la tabla de postulaciones con datos del egresado, la oferta y empresa correspondiente, el estado actual de cada postulación (con color diferenciado por estado), y el control para actualizar el estado en el flujo de selección.*

---

### 7.6 Reportes y Analítica

El módulo de analítica y reportes es uno de los módulos más complejos del sistema. Se implementó en `/admin/reportes` y provee:

#### 7.6.1 Panel de Analítica

KPIs globales del sistema: total de egresados, tasa de empleabilidad (%), egresados empleados, egresados independientes, total de respuestas a encuestas, encuestas activas, empleos activos, total de postulaciones, empresas registradas y nuevos registros del mes actual.

Las consultas de analítica son ejecutadas en paralelo mediante `Promise.all` en la función `getFullAnalytics` del servicio `analytics.service.ts`, minimizando la latencia total de respuesta.

Los filtros aplicables son: año de egreso y estado laboral.

#### 7.6.2 Gráficos Implementados

| Gráfico | Descripción | Biblioteca |
|---|---|---|
| Distribución de estado laboral | Distribución de egresados entre los 5 estados laborales | Recharts |
| Principales empleadores | Top 10 empresas donde trabajan actualmente los egresados | Recharts |
| Evolución de egresos por año | Tendencia histórica de egresos por año académico | Recharts |
| Distribución de postulaciones | Distribución de postulaciones por estado del ciclo de selección | Recharts |
| Empresas por sector | Distribución de empresas registradas por sector económico | Recharts |
| Participación en encuestas | Tasa de participación en las 8 encuestas más recientes | Recharts |

#### 7.6.3 Exportación de Datos

El sistema implementa exportación de datos en tres formatos:

**XLSX y CSV:** El endpoint `GET /api/admin/analytics/export` soporta cuatro conjuntos de datos (egresados, postulaciones, encuestas, ofertas laborales) en ambos formatos. La generación de XLSX utiliza la biblioteca `xlsx 0.18.5`. Los archivos CSV utilizan codificación UTF-8 con BOM (`﻿`) para compatibilidad con Microsoft Excel en sistemas Windows en español.

**PDF institucional:** El endpoint `GET /api/admin/reports/pdf` genera un reporte institucional mediante `@react-pdf/renderer 4.5.1`. El reporte incluye: identificación institucional (UNA Puno · EPIS), KPIs clave, tabla de distribución de estado laboral, evolución de egresos por año y fecha de generación. El módulo está declarado como `serverExternalPackage` en `next.config.ts` para forzar su ejecución exclusiva en el servidor.

---

[FIGURA 8. Reportes y Analítica]

[INSERTAR CAPTURA AQUÍ]

*Descripción: Panel de analítica y reportes en la ruta `/admin/reportes`. Se muestran los KPIs globales en tarjetas de resumen, los gráficos de distribución de estado laboral, evolución de egresos por año y participación en encuestas (generados con Recharts), los filtros por año de egreso y estado laboral, y los botones de exportación en XLSX, CSV y PDF.*

---

### 7.7 Landing Institucional

La página pública del sistema (`/`) se diseñó como portal informativo institucional con las siguientes secciones:

- **Héroe principal:** Presentación del sistema con identidad visual de la EPIS-UNA Puno.
- **Estadísticas en tiempo real:** KPIs públicos del sistema (egresados registrados, tasa de empleabilidad, empleos activos, encuestas activas).
- **Sección informativa:** Presentación de la carrera de Ingeniería de Sistemas.
- **Beneficios:** Descripción de las funcionalidades para egresados y para la institución.
- **Llamada a la acción:** Botones de registro e inicio de sesión, con modal de registro disponible en línea.

La página utiliza el servicio `public.service.ts` (función `getLandingStats`) para obtener las estadísticas en tiempo real sin exponer datos sensibles.

### 7.8 Adaptación Final a EPIS

#### 7.8.1 Contexto de la Adaptación

Durante el análisis y el diseño iniciales, el sistema fue concebido con una arquitectura más genérica, capaz de servir a múltiples escuelas profesionales de la UNA Puno. Sin embargo, el Reglamento está orientado específicamente a la Escuela Profesional de Ingeniería de Sistemas, y el piloto de implementación corresponde exclusivamente a dicha escuela.

Al concluir el desarrollo se identificaron 13 inconsistencias entre el SRS v1 y el sistema implementado, todas relacionadas con la adaptación al contexto mono-escuela de la EPIS. Esta revisión derivó en la actualización del documento a SRS v2.1.

#### 7.8.2 Correcciones de Adaptación Realizadas

**Tabla 7.1. Inconsistencias corregidas en la adaptación a EPIS (SRS v1 → SRS v2.1)**

| N° | Inconsistencia detectada en v1 | Corrección aplicada en el sistema y en SRS v2 |
|---|---|---|
| IC-01 | Referencias a "FIMEES" y "Facultad de Ingeniería Mecánica Eléctrica" en documentación | Eliminadas. Se usa únicamente "Escuela Profesional de Ingeniería de Sistemas" |
| IC-02 | Actor SCHOOL presentado como actor operativo con funcionalidades de interfaz | Verificado en código: el panel de escuela es un stub explícito. Movido a "funcionalidades previstas para Fase 2" |
| IC-03 | Afirmación de arquitectura multi-escuela sin aclaración de alcance real actual | Aclaración explícita: la implementación está configurada exclusivamente para EPIS; la extensión multi-escuela es capacidad técnica para versiones futuras |
| IC-04 | Recomendación sobre gestión de empresas imprecisa | Verificado: no existe ningún endpoint ni interfaz de gestión de Company. Solo existe `getCompaniesForSelect()` para selector |
| IC-05 | Ausencia de sección de limitaciones actuales del sistema | Sección de limitaciones agregada con verificación directa en código |
| IC-06 | Actor SCHOOL listado en tablas de RF y trazabilidad como actor principal | Eliminado como actor principal de RF, tablas y matriz de trazabilidad |
| IC-07 | Lenguaje con referencias técnicas de código en secciones institucionales | Reescritura en estilo académico; referencias técnicas conservadas solo en secciones de arquitectura |
| IC-08 | RF-43 y RF-44 no especificaban los cuatro conjuntos exportables | Precisados con los cuatro conjuntos verificados: egresados, postulaciones, encuestas, ofertas |
| IC-09 | RF-03 y RF-05 requerían que el egresado seleccionara su escuela profesional al registrarse | El formulario de registro asigna automáticamente la EPIS. Selector eliminado |
| IC-10 | RF-33 y RF-35 incluían filtros por facultad y escuela en gestión de egresados | Eliminados. Se conservan búsqueda por texto libre, estado laboral y año de egreso |
| IC-11 | RF-36 contemplaba filtros por facultad y escuela en analítica | Eliminados. Se conservan filtros por año de egreso y estado laboral |
| IC-12 | RF-38 y RF-40 mostraban gráficos de "Egresados por escuela" y "Tasa por escuela" | Reemplazados por "Principales empleadores" y "Distribución de postulaciones por estado" |
| IC-13 | RF-12 y CU-07 incluían selección de alcance (global/por escuela) en creación de encuestas | Eliminada la selección. Todas las encuestas se crean con alcance global por defecto |

#### 7.8.3 Impacto de la Adaptación en el Código

Las correcciones IC-09 a IC-13 se implementaron eliminando los componentes de filtro de facultad/escuela en las páginas `/admin/egresados`, `/admin/reportes` y `/admin/encuestas/nueva`, y ajustando los servicios correspondientes para no pasar parámetros de escuela a las queries Prisma. La arquitectura de datos (tablas `Faculty` y `School`) se conservó íntegra para permitir la futura extensión del sistema a otras unidades académicas.

---

\newpage

## 8. FASE DE PRUEBAS

### 8.1 Pruebas Funcionales

Las pruebas funcionales se realizaron manualmente utilizando las credenciales de prueba generadas por el seeder del sistema (`prisma/seed.ts`):

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@unap.edu.pe` | `admin123` |
| Egresado | `juan.mamani@gmail.com` | `password123` |

El seeder crea datos de prueba representativos para todos los módulos: facultades, escuelas, usuarios, egresados con historial laboral, empresas, ofertas laborales, encuestas con preguntas de todos los tipos, respuestas de encuestas y postulaciones en distintos estados.

#### 8.1.1 Casos de Prueba Ejecutados

**Tabla 8.1. Casos de prueba funcional**

| ID | Caso de Prueba | Módulo | Resultado |
|---|---|---|---|
| CP-01 | Inicio de sesión con credenciales válidas | Autenticación | Aprobado |
| CP-02 | Inicio de sesión con contraseña incorrecta | Autenticación | Aprobado |
| CP-03 | Inicio de sesión con cuenta inactiva | Autenticación | Aprobado |
| CP-04 | Redirección por rol tras autenticación | Autenticación | Aprobado |
| CP-05 | Registro de nuevo egresado con datos válidos | Registro | Aprobado |
| CP-06 | Registro con correo duplicado | Registro | Aprobado (error informativo) |
| CP-07 | Registro con DNI duplicado | Registro | Aprobado (error informativo) |
| CP-08 | Acceso a ruta `/admin` sin autenticación | Control de acceso | Aprobado (redirección a /login) |
| CP-09 | Acceso a ruta `/admin` con rol GRADUATE | Control de acceso | Aprobado (redirección a /egresado) |
| CP-10 | Actualización del perfil del egresado | Perfil | Aprobado |
| CP-11 | Intento de actualizar perfil de otro egresado | Perfil | Aprobado (HTTP 403) |
| CP-12 | Crear encuesta con preguntas de todos los tipos | Encuestas | Aprobado |
| CP-13 | Responder encuesta por egresado | Encuestas | Aprobado |
| CP-14 | Intento de responder encuesta ya contestada | Encuestas | Aprobado (HTTP 409) |
| CP-15 | Crear oferta laboral como administrador | Bolsa laboral | Aprobado |
| CP-16 | Postularse a oferta laboral | Bolsa laboral | Aprobado |
| CP-17 | Intento de postularse dos veces a la misma oferta | Bolsa laboral | Aprobado (HTTP 409) |
| CP-18 | Cambiar estado de postulación | Postulaciones | Aprobado |
| CP-19 | Visualizar panel de analítica con datos | Analítica | Aprobado |
| CP-20 | Exportar datos en XLSX | Exportación | Aprobado |
| CP-21 | Exportar datos en CSV | Exportación | Aprobado |
| CP-22 | Generar reporte PDF institucional | Reportes | Aprobado |
| CP-23 | Buscar egresado por nombre en directorio | Gestión Egresados | Aprobado |
| CP-24 | Ver detalle completo de egresado | Gestión Egresados | Aprobado |
| CP-25 | Activar/desactivar encuesta | Encuestas | Aprobado |
| CP-26 | Activar/desactivar oferta laboral | Bolsa laboral | Aprobado |
| CP-27 | Ver resultados de encuesta como administrador | Encuestas | Aprobado |
| CP-28 | Postularse desde bolsa laboral pública (sin sesión) | Bolsa pública | Aprobado (redirección a /login) |

### 8.2 Validaciones

Se verificaron las validaciones Zod en todos los formularios del sistema. Las validaciones operan exclusivamente en el servidor (no se confía en la validación del cliente), lo que previene la inserción de datos malformados incluso mediante peticiones directas a la API.

Las validaciones más críticas verificadas fueron:
- **DNI:** Exactamente 8 dígitos numéricos.
- **Contraseña:** Mínimo 6 caracteres.
- **Correo electrónico:** Formato RFC válido.
- **Año de egreso:** Entero dentro de un rango válido.
- **Carta de presentación:** Máximo 2000 caracteres.
- **Biografía del egresado:** Máximo 500 caracteres.

### 8.3 Corrección de Errores

Durante la fase de pruebas se identificaron y corrigieron los siguientes tipos de errores:

- **Errores de tipo TypeScript:** Inconsistencias entre los tipos inferidos por los servicios y los tipos utilizados en los componentes de la interfaz.
- **Inconsistencias documentales:** Las 13 inconsistencias entre el SRS v1 y el sistema implementado, documentadas y corregidas en el SRS v2.1.
- **Formularios de edición:** Ajuste de los valores iniciales de los formularios de edición de encuestas y ofertas para cargar correctamente los datos existentes.
- **Paginación:** Corrección del cálculo del total de páginas en servicios con múltiples filtros.

### 8.4 Ajustes Prisma + Supabase

La configuración de la conexión entre el sistema y Supabase requirió ajustes específicos:

#### 8.4.1 Transaction Pooler en lugar de Session Pooler

Durante las pruebas de conexión con Supabase, se detectó que el Session Pooler agotaba el límite de conexiones de la instancia al ser accedido por múltiples instancias del servidor de desarrollo de Next.js (hot reload). Se migró al **Transaction Pooler** (puerto 6543) con el parámetro `?pgbouncer=true` en la `DATABASE_URL`, que administra eficientemente la concurrencia de conexiones. Esta decisión quedó documentada como ADR-04.

#### 8.4.2 URL de Conexión Dual

Las migraciones de Prisma (`prisma migrate dev`) no son compatibles con el modo transaction de PgBouncer, ya que requieren una conexión dedicada de sesión. Se configuró la variable `DIRECT_URL` con la URL de conexión directa a PostgreSQL (sin pooler, puerto 5432) exclusivamente para ejecutar migraciones, mientras que `DATABASE_URL` con el pooler se utiliza para todas las consultas en runtime.

#### 8.4.3 Parámetro `connection_limit`

Se añadió el parámetro `connection_limit=5` a la `DATABASE_URL` para limitar el número de conexiones por instancia de la aplicación, permitiendo escalar el número de instancias sin superar los límites de conexiones del plan de Supabase utilizado.

### 8.5 Optimización del Sistema

Se implementaron las siguientes optimizaciones verificadas en el código fuente:

- **Consultas paralelas en analítica:** La función `getFullAnalytics` ejecuta todas sus consultas de base de datos en paralelo mediante `Promise.all`, reduciendo el tiempo de respuesta del panel de analítica.
- **Paginación en todos los listados:** Los listados de egresados (12 por página), ofertas laborales (15 por página) y postulaciones (20 por página) evitan consultas masivas a la base de datos.
- **Índices en campos de búsqueda frecuente:** Los campos `schoolId`, `employmentStatus`, `graduationYear` e `isActive` están indexados para optimizar los filtros más comunes.
- **`export const dynamic = "force-dynamic"`:** Se aplicó en las páginas del dashboard que requieren datos siempre actualizados, garantizando SSR sin cachés obsoletos.

---

\newpage

## 9. FASE DE PREPARACIÓN PARA DESPLIEGUE

### 9.1 Configuración del Entorno

El sistema requiere Node.js v22 (especificado en el archivo `.nvmrc` del repositorio) y está preparado para despliegue en cualquier plataforma compatible con Node.js: Vercel, Railway, Render, o un servidor VPS propio.

Los comandos necesarios para preparar el entorno son:

```bash
npm install          # Instala dependencias y regenera el cliente Prisma (postinstall)
npm run build        # Genera el build de producción de Next.js
npm run start        # Inicia el servidor en modo producción
npx prisma migrate deploy   # Aplica migraciones pendientes en la BD de producción
npm run seed         # Carga datos iniciales (solo en entornos de prueba)
```

### 9.2 Base de Datos

La base de datos está alojada en **Supabase Cloud** con las siguientes características operativas:

- Motor: PostgreSQL (versión gestionada por Supabase).
- Modo de conexión en runtime: Transaction Pooler de PgBouncer, puerto 6543.
- Modo de conexión para migraciones: Conexión directa, puerto 5432.
- La migración inicial `20260514205052_init` creó todas las tablas, enumeraciones, índices y restricciones del esquema diseñado.
- Los datos de prueba se cargan mediante `npm run seed` (ejecuta `prisma/seed.ts` con `tsx`).

### 9.3 Variables de Entorno

**Tabla 9.1. Variables de entorno requeridas para el despliegue**

| Variable | Descripción | Ejemplo de valor |
|---|---|---|
| `DATABASE_URL` | URL de conexión al Transaction Pooler de Supabase | `postgresql://...@pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5` |
| `DIRECT_URL` | URL de conexión directa a PostgreSQL (solo para `prisma migrate`) | `postgresql://...@db.supabase.co:5432/postgres` |
| `NEXTAUTH_SECRET` | Clave secreta para firma de tokens JWT. Cadena aleatoria ≥ 32 caracteres | Se genera con `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL canónica del sistema en producción | `https://[dominio-institucional]/` |

El archivo `.env` (no versionado en Git) debe contener las cuatro variables. En entorno de desarrollo local se utiliza `.env.local`.

### 9.4 Seguridad

Las siguientes medidas de seguridad están implementadas y operativas:

| Medida | Implementación |
|---|---|
| Hash de contraseñas | bcrypt con factor de costo 10 (`bcryptjs 3.0.3`) |
| Tokens de sesión | JWT firmados con `NEXTAUTH_SECRET`; almacenados en cookies HTTP-only |
| Control de acceso por rol | RBAC en dos niveles: middleware de rutas y verificación en cada Route Handler |
| Validación de entradas | Zod en servidor; nunca se confía en la validación del cliente |
| Protección de datos sensibles | Columnas `DATABASE_URL` y `NEXTAUTH_SECRET` nunca se exponen en el frontend |
| Restricciones de integridad | `@@unique` en BD para operaciones críticas (respuestas de encuestas, postulaciones) |
| Cumplimiento Ley N° 29733 | Restricción de acceso a datos de terceros; solo el egresado puede modificar su propio perfil |

### 9.5 Estado Actual del Proyecto

Al concluir la fase de prácticas preprofesionales, el sistema presenta el siguiente estado:

| Aspecto | Estado |
|---|---|
| Código fuente | Completo y funcional |
| Base de datos | Esquema desplegado en Supabase Cloud; datos de prueba cargados (3 migraciones aplicadas) |
| Documentación técnica | SRS v3.2, Documento de Arquitectura v1.3, Plan de Desarrollo v1.1, Manual de Usuario v1.0, Manual de Instalación v1.0, Manual de Administración v1.0 |
| Pruebas funcionales | Completadas (28 casos de prueba documentados, todos aprobados; validaciones adicionales sobre bolsa laboral transformada e historial laboral) |
| Build de producción | Verificado (`npm run build` sin errores) |
| Pendiente de acción institucional | Asignación de dominio institucional; configuración de `NEXTAUTH_URL` de producción; formalización normativa del Coordinador (Capítulo XIII del Reglamento) |

---

\newpage

## 10. DOCUMENTACIÓN GENERADA

Durante el proyecto se generaron los siguientes documentos:

**Tabla 10.1. Documentos generados durante el proyecto**

| N° | Documento | Archivo | Versión | Descripción |
|---|---|---|---|---|
| 1 | Reglamento del Sistema | `reglamento/main_v5.4_sistemas_v2.pdf` | 1 (mayo 2026) | Marco normativo vigente. Elaborado por la Comisión de Seguimiento al Egresado de la EPIS. |
| 2 | SRS — Versión 1 (referencia histórica) | `documentacion/SRS.md` | 1.0 (mayo 2026) | Primera versión del Documento de Requerimientos. Se conserva como referencia de la evolución del documento. |
| 3 | SRS — Versión 3.2 (vigente) | `documentacion/SRS_v3.md` | 3.2 (junio 2026) | Versión actualizada con todos los módulos implementados hasta la fecha, incluyendo paneles de Director y Coordinador, historial laboral y bolsa laboral transformada. Estándar IEEE Std 830-1998. |
| 4 | Documento de Arquitectura | `documentacion/DA_EPIS_UNAP_v1.md` | 1.3 (junio 2026) | Arquitectura técnica completa del sistema, incluyendo nuevas entidades (JobClick), nuevas rutas y módulos operativos. Estándar ISO/IEC/IEEE 42010:2011. |
| 5 | Plan de Desarrollo del Software | `documentacion/Plan_Desarrollo_Software_EPIS_UNAP.md` | 1.1 (junio 2026) | El presente documento. Evidencia formal del proceso de desarrollo para prácticas preprofesionales. |
| 6 | Manual de Usuario | `documentacion/Manual_Usuario_v1.md` | 1.0 (junio 2026) | Manual de uso del sistema para los cuatro roles: Administrador, Director, Coordinador y Egresado. |
| 7 | Manual de Instalación y Despliegue | `documentacion/Manual_Instalacion_v1.md` | 1.0 (junio 2026) | Guía técnica de instalación, configuración y despliegue del sistema. |
| 8 | Manual de Administración del Sistema | `documentacion/Manual_Administracion_v1.md` | 1.0 (junio 2026) | Manual para la gestión administrativa del sistema. |
| 9 | Diagramas del sistema | `documentacion/diagrams/` | 1.0 (junio 2026) | Diagramas arquitectónicos: arquitectura general, flujos de procesos, modelo ER, etc. |
| 10 | Guía de configuración para agentes | `CLAUDE.md` | Vigente | Documento técnico de referencia rápida para el equipo de desarrollo. |

---

\newpage

## 11. CRONOLOGÍA GENERAL DEL PROYECTO

**Tabla 11.1. Cronología del proyecto**

| Fase | Período | Actividades realizadas | Entregables |
|---|---|---|---|
| **Preparación y análisis** | Abril — primera quincena de mayo 2026 | Estudio del Reglamento vigente. Análisis de normativa legal (Ley N° 30220, Ley N° 29733). Análisis de sistemas similares. Definición del stack tecnológico. Consultas con la Comisión de Seguimiento al Egresado. | Reglamento v1 (mayo 2026). Lista de requerimientos preliminar. |
| **Diseño** | Segunda quincena de mayo 2026 | Diseño del modelo de datos (esquema Prisma). Diseño de la arquitectura en capas. Definición de grupos de rutas de Next.js App Router. Diseño del esquema de autenticación RBAC. Creación de la migración inicial. Selección de biblioteca de componentes UI. Decisiones arquitectónicas (ADR-01 a ADR-12). | Esquema `prisma/schema.prisma`. Migración inicial `20260514205052_init` (14 mayo 2026). SRS v1.0. |
| **Desarrollo — Infraestructura** | Segunda quincena de mayo 2026 | Configuración de Next.js 16 con App Router. Configuración de Prisma con Supabase (Transaction Pooler). Implementación de autenticación NextAuth v4 con JWT. Implementación del middleware RBAC. Creación del singleton del cliente Prisma. Configuración de shadcn/ui y Tailwind v4. Layout del dashboard (DashboardShell, Sidebar, Navbar). | Base de código funcional. Autenticación operativa. Sistema de rutas protegidas. |
| **Desarrollo — Módulos del egresado** | Final de mayo — primera quincena de junio 2026 | Registro de egresados (Server Action). Dashboard del egresado con estadísticas. Perfil del egresado (consulta y actualización). Módulo de encuestas del egresado (listado y respuesta). Módulo de empleos del egresado (listado y postulación). Portal público (landing + bolsa laboral pública). | Módulos M2, M3 (parcial), M3C, M4B, M8 operativos. |
| **Desarrollo — Módulos administrativos** | Primera quincena de junio 2026 | Directorio de egresados (admin). Módulo de encuestas admin (CRUD + resultados). Módulo de bolsa laboral admin (CRUD + toggle). Módulo de gestión de postulaciones. Dashboard administrativo con KPIs. Panel de analítica y reportes (6 gráficos Recharts). Exportación XLSX, CSV y PDF institucional. | Módulos M6, M3A, M4A, M5, M7 operativos. |
| **Adaptación a EPIS** | Segunda quincena de junio 2026 | Corrección de 13 inconsistencias detectadas entre SRS v1 y sistema implementado. Eliminación del selector de escuela del formulario de registro. Eliminación de filtros de facultad/escuela de las vistas admin. Ajuste de gráficos de analítica al contexto mono-escuela. Actualización a SRS v2.1. | SRS v2.1 con 13 correcciones documentadas. |
| **Pruebas y correcciones** | Segunda quincena de junio 2026 | Pruebas funcionales (28 casos de prueba). Verificación de validaciones Zod. Corrección de errores de tipo TypeScript. Ajuste de la conexión Prisma + Supabase (Transaction Pooler). Generación y verificación del seeder. Prueba del build de producción. | 28 casos de prueba aprobados. Sistema estable sin errores de compilación. |
| **Documentación** | Junio 2026 | Elaboración del Documento de Arquitectura v1.0. Elaboración del presente Plan de Desarrollo del Software. Generación de diagramas del sistema (10 figuras). Actualización del CLAUDE.md. | Documento de Arquitectura v1.0. Plan de Desarrollo v1.0 (presente documento). |

**Tabla 11.2. Hitos clave verificados del proyecto**

| Hito | Fecha verificada | Evidencia |
|---|---|---|
| Creación del esquema de base de datos y migración inicial | 14 de mayo de 2026 | Timestamp en `prisma/migrations/20260514205052_init/` |
| Publicación del Reglamento vigente | Mayo de 2026 | `reglamento/main_v5.4_sistemas_v2.pdf` |
| Completado del SRS v1.0 | Mayo de 2026 | `documentacion/SRS.md` (referencia histórica) |
| Completado del desarrollo de módulos del egresado | Primera quincena de junio de 2026 | Código fuente en `src/app/(dashboard)/egresado/**` |
| Completado del desarrollo de módulos administrativos | Primera quincena de junio de 2026 | Código fuente en `src/app/(dashboard)/admin/**` |
| Adaptación EPIS y publicación del SRS v2.1 | Segunda quincena de junio de 2026 | `documentacion/SRS_v2.md` con tabla de 13 correcciones |
| Completado del Documento de Arquitectura v1.0 | Junio de 2026 | `documentacion/DA_EPIS_UNAP_v1.md` |
| Completado del Plan de Desarrollo del Software | Junio de 2026 | Presente documento |

---

\newpage

## 12. RESULTADOS OBTENIDOS

### 12.1 Sistema Implementado

Al concluir las prácticas preprofesionales, se entrega un sistema web institucional completamente funcional que cumple los mandatos del Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado (v1, mayo 2026) en sus aspectos centrales:

**Tabla 12.1. Cumplimiento del sistema respecto al Reglamento**

| Mandato del Reglamento | Artículo | Módulo implementado | Estado |
|---|---|---|---|
| Plataforma tecnológica centralizada | Art. 20 | Todo el sistema | Cumplido |
| Registro y actualización de datos del egresado | Art. 11a | Módulo de registro y perfil | Cumplido |
| Encuestas semestrales de seguimiento | Art. 18c | Módulo de encuestas | Cumplido |
| Análisis estadístico de empleabilidad | Art. 18k | Panel de analítica | Cumplido |
| Bolsa laboral institucional | Art. 19 | Módulo de bolsa laboral | Cumplido |
| Confidencialidad de datos (Ley N° 29733) | Art. 20 | RBAC + bcrypt + restricciones de acceso | Cumplido |
| Derecho del egresado a acceder a ofertas laborales | Art. 12a | Bolsa laboral del egresado y pública | Cumplido |
| Exportación de informes periódicos | Art. 7g (implícito) | Exportación XLSX, CSV, PDF | Cumplido |

### 12.2 Estadísticas del Proyecto

| Métrica | Valor |
|---|---|
| Módulos completamente implementados | 16 (M1–M16; M17 y M18 son stubs parciales) |
| Endpoints de la API REST | 27 Route Handlers |
| Requerimientos funcionales implementados | 61 (RF-01 a RF-61) |
| Requerimientos no funcionales documentados | 28 (RNF-01 a RNF-28) |
| Entidades en el modelo de datos | 14 (incluye JobClick) |
| Servicios de backend | 8 módulos de servicio |
| Casos de prueba ejecutados | 28 (todos aprobados) |
| Decisiones arquitectónicas registradas (ADR) | 12 |
| Documentos técnicos generados | 10 (incluyendo el presente) |
| Tecnologías principales integradas | 16 (ver Tabla 13.1) |

### 12.3 Documentación Técnica Producida

El proyecto produjo un conjunto completo de documentación técnica y de usuario:

| N° | Documento | Archivo | Versión |
|---|---|---|---|
| 1 | Especificación de Requerimientos de Software (SRS) | `documentacion/SRS_v3.md` | 3.2 |
| 2 | Documento de Arquitectura de Software (DA) | `documentacion/DA_EPIS_UNAP_v1.md` | 1.3 |
| 3 | Plan de Desarrollo del Software | `documentacion/Plan_Desarrollo_Software_EPIS_UNAP.md` | 1.1 |
| 4 | Manual de Usuario | `documentacion/Manual_Usuario_v1.md` | 1.0 |
| 5 | Manual de Instalación y Despliegue | `documentacion/Manual_Instalacion_v1.md` | 1.0 |
| 6 | Manual de Administración del Sistema | `documentacion/Manual_Administracion_v1.md` | 1.0 |
| 7 | Informe Semanal de Prácticas | `documentacion/Informe_Semanal_Practicas_EPIS_UNAP.md` | — |
| 8 | Reportes diarios de actividades | `documentacion/reportes_diarios/` | — |
| 9 | Diagramas del sistema | `documentacion/diagrams/` | — |
| 10 | Guía técnica de referencia rápida | `CLAUDE.md` | Vigente |

El SRS pasó por tres versiones principales (v1.0 — v2.x — v3.2) que evidencian el proceso de refinamiento iterativo y la adaptación progresiva del diseño a las necesidades reales de la EPIS. La DA pasó por versiones 1.0 → 1.3 a medida que se incorporaron nuevos módulos, entidades y rutas. Los tres manuales son nuevos en v1.1 de este plan.

---

\newpage

## 13. CONCLUSIONES

1. **El sistema cumple con el marco normativo vigente.** Los módulos implementados cubren los mecanismos centrales establecidos en el Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado: el registro de egresados (Art. 11a), la bolsa laboral (Art. 19), las encuestas de seguimiento (Art. 18c), el análisis estadístico de empleabilidad (Art. 18k), la plataforma centralizada (Art. 20) y la protección de datos personales (Art. 20 / Ley N° 29733). La institución dispone de las herramientas tecnológicas que el Reglamento establece como obligatorias.

2. **La arquitectura en capas garantiza la mantenibilidad del sistema.** La separación estricta entre la capa de presentación, la capa de API REST, la capa de servicios y la capa de datos, con flujo de dependencias unidireccional, asegura que el sistema pueda ser mantenido y extendido por el equipo institucional responsable (la OTI, según el Art. 20 del Reglamento) sin comprometer la integridad de las otras capas.

3. **La seguridad está implementada a múltiples niveles.** El control de acceso basado en roles opera simultáneamente en el middleware de rutas (para la navegación) y en cada Route Handler de la API (para los datos), siendo este segundo nivel el único efectivo contra peticiones directas que eluden la interfaz. Las restricciones de integridad más críticas (respuesta única por encuesta, postulación única por oferta) están implementadas tanto en la lógica de aplicación como en la base de datos mediante restricciones `@@unique`.

4. **La adaptación a la EPIS fue un proceso de refinamiento documentado.** Las 13 inconsistencias identificadas entre el SRS v1 y el sistema implementado, todas relacionadas con la transición de un diseño genérico multi-escuela a las necesidades específicas de la EPIS, fueron sistemáticamente documentadas y corregidas. Esta iteración de refinamiento es evidencia de un proceso de desarrollo maduro que incluye revisión crítica del propio trabajo.

5. **La arquitectura de datos permite la extensión futura del sistema.** El modelo de datos con entidades `Faculty`, `School` y `Graduate` permite extender el sistema a otras escuelas profesionales de la UNA Puno sin modificar el esquema de base de datos. Los servicios de backend mantienen capacidad de filtrado multi-escuela, disponible para cuando la institución decida ampliar el alcance del sistema.

6. **El proceso de prácticas preprofesionales produjo un sistema completo y documentado.** Se implementaron 16 módulos operativos, 61 requerimientos funcionales y 27 endpoints de API, respaldados por 10 documentos técnicos y de usuario, y 28 casos de prueba verificados. Los cuatro actores del sistema (Administrador, Director, Coordinador de Prácticas y Egresado) disponen de paneles operativos. El sistema está listo para su despliegue en el entorno de producción de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno.

---

\newpage

## REFERENCIAS

- Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado, E.P. Ingeniería de Sistemas — UNA Puno, Versión 1, Mayo 2026.
- Documento de Requerimientos de Software (SRS) v3.2 — Sistema Web de Seguimiento e Inserción Laboral del Egresado, Junio 2026.
- Documento de Arquitectura de Software v1.3 — Sistema Web de Seguimiento e Inserción Laboral del Egresado, Junio 2026.
- IEEE Std 830-1998 — IEEE Recommended Practice for Software Requirements Specifications.
- ISO/IEC/IEEE 42010:2011 — Systems and software engineering — Architecture description.
- Ley N° 30220 — Ley Universitaria del Perú.
- Ley N° 29733 — Ley de Protección de Datos Personales del Perú.
- Decreto Supremo N° 003-2013-JUS — Reglamento de la Ley N° 29733.
- Next.js 16 Documentation — Vercel Inc.
- Prisma 5 Documentation — Prisma Data Inc.
- NextAuth.js v4 Documentation.

---

*Documento elaborado como evidencia de prácticas preprofesionales.*
*Plan de Desarrollo del Software — versión 1.0*
*Junio 2026 — Universidad Nacional del Altiplano Puno · E.P. Ingeniería de Sistemas*
