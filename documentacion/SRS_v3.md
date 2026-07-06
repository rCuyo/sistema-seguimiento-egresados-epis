---
title: "Documento de Requerimientos de Software (SRS)"
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
header-includes:
  - \usepackage{fancyhdr}
---

\newpage

# Hoja de Control

| Campo | Detalle |
|---|---|
| **Título del documento** | Documento de Requerimientos de Software (SRS) |
| **Nombre del sistema** | Sistema Web de Seguimiento e Inserción Laboral del Egresado |
| **Unidad académica** | E.P. Ingeniería de Sistemas — Universidad Nacional del Altiplano Puno |
| **Versión del documento** | 3.2 |
| **Fecha de elaboración** | Junio 2026 |
| **Estándar de referencia** | IEEE Std 830-1998 |
| **Estado** | Actualizado — bolsa laboral transformada, historial laboral editable implementado, paneles del Director y Coordinador operativos |

\newpage

# Tabla de Cambios y Correcciones (v1 → v2 → v3 → v3.1)

## Correcciones v1 → v2

| N° | Inconsistencia detectada en v1 | Corrección aplicada en v2 |
|---|---|---|
| IC-01 | Referencias a "FIMEES" y "Facultad de Ingeniería Mecánica Eléctrica, Electrónica y Sistemas" a lo largo del documento | Eliminadas en su totalidad. Se mantiene únicamente "Escuela Profesional de Ingeniería de Sistemas" o "Universidad Nacional del Altiplano Puno" según corresponda institucionalmente |
| IC-02 | Actor 3 "SCHOOL" presentado como actor operativo con descripción de funcionalidades | Verificado en código fuente: el panel de escuela (`/escuela/page.tsx`) es un stub explícito ("disponible en la Fase 2"). Movido a la sección "Funcionalidades Previstas para Versiones Futuras" y eliminado como actor principal |
| IC-03 | Afirmación "la arquitectura contempla múltiples escuelas" sin aclaración de alcance real | Aclaración explícita agregada en Sección 1.2 (Alcance), Sección 2.1 (Perspectiva del producto) y Sección 9 (Conclusiones): el sistema está implementado y configurado para la E.P. Ingeniería de Sistemas |
| IC-04 | Recomendación sobre gestión de empresas imprecisa respecto al estado real | Verificado: no existe ningún endpoint ni interfaz de gestión de empresas (Company). Solo existe `getCompaniesForSelect()` para poblar un selector. Recomendación precisada |
| IC-05 | Ausencia de sección "Limitaciones Actuales del Sistema" | Sección 8 agregada con limitaciones verificadas directamente en el código fuente |
| IC-06 | SCHOOL listado como actor en tablas de requerimientos funcionales y trazabilidad | Eliminado de RF, tablas de actores y matriz de trazabilidad como actor principal |
| IC-07 | Lenguaje con referencias técnicas de desarrollo (nombres de archivos, rutas de código) en secciones institucionales | Reescritura en estilo académico-institucional. Las referencias técnicas se conservan únicamente en secciones de arquitectura donde son pertinentes |
| IC-08 | Ausencia de referencia explícita a los tipos de exportación por conjunto de datos en los RF | RF-43 y RF-44 precisados con los cuatro conjuntos exportables verificados en el código |
| IC-09 | RF-03 y RF-05 requerían que el egresado seleccionara su escuela profesional durante el registro | Eliminado el selector de escuela del formulario. El sistema asigna automáticamente al egresado a la Escuela Profesional de Ingeniería de Sistemas |
| IC-10 | RF-33 y RF-35 incluían filtros por facultad y escuela en el módulo de gestión de egresados | Eliminados los filtros de facultad y escuela. Se conservan únicamente búsqueda por texto libre, estado laboral y año de egreso |
| IC-11 | RF-36 contemplaba filtros por facultad y escuela en el panel de analítica | Eliminados dichos filtros. Se conservan exclusivamente los filtros de año de egreso y estado laboral |
| IC-12 | RF-38 y RF-40 mostraban gráficos de "Egresados por escuela" y "Tasa de empleabilidad por escuela", sin utilidad en un sistema de escuela única | Reemplazados por RF-38 "Principales empleadores de egresados" y RF-40 "Distribución de postulaciones por estado" |
| IC-13 | RF-12 y CU-07 incluían la selección de alcance (global / por escuela) en la creación de encuestas | Eliminada dicha selección de la interfaz. Todas las encuestas se crean con alcance global por defecto |

## Cambios v2 → v3

| N° | Cambio realizado en v3 |
|---|---|
| C-01 | Incorporación del Actor 3: Director de Escuela Profesional (rol `DIRECTOR`). Actor institucional con base normativa en el Art. 21 del Reglamento. Acceso de supervisión y consulta. |
| C-02 | Incorporación del Actor 4: Coordinador de Prácticas Profesionales (rol `PRACTICE_COORDINATOR`). Actor institucional con responsabilidad operativa sobre encuestas y ofertas de prácticas. Requiere actualización normativa previa (Capítulo XIII del Reglamento). |
| C-03 | Actualización de la tabla de definiciones: se agregan los términos `DIRECTOR` y `PRACTICE_COORDINATOR`; se actualiza `SCHOOL` como valor obsoleto no asignable a nuevos usuarios. |
| C-04 | Incorporación del Módulo 9 (Panel del Director): RF-48 a RF-52. |
| C-05 | Incorporación del Módulo 10 (Panel del Coordinador): RF-53 a RF-57. |
| C-06 | Actualización de la restricción R-04 y adición de restricciones R-10 y R-11 para los nuevos roles. |
| C-07 | Actualización de RNF-04 con los cuatro roles operativos. Adición de RNF-29 y RNF-30 para el control de acceso de los nuevos actores. |
| C-08 | Adición de CU-11 (Consultar Analítica Institucional — Director) y CU-12 (Gestionar Encuestas de Prácticas — Coordinador). |
| C-09 | Adición de RN-21, RN-22 y RN-23 sobre restricciones operativas de los nuevos roles. |
| C-10 | Actualización de la Sección 8 (Limitaciones): LIM-01 actualizada; estado del panel de escuela revisado. |
| C-11 | Actualización de la Sección 9 (Funcionalidades Previstas): sección de Panel de Escuela Profesional reescrita para distinguir entre rol `SCHOOL` (obsoleto), `DIRECTOR` (infraestructura base implementada) y `PRACTICE_COORDINATOR` (infraestructura base implementada). |
| C-12 | Actualización completa de la Matriz de Trazabilidad: tabla de actores, tabla de módulos y tabla de módulos → RF. |
| C-13 | Actualización de Conclusiones y Recomendaciones con los nuevos actores. |

## Cambios v3 → v3.1

| N° | Cambio realizado en v3.1 |
|---|---|
| C-14 | Ampliación del modelo de datos de la entidad `Egresado`: adición de siete nuevos atributos opcionales para soportar los datos requeridos por la supervisora de la EPIS con fines de seguimiento y acreditación (`secondLastName`, `enrollmentCode`, `admissionPeriod`, `graduationSemester`, `firstEnrollmentPeriod`, `personalEmail`, `maritalStatus`). |
| C-15 | Actualización de RF-03 y RF-05: el formulario de registro incluye ahora los campos de apellido materno, código de matrícula, año-semestre de ingreso y semestre de egreso como campos opcionales. |
| C-16 | Actualización de RF-08: el perfil editable del egresado incluye ahora los campos de apellido materno, correo personal y estado civil. |
| C-17 | Actualización de RF-34: la ficha completa del egresado en el panel del administrador muestra los nuevos campos de identificación académica. |
| C-18 | Actualización de RF-43 (export de egresados): el Excel/CSV de egresados exporta los siete nuevos campos. |
| C-19 | Adición de RF-58 (importación masiva desde Excel) como requerimiento documentado para versiones futuras. |
| C-20 | Actualización de la descripción de la entidad Egresado en el Modelo Conceptual. |

## Cambios v3.1 → v3.2

| N° | Cambio realizado en v3.2 |
|---|---|
| C-21 | Implementación del historial de experiencia laboral editable por el egresado. Adición de RF-59. Eliminación de LIM-04 como limitación activa. |
| C-22 | Transformación del módulo de bolsa laboral: adición de tipo `PROFESSIONAL_INTERNSHIP` (prácticas profesionales), campo de modalidad de trabajo (`PRESENTIAL` / `HYBRID` / `REMOTE`), campo de enlace externo de postulación (`externalUrl`) y contador de visualizaciones (`viewCount`). Actualización de RF-22 y RF-28. |
| C-23 | Adición de RF-60 (registro de visualización de oferta) y RF-61 (registro de interacción con enlace externo de postulación). |
| C-24 | Actualización del estado de los módulos M9 (Panel del Director) y M10 (Panel del Coordinador) de "Infraestructura base" a "Implementado y operativo". Actualización de LIM-01, de las tablas de actores y de módulos, y de las Conclusiones y Recomendaciones. |
| C-25 | Actualización de RF-12: adición de validación de alternativas duplicadas en preguntas de selección única y selección múltiple. |
| C-26 | Actualización de RF-55: el Coordinador gestiona ofertas de tipo prácticas preprofesionales (`INTERNSHIP`) y prácticas profesionales (`PROFESSIONAL_INTERNSHIP`). |

\newpage

# Introducción

## Propósito

El presente documento constituye la Especificación de Requerimientos de Software (SRS) del Sistema Web de Seguimiento e Inserción Laboral del Egresado de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno, en adelante denominado la Plataforma o el Sistema.

Su propósito es describir de forma precisa, completa y verificable las funcionalidades implementadas, los requerimientos funcionales y no funcionales que rigen el sistema, y las reglas de negocio derivadas del análisis del Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado (Versión 1, mayo 2026). Este documento sirve como referencia técnica y académica para el equipo de desarrollo, la Comisión de Seguimiento al Egresado y las autoridades de la Escuela Profesional de Ingeniería de Sistemas.

## Alcance del Sistema

El Sistema es una aplicación web institucional que permite:

a) Registrar y gestionar la información académica, profesional y laboral de los egresados de la Escuela Profesional de Ingeniería de Sistemas.

b) Publicar y administrar ofertas laborales en una bolsa de trabajo institucional, accesible tanto para usuarios autenticados como para el público general.

c) Diseñar, distribuir y analizar encuestas institucionales de seguimiento al egresado, orientadas a medir empleabilidad, satisfacción y logro de competencias.

d) Generar analítica estadística e informes exportables sobre la situación laboral de los egresados, la participación en encuestas y el desempeño de la bolsa laboral.

e) Gestionar las postulaciones de los egresados a las ofertas laborales publicadas.

**Aclaración sobre el alcance de la implementación:** La arquitectura del sistema fue diseñada para soportar múltiples escuelas profesionales mediante las entidades Facultad y Escuela Profesional en la base de datos. Sin embargo, la implementación actual está configurada y operativa exclusivamente para la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno. La extensión a otras unidades académicas queda contemplada como capacidad tecnológica disponible para versiones futuras.

**Fuera del alcance del sistema en su versión actual:**

- Módulo de gestión de eventos (modelo de datos definido; sin implementación de interfaz ni servicios).
- Panel operativo para el rol de Escuela Profesional (rol definido en el sistema de autenticación; sin interfaz de usuario implementada).
- Integración con sistemas externos de la universidad (sistema académico, SUNEDU u otros).
- Gestión directa de empresas (registro, edición y verificación).
- Módulo de comunicaciones o mensajería interna.
- Edición del historial de experiencia laboral por parte del egresado.
- Carga de archivos (fotografía de perfil y curriculum vitae en PDF).

