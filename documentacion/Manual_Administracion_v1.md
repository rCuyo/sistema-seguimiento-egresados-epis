---
title: "Manual de Administración del Sistema"
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
| **Título del documento** | Manual de Administración del Sistema |
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

Este manual describe las funciones y procedimientos administrativos del Sistema Web de Seguimiento e Inserción Laboral del Egresado, dirigidos al usuario con rol **ADMIN**. Cubre la gestión completa de egresados, encuestas, ofertas laborales, postulaciones y la consulta de reportes analíticos.

## Alcance

Este documento aplica al personal de la Comisión de Seguimiento al Egresado de la Escuela Profesional de Ingeniería de Sistemas (UNA Puno) que tenga asignado el rol de Administrador en el sistema.

## Prerrequisitos

Para utilizar el panel de administración se requiere:

- Contar con credenciales de acceso (correo y contraseña) del rol ADMIN.
- Disponer de un navegador web actualizado (Chrome, Firefox, Edge o Safari en versiones recientes).
- Tener conexión a internet estable.
- El sistema debe estar correctamente instalado y desplegado (ver Manual de Instalación).

\newpage

# Acceso y Autenticación

## Credenciales del Administrador

El administrador accede al sistema con las siguientes credenciales (en el entorno de prueba con datos seed):

| Campo | Valor |
|---|---|
| Correo electrónico | admin@unap.edu.pe |
| Contraseña | admin123 |

> **IMPORTANTE**: En producción, cambiar esta contraseña inmediatamente. Las credenciales anteriores son únicamente para el entorno de prueba.

## Proceso de Inicio de Sesión

1. Abrir el navegador y acceder a la URL del sistema (ej. `http://localhost:3000` en desarrollo o el dominio de producción).
2. Hacer clic en el botón **Iniciar sesión** en la página de inicio, o acceder directamente a `/login`.
3. Ingresar el correo electrónico y la contraseña del administrador.
4. Hacer clic en **Ingresar**.
5. El sistema verificará las credenciales y redirigirá automáticamente al panel de administración en `/admin`.

## Gestión de Sesión

- La sesión se mantiene activa mientras el navegador permanezca abierto.
- Para cerrar sesión de forma segura, hacer clic en el nombre de usuario en la barra superior y seleccionar **Cerrar sesión**.
- Las sesiones inactivas pueden expirar según la configuración del servidor. En ese caso, el sistema redirigirá automáticamente al login.

> **Nota**: Si el sistema redirige repetidamente al login sin poder acceder, verificar que la URL configurada en `NEXTAUTH_URL` coincida con la URL que se está usando en el navegador. Esto es un problema de configuración del entorno, no de las credenciales.

\newpage

# Gestión del Directorio de Egresados

## Acceso al Módulo

Desde el panel de administración, hacer clic en **Egresados** en el menú lateral. La ruta es `/admin/egresados`.

## Vista de Lista de Egresados

La página muestra una tabla paginada con todos los egresados registrados en el sistema. Cada fila incluye:

- Nombre completo
- Correo electrónico
- Estado laboral (Empleado, Desempleado, Trabajador independiente, Buscando empleo, Estudiando)
- Año de egreso
- Acciones disponibles (ver detalle)

### Búsqueda y Filtros

En la parte superior de la lista se encuentran los controles de búsqueda y filtrado:

- **Búsqueda por texto**: busca por nombre, apellido o correo electrónico. El resultado se actualiza automáticamente al escribir.
- **Filtro por estado laboral**: desplegable con las opciones de estado laboral disponibles.
- **Filtro por año de egreso**: ingreso del año para filtrar egresados de una promoción específica.

Para limpiar los filtros y mostrar todos los egresados, eliminar el texto de búsqueda y seleccionar la opción "Todos" en los desplegables.

## Paginación

La lista muestra un número fijo de registros por página. Para navegar entre páginas, usar los controles de paginación en la parte inferior de la tabla (anterior, página X de Y, siguiente).

## Ver Detalle de un Egresado

Hacer clic en el nombre de un egresado o en el botón de detalle de su fila para acceder a la vista de perfil completo en `/admin/egresados/[id]`.

### Información Disponible en el Detalle

El detalle del egresado muestra los siguientes campos:

| Sección | Campos |
|---|---|
| **Datos personales** | Nombres, apellidos, documento de identidad, fecha de nacimiento, estado civil, ciudad, país |
| **Contacto** | Correo institucional, correo personal, teléfono, LinkedIn |
| **Perfil académico** | Escuela profesional, año de egreso |
| **Situación laboral** | Estado laboral, cargo actual, empresa actual |
| **Biografía** | Resumen profesional ingresado por el egresado |
| **Experiencia laboral** | Lista de trabajos anteriores y actuales con empresa, cargo, período y descripción |
| **Encuestas** | Encuestas respondidas por el egresado |
| **Postulaciones** | Empleos a los que ha postulado y su estado |

