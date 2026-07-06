> **Nota:** Este documento corresponde a la versión 1.0 (borrador inicial). El documento vigente y actualizado es **SRS_v2.md** (v2.1). Se conserva este archivo únicamente como referencia histórica.

# DOCUMENTO DE REQUERIMIENTOS DE SOFTWARE (SRS)
## Sistema Web de Seguimiento e Inserción Laboral del Egresado
### Escuela Profesional de Ingeniería de Sistemas — Universidad Nacional del Altiplano Puno

---

**Versión:** 1.0 *(documento de referencia histórica — ver SRS_v2.md para la versión vigente)*  
**Fecha:** Junio 2026  
**Institución:** Universidad Nacional del Altiplano Puno  
**Unidad académica:** Escuela Profesional de Ingeniería de Sistemas  
**Estándar de referencia:** IEEE Std 830-1998 (Software Requirements Specification)

---

## RESUMEN TÉCNICO DE HALLAZGOS (FASE 1)

### 1. Análisis del Reglamento

El Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado (versión 1, vigente desde mayo de 2026) establece el marco normativo bajo el cual opera la plataforma. Los artículos de mayor relevancia para el sistema son:

- **Art. 11 (Deberes):** Los egresados están obligados a registrar y mantener actualizados sus datos en la Plataforma, responder encuestas institucionales semestrales y participar en actividades de mejora continua.
- **Art. 12 (Derechos):** Los egresados tienen derecho a acceder a ofertas laborales a través de la Plataforma, recibir información de la Comisión, y solicitar rectificación de sus datos (Ley N° 29733).
- **Art. 19 (Bolsa Laboral):** La Escuela Profesional ofrece el servicio de bolsa laboral para estudiantes del último ciclo, egresados, graduados y titulados.
- **Art. 20 (Plataforma):** La Plataforma centraliza información mínima del egresado (período académico, código de matrícula, programa de estudios, domicilio, DNI, correo, teléfono, nombres), permite actualizar datos y participar en encuestas. La información tiene carácter confidencial bajo Ley N° 29733.
- **Arts. 17-18 (Mecanismos):** Define mecanismos de inserción laboral (bolsa laboral, publicación de ofertas) y seguimiento (encuestas virtuales semestrales, registro actualizado de egresados, análisis estadístico de empleabilidad).

### 2. Análisis de la Arquitectura

- **Stack:** Next.js 16 App Router · PostgreSQL · Prisma 5 · NextAuth v4 (Credentials) · Tailwind CSS v4 · shadcn/ui · Zod · React Hook Form · Recharts · @react-pdf/renderer · xlsx
- **Autenticación:** JWT con NextAuth v4 Credentials Provider. El token JWT lleva `id`, `role` y `graduateId`.
- **Middleware:** Protege rutas `/admin/*`, `/egresado/*`, `/escuela/*` con verificación de sesión y redirección por rol.
- **Capa de servicios:** Toda lógica de base de datos está encapsulada en `src/lib/services/`. Las rutas API nunca consultan Prisma directamente.
- **Acciones de servidor:** Registro de egresados mediante Server Actions de Next.js.

### 3. Análisis de la Base de Datos

Entidades principales identificadas en `prisma/schema.prisma`:
`User`, `Graduate`, `Faculty`, `School`, `WorkExperience`, `Survey`, `SurveyQuestion`, `SurveyResponse`, `SurveyAnswer`, `Company`, `JobOffer`, `JobApplication`, `Event`.

### 4. Actores Identificados

| Actor | Rol en el sistema |
|---|---|
| Administrador (ADMIN) | Gestiona egresados, encuestas, bolsa laboral, postulaciones y analítica |
| Egresado (GRADUATE) | Gestiona su perfil, responde encuestas, consulta y postula a empleos |
| Escuela (SCHOOL) | Acceso de solo lectura a analítica, encuestas y postulaciones (vista stub) |
| Público anónimo | Consulta el landing y la bolsa laboral pública sin autenticación |

### 5. Módulos Identificados

| Módulo | Estado |
|---|---|
| Autenticación y registro | Implementado |
| Gestión de perfil del egresado | Implementado |
| Módulo de encuestas (admin + egresado) | Implementado |
| Bolsa laboral (admin + egresado + pública) | Implementado |
| Gestión de postulaciones | Implementado |
| Analítica y reportes | Implementado |
| Exportación de datos (XLSX / CSV / PDF) | Implementado |
| Panel público (landing + empleos) | Implementado |
| Panel de escuela | Stub (sin funcionalidad real) |
| Módulo de eventos | Stub (modelo BD únicamente, sin API ni UI) |

### 6. Restricciones Identificadas

- Acceso autenticado obligatorio para todas las operaciones sensibles.
- Separación estricta de roles (RBAC vía middleware de Next.js).
- Un egresado no puede responder la misma encuesta dos veces (restricción `@@unique` en BD).
- Un egresado no puede postularse dos veces a la misma oferta laboral (restricción `@@unique` en BD).
- Solo ADMIN puede crear/editar/eliminar ofertas laborales.
- La información personal es confidencial (Ley N° 29733).
- El Prisma Client se genera en `src/generated/prisma`, nunca en `@prisma/client`.

---

## DOCUMENTO SRS COMPLETO

---

## 1. INTRODUCCIÓN

### 1.1 Propósito

El presente documento constituye la Especificación de Requerimientos de Software (SRS) del Sistema Web de Seguimiento e Inserción Laboral del Egresado de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno (en adelante, la Plataforma o el Sistema).

Su propósito es describir de forma precisa, completa y verificable las funcionalidades implementadas en el sistema, los requerimientos funcionales y no funcionales derivados del análisis del código fuente y del Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado (versión 1, mayo 2026). Este documento servirá como referencia técnica y académica para el equipo de desarrollo, la Comisión de Seguimiento al Egresado y las autoridades académicas de la Facultad de Ingeniería Mecánica Eléctrica, Electrónica y Sistemas (FIMEES).

### 1.2 Alcance del Sistema

El sistema es una aplicación web institucional que permite:

- **Registrar y gestionar** la información académica, profesional y laboral de los egresados de la Escuela Profesional de Ingeniería de Sistemas.
- **Publicar y administrar** ofertas laborales en una bolsa de trabajo institucional, accesible tanto para usuarios autenticados como para el público general.
- **Diseñar, distribuir y analizar** encuestas institucionales de seguimiento al egresado orientadas a medir empleabilidad, satisfacción y logro de competencias.
- **Generar analítica estadística** e informes exportables sobre la situación laboral de los egresados, la participación en encuestas y el desempeño de la bolsa laboral.
- **Gestionar postulaciones** de egresados a las ofertas laborales publicadas.

El sistema está dirigido a la Escuela Profesional de Ingeniería de Sistemas, pero su arquitectura contempla múltiples escuelas a través de la entidad `Faculty → School`.

**Fuera del alcance del sistema actual:**
- Módulo de gestión de eventos (modelo de datos existente, sin implementación de API ni interfaz).
- Módulo de escuela con funcionalidades operativas (implementado como stub).
- Integración con sistemas externos (ERP universitario, SUNEDU, etc.).
- Gestión de convenios con empresas.
- Módulo de comunicaciones o mensajería interna.

### 1.3 Definiciones, Acrónimos y Abreviaturas

| Término | Definición |
|---|---|
| **ADMIN** | Rol de administrador del sistema, con acceso completo a todas las funcionalidades |
| **API** | Application Programming Interface — interfaz de programación de aplicaciones REST |
| **CUID** | Collision-resistant Unique Identifier — identificador único generado por Prisma |
| **DNI** | Documento Nacional de Identidad del Perú (8 dígitos) |
| **EGRESADO / GRADUATE** | Persona que ha culminado el plan curricular de la EP de Ingeniería de Sistemas |
| **EP / EPIS** | Escuela Profesional de Ingeniería de Sistemas |
| **FIMEES** | Facultad de Ingeniería Mecánica Eléctrica, Electrónica y Sistemas |
| **GRADUATE** | Rol de egresado en el sistema |
| **HTTP** | Hypertext Transfer Protocol |
| **IEEE** | Institute of Electrical and Electronics Engineers |
| **JWT** | JSON Web Token — estándar para tokens de autenticación sin estado |
| **KPI** | Key Performance Indicator — indicador clave de desempeño |
| **ORM** | Object-Relational Mapping — mapeo objeto-relacional (Prisma) |
| **PDF** | Portable Document Format |
| **RBAC** | Role-Based Access Control — control de acceso basado en roles |
| **SCHOOL** | Rol de director/coordinador de escuela en el sistema |
| **SRS** | Software Requirements Specification — Especificación de Requerimientos de Software |
| **UNA Puno** | Universidad Nacional del Altiplano Puno |
| **UI** | User Interface — interfaz de usuario |
| **XLSX** | Formato de hoja de cálculo de Microsoft Excel (Open XML) |
| **Zod** | Biblioteca de validación de esquemas TypeScript |