## Definiciones, Acrónimos y Abreviaturas

| Término | Definición |
|---|---|
| **ADMIN** | Rol de administrador del sistema, con acceso completo a todas las funcionalidades operativas |
| **API** | Application Programming Interface — interfaz de programación para la comunicación entre capas del sistema |
| **DIRECTOR** | Rol del Director de Escuela Profesional en el sistema. Acceso de supervisión y consulta: analítica, encuestas (solo lectura), reportes y bolsa laboral (solo lectura). Base normativa: Art. 21 del Reglamento |
| **CUID** | Collision-resistant Unique Identifier — identificador único generado automáticamente por el motor de base de datos |
| **DNI** | Documento Nacional de Identidad del Perú (8 dígitos numéricos) |
| **Egresado** | Persona que ha culminado y aprobado la totalidad de asignaturas del plan curricular de la E.P. de Ingeniería de Sistemas (Art. 8 del Reglamento) |
| **E.P. / EPIS** | Escuela Profesional de Ingeniería de Sistemas |
| **GRADUATE** | Denominación del rol de egresado en el sistema de autenticación |
| **IEEE** | Institute of Electrical and Electronics Engineers |
| **JWT** | JSON Web Token — estándar para tokens de autenticación de sesión sin estado |
| **KPI** | Key Performance Indicator — indicador clave de desempeño institucional |
| **ORM** | Object-Relational Mapping — capa de abstracción de base de datos (Prisma 5) |
| **PDF** | Portable Document Format |
| **PRACTICE_COORDINATOR** | Rol del Coordinador de Prácticas Profesionales en el sistema. Acceso operativo: gestión de encuestas, gestión de ofertas de tipo INTERNSHIP y postulaciones a prácticas. Requiere actualización normativa del Reglamento (Capítulo XIII propuesto) |
| **RBAC** | Role-Based Access Control — control de acceso basado en roles de usuario |
| **SCHOOL** | Valor legacy del sistema de autenticación. Obsoleto: no debe asignarse a nuevos usuarios. Los nuevos actores institucionales deben usar los roles `DIRECTOR` o `PRACTICE_COORDINATOR` |
| **SRS** | Software Requirements Specification — Especificación de Requerimientos de Software |
| **UNA Puno** | Universidad Nacional del Altiplano Puno |
| **XLSX** | Formato de hoja de cálculo Microsoft Excel Open XML |

**Estados laborales del egresado:**

| Código | Descripción |
|---|---|
| `EMPLOYED` | Empleado en relación de dependencia |
| `SELF_EMPLOYED` | Independiente / Emprendedor |
| `UNEMPLOYED` | Desempleado |
| `SEEKING` | En búsqueda activa de empleo |
| `STUDYING` | En estudios de posgrado u otra carrera |

**Estados de postulación laboral:**

| Código | Descripción |
|---|---|
| `PENDING` | Postulación recibida, pendiente de revisión |
| `REVIEWED` | Postulación revisada por el administrador |
| `INTERVIEW` | Candidato convocado a entrevista |
| `ACCEPTED` | Postulación aceptada |
| `REJECTED` | Postulación rechazada |

## Referencias

- Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado — E.P. Ingeniería de Sistemas, UNA Puno, Versión 1, Mayo 2026.
- Ley N° 30220 — Ley Universitaria del Perú.
- Ley N° 29733 — Ley de Protección de Datos Personales del Perú.
- Decreto Supremo N° 003-2013-JUS — Reglamento de la Ley N° 29733.
- Estatuto de la Universidad Nacional del Altiplano Puno.
- IEEE Std 830-1998 — IEEE Recommended Practice for Software Requirements Specifications.

## Visión General del Documento

El documento se organiza en diez secciones principales:

- **Sección 1 (Introducción):** Propósito, alcance, definiciones y referencias.
- **Sección 2 (Descripción General):** Perspectiva del producto, objetivos, beneficios, usuarios y restricciones.
- **Sección 3 (Requerimientos Funcionales):** Catálogo completo de requerimientos por módulo.
- **Sección 4 (Requerimientos No Funcionales):** Atributos de calidad del sistema.
- **Sección 5 (Casos de Uso):** Flujos de interacción de los escenarios principales.
- **Sección 6 (Reglas de Negocio):** Normas derivadas del reglamento institucional y la lógica del sistema.
- **Sección 7 (Modelo Conceptual):** Entidades del dominio y sus relaciones.
- **Sección 8 (Limitaciones Actuales del Sistema):** Funcionalidades no implementadas en la versión actual.
- **Sección 9 (Funcionalidades Previstas para Versiones Futuras):** Módulos y roles planificados.
- **Sección 10 (Matriz de Trazabilidad):** Relación entre objetivos, módulos y requerimientos.
- **Sección 11 (Conclusiones):** Síntesis del análisis realizado.
- **Sección 12 (Recomendaciones):** Sugerencias para la evolución del sistema.

\newpage

# Descripción General

## Perspectiva del Producto

El Sistema Web de Seguimiento e Inserción Laboral del Egresado es una aplicación web institucional desarrollada para la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno. Funciona de manera autónoma, sin dependencia de sistemas externos, y es accesible exclusivamente a través de un navegador web.

La Plataforma centraliza tres funciones institucionales que el Reglamento establece como obligatorias: el registro y seguimiento del egresado, la distribución y análisis de encuestas de inserción laboral, y la gestión de una bolsa de trabajo institucional. Su implementación da cumplimiento al Artículo 20 del Reglamento, que dispone la existencia de esta herramienta tecnológica como mecanismo central de seguimiento.

La base de datos del sistema modela la estructura académica completa (Facultad → Escuela Profesional → Egresado), dotando a la plataforma de capacidad técnica para extenderse a otras unidades académicas. No obstante, en su versión actual la Plataforma se encuentra configurada y operativa exclusivamente para la Escuela Profesional de Ingeniería de Sistemas.

## Objetivos del Sistema

Los siguientes objetivos están directamente sustentados en los Artículos 4 y 5 del Reglamento:

1. **Mantener actualizada** la información académica, profesional y laboral de los egresados de la Escuela Profesional de Ingeniería de Sistemas (Art. 5, inciso a; Art. 11, inciso a).
2. **Obtener información estadística** sobre la empleabilidad y el desempeño profesional de los egresados mediante analítica de datos y encuestas institucionales (Art. 5, inciso b; Art. 18, inciso k).
3. **Fortalecer los mecanismos de comunicación** entre la Escuela Profesional y sus egresados, a través de la publicación de encuestas y ofertas laborales (Art. 5, inciso c).
4. **Promover la inserción laboral** de los egresados mediante el servicio de bolsa de trabajo institucional (Art. 5, inciso d; Art. 19).
5. **Implementar herramientas tecnológicas** que faciliten el monitoreo y seguimiento sistemático de los egresados (Art. 5, inciso e; Art. 20).

## Beneficios Esperados

- **Para la Escuela Profesional:** Información actualizada y centralizada sobre la situación laboral de sus egresados, indispensable para los procesos de acreditación, actualización curricular y toma de decisiones académicas.
- **Para la Comisión de Seguimiento al Egresado:** Reducción del esfuerzo manual en la recopilación de datos; informes exportables en formatos estándar (XLSX, CSV, PDF) listos para presentar ante las autoridades académicas (Art. 7, inciso g del Reglamento).
- **Para los egresados:** Acceso inmediato a ofertas laborales de la bolsa institucional, participación simplificada en encuestas de seguimiento y posibilidad de mantener actualizado su perfil profesional.
- **Para los empleadores:** Visibilidad de sus ofertas ante una comunidad calificada de profesionales en tecnología vinculados a la Escuela Profesional.

## Usuarios del Sistema

### Actor 1: Administrador

**Descripción:** Representa a la Comisión de Seguimiento al Egresado de la Escuela Profesional de Ingeniería de Sistemas (Art. 6 del Reglamento). Cuenta con acceso completo a todas las funcionalidades operativas del sistema.

**Responsabilidades en el sistema:**

- Gestionar el registro y la información de los egresados.
- Crear, editar, publicar y eliminar encuestas institucionales.
- Administrar la bolsa laboral: crear, editar, activar o desactivar ofertas de trabajo.
- Gestionar el estado de las postulaciones de los egresados.
- Consultar y exportar analítica estadística e informes institucionales.

**Credenciales del entorno de prueba:** `admin@unap.edu.pe` / `admin123`

### Actor 2: Egresado

**Descripción:** Egresado, graduado o titulado de la Escuela Profesional de Ingeniería de Sistemas registrado en la Plataforma (Arts. 8, 9, 10 del Reglamento).

**Responsabilidades en el sistema:**

- Actualizar su información personal y situación laboral.
- Responder las encuestas institucionales activas.
- Consultar las ofertas laborales disponibles y postularse a ellas.
- Hacer seguimiento al estado de sus postulaciones.

**Credenciales del entorno de prueba:** `juan.mamani@gmail.com` / `password123`

### Actor 3: Director de Escuela Profesional

**Descripción:** Director de la Escuela Profesional de Ingeniería de Sistemas con competencia supervisora sobre los procesos de seguimiento al egresado, en cumplimiento del Artículo 21 del Reglamento. Recibe los informes de la Comisión de Seguimiento y es el responsable institucional de validar los resultados estadísticos.

**Responsabilidades en el sistema:**

- Consultar el panel de analítica estadística con indicadores de empleabilidad y seguimiento.
- Visualizar el listado de encuestas institucionales y sus resultados agregados.
- Exportar informes estadísticos en formatos XLSX, CSV y PDF para presentación institucional.
- Consultar el listado de postulaciones como indicador de actividad de la bolsa laboral.

**Acceso:** Solo lectura y exportación. No puede crear, editar ni eliminar datos del sistema.

**Base normativa:** Art. 21 del Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado.

**Credenciales del entorno de prueba:** `director@epis.edu.pe` / `director123`

### Actor 4: Coordinador de Prácticas Profesionales

**Descripción:** Responsable institucional de la gestión operativa de las prácticas preprofesionales de la Escuela Profesional de Ingeniería de Sistemas. Interactúa con la plataforma para administrar encuestas de prácticas y ofertas laborales de tipo prácticas preprofesionales.

**Responsabilidades en el sistema:**

- Crear, editar, activar y desactivar encuestas institucionales orientadas al seguimiento de prácticas preprofesionales.
- Gestionar ofertas laborales de tipo prácticas preprofesionales (INTERNSHIP) en la bolsa laboral.
- Consultar y actualizar el estado de postulaciones a ofertas de prácticas preprofesionales.
- Consultar el panel de analítica estadística como referencia del desempeño de los egresados.

**Restricción:** No puede crear ni eliminar cuentas de usuario, acceder al directorio de egresados ni eliminar encuestas.

**Base normativa:** Capítulo XIII propuesto del Reglamento. Requiere actualización normativa previa a la implementación completa.

**Credenciales del entorno de prueba:** `coordinador@epis.edu.pe` / `coordinador123`

### Actor 5: Público Anónimo

**Descripción:** Visitante no autenticado que accede al portal institucional público.

**Accesos habilitados:** Página de inicio institucional y listado público de ofertas laborales activas.

## Restricciones del Sistema

