---
title: "Manual de Usuario"
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
| **Título del documento** | Manual de Usuario |
| **Nombre del sistema** | Sistema Web de Seguimiento e Inserción Laboral del Egresado |
| **Unidad académica** | E.P. Ingeniería de Sistemas — Universidad Nacional del Altiplano Puno |
| **Versión del documento** | 1.0 |
| **Fecha de elaboración** | Junio 2026 |
| **Elaborado por** | Robert Charlie Cuyo Zamata (practicante preprofesional) |
| **Supervisado por** | Guina Guadalupe Sotomayor Alzamora |
| **Estado** | Versión inicial |
| **Audiencia** | Egresados, administradores, director de escuela y coordinador de prácticas |

## Historial de Versiones

| Versión | Fecha | Autor | Descripción |
|---|---|---|---|
| 1.0 | Junio 2026 | Robert Charlie Cuyo Zamata | Creación del documento inicial |

\newpage

# Introducción

## ¿Qué es este sistema?

El Sistema Web de Seguimiento e Inserción Laboral del Egresado es una plataforma digital de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Nacional del Altiplano Puno. Su propósito es mantener el vínculo entre la institución y sus egresados, facilitando:

- El registro y actualización del perfil laboral de los egresados.
- La participación en encuestas de seguimiento.
- El acceso a una bolsa laboral con ofertas de empleo y prácticas.
- La gestión y análisis de información por parte del personal institucional.

## ¿A quién va dirigido este manual?

Este manual cubre todos los roles de usuario del sistema:

| Rol | Descripción |
|---|---|
| **Egresado** | Profesional graduado de la E.P. Ingeniería de Sistemas que usa el sistema para su perfil y búsqueda laboral |
| **Administrador** | Personal de la Comisión de Seguimiento que gestiona el sistema completo |
| **Director** | Director de la Escuela Profesional, con acceso de solo lectura a analítica y reportes |
| **Coordinador de Prácticas** | Personal que gestiona encuestas, ofertas de práctica y aplicaciones |
| **Público** | Visitantes sin cuenta que pueden ver la página de inicio y la bolsa laboral pública |

## Convenciones del Manual

- Los términos entre **corchetes** como **[Guardar]** indican botones o elementos de la interfaz.
- Las rutas como `/egresado/perfil` indican la dirección web de una página del sistema.
- Los cuadros marcados con **Nota** contienen información adicional útil.
- Los cuadros marcados con **Advertencia** contienen información importante que no debe ignorarse.

\newpage

# Acceso al Sistema

## Cómo Iniciar Sesión

1. Abrir el navegador web (Chrome, Firefox, Edge o Safari).
2. Escribir la dirección del sistema en la barra de direcciones.
3. En la página de inicio, hacer clic en el botón **Iniciar sesión**, o acceder directamente a la ruta `/login`.
4. Ingresar el **correo electrónico** y la **contraseña** correspondientes al rol.
5. Hacer clic en **Ingresar**.
6. El sistema redirigirá automáticamente al panel correspondiente según el rol asignado.

## Credenciales por Rol (Entorno de Prueba)

| Rol | Correo electrónico | Contraseña | Panel de acceso |
|---|---|---|---|
| Administrador | admin@unap.edu.pe | admin123 | /admin |
| Director | director@epis.edu.pe | director123 | /director |
| Coordinador de Prácticas | coordinador@epis.edu.pe | coordinador123 | /coordinador |
| Egresado (ejemplo) | juan.mamani@gmail.com | password123 | /egresado |

> **Nota**: En el entorno real de producción, cada usuario tendrá sus propias credenciales. Las credenciales anteriores son solo para pruebas.

## Cómo Cerrar Sesión

1. En la esquina superior derecha del panel, hacer clic en el nombre del usuario o en el ícono de perfil.
2. Seleccionar la opción **Cerrar sesión**.
3. El sistema redirigirá a la página de inicio.

> **Recomendación**: Cerrar siempre la sesión al terminar de usar el sistema, especialmente en equipos compartidos.

## Problemas al Iniciar Sesión

- Si el correo o la contraseña son incorrectos, el sistema mostrará un mensaje de error. Verificar que no haya espacios adicionales al copiar y pegar.
- Si la cuenta fue desactivada por el administrador, el sistema no permitirá el ingreso aunque las credenciales sean correctas. Contactar al administrador del sistema.
- No existe un flujo de recuperación de contraseña automático en la versión actual. Contactar al administrador si se olvida la contraseña.