**Estados laborales:**

| Código | Descripción |
|---|---|
| `EMPLOYED` | Empleado en relación de dependencia |
| `SELF_EMPLOYED` | Independiente / Emprendedor |
| `UNEMPLOYED` | Desempleado |
| `SEEKING` | Buscando empleo activamente |
| `STUDYING` | Estudiando (posgrado u otra carrera) |

**Estados de postulación:**

| Código | Descripción |
|---|---|
| `PENDING` | Postulación recibida, pendiente de revisión |
| `REVIEWED` | Postulación revisada por el administrador |
| `INTERVIEW` | Egresado convocado a entrevista |
| `ACCEPTED` | Postulación aceptada |
| `REJECTED` | Postulación rechazada |

### 1.4 Referencias

- **Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado**, EP Ingeniería de Sistemas — UNA Puno, Versión 1, Mayo 2026.
- **Ley N° 30220** — Ley Universitaria del Perú.
- **Ley N° 29733** — Ley de Protección de Datos Personales del Perú.
- **Decreto Supremo N° 003-2013-JUS** — Reglamento de la Ley N° 29733.
- **IEEE Std 830-1998** — IEEE Recommended Practice for Software Requirements Specifications.
- **Next.js 16 Documentation** — Documentación oficial del framework.
- **Prisma 5 Documentation** — Documentación del ORM.
- **NextAuth v4 Documentation** — Documentación de autenticación.

### 1.5 Visión General del Documento

El presente documento se organiza en diez secciones principales:

- **Sección 1 (Introducción):** Propósito, alcance, definiciones y referencias.
- **Sección 2 (Descripción General):** Perspectiva del producto, objetivos, beneficios, usuarios y restricciones.
- **Sección 3 (Requerimientos Funcionales):** Catálogo de requerimientos agrupados por módulo.
- **Sección 4 (Requerimientos No Funcionales):** Restricciones de calidad del sistema.
- **Sección 5 (Casos de Uso):** Descripción detallada de los flujos de interacción más relevantes.
- **Sección 6 (Reglas de Negocio):** Normas derivadas del reglamento institucional y la lógica del sistema.
- **Sección 7 (Modelo Conceptual):** Descripción de las entidades principales del dominio.
- **Sección 8 (Matriz de Trazabilidad):** Relación entre objetivos, módulos y requerimientos.
- **Sección 9 (Conclusiones):** Síntesis del análisis realizado.
- **Sección 10 (Recomendaciones):** Sugerencias para la evolución del sistema.

---

## 2. DESCRIPCIÓN GENERAL

### 2.1 Perspectiva del Producto

El Sistema Web de Seguimiento e Inserción Laboral del Egresado es una aplicación web institucional desarrollada para la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno. Opera de forma autónoma (no depende de sistemas externos) y se accede exclusivamente a través de navegador web.

La plataforma centraliza tres funciones institucionales principales que actualmente se realizan de manera dispersa o manual: (1) el registro y seguimiento del egresado, (2) la distribución y análisis de encuestas de inserción laboral, y (3) la gestión de una bolsa de trabajo institucional. Su operación da cumplimiento al Artículo 20 del Reglamento, que establece la obligatoriedad de esta herramienta tecnológica como mecanismo central de seguimiento.

El sistema se comunica exclusivamente a través de una API REST interna (rutas Next.js App Router) y utiliza una base de datos PostgreSQL administrada mediante Prisma ORM.

### 2.2 Objetivos del Sistema

Los siguientes objetivos están directamente respaldados por los artículos 4 y 5 del Reglamento:

1. **Mantener actualizada** la información académica, profesional y laboral de los egresados de la EPIS (Art. 5, inciso a; Art. 11, inciso a).
2. **Obtener información estadística** sobre la empleabilidad y el desempeño profesional de los egresados mediante analítica de datos y encuestas (Art. 5, inciso b; Art. 18, inciso k).
3. **Fortalecer los mecanismos de comunicación** entre la Escuela Profesional y sus egresados a través de la publicación de encuestas y ofertas laborales (Art. 5, inciso c).
4. **Promover la inserción laboral** de los egresados mediante la bolsa de trabajo institucional (Art. 5, inciso d; Art. 19).
5. **Implementar herramientas tecnológicas** que faciliten el monitoreo y seguimiento sistemático de los egresados (Art. 5, inciso e; Art. 20).

### 2.3 Beneficios Esperados

- **Para la institución:** Información actualizada y centralizada sobre la situación laboral de sus egresados, indispensable para los procesos de acreditación y mejora curricular.
- **Para la Comisión de Seguimiento:** Reducción del trabajo manual en la recopilación de datos de egresados; informes exportables en formatos estándar (XLSX, CSV, PDF) listos para presentar a las autoridades académicas.
- **Para los egresados:** Acceso inmediato a ofertas laborales de la bolsa institucional, participación simplificada en encuestas institucionales y posibilidad de mantener actualizado su perfil profesional.
- **Para los empleadores:** Visibilidad de sus ofertas ante una comunidad calificada de profesionales en tecnología.

### 2.4 Usuarios del Sistema

#### Actor 1: Administrador (ADMIN)

**Descripción:** Representa a la Comisión de Seguimiento al Egresado de la EPIS (Art. 6 del Reglamento). Tiene acceso completo al sistema.

**Responsabilidades en el sistema:**
- Gestionar el registro de egresados.
- Crear, editar y eliminar encuestas institucionales.
- Crear, editar, activar/desactivar y eliminar ofertas laborales.
- Gestionar el estado de las postulaciones de los egresados.
- Consultar y exportar analítica e informes estadísticos.

**Credenciales de prueba:** `admin@unap.edu.pe` / `admin123`

#### Actor 2: Egresado (GRADUATE)

**Descripción:** Egresado, graduado o titulado de la Escuela Profesional de Ingeniería de Sistemas registrado en la Plataforma (Arts. 8, 9, 10 del Reglamento).

**Responsabilidades en el sistema:**
- Actualizar su información personal y laboral.
- Responder encuestas institucionales activas.
- Consultar y postularse a ofertas laborales activas.
- Visualizar el estado de sus postulaciones.

**Credenciales de prueba:** `juan.mamani@gmail.com` / `password123`

#### Actor 3: Escuela (SCHOOL)

**Descripción:** Director o coordinador de la Escuela Profesional (Art. 21 del Reglamento). Rol definido en la base de datos y considerado en las verificaciones de permisos de la API, pero sin interfaz de usuario operativa en la versión actual.

**Accesos habilitados en API:** Analítica, encuestas y postulaciones (solo lectura/consulta).

#### Actor 4: Público Anónimo

**Descripción:** Visitante no autenticado que accede al sitio web institucional.

**Accesos:** Página pública de inicio (landing) y listado público de ofertas laborales.

### 2.5 Restricciones

| Código | Restricción | Fuente |
|---|---|---|
| R-01 | Todas las operaciones sobre datos sensibles requieren autenticación mediante sesión JWT válida | Seguridad / Art. 20 Reglamento |
| R-02 | El acceso a los módulos administrativos está restringido exclusivamente al rol ADMIN | RBAC / Middleware |
| R-03 | La plataforma es de uso institucional; el registro está limitado a egresados de la EPIS | Art. 3 Reglamento |
| R-04 | La información personal de los egresados tiene carácter confidencial y solo puede utilizarse para fines institucionales | Art. 20 Reglamento / Ley N° 29733 |
| R-05 | Requiere conexión a internet y navegador web moderno | Plataforma web |
| R-06 | Requiere base de datos PostgreSQL accesible mediante `DATABASE_URL` | Arquitectura técnica |
| R-07 | Las variables de entorno `NEXTAUTH_SECRET` y `NEXTAUTH_URL` son obligatorias para la operación del sistema | Configuración |
| R-08 | Un egresado solo puede responder cada encuesta una vez | BD: `@@unique([surveyId, graduateId])` |
| R-09 | Un egresado no puede postularse más de una vez a la misma oferta laboral | BD: `@@unique([jobId, graduateId])` |
| R-10 | Solo el rol ADMIN puede crear y eliminar ofertas laborales | Regla de negocio / API |