| Código | Restricción | Fuente |
|---|---|---|
| R-01 | Todas las operaciones sobre información sensible requieren autenticación mediante sesión activa | Seguridad / Art. 20 del Reglamento |
| R-02 | El acceso a los módulos administrativos está restringido exclusivamente al Administrador | Control de acceso por rol |
| R-03 | El registro en la Plataforma está orientado a egresados de la Escuela Profesional de Ingeniería de Sistemas | Art. 3 del Reglamento |
| R-04 | La información personal de los egresados tiene carácter confidencial y se utiliza únicamente para fines institucionales | Art. 20 del Reglamento / Ley N° 29733 |
| R-05 | El sistema requiere conexión a internet y un navegador web moderno | Naturaleza de la plataforma |
| R-06 | Un egresado solo puede responder cada encuesta una única vez | Regla de negocio / restricción de base de datos |
| R-07 | Un egresado no puede postularse más de una vez a la misma oferta laboral | Regla de negocio / restricción de base de datos |
| R-08 | Solo el Administrador puede crear y eliminar ofertas laborales | Regla de negocio |
| R-09 | Las variables de entorno `DATABASE_URL`, `NEXTAUTH_SECRET` y `NEXTAUTH_URL` son requisitos obligatorios para la operación del sistema | Configuración técnica |
| R-10 | El acceso al panel del Director de Escuela Profesional está restringido exclusivamente a usuarios con rol `DIRECTOR`. El Director no puede realizar operaciones de escritura sobre ningún dato del sistema. | Art. 21 del Reglamento / Control de acceso por rol |
| R-11 | El acceso al panel del Coordinador de Prácticas Profesionales está restringido exclusivamente a usuarios con rol `PRACTICE_COORDINATOR`. El Coordinador opera únicamente sobre encuestas y ofertas de tipo prácticas preprofesionales. | Lógica institucional / Control de acceso por rol |

\newpage

# Requerimientos Funcionales

## Módulo 1: Autenticación y Registro

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-01 | Iniciar sesión | El sistema permite al usuario autenticarse mediante correo electrónico y contraseña. Verifica la existencia del usuario, que la cuenta esté activa y que la contraseña sea correcta. Genera una sesión con token JWT que incluye el identificador, el rol y el identificador de perfil del egresado. | Administrador, Egresado | Alta |
| RF-02 | Cerrar sesión | El sistema permite al usuario finalizar su sesión activa y lo redirige a la página de inicio. | Administrador, Egresado | Alta |
| RF-03 | Registrar egresado | El sistema permite que un nuevo egresado se registre proporcionando: nombres, apellido paterno, DNI (8 dígitos), correo electrónico, contraseña y año de egreso. Adicionalmente acepta como campos opcionales: apellido materno, código de matrícula, año-semestre de ingreso y semestre de egreso. El sistema verifica la unicidad del correo y del DNI. La contraseña se almacena con cifrado irreversible. El sistema asigna automáticamente al egresado a la Escuela Profesional de Ingeniería de Sistemas. El registro del usuario y el perfil de egresado se crean de forma atómica en una única operación. | Público | Alta |
| RF-04 | Redirección automática por rol | Tras iniciar sesión, el sistema redirige al usuario al panel correspondiente según su rol. Un usuario que acceda a una sección de otro rol es redirigido automáticamente a su propio panel. | Administrador, Egresado | Alta |
| RF-05 | Registro desde el portal público | El sistema permite el registro de nuevos egresados desde un formulario modal en la página pública, sin necesidad de navegar a una página separada. El flujo es equivalente al RF-03: la escuela se asigna automáticamente. | Público | Media |
| RF-06 | Consultar escuelas profesionales | El sistema expone un servicio interno (`GET /api/public/schools`) que retorna la lista de escuelas profesionales. En la versión actual este endpoint se mantiene como capacidad arquitectónica disponible; el formulario de registro no lo utiliza, ya que la escuela se asigna automáticamente. | Interno | Baja |

## Módulo 2: Gestión del Perfil del Egresado

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-07 | Consultar perfil propio | El egresado puede consultar su información completa de perfil: datos personales, situación laboral actual, correo institucional y su adscripción fija a la Escuela Profesional de Ingeniería de Sistemas — UNA Puno. | Egresado | Alta |
| RF-08 | Actualizar perfil | El egresado puede modificar su información personal y laboral: nombres, apellido paterno, apellido materno, teléfono, correo personal, estado civil, descripción personal (máximo 500 caracteres), estado laboral, cargo actual, empresa actual, ciudad, país y perfil de LinkedIn. El sistema valida los datos antes de persistirlos. | Egresado | Alta |
| RF-09 | Actualizar estado laboral | Como parte de la actualización de perfil, el egresado selecciona su situación laboral entre cinco opciones: empleado en relación de dependencia, independiente/emprendedor, desempleado, en búsqueda de empleo y en estudios. | Egresado | Alta |
| RF-10 | Panel de inicio del egresado | El sistema presenta al egresado un panel de inicio con: indicadores de resumen (total de postulaciones realizadas, encuestas respondidas, empleos activos disponibles y encuestas pendientes), listado de encuestas pendientes de responder, tres ofertas laborales recientes y un historial de actividad (últimas postulaciones y encuestas completadas). | Egresado | Alta |

## Módulo 3: Encuestas Institucionales

### Sub-módulo 3A: Administración de Encuestas

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-11 | Listar encuestas | El Administrador visualiza el listado completo de encuestas con sus metadatos: título, estado, tipo, número de preguntas, número de respuestas, fecha de creación y fecha de cierre. | Administrador | Alta |
| RF-12 | Crear encuesta | El Administrador crea una nueva encuesta definiendo: título, descripción, fecha de cierre opcional y al menos una pregunta. Todas las encuestas se crean con alcance global, disponibles para todos los egresados de la Escuela Profesional. La creación de la encuesta y sus preguntas se realiza en una operación atómica. El sistema verifica que las alternativas de preguntas de selección única y selección múltiple no contengan opciones duplicadas (normalización de mayúsculas y espacios), rechazando el guardado e indicando la pregunta afectada cuando se detectan duplicados. | Administrador | Alta |
| RF-13 | Editar encuesta | El Administrador puede modificar todos los atributos de una encuesta existente, incluidas sus preguntas. La actualización de preguntas opera mediante sustitución completa dentro de una operación atómica. Se aplica la misma validación de alternativas duplicadas descrita en RF-12. | Administrador | Alta |
| RF-14 | Eliminar encuesta | El Administrador puede eliminar permanentemente una encuesta, eliminando en cascada todas las preguntas, respuestas y datos asociados. | Administrador | Media |
| RF-15 | Activar o desactivar encuesta | El Administrador puede alternar el estado activo o inactivo de una encuesta sin necesidad de editarla en su totalidad. | Administrador | Alta |
| RF-16 | Ver resultados de encuesta | El Administrador accede a un panel de resultados por encuesta que muestra, para cada pregunta, la distribución de respuestas recibidas, el total de participaciones y la tasa de participación respecto al total de egresados registrados. | Administrador | Alta |
| RF-17 | Tipos de pregunta | El sistema soporta seis tipos de pregunta para las encuestas: texto libre corto, texto libre largo, selección única, selección múltiple, escala de valoración numérica y sí/no. | Administrador | Alta |

### Sub-módulo 3B: Participación del Egresado

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-18 | Consultar encuestas disponibles | El egresado visualiza dos secciones: encuestas activas pendientes de responder (vigentes y no vencidas) y encuestas ya completadas con su fecha de finalización. | Egresado | Alta |
| RF-19 | Responder encuesta | El egresado completa y envía una encuesta activa. El sistema verifica previamente que la encuesta esté activa, no haya vencido y el egresado no la haya respondido antes. Las respuestas se registran en una operación atómica. | Egresado | Alta |
| RF-20 | Control de respuesta única | El sistema impide que un egresado responda una misma encuesta más de una vez. El intento de una segunda respuesta resulta en un error de conflicto. Esta restricción opera tanto a nivel de la lógica de la aplicación como en la base de datos. | Egresado | Alta |

## Módulo 4: Bolsa Laboral

### Sub-módulo 4A: Administración de la Bolsa Laboral

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-21 | Listar ofertas laborales | El Administrador visualiza todas las ofertas del sistema con opciones de filtrado por texto, empresa y estado, con paginación. Se presentan indicadores globales: total de ofertas, ofertas activas, total de postulaciones y cantidad de empresas registradas. | Administrador | Alta |
| RF-22 | Crear oferta laboral | El Administrador crea una nueva oferta definiendo: empresa, título, descripción, requisitos, ubicación, tipo de oportunidad (empleo tiempo completo, empleo medio tiempo, contrato por proyecto, prácticas preprofesionales o prácticas profesionales), modalidad de trabajo (presencial, semipresencial o remota), rango salarial como texto libre, enlace externo de postulación (URL al sitio del empleador), estado de publicación y fecha de expiración. | Administrador | Alta |
| RF-23 | Editar oferta laboral | El Administrador puede modificar cualquier atributo de una oferta laboral existente. | Administrador | Alta |
| RF-24 | Eliminar oferta laboral | El Administrador puede eliminar permanentemente una oferta laboral del sistema. | Administrador | Media |
| RF-25 | Activar o desactivar oferta | El Administrador puede alternar el estado de publicación de una oferta sin necesidad de editarla en su totalidad. | Administrador | Alta |

### Sub-módulo 4B: Bolsa Laboral Pública y del Egresado

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-26 | Consultar bolsa laboral pública | Cualquier visitante puede consultar las ofertas laborales activas y vigentes, con opciones de filtrado por texto de búsqueda, modalidad de contratación y trabajo remoto. | Público | Alta |
| RF-27 | Ver detalle de oferta laboral | Cualquier visitante puede consultar el detalle completo de una oferta activa, incluyendo la información de la empresa empleadora. | Público, Egresado | Alta |
| RF-28 | Postularse a una oferta | El egresado puede postularse a una oferta activa y vigente de dos formas según la configuración de la oferta: (a) si la oferta tiene enlace externo, el sistema redirige al egresado al sitio del empleador y registra la interacción como un clic; (b) si la oferta no tiene enlace externo, el egresado envía el formulario interno adjuntando opcionalmente una carta de presentación de hasta 2000 caracteres. En ambos casos el sistema verifica que la oferta esté disponible. El formulario interno aplica adicionalmente la restricción de postulación única. | Egresado | Alta |
| RF-29 | Control de postulación única | El sistema impide que un egresado se postule más de una vez a la misma oferta. El intento de una segunda postulación resulta en un error de conflicto. Esta restricción opera tanto en la lógica de la aplicación como en la base de datos. | Egresado | Alta |
| RF-30 | Consultar postulaciones propias | El egresado puede visualizar el listado completo de sus postulaciones, con el título de la oferta, nombre de la empresa, estado actual de la postulación y fecha de envío. | Egresado | Alta |

## Módulo 5: Gestión de Postulaciones

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-31 | Listar postulaciones | El Administrador visualiza todas las postulaciones recibidas con opciones de filtrado por estado y por oferta laboral, con paginación. Para cada postulación se muestra: datos del egresado, oferta y empresa a la que postuló, estado actual y fecha de envío. | Administrador | Alta |
| RF-32 | Actualizar estado de postulación | El Administrador puede actualizar el estado de cualquier postulación a uno de los cinco estados del ciclo definido: pendiente, en revisión, entrevista, aceptada o rechazada. | Administrador | Alta |