\newpage

# Registro de Egresados

## Quién Puede Registrarse

El registro está disponible para los egresados de la Escuela Profesional de Ingeniería de Sistemas de la UNA Puno que aún no tienen cuenta en el sistema.

## Pasos para Registrarse

1. Acceder a la página de inicio del sistema.
2. Hacer clic en el botón **Registrarse** o en el enlace de registro del menú.
3. Completar el formulario con los datos requeridos:

### Datos del Formulario de Registro

| Campo | Descripción |
|---|---|
| **Nombre** | Primer nombre del egresado |
| **Apellido paterno** | Primer apellido |
| **Apellido materno** | Segundo apellido (opcional) |
| **Correo electrónico** | Correo que se usará para iniciar sesión. Debe ser único en el sistema. |
| **Contraseña** | Mínimo 8 caracteres. Se recomienda incluir letras, números y caracteres especiales. |
| **Confirmar contraseña** | Repetir la contraseña para verificar que es correcta |

4. Revisar que todos los datos sean correctos.
5. Hacer clic en **Crear cuenta**.
6. Si el registro es exitoso, el sistema redirigirá automáticamente al panel del egresado (`/egresado`).

> **Nota**: El sistema asigna automáticamente al egresado a la Escuela Profesional de Ingeniería de Sistemas. No es necesario seleccionarla en el formulario.

> **Advertencia**: Una vez creada la cuenta, el correo electrónico no puede cambiarse desde la interfaz. Si necesita modificarlo, contactar al administrador del sistema.

\newpage

# Panel del Egresado

Este capítulo describe todas las funciones disponibles para los usuarios con el rol **EGRESADO**.

## Panel Principal (Dashboard)

**Ruta**: `/egresado`

Al iniciar sesión, el egresado accede a su panel personal que muestra un resumen de su actividad en el sistema:

- **Encuestas pendientes**: número de encuestas disponibles que aún no ha respondido.
- **Encuestas completadas**: número de encuestas respondidas.
- **Postulaciones realizadas**: número total de empleos a los que ha postulado.
- **Estado de postulaciones recientes**: estado actual de las últimas postulaciones.

## Perfil del Egresado

**Ruta**: `/egresado/perfil`

### Ver el Perfil

La página de perfil muestra toda la información personal y profesional del egresado registrada en el sistema. Está dividida en secciones: información personal, datos de contacto, situación laboral y experiencia de trabajo.

### Editar el Perfil

La información del perfil puede actualizarse en cualquier momento:

1. En la página de perfil, hacer clic en el botón **Editar perfil**.
2. Modificar los campos deseados.
3. Hacer clic en **Guardar cambios**.

### Campos Editables del Perfil

| Campo | Descripción |
|---|---|
| **Teléfono** | Número de contacto (con código de país si aplica) |
| **Correo personal** | Correo alternativo para contacto |
| **Biografía** | Resumen profesional breve (aparece en el perfil) |
| **Estado laboral** | Situación laboral actual (ver tabla de opciones) |
| **Cargo actual** | Título o puesto que ocupa actualmente |
| **Empresa actual** | Nombre de la empresa donde trabaja actualmente |
| **Ciudad** | Ciudad de residencia actual |
| **País** | País de residencia actual |
| **LinkedIn** | URL del perfil de LinkedIn |

### Opciones de Estado Laboral

| Opción | Descripción |
|---|---|
| **Empleado** | Trabaja actualmente en relación de dependencia |
| **Trabajador independiente** | Trabaja de forma independiente o como freelance |
| **Desempleado** | Actualmente sin empleo |
| **Buscando empleo** | Sin empleo pero en búsqueda activa |
| **Estudiando** | Actualmente cursando estudios de postgrado o especialización |

### Campos No Editables

Los siguientes datos no pueden modificarse desde la interfaz del egresado, ya que son gestionados por el sistema o el administrador:

- Nombres y apellidos registrados en el sistema.
- Correo electrónico con el que se inició sesión.
- Escuela profesional asignada.

## Experiencia Laboral

**Ruta**: `/egresado/perfil` (sección de experiencia laboral)