---

## 3. REQUERIMIENTOS FUNCIONALES

### Módulo 1: Autenticación y Registro

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-01 | Iniciar sesión | El sistema permite al usuario autenticarse mediante correo electrónico y contraseña. El sistema valida las credenciales, verifica que el usuario esté activo (`isActive = true`) y genera un token JWT que incluye `id`, `role` y `graduateId`. | ADMIN, GRADUATE, SCHOOL | Alta |
| RF-02 | Cerrar sesión | El sistema permite al usuario invalidar su sesión activa y redirigirlo a la página de inicio. | ADMIN, GRADUATE, SCHOOL | Alta |
| RF-03 | Registrar egresado | El sistema permite que un nuevo egresado se registre proporcionando: nombre, apellido, DNI (8 dígitos), correo electrónico, contraseña, escuela profesional y año de egreso. El sistema verifica unicidad del correo y del DNI. La contraseña se almacena con hash bcrypt (10 rondas). Se crea simultáneamente un `User` y un `Graduate` en una sola operación. | Público / Egresado | Alta |
| RF-04 | Redirección por rol | Tras iniciar sesión, el sistema redirige automáticamente al usuario al dashboard correspondiente según su rol: ADMIN → `/admin`, GRADUATE → `/egresado`, SCHOOL → `/escuela`. Un usuario que intente acceder a una ruta de otro rol es redirigido a su propio dashboard. | ADMIN, GRADUATE, SCHOOL | Alta |
| RF-05 | Registro desde modal público | El sistema permite el registro de nuevos egresados desde un modal disponible en la página pública, sin necesidad de navegar a una página separada. El flujo es equivalente al RF-03 pero retorna `{ success: true }` en lugar de redirigir. | Público / Egresado | Media |
| RF-06 | Consultar escuelas para registro | El sistema expone un endpoint público (`GET /api/public/schools`) que retorna la lista de escuelas profesionales disponibles para poblar el selector durante el registro. | Público | Alta |

### Módulo 2: Gestión de Perfil del Egresado

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-07 | Consultar perfil propio | El egresado puede consultar su información completa de perfil, incluyendo datos personales, información laboral actual, nombre de escuela y facultad, y correo institucional. | GRADUATE | Alta |
| RF-08 | Actualizar perfil | El egresado puede editar su perfil actualizando los campos: nombre, apellido, teléfono, biografía personal (máx. 500 caracteres), estado laboral, cargo actual, empresa actual, ciudad, país y URL de LinkedIn. El sistema valida los datos mediante esquema Zod antes de persistirlos. | GRADUATE | Alta |
| RF-09 | Actualizar estado laboral | Como parte de la actualización de perfil (RF-08), el egresado selecciona su estado laboral entre cinco opciones definidas: `EMPLOYED`, `SELF_EMPLOYED`, `UNEMPLOYED`, `SEEKING`, `STUDYING`. | GRADUATE | Alta |
| RF-10 | Dashboard del egresado | El sistema muestra al egresado un panel con: resumen de estadísticas (total de postulaciones, encuestas respondidas, empleos activos disponibles, encuestas pendientes), encuestas pendientes, tres ofertas laborales recientes y un historial de actividad reciente (últimas postulaciones y encuestas completadas). | GRADUATE | Alta |

### Módulo 3: Encuestas

#### Sub-módulo 3A: Administración de Encuestas (ADMIN)

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-11 | Listar encuestas | El administrador visualiza todas las encuestas del sistema con metadatos: título, estado (activa/inactiva), tipo (global/por escuela), número de preguntas, número de respuestas, fecha de creación y fecha de cierre. | ADMIN, SCHOOL | Alta |
| RF-12 | Crear encuesta | El administrador crea una nueva encuesta definiendo: título, descripción opcional, alcance (global o por escuela), fecha de cierre opcional, y una o más preguntas. Cada pregunta tiene: texto, tipo, opciones (para preguntas de selección), obligatoriedad y orden. La creación se realiza en una transacción atómica que persiste la encuesta y todas sus preguntas. | ADMIN | Alta |
| RF-13 | Editar encuesta | El administrador puede modificar todos los atributos de una encuesta existente, incluyendo sus preguntas. Al actualizar las preguntas, el sistema elimina las existentes y crea las nuevas en una transacción. | ADMIN | Alta |
| RF-14 | Eliminar encuesta | El administrador puede eliminar permanentemente una encuesta. La eliminación es en cascada: elimina todas las preguntas, respuestas y respuestas individuales asociadas. | ADMIN | Media |
| RF-15 | Activar/desactivar encuesta | El administrador puede alternar el estado activo/inactivo de una encuesta mediante un toggle sin necesidad de editarla completa. | ADMIN | Alta |
| RF-16 | Ver resultados de encuesta | El administrador accede a un panel de resultados por encuesta que muestra, por cada pregunta, la distribución de respuestas recibidas, así como el total de respuestas y la tasa de participación respecto al total de egresados registrados. | ADMIN, SCHOOL | Alta |
| RF-17 | Tipos de pregunta soportados | El sistema soporta seis tipos de pregunta: texto libre corto (`text`), texto libre largo (`textarea`), selección única (`single`), selección múltiple (`multiple`), escala de valoración numérica (`rating`) y sí/no (`yesno`). | ADMIN | Alta |

#### Sub-módulo 3B: Participación del Egresado en Encuestas

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-18 | Listar encuestas disponibles | El egresado visualiza dos listas: encuestas activas pendientes de responder (vigentes y no vencidas) y encuestas ya completadas con su fecha de finalización. | GRADUATE | Alta |
| RF-19 | Responder encuesta | El egresado completa y envía las respuestas a una encuesta activa. El sistema verifica previamente que la encuesta esté activa, no haya vencido y el egresado no la haya respondido anteriormente. Las respuestas se persisten en una transacción atómica. El valor de cada respuesta es de tipo `Json` para soportar cadenas, números y arreglos. | GRADUATE | Alta |
| RF-20 | Control de respuesta única | El sistema rechaza con error HTTP 409 cualquier intento de un egresado de responder una encuesta que ya ha completado previamente. Esta restricción se aplica tanto a nivel de API como de base de datos. | GRADUATE | Alta |

### Módulo 4: Bolsa Laboral

#### Sub-módulo 4A: Administración de la Bolsa Laboral (ADMIN)

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-21 | Listar ofertas laborales (admin) | El administrador visualiza todas las ofertas laborales del sistema con filtros por texto, empresa y estado (activa/inactiva), con paginación de 15 registros por página. Se incluyen estadísticas globales: total de ofertas, ofertas activas, total de postulaciones y cantidad de empresas. | ADMIN, SCHOOL | Alta |
| RF-22 | Crear oferta laboral | El administrador crea una nueva oferta laboral definiendo: empresa, título, descripción, requisitos, ubicación, tipo de empleo (`FULL_TIME`, `PART_TIME`, `CONTRACT`, `INTERNSHIP`), rango salarial, modalidad remota, estado activo y fecha de expiración. Todos los campos son validados mediante esquema Zod. | ADMIN | Alta |
| RF-23 | Editar oferta laboral | El administrador puede modificar cualquier atributo de una oferta laboral existente. | ADMIN | Alta |
| RF-24 | Eliminar oferta laboral | El administrador puede eliminar permanentemente una oferta laboral del sistema. | ADMIN | Media |
| RF-25 | Activar/desactivar oferta | El administrador puede alternar el estado activo/inactivo de una oferta laboral mediante un toggle sin editar el registro completo. | ADMIN | Alta |