## Módulo 6: Gestión de Egresados

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-33 | Listar egresados | El Administrador accede al directorio de egresados registrados con búsqueda por texto libre (nombre, apellido, DNI o correo electrónico), y filtros por estado laboral y año de egreso. La vista incluye indicadores estadísticos: total de egresados, empleados, en búsqueda de empleo y registrados en el mes en curso. | Administrador | Alta |
| RF-34 | Ver ficha completa del egresado | El Administrador accede al perfil detallado de un egresado, que incluye: información personal y de contacto, datos académicos, estado de la cuenta, historial de experiencias laborales, últimas diez postulaciones con su estado y últimas cinco respuestas a encuestas. | Administrador | Alta |
| RF-35 | Filtros del directorio de egresados | El directorio de egresados soporta filtros por estado laboral (empleado, independiente, desempleado, buscando empleo, estudiando) y por año de egreso. | Administrador | Media |

## Módulo 7: Analítica y Reportes

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-36 | Panel de analítica institucional | El Administrador accede a un panel con indicadores clave de desempeño: total de egresados, tasa de empleabilidad, egresados empleados e independientes, respuestas a encuestas, encuestas activas, empleos activos, total de postulaciones, empresas registradas y nuevos registros del mes. Soporta filtros por año de egreso y estado laboral. | Administrador | Alta |
| RF-37 | Distribución de estado laboral | El sistema genera una visualización de la distribución de egresados según su situación laboral, aplicando los filtros activos. | Administrador | Alta |
| RF-38 | Principales empleadores de egresados | El sistema genera una visualización de las principales empresas donde trabajan actualmente los egresados registrados, mostrando las diez empresas con mayor número de egresados empleados. | Administrador | Alta |
| RF-39 | Tendencia de egresos por año | El sistema genera una visualización de la evolución histórica de egresos por año académico. | Administrador | Alta |
| RF-40 | Distribución de postulaciones por estado | El sistema genera una visualización de la distribución de postulaciones laborales según su estado en el ciclo de selección (pendiente, revisada, entrevista, aceptada, rechazada). | Administrador | Alta |
| RF-41 | Distribución de empresas por sector | El sistema genera una visualización de la distribución de empresas registradas según su sector económico. | Administrador | Media |
| RF-42 | Participación en encuestas | El sistema presenta las ocho encuestas más recientes con el número de respuestas recibidas y la tasa de participación respecto al total de egresados. | Administrador | Media |
| RF-43 | Exportar datos en formato Excel | El Administrador puede exportar cuatro conjuntos de datos en formato de hoja de cálculo (.xlsx): (1) directorio de egresados, (2) postulaciones, (3) respuestas a encuestas y (4) ofertas laborales. Los encabezados de columna están en español con etiquetas institucionales. | Administrador | Alta |
| RF-44 | Exportar datos en formato CSV | El Administrador puede exportar los mismos cuatro conjuntos de datos en formato CSV, con codificación UTF-8 compatible con herramientas de oficina en español. | Administrador | Media |
| RF-45 | Generar reporte institucional en PDF | El sistema genera y descarga un reporte institucional en PDF que incluye: identificación de la Escuela Profesional y la Universidad, indicadores clave, tabla de egresados por escuela profesional, distribución de estado laboral y evolución de egresos por año. El reporte registra automáticamente la fecha de generación y soporta los mismos filtros del panel de analítica. | Administrador | Alta |

## Módulo 8: Portal Público

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-46 | Página de inicio institucional | El sistema presenta una página pública con secciones informativas sobre la Escuela Profesional, sus beneficios, estadísticas generales y una llamada a la acción para el registro de egresados. | Público | Media |
| RF-47 | Bolsa laboral pública | El sistema presenta la bolsa laboral a visitantes no autenticados, con listado paginado de ofertas activas y opciones de filtrado y búsqueda. | Público | Alta |

## Módulo 9: Panel del Director de Escuela Profesional

*Estado: Implementado y operativo.*

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-48 | Acceso autenticado al panel del Director | El sistema autentica al Director de Escuela Profesional y lo redirige a su panel exclusivo (`/director`). El token JWT incluye el rol `DIRECTOR`. El middleware protege la ruta de acceso por usuarios de otros roles. | Director | Alta |
| RF-49 | Consultar analítica estadística institucional | El Director puede visualizar el panel de analítica con indicadores clave: total de egresados, tasa de empleabilidad, distribución de estado laboral, tendencia de egresos por año, participación en encuestas y actividad de la bolsa laboral. El acceso es de solo lectura. | Director | Alta |
| RF-50 | Exportar informes estadísticos | El Director puede exportar los datos estadísticos del sistema en formato de hoja de cálculo (XLSX), CSV y reporte institucional PDF. La exportación está disponible para los cuatro conjuntos de datos: egresados, postulaciones, encuestas y ofertas laborales. | Director | Alta |
| RF-51 | Consultar encuestas institucionales y resultados | El Director puede visualizar el listado de encuestas institucionales (activas e inactivas) y acceder a los resultados agregados de respuestas por encuesta, incluyendo tasas de participación y distribución de respuestas por pregunta. El acceso es de solo lectura. | Director | Alta |
| RF-52 | Consultar bolsa laboral y postulaciones | El Director puede visualizar el listado de ofertas laborales activas e inactivas y el listado de postulaciones como indicador del nivel de actividad y participación de los egresados. El acceso es de solo lectura. | Director | Media |

## Módulo 10: Panel del Coordinador de Prácticas Profesionales

*Estado: Implementado y operativo. La formalización del Coordinador como actor explícito en el Reglamento es una acción institucional pendiente (Capítulo XIII propuesto).*

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-53 | Acceso autenticado al panel del Coordinador | El sistema autentica al Coordinador de Prácticas y lo redirige a su panel exclusivo (`/coordinador`). El token JWT incluye el rol `PRACTICE_COORDINATOR`. El middleware protege la ruta de acceso por usuarios de otros roles. | Coordinador | Alta |
| RF-54 | Gestionar encuestas de prácticas profesionales | El Coordinador puede crear, editar, activar y desactivar encuestas institucionales orientadas al seguimiento de prácticas preprofesionales. No puede eliminar encuestas. La creación de encuestas se realiza con alcance global hacia todos los egresados de la Escuela Profesional. | Coordinador | Alta |
| RF-55 | Gestionar ofertas de prácticas | El Coordinador puede crear, editar y activar/desactivar ofertas laborales de tipo prácticas preprofesionales (`INTERNSHIP`) y prácticas profesionales (`PROFESSIONAL_INTERNSHIP`) en la bolsa laboral institucional. | Coordinador | Alta |
| RF-56 | Gestionar postulaciones a prácticas | El Coordinador puede visualizar el listado de postulaciones a la bolsa laboral y actualizar el estado de las postulaciones a lo largo del ciclo de selección. | Coordinador | Alta |
| RF-57 | Consultar analítica estadística | El Coordinador puede consultar el panel de analítica estadística como referencia para el seguimiento del desempeño de los egresados en el mercado laboral. Incluye una sección de interacción con ofertas: visualizaciones totales, clics en enlace externo y tasa de interacción (clics / visualizaciones). | Coordinador | Media |

## Módulo 2 (extensión): Historial de Experiencia Laboral

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-59 | Gestionar historial de experiencia laboral | El egresado puede agregar, editar y eliminar entradas de su historial de experiencia laboral desde su página de perfil. Cada entrada incluye: empresa, cargo, fecha de inicio, fecha de fin (opcional), descripción (opcional) e indicador de empleo actual (`isCurrent`). Al marcar una entrada como empleo actual, las demás entradas son actualizadas automáticamente para reflejar su finalización. | Egresado | Alta |

## Módulo 4 (extensión): Seguimiento de Interacciones en Bolsa Laboral

| Código | Nombre | Descripción | Actor | Prioridad |
|---|---|---|---|---|
| RF-60 | Registrar visualización de oferta | El sistema registra automáticamente una visualización cada vez que cualquier usuario (autenticado o público) abre la página de detalle de una oferta laboral. El contador (`viewCount`) se incrementa de forma atómica. El registro opera de forma silenciosa sin afectar la experiencia del usuario. | Público, Egresado | Media |
| RF-61 | Registrar interacción con enlace externo | El sistema registra un clic cuando el usuario activa el enlace externo de postulación de una oferta. El registro incluye el identificador de la oferta y, cuando corresponde, el identificador del usuario autenticado. Opera de forma asíncrona sin bloquear la navegación al enlace externo. | Público, Egresado | Media |

\newpage

# Requerimientos No Funcionales

## Seguridad

| Código | Descripción |
|---|---|
| RNF-01 | Las contraseñas de los usuarios se almacenan únicamente mediante función de hash irreversible (bcrypt, factor de costo 10). No se almacena ni transmite ninguna contraseña en texto plano. |
| RNF-02 | La autenticación de sesión se implementa mediante tokens JWT firmados con una clave secreta institucional. Los tokens no se persisten en la base de datos. |
| RNF-03 | Todas las operaciones sobre datos sensibles verifican la existencia y validez de la sesión activa. Las solicitudes sin sesión reciben respuesta de acceso no autorizado (HTTP 401); las solicitudes de un rol insuficiente reciben respuesta de acceso denegado (HTTP 403). |
| RNF-04 | El control de acceso basado en roles (RBAC) se aplica en dos niveles complementarios: el enrutamiento de navegación (protección de páginas) y cada servicio de la API de forma independiente. El sistema cuenta con cuatro roles operativos activos: `ADMIN`, `GRADUATE`, `DIRECTOR` y `PRACTICE_COORDINATOR`. El valor `SCHOOL` permanece en el modelo de datos como valor legacy pero no debe asignarse a nuevos usuarios. |
| RNF-05 | La información personal de los egresados es de acceso restringido. Solo el Administrador puede consultar datos de egresados distintos al propio. El egresado solo puede acceder y modificar su propia información. |
| RNF-06 | Toda entrada de datos de usuario es validada mediante esquemas de validación declarativos en el servidor, antes de ser procesada o persistida. |

## Rendimiento

| Código | Descripción |
|---|---|
| RNF-07 | Las consultas de analítica ejecutan múltiples operaciones de base de datos en paralelo, minimizando la latencia de respuesta del panel de reportes. |
| RNF-08 | Los listados de datos están paginados con límites por página definidos (12 egresados, 15 ofertas laborales, 20 postulaciones) para evitar consultas masivas a la base de datos. |
| RNF-09 | Los campos de mayor frecuencia de consulta en la base de datos cuentan con índices definidos: estado laboral, escuela profesional y año de egreso en la tabla de egresados; estado de publicación en la tabla de ofertas. |

## Disponibilidad

| Código | Descripción |
|---|---|
| RNF-10 | El sistema debe estar disponible de forma continua durante el horario laboral institucional. La Escuela Profesional es responsable de coordinar con los servicios tecnológicos de la Universidad el mantenimiento, la seguridad informática y la disponibilidad de la plataforma, conforme al Art. 20 del Reglamento. |
| RNF-11 | La interfaz presenta estados de carga en todas las páginas del panel de gestión, de modo que el sistema es utilizable mientras se obtienen los datos del servidor. |

## Usabilidad

| Código | Descripción |
|---|---|
| RNF-12 | Toda la interfaz de usuario está en español, incluyendo etiquetas, mensajes de validación, confirmaciones y notificaciones, garantizando accesibilidad a la comunidad universitaria peruana. |
| RNF-13 | El sistema comunica el resultado de las operaciones al usuario mediante notificaciones no intrusivas que no interrumpen el flujo de navegación. |
| RNF-14 | El diseño de la interfaz es adaptable a distintos tamaños de pantalla (escritorio y dispositivos móviles). |
| RNF-15 | Los formularios del sistema ofrecen retroalimentación de validación en tiempo real antes de que el usuario envíe los datos. |