> **Nota**: El administrador puede ver toda la información del egresado, pero no puede editarla desde este módulo. La edición del perfil corresponde únicamente al propio egresado desde su panel.

\newpage

# Gestión de Encuestas

## Acceso al Módulo

Desde el menú lateral, hacer clic en **Encuestas**. La ruta es `/admin/encuestas`.

## Lista de Encuestas

La pantalla muestra todas las encuestas creadas con su nombre, estado (activa/inactiva), número de preguntas y número de respuestas recibidas.

## Crear una Nueva Encuesta

1. Hacer clic en el botón **Nueva encuesta**.
2. Completar el formulario:
   - **Título**: nombre descriptivo de la encuesta (ej. "Encuesta de Seguimiento Laboral 2026").
   - **Descripción**: texto explicativo que verán los egresados antes de responder.
3. Hacer clic en **Guardar** para crear la encuesta. Esta quedará en estado **inactiva** por defecto.
4. El sistema redirigirá al editor de preguntas de la encuesta recién creada.

## Agregar Preguntas (Constructor de Preguntas)

Una vez dentro de la encuesta, el constructor de preguntas permite agregar, editar y eliminar preguntas. Hacer clic en **Agregar pregunta** para añadir una nueva.

### Tipos de Preguntas Disponibles

| Tipo | Descripción | Cuándo usarlo |
|---|---|---|
| **Texto corto** (`text`) | Campo de una sola línea | Nombres, cargos, empresas, datos breves |
| **Texto largo** (`textarea`) | Área de texto de múltiples líneas | Comentarios, descripciones, sugerencias |
| **Opción única** (`single`) | El egresado selecciona UNA respuesta de una lista | Preguntas con respuesta excluyente (ej. "¿Está trabajando actualmente?") |
| **Opción múltiple** (`multiple`) | El egresado puede seleccionar VARIAS respuestas | Preguntas que admiten varias opciones (ej. "¿Qué beneficios recibe?") |
| **Calificación** (`rating`) | Escala numérica del 1 al 5 | Satisfacción, valoración de aspectos |
| **Sí / No** (`yesno`) | Solo dos opciones: Sí o No | Preguntas de confirmación binaria |

### Agregar Opciones a Preguntas de Selección

Para los tipos **opción única** y **opción múltiple**, se deben definir las opciones de respuesta:

1. En el campo de opciones, escribir el texto de la primera opción y presionar **Agregar opción** (o la tecla Enter).
2. Repetir para cada opción.
3. Para eliminar una opción, hacer clic en el ícono de eliminar junto a ella.

> **Validación de duplicados**: El sistema no permite guardar opciones con texto idéntico dentro de la misma pregunta. Si se intenta agregar una opción duplicada, el sistema mostrará un aviso de error y no la añadirá.

### Opciones Adicionales de Cada Pregunta

- **Requerida**: marcar si el egresado está obligado a responder esta pregunta. Las preguntas no marcadas pueden dejarse en blanco.
- **Reordenar preguntas**: las preguntas pueden reordenarse arrastrándolas (drag & drop) para ajustar el flujo de la encuesta.

## Editar una Encuesta Existente

1. En la lista de encuestas, hacer clic en el botón de edición (ícono de lápiz) de la encuesta deseada.
2. Modificar el título, descripción o preguntas según sea necesario.
3. Guardar los cambios.

> **Advertencia**: Si la encuesta ya tiene respuestas de egresados, editar las preguntas puede generar inconsistencias en los datos. Se recomienda no modificar preguntas de encuestas activas con respuestas ya registradas.

## Activar y Desactivar Encuestas

Una encuesta **inactiva** no es visible para los egresados. Una encuesta **activa** aparece en el panel del egresado como pendiente de responder.

Para cambiar el estado:

1. En la lista de encuestas, localizar la encuesta.
2. Hacer clic en el botón de activar/desactivar (toggle).
3. El estado cambiará inmediatamente y se mostrará una confirmación.

Una vez que una encuesta está activa y tiene respuestas registradas, se recomienda no desactivarla hasta que el período de recolección de datos haya concluido.

## Ver Resultados de una Encuesta