#### Sub-módulo 4B: Bolsa Laboral Pública y del Egresado

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-26 | Consultar bolsa laboral pública | Cualquier visitante (sin autenticación) puede consultar las ofertas laborales activas y vigentes. Permite filtrar por texto, tipo de empleo y modalidad remota. | Público | Alta |
| RF-27 | Ver detalle de oferta laboral | Cualquier visitante puede consultar el detalle completo de una oferta laboral activa, incluyendo datos de la empresa (nombre, sector, sitio web, descripción, estado de verificación). | Público, GRADUATE | Alta |
| RF-28 | Postularse a una oferta | El egresado puede postularse a una oferta laboral activa y vigente, adjuntando opcionalmente una carta de presentación (máx. 2000 caracteres). El sistema verifica que la oferta esté activa y que el egresado no se haya postulado previamente. | GRADUATE | Alta |
| RF-29 | Control de postulación única | El sistema rechaza con HTTP 409 cualquier intento de un egresado de postularse a una oferta a la que ya ha postulado. Esta restricción opera a nivel de API y de base de datos. | GRADUATE | Alta |
| RF-30 | Listar empleos del egresado | El egresado puede consultar el listado completo de sus postulaciones, con el título de la oferta, nombre de la empresa, estado actual de la postulación y fecha de aplicación. | GRADUATE | Alta |

### Módulo 5: Gestión de Postulaciones (ADMIN)

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-31 | Listar postulaciones | El administrador visualiza todas las postulaciones del sistema con filtros por estado y oferta laboral, con paginación de 20 registros por página. Por cada postulación se muestra: nombre del egresado, DNI, escuela, oferta y empresa a la que postuló, estado actual y fecha de postulación. | ADMIN, SCHOOL | Alta |
| RF-32 | Cambiar estado de postulación | El administrador puede actualizar el estado de cualquier postulación a uno de los cinco estados definidos: `PENDING`, `REVIEWED`, `INTERVIEW`, `ACCEPTED`, `REJECTED`. | ADMIN | Alta |

### Módulo 6: Gestión de Egresados (ADMIN)

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-33 | Listar egresados | El administrador visualiza el directorio de egresados registrados con búsqueda por nombre, apellido, DNI o correo electrónico, y filtros por facultad, escuela, estado laboral y año de egreso. La paginación muestra 12 registros por página. Se incluyen estadísticas: total de egresados, empleados, en búsqueda de empleo y registrados en el mes actual. | ADMIN | Alta |
| RF-34 | Ver detalle de egresado | El administrador accede al perfil completo de un egresado, incluyendo: datos personales, información de escuela y facultad, estado de la cuenta (`isActive`), historial de experiencias laborales, últimas 10 postulaciones con estado y últimas 5 respuestas a encuestas. | ADMIN | Alta |
| RF-35 | Filtros de facultad y escuela | El sistema carga dinámicamente los filtros de facultad y escuela disponibles para el directorio de egresados. | ADMIN | Media |

### Módulo 7: Analítica y Reportes

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-36 | Dashboard de analítica | El administrador accede a un panel de analítica que muestra KPIs globales: total de egresados, tasa de empleabilidad (%), egresados empleados, independientes, respuestas a encuestas, encuestas activas, empleos activos, total de postulaciones, empresas registradas y nuevos registros del mes actual. Soporta filtros por facultad, escuela, año de egreso y estado laboral. | ADMIN, SCHOOL | Alta |
| RF-37 | Gráfico de distribución de estado laboral | El sistema genera un gráfico de la distribución de egresados por estado laboral, aplicando los filtros seleccionados. | ADMIN, SCHOOL | Alta |
| RF-38 | Gráfico de egresados por facultad | El sistema genera un gráfico con la cantidad de egresados agrupados por facultad, aplicando los filtros seleccionados. | ADMIN, SCHOOL | Alta |
| RF-39 | Gráfico de evolución de egresos por año | El sistema genera un gráfico de tendencia con la cantidad de egresados por año de egreso. | ADMIN, SCHOOL | Alta |
| RF-40 | Gráfico de tasa de empleo por escuela | El sistema calcula y visualiza la tasa de empleabilidad (empleados + independientes / total) por escuela profesional. | ADMIN, SCHOOL | Alta |
| RF-41 | Gráfico de empresas por sector | El sistema genera un gráfico con la distribución de empresas registradas según su sector económico. | ADMIN, SCHOOL | Media |
| RF-42 | Gráfico de participación en encuestas | El sistema muestra las últimas 8 encuestas con el número de respuestas y la tasa de participación respecto al total de egresados. | ADMIN, SCHOOL | Media |
| RF-43 | Exportar datos en XLSX | El administrador puede exportar cuatro conjuntos de datos en formato Excel (.xlsx): egresados, postulaciones, respuestas a encuestas y ofertas laborales. Los campos exportados están en español con etiquetas legibles. | ADMIN | Alta |
| RF-44 | Exportar datos en CSV | El administrador puede exportar los mismos cuatro conjuntos de datos en formato CSV (codificación UTF-8 con BOM para compatibilidad con Excel en español). | ADMIN | Media |
| RF-45 | Generar reporte PDF institucional | El sistema genera y descarga un reporte PDF institucional con KPIs clave, tabla de egresados por facultad, distribución de estado laboral y evolución de egresos por año. El encabezado identifica a la institución (UNA Puno · EPIS) y registra la fecha de generación. Soporta los mismos filtros que la analítica. | ADMIN, SCHOOL | Alta |

### Módulo 8: Panel Público

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-46 | Página de inicio pública | El sistema muestra una página de inicio institucional con secciones informativas: héroe principal, estadísticas, sección sobre la carrera, beneficios, secciones de facultades, barra de empleadores y llamada a la acción. | Público | Media |
| RF-47 | Bolsa laboral pública | El sistema presenta la bolsa laboral a usuarios no autenticados con listado paginado de ofertas activas, filtros de búsqueda y tarjetas de oferta con información resumida. | Público | Alta |

---

## 4. REQUERIMIENTOS NO FUNCIONALES

### 4.1 Seguridad

| Código | Descripción | Sustento |
|---|---|---|
| RNF-01 | Las contraseñas se almacenan exclusivamente mediante hash bcrypt con factor de costo 10; no se almacenan en texto plano bajo ninguna circunstancia. | Buenas prácticas de seguridad / Art. 20 Reglamento |
| RNF-02 | La autenticación se implementa mediante tokens JWT firmados con la clave `NEXTAUTH_SECRET`. Los tokens no son persistidos en base de datos (estrategia `jwt` de NextAuth). | Arquitectura técnica |
| RNF-03 | Todas las rutas API sensibles verifican la sesión mediante `getServerSession(authOptions)` y retornan HTTP 401 si no hay sesión activa, y HTTP 403 si el rol no corresponde. | Código fuente — todas las rutas API |
| RNF-04 | El control de acceso basado en roles (RBAC) se aplica a nivel de middleware de Next.js para las rutas de navegación, y a nivel de cada handler de API para las operaciones de datos. | Middleware.ts / API routes |
| RNF-05 | La información registrada en la Plataforma tiene carácter confidencial y se utiliza exclusivamente para los fines institucionales del reglamento. El acceso a datos de egresados está restringido a usuarios con rol ADMIN o SCHOOL. | Art. 20 Reglamento / Ley N° 29733 |
| RNF-06 | Las entradas de usuario se validan mediante esquemas Zod en el servidor antes de ser procesadas, previniendo inyección de datos malformados. | Código fuente — lib/validations/ |

### 4.2 Rendimiento

| Código | Descripción | Sustento |
|---|---|---|
| RNF-07 | Las consultas de analítica utilizan `Promise.all` para ejecutar múltiples queries en paralelo, minimizando la latencia total de respuesta. | analytics.service.ts / dashboard.service.ts |
| RNF-08 | Los listados paginados limitan la cantidad de registros por página (12 para egresados, 15 para ofertas, 20 para postulaciones) para evitar consultas masivas a la base de datos. | admin-graduates.service.ts / jobs.service.ts |
| RNF-09 | Los campos de alta frecuencia de búsqueda en la base de datos cuentan con índices definidos en el esquema Prisma: `schoolId`, `employmentStatus`, `graduationYear` en `Graduate`; `isActive` en `JobOffer`; `graduateId` en `WorkExperience`; `surveyId` en `SurveyQuestion`. | prisma/schema.prisma |

### 4.3 Disponibilidad