## Escalabilidad

| Código | Descripción |
|---|---|
| RNF-16 | El modelo de datos soporta la gestión de múltiples facultades y escuelas profesionales, permitiendo la extensión del sistema a otras unidades académicas sin modificaciones estructurales en la base de datos. |
| RNF-17 | La capa de servicios de acceso a datos está completamente desacoplada de la capa de presentación, facilitando su evolución y mantenimiento independientes. |

## Compatibilidad

| Código | Descripción |
|---|---|
| RNF-18 | El sistema es compatible con los navegadores web de uso generalizado en su versión actual: Google Chrome, Mozilla Firefox, Microsoft Edge y Safari. |
| RNF-19 | Los archivos exportados en formato de hoja de cálculo son compatibles con Microsoft Excel y otras aplicaciones de oficina equivalentes. Los archivos CSV se generan con codificación UTF-8 con marca de orden de bytes para visualización correcta de caracteres del español. |
| RNF-20 | Los reportes en formato PDF son compatibles con los lectores PDF de uso generalizado. |

## Mantenibilidad

| Código | Descripción |
|---|---|
| RNF-21 | El sistema sigue una arquitectura en capas con separación estricta de responsabilidades: interfaz de usuario, rutas de API, capa de servicios y motor de base de datos. |
| RNF-22 | Los esquemas de validación y los diccionarios de etiquetas institucionales están centralizados para garantizar coherencia en todos los módulos del sistema. |
| RNF-23 | Los cambios en la estructura de la base de datos se gestionan mediante migraciones controladas y versionadas, garantizando trazabilidad de la evolución del esquema. |
| RNF-24 | El sistema utiliza tipado estático en toda la base de código, reduciendo la posibilidad de errores de integración entre capas. |

## Protección de Datos Personales

| Código | Descripción |
|---|---|
| RNF-25 | El tratamiento de datos personales de los egresados cumple con la Ley N° 29733 (Ley de Protección de Datos Personales del Perú) y el Decreto Supremo N° 003-2013-JUS, conforme a los Arts. 2 y 20 del Reglamento. |
| RNF-26 | El acceso a datos personales de egresados está restringido a los miembros autorizados de la Comisión de Seguimiento (Administrador) y al propio egresado respecto de su información. |
| RNF-27 | El sistema garantiza que un egresado autenticado solo pueda modificar su propio perfil, verificando en el servidor la correspondencia entre el identificador de sesión y el registro a modificar. |
| RNF-28 | Los egresados tienen derecho a solicitar la rectificación, actualización o cancelación de sus datos personales registrados en la Plataforma, conforme al Art. 12, inciso h del Reglamento y la Ley N° 29733. |
| RNF-29 | El Director de Escuela Profesional tiene acceso exclusivo de lectura y exportación de datos estadísticos. El sistema no permite al rol `DIRECTOR` realizar ninguna operación de escritura, modificación o eliminación sobre ninguna entidad del sistema. |
| RNF-30 | El Coordinador de Prácticas Profesionales tiene acceso operativo restringido: puede gestionar encuestas y ofertas de tipo prácticas preprofesionales, pero no puede acceder al directorio de egresados ni eliminar encuestas. El sistema verifica el rol en cada operación de API antes de ejecutarla. |

\newpage

# Casos de Uso

## CU-01: Iniciar Sesión

**Actor principal:** Administrador, Egresado  
**Descripción:** El usuario accede al sistema mediante sus credenciales institucionales.  
**Precondiciones:** El usuario tiene una cuenta registrada y activa en el sistema.

**Flujo principal:**

1. El usuario accede a la página de inicio de sesión.
2. Ingresa su correo electrónico y contraseña.
3. El sistema valida el formato de los datos ingresados.
4. El sistema verifica la existencia del usuario y el estado activo de la cuenta.
5. El sistema compara la contraseña ingresada con el hash almacenado.
6. Si las credenciales son correctas, el sistema crea una sesión con los datos del usuario (identificador, rol y perfil de egresado).
7. El sistema redirige al usuario al panel correspondiente según su rol.

**Postcondiciones:** El usuario tiene una sesión activa y accede a las funcionalidades de su rol.

**Flujos alternativos:**

- *5a.* Si el usuario no existe, la cuenta está inactiva o la contraseña es incorrecta, el sistema informa el error y permanece en la página de inicio de sesión.

---

## CU-02: Registrar Egresado

**Actor principal:** Público (nuevo egresado)  
**Descripción:** Un nuevo egresado crea su cuenta en la Plataforma.  
**Precondiciones:** El egresado no tiene cuenta registrada previamente.

**Flujo principal:**

1. El usuario accede al formulario de registro (página dedicada o modal en el portal público).
2. El usuario completa el formulario: nombre, apellido, DNI, correo electrónico, contraseña y año de egreso.
3. El sistema valida todos los campos.
4. El sistema verifica que el correo electrónico no esté registrado previamente.
5. El sistema verifica que el DNI no esté registrado previamente.
6. El sistema asigna automáticamente al egresado a la Escuela Profesional de Ingeniería de Sistemas.
7. El sistema crea el usuario y el perfil de egresado en una operación atómica.
8. El sistema redirige al usuario a la página de inicio de sesión confirmando el registro exitoso.

**Postcondiciones:** El egresado tiene una cuenta activa, adscrita a la Escuela Profesional de Ingeniería de Sistemas, y puede iniciar sesión.

**Flujos alternativos:**

- *3a.* Si algún campo no cumple los criterios de validación, el sistema muestra el primer mensaje de error correspondiente.
- *4a.* Si el correo ya está registrado, el sistema informa que ya existe una cuenta asociada.
- *5a.* Si el DNI ya está registrado, el sistema informa que ya existe un egresado con ese documento.
- *6a.* Si la Escuela Profesional no está configurada en la base de datos, el sistema informa un error de configuración.

---

## CU-03: Actualizar Perfil del Egresado

**Actor principal:** Egresado  
**Descripción:** El egresado actualiza su información personal y laboral.  
**Precondiciones:** El egresado tiene sesión activa.

**Flujo principal:**

1. El egresado accede a la sección de perfil.
2. El sistema carga la información actual del perfil.
3. El egresado modifica los campos que desea actualizar.
4. El egresado envía el formulario de actualización.
5. El sistema valida los datos recibidos.
6. El sistema verifica que el perfil a modificar pertenece al usuario de la sesión activa.
7. El sistema persiste los cambios y confirma la actualización.

**Postcondiciones:** El perfil del egresado queda actualizado en la base de datos.

**Flujos alternativos:**

- *6a.* Si el perfil no pertenece al usuario autenticado, el sistema rechaza la operación con acceso denegado.

---

## CU-04: Responder Encuesta

**Actor principal:** Egresado  
**Descripción:** El egresado completa una encuesta institucional activa.  
**Precondiciones:** El egresado tiene sesión activa; la encuesta está activa, vigente y no ha sido respondida previamente por este egresado.

**Flujo principal:**

1. El egresado accede a la sección de encuestas.
2. El sistema muestra las encuestas pendientes de responder.
3. El egresado selecciona una encuesta y visualiza sus preguntas.
4. El egresado responde cada pregunta según su tipo.
5. El egresado envía el formulario completado.
6. El sistema verifica que la encuesta no haya sido respondida previamente por el egresado.
7. El sistema registra la respuesta y todas las respuestas individuales en una operación atómica.
8. La encuesta pasa al listado de encuestas completadas del egresado.

**Postcondiciones:** La participación y las respuestas del egresado quedan registradas. La encuesta deja de figurar en el listado de pendientes.

**Flujos alternativos:**

- *6a.* Si la encuesta ya fue respondida por el egresado, el sistema informa el conflicto y no registra nuevas respuestas.

---

## CU-05: Postularse a una Oferta Laboral

**Actor principal:** Egresado  
**Descripción:** El egresado consulta la bolsa laboral y envía una postulación.  
**Precondiciones:** El egresado tiene sesión activa; la oferta está activa y vigente.

**Flujo principal:**

1. El egresado accede a la sección de empleos.
2. El sistema muestra las ofertas activas y vigentes disponibles.
3. El egresado selecciona una oferta para consultar su detalle.
4. El egresado selecciona la opción de postularse y, opcionalmente, redacta una carta de presentación.
5. El egresado envía la postulación.
6. El sistema verifica que la oferta esté activa y no haya expirado.
7. El sistema verifica que el egresado no se haya postulado previamente a esa oferta.
8. El sistema registra la postulación con estado pendiente.
9. El sistema confirma el envío exitoso de la postulación.

**Postcondiciones:** La postulación queda registrada con estado pendiente y es visible para el Administrador.

**Flujos alternativos:**

- *7a.* Si el egresado ya se postuló, el sistema informa el conflicto y no registra una nueva postulación.
- *6a.* Si la oferta ya no está disponible, el sistema informa que la oferta no se encuentra activa.

---

## CU-06: Gestionar Egresados

**Actor principal:** Administrador  
**Descripción:** El Administrador consulta y revisa el directorio de egresados registrados.  
**Precondiciones:** El Administrador tiene sesión activa.

**Flujo principal:**

1. El Administrador accede al módulo de gestión de egresados.
2. El sistema muestra el listado paginado con los indicadores estadísticos del encabezado.
3. El Administrador aplica los filtros de búsqueda según su necesidad (texto libre, estado laboral o año de egreso).
4. El Administrador selecciona un egresado para consultar su ficha completa.
5. El sistema presenta el perfil detallado del egresado con su historial laboral, postulaciones y participación en encuestas.

**Postcondiciones:** El Administrador dispone de la información completa del egresado seleccionado.

---

## CU-07: Administrar Encuestas

**Actor principal:** Administrador  
**Descripción:** El Administrador crea y gestiona las encuestas institucionales.  
**Precondiciones:** El Administrador tiene sesión activa.

**Flujo principal (crear encuesta):**

1. El Administrador accede a la sección de creación de encuestas.
2. Define el título, descripción, fecha de cierre (opcional) y las preguntas con sus tipos y configuraciones.
3. El sistema valida los datos y registra la encuesta con alcance global junto con sus preguntas.
4. La encuesta queda disponible para todos los egresados de la Escuela Profesional si está activa.

**Flujo alternativo (gestionar encuesta existente):**

1. El Administrador accede al listado de encuestas.
2. Puede activar, desactivar, editar o eliminar cualquier encuesta.
3. Puede consultar los resultados de respuestas de cualquier encuesta.

**Postcondiciones:** La encuesta queda publicada y disponible según su configuración de alcance y estado.

---

## CU-08: Administrar Bolsa Laboral

**Actor principal:** Administrador  
**Descripción:** El Administrador publica y gestiona las ofertas de trabajo.  
**Precondiciones:** El Administrador tiene sesión activa y existen empresas registradas en el sistema.

**Flujo principal (crear oferta):**

1. El Administrador accede al formulario de creación de oferta laboral.
2. Define todos los atributos de la oferta: empresa, título, descripción, requisitos, ubicación, modalidad, salario y fecha de expiración.
3. El sistema valida los datos y registra la oferta.

**Flujo alternativo (gestionar oferta existente):**

1. El Administrador accede al listado de ofertas.
2. Puede activar, desactivar, editar o eliminar cualquier oferta.