La sección de experiencia laboral permite al egresado registrar y mantener un historial de sus empleos anteriores y actuales.

### Ver la Experiencia Laboral

En la página de perfil, desplazarse hasta la sección **Experiencia Laboral** para ver la lista de empleos registrados, ordenados cronológicamente del más reciente al más antiguo.

### Agregar una Nueva Entrada de Experiencia

1. Hacer clic en el botón **Agregar experiencia**.
2. Completar el formulario:

| Campo | Descripción |
|---|---|
| **Empresa** | Nombre de la empresa u organización |
| **Cargo** | Título o puesto desempeñado |
| **Fecha de inicio** | Mes y año en que comenzó el trabajo |
| **Fecha de fin** | Mes y año en que terminó (dejar vacío si es trabajo actual) |
| **¿Trabajo actual?** | Marcar si este es el empleo vigente |
| **Descripción** | Descripción de responsabilidades y logros (opcional) |

3. Hacer clic en **Guardar**.

> **Nota**: Solo puede haber un trabajo marcado como "actual" a la vez. Si se marca un nuevo trabajo como actual, el anterior dejará de marcarse como tal automáticamente.

### Editar una Entrada de Experiencia

1. En la lista de experiencias, hacer clic en el botón de edición (ícono de lápiz) de la entrada a modificar.
2. Actualizar los campos necesarios.
3. Hacer clic en **Guardar cambios**.

### Eliminar una Entrada de Experiencia

1. En la lista de experiencias, hacer clic en el botón de eliminar (ícono de papelera) de la entrada a eliminar.
2. Confirmar la eliminación en el cuadro de diálogo.

> **Advertencia**: La eliminación de una experiencia laboral es permanente. No existe forma de recuperar la información una vez eliminada.

## Bolsa Laboral del Egresado

**Ruta**: `/egresado/empleos`

### Explorar Ofertas Laborales

La bolsa laboral muestra todas las ofertas de empleo activas disponibles para los egresados. Cada tarjeta de oferta muestra:

- Título del puesto
- Empresa
- Ubicación
- Tipo de empleo y modalidad
- Fecha de publicación y expiración
- Botón para ver el detalle

### Filtrar Ofertas

En la parte superior de la lista se pueden aplicar filtros para encontrar ofertas más relevantes:

- **Tipo de empleo**: filtrar por tiempo completo, parcial, contrato, prácticas, etc.
- **Modalidad**: presencial, híbrido o remoto.
- **Búsqueda por texto**: buscar por título de puesto o empresa.

### Ver el Detalle de una Oferta

1. Hacer clic sobre una oferta para ver su detalle completo.
2. El detalle muestra todos los campos de la oferta: descripción completa, requisitos, salario (si fue informado), modalidad, etc.

### Postular a una Oferta (Postulación Interna)

Si la oferta no tiene URL externa configurada, el egresado puede postular directamente en el sistema:

1. En el detalle de la oferta, hacer clic en **Postular**.
2. Se abrirá un formulario para ingresar la **carta de presentación** (texto libre describiendo el interés en el puesto).
3. Revisar el texto y hacer clic en **Enviar postulación**.
4. El sistema confirmará que la postulación fue registrada.

> **Nota**: Solo es posible postular una vez a cada oferta. Una vez enviada la postulación, el botón cambiará a "Ya postulaste".

### Postular a una Oferta (URL Externa)

Si la oferta tiene un enlace externo, el botón de postulación dirá **Ir a postular** o similar. Al hacer clic:

1. El sistema registrará el clic para métricas de interacción.
2. El navegador abrirá el enlace externo en una nueva pestaña.
3. El egresado completará el proceso de postulación en la plataforma externa de la empresa.

> **Nota**: Para las ofertas con URL externa, el sistema no gestiona ni registra la postulación. El proceso de selección ocurre completamente en la plataforma de la empresa.

### Consultar el Estado de las Postulaciones

En la página de detalle de una oferta a la que se postuló, o en el panel principal, el egresado puede ver el estado actual de cada postulación:

| Estado | Significado para el egresado |
|---|---|
| **Pendiente** | La postulación fue recibida y está en espera de revisión |
| **Revisado** | El administrador ha revisado la postulación |
| **Entrevista** | Has sido convocado/a a una entrevista. Esperar comunicación directa. |
| **Aceptado** | Has sido seleccionado/a para el puesto |
| **Rechazado** | La postulación no fue aprobada en esta oportunidad |