| Código | Descripción | Sustento |
|---|---|---|
| RNF-10 | El sistema debe estar disponible de forma continua durante el horario laboral institucional. La Oficina de Tecnologías de la Información de la universidad es responsable del mantenimiento, seguridad informática y disponibilidad del sistema. | Art. 20 Reglamento |
| RNF-11 | El sistema utiliza loading states y Suspense boundaries de React en todas las páginas del dashboard (`loading.tsx` y componentes `*-skeleton.tsx`) para que la interfaz sea utilizable durante la carga de datos. | Código fuente — loading.tsx files |

### 4.4 Usabilidad

| Código | Descripción | Sustento |
|---|---|---|
| RNF-12 | La interfaz de usuario está completamente en español, incluyendo etiquetas, mensajes de error y notificaciones, para garantizar accesibilidad a la comunidad universitaria peruana. | Código fuente — componentes UI |
| RNF-13 | El sistema utiliza notificaciones toast (`sonner`) para comunicar al usuario el resultado de las operaciones (éxito o error) sin interrumpir el flujo de navegación. | Código fuente — componentes |
| RNF-14 | El diseño es responsivo, adaptándose a dispositivos de escritorio y móviles, implementado con Tailwind CSS v4. | Código fuente — globals.css / componentes |
| RNF-15 | Los formularios utilizan React Hook Form con validación en tiempo real mediante Zod para proporcionar retroalimentación inmediata al usuario sobre errores de entrada. | Código fuente — formularios |

### 4.5 Escalabilidad

| Código | Descripción | Sustento |
|---|---|---|
| RNF-16 | La arquitectura de la base de datos soporta múltiples facultades y escuelas profesionales mediante las entidades `Faculty` y `School`, permitiendo la extensión del sistema a otras unidades académicas. | prisma/schema.prisma |
| RNF-17 | La capa de servicios (`src/lib/services/`) abstrae completamente el acceso a la base de datos, permitiendo su evolución independiente de la capa de presentación. | Arquitectura técnica |

### 4.6 Compatibilidad

| Código | Descripción | Sustento |
|---|---|---|
| RNF-18 | El sistema es compatible con los navegadores web modernos: Google Chrome, Mozilla Firefox, Microsoft Edge y Safari en sus versiones actuales. | Tecnología web estándar (Next.js + React) |
| RNF-19 | Los archivos exportados son compatibles con Microsoft Excel y otras hojas de cálculo: XLSX mediante la biblioteca `xlsx`, y CSV con codificación UTF-8 BOM para visualización correcta de caracteres especiales del español. | analytics/export/route.ts |
| RNF-20 | El reporte PDF generado sigue el estándar PDF/A compatible con Adobe Reader y otros lectores PDF estándar. | @react-pdf/renderer |

### 4.7 Mantenibilidad

| Código | Descripción | Sustento |
|---|---|---|
| RNF-21 | El código sigue una arquitectura en capas: rutas API → servicios → Prisma ORM, garantizando separación de responsabilidades y facilidad de mantenimiento. | CLAUDE.md / arquitectura del proyecto |
| RNF-22 | Los esquemas de validación y los mapas de etiquetas (`JOB_TYPE_LABELS`, `APP_STATUS_LABELS`) están centralizados en `src/lib/validations/`, evitando duplicación de lógica. | lib/validations/ |
| RNF-23 | Las migraciones de base de datos se gestionan mediante Prisma Migrate, garantizando trazabilidad de los cambios de esquema. | prisma/ |
| RNF-24 | El sistema utiliza TypeScript en toda la base de código, con tipos inferidos desde las funciones de servicio para mantener la coherencia entre capas. | Código fuente |

### 4.8 Protección de Datos

| Código | Descripción | Sustento |
|---|---|---|
| RNF-25 | El tratamiento de datos personales de los egresados cumple con la Ley N° 29733 (Ley de Protección de Datos Personales del Perú) y su reglamento D.S. N° 003-2013-JUS. | Art. 2 y Art. 20 Reglamento |
| RNF-26 | El acceso a los datos personales de egresados está restringido a los miembros autorizados (rol ADMIN y SCHOOL) y a los propios egresados respecto de su propia información. | RNF-03 / Art. 20 Reglamento |
| RNF-27 | El sistema garantiza que un egresado autenticado solo pueda modificar su propia información de perfil. El servicio `updateGraduateProfile` verifica que el `graduateId` pertenezca al `userId` de la sesión activa antes de ejecutar la actualización. | graduate.service.ts:26-29 |
| RNF-28 | Los egresados tienen derecho a solicitar la rectificación, actualización o cancelación de sus datos personales, conforme al Art. 12, inciso h del Reglamento y la Ley N° 29733. | Art. 12 Reglamento |

---

## 5. CASOS DE USO

### CU-01: Iniciar Sesión

- **Actor:** ADMIN, GRADUATE, SCHOOL
- **Descripción:** El usuario accede al sistema mediante sus credenciales institucionales.
- **Precondiciones:** El usuario tiene una cuenta activa (`isActive = true`) en el sistema.
- **Flujo principal:**
  1. El usuario navega a `/login`.
  2. Ingresa su correo electrónico y contraseña.
  3. El sistema valida el formato mediante esquema Zod.
  4. El sistema busca el usuario en la base de datos por correo electrónico.
  5. El sistema verifica que el usuario esté activo y compara la contraseña con el hash bcrypt almacenado.
  6. Si las credenciales son correctas, el sistema genera un token JWT con `id`, `role` y `graduateId`.
  7. El sistema redirige al usuario al dashboard correspondiente según su rol.
- **Postcondiciones:** El usuario tiene una sesión activa y accede a las funcionalidades de su rol.
- **Flujos alternativos:**
  - 5a. Si el usuario no existe, la cuenta está inactiva o la contraseña es incorrecta, el sistema redirige a `/login` con mensaje de error.

---

### CU-02: Registrar Egresado

- **Actor:** Público (nuevo egresado)
- **Descripción:** Un nuevo egresado crea su cuenta en la plataforma.
- **Precondiciones:** El usuario no tiene cuenta previa en el sistema.
- **Flujo principal:**
  1. El usuario accede a `/registro` o abre el modal de registro desde la página pública.
  2. Completa el formulario: nombre, apellido, DNI (8 dígitos), correo electrónico, contraseña (mín. 6 caracteres), escuela profesional y año de egreso.
  3. El sistema carga la lista de escuelas disponibles desde `GET /api/public/schools`.
  4. El sistema valida todos los campos mediante el `RegisterSchema` de Zod.
  5. El sistema verifica que no exista otro usuario con el mismo correo y que no exista otro egresado con el mismo DNI.
  6. El sistema crea el `User` con la contraseña hasheada y el `Graduate` asociado en una operación atómica.
  7. El sistema redirige a `/login?registered=true` (o retorna `{ success: true }` si es desde modal).
- **Postcondiciones:** El egresado tiene una cuenta activa con rol `GRADUATE` y puede iniciar sesión.
- **Flujos alternativos:**
  - 5a. Si el correo ya existe: se retorna error "Ya existe una cuenta con este email".
  - 5b. Si el DNI ya existe: se retorna error "Ya existe un egresado registrado con ese DNI".
  - 4a. Si algún campo no pasa la validación Zod: se retorna el primer mensaje de error al formulario.

---

### CU-03: Actualizar Perfil del Egresado

- **Actor:** GRADUATE
- **Descripción:** El egresado actualiza su información personal y laboral.
- **Precondiciones:** El egresado tiene sesión activa.
- **Flujo principal:**
  1. El egresado navega a `/egresado/perfil`.
  2. El sistema carga los datos actuales del perfil desde `GET /api/graduates/me`.
  3. El egresado modifica los campos deseados: nombre, apellido, teléfono, biografía, estado laboral, cargo actual, empresa actual, ciudad, país o LinkedIn.
  4. El egresado envía el formulario.
  5. El sistema valida los datos mediante `updateProfileSchema`.
  6. El sistema verifica que el `graduateId` pertenezca al usuario de la sesión activa.
  7. El sistema persiste los cambios en la base de datos.
  8. El sistema muestra una notificación de éxito.
- **Postcondiciones:** El perfil del egresado queda actualizado en la base de datos.
- **Flujos alternativos:**
  - 6a. Si el perfil no pertenece al usuario autenticado: HTTP 403.

---

### CU-04: Responder Encuesta