**Postcondiciones:** La oferta publicada y activa es visible en la bolsa laboral pública y para los egresados autenticados.

---

## CU-09: Gestionar Postulaciones

**Actor principal:** Administrador  
**Descripción:** El Administrador revisa y actualiza el estado de las postulaciones recibidas.  
**Precondiciones:** El Administrador tiene sesión activa.

**Flujo principal:**

1. El Administrador accede al módulo de postulaciones.
2. Visualiza el listado con opciones de filtrado por estado o por oferta laboral.
3. Selecciona una postulación y actualiza su estado según el resultado del proceso de selección.
4. El sistema registra el cambio de estado.

**Postcondiciones:** El nuevo estado de la postulación queda actualizado y es visible para el egresado en su sección de empleos.

---

## CU-10: Generar Reportes Institucionales

**Actor principal:** Administrador  
**Descripción:** El Administrador genera y descarga reportes estadísticos sobre los egresados.  
**Precondiciones:** El Administrador tiene sesión activa.

**Flujo principal:**

1. El Administrador accede al módulo de reportes.
2. Aplica los filtros deseados (año de egreso, estado laboral).
3. Selecciona el formato de exportación: hoja de cálculo (XLSX), CSV o reporte institucional PDF.
4. Para los formatos tabulares, selecciona el conjunto de datos a exportar (egresados, postulaciones, encuestas u ofertas).
5. El sistema genera el archivo y lo transfiere al navegador para su descarga.

**Postcondiciones:** El archivo descargado contiene la información actualizada en el formato seleccionado.

---

## CU-11: Consultar Analítica Institucional (Director)

**Actor principal:** Director de Escuela Profesional  
**Descripción:** El Director accede al panel de analítica estadística para supervisar el estado de los egresados y su inserción laboral.  
**Precondiciones:** El Director tiene sesión activa con rol `DIRECTOR`.

**Flujo principal:**

1. El Director accede a su panel en `/director`.
2. Navega al módulo de analítica.
3. El sistema muestra los indicadores clave de empleabilidad, encuestas y bolsa laboral.
4. El Director aplica filtros opcionales por año de egreso o estado laboral.
5. El Director selecciona un formato de exportación para descargar el informe.
6. El sistema genera y transfiere el archivo al navegador.

**Postcondiciones:** El Director dispone de la información estadística actualizada en el formato seleccionado para su gestión institucional.

**Flujos alternativos:**

- *5a.* Si el Director intenta acceder a una operación de escritura, el sistema rechaza la solicitud con acceso denegado (HTTP 403).

---

## CU-12: Gestionar Encuestas de Prácticas (Coordinador)

**Actor principal:** Coordinador de Prácticas Profesionales  
**Descripción:** El Coordinador crea y gestiona encuestas orientadas al seguimiento de las prácticas preprofesionales.  
**Precondiciones:** El Coordinador tiene sesión activa con rol `PRACTICE_COORDINATOR`.

**Flujo principal (crear encuesta):**

1. El Coordinador accede al módulo de encuestas en su panel.
2. Selecciona la opción de crear nueva encuesta.
3. Define el título, descripción, fecha de cierre y las preguntas con sus tipos.
4. El sistema valida los datos y registra la encuesta con alcance global.
5. La encuesta queda disponible para todos los egresados de la Escuela Profesional si está activa.

**Flujo alternativo (gestionar encuesta existente):**

1. El Coordinador accede al listado de encuestas.
2. Puede activar, desactivar o editar cualquier encuesta.
3. Puede consultar los resultados de respuestas.
4. No puede eliminar encuestas (operación restringida al Administrador).

**Postcondiciones:** La encuesta queda configurada y disponible según su estado de publicación.

\newpage

# Reglas de Negocio

| Código | Regla | Fuente |
|---|---|---|
| RN-01 | El registro en la Plataforma está orientado a egresados de la Escuela Profesional de Ingeniería de Sistemas. El sistema asigna automáticamente al nuevo egresado a dicha Escuela Profesional; no se requiere selección por parte del usuario. | Art. 3 del Reglamento |
| RN-02 | Cada egresado tiene una única cuenta de usuario. La unicidad se garantiza por correo electrónico y por número de DNI. | Art. 11 del Reglamento |
| RN-03 | Los egresados tienen el deber de registrar y mantener actualizados sus datos en la Plataforma al momento de egresar, graduarse o titularse. | Art. 11, inciso a del Reglamento |
| RN-04 | Los egresados tienen el deber de responder las encuestas institucionales sobre logro de competencias, satisfacción laboral y percepción de la formación recibida. | Art. 11, inciso g del Reglamento |
| RN-05 | Un egresado no puede responder la misma encuesta más de una vez. La restricción es aplicada tanto por la lógica de la aplicación como por la base de datos. | Art. 18, inciso c del Reglamento |
| RN-06 | Un egresado no puede presentar más de una postulación a la misma oferta laboral. La restricción es aplicada tanto por la lógica de la aplicación como por la base de datos. | Art. 19 del Reglamento |
| RN-07 | Solo egresados con sesión activa y rol de Egresado pueden responder encuestas. Los administradores no participan como encuestados. | Lógica de la aplicación |
| RN-08 | Solo egresados con sesión activa y rol de Egresado pueden postularse a ofertas laborales. | Lógica de la aplicación |
| RN-09 | Solo el Administrador puede crear y eliminar ofertas laborales. | Lógica de la aplicación |
| RN-10 | Las encuestas solo son visibles para los egresados cuando están activas y dentro de su período de vigencia. | Lógica de la aplicación |
| RN-11 | Las ofertas laborales solo aparecen en la bolsa de trabajo cuando están activas y dentro de su período de vigencia (antes de la fecha de expiración, o indefinidamente si no se estableció fecha de cierre). | Lógica de la aplicación |
| RN-12 | La información registrada en la Plataforma tiene carácter confidencial y es utilizada exclusivamente para los fines institucionales establecidos en el Reglamento, en cumplimiento de la Ley N° 29733. | Art. 20 del Reglamento |
| RN-13 | El acceso a datos personales de egresados distintos al propio está restringido al Administrador. Un egresado autenticado solo puede leer y modificar su propia información. | Art. 20 del Reglamento / RNF-27 |
| RN-14 | Los egresados tienen derecho a solicitar la rectificación, actualización o cancelación de sus datos personales registrados en la Plataforma. | Art. 12, inciso h del Reglamento |
| RN-15 | Las encuestas de seguimiento tienen aplicación semestral conforme al Reglamento. La Plataforma soporta este ciclo mediante el campo de fecha de cierre en cada encuesta. | Art. 18, inciso c del Reglamento |
| RN-16 | Todas las encuestas se crean con alcance global y están disponibles para todos los egresados de la Escuela Profesional de Ingeniería de Sistemas. La arquitectura interna soporta encuestas por escuela como capacidad técnica disponible para versiones futuras, pero la interfaz de administración no expone esta opción. | Lógica de la aplicación |
| RN-17 | Un egresado solo puede modificar su propio perfil. El sistema verifica en el servidor que el registro a modificar corresponda al usuario de la sesión activa. | RNF-27 |
| RN-18 | Las cuentas de usuario con estado inactivo no pueden iniciar sesión en el sistema. | Lógica de autenticación |
| RN-19 | El ciclo de estados de una postulación es el siguiente: pendiente → en revisión → entrevista → aceptada / rechazada. Solo el Administrador puede cambiar el estado de una postulación. | RF-32 |
| RN-20 | El servicio de bolsa laboral está dirigido a estudiantes del último ciclo en búsqueda de prácticas preprofesionales o profesionales, así como a egresados, graduados y titulados de la Escuela Profesional. | Art. 19 del Reglamento |
| RN-21 | El Director de Escuela Profesional tiene acceso exclusivo de consulta y exportación. No puede crear, editar, eliminar ni cambiar el estado de ninguna entidad del sistema (encuestas, ofertas, postulaciones, egresados). Su rol es de supervisión institucional. | Art. 21 del Reglamento / R-10 |
| RN-22 | El Coordinador de Prácticas Profesionales puede gestionar encuestas (crear, editar, activar, desactivar) y ofertas de tipo INTERNSHIP, pero no puede: eliminar encuestas, eliminar ofertas laborales, acceder al directorio de egresados ni crear cuentas de usuario. | Lógica institucional / R-11 |
| RN-23 | Tanto el Director como el Coordinador tienen acceso de lectura al panel de analítica estadística. Este acceso es equivalente al del Administrador en cuanto a visibilidad de datos, pero no incluye operaciones de escritura ni configuración del sistema. | RNF-29, RNF-30 |

\newpage

# Modelo Conceptual

## Entidades Principales

### Usuario

Entidad base de autenticación del sistema. Almacena las credenciales de acceso (correo electrónico y contraseña cifrada), el rol asignado en el sistema (Administrador, Egresado o Escuela) y el estado activo de la cuenta. Todo acceso al sistema está mediado por esta entidad.

### Egresado

Representa el perfil académico y profesional de un egresado de la Escuela Profesional de Ingeniería de Sistemas. Extiende al Usuario con información de identificación (DNI, apellido paterno, apellido materno), datos académicos institucionales (código de matrícula, año-semestre de ingreso, año y semestre de egreso, período de primera matrícula, título obtenido), datos personales (correo personal, teléfono, estado civil, fecha de nacimiento), información de contacto (ciudad, país) e información laboral actualizable (estado laboral, cargo actual, empresa actual, descripción personal, perfil de LinkedIn). Es la entidad central del sistema y se relaciona con Escuela Profesional, Experiencia Laboral, Respuestas a Encuestas y Postulaciones.

### Facultad

Representa una unidad académica de nivel facultad de la Universidad Nacional del Altiplano Puno. Tiene un código único y agrupa a múltiples Escuelas Profesionales. En la versión actual, el sistema opera con la estructura correspondiente a la facultad que alberga la Escuela Profesional de Ingeniería de Sistemas.

### Escuela Profesional

Representa un programa académico dentro de una Facultad. Tiene un código único, pertenece a una Facultad y agrupa a sus egresados. Puede tener encuestas institucionales propias asociadas.

### Experiencia Laboral

Registra las entradas del historial profesional de un egresado: empresa, cargo, fechas de inicio y fin, ubicación y descripción. Un egresado puede tener múltiples experiencias laborales en el sistema. En la versión actual, este historial es gestionado por el Administrador al consultar la ficha del egresado; no existe interfaz de edición directa para el egresado.

### Encuesta

Instrumento de seguimiento institucional creado por el Administrador. Tiene un título, descripción, alcance (global o por escuela profesional), estado de publicación y fecha de cierre opcional. Contiene una o más Preguntas de Encuesta. Según el Reglamento, las encuestas son semestrales y evalúan empleabilidad, satisfacción con la formación recibida y logro de competencias.

### Pregunta de Encuesta

Cada ítem evaluable dentro de una encuesta. Define el texto de la pregunta, su tipo, las opciones de respuesta para preguntas de selección, su carácter obligatorio y su orden de presentación.

### Participación en Encuesta

Registro de que un egresado completó una encuesta. La restricción de unicidad por encuesta y egresado garantiza que cada participante responda cada encuesta exactamente una vez. Contiene el conjunto de Respuestas Individuales correspondientes.

### Respuesta Individual

Almacena la respuesta de un egresado a una pregunta específica dentro de una encuesta. El valor de la respuesta acepta texto, número o lista de opciones, según el tipo de pregunta.

### Empresa