## Encuestas del Egresado

**Ruta**: `/egresado/encuestas`

### Ver las Encuestas Disponibles

La página de encuestas muestra dos listas:

- **Pendientes**: encuestas activas que el egresado aún no ha respondido.
- **Completadas**: encuestas que ya fueron respondidas.

### Responder una Encuesta

1. En la lista de encuestas pendientes, hacer clic en el nombre de la encuesta o en el botón **Responder**.
2. Leer la descripción de la encuesta.
3. Responder las preguntas en orden. A continuación se explica cómo responder cada tipo de pregunta:

### Cómo Responder Cada Tipo de Pregunta

| Tipo | Cómo responder |
|---|---|
| **Texto corto** | Escribir la respuesta en el campo de una línea |
| **Texto largo** | Escribir la respuesta en el área de texto. Se puede extender escribiendo más líneas. |
| **Opción única** | Hacer clic en UNO de los círculos (radio buttons) para seleccionar una respuesta |
| **Opción múltiple** | Marcar UNO O VARIOS de los cuadros (checkboxes) según corresponda |
| **Calificación** | Hacer clic en el número deseado en la escala del 1 al 5 (1 = muy insatisfecho/muy malo, 5 = muy satisfecho/muy bueno) |
| **Sí / No** | Hacer clic en **Sí** o **No** |

4. Las preguntas marcadas con asterisco (*) son obligatorias y deben responderse antes de enviar.
5. Una vez respondidas todas las preguntas requeridas, hacer clic en **Enviar respuestas**.
6. El sistema confirmará que la encuesta fue completada y la moverá a la lista de **Completadas**.

> **Importante**: Cada encuesta solo puede responderse una vez. Una vez enviadas las respuestas, no es posible modificarlas. Revisar todas las respuestas antes de enviar.

> **Nota**: Si se cierra la página antes de enviar, las respuestas no se guardarán. La encuesta permanecerá en la lista de pendientes y podrá responderse nuevamente desde el inicio.

\newpage

# Panel del Administrador

El administrador tiene acceso completo al sistema. Este capítulo resume las funciones disponibles; para una descripción detallada de cada módulo, consultar el **Manual de Administración del Sistema** (documento separado).

## Acceso

**Ruta**: `/admin`  
**Credencial de prueba**: admin@unap.edu.pe / admin123

## Módulos Disponibles

| Módulo | Ruta | Función principal |
|---|---|---|
| **Dashboard** | `/admin` | Tarjetas de resumen: total de egresados, encuestas, ofertas activas y postulaciones recientes |
| **Directorio de egresados** | `/admin/egresados` | Lista paginada con búsqueda, filtros y acceso al perfil completo de cada egresado |
| **Encuestas** | `/admin/encuestas` | Crear, editar, activar/desactivar y ver resultados de encuestas |
| **Bolsa laboral** | `/admin/bolsa-laboral` | Crear, editar, activar/desactivar ofertas laborales y ver métricas de interacción |
| **Postulaciones** | `/admin/postulaciones` | Ver postulaciones internas y actualizar su estado |
| **Reportes** | `/admin/reportes` | KPIs, 6 gráficos analíticos, exportación en Excel/CSV/PDF |
| **Configuración** | `/admin/configuracion` | Parámetros generales del sistema |

## Resumen de Acciones por Módulo

### Egresados
- Ver la lista completa con filtros por nombre, estado laboral y año de egreso.
- Acceder al perfil detallado de cada egresado (solo lectura desde este módulo).

### Encuestas
- Crear encuestas con 6 tipos de preguntas.
- Activar/desactivar para controlar la visibilidad.
- Ver resultados estadísticos de cada encuesta.
- Eliminar encuestas (acción irreversible).

### Bolsa Laboral
- Publicar ofertas para egresados (empleo regular) y para estudiantes próximos a egresar (prácticas).
- Configurar flujo interno (carta de presentación) o externo (URL).
- Activar/desactivar según vigencia.

### Postulaciones
- Seguimiento del ciclo PENDING → REVIEWED → INTERVIEW → ACCEPTED/REJECTED.