- **Actor:** GRADUATE
- **Descripción:** El egresado completa una encuesta institucional activa.
- **Precondiciones:** El egresado tiene sesión activa; la encuesta está activa, vigente y no ha sido respondida previamente por este egresado.
- **Flujo principal:**
  1. El egresado navega a `/egresado/encuestas`.
  2. El sistema muestra las encuestas pendientes (`GET /api/surveys/:id`).
  3. El egresado selecciona una encuesta y la completa pregunta a pregunta.
  4. El egresado envía el formulario.
  5. El sistema verifica que la encuesta no haya sido respondida previamente.
  6. El sistema persiste la respuesta y todas las respuestas individuales en una transacción atómica.
  7. La encuesta pasa al listado de "completadas" del egresado.
- **Postcondiciones:** La `SurveyResponse` y los `SurveyAnswer` correspondientes quedan registrados. La encuesta ya no aparece en la lista de pendientes.
- **Flujos alternativos:**
  - 5a. Si la encuesta ya fue respondida: HTTP 409, mensaje "Ya respondiste esta encuesta".

---

### CU-05: Consultar y Postularse a Oferta Laboral

- **Actor:** GRADUATE
- **Descripción:** El egresado consulta las ofertas laborales disponibles y se postula a una.
- **Precondiciones:** El egresado tiene sesión activa; la oferta está activa y vigente.
- **Flujo principal:**
  1. El egresado navega a `/egresado/empleos`.
  2. El sistema muestra las ofertas activas y vigentes con filtros opcionales.
  3. El egresado selecciona una oferta para ver su detalle.
  4. El egresado hace clic en "Postularme" y opcionalmente escribe una carta de presentación.
  5. El sistema verifica que la oferta esté activa, no haya expirado y el egresado no se haya postulado antes.
  6. El sistema crea la `JobApplication` con estado `PENDING`.
  7. El sistema muestra una notificación de éxito.
- **Postcondiciones:** La postulación queda registrada con estado `PENDING`.
- **Flujos alternativos:**
  - 5a. Si ya se postuló: HTTP 409, "Ya te has postulado a esta oferta".
  - 5b. Si la oferta no está disponible: HTTP 404, "Esta oferta no está disponible".

---

### CU-06: Gestionar Egresados (Administrador)

- **Actor:** ADMIN
- **Descripción:** El administrador consulta y revisa el directorio de egresados registrados.
- **Precondiciones:** El administrador tiene sesión activa con rol ADMIN.
- **Flujo principal:**
  1. El administrador navega a `/admin/egresados`.
  2. El sistema muestra el listado paginado con estadísticas del encabezado.
  3. El administrador puede filtrar por búsqueda de texto (nombre, apellido, DNI, correo), facultad, escuela, estado laboral o año de egreso.
  4. El administrador selecciona un egresado para ver su ficha completa.
  5. El sistema muestra el perfil completo del egresado con historial laboral, postulaciones y respuestas a encuestas.
- **Postcondiciones:** El administrador tiene visibilidad completa del egresado seleccionado.

---

### CU-07: Gestionar Encuestas (Administrador)

- **Actor:** ADMIN
- **Descripción:** El administrador crea y administra encuestas institucionales.
- **Precondiciones:** El administrador tiene sesión activa con rol ADMIN.
- **Flujo principal (crear):**
  1. El administrador navega a `/admin/encuestas/nueva`.
  2. Define el título, descripción, alcance (global o por escuela), fecha de cierre y agrega preguntas con su tipo, opciones y orden.
  3. Envía el formulario.
  4. El sistema crea la encuesta y todas sus preguntas en una transacción.
  5. La encuesta queda disponible para los egresados si está activa.
- **Flujo principal (editar/gestionar):**
  1. El administrador accede a la lista de encuestas.
  2. Puede activar/desactivar, editar o eliminar cualquier encuesta.
  3. Puede ver los resultados de las respuestas recibidas.
- **Postcondiciones:** La encuesta queda publicada y disponible para los egresados según su configuración.

---

### CU-08: Gestionar Ofertas Laborales (Administrador)

- **Actor:** ADMIN
- **Descripción:** El administrador publica y administra las ofertas de la bolsa laboral.
- **Precondiciones:** El administrador tiene sesión activa con rol ADMIN; existen empresas registradas en el sistema.
- **Flujo principal (crear):**
  1. El administrador navega a `/admin/bolsa-laboral/nueva`.
  2. Selecciona empresa, define título, descripción, requisitos, ubicación, tipo de empleo, salario, modalidad remota y fecha de expiración.
  3. El sistema valida los datos y crea la oferta.
- **Flujo principal (gestionar):**
  1. Desde la lista, el administrador puede activar/desactivar, editar o eliminar ofertas.
  2. Puede filtrar ofertas por texto, empresa o estado.
- **Postcondiciones:** La oferta queda publicada (si activa) en la bolsa laboral pública y del egresado.

---

### CU-09: Gestionar Postulaciones (Administrador)

- **Actor:** ADMIN
- **Descripción:** El administrador revisa y actualiza el estado de las postulaciones recibidas.
- **Precondiciones:** El administrador tiene sesión activa con rol ADMIN.
- **Flujo principal:**
  1. El administrador navega a `/admin/postulaciones`.
  2. Visualiza las postulaciones con filtros por estado o por oferta laboral.
  3. Selecciona una postulación y actualiza su estado a uno de: `REVIEWED`, `INTERVIEW`, `ACCEPTED` o `REJECTED`.
  4. El sistema persiste el cambio de estado.
- **Postcondiciones:** El estado de la postulación queda actualizado; el egresado puede ver el nuevo estado en su lista de postulaciones.

---

### CU-10: Generar Reportes (Administrador)

- **Actor:** ADMIN, SCHOOL
- **Descripción:** El administrador genera y descarga reportes estadísticos sobre los egresados.
- **Precondiciones:** El administrador tiene sesión activa con rol ADMIN o SCHOOL.
- **Flujo principal:**
  1. El administrador navega a `/admin/reportes`.
  2. Aplica filtros opcionales (facultad, escuela, año de egreso, estado laboral).
  3. Selecciona el tipo de exportación: XLSX, CSV o PDF.
  4. Para XLSX/CSV selecciona el conjunto de datos: egresados, postulaciones, respuestas a encuestas u ofertas laborales.
  5. El sistema genera el archivo y lo descarga directamente en el navegador.
- **Postcondiciones:** El archivo descargado contiene los datos actualizados en el formato seleccionado.

---

## 6. REGLAS DE NEGOCIO