Organización empleadora que publica ofertas en la bolsa laboral institucional. Almacena: nombre, RUC, sector económico, sitio web, descripción y estado de verificación manual. En la versión actual, la gestión de empresas (alta, edición y eliminación) no cuenta con interfaz de usuario implementada.

### Oferta Laboral

Oportunidad de empleo publicada por una Empresa en la bolsa laboral institucional. Incluye: título, descripción, requisitos, ubicación, modalidad de contratación (tiempo completo, medio tiempo, contrato por proyecto o prácticas), rango salarial, modalidad de trabajo remoto, estado de publicación y fecha de expiración. Solo es visible en la bolsa pública cuando está activa y vigente.

### Postulación

Registro de que un egresado presentó su candidatura a una oferta laboral. La restricción de unicidad garantiza una postulación por egresado por oferta. Incluye carta de presentación opcional y un estado que el Administrador gestiona a lo largo del ciclo de selección.

### Evento

Entidad definida en el modelo de datos para representar actividades institucionales como graduaciones, ferias de empleo y talleres. En la versión actual del sistema esta entidad no cuenta con servicios ni interfaz de usuario implementados, y se contempla para versiones futuras.

\newpage

# Limitaciones Actuales del Sistema

La presente sección describe las limitaciones verificadas en el código fuente del sistema en su versión actual. Estas limitaciones no constituyen defectos del sistema, sino el alcance definido para esta versión, y sirven de base para la planificación de versiones futuras.

| Código | Limitación | Detalle verificado |
|---|---|---|
| LIM-01 | Formalización normativa pendiente para el Coordinador de Prácticas | Los paneles del Director (`/director/**`) y del Coordinador (`/coordinador/**`) están completamente implementados y operativos. Sin embargo, la incorporación formal del Coordinador de Prácticas Profesionales como actor con acceso explícito a la Plataforma, mediante la actualización del Reglamento (Capítulo XIII propuesto), permanece como acción institucional pendiente. El valor `SCHOOL` permanece en el esquema como legacy sin usuarios asignados. |
| LIM-02 | Sin módulo de gestión de eventos | El modelo de datos incluye la entidad Evento, pero no existen servicios de backend ni páginas de interfaz para crear, editar o visualizar eventos institucionales. |
| LIM-03 | Sin gestión directa de empresas | No existe interfaz ni servicios de API para registrar, editar o eliminar empresas. Las empresas solo son accesibles como lista de selección en el formulario de creación de ofertas laborales. Las empresas deben ser gestionadas directamente en la base de datos. |
| LIM-04 | Sin gestión del historial laboral desde el panel del Administrador | El egresado puede agregar, editar y eliminar sus experiencias laborales desde su página de perfil (`/egresado/perfil`). Sin embargo, el Administrador no dispone de interfaz para editar el historial laboral de los egresados desde el panel administrativo; solo puede visualizarlo en la ficha de detalle del egresado. |
| LIM-05 | Sin carga de archivos | Los campos de fotografía de perfil y curriculum vitae están definidos en el perfil del egresado, pero no existe funcionalidad de subida de archivos implementada. Dichos campos permanecen sin valor. |
| LIM-06 | Sin recuperación de contraseña | No existe un flujo de recuperación o restablecimiento de contraseña. Un egresado que pierda sus credenciales no puede recuperar el acceso a su cuenta sin intervención directa en la base de datos. |
| LIM-07 | Sin notificaciones automáticas | El sistema no envía notificaciones por correo electrónico ni mediante canales digitales ante eventos relevantes: nuevas encuestas, nuevas ofertas laborales, cambios de estado en postulaciones ni recordatorios de encuestas próximas a vencer. |
| LIM-08 | Sin integración con sistemas académicos de la Universidad | El sistema opera de forma completamente autónoma. No existe integración con el sistema de información académica de la Universidad Nacional del Altiplano Puno, SUNEDU, ni ningún sistema externo. El registro de egresados se realiza de forma manual por el propio egresado. |
| LIM-09 | Sin aplicación móvil nativa | El sistema es accesible únicamente a través de navegadores web. No existe aplicación móvil nativa para plataformas iOS o Android. |

\newpage

# Funcionalidades Previstas para Versiones Futuras

La presente sección documenta las capacidades técnicas ya preparadas en el sistema pero no operativas en la versión actual, así como las funcionalidades identificadas como necesarias para el cumplimiento integral del Reglamento.

## Paneles del Director y el Coordinador (Implementados en v3.2)

Los paneles del Director de Escuela Profesional y del Coordinador de Prácticas Profesionales fueron completamente implementados en la versión 3.2 del sistema.

**Panel del Director (`/director/**`):**
- Panel de inicio con indicadores de gestión institucional (KPIs de empleabilidad, encuestas, bolsa laboral).
- Vista de analítica estadística con gráficos y exportación a XLSX, CSV y PDF.
- Vista de resultados de encuestas institucionales (solo lectura).

**Panel del Coordinador (`/coordinador/**`):**
- Panel de inicio con resumen de encuestas activas y postulaciones recientes.
- Módulo de encuestas (crear, editar, activar/desactivar, ver resultados; sin eliminar).
- Módulo de prácticas: gestión de ofertas de tipo `INTERNSHIP` y `PROFESSIONAL_INTERNSHIP`, y seguimiento de postulaciones.
- Panel de analítica con sección de interacción con la bolsa laboral.

La formalización normativa del Coordinador de Prácticas como actor con acceso explícito a la Plataforma (Capítulo XIII del Reglamento) permanece pendiente de actualización institucional.

## Módulo de Eventos Institucionales

El modelo de datos incluye la entidad Evento para representar actividades institucionales (graduaciones, ferias de empleo, talleres y reuniones de egresados). La implementación de este módulo permitiría publicar y difundir eventos a través de la Plataforma, en cumplimiento del Art. 12, inciso a del Reglamento que establece el derecho del egresado a recibir información sobre actividades programadas.

## Gestión Directa de Empresas

La implementación de una interfaz de administración de empresas (registro, edición, verificación y eliminación) permitiría que el Administrador gestione el directorio de empleadores desde la propia Plataforma, sin necesidad de intervención directa en la base de datos.

## Historial Laboral del Egresado (Implementado en v3.2)

El egresado puede agregar, editar y eliminar entradas de su historial de experiencia laboral directamente desde su página de perfil (`/egresado/perfil`). La funcionalidad cumple el Art. 11, inciso a del Reglamento que establece el deber de mantener actualizados los datos de trayectoria profesional. La gestión administrativa del historial laboral (desde el panel del Administrador) permanece como funcionalidad prevista para versiones futuras.

## Carga y Gestión de Archivos

Implementar la funcionalidad de subida de fotografía de perfil y curriculum vitae en PDF, integrando un servicio de almacenamiento para los campos ya definidos en el perfil del egresado.

## Recuperación de Contraseña

Implementar un flujo de recuperación de acceso mediante correo electrónico para egresados que pierdan sus credenciales de ingreso.

## Notificaciones Institucionales

Sistema de notificaciones automáticas para informar a los egresados sobre: nuevas encuestas disponibles, nuevas ofertas laborales de su interés, cambios en el estado de sus postulaciones y encuestas próximas a vencer. El Artículo 12, inciso a del Reglamento establece el derecho del egresado a recibir información oportuna.

## Exportación Detallada de Resultados de Encuestas

Ampliar la funcionalidad de exportación para incluir los resultados detallados por pregunta de cada encuesta individual, facilitando la elaboración de los informes periódicos que la Comisión debe presentar al Director de la Escuela Profesional (Art. 7, inciso g del Reglamento).

## RF-58 — Importación Masiva de Egresados desde Excel

**Estado:** Documentado. No implementado en la versión actual.

| Campo | Detalle |
|---|---|
| **Identificador** | RF-58 |
| **Nombre** | Importación masiva de egresados desde Excel |
| **Actor** | Administrador |
| **Prioridad** | Alta |
| **Módulo** | M5 — Gestión de Egresados |

**Descripción:** El sistema permite al Administrador cargar un archivo Excel (`.xlsx`) con datos de egresados en masa y crear los registros correspondientes en la base de datos. El sistema valida el formato del archivo, mapea las columnas del Excel a los campos del modelo `Graduate` (incluyendo los siete nuevos atributos agregados en v3.1), genera un reporte de filas procesadas correctamente, filas con error y filas omitidas por duplicidad de DNI o correo.

**Justificación:** La Escuela Profesional de Ingeniería de Sistemas tiene un registro histórico de egresados en formato Excel (`DatosEgresados.xlsx`, 502 registros) que actualmente no puede cargarse al sistema de forma masiva. Esta funcionalidad permitiría poblar la base de datos con los egresados históricos en una sola operación, eliminando la necesidad de registro individual.

**Formato de entrada esperado:** El archivo Excel debe tener al menos las columnas: `N° DNI`, `APELLIDO PATERNO`, `APELLIDO MATERNO`, `NOMBRES`, `CÓDIGO MATRICULA`, `AÑO-SEMESTRE DE INGRESO`, `AÑO-SEMESTRE DE EGRESO`, `PERIODO DE 1RA MATRÍCULA`, `CORREO ELECTRÓNICO`, `ESCUELA PROFESIONAL`.

**Restricciones:**
- Solo el Administrador puede ejecutar esta operación.
- Los registros con DNI duplicado se omiten con advertencia.
- Los registros sin correo electrónico reciben un correo provisional generado por el sistema.
- La operación es irreversible desde la interfaz; requiere supervisión del administrador.

\newpage

# Matriz de Trazabilidad

## Objetivos del Sistema → Módulos → Requerimientos Funcionales

| Objetivo | Módulo(s) | Requerimientos |
|---|---|---|
| OBJ-1: Mantener actualizada la información del egresado | Autenticación y Registro, Perfil del Egresado | RF-01 al RF-10 |
| OBJ-2: Obtener información estadística sobre empleabilidad | Analítica y Reportes | RF-36 al RF-45 |
| OBJ-3: Fortalecer mecanismos de comunicación (encuestas) | Encuestas Institucionales | RF-11 al RF-20 |
| OBJ-4: Promover la inserción laboral | Bolsa Laboral, Gestión de Postulaciones | RF-21 al RF-32 |
| OBJ-5: Implementar herramientas de monitoreo y seguimiento | Gestión de Egresados, Analítica y Reportes | RF-33 al RF-45 |

## Módulos → Requerimientos Funcionales

| Módulo | Requerimientos Funcionales |
|---|---|
| M1 — Autenticación y Registro | RF-01, RF-02, RF-03, RF-04, RF-05, RF-06 |
| M2 — Perfil del Egresado | RF-07, RF-08, RF-09, RF-10 |
| M3 — Encuestas (Administrador) | RF-11, RF-12, RF-13, RF-14, RF-15, RF-16, RF-17 |
| M3 — Encuestas (Egresado) | RF-18, RF-19, RF-20 |
| M4 — Bolsa Laboral (Administrador) | RF-21, RF-22, RF-23, RF-24, RF-25 |
| M4 — Bolsa Laboral (Pública y Egresado) | RF-26, RF-27, RF-28, RF-29, RF-30 |
| M5 — Gestión de Postulaciones | RF-31, RF-32 |
| M6 — Gestión de Egresados | RF-33, RF-34, RF-35 |
| M7 — Analítica y Reportes | RF-36, RF-37, RF-38, RF-39, RF-40, RF-41, RF-42, RF-43, RF-44, RF-45 |
| M8 — Portal Público | RF-46, RF-47 |
| M9 — Panel del Director | RF-48, RF-49, RF-50, RF-51, RF-52 |
| M10 — Panel del Coordinador | RF-53, RF-54, RF-55, RF-56, RF-57 |