### Reportes
- Filtrar por año de egreso y estado laboral.
- Exportar datos para presentaciones o archivos institucionales.

\newpage

# Panel del Director

El Director de la Escuela Profesional tiene acceso de **solo lectura** a los módulos de analítica y reportes. No puede crear, editar ni eliminar ningún dato del sistema.

## Acceso

**Ruta**: `/director`  
**Credencial de prueba**: director@epis.edu.pe / director123

## Panel Principal del Director

**Ruta**: `/director`

Al ingresar, el director ve un panel con los indicadores clave del sistema en tiempo real:

- Total de egresados registrados.
- Tasa de empleabilidad actual.
- Número de encuestas activas y respondidas.
- Número de ofertas laborales vigentes.

Este panel brinda una visión ejecutiva del estado del seguimiento laboral de los egresados de la escuela.

## Analítica del Director

**Ruta**: `/director/analitica`

Muestra los mismos 6 gráficos disponibles para el administrador:

1. **Distribución por estado laboral**: visión general de la empleabilidad.
2. **Egresados registrados por año**: participación por promoción.
3. **Distribución por sector económico**: en qué industrias trabajan los egresados.
4. **Principales empleadores**: empresas con más egresados.
5. **Postulaciones por estado**: resultados de los procesos de selección.
6. **Interacción con ofertas**: qué ofertas generan más interés.

### Cómo Interpretar los Gráficos

- Los gráficos circulares (tipo "pie") muestran proporciones. Pasar el cursor sobre un segmento para ver el porcentaje exacto.
- Los gráficos de barras muestran comparaciones. La barra más larga representa el valor más alto.
- Todos los gráficos muestran datos en tiempo real según los registros del sistema.

### Aplicar Filtros

En la parte superior del panel de analítica, el director puede filtrar los datos por:
- **Año de egreso**: para analizar una promoción específica.
- **Estado laboral**: para enfocarse en un segmento de egresados.

Los gráficos se actualizan automáticamente al seleccionar un filtro.

## Reportes del Director

**Ruta**: `/director/reportes`

El director puede exportar los datos del sistema en tres formatos:

### Exportar a Excel (XLSX)

1. Seleccionar el conjunto de datos a exportar (si hay opciones disponibles).
2. Hacer clic en **Exportar Excel**.
3. El archivo se descargará automáticamente al equipo.

El archivo Excel incluye múltiples hojas con datos de egresados, postulaciones y encuestas.

### Exportar a CSV

1. Hacer clic en **Exportar CSV**.
2. El archivo de texto separado por comas se descargará automáticamente.

Útil para importar datos en otras herramientas de análisis como R, Python o Power BI.

### Exportar a PDF

1. Hacer clic en **Exportar PDF**.
2. Esperar mientras el sistema genera el informe (puede tardar algunos segundos).
3. El PDF se descargará automáticamente.

El PDF incluye los KPIs y gráficos tal como aparecen en pantalla, con los filtros activos en ese momento.

> **Recordatorio**: El director tiene acceso exclusivamente de lectura. No puede crear, editar ni eliminar ningún registro del sistema. Si se necesita realizar alguna acción, coordinar con el Administrador.

\newpage

# Panel del Coordinador de Prácticas

El Coordinador de Prácticas Profesionales tiene acceso a la gestión de encuestas, ofertas de práctica y analítica. Puede crear y editar contenido en su área de responsabilidad, con algunas restricciones respecto al Administrador.

## Acceso

**Ruta**: `/coordinador`  
**Credencial de prueba**: coordinador@epis.edu.pe / coordinador123

## Panel Principal del Coordinador

**Ruta**: `/coordinador`

El panel muestra un resumen del estado de encuestas y postulaciones relevantes para el coordinador:

- Encuestas activas en el sistema.
- Postulaciones recientes a ofertas de práctica.
- Ofertas de práctica activas.

## Módulo de Encuestas del Coordinador

**Ruta**: `/coordinador/encuestas`

El coordinador puede:

- **Ver** la lista de encuestas con su estado y número de respuestas.
- **Crear** nuevas encuestas con el constructor de preguntas (misma funcionalidad que el administrador).
- **Editar** encuestas existentes.
- **Activar y desactivar** encuestas para controlar su visibilidad a los egresados.
- **Ver resultados** de cualquier encuesta.