1. En la lista de encuestas, hacer clic en el botón de **Resultados** de la encuesta deseada. La ruta es `/admin/encuestas/[id]/resultados`.
2. La pantalla muestra un resumen de respuestas por pregunta:
   - Para preguntas de **opción única** y **opción múltiple**: gráfico de distribución de respuestas.
   - Para preguntas de **calificación**: promedio y distribución de puntajes.
   - Para preguntas de **texto** y **texto largo**: listado de todas las respuestas recibidas.
   - Para preguntas de **Sí/No**: conteo y porcentaje de cada opción.

## Eliminar una Encuesta

1. En la lista de encuestas, hacer clic en el botón de eliminar (ícono de papelera) de la encuesta.
2. Confirmar la eliminación en el cuadro de diálogo.

> **ADVERTENCIA**: La eliminación de una encuesta es permanente e irreversible. Se eliminarán también todas las respuestas asociadas. Verificar que realmente se desea eliminar antes de confirmar.

\newpage

# Gestión de la Bolsa Laboral

## Acceso al Módulo

Desde el menú lateral, hacer clic en **Bolsa Laboral**. La ruta es `/admin/bolsa-laboral`.

## Lista de Ofertas Laborales

La pantalla muestra todas las ofertas registradas con su título, empresa, tipo, estado (activa/inactiva), fecha de expiración y métricas de interacción.

## Crear una Nueva Oferta Laboral

1. Hacer clic en el botón **Nueva oferta**.
2. Completar el formulario con los siguientes campos:

### Campos del Formulario

| Campo | Tipo | Descripción |
|---|---|---|
| **Empresa** | Selector | Seleccionar de la lista de empresas registradas en el sistema |
| **Título del puesto** | Texto | Nombre del cargo ofertado (ej. "Desarrollador Web Junior") |
| **Descripción** | Texto largo | Descripción completa del puesto y las responsabilidades |
| **Requisitos** | Texto largo | Habilidades, experiencia y formación requeridas |
| **Ubicación** | Texto | Ciudad o dirección del trabajo |
| **Tipo de empleo** | Selector | Ver tabla de tipos a continuación |
| **Modalidad** | Selector | Presencial / Híbrido / Remoto |
| **Salario** | Texto | Rango o monto salarial (campo opcional) |
| **URL externa** | URL | Enlace a la plataforma externa de postulación (campo opcional) |
| **Activa** | Toggle | Si está activa, será visible para los egresados |
| **Fecha de expiración** | Fecha | Fecha hasta la cual la oferta estará disponible |

### Tipos de Empleo

| Valor | Etiqueta mostrada |
|---|---|
| `FULL_TIME` | Tiempo completo |
| `PART_TIME` | Tiempo parcial |
| `CONTRACT` | Por contrato |
| `INTERNSHIP` | Prácticas preprofesionales |
| `PROFESSIONAL_INTERNSHIP` | Prácticas profesionales |

> **Nota sobre tipos de práctica**: `INTERNSHIP` corresponde a prácticas preprofesionales (realizadas durante los estudios) y `PROFESSIONAL_INTERNSHIP` a prácticas profesionales (posteriores al egreso). El Coordinador de Prácticas gestiona estas ofertas desde su propio panel.

### Comportamiento Según URL Externa

El campo **URL externa** define el flujo de postulación del egresado:

- **Sin URL externa**: el egresado puede postular directamente desde el sistema enviando una carta de presentación. La postulación queda registrada en el módulo de Postulaciones.
- **Con URL externa**: al hacer clic en "Postular", el egresado es redirigido a la plataforma externa. El sistema registra el clic para métricas de interacción, pero no recibe ni gestiona la postulación.

3. Hacer clic en **Guardar** para crear la oferta.

## Editar una Oferta Laboral

1. En la lista, hacer clic en el botón de edición de la oferta deseada. La ruta es `/admin/bolsa-laboral/[id]/editar`.
2. Modificar los campos necesarios.
3. Guardar los cambios.

## Activar y Desactivar Ofertas

Una oferta **inactiva** no es visible para los egresados ni en el portal público. Para cambiar el estado:

1. En la lista, hacer clic en el botón de activar/desactivar (toggle) de la oferta.
2. El estado cambiará inmediatamente.

Usos comunes:
- **Desactivar**: cuando el puesto ya fue cubierto o el período de postulación terminó.
- **Activar**: cuando una nueva oferta está lista para publicarse.

## Métricas de Interacción

El sistema registra automáticamente las interacciones de los egresados con las ofertas. En la lista y en el detalle de cada oferta se muestran:

| Métrica | Descripción |
|---|---|
| **Vistas** | Número de veces que el detalle de la oferta fue abierto |
| **Clics** | Número de veces que se hizo clic en el botón de postulación o URL externa |
| **Tasa de clics** | Porcentaje de vistas que resultaron en un clic (clics / vistas × 100) |