| Código | Regla | Fuente |
|---|---|---|
| RN-01 | Solo pueden registrarse en la Plataforma egresados de la Escuela Profesional de Ingeniería de Sistemas. El registro requiere seleccionar una escuela profesional válida del sistema. | Art. 3 Reglamento / RF-03 |
| RN-02 | Cada egresado tiene una única cuenta de usuario. La unicidad se garantiza por correo electrónico y por DNI. | RF-03 / prisma/schema.prisma |
| RN-03 | Los egresados tienen el deber de registrar y mantener actualizados sus datos en la Plataforma al momento de egresar, graduarse o titularse. | Art. 11, inciso a Reglamento |
| RN-04 | Los egresados tienen el deber de responder las encuestas institucionales sobre logro de competencias, satisfacción laboral y percepción de la formación recibida. | Art. 11, inciso g Reglamento |
| RN-05 | Un egresado no puede responder la misma encuesta más de una vez. Restricción aplicada a nivel de lógica de aplicación (HTTP 409) y de base de datos (`@@unique([surveyId, graduateId])`). | RF-20 / Art. 18, inciso c Reglamento |
| RN-06 | Un egresado no puede postularse más de una vez a la misma oferta laboral. Restricción aplicada a nivel de lógica de aplicación (HTTP 409) y de base de datos (`@@unique([jobId, graduateId])`). | RF-29 |
| RN-07 | Solo egresados con sesión activa y rol `GRADUATE` pueden responder encuestas. Los administradores y usuarios de tipo escuela no pueden responder encuestas como participantes. | surveys/[id]/respond/route.ts:10-11 |
| RN-08 | Solo egresados con sesión activa y rol `GRADUATE` pueden postularse a ofertas laborales. | jobs/[id]/apply/route.ts:10-11 |
| RN-09 | Solo el rol `ADMIN` puede crear y eliminar ofertas laborales. El rol `SCHOOL` puede consultar pero no crear. | jobs/route.ts:32-33 |
| RN-10 | Las encuestas solo son accesibles para los egresados cuando están activas (`isActive = true`) y dentro de su vigencia (antes de `endsAt`, o sin fecha límite). | RF-18 / surveys.service.ts:143-155 |
| RN-11 | Las ofertas laborales solo aparecen en la bolsa pública cuando están activas (`isActive = true`) y dentro de su vigencia (antes de `expiresAt`, o sin fecha de expiración). | RF-26 / jobs.service.ts:198-203 |
| RN-12 | La información registrada en la Plataforma tiene carácter confidencial y es utilizada exclusivamente para fines institucionales, en cumplimiento de la Ley N° 29733. | Art. 20 Reglamento |
| RN-13 | El acceso a datos de egresados de terceros está restringido al rol ADMIN. Un egresado autenticado solo puede leer y modificar su propia información. | RNF-27 / graduate.service.ts |
| RN-14 | Los egresados tienen el derecho de solicitar la rectificación, actualización o cancelación de sus datos personales registrados en la Plataforma. | Art. 12, inciso h Reglamento |
| RN-15 | Las encuestas de seguimiento son de aplicación semestral según el Reglamento. La Plataforma soporta este ciclo mediante el campo `endsAt` de la encuesta. | Art. 18, inciso c Reglamento |
| RN-16 | Las encuestas pueden ser de alcance global (para todos los egresados) o restringidas a una escuela profesional específica (`schoolId`). | RF-12 / prisma/schema.prisma |
| RN-17 | Un egresado solo puede modificar su propio perfil. El sistema verifica que el `graduateId` corresponda al `userId` de la sesión antes de ejecutar cualquier actualización. | RNF-27 / graduate.service.ts:25-29 |
| RN-18 | Las cuentas de usuario tienen un campo `isActive`. Un usuario con `isActive = false` no puede iniciar sesión en el sistema. | auth.ts:33 |
| RN-19 | El estado de las postulaciones sigue el flujo: `PENDING → REVIEWED → INTERVIEW → ACCEPTED / REJECTED`. Solo el administrador puede cambiar el estado de las postulaciones. | RF-32 |
| RN-20 | La bolsa laboral de la Escuela Profesional está dirigida a estudiantes del último ciclo en búsqueda de prácticas preprofesionales o profesionales, así como a egresados, graduados y titulados. | Art. 19 Reglamento |

---

## 7. MODELO CONCEPTUAL

### Entidades Principales

#### Usuario (`User`)
Entidad base de autenticación del sistema. Almacena las credenciales de acceso (correo electrónico y contraseña hasheada), el rol del usuario en el sistema (`ADMIN`, `GRADUATE`, `SCHOOL`) y el estado de la cuenta (`isActive`). Todo acceso al sistema está mediado por esta entidad. Un `User` con rol `GRADUATE` tiene asociado exactamente un `Graduate`.

#### Egresado (`Graduate`)
Representa el perfil académico y profesional de un egresado de la Escuela Profesional. Extiende al `User` con información institucional (DNI único, escuela de egreso, año de egreso, título obtenido) e información laboral actualizable (estado laboral, cargo actual, empresa actual, ciudad, biografía, LinkedIn). Es la entidad central del sistema y se relaciona con `School`, `WorkExperience`, `SurveyResponse` y `JobApplication`.

#### Facultad (`Faculty`)
Representa una unidad académica de nivel facultad de la Universidad Nacional del Altiplano (ej: FIMEES). Tiene un código único y agrupa a múltiples Escuelas Profesionales.

#### Escuela Profesional (`School`)
Representa un programa académico dentro de una Facultad (ej: Ingeniería de Sistemas). Tiene un código único, pertenece a una `Faculty` y agrupa a sus egresados. Puede tener encuestas propias.

#### Experiencia Laboral (`WorkExperience`)
Registra las experiencias laborales del historial profesional de un egresado: empresa, cargo, fechas de inicio y fin, ubicación y descripción. Un egresado puede tener múltiples experiencias laborales.

#### Encuesta (`Survey`)
Instrumento de seguimiento institucional creado por el administrador. Tiene un título, descripción, alcance (global o por escuela), estado activo/inactivo y fecha de cierre opcional. Contiene una o más `SurveyQuestion`. Según el Reglamento, las encuestas son semestrales y miden empleabilidad, satisfacción y logro de competencias.

#### Pregunta de Encuesta (`SurveyQuestion`)
Cada ítem evaluable dentro de una encuesta. Define el texto de la pregunta, su tipo (texto, textarea, selección única, selección múltiple, valoración o sí/no), las opciones válidas (para preguntas de selección, almacenadas como `Json`), su obligatoriedad y su orden de presentación.

#### Respuesta de Encuesta (`SurveyResponse`)
Registro de que un egresado completó una encuesta. La restricción `@@unique([surveyId, graduateId])` garantiza que cada egresado responda cada encuesta exactamente una vez. Contiene múltiples `SurveyAnswer`.

#### Respuesta Individual (`SurveyAnswer`)
Almacena la respuesta de un egresado a una pregunta específica. El campo `value` es de tipo `Json` para soportar cadenas (texto libre), números (valoraciones) y arreglos de cadenas (selección múltiple).

#### Empresa (`Company`)
Organización que publica ofertas laborales en la bolsa de trabajo institucional. Almacena: nombre, RUC, sector económico, logo, sitio web, descripción y estado de verificación manual por el administrador.

#### Oferta Laboral (`JobOffer`)
Oportunidad de empleo publicada por una `Company`. Incluye: título, descripción, requisitos, ubicación, tipo de empleo (tiempo completo, medio tiempo, contrato, prácticas), rango salarial, modalidad remota, estado activo y fecha de expiración. Solo aparece en la bolsa pública si está activa y vigente.

#### Postulación (`JobApplication`)
Registro de que un egresado se postuló a una oferta laboral. La restricción `@@unique([jobId, graduateId])` garantiza una postulación por egresado por oferta. Incluye carta de presentación opcional y un estado que el administrador gestiona a través del ciclo: `PENDING → REVIEWED → INTERVIEW → ACCEPTED / REJECTED`.

#### Evento (`Event`)
Entidad reservada en el esquema de base de datos para representar eventos institucionales (graduaciones, ferias, talleres). En la versión actual del sistema, esta entidad no cuenta con API ni interfaz de usuario implementada y se considera un stub para desarrollo futuro.

---

## 8. MATRIZ DE TRAZABILIDAD

### Objetivos → Módulos → Requerimientos Funcionales

| Objetivo del Sistema | Módulo(s) | Requerimientos Funcionales |
|---|---|---|
| **OBJ-1:** Mantener actualizada la información de los egresados | Autenticación y Registro, Gestión de Perfil | RF-01 a RF-06, RF-07 a RF-10 |
| **OBJ-2:** Obtener información estadística sobre empleabilidad | Analítica y Reportes | RF-36 a RF-45 |
| **OBJ-3:** Fortalecer mecanismos de comunicación (encuestas) | Encuestas | RF-11 a RF-20 |
| **OBJ-4:** Promover la inserción laboral (bolsa laboral) | Bolsa Laboral, Gestión de Postulaciones | RF-21 a RF-32 |
| **OBJ-5:** Implementar herramientas tecnológicas de monitoreo | Gestión de Egresados (Admin), Analítica | RF-33 a RF-35, RF-36 a RF-45 |

### Módulos → Requerimientos Funcionales (resumen)

| Módulo | Requerimientos |
|---|---|
| M1 — Autenticación y Registro | RF-01, RF-02, RF-03, RF-04, RF-05, RF-06 |
| M2 — Perfil del Egresado | RF-07, RF-08, RF-09, RF-10 |
| M3 — Encuestas (Admin) | RF-11, RF-12, RF-13, RF-14, RF-15, RF-16, RF-17 |
| M3 — Encuestas (Egresado) | RF-18, RF-19, RF-20 |
| M4 — Bolsa Laboral (Admin) | RF-21, RF-22, RF-23, RF-24, RF-25 |
| M4 — Bolsa Laboral (Pública/Egresado) | RF-26, RF-27, RF-28, RF-29, RF-30 |
| M5 — Gestión de Postulaciones | RF-31, RF-32 |
| M6 — Gestión de Egresados (Admin) | RF-33, RF-34, RF-35 |
| M7 — Analítica y Reportes | RF-36, RF-37, RF-38, RF-39, RF-40, RF-41, RF-42, RF-43, RF-44, RF-45 |
| M8 — Panel Público | RF-46, RF-47 |