## Módulos → Requerimientos No Funcionales

| Área | Requerimientos No Funcionales |
|---|---|
| Seguridad | RNF-01 al RNF-06 |
| Rendimiento | RNF-07 al RNF-09 |
| Disponibilidad | RNF-10, RNF-11 |
| Usabilidad | RNF-12 al RNF-15 |
| Escalabilidad | RNF-16, RNF-17 |
| Compatibilidad | RNF-18 al RNF-20 |
| Mantenibilidad | RNF-21 al RNF-24 |
| Protección de datos | RNF-25 al RNF-28 |
| Roles nuevos | RNF-29, RNF-30 |

## Tabla de Actores — Versión v3.0

| Actor | Rol en el sistema | Estado | Módulos con acceso |
|---|---|---|---|
| Administrador | `ADMIN` | Operativo | Todos los módulos |
| Egresado | `GRADUATE` | Operativo | Perfil, Encuestas, Bolsa Laboral, Portal |
| Director de Escuela Profesional | `DIRECTOR` | Operativo | M9 (Analítica, Encuestas, Postulaciones, Exportaciones — solo lectura) |
| Coordinador de Prácticas | `PRACTICE_COORDINATOR` | Operativo | M10 (Encuestas, Bolsa Laboral INTERNSHIP/PROFESSIONAL_INTERNSHIP, Postulaciones, Analítica) |
| Público Anónimo | — | Operativo | Portal Público |
| *Legacy SCHOOL* | *`SCHOOL`* | *Obsoleto — sin usuarios asignados* | *APIs de consulta (heredado)* |

## Tabla de Actores — Matriz Actor ↔ Funcionalidad

| Módulo / Funcionalidad | ADMIN | DIRECTOR | PRACTICE_COORDINATOR | GRADUATE | Público |
|---|:---:|:---:|:---:|:---:|:---:|
| Autenticación / sesión | ✅ | ✅ | ✅ | ✅ | — |
| Gestión de egresados (directorio) | ✅ | — | — | — | — |
| Perfil propio | — | — | — | ✅ | — |
| Encuestas — crear/editar | ✅ | — | ✅ | — | — |
| Encuestas — eliminar | ✅ | — | — | — | — |
| Encuestas — activar/desactivar | ✅ | — | ✅ | — | — |
| Encuestas — ver resultados | ✅ | ✅ | ✅ | — | — |
| Encuestas — responder | — | — | — | ✅ | — |
| Bolsa laboral — crear/editar oferta | ✅ | — | ✅ (INTERNSHIP) | — | — |
| Bolsa laboral — eliminar oferta | ✅ | — | — | — | — |
| Bolsa laboral — activar/desactivar | ✅ | — | ✅ | — | — |
| Bolsa laboral — ver ofertas | ✅ | ✅ | ✅ | ✅ | ✅ |
| Postulaciones — ver listado | ✅ | ✅ | ✅ | ✅ (propias) | — |
| Postulaciones — cambiar estado | ✅ | — | ✅ | — | — |
| Analítica — ver panel | ✅ | ✅ | ✅ | — | — |
| Analítica — exportar XLSX/CSV/PDF | ✅ | ✅ | ✅ | — | — |
| Portal público | ✅ | ✅ | ✅ | ✅ | ✅ |
| Configuración del sistema | ✅ | — | — | — | — |

## Tabla de Módulos — Estado de Implementación

| N° | Módulo | Estado | Actores |
|---|---|---|---|
| 1 | Autenticación y Registro | Implementado | Todos |
| 2 | Perfil del Egresado | Implementado | Egresado |
| 3 | Panel de inicio del Egresado | Implementado | Egresado |
| 4 | Encuestas — Administración | Implementado | Administrador, Coordinador |
| 5 | Encuestas — Participación | Implementado | Egresado |
| 6 | Bolsa Laboral — Administración | Implementado | Administrador, Coordinador (INTERNSHIP) |
| 7 | Bolsa Laboral — Pública y del Egresado | Implementado | Público, Egresado |
| 8 | Gestión de Postulaciones | Implementado | Administrador, Coordinador, Director (solo lectura) |
| 9 | Gestión de Egresados | Implementado | Administrador |
| 10 | Analítica y Reportes | Implementado | Administrador, Director, Coordinador |
| 11 | Portal Público | Implementado | Público |
| 12 | Panel Administrativo General | Implementado | Administrador |
| 13 | Panel del Director | Implementado | Director |
| 14 | Panel del Coordinador | Implementado | Coordinador |
| 15 | Gestión de Eventos | Previsto (Fase 2) | — |

\newpage

# Conclusiones

1. **Correspondencia con el Reglamento institucional.** El sistema implementado cubre los mecanismos centrales establecidos en el Reglamento: el registro y actualización de datos de egresados (Art. 11, inciso a), el servicio de bolsa laboral institucional (Art. 19), las encuestas de seguimiento (Art. 18, inciso c), la analítica estadística de empleabilidad (Art. 18, inciso k) y los principios de protección de datos personales (Art. 20 / Ley N° 29733).

2. **Alcance de la implementación actual.** El sistema está diseñado con una arquitectura que soporta múltiples facultades y escuelas profesionales. Sin embargo, en su versión actual se encuentra configurado y operativo exclusivamente para la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno. La extensión a otras unidades académicas es técnicamente viable sin cambios estructurales en la base de datos.

3. **Arquitectura sólida y mantenible.** La separación estricta en capas (interfaz de usuario, rutas de servicios, capa de datos), el uso de tipado estático en toda la base de código y los esquemas de validación centralizados garantizan la coherencia y mantenibilidad del sistema a largo plazo.

4. **Seguridad correctamente implementada.** El control de acceso por roles opera en dos niveles independientes y complementarios: la protección de rutas de navegación y la verificación de cada servicio de la API. Las reglas de integridad más críticas (respuesta única por encuesta, postulación única por oferta) están implementadas tanto en la lógica de la aplicación como en las restricciones de la base de datos.

5. **Cuatro actores institucionales plenamente operativos en la versión 3.2.** El sistema cuenta con cuatro actores activos y operativos: Administrador, Egresado, Director de Escuela Profesional (rol `DIRECTOR`, Art. 21 del Reglamento) y Coordinador de Prácticas Profesionales (rol `PRACTICE_COORDINATOR`). Los paneles de Director (`/director/**`) y Coordinador (`/coordinador/**`) fueron completamente implementados en la versión 3.2, con acceso diferenciado de lectura para el Director y acceso operativo restringido para el Coordinador. La formalización normativa del Coordinador en el Reglamento (Capítulo XIII propuesto) permanece como acción institucional pendiente.

6. **Limitaciones documentadas.** Se identificaron nueve limitaciones concretas en la versión actual: formalización normativa pendiente del Coordinador, gestión directa de empresas, módulo de eventos, gestión administrativa del historial laboral, carga de archivos, recuperación de contraseña, notificaciones automáticas, integración con sistemas externos y aplicación móvil. Estas limitaciones están claramente delimitadas y no afectan las funcionalidades operativas centrales del sistema.

7. **Cumplimiento normativo.** La implementación respeta los principios de la Ley N° 29733 mediante la restricción de acceso a datos personales, el almacenamiento seguro de contraseñas y el derecho del egresado a actualizar su propia información.

\newpage

# Recomendaciones

Las siguientes recomendaciones están ordenadas según su relevancia para el cumplimiento integral del Reglamento y la mejora de la experiencia de los usuarios:

1. **Actualizar el Reglamento institucional (prerequisito normativo).** Incorporar al Coordinador de Prácticas Profesionales como actor explícito con acceso a la Plataforma (Capítulo XIII propuesto). Actualizar los Arts. 3, 20 y 21 para incluir formalmente al Director y al Coordinador como actores con acceso. Sin esta actualización normativa, la implementación completa carece de base reglamentaria.

2. **Formalizar normativamente al Coordinador de Prácticas en el Reglamento (acción institucional).** Los paneles del Director (`/director/**`) y del Coordinador (`/coordinador/**`) están completamente implementados y operativos. La próxima acción es la actualización del Reglamento vigente (Capítulo XIII propuesto) para incorporar formalmente al Coordinador de Prácticas Profesionales como actor con acceso explícito a la Plataforma.

3. **Ampliar los permisos de creación del Coordinador de Prácticas.** En la versión actual el Coordinador puede alternar el estado de cualquier oferta laboral, pero la creación de nuevas ofertas (incluyendo `INTERNSHIP` y `PROFESSIONAL_INTERNSHIP`) está reservada al Administrador. Evaluar si debe otorgarse al Coordinador la capacidad de crear directamente ofertas de prácticas.

4. **Implementar recuperación de contraseña.** Desarrollar un flujo de recuperación de acceso por correo electrónico. La ausencia de esta funcionalidad representa un riesgo de bloqueo permanente para los egresados que pierdan sus credenciales.

5. **Implementar gestión administrativa del historial laboral.** El egresado ya puede agregar, modificar y eliminar sus propias experiencias laborales desde su perfil. Se recomienda habilitar al Administrador para gestionar el historial laboral de cualquier egresado directamente desde el panel administrativo, facilitando correcciones y actualizaciones operativas.

6. **Implementar el módulo de gestión de empresas.** Desarrollar la interfaz de administración de empresas para que el Administrador pueda registrar, editar y verificar empresas directamente desde la Plataforma, sin necesidad de acceso directo a la base de datos.

7. **Implementar notificaciones institucionales.** Desarrollar un sistema de notificaciones automáticas por correo electrónico para informar a los egresados sobre nuevas encuestas, nuevas ofertas laborales y cambios de estado en sus postulaciones, en línea con el Art. 12, inciso a del Reglamento.

8. **Implementar el módulo de eventos.** Habilitar la publicación de eventos institucionales (graduaciones, ferias de empleo, talleres) a través de la Plataforma, permitiendo informar oportunamente a los egresados conforme a lo establecido en el Art. 12, inciso a del Reglamento.

9. **Implementar carga de archivos.** Desarrollar la funcionalidad de subida de fotografía de perfil y curriculum vitae en PDF, integrando un servicio de almacenamiento externo para los campos ya definidos en el perfil del egresado.

10. **Ampliar la exportación de resultados de encuestas.** Agregar la opción de exportar los resultados detallados por pregunta de cada encuesta, facilitando la elaboración de los informes periódicos que la Comisión de Seguimiento debe presentar al Director de la Escuela Profesional (Art. 7, inciso g del Reglamento).

11. **Coordinar la integración con sistemas académicos.** Evaluar la viabilidad de integración con el sistema de información académica de la Universidad Nacional del Altiplano Puno para automatizar el registro de nuevos egresados y reducir la carga manual sobre los usuarios.

12. **Documentar el proceso de verificación de empresas.** Establecer un procedimiento formal para la verificación y habilitación de empresas en la bolsa laboral, ya que el modelo de datos contempla un campo de verificación manual que actualmente carece de proceso definido.

---

*Documento elaborado por la Comisión de Seguimiento al Egresado de la Escuela Profesional de Ingeniería de Sistemas, Universidad Nacional del Altiplano Puno.*

*Versión 3.0 — Junio 2026.*

*Basado en el análisis del Reglamento del Sistema de Seguimiento e Inserción Laboral del Egresado (v1, mayo 2026) y la revisión exhaustiva del código fuente del sistema.*