Estas métricas permiten evaluar el interés de los egresados en las ofertas y la efectividad de los anuncios publicados.

\newpage

# Gestión de Postulaciones

## Acceso al Módulo

Desde el menú lateral, hacer clic en **Postulaciones**. La ruta es `/admin/postulaciones`.

## Lista de Postulaciones

La pantalla muestra todas las postulaciones recibidas mediante el sistema interno (no aplica a ofertas con URL externa). Cada registro incluye:

- Nombre del egresado postulante
- Oferta laboral a la que postula
- Fecha de postulación
- Estado actual
- Carta de presentación

## Flujo de Estados de Postulación

Las postulaciones siguen un ciclo de estados que el administrador actualiza manualmente:

```
PENDING → REVIEWED → INTERVIEW → ACCEPTED
                              → REJECTED
```

| Estado | Significado |
|---|---|
| `PENDING` (Pendiente) | Postulación recibida, aún no revisada |
| `REVIEWED` (Revisado) | El administrador ha revisado la postulación |
| `INTERVIEW` (Entrevista) | El egresado ha sido convocado a entrevista |
| `ACCEPTED` (Aceptado) | El egresado fue seleccionado para el puesto |
| `REJECTED` (Rechazado) | La postulación no fue aprobada |

## Actualizar el Estado de una Postulación

1. En la lista de postulaciones, localizar la postulación deseada.
2. En el campo o selector de estado, elegir el nuevo estado.
3. El cambio se aplica inmediatamente.

> **Nota**: El sistema actualmente no envía notificaciones automáticas al egresado cuando cambia el estado de su postulación. El egresado puede consultar el estado desde su panel en `/egresado/empleos`.

## Ver la Carta de Presentación

Hacer clic en el botón de detalle de la postulación para leer la carta de presentación que el egresado incluyó al postular.

\newpage

# Analítica y Reportes

## Acceso al Módulo

Desde el menú lateral, hacer clic en **Reportes** o **Analítica**. La ruta es `/admin/reportes`.

## Indicadores Clave de Desempeño (KPIs)

La parte superior del panel muestra tarjetas con los indicadores principales del sistema:

| KPI | Descripción |
|---|---|
| **Total de egresados** | Número total de egresados registrados en el sistema |
| **Egresados empleados** | Cantidad con estado laboral "Empleado" o "Trabajador independiente" |
| **Tasa de empleabilidad** | Porcentaje de egresados empleados sobre el total |
| **Encuestas respondidas** | Total de respuestas a encuestas |
| **Ofertas activas** | Número de ofertas laborales actualmente publicadas |
| **Postulaciones recibidas** | Total de postulaciones internas registradas |

## Gráficos Analíticos

El panel incluye seis gráficos que brindan una visión completa de la situación laboral y de participación de los egresados:

| N° | Gráfico | Tipo | Descripción |
|---|---|---|---|
| 1 | **Distribución por estado laboral** | Gráfico circular | Proporción de egresados por cada estado laboral |
| 2 | **Egresados registrados por año** | Gráfico de barras | Número de egresados que ingresaron al sistema por año de egreso |
| 3 | **Distribución por sector económico** | Gráfico circular | Sectores donde trabajan los egresados empleados |
| 4 | **Principales empleadores** | Gráfico de barras horizontales | Las empresas con más egresados contratados |
| 5 | **Postulaciones por estado** | Gráfico circular | Distribución de postulaciones según su estado actual |
| 6 | **Interacción con ofertas laborales** | Gráfico de barras agrupadas | Vistas y clics por oferta, para identificar las más relevantes |

## Filtros

En la parte superior del panel se pueden aplicar filtros para segmentar los datos:

- **Año de egreso**: limita los datos a egresados de una promoción específica.
- **Estado laboral**: muestra solo los egresados con el estado seleccionado.

Los gráficos y KPIs se actualizan automáticamente al aplicar los filtros.

## Exportación de Datos

El panel ofrece opciones de exportación en tres formatos:

### Exportar a Excel (XLSX)

Hace clic en **Exportar Excel**. Se descargará un archivo `.xlsx` con los datos de los egresados y sus estados laborales. Incluye múltiples hojas: resumen de KPIs, lista de egresados, postulaciones y encuestas.

### Exportar a CSV

Hace clic en **Exportar CSV**. Se descargará un archivo de texto separado por comas, compatible con cualquier hoja de cálculo o sistema de análisis de datos.

### Exportar a PDF