### Módulos → Requerimientos No Funcionales

| Módulo / Área | Requerimientos No Funcionales |
|---|---|
| Seguridad global | RNF-01, RNF-02, RNF-03, RNF-04, RNF-05, RNF-06 |
| Rendimiento (base de datos) | RNF-07, RNF-08, RNF-09 |
| Disponibilidad | RNF-10, RNF-11 |
| Interfaz de usuario | RNF-12, RNF-13, RNF-14, RNF-15 |
| Escalabilidad y arquitectura | RNF-16, RNF-17 |
| Compatibilidad | RNF-18, RNF-19, RNF-20 |
| Mantenibilidad | RNF-21, RNF-22, RNF-23, RNF-24 |
| Protección de datos | RNF-25, RNF-26, RNF-27, RNF-28 |

---

## 9. CONCLUSIONES

1. **Correspondencia reglamento-sistema:** El sistema implementado cubre los mecanismos centrales establecidos en el Reglamento: registro de egresados (Art. 11a), bolsa laboral institucional (Art. 19), encuestas de seguimiento (Art. 18c), analítica estadística de empleabilidad (Art. 18k) y protección de datos (Art. 20 / Ley N° 29733).

2. **Arquitectura sólida:** La separación estricta en capas (rutas API → servicios → Prisma ORM), el uso de TypeScript end-to-end y los esquemas de validación centralizados en `src/lib/validations/` garantizan la coherencia y mantenibilidad del sistema.

3. **Seguridad correctamente implementada:** El control de acceso basado en roles (RBAC) opera en dos niveles complementarios: el middleware de Next.js protege las rutas de navegación y cada route handler verifica la sesión y el rol de forma independiente, previniendo accesos no autorizados incluso en escenarios de evasión.

4. **Restricciones de integridad robustas:** Las reglas de negocio más críticas (un egresado responde cada encuesta una vez; un egresado se postula una vez por oferta) están implementadas tanto a nivel de lógica de aplicación como mediante restricciones de base de datos (`@@unique`), garantizando la integridad incluso ante fallos de la capa de aplicación.

5. **Funcionalidades pendientes identificadas:** El módulo de eventos (`Event`) existe únicamente como modelo de datos sin implementación de API ni interfaz. El módulo de Escuela (`SCHOOL`) tiene el rol definido y considerado en los permisos de la API, pero carece de interfaz operativa. Estos representan el margen natural de crecimiento del sistema.

6. **Conformidad con la normativa peruana:** La implementación respeta los principios de la Ley N° 29733 mediante restricción de acceso a datos personales, almacenamiento seguro de contraseñas y el derecho del egresado a actualizar su propia información.

---

## 10. RECOMENDACIONES

1. **Módulo de Eventos:** Implementar la API y la interfaz del módulo de eventos (`Event`) para habilitar la publicación de eventos institucionales (graduaciones, ferias de empleo, talleres) en la plataforma, en línea con el Art. 12a del Reglamento que establece el derecho del egresado a recibir información sobre actividades programadas.

2. **Panel de Escuela (SCHOOL):** Desarrollar la interfaz operativa del rol `SCHOOL` para que el Director de la Escuela Profesional pueda consultar la analítica de sus egresados y gestionar encuestas propias, cumpliendo el Art. 21 del Reglamento.

3. **Gestión completa de empresas:** Implementar un módulo de administración de empresas con alta, edición y proceso de verificación, ya que actualmente las empresas se acceden únicamente como lista para la creación de ofertas.

4. **Recuperación de contraseña:** Implementar un flujo de recuperación de contraseña por correo electrónico, ya que actualmente no existe esta funcionalidad, lo que puede generar bloqueos de acceso para egresados.

5. **Notificaciones a egresados:** Implementar un sistema de notificaciones (por correo electrónico o dentro de la plataforma) para alertar a los egresados sobre nuevas ofertas laborales, nuevas encuestas disponibles y cambios en el estado de sus postulaciones (Art. 12a del Reglamento).

6. **Historial de experiencia laboral editable:** Permitir al egresado agregar, editar y eliminar entradas de su historial de experiencias laborales (`WorkExperience`) desde su perfil, ya que esta entidad existe en la base de datos pero no cuenta con interfaz de edición.

7. **Carga de foto y CV:** Implementar la funcionalidad de subida de foto de perfil y CV en PDF (campos `photo` y `cvUrl` ya definidos en el modelo `Graduate`), integrando un servicio de almacenamiento en la nube como Cloudinary.

8. **Encuestas con alcance por escuela:** Aunque el modelo soporta encuestas dirigidas a una escuela específica (`schoolId`), se recomienda validar en la interfaz del egresado que solo vea las encuestas globales y las de su escuela de egreso, garantizando la pertinencia de los instrumentos.

9. **Auditoría de accesos:** Implementar un registro de auditoría para las operaciones administrativas críticas (cambios de estado de postulaciones, creación/eliminación de encuestas), en línea con los principios de confidencialidad del Art. 20 del Reglamento.

10. **Exportación de resultados de encuesta:** Agregar la opción de exportar los resultados detallados de encuestas individuales (con respuestas por pregunta) en los formatos XLSX y CSV, para facilitar la elaboración de los informes periódicos que la Comisión debe presentar al Director de la Escuela (Art. 7g del Reglamento).

---

## TABLA DE MÓDULOS DETECTADOS

| N° | Módulo | Estado | Rutas principales | Actor(es) |
|---|---|---|---|---|
| 1 | Autenticación y Registro | Implementado | `/login`, `/registro`, `/api/auth/[...nextauth]`, `/api/public/schools` | Todos |
| 2 | Gestión de Perfil del Egresado | Implementado | `/egresado/perfil`, `/api/graduates/me` | GRADUATE |
| 3 | Dashboard del Egresado | Implementado | `/egresado`, `/api/dashboard/graduate` | GRADUATE |
| 4 | Encuestas — Administración | Implementado | `/admin/encuestas/*`, `/api/admin/surveys/*` | ADMIN, SCHOOL |
| 5 | Encuestas — Participación | Implementado | `/egresado/encuestas/*`, `/api/surveys/*` | GRADUATE |
| 6 | Bolsa Laboral — Administración | Implementado | `/admin/bolsa-laboral/*`, `/api/admin/jobs/*` | ADMIN |
| 7 | Bolsa Laboral — Pública/Egresado | Implementado | `/(public)/empleos/*`, `/egresado/empleos/*`, `/api/jobs/*` | Público, GRADUATE |
| 8 | Gestión de Postulaciones | Implementado | `/admin/postulaciones`, `/api/admin/applications/*` | ADMIN, SCHOOL |
| 9 | Gestión de Egresados (Admin) | Implementado | `/admin/egresados/*`, `/api/admin/graduates/*` | ADMIN |
| 10 | Analítica y Reportes | Implementado | `/admin/reportes`, `/api/admin/analytics/*`, `/api/admin/reports/pdf` | ADMIN, SCHOOL |
| 11 | Panel Público | Implementado | `/`, `/(public)/empleos` | Público |
| 12 | Dashboard Administrativo | Implementado | `/admin` | ADMIN |
| 13 | Panel de Escuela | Stub | `/escuela` | SCHOOL |
| 14 | Módulo de Eventos | Stub (BD únicamente) | — | — |

## TABLA DE ACTORES DETECTADOS

| Actor | Rol en BD | Dashboard | Permisos principales |
|---|---|---|---|
| Administrador | `ADMIN` | `/admin` | CRUD completo de egresados, encuestas, ofertas; gestión de postulaciones; analítica y exportación |
| Egresado | `GRADUATE` | `/egresado` | Actualización de perfil propio; respuesta a encuestas; consulta y postulación a empleos |
| Escuela | `SCHOOL` | `/escuela` | Consulta de analítica, encuestas y postulaciones (lectura en API; sin UI operativa) |
| Público anónimo | — | — | Consulta del landing y bolsa laboral pública |

---

*Documento generado el 4 de junio de 2026.*  
*Basado en el análisis exhaustivo del Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado (v1, mayo 2026) y del código fuente completo del sistema.*