> **Restricción**: El coordinador **no puede eliminar** encuestas. Esta acción está reservada exclusivamente para el Administrador.

### Crear una Encuesta desde el Panel de Coordinador

El proceso es idéntico al del administrador. Ver la sección correspondiente en el capítulo del Administrador (sección 10) para las instrucciones detalladas.

## Módulo de Prácticas del Coordinador

**Ruta**: `/coordinador/practicas`

Este módulo está orientado a la gestión de ofertas de **prácticas preprofesionales** (`INTERNSHIP`) y **prácticas profesionales** (`PROFESSIONAL_INTERNSHIP`).

### Ver las Ofertas de Práctica

La lista muestra todas las ofertas activas e inactivas de los tipos INTERNSHIP y PROFESSIONAL_INTERNSHIP, con sus métricas de interacción y postulaciones.

### Activar y Desactivar Ofertas de Práctica

1. En la lista, localizar la oferta de práctica.
2. Hacer clic en el botón de activar/desactivar.
3. El estado cambiará inmediatamente.

### Ver Postulaciones a Prácticas

Al hacer clic en el detalle de una oferta de práctica, el coordinador puede ver todas las postulaciones recibidas para esa oferta, con el estado de cada una.

### Actualizar el Estado de una Postulación

1. En la lista de postulaciones de una práctica, localizar la postulación.
2. Seleccionar el nuevo estado en el selector.
3. El cambio se aplica inmediatamente.

## Analítica del Coordinador

**Ruta**: `/coordinador/analitica`

El coordinador accede al mismo panel de analítica disponible para el administrador y director, con los mismos 6 gráficos y filtros.

### Sección de Interacción con Ofertas

El coordinador tiene especial interés en el gráfico de **Interacción con ofertas laborales**, que muestra para cada oferta el número de vistas, clics y tasa de conversión. Esto permite evaluar qué ofertas de práctica generan más interés entre los egresados.

### Exportación de Datos

El coordinador puede exportar los datos en Excel, CSV y PDF desde el módulo de analítica, de la misma forma que el Director (ver sección 8 de este manual).

\newpage

# Portal Público

El portal público es la parte del sistema accesible sin necesidad de crear una cuenta ni iniciar sesión.

## Página de Inicio

**Ruta**: `/`

La página de inicio presenta información general del sistema y la institución. Desde aquí, los visitantes pueden:

- Conocer el propósito del sistema.
- Acceder a la bolsa laboral pública.
- Registrarse como egresado o iniciar sesión.
- Ver un formulario de contacto o información institucional.

## Bolsa Laboral Pública

**Ruta**: `/empleos`

La bolsa laboral pública muestra todas las ofertas de empleo activas y vigentes, sin necesidad de contar con una cuenta. Es útil para que los egresados que aún no se han registrado puedan conocer las oportunidades disponibles.

### Explorar Ofertas

La lista muestra tarjetas de las ofertas activas. Hacer clic en una oferta para ver su descripción completa.

### Ver el Detalle de una Oferta

Al hacer clic en una oferta, se muestra:
- Título del puesto y empresa.
- Descripción completa y requisitos.
- Ubicación, modalidad y tipo de empleo.
- Fecha de publicación y expiración.

> **Nota**: Las vistas de cada oferta se registran automáticamente, incluso para visitantes no registrados. Esto ayuda a medir el alcance público de las ofertas.

### Postular desde el Portal Público

Para postular a una oferta o ver su estado después de postular, es necesario iniciar sesión con una cuenta de egresado. La página de detalle incluirá un botón o mensaje invitando a **Iniciar sesión** o **Registrarse** para poder postular.

### Llamada a la Acción (CTA)

En diversas partes del portal público, el sistema invita a los egresados a crear su cuenta o iniciar sesión para acceder a todas las funciones:

- Actualizar su perfil laboral.
- Postular directamente a las ofertas.
- Participar en encuestas de seguimiento.
- Acceder a su historial de postulaciones.

\newpage

# Preguntas Frecuentes (FAQ)

## Preguntas de Egresados

**¿Puedo cambiar mi correo electrónico?**

No es posible cambiar el correo electrónico desde la interfaz del sistema. Si necesita modificarlo, contactar al administrador del sistema (Comisión de Seguimiento al Egresado).

**¿Olvidé mi contraseña. Cómo la recupero?**