Hace clic en **Exportar PDF**. El sistema generará un informe PDF con los KPIs y gráficos del panel. El proceso puede tardar algunos segundos ya que el PDF se genera en el servidor.

> **Nota**: El PDF y el Excel exportan los datos con los filtros activos en ese momento. Si se desea un informe completo, asegurarse de no tener filtros aplicados antes de exportar.

\newpage

# Configuración del Sistema

## Acceso al Módulo

Desde el menú lateral, hacer clic en **Configuración**. La ruta es `/admin/configuracion`.

## Funcionalidades Disponibles

El módulo de configuración permite gestionar los parámetros generales del sistema. Las opciones disponibles en esta versión incluyen:

- Gestión de datos de la institución (nombre, información de contacto).
- Configuración de parámetros generales del sistema.

> **Nota**: La gestión de usuarios del sistema (crear administradores, directores, coordinadores) se realiza directamente en la base de datos mediante Prisma Studio o scripts, ya que no existe actualmente una interfaz de gestión de usuarios en el panel de administración.

\newpage

# Buenas Prácticas Administrativas

## Gestión de Encuestas

- **Planificar el calendario de encuestas**: definir al menos una encuesta de seguimiento laboral por semestre académico para mantener datos actualizados.
- **Revisar resultados regularmente**: acceder a los resultados de encuestas activas periódicamente para identificar tendencias.
- **Desactivar encuestas cerradas**: una vez terminado el período de recolección, desactivar la encuesta para que no aparezca como pendiente para nuevos egresados.
- **No eliminar encuestas con datos**: preservar el historial de encuestas respondidas para análisis longitudinales.

## Gestión de la Bolsa Laboral

- **Mantener las ofertas actualizadas**: revisar periódicamente las ofertas activas y desactivar aquellas que ya no estén vigentes.
- **Verificar fechas de expiración**: asegurarse de que las ofertas tengan fechas de expiración realistas.
- **Monitorear métricas de interacción**: las ofertas con muchas vistas pero pocos clics pueden indicar que el título o la descripción no son atractivos.
- **Preferir URLs externas para empresas con sus propios portales**: esto reduce la carga administrativa y dirige a los egresados al proceso oficial de la empresa.

## Exportaciones y Respaldo

- **Exportar datos mensualmente**: generar y guardar un informe Excel al final de cada mes como respaldo del estado del sistema.
- **Conservar PDFs de reportes**: guardar los PDFs generados en la carpeta de documentos de la institución.
- **Documentar cambios importantes**: si se realizan cambios significativos en la configuración o los datos, registrarlos en el log de actividades.

## Gestión de Postulaciones

- **Actualizar estados oportunamente**: procesar las postulaciones recibidas en un plazo razonable (máximo 5 días hábiles) para dar una respuesta oportuna a los egresados.
- **Usar el estado "INTERVIEW"**: aprovechar el estado de entrevista para comunicar internamente el avance del proceso de selección.

\newpage

# Limitaciones de la Versión Actual

Las siguientes funcionalidades no están disponibles en la versión 1.0 del sistema y están previstas para versiones futuras:

| Limitación | Descripción | Impacto |
|---|---|---|
| **Sin carga de archivos** | Los egresados no pueden subir su CV en formato PDF o Word. Solo ingresan texto libre en la carta de presentación. | Moderado — los procesos de selección deben gestionar los CVs por canales alternativos |
| **Sin recuperación de contraseña** | No existe un flujo de "Olvidé mi contraseña". Si un usuario olvida su clave, debe ser restablecida manualmente en la base de datos. | Alto para usuarios individuales — el administrador debe intervenir |
| **Sin notificaciones automáticas** | El sistema no envía correos electrónicos cuando cambia el estado de una postulación, se publica una nueva encuesta o hay una nueva oferta. | Moderado — los usuarios deben revisar el sistema proactivamente |
| **Sin gestión de empresas por interfaz** | No existe un panel para crear, editar o eliminar empresas. Las empresas se gestionan directamente en la base de datos. | Bajo — las empresas se agregan mediante el seed o manualmente |
| **Sin gestión de usuarios por interfaz** | No existe un panel para crear nuevos administradores, directores o coordinadores. Se gestionan en la base de datos. | Bajo en la versión inicial; limitante si el equipo administrativo crece |
| **Panel de Escuela no implementado** | El rol `SCHOOL` y el panel `/escuela` son stubs (páginas vacías). No tienen funcionalidad real. | Bajo — este rol no se usa en la operación actual |
| **Sin auditoría de acciones** | El sistema no lleva un registro de qué administrador realizó qué acción y cuándo. | Moderado para auditorías institucionales |