La versión actual del sistema no dispone de recuperación automática de contraseña por correo. Contactar al administrador para que la restablezca.

**¿Puedo postular a varias ofertas laborales?**

Sí, puede postular a tantas ofertas como desee, siempre que estén activas. Sin embargo, solo puede enviar una postulación por cada oferta.

**¿Puedo modificar mi postulación después de enviarla?**

No. Una vez enviada la postulación con la carta de presentación, no es posible modificarla. Revise bien el texto antes de enviar.

**¿Por qué algunas ofertas me llevan a una página externa?**

Algunas empresas prefieren gestionar el proceso de selección en su propia plataforma. Cuando una oferta tiene URL externa, el sistema le redirige automáticamente al hacer clic en postular. El proceso de selección ocurre en el portal de la empresa, no en este sistema.

**¿Puede el administrador ver mi información personal completa?**

Sí. El administrador puede ver todos los datos de su perfil, incluyendo datos de contacto, historial laboral y postulaciones. Esta información es utilizada exclusivamente por la institución para fines de seguimiento académico y laboral.

**¿Mis respuestas a las encuestas son anónimas?**

No. El sistema asocia las respuestas de las encuestas al egresado que las envió. El administrador puede ver qué egresado respondió qué en cada encuesta. Esta información es utilizada para análisis institucional y no se comparte con terceros.

**¿Qué hago si una encuesta no aparece en mi lista?**

Las encuestas solo aparecen cuando están activas. Si una encuesta que esperaba ver no aparece, puede que haya sido desactivada temporalmente. Contactar al administrador para confirmarlo.

**¿Puedo ver mis respuestas anteriores a una encuesta?**

Una vez completada una encuesta, puede verla en la lista de **Completadas**, pero la versión actual no permite ver las respuestas específicas que envió. Solo puede verificar que la completó.

---

## Preguntas de Administradores

**¿Puedo crear más de un usuario administrador?**

La creación de nuevos usuarios con rol de administrador, director o coordinador debe hacerse directamente en la base de datos. No existe una interfaz para gestión de usuarios en la versión actual.

**¿Qué pasa si elimino una encuesta que tiene respuestas?**

Todas las respuestas asociadas a esa encuesta se eliminarán permanentemente junto con la encuesta. Esta acción no tiene vuelta atrás. Se recomienda desactivar las encuestas en lugar de eliminarlas cuando ya tienen respuestas.

**¿Con qué frecuencia debo exportar los datos?**

Se recomienda generar un informe Excel al final de cada mes como respaldo. Además, generar un informe PDF al final de cada semestre para archivo institucional.

**¿Por qué la tasa de empleabilidad en los reportes no coincide con los datos que conozco?**

La tasa de empleabilidad refleja únicamente a los egresados registrados en el sistema y con información actualizada. Los egresados que no se han registrado, o que no han actualizado su estado laboral, no están incluidos en el cálculo. Incentivar a los egresados a registrarse y mantener su perfil actualizado mejorará la precisión de los datos.

---

## Preguntas del Director

**¿Puedo generar un informe con datos de un año específico?**

Sí. En el panel de analítica, aplicar el filtro de **Año de egreso** antes de exportar. El informe exportado reflejará únicamente los datos del año seleccionado.

**¿Puedo solicitar que se cree una encuesta nueva?**

El Director tiene acceso de solo lectura y no puede crear encuestas. Para crear una nueva encuesta, coordinar con el Administrador o con el Coordinador de Prácticas.

---

## Preguntas del Coordinador de Prácticas

**¿Puedo ver las postulaciones a empleos regulares (no de práctica)?**

Sí. El coordinador puede ver todas las postulaciones en el sistema, incluyendo las de ofertas de empleo regular. Sin embargo, su responsabilidad operativa principal se centra en las ofertas de práctica.

**¿Por qué no puedo eliminar una encuesta?**

La eliminación de encuestas está restringida al rol de Administrador para proteger la integridad de los datos. Si necesita eliminar una encuesta, solicitar al Administrador que realice la acción.

**¿Puedo crear nuevas empresas en el sistema?**

No existe una interfaz de gestión de empresas en la versión actual. Las empresas disponibles en el selector de ofertas laborales son las que están registradas en la base de datos. Para agregar una empresa nueva, contactar al Administrador.
